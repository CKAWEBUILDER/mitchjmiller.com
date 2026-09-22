# Handoff — Stripe integration for M² / mj2.pro (2026-09-22)

Owner: Mitchell Miller. Built by Claude Code (Fable 5.1) on `claude/agency-redesign` in the canonical checkout
`/Users/mitchellmiler/Documents/mitchjmiller-html-migration`. Runbook and contract: [docs/stripe/README.md](../docs/stripe/README.md).

## State

- **Built and locally verified, not deployed.** The deployed `mitchjmiller-api` Worker still serves only `/health` and `/contact`.
- Code: `cloudflare/api-worker/src/stripe.js` (REST helper, hosted Checkout, webhook signature verification, event → payment
  mapping), `src/index.js` (routes `POST /checkout`, `POST /stripe/webhook`), `schema.sql` (tables `stripe_events`, `payments`),
  `wrangler.toml` (vars `STRIPE_PRICES`, `STRIPE_AUTOMATIC_TAX`, `CHECKOUT_SUCCESS_URL`, `CHECKOUT_CANCEL_URL`),
  `scripts/stripe-invoice.mjs` (invoice CLI), `scripts/test-stripe.mjs`, `.dev.vars.example`, `.githooks/pre-commit` (key-leak guard).
- Evidence (2026-09-22, local, no network): `node cloudflare/api-worker/scripts/test-stripe.mjs` 12/12;
  `node cloudflare/api-worker/scripts/test-limits.mjs` 9/9 (unchanged contact behaviour); `stripe-invoice.mjs --dry-run` prints the
  seven planned calls; `wrangler deploy --dry-run` bundles (20.09 KiB, all bindings resolved); the pre-commit hook rejects a staged
  `sk_live_…` and passes the real change set.
- Tooling: Stripe plugin `stripe@claude-plugins-official` 0.9.2 installed (user scope); Stripe CLI 1.51.1 at `~/.local/bin/stripe`
  (official release tarball, SHA-256 verified), not logged in. Stripe MCP (`https://mcp.stripe.com`) is registered twice (by the
  `stripe` and `small-business` plugins) and both need an interactive OAuth login, so `stripe_implementation_planner` was not
  reachable; the plan came from the plugin's best-practices references instead.

## Decisions

Hosted Checkout (not Payment Element) for one-time engagements; Stripe Invoicing for quoted work; Stripe Tax gated off until an
active registration is verified; no SDK (dependency-free Worker); fulfilment = D1 record + logs; subscriptions, Customer Portal,
Connect and email-to-Mitch deferred. Rationale table in the runbook.

## Approval boundaries

- No Stripe keys exist on this Mac or in the repo. Sandbox and live keys are Mitch's to create; only restricted keys, only as Wrangler secrets.
- Do not deploy the Worker until `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are set (the routes would answer `503 not_configured`).
- `STRIPE_AUTOMATIC_TAX` stays `"false"` until Mitch and the tax advisor confirm a registration and the §6.3 verification passes.
- Site pages (`/pay/`, success page) are a site-lane change under the release gate; only the form contract is documented.
- Tax registrations: prepare, never create or expire on Mitch's behalf.

## Exact next steps (Mitch, in order)

1. Interactive Claude Code: `/mcp` → `stripe` → complete the OAuth login (optional, unlocks the MCP tools). Terminal: `stripe login`.
2. Dashboard: create sandbox `mj2-dev`; restricted keys `mj2-worker` (Checkout Sessions: Write, Customers: Write) and
   `mj2-invoicing` (Customers: Write, Invoices: Write, Prices: Read, Products: Read).
3. `wrangler secret put STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (runbook §1); webhook endpoint with the five events (§4).
4. Products and prices (§2) → `STRIPE_PRICES` in `wrangler.toml` → apply `schema.sql` to D1 → `wrangler deploy` → smoke (§7).
5. Tax settings and registration decision with the advisor (§6); only then flip `STRIPE_AUTOMATIC_TAX`.
6. Site lane: add the §3 form to `/services/` or a `/pay/` page when the release gate allows.

## Rollback

Redeploy the previous Worker version (`wrangler rollback --config cloudflare/api-worker/wrangler.toml`; current live version is
`cdf6a033`, see PROJECT.md). The new D1 tables are additive and harmless if left in place.
