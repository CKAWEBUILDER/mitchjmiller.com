# Current migration — September 21, 2026

Mitchell approved the `mj2.pro` domain cutover, the agency redesign, the approved public/private site tree and the M² business identity. Execution is underway in the single canonical checkout on `claude/agency-redesign`; existing uncommitted design/content work is being preserved. The release will keep GA4 `G-HCKYWCZQ8E` for continuity, keep staging analytics-free, and keep the private portal analytics-free. See [site migration record](docs/site-migration-2026-09-21/README.md) for the approved tree, templates, redirect plan, tradeoffs and progress ledger.

Current gate: **DNS. The site is dark on both domains and only Mitch can fix it.** Checked September 22, 2026: `mj2.pro` has no custom DNS records at Porkbun, so it answers with default parking (207.207.210.229/.107) and HTTPS does not connect; `mitchjmiller.com` still points at the GitHub Pages IPs but returns 404 because Pages now serves `mj2.pro`. The release artifact itself is correct — `gh-pages` carries `CNAME` = `mj2.pro`, and a fresh release build on September 22 passed typecheck, parity 57/57 + 6/6 added, and agency 59/59 with 59 sitemap URLs on `https://mj2.pro/`. The exact records to add, the forwarding rule and the rollback are in the [site migration record](docs/site-migration-2026-09-21/README.md) progress ledger. Agent DNS writes are refused by permission policy. After DNS: activate the client portal hostname, then complete GSC/GA4/LinkedIn updates. The M² LinkedIn page will use the new squared identity; Rio's invite requires exact profile resolution before it is sent.

September 22 contact-Worker fix: the deployed `mitchjmiller-api` Worker still carried its September 11 origin allowlist and rejected `https://mj2.pro`, which would have broken every contact submission after cutover. Redeployed from committed source (version `cdf6a033`, rollback `8a08874e`) and verified by CORS probe. Also scoped Tailwind's auto-detected sources so the newly committed `src/ds` mirror and content-studio prose stop emitting unused utilities; re-verified with crawl 844/844 over 63 routes and browser QA 233/233.

September 22 housekeeping: the previously uncommitted content-studio work, `.design-sync` previews, the `src/ds` React component mirror and refreshed QA screenshots are committed and pushed on `claude/agency-redesign` at `2b73738`. Generated infographic exports (~114 MB) are gitignored and regenerate with `cd content-studio/viz/kit && npm run export`.

# Previous hold — September 15, 2026

The latest voice direction pauses the new reference-matching homepage work while Mitchell compares Contiem’s homepage with its Technical Writing page. No changes were started for that new request. Earlier home/Services refinement and the ten-logo/five-palette comparison remain saved locally and validated; they were not committed, pushed or newly deployed by this turn. Do not publish while paused. The existing private host still carries the earlier version 4 recorded below.

Logo feedback: option 10, **Roundel**, is the closest starting point, but none of the ten is approved. Editorial and Principal Signature were rejected. A separate design agent owned by the originating voice task handles the math/data-inspired next round; this task’s duplicate generation assignment was stopped. No replacement or selected palette is authorized. Resume only after Mitchell settles the reference and asks implementation to continue. The intended main CTA opens the existing contact form.

# Current refinement — September 14, 2026

The centered home/Services refinement and ten M² / five palette comparison are implemented and validated in the single canonical checkout on `claude/agency-redesign`. One hero CTA, actual brand logos before Strategy through delivery, solid topic icons, shorter copy, native evidence/FAQ disclosures. Logo and palette await Mitchell’s choice. Read [current refinement](docs/redesign-2026-09-14/refinement.md), [copy/positioning](docs/redesign-2026-09-14/concise-copy.md) and [options](docs/redesign-2026-09-14/palette-options.md). Private review publication is the remaining lead step; public production is unchanged by this task. Earlier entries below are historical.

# Earlier refinement checkpoint (superseded below in history)

September 14: agency + software + portfolio refinement implemented on `claude/agency-redesign`; staging build/typecheck and 348 changed-page link checks pass. Private staging publication and read-only Claude review are complete. Review: https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site . Direct design review fixes were applied; lead notification and conversion tracking are recorded follow-ups. M² is a proposed brand, not selected or implemented. See [current refinement record](docs/redesign-2026-09-14/README.md). Public production remains unchanged by this task; earlier release records below remain historical evidence.

Content draft (September 14, 19:35 EDT, Claude Code): new Writing post draft `content-studio/drafts/2026-09-14-growth-engineering-without-the-title.blog.md` (untracked, unpublished; studio gate elements present; Semrush volumes unverified, API units exhausted). Publish mechanics unchanged (`blogPosts` entry in `src/lib/data.ts`). Two claims flagged for Mitch in the draft notes. Codex check-in: `/Users/mitchellmiler/Documents/ai-os/ops/overnight-2026-09-11/status-content-blog-2026-09-14.md`. No source, staging or production change. 19:55 EDT correction from Mitch: the narrative draft conflated the brief; the assignment is data-viz-first posts (stat-shock copy anointing vivid, moving, interactive artifacts) plus two scheduled routines (blog research 1–3x/week, LinkedIn syndication). Content-engine agents are now active ONLY under `content-studio/research/`, `content-studio/viz/`, `content-studio/routines/`, `content-studio/drafts/` and a new project folder `/Users/mitchellmiler/Documents/li-syndication/`; they do not touch site/, src/, public/ or root records. Scheduled local tasks created 21:2x EDT: `blog-research-dataviz-draft` (Mon/Wed/Fri 06:00 ET, research + data-viz draft, never publishes) and `linkedin-syndication-queue` (Tue/Thu/Sat 07:00 ET, queue for one-tap approval, never posts); playbooks in `content-studio/routines/` and `/Users/mitchellmiler/Documents/li-syndication/`.

Content engine outcome (23:31 EDT, Claude Code): four living infographics built from the kit at `content-studio/viz/kit/` with real, sourced data: `growth-title-market`, `search-results-by-intent`, `statistician-vs-data-scientist` and `b2b-vs-b2c-by-vertical` (critic C re-check passed after fixes); post drafts and LinkedIn teases in `content-studio/drafts/2026-09-14-<slug>.blog.md` and `.linkedin.md`, all `approved: no`; critic reports in `content-studio/routines/runs/2026-09-14-critic-A.md`, `-B.md`, `-C.md`. Private review: https://claude.ai/artifact/MeCGHxD3j722cYJ371bTTd . Publish path for the release owner after Mitch's approval: copy `content-studio/viz/<slug>/index.html` to `public/viz/<slug>/index.html`, add the `blogPosts` entry with the FAQPage block, then RELEASE-READY.md. Still no site/src/public edits and no commits from the content agents.

Infographic direction reset (2026-09-15 07:59 EDT, Claude Code): Mitch rejected the first visual layer (dark dashboard tiles) as a conflation of the site's austere palette with the infographic brief (bright, mandala/fractal-structured, motion-first, dense reference posters per `content-studio/PIPELINE-2026-09.md`). Five competing directions were built on the search-intent ledger under `content-studio/viz/directions/01-data-mandala`, `02-fractal-stack`, `03-reference-poster`, `04-neon-arcade`, `05-journey-map` (each: self-contained index.html, poster PNGs, looping GIF, README). Pick-one page: https://claude.ai/artifact/Gg4VL8roc2pc1AnYCoFrRH . One unsourced figure (64.9% People Also Ask) was excluded from the ledger and swapped on the posters that carried it. The four existing artifacts keep their data and interaction engine; their visual layer is rebuilt in the direction Mitch picks. No site/src/public edits, no commits.

# Mitchell Miller portfolio — current state

Updated September 14, 2026 at 15:13 EDT. Owner: Mitchell Miller. GitHub: https://github.com/CKAWEBUILDER/mitchjmiller.com.git.

## AGENCY REDESIGN — September 14, 2026 (built, not merged, not deployed)

Mitch's order (September 14): position the site as an agency (portfolio present but secondary), copy the Contiem.com structure/templates/style with green CTAs instead of teal, add a scrolling brand-logo carousel on the homepage and the Services page, keep SEO.

| Item | State |
|---|---|
| Branch / checkout | `claude/agency-redesign` from `main` `5cf4ab1`, single checkout `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`, pushed to origin. Live production is unchanged (gh-pages `79de2b6`). |
| Built | Agency shell (`site/layouts/AgencyLayout.astro`, `site/styles/agency.css`, `site/lib/agency.ts`), new home (`site/pages/index.astro`), new `/services/` (manifest kind `added` → 58 published URLs), `site/components/BrandMarquee.astro` fed by `site/data/brands.json` (content worker, 12 entries), all other templates in the new shell with content unchanged; JSON-LD (ProfessionalService + Person on home, Service + FAQPage on services, Article/CreativeWork elsewhere). Copy pack `content-studio/drafts/2026-09-14-agency-copy-pack.md` adopted for lifecycle lines, objectives bodies, services stages/process/FAQ, industries and meta titles. |
| Decisions | Green `#14804a` (4.98:1 white text; 3.13:1 against the navy hero `#0f2440` — the suggested `#0b6b3a` fails 3:1 there); SFC explorer image as the hero photo; five evidence-backed industries; `/work/` stays the complete collection page; standalone SFC report stays outside the shell (parity rule). Full list: [docs/redesign-2026-09-14/README.md](docs/redesign-2026-09-14/README.md). |
| Evidence | typecheck PASS; staging and release builds PASS (verify-parity 57/57 + 5/5 added, 58 sitemap URLs; new verify-agency PASS); JavaScript-off crawl 831/831 over 62 routes; headless Chrome 233/233 with screenshots at 1360/390 under `docs/redesign-2026-09-14/screenshots/`. |
| Open for Mitch | Hero headline (brief's sentence vs. the pack's three options), rights-cleared logo files for the marquee, About opener (§g of the pack) not applied, SFC report inside/outside the shell. |
| Next task | Mitch reviews locally (`npm run build:release-candidate && npm run qa:serve` → http://127.0.0.1:5189/) and decides the open items; the lead merges `claude/agency-redesign` into `main` and publishes per [RELEASE-READY.md](RELEASE-READY.md), then resubmits the 58-URL sitemap (Search Console, IndexNow) and re-runs the live probes. |

Continuation record: `handoffs/parity-design-2026-09-11.md` ("Agency redesign 2026-09-14"). Status file: `/Users/mitchellmiler/Documents/ai-os/ops/overnight-2026-09-11/status-redesign-build.md`.

## PUBLISHED — September 11, 2026 (release owner: Claude Code)

- 17:14 EDT: gh-pages `1b2d2a6` (previous `923dfd8`) from release source `c422377`; `main` fast-forwarded. Artifact sha256 `18b6093162b76fddff62aa088013eff67090eb2779c4746fd438a00f6ac7f6d7`, rebuilt and hash-matched immediately before deploy.
- Live probes 17:15 EDT after Pages reported `built`: home 200, one h1, no `noindex`; robots allows all and declares the sitemap; sitemap 57 URLs; Search Systems PDF sha256 begins `8f48d7d7` (corrected file); `/blog/gbp-2026-ai-grounding/` and `/blog/studying/hermes-concepts-field-guide/` 200 (formerly 404 shells); `/lab/population-workbench/` and `/clients/` 200; unknown route 404 with the real 404 page; Turnstile on `/contact/`.
- 17:41 EDT follow-up: gh-pages `79de2b6` from source `c52664f` adds only the IndexNow key file `/9b0893b8818bd5bce05d66051f2bc971.txt` (artifact sha256 `6d2a55c4e8e8891c9ad06d941848e1175690b9dd67ba85e42e721512f11c3325`, manifest `docs/release-2026-09-12/artifact-manifest-indexnow.txt`, one-file diff verified). All 57 URLs submitted to IndexNow: `202 Accepted`. Google does not use IndexNow; Search Console submission is a morning item.
- Cloudflare Pages mirror `mitchjmiller-com` carries the 17:14 artifact plus an `X-Robots-Tag: noindex` header scoped to the pages.dev host; custom domains stay pending until the zone exists. Client portal Pages project set to `fail_open: false` at 17:50 EDT.
- Not released: the new design candidate (Codex, private review hub). Production shows the parity appearance.
- Rollback: in a clean gh-pages worktree, `git revert --no-edit 79de2b6 1b2d2a6 && git push origin gh-pages`.
- Morning: Search Console sitemap submission and indexing requests; GA4 realtime check; live contact test (`node cloudflare/api-worker/scripts/leads.mjs 5` from the cloud worktree); design-candidate decision; Cloudflare zone and custom-domain activation.

## Release candidate 2026-09-12 — verified (published as above)

Branch `claude/release-2026-09-12` in worktree `/Users/mitchellmiler/Documents/mitchjmiller-release` (from Codex's `codex/html-parity-design-20260911` at `bc8f019`, plus lane 2 `claude/population-workbench` merged at `a6abd03`). Release source commit `c422377`; artifact hash `18b6093162b76fddff62aa088013eff67090eb2779c4746fd438a00f6ac7f6d7` (sorted sha256 of `dist/`, reproduced by two builds). Public site updated: `gh-pages` is now `79de2b6` (see PUBLISHED above).

| Item | State |
|---|---|
| Content | 53 production-parity routes (exact content, complete HTML) + `/lab/` (three existing tools as islands, workbench card) + `/lab/population-workbench/` and `/methodology/` + `/clients/` sign-in entrance. Sitemap 57 URLs; four Coming Soon placeholders stay reachable/noindex. Design candidate not included. |
| Resume PDFs | Corrected September 10 files at the existing four paths in the release build (`docs/release-2026-09-12/release-files.json`); staging build keeps the July bytes. |
| Contact | Real form → `https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact` with Turnstile; mailto path kept without JavaScript; `?topic=population-simulation` pre-fills. Live submission is a post-publish probe. |
| QA | verify-parity PASS, verify-workbench 58/58, typecheck PASS, JavaScript-off crawl 757/757, headless Chrome 203/203 with screenshots — [qa-report](docs/release-2026-09-12/qa-report.md). |
| Next task | Lead reads the QA report and publishes per [RELEASE-READY.md](RELEASE-READY.md) (clean `gh-pages` worktree from `923dfd8`, replace contents with `dist/`, push, probes; rollback = revert or reset to `923dfd8`), then morning items (Search Console sitemap, GA4 realtime, live contact test, merge to `main`). Decisions for Mitch in the QA report §8. |

Lane status files: `/Users/mitchellmiler/Documents/ai-os/ops/overnight-2026-09-11/`. Continuation record: `handoffs/parity-design-2026-09-11.md` ("Release candidate 2026-09-12").

## Implementation state recorded September 11, 2026 (Codex parity build)

## Completed outcome

The production-parity complete-HTML migration and separate new design candidate are implemented, validated, committed/pushed, and published to the existing owner-private Sites review. The previous authentication interruption is resolved. This task did not change the public domain, DNS or public production deployment.

- [Review hub](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/review/)
- [Current-site HTML migration](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/)
- [New homepage candidate](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/design/)
- [Full SFC case candidate](https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site/design/case-studies/sfc-surf-school/)

## Source and deployment

| Item | State |
|---|---|
| Canonical persistent checkout | `/Users/mitchellmiler/Documents/mitchjmiller-html-migration` — Claude's independent release work; preserve its changes |
| Release candidate worktree | `/Users/mitchellmiler/Documents/mitchjmiller-release`, branch `claude/release-2026-09-12` (see the section above) |
| This isolated implementation | `/Users/mitchellmiler/Documents/Career Coach/work/mitchjmiller-parity-20260911` |
| Branch | `codex/html-parity-design-20260911` |
| Verified deployed source | `59d84a980dc6b99302dbecf62f62e399a93f9ea0`; subsequent documentation commits do not imply a different deployment |
| Private review | Sites version2, owner-only; exact IDs/evidence in [publication.json](docs/implementation-2026-09-11/publication.json) |
| Production source baseline | main `2745c7e20cea0a30d0dc3c5341fc609bfde4b3ea` |
| Public deployment baseline | gh-pages `923dfd85597253786da407fe78de6d0011bbfe16`; read live state before any separate release because Claude owns that work |

GitHub source was pushed before the identical commit was mirrored into the existing Sites repository. The validated staging artifact was packaged from this source and privately deployed; terminal status succeeded. No new Site was created. The old private version remains a rollback option. Original user checkout/drafts and Claude proposal/source changes were preserved.

## Implementation and decisions

- 53 published URLs, four retained Coming Soon/noindex placeholders, and404. Full original article/note bodies, native links and production styling. No whole-site client hydration.
- The standalone SFC report remains owner of its original URL with identical body. Four original production PDFs retain exact bytes. Newer review PDFs stay at `/review-assets/files/`.
- New design uses the supplied Contiem direction: navy photographic hero, quiet white header, green actions, enterprise work first, substantial actual work imagery. Both older themes were rejected; they are historical references only.
- `/design/` and its full SFC case share content/image sources with the migration. Applying this candidate to other pages awaits design review.
- Existing three lab demonstrations are bounded islands. No new simulation, CRM or client portal was built by this task.
- Explicit small parity exceptions: native document navigation/enhancements, duplicate identical article listing removed, SFC category repaired for filters, and one historical teaser cleaned of truncated HTML. Full content was not rewritten.
- Staging: noindex and no analytics. Local release mode: exactly53 indexable sitemap URLs, placeholders still noindex, review pages/assets excluded and one analytics loader per eligible page. Build commands do not deploy.

## Validation

[Focused browser QA](docs/implementation-2026-09-11/qa-overnight.md) passed: full SFC candidate desktop/mobile, both menus, resume dialog/Escape, writing/build filters, Mermaid SVG/source fallback, all three lab controls and native resume navigation with JavaScript disabled. Screenshots are linked there. No horizontal overflow at390px on tested views.

[Static staging](docs/implementation-2026-09-11/validation-staging.json), [local release](docs/implementation-2026-09-11/validation-release.json), both TypeScript configurations and [62 HTTP checks](docs/implementation-2026-09-11/validation-http.json) passed. Full checks cover57 retained routes,25 complete article/note bodies,160 case fields,4 exact PDFs, the exact SFC report body, local assets/links/anchors, sitemap/indexing and missing-page404. Local visual parity was checked against an analytics-free export of deployed production. External destination health and public indexing were not claimed.

## Ownership, permissions and next step

Mitch authorized implementation, source pushes, private review publication and coordinated overnight agents. Codex's authorized portfolio work is complete. Review the new homepage/full case, then decide whether to extend the design. Claude is the sole public release owner: the parity track plus lanes 2/3 is the verified release candidate above (release decision recorded in the overnight coordination file); Codex's implementation task did not promote production or alter DNS. Do not infer approval of the rejected themes from older proposals.

The overnight coordinator and Claude use their existing private coordination document and per-owner status files under `/Users/mitchellmiler/Documents/ai-os/ops/overnight-2026-09-11/`. Read their current claims before starting work; do not duplicate Finance, Date Night, DomainSignal, Gmail or AI OS writers.

All task-specific portfolio browser/server resources were closed, viewport/script testing restored, and credentials kept out of source/records. Follow [handoff](handoffs/parity-design-2026-09-11.md) for the concrete next step. [Earlier roadmap](docs/migration-2026-09-11/README.md), [implementation detail](docs/implementation-2026-09-11/README.md), [content evidence](docs/overhaul-2026-09-10/content-evidence.md) remain linked references.
