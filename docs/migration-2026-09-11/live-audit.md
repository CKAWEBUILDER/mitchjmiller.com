# Current LIVE website audit - September 11, 2026

Read-only audit of https://mitchjmiller.com/ captured around 2026-09-11T05:02:20.037149+00:00. This is the production version before the root agent's planned narrow crawl-access fix. No redesign source is represented as live. Root's subsequent deployment verification supersedes the crawl/meta observations below when changed.

## Scope and provenance

Live homepage, resume-page HTML, standalone SFC report and all four PDF bytes match the existing deployed `origin/gh-pages` revision `a71410b` exactly. Application source is `origin/main` revision `0f9e48c` (August 31 / September 1 depending timezone). The proposed September 10 overhaul and its corrected resume PDFs are separate, unpublished artifacts at this capture.

## Immediate discoverability blockers

1. **Crawling is blocked.** Live `/robots.txt` returns 200 and `User-agent: *` / `Disallow: /`, plus explicit disallows for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot and Applebot. Removing this block permits compliant crawlers to fetch URLs; it is not confirmation of indexing.
2. **Indexing is separately disabled for the React site.** Live homepage and resume HTML contain `noindex, nofollow, noarchive`. Their exact live application source also sets this directive in the SEO component after render. Thus changing only robots.txt leaves explicit noindex instructions and permits crawlers to finally see them. The standalone SFC report is an exception: it already has `index, follow` and a self-canonical, but currently shares the robots crawl block.
3. **No deployed XML sitemap.** Both `/sitemap.xml` and `/sitemap_index.xml` return HTTP 404 with the SPA error shell, not XML. No sitemap file exists in the deployed branch. This audit did not access Search Console and does not claim any submitted or indexed count.
4. **Twenty-four published deep routes lack real route files.** Tested `/blog/gbp-2026-ai-grounding` and `/blog/studying/hermes-concepts-field-guide` both return HTTP 404. They may appear to work after client-side navigation because React renders the shell; that does not fix the HTTP status for a direct link or crawler.

## Page counts

- **53 unique published routes defined in the current source:** 11 general pages, 17 case studies, four unique published writing posts and 21 study notes.
- **30 actual index.html files in the current deployment:** 29 published routes plus one draft article. There is also a separate 404.html, which is not a content page.
- **24 published routes missing index.html copies:** three writing posts and all 21 study notes. Complete paths are in `route-counts.json`.
- The source has nine writing entries, but one published slug is duplicated and four entries are drafts; counting array rows as published pages would overstate the result.
- PDFs are excluded from the HTML page totals. These numbers describe site inventory, not Google-indexed pages.

## Downloadable resumes

All four current public download URLs return **HTTP 200, application/pdf**, open with pdfplumber and contain two 612 x 792 letter-size pages. They are structurally valid, not broken downloads. All four still contain stale career information:

- `Clarity Digital` with `Nov 2023 - Present`; current approved record is Clarity AI ending February 2026.
- Stanford as `Interim SEO/SEM Manager`, March-August 2024; the approved consulting record continues to December 2025.
- Apple as `Global SEO Program Manager, Americas`; verified title is `Program Manager, SEO - Americas Region (AMR)`.
- SFC Surf School is absent, so the current consulting work and September deliverables are missing.

These are the old 8.9-9.4 KB text-only PDFs. They are **not** the corrected, approximately 422 KB, headshot-bearing portfolio resumes built in the proposed overhaul. Public paths:

- https://mitchjmiller.com/files/Mitchell-Miller-Search-Systems-Background-2026.pdf
- https://mitchjmiller.com/files/Mitchell-Miller-AI-Search-Systems-Background-2026.pdf
- https://mitchjmiller.com/files/Mitchell-Miller-Product-Systems-Background-2026.pdf
- https://mitchjmiller.com/files/Mitchell-Miller-Organic-Systems-Background-2026.pdf

## Other concrete technical issues

- The shared HTML shell has no canonical URL and uses generic preview metadata. The SEO component only sets a canonical when provided; homepage/resume initial responses have none.
- Twitter description literally says `Mitchell Miller Portfolio — built on Replit. Update this description to reflect the app.` Neither live shell includes og:image or twitter:image.
- Homepage and resume response bodies contain no headings or substantive content before JavaScript. Search engines capable of rendering may process the app after crawling is enabled and noindex removed; link-preview and other non-JavaScript consumers see the generic shell.
- A shared SEO helper always appends `| Mitchell Miller`, while several page titles already include his name, producing redundant rendered titles.
- The source writing index includes drafts and a duplicate `multi-agent-billing-traps` slug. Those are inventory/editorial issues separate from the crawl hotfix.

## Evidence files

`http-results.json` contains live status codes, effective URLs, file sizes and header filenames. `metadata-checks.json` includes the extracted live tags and byte comparison. `route-counts.json` records exact inventory and missing route paths. `live-resume-analysis.json` records all four PDF hashes, page sizes and extracted public text. Raw live response bodies and headers are saved beside this report.

No accounts, website files, branches, deployments or browser tabs were changed. Only this audit folder was written. Recommended next actions after the root's narrow crawl fix: verify robots and noindex independently; generate a correct sitemap and direct route files; replace stale public resume PDFs when authorized; then use Search Console to measure discovery/indexing rather than inferring it from file counts.
