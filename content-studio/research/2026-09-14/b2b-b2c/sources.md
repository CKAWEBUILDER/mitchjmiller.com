# Sources — B2B vs B2C Research

All retrieved 2026-09-14 via live web (WebSearch/WebFetch). "Direct fetch" = WebFetch read the
publisher's own page. "Search summary" = figure came through a WebSearch AI-generated summary
that cited the named publisher/URL but the page itself was not independently fetched in this
session — treat these as medium confidence and spot-check before quoting as a headline stat.

## Primary sources — directly fetched

- **Ruler Analytics** — "Conversion Rate Benchmarks 2026." 110M+ sessions, 5M+ conversions,
  £33.8M+ spend, 13 industries. Website conversion rate by industry + by channel.
  https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/

- **First Page Sage** — "Average Customer Acquisition Cost (CAC) by Industry: B2B Edition."
  Published Jan 26, 2026. Data period Jan 2022–Aug 2025, client analytics accounts, 29 B2B
  industries + 22 SaaS sub-industries, organic vs. inorganic CAC split.
  https://firstpagesage.com/reports/average-customer-acquisition-cost-cac-by-industry-b2b-edition-fc/

- **First Page Sage** — "Average Customer Acquisition Cost (CAC) by Industry: B2C Edition."
  Published Jul 3, 2025. Data from 103 B2C clients, 2021–2025, annual CAC, 20 industries.
  https://firstpagesage.com/reports/average-cac-by-industry-b2c-edition/

- **Mailchimp** — "Email Marketing Benchmarks by Industry." Live page retrieved 2026-09-14; page
  states underlying data last updated December 2023. Billions of emails, 1,000+ subscriber
  campaigns, self-reported industry. Open/click/unsubscribe by 5 categories.
  https://mailchimp.com/resources/email-marketing-benchmarks/

- **Databox** — "The B2B Sales Cycle: How Long Does It Take to Close a Deal?" Practitioner
  survey, n=65 B2B companies/agencies/consultants. No industry breakdown provided by Databox
  itself (small sample; use directionally).
  https://databox.com/b2b-sales-cycle-length

- **WordStream (LocaliQ)** — "Google Ads Benchmarks 2026." 13,000+ US Search campaigns, Apr
  2025–Mar 2026, 23 industries: CTR, CPC, conversion rate, cost per lead. Direct fetch of
  wordstream.com returned HTTP 403; full table confirmed via a mirror (hawky.ai) whose
  all-industry averages (6.64% CTR / $5.42 CPC / 8.18% CVR / $66.69 CPL) match WordStream's own
  topline figures surfaced separately via WebSearch — treated as reliable.
  https://www.wordstream.com/blog/2026-google-ads-benchmarks (mirror used: https://hawky.ai/blog/google-ads-benchmarks)

- **Unbounce** — "Conversion Benchmark Report." Data period Jul 23 2023–Jul 23 2024. 41,000
  landing pages, 464M visitors, 57M conversions. All-industry median + per-category pages
  (SaaS, ecommerce, professional services) confirmed via unbounce.com URLs surfaced in search;
  page content itself not fetched directly (see notes.md for disputed sub-figures).
  https://unbounce.com/average-conversion-rates-landing-pages/
  https://unbounce.com/conversion-benchmark-report/methodology/

## Named reports — search-summary only (not independently fetched)

- **G2** — 2024 Buyer Behavior Report (B2B software peer-review reliance) and 2021 B2B Software
  Behavior Survey. https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html
- **Gartner** — B2B buying journey research (17% of time with vendors / 83% self-directed),
  2024, cited via https://brixongroup.com/en/the-modern-b2b-buying-journey-why-buyers-complete-80-of-their-journey-alone-and-how-you-can-still-remain-visible
- **M+R Benchmarks 2026** — nonprofit email + website donation conversion benchmarks (the
  nonprofit-sector standard annual report). https://mrbenchmarks.com/email-messaging/
- **Semrush** (public blog, not the Semrush MCP/API) — "AI Overviews are expanding across
  commercial intent search," 600,000+ keywords, Nov 2025–Apr 2026, US desktop.
  https://www.semrush.com/blog/ai-overviews-commercial-search-study/
  Also: "We analyzed billions of web visits: How AI is reshaping traffic channels" (channel mix).
  https://www.semrush.com/blog/traffic-channel-mix-study/
- **Klaviyo** — "2026 Email Marketing Benchmarks by Industry," 183,000+ customers (all-vertical
  topline only; industry sub-table page was gated/JS-rendered and could not be extracted).
  https://www.klaviyo.com/products/email-marketing/benchmarks
- **Dreamdata** — B2B branded vs. non-branded Google Ads budget allocation and ROAS.
  https://dreamdata.io/blog/branded-vs-non-branded-google-search-ads-b2b
- **Statista** — branded search share by industry. Figures are 2018–2019 vintage; flagged stale
  in notes.md. https://www.statista.com/statistics/1143394/share-branded-search-by-industry/
- **Promodo** — 2026 Real Estate Marketing Benchmarks (visitor-to-lead conversion).
  https://www.promodo.com/blog/real-estate-benchmarks
- **ConversionRealtor** — 2026 Real Estate Conversion Rate Benchmark Report (lead-to-close).
  https://conversionrealtor.com/real-estate-conversion-statistics-2026
- **ALM Corp** (marketing-agency analysis) — "Google AI Overviews Surge 58% Across 9
  Industries," AI Overview trigger rate by industry. https://almcorp.com/blog/google-ai-overviews-surge-9-industries/
- **PR Newswire / Averi / Google** — B2B buyer AI-tool adoption stats (73% / 60%).
  https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html

## Aggregator / secondary sources (lower confidence — used only where no primary source found)

These are marketing-agency or SaaS-vendor blog roundups that cite (but don't always name)
underlying research. Used for: B2B sales-cycle-length by vertical, B2B/B2C touchpoint counts,
AOV/ACV by vertical, mobile traffic share, social channel share, healthcare/insurance-specific
benchmarks. Each individual data.json row citing one of these carries its own confidence note.
Representative examples: focus-digital.co, ziellab.com, getboomerang.ai, upvise.co,
hockeystack.com, dreamdata.io, geisheker.com, eightx.co, eevy.ai, elogic.co, optif.ai,
saas-capital.com, winsavvy.com, blog.planetargon.com, umbrex.com, omnibound.ai,
patientprism.com, metricusapp.com, obvlo.com, webfx.com, omnisend.com, growsurf.com,
gtm8020.com.

## Explicitly NOT used

- **Semrush MCP** — not called, per assignment constraint (no API units spent). Only Semrush's
  public blog posts (semrush.com/blog/...) were used, fetched/searched like any other public URL.
- No sign-ups, logins, gated-report downloads, or paywalled content were accessed. Several named
  target reports (Klaviyo's full industry table, Similarweb's B2B benchmark numbers, FirstPageSage's
  sales-cycle-by-industry report if one exists) were gated, JS-rendered, or not locatable as a
  public page — see notes.md "Gaps."
