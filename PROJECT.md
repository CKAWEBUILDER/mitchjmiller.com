# Mitchell Miller portfolio — current state

Updated September 11, 2026 at 17:12 EDT (21:12 UTC). Owner: Mitchell Miller. GitHub: https://github.com/CKAWEBUILDER/mitchjmiller.com.git.

## Release candidate 2026-09-12 — verified, not yet published

Branch `claude/release-2026-09-12` in worktree `/Users/mitchellmiler/Documents/mitchjmiller-release` (from Codex's `codex/html-parity-design-20260911` at `bc8f019`, plus lane 2 `claude/population-workbench` merged at `a6abd03`). Release source commit `c422377`; artifact hash `18b6093162b76fddff62aa088013eff67090eb2779c4746fd438a00f6ac7f6d7` (sorted sha256 of `dist/`, reproduced by two builds). Public site unchanged: `gh-pages` is still `923dfd8`.

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
