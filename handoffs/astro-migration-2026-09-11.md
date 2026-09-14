# Handoff — complete-HTML portfolio migration

**Focus of next session:** continue Mitch's portfolio migration from the agreed roadmap, beginning with an inventory and three-page Astro proof when instructed to implement.
**From:** Codex planning/review session **To:** Claude Code, Codex or another authorized agent **Date:** September 11, 2026

## Suggested skills

- Use the environment's browser skill for visual/interaction checks.
- Use SEO audit guidance for the final raw-HTML, indexing and direct-route validation.
- Use the locked exact-resume PDF skill only if editing the already-reviewed PDFs; migration alone does not require regenerating them.

## Current status

**Newer implementation update:** Mitch authorized design-first Astro staging. Branch `codex/astro-html-staging-20260911` now contains two HTML/CSS directions, nine generated review/proof routes and passing static-output checks. See `docs/design-review-2026-09-11/README.md` and PROJECT.md for publication state. Theme selection is the next user checkpoint; complete route conversion follows. The older planning context below is retained as history, not current implementation status.

Planning and durable handoff complete. Astro not implemented. Production remains the old GitHub Pages site plus a robots-only crawl fix. The reviewed React redesign is separate and must not be published as the requested HTML conversion.

## Start points

- Read root `AGENTS.md` for operating rules and `PROJECT.md` for state, locations, source references, permissions and next actions.
- `docs/migration-2026-09-11/README.md` is the consolidated roadmap. Supporting content/architecture/release documents are linked there; their estimates differ in scope/units and must not be added together.
- `docs/overhaul-2026-09-10/` holds reusable content/evidence, working lab documentation, current PDF sources and prior QA.
- Active persistent folder: `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`.
- Canonical remote: `https://github.com/CKAWEBUILDER/mitchjmiller.com.git`; planning branch: `codex/portfolio-overhaul-20260910`.

## Next actions

1. Verify status/branch/remote and fetch. Main includes a newer robots fix than the original review base; reconcile it rather than replacing main with an old tree.
2. Build the published-URL/project register from existing records. Distinguish ~15 active projects from 17 cases; locate UBI, validate Date Night/DomainSignal destinations and preserve four PDF URLs.
3. On implementation instruction, build complete Astro HTML for home, one case and one writing route, plus one bounded interactive island. Prove no-JavaScript readability and native links.
4. Re-estimate from the pilot; distribute remaining templates/content/interactions with disjoint ownership and independent QA.
5. Present a reviewed production candidate before deployment. One release owner; source pushed before host changes.

## Key context

- Inbound positioning spans data science, design, engineering, enterprise work, growth and independent products; hiring/resumes remain supported.
- Public complete HTML first. Cloudflare and private client workspaces are later phases; neither blocks initial crawlability.
- Future client library is a durable dated history of interactive HTML deliverables, not an editing system by default.
- Future lab flagship is a guided simulated-population/scenario tool. UBI is a specifically requested existing-artifact candidate. New model/CRM functionality is separate scope.
- Public concepts/demos can invite collaborators while proprietary source stays private; browser-delivered code is inherently retrievable.
- Preserve the original checkout and two user drafts named in PROJECT.md. Do not rely on the temporary review server as a durable artifact.
- Keep claims and resume dates/titles aligned with evidence. No invented causal attribution, model performance, client adoption or new private publication.

## Stop conditions and completion records

Do not deploy the React review, migrate DNS, purchase plans or upload private artifacts without the applicable authorization. Ask only for genuinely missing facts/access; existing public-material approval persists. Update PROJECT.md and this handoff with completed changes, checks, source/deploy references and exact next action after each milestone.

## Staging completion update

Private staging succeeded: https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site. Deployed source is `5bca30b7b79bd84936eb0afe008a88815415bfbc`; exact deployment/version evidence is in `docs/design-review-2026-09-11/README.md`. Local task preview stopped. Next: theme selection, full template/content migration, QA, then separate production approval. Public domain unchanged.

## Lane 2 — population workbench

Branch `claude/population-workbench` (worktree `/Users/mitchellmiler/Documents/mitchjmiller-workbench`), built overnight September 11, 2026; not merged, not deployed. Adds `/lab/population-workbench/` and `/lab/population-workbench/methodology/` on a self-contained `WorkbenchLayout.astro`; all page content lives in `site/components/workbench/PopulationWorkbenchPage.astro` and `PopulationWorkbenchMethodology.astro`, so the migration lane can move both pages into the final layout with one import each and delete the temporary layout. Data: `public/data/ca-pums-sample-2019.json` + meta (public-domain 2019 ACS PUMS sample, 686 KB, allowlisted by path in `scripts/prepare-astro-staging.mjs`). Model: `site/islands/workbench/ubi.ts` is byte-identical to the mids-portfolio UBI model; `model.ts` adds weighted filtering, an assumption-driven reach scenario, weight-proportional persona sampling and client-side HTML/CSV/JSON exports. Evidence: `npm run build` passes (11 pages); `node scripts/verify-workbench.mjs --screenshots` 58/58 including headless-Chrome hydration, filter interaction, three downloads, zero external requests; screenshots in `docs/lab/screenshots/`. Full record and overnight decisions: `docs/lab/population-workbench.md`. Open items for the migration lane: final layout import, remove staging `noindex`, route manifest/sitemap entries, confirm the contact form honors `?topic=population-simulation`. Commits `deb2e3b`, `35aa5df`, `4fdfb6c` plus the records commit.
## Lane 3 — Cloudflare foundation (2026-09-11, overnight)

Built by Claude Code on branch `claude/cloudflare-foundation` (worktree `/Users/mitchellmiler/Documents/mitchjmiller-cloud`). Files: `cloudflare/api-worker/`, `.github/workflows/cloudflare-pages.yml`, `.github/workflows/cloudflare-worker.yml`, `docs/cloudflare/README.md`. Nothing was merged, nothing deployed to GitHub Pages, no DNS or zone changes. Full detail and the form contract: `docs/cloudflare/README.md`.

### What exists now

- Worker `mitchjmiller-api` at https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev (version `0c792635-d43e-4621-8d5f-adee8df470fc`): `GET /health`, `POST /contact` (validation, Turnstile verify, salted IP hash, 5 per IP per hour via KV `RATE`, insert into D1 `mitchjmiller-leads`), CORS allowlist for the site origins and the two local ports. Secrets `TURNSTILE_SECRET` and `IP_SALT` are set. Verified over HTTPS: `/health` 200; bogus Turnstile token → 403 `turnstile_failed`; missing fields → 400 `validation`; foreign origin → 403; preflight 204.
- D1 `mitchjmiller-leads` (`523da23f-88ff-4af2-b9eb-4774eeb9d000`), schema applied. Lead check: `node cloudflare/api-worker/scripts/leads.mjs`.
- Turnstile widget (managed) sitekey `0x4AAAAAAEwq_uUlQ6tYWRDc` for `mitchjmiller.com`, `www.mitchjmiller.com`, `localhost`, `mitchjmiller-com.pages.dev`.
- Pages project `mitchjmiller-com` (production branch `main`): first deployment `c45f83f7` of this worktree's `npm run build` output (9 pages, noindex staging) at https://mitchjmiller-com.pages.dev. Custom domains `mitchjmiller.com` and `www.mitchjmiller.com` added via REST; both `pending` until the zone exists (expected).
- Private client portal: repo `CKAWEBUILDER/mitchjmiller-clients` (`main` at `807dc9c`), Pages project `mitchjmiller-clients` at https://mitchjmiller-clients.pages.dev (deployment `8663ffcd`), KV `CLIENT_PORTAL`, secret `SESSION_SECRET`, demo workspace `demo` seeded with the approved public `destination-intent-explorer.html`. 14/14 end-to-end checks passed (unauthenticated file → 302 with no body; wrong passcode denied; correct passcode → index + artifact; other slug denied; `?download=1` → attachment). Passcode only in `/Users/mitchellmiler/Documents/mitchjmiller-clients/.local/demo-passcode.txt`.

### What the site lane must wire (contact form)

`POST https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact` with `name`, `email`, `topic` (optional), `message`, `turnstileToken` (or the widget's own `cf-turnstile-response`), `source_url` (optional). JSON or form-encoded/FormData. Turnstile: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` plus `<div class="cf-turnstile" data-sitekey="0x4AAAAAAEwq_uUlQ6tYWRDc" data-theme="light" data-size="flexible"></div>` inside the form. Success `{"ok":true,"id"}`; errors are JSON with `error` codes (`validation`, `turnstile_failed`, `rate_limited`, ...). Keep the `mailto:` fallback in `<noscript>`. A public `/clients/` page can link to https://mitchjmiller-clients.pages.dev until `clients.mitchjmiller.com` exists.

### Morning checklist for Mitch

1. Cloudflare → Add a site `mitchjmiller.com` (Free); note the two nameservers. Namecheap → Custom DNS → those nameservers.
2. GitHub → both repos → Settings → Secrets: `CLOUDFLARE_API_TOKEN` (Pages: Edit, Workers Scripts: Edit, D1: Edit, KV: Edit) and `CLOUDFLARE_ACCOUNT_ID` = `e956c778b32a922cca488cfdb46fbec8`. The workflows skip until then.
3. After the zone is active and the production build is on the mirror: Pages → `mitchjmiller-com` → Custom domains → activate both. Not before: the mirror currently serves the noindex staging build.
4. Test the client portal demo with the passcode file above, then delete the file and name the first real client.
5. Later: `clients.mitchjmiller.com` domain, Cloudflare Access upgrade, Email Routing send binding for lead notifications.
