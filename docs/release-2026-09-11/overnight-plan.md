# Overnight release plan — proposed September 11, 2026 (awaiting Mitch's go)

Prepared by Claude Code after reading PROJECT.md, AGENTS.md, the Codex handoff, the staging record, the migration roadmap and the live site. Nothing below has been executed yet except read-only checks and one local staging build/preview (stopped).

## Where Codex stopped (02:40 EDT, September 11)

- Branch `codex/astro-html-staging-20260911` at `104fdaa`: Astro 7 staging with two theme references (A "Independent Practice" light editorial; B "Research Atelier" dark), nine proof routes, four verified PDFs, passing static checks. Private review copy on ChatGPT Sites. Recorded next step: Mitch picks a theme, then full route conversion.
- Live `https://mitchjmiller.com/` is unchanged: React SPA on GitHub Pages (`gh-pages` `923dfd8`), `robots.txt` now allows crawling, but every page still carries `noindex, nofollow, noarchive`, there is no sitemap, 24 of 53 routes return the 404 shell on direct load, and the four public resume PDFs are the stale versions.
- Codex's content inventory (`docs/design-review-2026-09-11/migration-inventory.json`, 54 routes, 123 public files, zero missing assets) and content proposal are complete and reusable.

## Verified environment facts

| Item | State |
|---|---|
| GitHub | `CKAWEBUILDER/mitchjmiller.com`, Pages = legacy branch deploy from `gh-pages`, HTTPS enforced, CNAME `mitchjmiller.com` |
| DNS | Namecheap nameservers; apex A → GitHub Pages; `www` CNAME → `ckawebuilder.github.io`; MX → Namecheap email forwarding; SPF for Namecheap forwarding; a stale `replit-verify` TXT; no DNSSEC |
| Cloudflare | Wrangler OAuth session works (refreshed today) for the clearkayakrentalsoahu account. Existing Pages projects include `mids-portfolio` (old MIDS site, hosts the working UBI simulator). No zones on the account yet. Token scopes cover Pages, Workers, KV, D1, Turnstile, Email Routing; not zone creation or DNS edits |
| GA4 | `G-HCKYWCZQ8E` in the live head; no Search Console verification tag or DNS record found, so GSC is probably verified through GA4. The tag must stay. |
| UBI simulator | Real 2019 ACS PUMS California microdata; TypeScript model (`ubi.ts`) plus a 12k-record weighted browser sample already live at `mids-portfolio.pages.dev/ubi-simulator`. Reusable as the first population-workbench model. |

## Decisions needed from Mitch (answer in chat, one line each)

1. **Theme.** Recommendation: Direction A as the site; Direction B's dark instrument look only for Lab tool panels. Alternatives: pure A, or pure B.
2. **Publish tonight to the existing GitHub Pages host** (same domain, no DNS change). Rollback = previous `gh-pages` commit. Your message ("wake up with my new website") is read as yes; confirm.
3. **Cloudflare cutover.** I cannot create the Cloudflare zone or change Namecheap nameservers. Everything else is prepared tonight so the morning task is two five-minute steps (see checklist). Confirm you will do them.
4. **Client portal v1 auth:** per-client passcodes tonight (hashed, KV-backed, signed cookie, files never served unauthenticated), upgraded to Cloudflare Access email codes after the zone move. Alternative: wait for Access only.
5. **Population workbench v1 scope** as described in Lane 3.

## What runs overnight

### Lane 1 — Public site: React → complete HTML (Astro)

- Global shell in the chosen theme: native nav (Work · How I help · Lab · Writing · About · Let's talk · Resumes), skip link, footer, build-time `<head>` (unique title/description, self-canonical, OG/Twitter with absolute image URLs, JSON-LD Person/WebSite/Article/CreativeWork restrained to visible content), GA4 tag retained.
- Templates: home, collections (work, case studies, writing), case-study detail (17), writing detail (4 published), study-note detail (21, Mermaid rendered to SVG at build with text fallback), general pages (about, contact, resume, systems, aeo-geo, collab-ideas, selected-builds, lab), real `404.html`. All 53 existing URLs kept with trailing-slash canonicals; four PDF paths byte-identical to the verified September 10 files; SFC standalone report preserved as a dated archive page.
- Lab: the three existing React tools become islands; the standalone explorer stays downloadable; the population workbench (Lane 3) gets its own pages.
- Resumes: HTML resume page with the four verified two-page PDFs and plain-language variant guidance; no PDF regeneration.
- Contact: real form (name, email, what you are trying to make possible) posting to the Worker in Lane 2, Turnstile spam check, honest fallback mailto link when JavaScript is off.
- SEO output: `sitemap.xml` from the same route manifest, `robots.txt` allow + sitemap, IndexNow key file, no `noindex` anywhere in production HTML, `_redirects`/`_headers` for Cloudflare, `.nojekyll` + `CNAME` for GitHub Pages.

### Lane 2 — Cloudflare foundation (built tonight, cutover tomorrow)

- Pages project `mitchjmiller-com`: identical production artifact, custom domain `mitchjmiller.com` added in pending state; becomes production when nameservers move.
- Worker `mitchjmiller-api`: contact endpoint → D1 `mitchjmiller-leads` table + Turnstile verification; CORS limited to the site. Email notification wiring is added after the zone move (Email Routing send binding); until then a `wrangler d1` lead-check script.
- Private client portal `mitchjmiller-clients`: separate **private** GitHub repo → Pages project with Functions middleware; per-client folders `/c/<client>/<artifact>/<version>/`, hashed passcodes and sessions in KV, `X-Robots-Tag: noindex`, direct file URLs and other clients' folders denied, HTML artifacts viewable interactive and downloadable (same file, attachment disposition) plus asset bundles. Seeded with a demo client and one sample interactive deliverable so you can test in the morning. Public `/clients/` page on the main site links to it.
- GitHub Actions deploy workflows written for both repos but inactive until `CLOUDFLARE_API_TOKEN` is added as a repo secret (morning task); tonight's deploys run from this Mac with the existing wrangler session.

### Lane 3 — Population workbench v1 ("Build your own simulated population")

- Pages: `/lab/population-workbench/` (tool) and `/lab/population-workbench/methodology/`.
- Data: the existing California 2019 ACS PUMS weighted sample (public domain), loaded on demand.
- Steps in the tool: define the question → filter a population (age, income band, education, employment, sex, race; county group if the PUMA mapping verifies) → inspect weighted distributions → compare scenarios: (a) the verified UBI policy model, (b) an assumption-driven reach/adoption scenario for a product, price or budget decision where every assumption is a visible input → generate persona cards sampled from the filtered records (labeled synthetic composites, no invented names or photos) → export a self-contained interactive HTML report, CSV and JSON of assumptions.
- Freemium framing: free public-data version; "Want this on your customer or CRM data, calibrated and validated? Start a conversation" pre-fills the contact form. No pricing published tonight.
- No predictive accuracy claims; observed, calculated and simulated values labeled separately.

### Lane 4 — Independent QA, release, records

- JavaScript-off crawl of every manifest URL: 200, one h1, real body text, canonical, no noindex, working PDFs/images, real 404, sitemap parity, no drafts or private files in output. Desktop and 390px screenshots of every template. Lighthouse-style performance pass.
- Release to GitHub Pages via a clean `gh-pages` worktree; record source SHA, deploy SHA, artifact hash, previous deploy for rollback; verify live HTTP, robots, sitemap, PDFs, GA4 hits.
- Update PROJECT.md, AGENTS.md, README.md, `handoffs/`, this folder; commit and push. Morning report with links, evidence and the checklist below.

## Morning checklist for Mitch (about 20 minutes)

1. Cloudflare dashboard → Add a site → `mitchjmiller.com` → Free plan. Note the two nameservers shown.
2. **Before** changing nameservers: Cloudflare → Email → Email Routing → enable and add the forwarding rule(s) you rely on today (Namecheap forwarding stops working the moment nameservers move). I will have the DNS record list ready to recreate.
3. Namecheap → Domain → Nameservers → Custom DNS → paste the two Cloudflare nameservers. Propagation is usually under an hour.
4. Search Console: submit `https://mitchjmiller.com/sitemap.xml`, request indexing for home, work, lab, resume, one case study. Add a Domain property via the DNS TXT once the zone is on Cloudflare.
5. GitHub → both repos → Settings → Secrets → add `CLOUDFLARE_API_TOKEN` (Pages:Edit, Workers:Edit, D1, KV) and `CLOUDFLARE_ACCOUNT_ID` so pushes deploy automatically.
6. Test the client portal demo passcode; tell me which real client to onboard first.

## Questions you should be asking

- Do you receive any mail at an `@mitchjmiller.com` address today? If yes, Email Routing must be configured before the nameserver change or that mail bounces.
- GitHub Pages terms discourage primarily commercial sites. A freemium tool with quoted engagements is another reason to finish the Cloudflare move rather than stay on Pages.
- Who owns production if I am unavailable: the `gh-pages` rollback commit and the Cloudflare deployment list are both recorded so anyone can revert.
- Personas from public microdata describe the population, not your prospect's customers. Paid engagements need the client's data and a validation step, or the tool over-promises.
- Search Console verification is inferred to be GA4-based. If the property shows "unverified" tomorrow, re-verify by DNS TXT on Cloudflare; the site content is unaffected.
- Inbound links do not come from the build. What the build gives you is indexable pages worth linking to; announcement posts and outreach are a separate task.

## Explicitly not tonight

- Reconciling the roughly fifteen active projects (needs your confirmation of a prefilled register; I will draft it).
- CRM importers, client self-upload, community features, new resume PDFs beyond the four verified ones, backlink outreach, pricing pages.
- Any DNS, nameserver, plan purchase or private client artifact upload beyond the demo.
