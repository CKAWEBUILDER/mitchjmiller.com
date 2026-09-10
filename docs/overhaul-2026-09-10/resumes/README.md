# Portfolio resume refresh - September 10, 2026

Four downloadable resumes now use the approved two-page ReportLab visual system and retain the four existing public filenames. The registry labels are Search Leadership, AI Search Engineering, Growth & Product Systems, and Organic Systems Architecture. Each shares the same employer chronology and factual evidence; the summary, sidebar focus and selected bullet order change for the audience.

## Source and truth checks

- Formatting skill: `/Users/mitchellmiler/.codex/skills/exact-resume-pdf-system/SKILL.md`. The unchanged canonical renderer is archived in `scripts/build_exact_resume.py`; `assets/resume-template/headshot_circle.png` is the approved original headshot.
- Approved formatting reference: `/Users/mitchellmiler/Documents/AA - Personal Admin/AA - Employment Docments/AA - Resumes 2026/CVSEODirectorMitchellMiller2026 (1).pdf`. Both reference pages and all eight new output pages were rendered and visually inspected. The reference establishes layout; its stale career wording is not reused.
- Career source: `/Users/mitchellmiler/Documents/Career Coach/data/resume-template/tailored_resume_rows.csv`, latest row `pyramid_marketing_manager_ii_local_seo_syndication_geo_2026` (file modified August 28). Read-only: no change to that CSV, Desktop or other application materials.
- Chronology: SFC Surf School, May 2026-Present, is the current consulting/implementation position and first experience entry. Clarity AI ends February 2026; Stanford Health Care ends December 2025. Apple is `Program Manager, SEO - Americas Region (AMR)`, August 2022-January 2024. CommonSpirit follows, September 2018-August 2022; Wpromote/DemandWave, April 2015-August 2018. Overlapping consulting roles are preserved as recorded, not silently made consecutive.
- SFC's May start is the career record's contract chronology; September 10 is the separate surf-map/article launch. Website build dates do not replace the contract start.
- SFC current work source: `/private/tmp/sfc-surf-breaks-20260910/docs/reports/kathy-2026-09-10/README.md` and its archived GSC evidence. August 12-September 8 versus July 15-August 11, 2026: 54 vs 5 clicks (+980%); 1,652 vs 470 impressions (+251% rounded). Counts and comparison period accompany the result. The September 10 interactive guide and ten break articles are a separate delivery, not credited with causing the earlier measured gains.
- The 63-page public sitemap and thirty-post Business Profile campaign are delivered scope, not claims of indexing, bookings or campaign-attributed revenue. No mixed-host GA4 totals, unverified +1,300% claim, precise local safety-query volume or assumed conversion lift is used.
- CommonSpirit's $15.21M FY22 attributable revenue, 88K appointments, 175K calls/directions, 1,000+ locations, 1,000+ entity pages, 20+ markets and 20+ migrations come from the approved career record. Apple's 38+ country sites/138 hreflang variants and Stanford's 40+ clinical service lines retain their employer attribution.
- Independent Projects contains only Domain Signal, Clear Kayak Adventures and Vet Advocates. Clarity Pulse appears only in Clarity AI. These resumes use qualitative project descriptions rather than adding unverified new outcome metrics.

## Build and QA

`portfolio_resume_rows.csv` is the internal four-row audit file, not a recruiter attachment. `scripts/build_portfolio_resumes.py` reconstructs the same rows and invokes the unchanged renderer. It resolves the repository and headshot relative to this folder; font and PDF-rendering dependencies follow the installed canonical runtime. No visual constants, typography, rail/headshot geometry, colors or spacing were edited. A temporary Fontconfig cache is set only for PNG preview rendering.

Run with the bundled Python and Poppler on PATH:

```bash
PATH=/Users/mitchellmiler/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:$PATH /Users/mitchellmiler/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 docs/overhaul-2026-09-10/resumes/scripts/build_portfolio_resumes.py
```

After visually inspecting both pages of every changed PDF, run `scripts/verify_portfolio_resumes.py` with the same Python runtime. This records file hashes and checks two letter-size pages, page-one-only headshot, text bounds, employer chronology, independent-project classification, absence of stale/fabricated terms/placeholders, numbered impact strips, black strip text, and exact column geometry. The PDF skill operation marker was run once for the four edits.

Result: all four PDFs passed. `validation/qa-report.json` records the output hashes and structural results. All eight pages were individually inspected at 144 DPI, including role spacing, main-column alignment, centered black impact text, beige rail, MITCH-only underline and preserved circular headshot. No clipped or overlapping text was found. The existing renderer places employment dates directly below the strip; its spacing was preserved.

## Delivery and next step

- `public/files/Mitchell-Miller-Search-Systems-Background-2026.pdf`
- `public/files/Mitchell-Miller-AI-Search-Systems-Background-2026.pdf`
- `public/files/Mitchell-Miller-Product-Systems-Background-2026.pdf`
- `public/files/Mitchell-Miller-Organic-Systems-Background-2026.pdf`

All paths remain compatible with existing inbound links. `src/lib/resumes.ts` retains existing IDs and public-path handling. The integrating agent owns website build/browser checks and GitHub save. This subtask neither committed nor deployed anything and created no browser tabs or server processes.
