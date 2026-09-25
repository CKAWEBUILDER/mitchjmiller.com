# Critic pass — 2026-09-25 — rank-new-site-saturated-market ("Ranking a New Site in a Market Legacy Competitors Own")

Critic and stager. Wrote only: the blog and LinkedIn drafts, the new X draft, `content-studio/viz/final/rank-new-site-saturated-market/` and this report. Not published, not built, nothing copied into `public/`. No purchases, logins or posting. No local server started (the hero renders from `file://`); headless Chrome was launched by the exporter and closed (no headless process left). Pre-existing listeners (4177, 4400, 5000, 7000, 8787, 9119, 11434) untouched. Disclosure: before applying the no-git rule I ran two read-only commands (`git branch --show-current`, `git log --oneline -1`); nothing else, nothing written. `docs/site-standards.md` read from the working tree.

Package: `content-studio/drafts/2026-09-24-rank-new-site-saturated-market.{blog,linkedin,x}.md`. Ledger: `content-studio/research/2026-09-24/rank-new-site-saturated-market/findings.md` + 12 source files.

## Verdict

**Stageable after fixes; not publishable until Mitch reads it.** Every figure traces to findings.md and survived a re-fetch at its primary, but the draft had nine blocking problems: a wrong source URL for its headline distribution number, a wrong paper title, a mis-scoped 5.41%, a mis-described Ahrefs metric, the Princeton/Moz trap repeated with its multiplier and an overclaim, a causal overclaim in the teaser, unsourced or contradicted first-party lines, no FAQPage JSON-LD and a LinkedIn post at 2,608 characters. All fixed below. The thesis itself (it reverses three of Mitch's premises) is his call; one of the three reversals only holds for local-intent searches, and the copy now says so.

Gate: `python3 ~/.claude/skills/blog-syndicate/scripts/check_package.py content-studio/drafts/2026-09-24-rank-new-site-saturated-market` → **PASS: 0 fail, 0 warn** (LinkedIn lint SHIP 96/100; X 249, 278, 64 of 280).

## Figure verification (re-fetched 2026-09-25)

| Figure in the post | findings.md | Primary, re-fetched | Result |
|---|---|---|---|
| 0.01% of local keywords (Sept 2025), 0.14% (Mar 2025); 500M+ keywords | §3.1 | seoClarity study, HTTP 200, "Last Updated: 10/23/25": "AIOs had begun appearing for a meager 0.14% of local keywords in March 2025. Now, in September 2025, this number has fallen to just 0.01%." U.S. dataset of 500+ million keywords | **Exact** |
| Whitespark 15% local-intent vs 92% informational; 540 queries, 3 cities; 68% is mixed | §3.1 | Whitespark, 200, 12 May 2025: "AI Overviews appear for 15% of local-intent queries" / "92% of informational-intent queries"; 540 queries, Houston/Phoenix/Denver, 6 local-business categories, manual; 68% = all three intents | **Exact.** Scope note: the 92% are informational searches *inside local-business categories* ("how much do personal injury lawyers charge in Phoenix?"). That is the post's own question-coverage territory, so the copy now says questions are where AI Overviews do appear |
| 15.69% of all keywords (chart) | §3.4 | Semrush study, 200: "AI Overviews were triggered for 15.69% of queries in November" (2025), 10M+ keywords | **Exact**; chart label now dated |
| −5.41% conversion per extra keyword word | §4.5 | Ghose & Yang PDF, 200 (text extracted): "an increase in length of the keyword by 1 word decreases conversion rate by 5.41 %" | **Figure exact; scope and title wrong in draft.** It is the *organic* ("Natural") coefficient; in paid search the length effect on conversion was not significant (Table 3 "NA"). Data: one nationwide retailer, 776 keywords, 1 Jan–31 Mar 2007. Paper title is *Comparing Performance Metrics in Organic Search with Sponsored Search Advertising* (ADKDD '08), not "Analyzing Search Engine Advertising" |
| −6.6% click-through per extra word | §4.5 | WSDM 2008 PDF, 200: "decreases the click-through rates by 6.6%" (sponsored search) | **Exact**; source was missing from the list, added |
| Google: no markup/schema required for AI features | §5.1 | ai-features page (updated 2025-12-10): "There's also no special schema.org structured data that you need to add." AI optimization guide (updated 2026-07-10), mythbusting: "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add" | **Exact.** Draft's "Google's documentation says no, in writing" overstated it (Google says not required and lists overfocusing as ignorable; it does not say schema can't earn a citation). Reworded |
| FAQ rich results gone from May 7, 2026 | §5.2 | Google documentation updates, 8 May 2026 entry: "This feature will no longer appear in Google Search starting May 7, 2026." 15 June entry removed the FAQ docs | **Exact** |
| HowTo deprecated 2023 | §5.2 | Google blog, 8 Aug 2023: How-to "is now deprecated" (desktop, from 13 Sept) | **Exact** |
| Ahrefs −4.6%, 1,885 pages, three controls each | §5.3 | Ahrefs, 200, 11 May 2026: "AI Overview citations on treated pages fell by 4.6% relative to control pages"; AI Mode +2.4%, ChatGPT +2.2% (noise); 3 control URLs per treated page; DiD; "Every page in the dataset had 100+ AI Overview citations" before schema | **Figure exact; metric mis-named** ("AI Overview presence" → citations). The new-site caveat was missing from a post about new sites; added in the section and in Limits |
| Arival 37% OTA share, 2025 | §2.1 | Arival article "Direct Bookings Dive, OTAs Rise" (Janelle Visser, 26 Jan 2026; 5,000+ operators): "OTAs continued to gain significant share, surging to 37% of bookings in 2025." curl gets 403 (bot block); text fetch succeeded. Sub-splits confirmed absent | **Exact; wrong URL in Sources.** The draft cited the 3rd-edition page (14 Apr 2025, "one third of bookings… in 2024"), which does not contain 37%. Fixed |
| Viator 22.9M experiences, $4.7B GBV, FY2025 | §2.4 | Tripadvisor 10-K, 200 (6.47 MB): "GBV reached $4.7 billion…" / "experiences booked were approximately 22.9 million…" | **Exact.** Both are "Key Operating Metrics", not audited statement items; "audited 10-K" dropped; "gross bookings" → gross booking value |
| 141 pages / 45 days (Limits) | §1.1 | Expedia partner page, 200 | **Exact** |
| CITECHOICE arms; GEO-SFE tests structure, not schema | §5.6 | arXiv HTML, 200: "polished prose (continuous paragraphs; no headings, lists, or tables) and polished structured text (headings, short paragraphs, lists or a table)"; zero JSON-LD/schema.org mentions. GEO-SFE's structure = document architecture, chunking, visual emphasis | **Exact**; both papers were missing from Sources, added |
| Princeton/Moz page | §5.7 | sgaindex page, 200: claims Princeton CS + Moz, 500,000 URLs, WWW 2026; no authors, no DOI, no link; ends "Use our Schema generator…" | Description **exact**. "There is no such paper" is more than the record shows (the research pass searched WWW 2026, arXiv, ACM DL, Princeton CS; not repeated here) |
| SFC: 973 competitor pages | first-party | Live case study `/case-studies/sfc-surf-school/`, 200: "973 competitor pages crawled and read across ten businesses" | **Exact** |
| SFC: clicks 5 → 54, impressions 470 → 1,652, Aug 12–Sep 8 vs Jul 15–Aug 11, 2026 | first-party | **Not on the live case study** (it is the Search Visibility Report, data through 14 Aug: 548 impressions in three months, 8 clicks, average position 43.6). Verified on live `https://mj2.pro/lab/` ("54 clicks versus 5, and 1,652 impressions versus 470. Both windows cover 28 days"; reviewed 10 Sept 2026) and the homepage ("+980%… 5 → 54"); repo record `docs/overhaul-2026-09-10/content-evidence.md` | **Exact against /lab/**; the post now cites /lab/ |
| Explorer launched Sep 10, after the window | first-party | `docs/overhaul-2026-09-10/content-evidence.md`: "The ten-break map and ten related guides launched September 10, after that measurement window." Explorer live at sfcsurfschool.com (10 breaks). Not stated on any live mj2.pro page fetched | **Credited correctly** (post says it gets no credit for the numbers) |
| "90-day pilot" | first-party | `src/lib/case-study-editorial.ts` on this branch ("2026 · 90-day pilot"); not on the live case study | Unverified on a live page; Mitch to confirm |

Added from live primaries during fixes: Waikiki incumbents "each show or claim more than a thousand reviews" (live SFC report: Hans Hedemann 1,014 verified; Kahu and Star Beachboys self-claimed); "travel publishers win and no surf school competes" (live SFC report); "10,000-term universe" (live medical-library case study); Google: AI features "can show what's being said about products and services across the web, including in blogs, videos, and forum discussions" (AI optimization guide).

## Traps

- **Princeton + Moz 3.2×: not honoured in the draft.** Blog and LinkedIn both repeated the full statistic, multiplier included, to debunk it, and asserted "There is no such paper", which the LinkedIn draft's own note said not to claim. Fixed: the multiplier is gone from every file; the blog keeps one de-specified bullet ("I could not find the paper… The only source I could trace is an unsigned page with no DOI…"); LinkedIn and X drop it. The multiplier appears nowhere in the blog, LinkedIn, X or hero (the only `3.2` string matches are the GEO-SFE arXiv ID and SVG stroke widths).
- **Ahrefs 94.74%: honoured.** 0 hits in every file.

## House rules and structure

- Hype/absolute: "everyone recommends" (direct answer) removed; "never answered" → "not answered". Revolutionary, game-changer, nobody, changed everything, best ever, "agency": 0 hits in published copy, social copy and hero.
- One keyword per section: the draft had no keyword map. Added the per-section keyword / LSI / icon / alt table to the draft notes; the primary keyword now opens the direct answer verbatim.
- Front matter: all CHANNELS keys present, `status: draft`, `approved: no`. `hero_alt` rewritten to what the hero shows (420 characters, X's alt cap). `hero_source` added.
- FAQ + FAQPage JSON-LD: FAQ present, JSON-LD missing. Added, generated from the visible FAQ; `json.loads` passes; 5 of 5 questions and answers match the visible text exactly.
- Sources: rebuilt, primary and first-party first, all dated; wrong Arival URL and Ghose & Yang title fixed; WSDM 2008, CITECHOICE, GEO-SFE and the SFC first-party readout added; Pew removed (listed, never cited).
- Share CTA present. Every own-site URL is mj2.pro (7 URLs, no mitchjmiller.com). Internal links: none → three (`/blog/search-results-by-intent/`, `/case-studies/sfc-surf-school/`, `/lab/`), all 200.
- In-body SVG chart: subtitle ran to x=816.6 in a 760-wide viewBox (clipped); source labels were #64748b on #0f172a (3.78:1, under AA) → #94a3b8 at 12 px (7.0:1); "Informational queries" → "Local-business questions (informational)"; title "rarest exactly where local businesses compete" → "rarest on local-intent searches". Re-rendered: no text outside the viewBox, no overlaps.
- LinkedIn: 2,608 → 1,308 characters, share line kept, hook 127 characters.

## Blocking changes made

Blog (`…blog.md`):
1. Direct answer rewritten (60 words): primary keyword first; "everyone" removed; it no longer tells readers to skip the question coverage the body recommends.
2. Teaser: "What actually moved a Waikiki surf school" (causal claim the post itself disclaims) → "what its numbers can't prove"; "longer queries convert worse" → scoped to the one test.
3. Insight line: 5.41% scoped to organic keywords, one retailer, 2007 data; "deleted FAQ rich results outright" → stopped showing; local-questions exception noted.
4. TL;DR: all five bullets re-scoped (500M+ U.S. keywords; Whitespark's 92% named as local-business informational; Google quote verbatim; organic, one retailer; "booked through Viator… gross booking value"; "reviewed 973 before writing anything" → crawled and read 973 across ten businesses, windows stated).
5. Long-tail: "No." → "Not on the evidence I could find."; study described (13 weeks, 776 keywords, early 2007, organic); "the first two hold" → "the first holds by definition"; Label: "treat the direction as established" and "2008 auction dynamics" → one dated measurement, not a law.
6. Schema: opener and Google paraphrase corrected; Ahrefs metric corrected (citations, relative to controls; AI Mode and ChatGPT within noise) plus already-cited caveat; Princeton/Moz bullet de-specified; "schema still drives legitimate rich results" → keeps you eligible for the rich results Google still shows.
7. Distribution: "audited 10-K" dropped; "gross bookings" → gross booking value; "a third of category bookings" → more than a third of operators' bookings. Question coverage: added that these questions are where AI Overviews appear (Whitespark 92%), write plainly, no special markup needed, internal link.
8. Head-term section: "a decade" → "years"; added the sourced Waikiki review counts.
9. Exhaustive analysis: "before writing a line of copy" removed (the record shows 38 pages already written when the audit found them); link to the report.
10. Limits: invented "$60 activity / $2,000 trip" removed; Ahrefs already-cited caveat added; the draft-internal "Semrush volumes are unverified in this draft" bullet moved out of the published Limits into the notes.
11. What I did: /lab/ readout linked; "tour marketplaces" → travel publishers (per the live report); "four orders of magnitude" (no computable basis) → the sourced 10,000-term comparison.
12. FAQ: answer 2's unsourced "assistants lean on third-party sources more than any operator's site" → Whitespark 92% + Google's statement; answer 3 "one 28-day window" → two consecutive 28-day windows; answer 1 wording tightened.
13. Chart, Sources, FAQPage JSON-LD and draft notes as above.

LinkedIn (`…linkedin.md`): rewritten to 1,308 characters from verified claims only; removed the Princeton/Moz paragraph (contradicted its own note), "the only" superlatives, "four places" (Limits has five bullets) and "if you sell locally, that surface is mostly not there" (contradicted by Whitespark); 5.41% scoped; attachment → the new 1080×1350 poster, alt rewritten; first comment reworded.

X (`…x.md`, new): Post 1 (249/280) shock stat + distribution thesis, standalone; Post 2 (278/280) the three premises as a list; Reply (64/280) the utm link. No hashtags. Handle unconfirmed. Manual route in the notes.

## Hero

`content-studio/viz/final/rank-new-site-saturated-market/` (reference-poster language: flat bright cells, loud title bar with 0.01%, labelled cells with icon, figure, title and one line, legend or column heads with verdict marks, first-party pilot strip, one sources line):

| File | Size | Use |
|---|---|---|
| `surf-school-surface-coverage-gap.png` | 1200×630, 181,059 B | hero + og:image/twitter:image → `public/images/blog/` |
| `surf-school-surface-coverage-gap-1080x1350.png` | 1080×1350, 276,776 B | LinkedIn and X (12 cells) |
| `surf-school-surface-coverage-gap-1080x1080.png` | 1080×1080, 182,334 B | square alternative (8 cells) |
| `surf-school-surface-coverage-gap-2160x2700.png` | 2160×2700, 596,628 B | 2× of the 4:5, zoom |
| `index.html`, `export.mjs` | source, exporter + audit | not published |

`node export.mjs` output (the audit fails the run before writing if any count is non-zero):

```
verify 1200x630: 62 text runs, 0 under 14px (smallest 14.4px normalised, .eyebrow), 0 overlaps, 0 outside their box, 0 outside the stage, 0 clipped, 0 under 4.5:1
verify 1080x1350: 98 text runs, 0 under 14px (smallest 14px normalised, .lab), 0 overlaps, 0 outside their box, 0 outside the stage, 0 clipped, 0 under 4.5:1
verify 1080x1080: 70 text runs, 0 under 14px (smallest 14px normalised, .eyebrow), 0 overlaps, 0 outside their box, 0 outside the stage, 0 clipped, 0 under 4.5:1
```

All four PNGs opened and read; two regions of the 2× checked at 1:1. Every figure on the hero is in findings.md and in the post. The coverage map the old `hero_alt` described (where Waikiki incumbents appear across search, OTAs, maps and video) was not built: no ledger holds that data. Header paths set to `/images/blog/surf-school-surface-coverage-gap.png` for `hero` and `og_image` (the checker requires a descriptive kebab-case PNG; production serves a post's own og path as `og:image`, as `/blog/optimizing-for-ads-in-free-llm-answers/` does). Copy list is in the blog draft notes.

## For Mitch

1. **The thesis reverses your premises.** Local intent: AI Overviews are rare on local-intent searches but common (92% in Whitespark's sample) on the informational questions you planned to target, so premise 1 is "mixed", not reversed. Long-tail: one peer-reviewed 2007 test says it converted worse; keep it for access. Schema: Google says not required; the one matched test found no lift on already-cited pages. Distribution: Arival's operator survey, 37%.
2. **Schema tension with a live post.** `/blog/optimizing-for-ads-in-free-llm-answers/` says "Does schema markup earn AI citations? Unresolved." This post leans on Google's documentation and the Ahrefs test. Align the wording or cross-link.
3. **Princeton/Moz bullet:** keep the de-specified debunk or cut it.
4. **FAQPage JSON-LD** on a post that says FAQ markup isn't the AI lever: kept for house consistency; drop it if the irony bothers you.
5. **Keywords are editorial.** No Semrush web-UI export was run (it needs your logged-in browser and writes outside this pass's scope).
6. **"Before writing anything"** was cut as unsupported. Restore only if true for the copy you wrote.
7. **The live SFC case study shows the 14 August report** (8 clicks, 548 impressions), not the 5 → 54 comparison, and does not say "90-day pilot". The post cites `/lab/`. Decide whether the case study should carry the 10 September readout.
8. **Hero headline stat:** 0.01% (the AEO hook) over 37% (the thesis number, which sits in cell 07/10). The file keeps the name the draft expected; the thesis line "A new site's gap is coverage, not markup" carries the "coverage gap".
9. Optional, not added (outside findings.md): Google's mythbusting section also says "you don't have to worry that you don't have enough 'long-tail' keywords"; the SFC report's paid-search finding (seven paid keywords in the market, none a customer search; about $2.35 a click, Semrush, 13 Aug 2026) could ground the paid-search FAQ.

Not done here, by scope: OPERATING.md and trends-log.md learnings (outside the write list), narration, `public/` copies, build, deploy.
