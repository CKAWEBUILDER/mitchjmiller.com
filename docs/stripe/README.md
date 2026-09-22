# Stripe — Payments, Invoicing and Tax for M² (mj2.pro)

Built 2026-09-22 by Claude Code from the Stripe plugin's best-practices skill (plugin 0.9.2; API version `2026-08-26.dahlia`).
The MCP `stripe_implementation_planner` was unavailable (the Stripe MCP server needs an interactive OAuth login), so this
plan follows the same plugin references: payments, tax, security, billing. Status: **code and local tests complete, not
deployed.** Everything marked ☐ is Mitch's: it needs the Stripe account, keys, or a tax decision.

Business: M² (mj2.pro) — design, engineering, SEO and business-growth consultancy. Revenue is quoted project work and
fixed-scope engagements, sold to businesses. No prices are published on the site by design (`/services/`).

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Where the code lives | `mitchjmiller-api` Worker (`cloudflare/api-worker`): `POST /checkout`, `POST /stripe/webhook`, `src/stripe.js` | The only server-side surface the site has (GitHub Pages is static). Reuses its CORS allowlist, byte-counted body limits, KV rate limit and D1. |
| Payments surface | Stripe-hosted Checkout, `mode: payment`, one-time engagement payments (deposits, fixed-scope sprints) | Best-practice order is Payment Links → Checkout → Payment Element. Hosted Checkout keeps PCI at SAQ A, enables dynamic payment methods, Stripe Tax and tax-ID collection, and needs no client-side JavaScript. |
| Invoicing | Stripe Invoicing: hosted invoice page + PDF, `collection_method: send_invoice`, net terms | Quoted work is invoiced, not bought from a page. Dashboard-first; `scripts/stripe-invoice.mjs` for repeatable creation. |
| Tax | Stripe Tax through `automatic_tax`, **gated off** (`STRIPE_AUTOMATIC_TAX = "false"`) until an active registration exists | Enabling it without a registration silently collects nothing while the code looks like tax is on — the most common Stripe Tax mistake. |
| SDK | None: REST over `fetch` + WebCrypto HMAC in `src/stripe.js` | The Worker is dependency-free; Stripe's API is form-encoded HTTPS; webhook verification is one HMAC. |
| Fulfilment | Record to D1 (`stripe_events`, `payments`) + Worker logs; Stripe emails receipts/invoices | A consultancy delivers work by hand; there is nothing to unlock automatically. |
| Deferred | retainers/subscriptions, Payment Element, Customer Portal, Connect, email to Mitch | No current requirement; see §9. |

## 1. Environment and keys — ☐ Mitch

1. **Sandbox, not shared test mode.** Dashboard → Sandboxes → create `mj2-dev` for development; add another for CI later. Sandboxes isolate settings, keys, tax registrations and data from live mode.
2. **Restricted API keys (RAK, `rk_`), never secret keys (`sk_`).** Developers → API keys → Create restricted key:
   - `mj2-worker` — Checkout Sessions: Write · Customers: Write. Everything else None. Used by the Worker.
   - `mj2-invoicing` — Customers: Write · Invoices: Write · Prices: Read · Products: Read. Used by `scripts/stripe-invoice.mjs` on the Mac.
   - Add an access policy (IP or usage restriction) to each key where the Dashboard offers it. Separate keys per environment; rotate when anyone with access leaves.
3. **Secrets live in Wrangler, never in the repo or a committed env file:**
   ```bash
   npm_config_cache=.npm-cache npx -y wrangler secret put STRIPE_SECRET_KEY --config cloudflare/api-worker/wrangler.toml
   npm_config_cache=.npm-cache npx -y wrangler secret put STRIPE_WEBHOOK_SECRET --config cloudflare/api-worker/wrangler.toml
   ```
   Local development: copy `cloudflare/api-worker/.dev.vars.example` to `.dev.vars` (gitignored) with sandbox values.
4. **Leak guard:** `git config core.hooksPath .githooks` once per clone. The pre-commit hook rejects staged `sk_`/`rk_`/`whsec_` values. The Worker logs Stripe error `type/code/message` only, never keys.
5. **Agent tooling (optional):** Stripe MCP for Claude Code needs an interactive login (`/mcp` → `stripe` in an interactive session; the `small-business` plugin registers a second copy of the same server). Stripe CLI is installed at `~/.local/bin/stripe` (1.51.1, checksum-verified); `stripe login` opens the browser pairing flow. `stripe docs <path>` reads docs.stripe.com as Markdown.

## 2. Catalog — ☐ Mitch (Dashboard → Product catalog, in the sandbox first, then live)

One Product per sellable engagement (never several tiers as prices on one product: line items show the product name). A starting set mirroring `/services/`:

| Product | Price | `STRIPE_PRICES` key |
|---|---|---|
| Discovery sprint (Understand) | one-time, USD | `discovery` |
| Design sprint (Design) | one-time | `design-sprint` |
| Build engagement deposit (Build) | one-time | `build-deposit` |
| Growth audit (Grow) | one-time | `growth-audit` |

Per product, a **tax code** from the official list — candidates, to confirm with the tax advisor, never guessed:
`txcd_20060048` Consulting Services · `txcd_20060000` Professional Services · `txcd_20030000` General - Services (only if nothing more specific fits).
List: https://docs.stripe.com/tax/tax-codes (or the Tax Codes API). Per price, `tax_behavior: exclusive` (US convention: tax added on top).

Then set the Worker var and redeploy:
```toml
STRIPE_PRICES = "{\"discovery\":\"price_…\",\"growth-audit\":\"price_…\"}"
```
Unknown keys answer `404 unknown_offer`. The browser never chooses a price or an amount.

## 3. Payments — `POST /checkout` (built)

Endpoint: `POST https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/checkout` (same CORS allowlist and body rules as `/contact`: JSON, form or multipart, 16,384-byte cap, 413/415 before parsing).

| Field | Required | Limit | Notes |
|---|---|---|---|
| `offer` | yes | 64 | `^[a-z0-9][a-z0-9-]*$`, a key of `STRIPE_PRICES` |
| `email` | no | 254 | pre-fills Checkout (`customer_email`) |
| `ref` | no | 64 | `[A-Za-z0-9_-]`, stored as `client_reference_id` (e.g. the D1 lead id) |

Responses: `303 Location: https://checkout.stripe.com/…` for a plain form post; `200 {ok, url, id}` when `Accept: application/json`; `400 validation`, `403 origin_not_allowed`, `404 unknown_offer`, `405`, `413`, `415`, `429 rate_limited` (20 per IP per hour, `Retry-After`), `502 stripe_error {code}`, `503 not_configured` (secret or `CHECKOUT_*_URL` var missing).

What the session sets (`src/stripe.js`): `mode=payment`; the allowlisted price; `customer_creation=always` (one Customer per payer, so later invoices attach to the same record); `invoice_creation.enabled` (post-payment invoice + PDF); `tax_id_collection.enabled` (business tax IDs → B2B / reverse-charge treatment); `automatic_tax.enabled` from `STRIPE_AUTOMATIC_TAX`; `integration_identifier` (Dashboard checkout-flow comparison); `metadata.offer`; an `Idempotency-Key` per request. **No `payment_method_types`**: payment methods are managed in Dashboard → Settings → Payment methods (turn on ACH Direct Debit for business clients; Stripe ranks eligible methods per customer).

Site-lane snippet (no JavaScript needed; the button is a form post to the Worker):
```html
<form method="post" action="https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/checkout">
  <input type="hidden" name="offer" value="discovery">
  <input type="email" name="email" placeholder="Work email (optional)">
  <button type="submit">Reserve a discovery sprint</button>
</form>
```
Success returns to `CHECKOUT_SUCCESS_URL` (`/contact/?checkout=success&session_id=…`), cancel to `/services/`. A dedicated `/pay/success/` page is a site-lane change under the release gate (route manifest, crawl QA); the vars change with it. The success page shows a thank-you only — **fulfilment never happens there** (customers can pay and never load it).

## 4. Webhooks — `POST /stripe/webhook` (built) — ☐ Mitch creates the endpoint

Dashboard → Developers → Webhooks → Add endpoint: `https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/stripe/webhook`, events:
`checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `invoice.paid`, `invoice.payment_failed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET` (sandbox and live endpoints have different secrets).

Handler behaviour: body capped at 256 KB; `Stripe-Signature` verified (HMAC-SHA256 over `t.payload`, 5-minute tolerance, any matching `v1`) before anything is parsed; each event id inserted once into `stripe_events` (replays answer `200 {duplicate:true}`); `payments` upserted by session/invoice id with `updated_at = event.created`, so an older redelivery never overwrites a newer state. A Checkout Session counts as **paid only when `payment_status` is not `unpaid`** (`completed` arrives before the money for bank debits; `async_payment_succeeded`/`failed` settle it). Unhandled event types are recorded, nothing else. Any thrown error is a 500 and Stripe retries.

Local loop:
```bash
npm_config_cache=.npm-cache npx -y wrangler dev --config cloudflare/api-worker/wrangler.toml --port 8787   # reads .dev.vars
stripe listen --forward-to http://127.0.0.1:8787/stripe/webhook                                              # prints whsec_… for .dev.vars
stripe trigger checkout.session.completed
```
Hardening later, once the Worker has a route on a Cloudflare zone: WAF rate limit on `/checkout`, and an allowlist of Stripe's webhook IPs (https://docs.stripe.com/ips) on `/stripe/webhook` as defence in depth.

## 5. Invoicing (Dashboard + script) — ☐ Mitch configures once

Dashboard → Settings → Billing → Invoices: business name **M²**, address, support email, default memo and footer (payment terms, late policy, ACH/wire instructions if used), default due days (30), reminders (for example 3 days before, on due, 7 days after), invoice PDF template. Dashboard → Settings → Customer emails: send receipts and invoices. Payment methods: card + ACH Direct Debit.

Per invoice, either Dashboard → Customers → Invoices → Create, or:
```bash
STRIPE_SECRET_KEY=rk_… node cloudflare/api-worker/scripts/stripe-invoice.mjs \
  --email finance@client.com --name "Client Co" \
  --line "Discovery sprint — research and readout|4500.00" \
  --line "price:price_…|2" --days 30 --memo "Net 30. Thank you." --send
```
`--dry-run` prints the API calls without network; `--draft` leaves it for Dashboard review; `--tax` adds `automatic_tax` (needs a saved customer address, §6). Flow: find/create Customer by exact email → draft invoice (`send_invoice`, `days_until_due`) → invoice items attached to it (`amount`+`description` or `pricing[price]`+`quantity`) → finalize → send. Stripe hosts the invoice page and PDF, tracks views, sends reminders; the Worker records `invoice.paid` / `invoice.payment_failed` in D1.

B2B: store the client's tax ID on the Customer (Dashboard, or collected at Checkout). Without it, Stripe Tax treats a cross-border B2B sale as B2C and charges tax.

## 6. Tax — ☐ Mitch with the tax advisor (guide, not advice)

1. **Head office address.** Dashboard → Tax → Settings: address (California) and a preset tax code. Status must read `active`; while `pending`, `automatic_tax` calculates nothing. Sandbox and live each hold their own Tax Settings and registrations — set both.
2. **Registrations.** Add one only for each jurisdiction where M² is obligated to collect; the advisor decides which, if any. Adding a registration in Stripe records an existing registration — it does not register M² with the authority. US: Dashboard → Tax → Locations → Add registration → "Register for me" if eligible. Registrations can be expired but never deleted; an expiry that has taken effect is permanent.
3. **Turn it on and verify — never assume.** Set `STRIPE_AUTOMATIC_TAX = "true"`, redeploy, then run a test calculation (Dashboard → Tax, or the Tax Calculations API in the sandbox) with a customer address in the registered jurisdiction and the product's tax code. Read `tax_breakdown[].taxability_reason`: `not_collecting` = broken (no active registration, or the Nontaxable code `txcd_00000000`); any other reason = working, including zero tax for exempt cases — confirm the reason is expected. Remediation order: product tax code first, then registration, then re-test. Checkout hides the breakdown by default: retrieve the session with `expand[]=line_items.data.taxes`.
4. **Monitoring and filing.** Dashboard → Tax → Locations → "Needs attention" plus email alerts watch economic-nexus thresholds — live transactions only; the clock starts at the first live payment, sandbox volume counts for nothing. Filing is not automatic: Stripe's filing product (US) or partners elsewhere; reports under Dashboard → Tax → Reports.

Traps: `automatic_tax` cannot coexist with manual `tax_rates` on the same object (clear them first). Uncollected tax cannot be corrected retroactively — get registrations right before the first live transaction.

## 7. Deploy and verify

```bash
# 1. D1 tables (idempotent)
npm_config_cache=.npm-cache npx -y wrangler d1 execute mitchjmiller-leads --remote -y --config cloudflare/api-worker/wrangler.toml --file cloudflare/api-worker/schema.sql
# 2. secrets (§1) and STRIPE_PRICES (§2), then deploy
npm_config_cache=.npm-cache npx -y wrangler deploy --config cloudflare/api-worker/wrangler.toml
# 3. local tests (no network; Node ≥ 22.13 for node:sqlite)
node cloudflare/api-worker/scripts/test-limits.mjs && node cloudflare/api-worker/scripts/test-stripe.mjs
# 4. smoke
curl -s -X POST -H 'Accept: application/json' -d offer=discovery https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/checkout
npm_config_cache=.npm-cache npx -y wrangler d1 execute mitchjmiller-leads --remote -y --config cloudflare/api-worker/wrangler.toml --command "select id, kind, status, amount_total, currency, customer_email from payments order by updated_at desc limit 10"
```
Sandbox end to end: open the returned `url`, pay with test card `4242 4242 4242 4242`, confirm the `payments` row; then exercise a delayed method with `stripe trigger checkout.session.async_payment_succeeded`. Test cards: `/stripe:test-cards` in Claude Code.

## 8. Go-live checklist

- [ ] Live RAKs created with the same permissions; live secrets set on the Worker; sandbox keys never reused.
- [ ] Live products/prices created; `STRIPE_PRICES` points at live `price_` ids; redeployed.
- [ ] Live webhook endpoint added with the five events; `STRIPE_WEBHOOK_SECRET` = the live signing secret; a `stripe trigger`-free real test payment (small amount, refunded) shows a `paid` row.
- [ ] Tax Settings `active` in live; registrations added where obligated; `STRIPE_AUTOMATIC_TAX` flipped only after §6.3 verification in live.
- [ ] Dashboard: business details, statement descriptor, branding, customer emails, payment methods (card, ACH), invoice defaults and reminders.
- [ ] Payouts: bank account verified; payout schedule chosen.
- [ ] Site lane: `/pay/`-style page or the §3 form on `/services/`; success page copy; analytics event for `checkout=success` (privacy-respecting, per the migration record).
- [ ] Stripe go-live checklist reviewed: https://docs.stripe.com/get-started/checklist/go-live

## 9. Deferred (not built, by decision)

- **Retainers / subscriptions:** Stripe Billing — recurring Prices, Checkout `mode: subscription` (still no `payment_method_types`), webhook events `customer.subscription.*` plus the `invoice.paid` / `invoice.payment_failed` already handled, and the same Stripe Tax rules. Add when a retainer is actually sold.
- **Payment Links:** the zero-code alternative to `/checkout` for a single offer; the webhook handler already records their sessions. Use if the site lane wants no form.
- **Customer Portal** (self-serve invoices, payment methods), **email to Mitch on payment** (Stripe's own Dashboard notifications cover this now), **Connect** (no marketplace).
- **Payment Element / embedded Checkout:** only if hosted Checkout's branding proves insufficient.
