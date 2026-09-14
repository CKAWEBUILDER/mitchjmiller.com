# Current refinement checkpoint

September 14: agency + software + portfolio refinement implemented on `claude/agency-redesign`; staging build/typecheck and 348 changed-page link checks pass. Private staging publication and read-only Claude review are in progress. See [current refinement record](docs/redesign-2026-09-14/README.md). Public production remains unchanged by this task; earlier release records below remain historical evidence.

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
