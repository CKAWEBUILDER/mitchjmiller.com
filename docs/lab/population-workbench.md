# Population workbench v1 — "Build your own simulated population"

Lane 2 of the September 11, 2026 overnight release plan. Branch `claude/population-workbench`, worktree `/Users/mitchellmiler/Documents/mitchjmiller-workbench`. Built autonomously overnight; decisions below were made without Mitch and are open to reversal.

## What it is

A free lab tool at `/lab/population-workbench/` with a methodology page at `/lab/population-workbench/methodology/`. It runs entirely in the browser on the public-domain 2019 ACS 1-Year PUMS California sample already used by the UBI simulator (12,000 weighted person records, 686 KB). Five steps: define the question → filter the population → compare two scenarios → draw personas → export. The freemium call to action ("Want this on your customer or CRM data, calibrated and validated? Start a conversation") links to `/contact/?topic=population-simulation`. No pricing is published.

Every number is labeled by provenance: **observed** (read from a Census record), **calculated** (weighted arithmetic on records), **simulated** (UBI model output), **assumed** (typed by the user), **estimate** (arithmetic on assumptions; always tagged "Assumption-driven estimate, not a forecast"). Personas carry "Synthetic composites drawn from Census microdata. Not real people." and show attributes only — no names, photos, quotes or behaviors.

## Files

| Path | Role |
|---|---|
| `public/data/ca-pums-sample-2019.json`, `public/data/ca-pums-meta-2019.json` | Byte-for-byte copies of `ca-ubi-sample.json` / `ca-ubi-meta.json` from the mids-portfolio UBI simulator (sha256 `d397695a…`, `2c636e6f…`). Allowlisted by path in `scripts/prepare-astro-staging.mjs` (one-line change). |
| `site/islands/workbench/ubi.ts` | The verified California UBI model, byte-identical to the source (sha256 `cb4d705f…`). Logic untouched. |
| `site/islands/workbench/model.ts` | Pure model: `fromSample`, `filterPopulation`, `summarize` (weighted count/share/mean/median, six distributions), `runUbi` (wraps `simulate` on the filtered subset), `runReach`, `samplePersonas` (Efraimidis–Spirakis weighted sampling without replacement, seeded mulberry32), `buildBundle` / `buildJson` / `buildCsv` / `buildHtmlReport`. |
| `site/islands/workbench/Workbench.tsx`, `workbench.css` | React island, hydrated with `client:visible`. Dark instrument-panel treatment (`#0f1512`, pale text, thin rules). |
| `site/components/workbench/PopulationWorkbenchPage.astro` | Complete tool-page content. One import drops it into any layout. Composes `WorkbenchBaseline.astro` (build-time statewide summary, inline SVG bars, `<noscript>` notice) and `WorkbenchCta.astro`. |
| `site/components/workbench/PopulationWorkbenchMethodology.astro` | Complete methodology content: data source, weighting with a sample-vs-full-file benchmark table, label definitions, both scenarios, personas, limitations, reuse, changelog. |
| `site/components/workbench/baseline.ts` | Build-time loader (Node `fs`) that computes the baseline from the same JSON the island fetches. Never bundled for the browser. |
| `site/layouts/WorkbenchLayout.astro` | Self-contained light editorial layout (paper `#fafaf7`, ink `#1d211e`, vermilion `#cc3524`, muted `#60655e`, Arial/Helvetica). Carries the staging `noindex` meta like `ProofLayout`; the final site layout owns the production robots decision. |
| `site/pages/lab/population-workbench/index.astro`, `.../methodology/index.astro` | Two-line pages: layout + one component import. |
| `scripts/verify-workbench.mjs` | Verification (below). |
| `docs/lab/screenshots/tool-1360.png`, `tool-390.png`, `methodology-1360.png` | Headless-Chrome captures of the preview build. |

## How it works

- **Data.** Columnar JSON: one scalar `scaledWeight` (3,292.6852 = 39,512,223 ÷ 12,000) plus arrays for age, income, sex, race, education, employment. `fromSample` expands the weight to a per-record array so the model handles unequal weights; on this file that makes weight-proportional persona sampling equivalent to uniform sampling, which the methodology page states.
- **Build time.** `PopulationWorkbenchPage.astro` and the methodology page call `loadBaseline()`, which reads `public/data/*.json`, filters with defaults and computes the statewide summary and the default UBI run. Those numbers are in the static HTML; the island receives the same summary as a prop so its server-rendered markup shows real figures with disabled controls until hydration.
- **Runtime.** On first visibility the island fetches `/data/ca-pums-sample-2019.json` and the meta file (same origin, the only network requests), then recomputes everything on each input change with `useMemo`. Filtering 12,000 records and running the UBI model is a few milliseconds.
- **Scenario A** runs the ported model on the filtered subset with the uniform weight; "revenue-neutral" therefore means neutral within the selection. Statewide defaults ($1,000/month adults 18+, 30% flat tax): program cost $367.7B, tax revenue $460.6B, net gainers 18.34M, net payers 12.55M, poverty proxy 45.8% → 32.9%.
- **Scenario B** is five multiplications and one division on the weighted count. It has no behavioral content and says so in the UI, the report and the methodology.
- **Exports** are built client-side and downloaded through `Blob` + `URL.createObjectURL`. The HTML report inlines its CSS and JS, re-computes the reach estimate when its inputs are edited, embeds the persona cards and the full JSON bundle, and references no external resources. The CSV lists persona attributes plus the reported income and persons represented. The JSON carries every input, assumption, result, label definition and disclaimer with a timestamp and model version.

## Decisions made overnight

1. UBI runs on the filtered selection rather than always statewide, because the workbench's premise is "scenarios against the people you selected". The default filter is statewide, so the verification against the original model is exact.
2. The staging `noindex` meta is kept for consistency with every other page on this branch. Remove it in the final layout, not here.
3. No county/PUMA filter: the plan allowed it only "if the PUMA mapping verifies"; the sample carries no geography, so it was not attempted. Listed as a limitation on the methodology page.
4. Reuse statement: Census data public domain; exports belong to the user; the workbench code has no separate open-source license "at this time". Mitch can relax this.
5. Income bands are fixed at eight; negative and top-coded incomes are kept as reported.
6. `npm ci` needed `npm_config_cache` pointed at the session scratchpad because `~/.npm/_cacache` was not writable from this session. Nothing in the repo changed for that.

## Verification evidence

Commands run from the worktree on September 11, 2026:

```
npm ci                                            # ok (cache redirected, see above)
npm run build                                     # 11 pages; verify-astro-staging PASS
node scripts/verify-workbench.mjs --no-html       # 36 passed, 0 failed (model only)
node scripts/verify-workbench.mjs                 # 46 passed, 0 failed (+ built HTML)
npx astro preview --host 127.0.0.1 --port 5189    # 200 for both pages and the data file
node scripts/verify-workbench.mjs --screenshots   # 58 passed, 0 failed
```

What the 58 checks cover:

- Data: 12,000 records, equal column lengths, n × weight ≈ meta population (39,512,222.4 vs 39,512,223).
- UBI parity: `model.runUbi` on all records equals ported `ubi.simulate` on every scalar and grouped output; the original `ubi.ts` in the mids-portfolio tree gives identical outputs and is byte-identical; an independent plain loop matches cost, revenue, gainers and the poverty proxy; a progressive-tax run on an age 25–54 subset (4,900 records) matches the ported model.
- Filtering: full weighted count 39,512,222 = 100%; every distribution sums to the weighted count; an independent loop for employed women 25–44 earning $50k–$100k reproduces 366 records = 1,205,123 people (3.05% of California) and the weighted mean income $69,335; weighted median honors weights; empty selection returns zeros.
- Reach: worked example 1,000,000 × 50% × 20% × 5% × $120 gives 5,000 adopters, $600,000, $50 budget per adopter; cost variant and empty population handled.
- Personas: six distinct records from the filtered set only; same seed reproduces, different seed changes; count capped by selection size; on a synthetic 9:1 weight pair the heavy record is drawn 90.1% of 20,000 single draws.
- Exports: JSON round-trips; CSV has header, six rows and the disclaimer; HTML report escapes the question, carries the disclaimers, loads no external resources and includes the inline recalculation script.
- Built HTML: each page has exactly one `h1`; the tool page prints the baseline (39,512,222 people, 12,000 records, median $16,566), the persona and reach disclaimers, a `<noscript>` notice and the contact CTA; the methodology page names the data source, labels and changelog and prints the population and full-file counts from meta; no third-party hosts; data files copied into `dist/data/`.
- Browser (headless Chrome via puppeteer-core): hydration reaches `data-workbench-state="ready"` once the panel is scrolled into view (client:visible never fires without scrolling — a test-harness fact, not a bug); the hydrated count equals the build-time baseline; clicking the Employed chip updates it to 19,219,404; all three downloads land (HTML 32,564 bytes, CSV 1,121, JSON 13,347); the downloaded report recalculates in-page (96,097 → 960,970 adopters at 50% adoption); zero requests left 127.0.0.1:5189; zero page errors. Screenshots at 1360 and 390 px saved.

Not verified: the sampling procedure that produced the 12,000-record file (its script is not on this machine); the methodology page instead prints the sample-vs-full-file benchmark table computed at build time (largest gap 0.6 percentage points). No accessibility audit beyond semantic markup, labels, `aria-pressed` chips and focus outlines. No Lighthouse run.

## Commits

- `deb2e3b` data files, allowlist line, byte-identical `ubi.ts`
- `35aa5df` model module and verification script
- `4fdfb6c` layout, components, island, pages, screenshots
- (this commit) records and handoff section

## Exact next step

Lane 4 / migration lane: import `PopulationWorkbenchPage` and `PopulationWorkbenchMethodology` into the final site layout, drop `WorkbenchLayout.astro`, remove the staging `noindex`, add both routes to the route manifest and sitemap, and confirm `/contact/?topic=population-simulation` pre-fills the contact form. Then re-run `node scripts/verify-workbench.mjs --screenshots` against the merged build. Mitch to review the reuse statement and the "runs on the filtered selection" decision.
