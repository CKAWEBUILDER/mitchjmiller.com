# Mitchell Miller portfolio

Read [PROJECT.md](PROJECT.md) for current source, review state, permissions and the exact next task. [AGENTS.md](AGENTS.md) is the shared operating contract; [CLAUDE.md](CLAUDE.md) references the same records.

The current branch implements the production portfolio as complete Astro HTML and keeps a separate new design candidate at `/design/`. The existing owner-private stage now serves this branch’s validated implementation. This task did not update the public site. See [implementation evidence](docs/implementation-2026-09-11/README.md).

## Commands

```sh
npm ci
npm run dev                    # Astro, localhost:5191
npm run build                  # noindex, analytics-free review in dist/
node scripts/serve-review.mjs dist 5191
npm run typecheck
npm run build:release-candidate # local only; removes review routes/assets
```

After a release-candidate test, run `npm run build` again before private publication. `npm run build:production`, `build:github` and `deploy:cloudflare` deliberately remain gated. GitHub source must be pushed before an authorized host update. Never use the legacy deployment scripts for the Astro build.

## Implementation map

- `baseline/src/`: production source snapshot, with static-navigation/enhancement adapters. Canonical source commit is recorded in the [asset manifest](docs/implementation-2026-09-11/production-files.json).
- `site/components/ParityPage.tsx` and `site/pages/[...path].astro`: complete production HTML and route metadata.
- `baseline/public/`: exact original PDFs and standalone SFC report. Shared images remain in `public/images/`.
- `site/lib/content.ts`: content/image references shared by parity and candidate.
- `site/pages/design/`, `site/layouts/CandidateLayout.astro`, `site/styles/candidate.css`: isolated design candidate.
- `site/pages/lab.astro`: three existing React islands, with complete initial content.
- `scripts/prepare-astro-staging.mjs`, `finalize-parity.mjs`, `verify-parity.mjs`: deterministic assets, indexing policy and parity checks.

## Review paths

`/review/` links the current-site migration, new candidate, expanded case proofs, newer resume PDFs and existing tools. Production PDF URLs keep production bytes. The newer resume review files live under `/review-assets/files/`. Old theme routes are historical references and are not offered as current choices.

Continue with [handoffs/parity-design-2026-09-11.md](handoffs/parity-design-2026-09-11.md). Keep earlier records as history; do not treat proposed overnight work as completed implementation.
