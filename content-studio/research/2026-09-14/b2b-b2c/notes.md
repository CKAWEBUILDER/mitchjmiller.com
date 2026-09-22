# Research Notes — Gaps, Disagreements, Confidence Caveats

Scope note: per assignment constraints, the Semrush MCP was not called (public Semrush blog
posts were read instead, like any other public URL). No sign-ups, logins, or paywalled reports
were accessed. This was a ~90-minute time-boxed pass, not an exhaustive audit.

## How to read confidence in data.json

Every row has a `note` field. Look for these flags:
- **"Directly fetched from publisher"** — highest confidence, WebFetch read the actual page.
- **"via WebSearch summary"** — a search engine's AI summary cited the source; not independently
  verified against the live page. Spot-check before using as a headline claim.
- **"DISAGREEMENT"** / **"DISPUTED FIGURE"** — two or more sources conflict; both are recorded.
- **"GAP"** (value: null) — actively searched for, not found at publishable quality.
- **"LOW CONFIDENCE"** / **"publisher unclear"** — aggregator source, underlying methodology
  undisclosed.

## Biggest disagreements found (record side-by-side, don't average them away)

1. **B2B SaaS website/landing-page conversion rate: 1.1% vs. 3.8% vs. 7.6% vs. ">10%."**
   Four different numbers, four different claimed sources, for what sounds like the same
   metric. Root cause as best I can tell: (a) Ruler Analytics' "Software" category (7.6%,
   confirmed by direct fetch) measures full-SITE conversion across a broad software category,
   not landing pages, and is NOT B2B-SaaS-specific despite what several aggregators claim; (b)
   Unbounce's "SaaS" LANDING PAGE category (3.8%, confirmed) is a different metric (landing page,
   not site) and a broader "SaaS" bucket, not narrowed to B2B; (c) a widely-repeated "1.1%
   median B2B SaaS" figure and a contradicting "B2B SaaS free-trial pages >10%" figure both
   trace to secondary aggregators citing Unbounce, neither confirmed against unbounce.com
   directly. **Recommendation: use Ruler's 7.6% (site) and Unbounce's 3.8% (landing page) as the
   two confirmed numbers; drop the 1.1% and >10% claims, or caveat them heavily if used.**

2. **B2B SaaS customer acquisition cost: $239 vs. $702 vs. ~$1,200 vs. $1,450+.**
   First Page Sage's directly-fetched, methodology-disclosed figure is $239 (organic $205 /
   paid $341). Two other aggregators cite $702 and "~$1,200" with no disclosed methodology —
   likely including fully-loaded sales+marketing headcount, not just media spend. A
   fintech-specific SMB figure of $1,450 is a different (higher-complexity, regulated) vertical,
   not a straight comparison. **Recommendation: lead with First Page Sage's $239 as the
   best-documented figure; if using the higher numbers, label them "fully-loaded CAC"
   explicitly.**

3. **B2B sales cycle length: 84 days (median) vs. 134 days (mean) vs. 10.1 months / ~307 days
   ("full buying process").** These likely measure different windows — "sales cycle" typically
   starts at first sales-qualified contact; "buying process" includes the buyer's own
   independent research phase before a vendor is ever contacted (consistent with Gartner's
   finding that 83% of B2B buying time is self-directed). Not a data error — a definitional
   difference worth explaining in the post itself.

4. **B2B touchpoints before conversion: 27 vs. 60 vs. 76 vs. 417**, depending on source and deal
   size. No single number is "correct" — this spread IS the finding. See shock-stat #11.

5. **Email open rates, cross-industry: 19.21% vs. 35.63% (Mailchimp, directly fetched) vs. 36%
   vs. 21.5%.** Apple Mail Privacy Protection pre-loads tracking pixels and inflates "opens" by
   an amount that varies by each report's underlying sender/platform mix, so different
   benchmark publishers now disagree by nearly 2x on this one metric. **Recommendation: for the
   artifact, prefer click rate or click-to-open rate over open rate wherever both are available
   — sources agree much more closely on those.**

6. **Ecommerce AOV: $312 median (one 2,934-store cohort) vs. $85 median (a different Shopify
   cohort).** Different underlying samples/time windows, both secondary. Use one source's full
   category breakdown internally-consistently; don't mix medians across the two studies.

7. **Real estate "conversion rate": 4.7% (visitor→lead, Promodo) vs. 0.4–1.2% (lead→close,
   ConversionRealtor) vs. 2–5% (a different lead→close claim).** These are different funnel
   stages wearing the same label — a recurring trap across almost every vertical in this
   dataset. Always confirm numerator/denominator before putting two "conversion rate" tiles
   side by side.

## Gaps — actively searched, not found (or not at usable quality)

- **B2C "sales cycle length" in days.** No named benchmark report quantifies this the way B2B
  sales-cycle reports do. B2C purchase timelines are described qualitatively ("days to weeks")
  but I could not find a sourced number to pair against the B2B 84-day figure. If the artifact
  needs a B2B-vs-B2C sales-cycle tile, this side needs either a proxy metric (e.g., time-to-first-
  purchase from ad click) or a caveat that it's not directly comparable.
- **Klaviyo's per-industry email benchmark table.** The benchmarks page
  (klaviyo.com/products/email-marketing/benchmarks) is gated/JS-rendered; only the all-vertical
  topline (31% open / 1.69% click across 183,000+ customers) could be extracted. A logged-in or
  JS-executing fetch would be needed for the full industry cut.
- **Similarweb's own B2B channel-mix/mobile-share numbers.** The one Similarweb B2B benchmark
  blog post found (similarweb.com/blog/research/business-benchmarking/b2b-website-benchmarks/)
  is dated February 2021 and, on direct fetch, contained no extractable percentages — only
  qualitative descriptions. Similarweb likely has a newer version of this report; not located
  during this pass. Channel-mix and mobile-share B2B numbers in data.json instead come from
  lower-confidence aggregators quoting Similarweb-style data.
- **WordStream/LocaliQ direct fetch.** wordstream.com returned HTTP 403 to WebFetch. Used a
  mirror (hawky.ai) cross-checked against the original's own topline averages surfaced via
  WebSearch — consistent, so treated as reliable, but flagging that this is a mirror, not the
  publisher's own page.
- **Manufacturing/industrial and nonprofit paid-search benchmarks.** WordStream's 23-industry
  list has no dedicated category for either vertical — no clean proxy found.
- **Nonprofit customer acquisition cost.** Neither First Page Sage report covers nonprofits;
  the sector's standard metric is cost-per-donor or cost-per-dollar-raised, not CAC in the
  commercial sense. Not located as a comparable benchmark in this pass.
- **A single, current (2026) brand-vs-non-brand SEARCH SHARE by industry table.** The only
  industry-level breakdown found (Statista) is 2018–2019 vintage. The B2B BUDGET-allocation
  stat (82% non-brand / 18% brand, Dreamdata) is current but measures ad spend, not search
  volume/traffic share — a different thing. Flagged in data.json; needs a fresher source before
  using the Statista breakdown as a 2026 claim.
- **AI-overview/AI-search exposure split explicitly by B2B vs. B2C.** No study found frames it
  that way directly. Two usable proxies recorded instead: (a) Semrush's informational vs.
  commercial/transactional trigger-rate split (informational queries skew B2B-research-like);
  (b) ALM Corp's per-industry AI Overview trigger rates (healthcare 88%, education 83%, B2B
  tech 82%) — an agency analysis, not an academic/Google-official study.
- **The "AI referral converts at 14.2% vs. 2.8%" stat's exact source paper.** Found adjacent to
  a description of a 973-site/$20B-revenue ecommerce working paper in search results, but the
  connection was not unambiguously confirmed. Flagged Low confidence in data.json — do not use
  as a headline number without tracking down the primary paper directly.
- **SaaS median ACV ($24,266) publisher.** Search summary didn't clearly name which specific
  survey this belongs to (SaaS Capital's own index is the likely candidate given the URL it
  surfaced under, but unconfirmed).

## Paywalled / inaccessible reports mentioned in the assignment brief

- **HubSpot State of Marketing 2026** — the full report requires an email-gated download;
  only blog-post excerpts (public) were used, which don't break out B2B vs. B2C by the metrics
  this brief needs (conversion rate, CAC, etc.) — mostly channel-preference and sentiment stats.
- **Gartner/Forrester full reports** — only publicly summarized figures (e.g., the "17% of
  buying time with vendors" stat, widely re-cited) were used; the underlying Gartner research
  notes themselves are behind a client paywall.
- **Databox's full benchmark library** — the one report fetched (B2B sales cycle) is public,
  but Databox's broader "Benchmark Groups" data requires a free account login; not accessed.

## Segment-labeling methodology (important for the artifact build)

Per the assignment instruction, any source that doesn't explicitly tag a figure as B2B or B2C is
recorded as `segment: "overall"` in data.json, even when the industry is conventionally
B2B-dominant (e.g., "Legal," "Software") or B2C-dominant (e.g., "Retail & eCommerce," "Travel").
Where a source (First Page Sage's two separate B2B/B2C reports, G2's B2B-specific survey,
Klaviyo's ecommerce-skewed panel) explicitly frames itself as one segment, that segment is used.
This means several "overall" rows in data.json are directionally B2B or B2C but should not be
presented on the artifact as if the source itself made that split — the `note` field says which
is which.
