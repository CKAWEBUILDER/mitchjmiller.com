# Cloudflare foundation — mitchjmiller.com

Built 2026-09-11 (overnight Lane 3, Claude Code). Account `Clearkayakrentalsoahu@gmail.com's Account`, id `e956c778b32a922cca488cfdb46fbec8`, workers.dev subdomain `clearkayakrentalsoahu`. The account has no DNS zone yet, so custom domains stay pending until Mitch adds the site and moves nameservers. Production for the public site tonight remains GitHub Pages; the Pages project below is the staging/cutover mirror.

## Resources

| Resource | Name / id | URL |
|---|---|---|
| Worker (contact/lead API) | `mitchjmiller-api`, version `0c792635-d43e-4621-8d5f-adee8df470fc` | https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev |
| D1 database | `mitchjmiller-leads`, `523da23f-88ff-4af2-b9eb-4774eeb9d000` (table `leads`) | — |
| KV namespace (rate limiting) | `RATE`, `be0386e14b584a8d9b24586051a808d9` | — |
| Turnstile widget | name "mitchjmiller.com contact form", managed mode, **sitekey `0x4AAAAAAEwq_uUlQ6tYWRDc`**, domains `mitchjmiller.com`, `www.mitchjmiller.com`, `localhost`, `mitchjmiller-com.pages.dev` | — |
| Worker secrets | `TURNSTILE_SECRET`, `IP_SALT` (set with `wrangler secret put`; values never recorded) | — |
| Pages project (site mirror) | `mitchjmiller-com`, production branch `main`, first deployment `c45f83f7` | https://mitchjmiller-com.pages.dev |
| Pages custom domains | `mitchjmiller.com` (`4696733e-b53a-4ff6-9506-bc622504b745`), `www.mitchjmiller.com` (`8462f96d-8b3c-42e4-96b6-8f287a13cccc`) — status `pending` until the zone exists | — |
| Private client portal | separate private repo `CKAWEBUILDER/mitchjmiller-clients`, Pages project `mitchjmiller-clients`, KV `CLIENT_PORTAL` `e956691cc50e4ff994c31ac0c4d7c04f` | https://mitchjmiller-clients.pages.dev |

Wrangler: run `npm_config_cache=.npm-cache npx -y wrangler <cmd>` from the repo root (uses the existing OAuth session). Note: wrangler 4.131 delegates `pages project create` to Workers-with-assets by default; both projects were created with `--force` (classic Pages). Existing projects are never delegated, so no `--force` on later commands.

## Contact form contract (for the site lane)

Endpoint: `POST https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact`
Health: `GET https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/health` → `{"ok":true,...}`

Accepted bodies: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data` (a plain `FormData` post works). Max 16 KB.

| Field | Required | Limit | Notes |
|---|---|---|---|
| `name` | yes | 120 chars | |
| `email` | yes | 254 chars | must look like `x@y.z` |
| `topic` | no | 120 chars | e.g. the "what are you trying to make possible" select |
| `message` | yes | 4000 chars | |
| `turnstileToken` | yes | 2048 chars | the Turnstile response token; the widget's default hidden input `cf-turnstile-response` is accepted under that name too |
| `source_url` | no | 512 chars | must start with `http://` or `https://`; send `location.href` |

Browser origins allowed (CORS, preflight handled): `https://mitchjmiller.com`, `https://www.mitchjmiller.com`, `https://mitchjmiller-com.pages.dev`, `http://127.0.0.1:5187`, `http://127.0.0.1:5188`. Change `ALLOWED_ORIGINS` in `cloudflare/api-worker/wrangler.toml` and redeploy to add more.

Responses (JSON, `Cache-Control: no-store`):

| Status | Body | Meaning |
|---|---|---|
| 200 | `{"ok":true,"id":"<uuid>"}` | stored in D1 |
| 400 | `{"ok":false,"error":"validation","fields":{"email":"invalid",...}}` | show field errors |
| 403 | `{"ok":false,"error":"turnstile_failed","codes":[...]}` | call `turnstile.reset()` and ask to retry |
| 403 | `{"ok":false,"error":"origin_not_allowed"}` | origin not in the allowlist |
| 413 / 415 / 405 / 404 | `{"ok":false,"error":...}` | payload too large / wrong content type / method / path |
| 429 | `{"ok":false,"error":"rate_limited","retry_after_s":N}` + `Retry-After` | more than 5 submissions per IP per hour |
| 503 | `{"ok":false,"error":"not_configured"}` | secrets missing (should not happen) |
| 500 | `{"ok":false,"error":"server_error"}` | logged in Worker observability |

Turnstile in the page (`<head>` or before the form):

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

Inside the `<form>` (implicit rendering adds the hidden `cf-turnstile-response` input automatically):

```html
<div class="cf-turnstile" data-sitekey="0x4AAAAAAEwq_uUlQ6tYWRDc" data-theme="light" data-size="flexible"></div>
```

Minimal submit handler:

```html
<form id="contact-form" method="post" action="https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact">
  <!-- name, email, topic, message inputs + the cf-turnstile div -->
</form>
<script>
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    data.set('source_url', location.href);
    let out;
    try {
      const res = await fetch(form.action, { method: 'POST', body: data });
      out = await res.json();
    } catch { out = { ok: false, error: 'network' }; }
    if (out.ok) { /* replace the form with a thank-you */ }
    else { /* show out.error / out.fields; if 'turnstile_failed' call window.turnstile?.reset() */ }
  });
</script>
```

JavaScript-off fallback: a plain POST of this form works too (form-encoded), but without JavaScript the Turnstile token is absent and the Worker answers 400 JSON, so keep the honest `mailto:` fallback in `<noscript>`.

Reading leads (from the repo root, needs the wrangler session):

```sh
node cloudflare/api-worker/scripts/leads.mjs 20
```

## Worker operations

```sh
CFG=cloudflare/api-worker/wrangler.toml
npm_config_cache=.npm-cache npx -y wrangler deploy --config $CFG
npm_config_cache=.npm-cache npx -y wrangler tail mitchjmiller-api --format pretty
npm_config_cache=.npm-cache npx -y wrangler d1 execute mitchjmiller-leads --remote -y --config $CFG --file cloudflare/api-worker/schema.sql   # idempotent
npm_config_cache=.npm-cache npx -y wrangler secret list --config $CFG
# rotate a secret (never echo values):
openssl rand -hex 32 | npm_config_cache=.npm-cache npx -y wrangler secret put IP_SALT --config $CFG
```

Behaviour: validates → hashes the client IP with `IP_SALT` (SHA-256, truncated) → fixed-window counter in KV, 5 per IP per hour → Turnstile siteverify → insert. Email notification is deferred until the zone exists (Email Routing send binding); until then use `leads.mjs`.

## Pages mirror operations

```sh
npm run build                                   # tonight's build is the noindex staging output
npm_config_cache=.npm-cache npx -y wrangler pages deploy dist --project-name mitchjmiller-com --branch main --commit-dirty=true
npm_config_cache=.npm-cache npx -y wrangler pages deployment list --project-name mitchjmiller-com
```

Custom domains were added through the REST API (`POST /accounts/{account_id}/pages/projects/mitchjmiller-com/domains`) and sit in `pending` (verification pending, http validation) until `mitchjmiller.com` is a zone on this account and its DNS points at the Pages project. After the zone exists, Cloudflare adds the CNAME records automatically when the domain is (re)activated from the Pages dashboard.

CI: `.github/workflows/cloudflare-pages.yml` (site mirror) and `.github/workflows/cloudflare-worker.yml` (Worker) run on pushes to `main` but skip until repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist. The token needs Account → Cloudflare Pages: Edit, Workers Scripts: Edit, D1: Edit, Workers KV Storage: Edit.

## Morning checklist for Mitch

1. Cloudflare dashboard → Add a site → `mitchjmiller.com` → Free. Note the two nameservers.
2. Namecheap → Nameservers → Custom DNS → the two Cloudflare nameservers. (Email forwarding on the domain is verified unused; no MX to recreate.)
3. Once the zone is active: Pages → `mitchjmiller-com` → Custom domains → both domains should move from pending to active (retry "Activate" if needed). Do this only when the site lane's production build is the one deployed to the mirror, otherwise the domain would serve the noindex staging build.
4. GitHub → `CKAWEBUILDER/mitchjmiller.com` and `CKAWEBUILDER/mitchjmiller-clients` → Settings → Secrets → `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (`e956c778b32a922cca488cfdb46fbec8`).
5. Client portal: sign in at https://mitchjmiller-clients.pages.dev with workspace `demo` and the passcode in `/Users/mitchellmiler/Documents/mitchjmiller-clients/.local/demo-passcode.txt`; then delete that file. Tell Claude which real client to onboard first.
6. Later: `clients.mitchjmiller.com` custom domain and the Cloudflare Access upgrade for the portal.
