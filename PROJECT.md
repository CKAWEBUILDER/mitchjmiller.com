# Mitchell Miller portfolio — current state

## Latest update — overnight QA complete

Browser and native connector access recovered. All focused desktop/mobile, native-menu, resume-dialog, category-filter, Mermaid, existing-lab and JavaScript-disabled navigation checks passed. The only new fix cleans a historical study-note teaser that exposed truncated HTML markup; full source bodies remain unchanged. See [QA evidence](docs/implementation-2026-09-11/qa-overnight.md). Task browser/server resources were cleaned up. The previous authentication blocker below is historical and resolved. Next action is the authorized update of the existing owner-private Sites review from this branch, then record its exact source/version/deployment. Public release remains separate.

Updated September 11, 2026. Owner: Mitchell Miller. Canonical source: https://github.com/CKAWEBUILDER/mitchjmiller.com.git. Public domain: https://mitchjmiller.com/.

## Current objective and permissions

Mitch explicitly authorized two simultaneous tracks: convert the existing production site to complete initial HTML while preserving its appearance/content/URLs/assets, and prepare a separate new design candidate for review. Both earlier themes were rejected. The new direction follows the supplied Contiem reference: navy photographic hero, restrained white header, green actions, enterprise work first and substantial work imagery.

Local implementation, validation, GitHub source push and an update of the existing owner-private Sites review are authorized. Applying the candidate across the site requires design review. Public deployment, DNS/Cloudflare changes, private client systems, CRM/simulation work and spending are not authorized by this task.

## Locations and source/deploy state

| Item | State |
|---|---|
| Persistent canonical checkout | `/Users/mitchellmiler/Documents/mitchjmiller-html-migration` |
| Canonical checkout branch | `codex/astro-html-staging-20260911`, HEAD `424e035eba4f393c9fc7e90769181a72202a10bd` at last inspection |
| Isolated implementation worktree | `/Users/mitchellmiler/Documents/Career Coach/work/mitchjmiller-parity-20260911` |
| Implementation branch | `codex/html-parity-design-20260911`, based on `424e035` |
| Production source snapshot | main `2745c7e20cea0a30d0dc3c5341fc609bfde4b3ea` |
| Public deployed branch | gh-pages `923dfd85597253786da407fe78de6d0011bbfe16` (robots-only fix) |
| Existing private review | https://mitch-portfolio-html-staging.clearkayakrentalsoah.chatgpt.site |
| Last successful private review source | `5bca30b7b79bd84936eb0afe008a88815415bfbc`, the earlier nine-page review |

Implementation commit `c2746011e054af777ed4ac1ba9f11dfa26c64764` is committed and pushed to GitHub on the implementation branch; a documentation follow-up records the final state. The remote staging URL still shows the earlier review; do not represent it as the new candidate. Claude's original branch and proposed overnight plan were preserved. The original checkout has only the coordination addition to PROJECT.md from this task; no source overwrite or merge was performed. The original user checkout `/Users/mitchellmiler/Documents/mitchjmiller.com` and its unpublished drafts remain untouched.

## Implemented

- 53 published URLs plus four existing Coming Soon placeholders, and a real 404 document. Complete initial HTML; no whole-site React hydration.
- Production homepage/templates/styles, native links, native mobile menu/resume dialog, category filters and progressive Mermaid rendering. Full article/note bodies and source images retained.
- The standalone SFC report remains owner of `/case-studies/sfc-surf-school/`; its body and the four original production PDFs are preserved exactly. Updated review PDFs are separate.
- New `/design/` homepage and `/design/case-studies/sfc-surf-school/` full narrative candidate. Shared content and image imports; original work imagery; source/metric chronology labels.
- `/review/` hub, image-complete case previews, and the three pre-existing lab demonstrations as bounded interactive islands. No new simulation product.
- Separate staging and local release modes. Staging has noindex/no analytics. Release candidate has exactly 53 indexable sitemap URLs, excludes review pages/assets and contains one analytics loader per eligible page. Building never deploys.

## Evidence and current blocker

See [implementation and QA record](docs/implementation-2026-09-11/README.md), [route manifest](docs/implementation-2026-09-11/route-manifest.json), [staging checks](docs/implementation-2026-09-11/validation-staging.json), [release checks](docs/implementation-2026-09-11/validation-release.json), and [continuation handoff](handoffs/parity-design-2026-09-11.md).

Both static modes pass: 57 routes, 25 full article/note bodies, 160 original case fields, four exact PDFs, exact SFC report body, all local links/assets/anchors, correct indexing/sitemap policy. Typecheck and diff whitespace checks pass. Browser desktop homepage parity and candidate homepage desktop/mobile were inspected. Candidate mobile measured 390px without horizontal overflow.

Remaining interaction/case-study visual QA is blocked: automatic approval review rejected the mobile menu/scroll action because its refresh token was revoked. Sites independently returns HTTP401 `token_revoked`. The user must sign out of Codex and back in to restore the affected connection. Do not retry rejected actions through another surface or change approval settings. The full local HTTP sweep passed after authorized escalation: 62 URLs with correct200/404 status.

## Exact next task

After authentication is restored: finish the focused browser checks (candidate full case desktop/mobile; native menu, resume dialog, filters; three lab controls; representative article/diagram; unknown-route404), then commit/push any necessary QA repairs and mirror the current implementation-branch commit into the existing Sites source repository and update the existing owner-private review. Retain the same Sites project ID in `.openai/hosting.json`. Present `/review/`, `/design/`, and the full candidate case for design review. Do not restart the audit or ask for blanket implementation permission.

One integrating agent owns source/deployment. Public release remains gated on review of the concrete result. Rollback for the future public release: retain and restore gh-pages `923dfd8`; rollback for private staging: redeploy its previously saved version. No production change has occurred.

## Historical records

[Prior roadmap](docs/migration-2026-09-11/README.md), [earlier staging](docs/design-review-2026-09-11/README.md), [reviewed narratives/evidence](docs/overhaul-2026-09-10/content-evidence.md), [resume evidence](docs/overhaul-2026-09-10/resumes/README.md), [prior handoff](handoffs/astro-migration-2026-09-11.md). Old theme-selection and three-page-proof instructions are superseded by this record.
