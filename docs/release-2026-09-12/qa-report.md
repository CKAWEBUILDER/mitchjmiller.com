# Release candidate 2026-09-12 — independent QA report

Written 2026-09-11 17:12 EDT (2026-09-11 21:12 UTC) by the Claude integration/QA worker. Worktree `/Users/mitchellmiler/Documents/mitchjmiller-release`, branch `claude/release-2026-09-12`. Nothing here was published: the lead publishes to `gh-pages` after reading this report ([RELEASE-READY.md](../../RELEASE-READY.md)).

## Release candidate identity

| Item | Value |
|---|---|
| Base | `origin/codex/html-parity-design-20260911` at `bc8f019` (Codex parity build: 53 public routes as complete HTML, real 404, release mode) |
| Merged | `origin/claude/population-workbench` `8084b83` (lane 2) → merge commit `a6abd03`, no conflicts (the `scripts/prepare-astro-staging.mjs` allowlist auto-merged keeping both intents; the lane-2 handoff file `handoffs/astro-migration-2026-09-11.md` came in unchanged) |
| Integration commits | `30a0cbc` workbench + public lab + /clients/ in the production shell · `3b6ae68` corrected PDFs in the release build · `f763b3a` contact form + 404 copy · `c422377` QA scripts and evidence |
| Release source commit | **`c422377`** (documentation commits after it do not change the output; verified by rebuilding) |
| Build command | `npm run build:release-candidate` (Astro 7.3.2, Node v22.22.3) → 71 Astro pages; `dist/` = 301 files, 62 HTML documents, 17 MB |
| Artifact identity | sorted sha256 of every file in `dist/`: [artifact-manifest.txt](artifact-manifest.txt), whose own sha256 is **`18b6093162b76fddff62aa088013eff67090eb2779c4746fd438a00f6ac7f6d7`**; a second build of `c422377` reproduced it exactly |
| Local tarball | `.release-candidate/mitchjmiller-release-2026-09-12.tar.gz` (10 MB, not committed) sha256 `e2f0d0be52e9de3ed880c2ca0d4d8ba830191699132a708f2950f55297664e06` — contains file mtimes, so it identifies this local artifact only; the manifest hash is the reproducible identity |

## Summary

| Area | Result | Evidence |
|---|---|---|
| Lane 2 merge and workbench integration | PASS — both pages in the production shell, `WorkbenchLayout.astro` and its noindex removed; `node scripts/verify-workbench.mjs --screenshots` on the merged build served at 127.0.0.1:5193: **58 passed, 0 failed** | [verify-workbench.txt](qa/verify-workbench.txt), `docs/lab/screenshots/` |
| Contact `?topic=population-simulation` | PASS — pre-fills the topic select with JavaScript; without JavaScript the parameter is ignored (static page) | [browser.json](qa/browser.json) `contact` |
| Corrected resume PDFs | PASS — four files at the existing paths carry the September 10 hashes over HTTP | table below, [crawl.json](qa/crawl.json) |
| Contact form wiring | PASS (mocked) — real form posts to the lane-3 Worker; honest success/failure messages; JavaScript-off keeps the mailto path. Live submission from the production origin remains a post-publish probe (CORS allowlist excludes 127.0.0.1:5193) | [browser.json](qa/browser.json) |
| /clients/ entrance | PASS — static page links `https://mitchjmiller-clients.pages.dev/` (portal answered 200 at 20:58 UTC); not in the main nav | [screenshots/clients-1360-fold.png](screenshots/clients-1360-fold.png) |
| Release output (sitemap, robots, canonical, noindex, GA4, 404, CNAME, .nojekyll, no review output, no maps, no drafts) | PASS | [crawl.json](qa/crawl.json), [verify-parity.json](qa/verify-parity.json) |
| Parity verifier (Codex's, extended) | PASS — 57/57 archived routes, 4/4 added routes, 25/25 complete article/note bodies, 160 case fields, 4/4 PDFs (corrected), 2,446 local links/assets, 0 historical broken anchors, 57 indexable documents, 57 sitemap URLs | [verify-parity.txt](qa/verify-parity.txt) |
| TypeScript (both configurations) | PASS | [typecheck.txt](qa/typecheck.txt) |
| JavaScript-off crawl (a–d) | PASS — **757/757 checks across 61 manifest routes** | [crawl.json](qa/crawl.json) |
| Headless Chrome (e–f) | PASS — **203/203 checks**, 13 pages × 2 viewports, hydration, Mermaid, resume dialog, contact form, JavaScript-off contact | [browser.json](qa/browser.json), [screenshots/](screenshots/) |

## 1. Lane 2 merge and integration

- Merge: `git merge origin/claude/population-workbench` (commits `deb2e3b..8084b83`) → `a6abd03`, clean.
- `site/layouts/ParityShell.astro` + `site/components/ParityShell.tsx` render the production header, footer and head metadata (mirroring `site/pages/[...path].astro`) around non-snapshot pages. `/lab/population-workbench/` and `/lab/population-workbench/methodology/` import `PopulationWorkbenchPage` / `PopulationWorkbenchMethodology` unchanged; `site/components/workbench/workbench-shell.css` ports the retired layout's typography as low-specificity defaults (site ink/rule tones; the workbench keeps its vermilion accent, which the lab tools also use).
- `/lab/` is a public page in the shell: intro, the "Build your own simulated population — free tool" card linking the workbench and its methodology, and the three existing tools as `client:load` islands with complete initial HTML. Codex's review-only `site/pages/lab.astro` (ProofLayout, "review" wording) is replaced and `finalize-parity.mjs` no longer deletes `dist/lab` in release mode.
- Data files `public/data/ca-pums-*.json` stay in the public allowlist and are copied to `dist/data/`.
- Route manifest: four routes with `kind: "added"` (`/lab/`, the two workbench routes, `/clients/`); `finalize-parity.mjs` includes them in the sitemap and GA4 policy; `verify-parity.mjs` checks them separately (one h1, ≥400 characters, production shell, expected content, canonical, links) and sizes sitemap/indexing by the eligible set.
- `verify-workbench.mjs`: base URL now `WORKBENCH_BASE` (default unchanged); site-wide head hosts (Google Fonts, GA4, LinkedIn footer, w3.org SVG namespace) allowed in the "no third-party hosts / no external requests" checks so the tool itself is still held to zero extra hosts.

## 2. Resume PDFs

Release build copies `public/files/` (the September 10 corrected two-page PDFs, headshot on page one) to `/files/`; the staging build keeps the July production bytes and the separate `/review-assets/files/` copies. Decision record: [release-files.json](release-files.json). The original checkout `/Users/mitchellmiler/Documents/mitchjmiller.com/public/files/` still holds the July bytes (8–9 KB); the corrected files were taken from this checkout's `public/files/`, identical to `origin/codex/astro-html-staging-20260911:public/files/`.

| Path | Before (gh-pages 923dfd8) | After (release) | Bytes |
|---|---|---|---|
| /files/Mitchell-Miller-Search-Systems-Background-2026.pdf | 80dc6d91… (9,432) | **8f48d7d786880c3a2c6f745174bf21a06af114da1cb14c146ecb342972ad8587** | 421,917 |
| /files/Mitchell-Miller-AI-Search-Systems-Background-2026.pdf | 316f0d65… (8,933) | **f5f4564846729c20dc3105d6ab44e0a1443ed6fc8df33a5d8b9aa3433b018914** | 421,854 |
| /files/Mitchell-Miller-Product-Systems-Background-2026.pdf | a5182dd9… (9,116) | **4f08e5861180b2111442bda249c3062c832e725fe3c766b756cc14c86d9a857d** | 421,918 |
| /files/Mitchell-Miller-Organic-Systems-Background-2026.pdf | 4175811e… (9,179) | **82837461bd20e3b2380c441996aec6ad92eb97e86402f628e4bc26b9d65a7291** | 421,926 |

All four "after" hashes equal `docs/overhaul-2026-09-10/resumes/validation/qa-report.json`; the crawl fetched each over HTTP (200, `application/pdf`, exact bytes).

Resume HTML wording: `/resume/` (and the header download dialog, same registry `baseline/src/lib/resumes.ts`) contains only the four labels, one-line descriptions, signal tags and talk tracks — no employer dates or titles — so nothing on the resume page contradicts the corrected PDFs. Constraint for any future edit of that page: Clarity AI ends February 2026; Stanford Health Care through December 2025; Apple title "Program Manager, SEO - Americas Region (AMR)"; SFC Surf School is the current (present) position. Other pages were not edited for chronology (out of scope by instruction).

## 3. Contact form

Contract from `/Users/mitchellmiler/Documents/mitchjmiller-cloud/docs/cloudflare/README.md` (lane 3): `POST https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact`, multipart accepted, fields `name`, `email`, `topic`, `message`, `turnstileToken`/`cf-turnstile-response`, `source_url`; Turnstile sitekey `0x4AAAAAAEwq_uUlQ6tYWRDc`. Health probe at 20:58 UTC: `{"ok":true,"service":"mitchjmiller-api"}`.

Implementation (`baseline/src/pages/contact.tsx`, handler in `site/components/parity/enhance.ts`): static HTML form under "Send a message" (name, email, topic select with `population-simulation`, message, Turnstile div, submit, `role=status` line); the Turnstile script tag loads only on the contact page; fetch posts `FormData` plus `source_url`; messages map the Worker's responses (200 ok → "your message was received"; validation → fields marked `aria-invalid`; `turnstile_failed` → widget reset; `rate_limited`, `origin_not_allowed`, network → honest failure with the email address). Without JavaScript a `<noscript>` style hides the form and the existing email/LinkedIn/phone cards and mailto remain.

Verified in headless Chrome against a mocked endpoint (the Worker's CORS allowlist does not include 127.0.0.1:5193, so a real post is only possible from mitchjmiller.com): pre-fill, 200 success message + form reset, 400 validation message + `aria-invalid`, network-failure message, JavaScript-off fallback. Turnstile itself was blocked during QA and must be seen rendering on the live page (morning item).

## 4. /clients/ entrance

`site/pages/clients/index.astro`: "Client workspace sign-in", one paragraph, button to `https://mitchjmiller-clients.pages.dev/`, link to /contact/. Indexable, in the sitemap, not in the header/footer navigation. Manifest gives it a 250-character text floor because it is deliberately short.

## 5. Release output checks

- `sitemap.xml`: exactly 57 URLs = 53 parity routes + `/lab/` + two workbench routes + `/clients/` (no placeholders, no review routes). See the deviation note on `/lab/` below.
- `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://mitchjmiller.com/sitemap.xml`.
- `noindex` appears only on `404.html` and the four retained Coming Soon placeholders (`/blog/traditional-seo-to-ai-search/`, `/blog/aeo-geo-measurement-framework/`, `/blog/entity-seo-for-ai-retrieval/`, `/blog/enterprise-seo-business-cases/`), matching production's placeholder policy; all 57 sitemap pages carry `index, follow`.
- One self-canonical per page (61 routes checked; `/case-studies/sfc-surf-school/` gets its canonical injected by finalize as before).
- GA4 `G-HCKYWCZQ8E`: exactly one loader on each of the 57 indexable pages, none on placeholders/404.
- Real `404.html` in the site shell with public copy ("Page not found" + links) replacing the former developer note; static server returns HTTP 404 with it for unknown routes, including `/blog/does-not-exist/` and `/lab/missing/`.
- `CNAME` = `mitchjmiller.com`; `.nojekyll` present (required: assets live under `_astro/`).
- No `review/`, `design/`, `proof/`, `themes/`, `review-assets/`, `artifacts/`, `_headers`, `_redirects` or `*.map` in the output; every HTML document is a manifest route or 404.html; no `content-drafts`/`content-studio` references; no credential-shaped strings in text output.

## 6. Independent QA

- (a) JavaScript-off crawl — `node scripts/qa/crawl.mjs` over `node scripts/qa/serve.mjs dist 5193`: every manifest route from the built files and over HTTP (200 and byte-identical body); exactly one h1; main text ≥ 300 (general) / 700 (case) / 1,500 (article, note) / 400 (added) characters; canonical; title and description present and unique across routes; robots policy; GA4 once; all 2,446 internal links and assets resolve (extensionless links 301 → 200 as on GitHub Pages); every `<img>` has an `alt` attribute. 757/757.
- (b) PDFs: 200 with the corrected hashes (table above).
- (c) Unknown routes: HTTP 404 with the 404 document (four examples).
- (d) Former missing routes `/blog/gbp-2026-ai-grounding/` and `/blog/studying/hermes-concepts-field-guide/`: 200, one h1, full bodies (≥1,500 characters; the parity verifier also confirms complete article/note text).
- (e) Screenshots (puppeteer-core, local Chrome) at 1360×900 and 390×844 for home, work, a case study (CommonSpirit locations), the SFC case, a writing post (GBP 2026), a study note with a Mermaid diagram (Hermes field guide), lab, workbench (+ methodology), resume, contact, clients and 404: full page and above-the-fold captures in `screenshots/` (files over 1 MB are regenerable and not committed). Inspected: no horizontal overflow (measured `scrollWidth` ≤ viewport on all 26 captures), no broken images, no placeholder/developer text, one h1 per DOM, no console or page errors. Finding: an early full-page capture showed blank case-card images on the home page — a lazy-loading artifact of the capture, not a defect (the crawl resolved every image and the capture now scrolls the page first; `home-1360.png` shows the images).
- (f) Hydration: the three lab islands hydrate (`astro-island` loses `ssr`), their controls toggle `aria-pressed`, the workbench reaches `data-workbench-state="ready"` and a filter chip changes the weighted count (39,512,222 → 19,219,404), the Mermaid diagram renders to SVG with the source kept in a `details` element, the resume dialog opens on click and closes on Escape and offers the four PDF paths — all with zero console or page errors. Third-party hosts (fonts, GA4, Turnstile, LinkedIn) were blocked during QA so no analytics hits were sent.

## 7. Fixes made in the release branch

- Public 404 copy and site shell on the 404 document (was a developer note without navigation).
- Footer "Lab" link (the only navigation change; the header nav is untouched).
- `finalize-parity.mjs` keeps `dist/lab` in release mode; `prepare-astro-staging.mjs` gains the release PDF source; `package.json` passes `SITE_BUILD_MODE=release` to the prepare step.
- `verify-workbench.mjs` and `verify-parity.mjs` extended as described; no site restyling.

## 8. Decisions and deviations for the lead

1. **`/lab/` is public and in the sitemap (57 URLs, not 56).** Production has no `/lab/` (live returns 404) and Codex's build kept it review-only. The workbench needs a public parent and the plan/QA brief expects the three tools to ship, so `/lab/` is in the release. To drop it: remove the `/lab/` manifest entry, delete `site/pages/lab/index.astro`, retarget the workbench crumb links and the footer link, rebuild.
2. The three lab tools are Claude's earlier proposal content (`src/components/lab/`), presented without the review wording; the growth readout uses the recorded SFC Search Console comparison already published in the SFC case.
3. Contact form and Turnstile can only be exercised for real from `https://mitchjmiller.com` after publication.
4. GA4 was blocked during QA; the realtime check is a morning item.
5. Screenshots over 1 MB (home, SFC, note, post full pages) are not committed; regenerate with `node scripts/qa/browser.mjs`.

## 9. Not verified / remaining

- Live Worker submission, Turnstile rendering, GA4 realtime, Search Console sitemap submission (post-publish).
- No Lighthouse/performance run; no accessibility audit beyond structure, labels, focus styles and one-h1 checks; external link health not re-audited.
- Lane-2 open decisions for Mitch (methodology reuse statement; UBI runs on the filtered selection) are unchanged.
- The Cloudflare Pages mirror (`mitchjmiller-com.pages.dev`) still serves the noindex staging build; do not activate its custom domain until the release build is deployed there (lane 3 README).
- `origin/codex/html-parity-design-20260911` had no commits after `bc8f019` at the last fetch; re-checked before pushing.
