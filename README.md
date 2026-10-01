# Mitchell Miller portfolio

Read [PROJECT.md](PROJECT.md) for current source, review state, permissions and the exact next task. [AGENTS.md](AGENTS.md) is the shared operating contract; [CLAUDE.md](CLAUDE.md) references the same records.

Production is https://mj2.pro/, built only from main and served from GitHub Pages gh-pages; releases follow RELEASE-READY.md and are recorded at the top of PROJECT.md. M² source lives in /Users/mitchellmiler/Documents/mitchjmiller-html-migration (where.py mj2.pro) on short-lived branches fast-forwarded into main. Mitch's separate personal portfolio lives in /Users/mitchellmiler/Documents/mitchjmiller.com (where.py mitchjmiller.com) and has its own repository and release record. The old duplicate M² checkout was preserved at ~/Archive/2026-09-25/mitchjmiller.com-stale-clone/. Branch claude/agency-redesign was archived on 2026-09-25 (handoffs/2026-09-25-one-checkout-reconciliation.md).

History (September 12): branch `claude/release-2026-09-12` was the verified public release candidate: the production-parity complete-HTML site (53 archived routes), the public lab and population workbench, the `/clients/` entrance, the contact form wired to the Cloudflare Worker, and the corrected September 10 resume PDFs. Publication to `gh-pages` is a separate, lead-owned step described in [RELEASE-READY.md](RELEASE-READY.md); QA evidence is in [docs/release-2026-09-12/qa-report.md](docs/release-2026-09-12/qa-report.md). The separate design candidate at `/design/` stays on the private review only. Earlier implementation evidence: [docs/implementation-2026-09-11/README.md](docs/implementation-2026-09-11/README.md).

## Design review (September 14–15, history)

The centered agency refinement shipped with the agency redesign from `main` on 2026-09-21; the M² logo choice is still open. [Refinement record](docs/redesign-2026-09-14/refinement.md) documents the changes and validation. Private-stage routes `/`, `/services/`, `/review/`, and `/review/brand-options/` (staging build only; release output removes `/review/`) show the design and ten-logo/five-palette comparison. The older release descriptions below remain historical.

## Commands

```sh
npm ci                          # if ~/.npm is not writable: npm_config_cache=/private/tmp/claude-501/npm-cache npm ci
npm run dev                     # Astro, localhost:5191
npm run build                   # noindex, analytics-free review in dist/ (production PDF bytes)
node scripts/serve-review.mjs dist 5191
npm run typecheck
npm run build:release-candidate # release output in dist/: indexable, GA4, sitemap, CNAME/.nojekyll, corrected PDFs, no review routes

# Release QA (see docs/release-2026-09-12/qa-report.md)
node scripts/qa/serve.mjs dist 5193 &            # GitHub Pages-like static server (404.html for unknown routes)
node scripts/qa/crawl.mjs                        # JavaScript-off crawl of every manifest route + artifact checks
node scripts/qa/browser.mjs                      # headless Chrome: screenshots at 1360/390, hydration, contact form, 404
WORKBENCH_BASE=http://127.0.0.1:5193 node scripts/verify-workbench.mjs --screenshots
```

`npm run build` (staging) and `npm run build:release-candidate` both write `dist/`; rebuild the mode you need before packaging. `npm run build:production`, `build:github` and `deploy:cloudflare` deliberately remain gated. GitHub source must be pushed before an authorized host update. Never use the legacy deployment scripts for the Astro build.

## Implementation map

- `baseline/src/`: production source snapshot, with static-navigation/enhancement adapters. Canonical source commit is recorded in the [asset manifest](docs/implementation-2026-09-11/production-files.json).
- `site/components/ParityPage.tsx` and `site/pages/[...path].astro`: complete production HTML and route metadata.
- `baseline/public/`: exact original PDFs and standalone SFC report. Shared images remain in `public/images/`.
- `site/lib/content.ts`: content/image references shared by parity and candidate.
- `site/pages/design/`, `site/layouts/CandidateLayout.astro`, `site/styles/candidate.css`: isolated design candidate.
- `site/layouts/ParityShell.astro` + `site/components/ParityShell.tsx`: production header/footer/head around non-snapshot pages.
- `site/pages/lab/index.astro`: public lab page (three existing React islands plus the workbench card); `site/pages/lab/population-workbench/`: population workbench tool and methodology (content in `site/components/workbench/`, island in `site/islands/workbench/`, data in `public/data/`).
- `site/pages/clients/index.astro`: public entrance to the private client workspace.
- `scripts/qa/`: release QA (static server, JavaScript-off crawl, headless-Chrome checks).
- `scripts/prepare-astro-staging.mjs`, `finalize-parity.mjs`, `verify-parity.mjs`: deterministic assets, indexing policy and parity checks.

## Review paths

`/review/` (staging build only) links the current-site migration, new candidate, expanded case proofs and existing tools. In the staging build the production PDF URLs keep the July production bytes and the newer resume files live under `/review-assets/files/`; the release build ships the corrected September 10 PDFs at the production URLs (`docs/release-2026-09-12/release-files.json`). Old theme routes are historical references and are not offered as current choices.

Continue with [handoffs/parity-design-2026-09-11.md](handoffs/parity-design-2026-09-11.md). Keep earlier records as history; do not treat proposed overnight work as completed implementation.
