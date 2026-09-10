# Case-study and selected-build overhaul

Completed September 10, 2026 in the isolated portfolio checkout. No deployment, email, account change or commit was performed by the content agent. Root owns final integration, static route copies and browser QA.

## What changed

- All 17 existing case-study slugs are preserved in `src/lib/data.ts`.
- `src/lib/case-study-editorial.ts` contains authored narratives, distinct challenges and decisions, scale/outcome metrics, source interpretation and relevant links for every study. The six featured studies start with SFC, then the healthcare location platform, Apple seasonal search, the content library, ClarityPulse and AEO measurement.
- `src/components/case-study-collection.tsx` provides the shared case-study collection and cards. Search matches project, client, description and tools; category filters support All work, Enterprise search, AI & measurement, Growth systems and Product experiments. Counts and empty states are accessible. All cards have actual approved visual assets.
- `src/components/portfolio-editorial.css` provides responsive cream/ink/vermilion editorial layouts, readable long-form type, focus states and reduced-motion handling.
- Work and case-study index now use that collection. Detail pages have actual images, role/context, source-labeled outcomes, full story chapters, navigation, useful live/demo links and related work.
- Selected builds retains all nine original projects and adds SFC, clearly distinguishing internal Clarity AI work, client products and independent prototypes. Every card has a working destination; prototypes without a public project page have an honestly labeled contact link.
- Corrected Apple role to “Program Manager, SEO - Americas Region (AMR)” and Clarity Digital to Clarity AI in `data.ts`. ClarityPulse is internal Clarity AI work, not a personal venture.
- Journey post removes stale San Jose claim, updates Apple and Clarity classification and adds the current SFC pilot. Date is September 10, 2026, reflecting this revision.
- Removed duplicate `multi-agent-billing-traps` entry. The article bodies were otherwise identical; the retained article uses the better wrapped SVG footer from the first duplicate to avoid clipping the second duplicate’s long single text line. No billing claims were newly researched or added in this task.

## SFC facts and source boundaries

Canonical source: `/private/tmp/sfc-surf-breaks-20260910/docs/reports/kathy-2026-09-10/README.md`, report GSC findings and original Insights capture; release source: `docs/SOUTH_SHORE_PRODUCTION_2026-09-10.md` and its production QA records in that repository.

- Google Search Console compares **Aug 12–Sep 8 with Jul 15–Aug 11, 2026**: **5 → 54 clicks (+980%)**, **470 → 1,652 impressions (+251% rounded)**. The raw counts and dates are visible in the case study.
- The ten-break map and ten related guides launched **September 10**, after that measurement window. The copy explicitly prevents attributing the preceding search growth to the map.
- Source release audit records **63 production indexable routes**, correct canonicals/sitemap, all ten interactions, controlled staging promotion and rollback verification.
- Production map uses the real **January 27, 2022 USDA-FSA NAIP aerial**, NOAA Digital Coast source, plus geographic placement and owner review. The newer SFC logo marker and homepage refinement remain staged; neither is described or pictured as the released product here.
- The 30-post GBP campaign was seven published / 23 scheduled on September 10. Historical GBP growth is not attributed to the new campaign; no booking/conversion lift is fabricated.
- “Safe surf lessons” is correctly shown as an early signal: six impressions and average position 6.5, rather than a fixed ranking or proven traffic opportunity. The larger story confidently identifies destination intent from a Waikīkī modifier. No unmeasured audience percentages are asserted.
- SFC’s previous public standalone case study contained a device figure that labeled GSC CTR as conversion rate. The new story does not repeat that error. The original standalone HTML remains in Git history/source for preservation; root will route the existing SFC slug to the revised SPA detail.
- No client email, account address, private Drive links or other recipient identity was copied into the public website.

## New public visuals

`public/images/portfolio-proof/sfc-south-shore-explorer.png`

- Exact source: SFC repo `qa/south-shore-production-review/independent-desktop-1440-map.png`.
- 1440×1000 production review screenshot (232 KB), unchanged.
- Public surf-school interface only; real aerial attribution is present in the page and caption.

`public/images/portfolio-proof/sfc-search-console-insights.jpg`

- Exact source: SFC report `gsc/01-insights-overview.png` (original bytes are JPEG despite old extension).
- Crop `(375,75,1410,826)` from 1512×827 to 1035×751 removes the global account/profile and navigation UI. Report numbers, labels and source content remain unmodified.
- Encoded JPEG quality 91; crop visually inspected. No account avatar, notification detail or private identity remains.

Existing employer/public-site screenshots, architecture illustrations and prototype interfaces are reused. Captions distinguish current public context, representative reconstructions and actual product source. No internal employer data was introduced.

## Checks and integration

- `npm run typecheck`: PASS.
- Case-study source audit: 17 slugs, 17 unique; all 17 have narratives. All known image references resolve locally. No duplicate slugs in data.ts.
- Changed-file `git diff --check`: PASS.
- New cropped Insights image visually inspected; original map screenshot visually inspected.
- Parent notified to use `/images/portfolio-proof/sfc-south-shore-explorer.png` on homepage and include `case-studies/sfc-surf-school` in generated static route copies.
- Browser/interaction/viewport review and build are assigned to root to avoid competing browser control or duplicate shared build mutations.

External source check: the web text fetch for the live SFC URL returned an older six-break cached representation, while the canonical release records and direct production screenshots establish the ten-break release. Root must use a fresh direct live HTML/browser fetch if checking current remote state; no stale search-cache text was used to rewrite the product facts.
