# Ranking a New Local Tour/Activity Site Against Entrenched Competitors
## Source verification pack — compiled 2026-09-24

**Rule applied:** every figure below was pulled from a page that returned HTTP 200 on a live fetch today, with a verbatim quote captured. Anything that could not be fetched is marked UNAVAILABLE and carries no number. Nothing is estimated or reconstructed from memory.

**Verification scoreboard**

| # | Topic | Status |
|---|---|---|
| 1 | Touchpoints before a travel booking | VERIFIED (travel-wide) — **no tours/activities-specific figure exists** |
| 2 | OTA share of tours & activities | VERIFIED — but effectively **single-house** (Arival); see independence warning |
| 3 | Zero-click / AI answers in local discovery | VERIFIED, and the finding **inverts the usual narrative** for local |
| 4 | Long-tail / question-query share | VERIFIED — but the **conversion half of the claim fails** |
| 5 | Schema/FAQ → AI citation | VERIFIED AS **CONTRADICTED**. Google calls it a myth in writing |

---

# 1. Touchpoints before a travel booking converts

## 1.1 The headline number — VERIFIED

- **Claim as you'd state it:** Travelers view 141 pages of travel content in the 45 days before they book, spending just over five hours with it.
- **Figure:** 141 pages / 45 days / 303 minutes (524 minutes in the U.S.)
- **Publisher:** Expedia Group
- **Study:** *The Path to Purchase: Uncovering How Travelers Plan and Book*
- **Year:** 2024-01-09
- **URL:** https://partner.expediagroup.com/en-us/resources/blog/path-to-purchase-insights
- **Quote:** "travelers view 141 pages of travel content in the 45 days prior to booking a trip"
- **Method:** digital tracking of 70,000+ travelers plus a survey of 5,700+ respondents, across AU/CA/FR/JP/MX/UK/US.

**Supporting figures from the same study (all verbatim):**
- "80% of travelers visiting an OTA at some point before making a travel purchase"
- "59% of travelers were undecided on a destination when they first decided to take a trip"
- "51% of travelers booked on an OTA, 37% booked on an airline website or app, and 23% booked on a hotel website or app"
- Resource usage: search engines 61%, social media 58%, airline sites 54%

### Three caveats you must carry into the post
1. **It measures PAGES, not touchpoints.** 141 page views is not 141 brands, sessions, or decision moments. Do not write "141 touchpoints."
2. **It is travel-wide, not tours & activities.** Flights and hotels dominate this dataset. A $60 kayak tour is not a $2,000 trip decision.
3. **The famous "38 websites before booking" Expedia stat is old** (circa 2016-2017) and I could not retrieve it from a live Expedia-owned page. Do not use it.

## 1.2 Google's "messy middle" — REAL, but it does NOT contain a touchpoint count

- **Publisher:** Google / Think with Google, Alistair Rennie & Jonny Protheroe, July 2020
- **URL:** https://business.google.com/en-all/think/consumer-insights/navigating-purchase-behavior-and-decision-making/
- **Quote:** "310,000 purchase scenarios across financial services, consumer packaged goods, retail, travel, and utilities."
- **Flag:** the page provides **no figure for number of touchpoints or sources consulted**. Messy middle is a *model* (exploration/evaluation looping), not a touchpoint count. Cite it for the loop concept and the 310,000 simulations only.

## 1.3 UNAVAILABLE
- **A tours-and-activities-specific touchpoint count.** Does not exist in any source I could fetch. The closest is Arival's *Outdoor Adventure & Activities Traveler* (2024-06-07, n=1,000 U.S.) which names the sources but **publishes no count and no per-channel percentages**: "Google search, YouTube video, friends and family and travel websites are the top sources of information for activity travelers, followed by social media." https://arival.travel/article/online-booking-search-surges-for-activity-travelers/
- **Expedia newsroom mirror** (https://www.expedia.com/newsroom/eg-path-to-purchase-research/) — persistent HTTP 429. The partner.expediagroup.com URL above is the live, citable one.
- **Phocuswright** (phocuswright.com, phocuswire.com) — **Cloudflare-blocked on every attempt**, via WebFetch, curl with browser UA, and text-proxy. No Phocuswright-hosted figure in this pack is fetch-verified.

---

# 2. OTA share of tours & activities bookings

## 2.1 Current channel share — VERIFIED

- **Claim:** OTAs took 37% of tour and activity bookings in 2025, up from 33% in 2024 and 28% in 2023.
- **Figure:** 37%
- **Publisher:** Arival
- **Study:** *The Global Operator Landscape (4th Ed.): The State of Experiences*
- **Year:** 2026-01-26 (survey fielded Aug–Nov 2025, 5,664 qualified responses, six languages)
- **URL:** https://arival.travel/article/direct-bookings-dive-otas-rise/
- **Quote:** "OTAs continued to gain significant share, surging to 37% of bookings in 2025."
- Also verbatim: "The overall share of online bookings remained steady at 60% between 2024 and 2025."

> **FLAG — partially unavailable.** The widely-repeated sub-splits (operator website 29% → 25%, direct offline 16% → 15%) are **NOT on the Arival page**. I re-fetched and asked specifically; the page returned: *"The article does not include percentages matching 25, 29, 15, or 16 percent."* Those numbers trace to PhocusWire, which is Cloudflare-blocked. **Cite 37% as verified; treat the 25% direct-website figure as UNVERIFIED.**

## 2.2 Prior-year baseline — VERIFIED

- **Publisher:** Arival, *Global Operator Landscape (3rd Ed.): Operators and OTAs*, 2025-04-14, n=7,000+ operators
- **URL:** https://arival.travel/article/otas-capture-one-third-experiences-bookings/
- **Quote:** "OTAs captured one third of bookings in the tours, activities and attractions sector in 2024, up from 24% in 2019."
- Attractions specifically: OTAs "more than doubl[ed] in share from 8% to 18% of all bookings."

## 2.3 Market context — VERIFIED

- **Publisher:** Arival + Phocuswright, *The Outlook for Travel Experiences 2019–2029*, 2026-02-25
- **URL:** https://arival.travel/article/experiences-surging-towards-342-billion/
- Quotes: "At $271 billion in 2025" · "projected to reach $342 billion by 2029" · "Online channels have grown from just 17% of bookings in 2019" · "only 33% of gross bookings in experiences took place through online channels" · "compared to 64% for the broader global travel industry"

> **Reconciliation you need, or a commenter will catch you:** 33% (Feb 2026) and 60% (Jan 2026) are **not contradictory**. 33% is market-wide, dollar-weighted gross bookings including offline-only operators. 60% is the share of *surveyed operators' own* bookings that were online. Different denominators. Never put them in the same sentence without this distinction.

## 2.4 Which OTAs lead — VERIFIED against primary filings

This is the strongest-sourced section in the pack, because it comes from an audited SEC filing rather than a vendor claim.

**Viator (Tripadvisor) — AUDITED SEC 10-K, FY2025**
- **URL:** https://www.sec.gov/Archives/edgar/data/1526520/000119312526051281/trip-20251231.htm (fetched, HTTP 200, 6.47 MB)
- **Quote:** "GBV reached $4.7 billion, $4.2 billion, and $3.7 billion for the years ended December 31, 2025, 2024, and 2023, respectively, an increase of approximately 13% and 12%"
- **Quote:** "The number of experiences booked were approximately 22.9 million, 19.7 million, and 17.5 million for the years ended December 31, 2025, 2024, and 2023"
- Definition, verbatim: "GBV represents the total dollar value of experience bookings powered by the Viator platform"

**GetYourGuide — company self-reported, unaudited**
- **URL:** https://www.getyourguide.press/blog/milestone-from-getyourguide-getyourguide-is-profitable----on-an-adjusted-ebitda-basis----and-has-been-for-the-past-year-with-revenue-approaching-eu1-billion-for-the-last-12-full-months (2025-10-21)
- **Quote:** "GetYourGuide is profitable — on an adjusted EBITDA basis — and has been for the past year, with revenue approaching €1 billion for the last 12 full months"
- Q3 2025: "30% YoY increase in GMV" and "10 million experiences booked"
- **FLAG:** the circulating ">€4 billion GMV / 33 million experiences in 2025" figures are from secondary coverage (Skift, WiT), **not** from this page. Do not state them as verified.

**Klook — SEC F-1 confirmed to exist**
- EDGAR company record verified live: Klook Technology Ltd, **CIK 0002071502**, Form F-1 filed **2025-11-10**, accession 0001213900-25-108023, 86 MB.
- Figure via Arival reporting the F-1 (https://arival.travel/article/klook-going-public-us-ipo/, 2025-11-11): "Total gross bookings, or the total value of all experiences sold on the platform for the nine months through Sept. 30, were US$2.3 billion, up 31% vs. 2024."
- **FLAG:** the $2.3B is trade-press reporting of a primary filing; I confirmed the filing exists but did not extract the figure from the F-1 itself.

## 2.5 UNAVAILABLE
- **A per-OTA market-share split for the category.** Arival does not publish one publicly; the detail sits behind Insider Pro. Rank them by the filing/company figures above instead.
- **Airbnb Experiences and TripAdvisor-brand experience volumes** — no separately disclosed figure found.
- **Independent (non-Arival) channel-share research.** See the independence warning below.

> ### ⚠ INDEPENDENCE WARNING — the biggest methodological weakness in this pack
> Arival is effectively the **only** research house publishing channel-share data for tours & activities. Its most-cited collaborator, Phocuswright, is a **co-author and partner on the 2026 reports, not an independent check**. So the "37% OTA share" claim rests on **one operator-survey instrument**, and it is **self-reported by operators about their own bookings** — a group with obvious reasons to over- or under-estimate OTA dependence. Triangulation is not achievable here. State it as "Arival's operator survey finds..." rather than as settled market fact.

---

# 3. Zero-click and AI answers in local discovery

## 3.1 The single most important finding for this post — local intent SUPPRESSES AI Overviews

This is the opposite of what most SEO content assumes, and it is the strongest angle in the whole brief.

- **Claim:** AI Overviews have all but disappeared from local-intent keywords — they fell to 0.01% by September 2025.
- **Figure:** 0.01% of local keywords (down from 0.14% in March 2025)
- **Publisher:** seoClarity (Research Grid), 500M+ keyword U.S. dataset, updated 2025-10-23
- **URL:** https://www.seoclarity.net/research/ai-overviews-impact
- **Quote:** "AIOs had begun appearing for a meager 0.14% of local keywords in March 2025. Now, in September 2025, this number has fallen to just 0.01%."

Corroboration: Whitespark (2025-05-12) found AI Overviews on roughly **15% of local-intent queries** vs 92% informational — https://whitespark.ca/blog/case-study-the-prevalence-of-ai-overviews-in-local-search/
> **TRAP:** Whitespark's headline "68% of local business queries" is their **mixed-intent** set including informational queries. The local-intent number is 15%. The 68% is the one that gets miscited. Sample is only 540 queries across 3 cities and 6 industries, manually collected — directional only.

Semrush independently attributes the lowest-AIO industries to local intent: users "are looking for local information or directions on where to take action in the real world."

## 3.2 Zero-click share — VERIFIED, with a trend-line warning

- **Claim:** 68.01% of U.S. Google searches ended without a click in the first four months of 2026.
- **Publisher:** SparkToro (Rand Fishkin), 2026-06-09, Similarweb U.S. panel, Jan–Apr 2026
- **URL:** https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/
- **Quote:** "In the first four months of 2026, a whopping 68.01% of Google searches ended without a click."
- **Method caveat:** the mobile/desktop weighting is an **external assumption** ("2/3rds mobile, 1/3rd desktop"), not panel-measured. Excludes the Google mobile app.

> **DO NOT draw a trend line.** SparkToro's 2024 study says 58.5% U.S.; the 2026 post restates 2024 as **60.45%**. Both are live on sparktoro.com and they disagree. The panel also changed (Datos → Similarweb). Writing "58.5% → 68%" as a measured trend is not defensible.

## 3.3 Best methodology in the entire field — Pew

- **Claim:** Google users clicked a result on 8% of visits where an AI summary appeared, versus 15% without one.
- **Publisher:** Pew Research Center, 2025-07-22, data March 2025
- **URL:** https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/
- **Quote:** "Users who encountered an AI summary clicked on a traditional search result link in 8% of all visits."
- Also: "Around one-in-five Google searches in March 2025 produced an AI summary"
- **Method:** 900 U.S. adults, KnowledgePanel Digital browser tracking, 68,879 real searches, 12,593 with an AI summary. Probability-based panel, non-commercial publisher, no stake in the answer. **Use this one when the claim is about searches.**

## 3.4 AI Overview prevalence — the range is 15% to 48% and it is all methodology

| Figure | Publisher | What it counts | Class |
|---|---|---|---|
| ~18% | Pew | real **searches**, March 2025 | PRIMARY |
| 15.69% | Semrush, Nov 2025, 10M+ keywords | **keywords** | PRIMARY |
| 30% | seoClarity, Sept 2025, 500M+ keywords | U.S. desktop **keywords** | PRIMARY (vendor set) |
| ~48% | BrightEdge, Feb 2026 | **BrightEdge customer** keywords | VENDOR-ONLY |

- Semrush: "AI Overviews were triggered for 15.69% of queries in November." https://www.semrush.com/blog/semrush-ai-overviews-study/
- BrightEdge: "AI Overviews now trigger on approximately 48% of tracked queries, up from 30% a year ago" https://www.brightedge.com/resources/weekly-ai-search-insights/ai-overviews-one-year-presence-size-citing — **48% of BrightEdge's tracked enterprise keywords, not of Google.** Universe size never disclosed.

> **The counter-evidence almost nobody cites:** on matched keywords, Semrush found AI Overviews slightly **reduced** zero-click — "the zero-click rate decreased from 33.75% to 31.53%." If the post takes a hard "AI Overviews are killing clicks" line, omitting this is a credibility risk.

## 3.5 Travel intent specifically
- BrightEdge (2025-09-11): travel AI Overview coverage rose **8.1% → 36.9%**, against a 44.4% all-query average. https://www.brightedge.com/resources/weekly-ai-search-insights/googles-ai-overview-rollout-reveals-clear-intent-hierarchy — **VENDOR-ONLY**, undisclosed keyword universe.
- **UNAVAILABLE: there is no travel-specific AI Overview percentage for 2026.** The September 2025 BrightEdge figure is the newest that exists.

## 3.6 Travel-specific AI behavior — VERIFIED and genuinely useful

**Adobe Analytics** (1 trillion+ visits analyzed + 5,000-respondent survey), 2025-03-17 — https://blog.adobe.com/en/publish/2025/03/17/adobe-analytics-traffic-to-us-retail-websites-from-generative-ai-sources-jumps-1200-percent
- "In February 2025, traffic to U.S. travel, leisure and hospitality sites (including hotels) from generative AI sources increased by 1,700 percent compared to July 2024."
- "Once users land on a travel site, Adobe Analytics data shows a 45 percent lower bounce rate among consumers coming from a generative AI source."
- "29 percent of the consumers surveyed have used generative AI for travel-related tasks, with 84 percent of those individuals saying it improved their experience."
> **CAVEAT:** 1,700% is growth off a near-zero July 2024 base. It is a growth multiple, **not** a share of travel traffic. Do not imply AI is a large share of travel sessions.

**Arival on AI tour discovery** (2026-03-30, n=2,550 U.S. + EU travelers) — https://arival.travel/article/ai-new-search-for-affluent-travelers/
- Cleanly quotable baseline: "In Arival's prior survey, just 8% of U.S. travelers and 7% of Europeans reported using AI tools for tour discovery."
- From the companion operator guide (https://arival.travel/article/getting-found-in-the-ai-age-a-guide-for-operators/): "two in three travelers now use AI when planning trips" · "In the U.S., more than one in four use AI to find a tour, and nearly one in three use it to find attractions" · "22 percent engage with AI-powered summaries right inside Google search"
> **FLAG:** current-year headline percentages sit behind Arival's Insider Pro paywall. The 8%/7% baseline is the safest quote. The related "AI That Works" report is **GetYourGuide-sponsored** — vendor-influenced.

**Google's own statements — PRIMARY-VERIFIED**
- "AI Overviews now has over 2.5 billion monthly active users." — Sundar Pichai, Google I/O, 2026-05-19, https://blog.google/innovation-and-ai/sundar-pichai-io-2026/
- "we're now sending billions of clicks to websites every week through AI features in Search." — Alphabet Q2 2026, 2026-07-22, https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/
> No denominator, no time comparison. Quote as a company position, not as data.

## 3.7 REJECTED — do not use
- **Bain's 60% zero-click** (https://www.bain.com/about/media-center/press-releases/20252/...) — press release discloses **no sample size, no fieldwork dates, no geography**. Self-reported survey about click behavior, the least reliable instrument available. It circulates because it is round and quotable.
- **Semrush's 2022 zero-click study** (25.6% desktop / 57% mobile) — **pre-dates AI Overviews entirely.** Still ranks, still miscited as current.
- **Similarweb 56% → 69%** — **news-category searches only**, verified only via Press Gazette. Routinely miscited as an all-search figure.
- **Datos "State of Search Q1 2025" (27.2%)** — no retrievable primary document; reachable only through Semrush's restatement.

---

# 4. Long-tail and question-query share

## 4.1 Google's own statement — VERIFIED as a statement

- **Claim:** Google says 15% of daily queries have never been seen before.
- **Publisher:** Google, Pandu Nayak (Google Fellow & VP Search), 2019-10-25
- **URL:** https://blog.google/products/search/search-language-understanding-bert/
- **Quote:** "We see billions of searches every day, and 15 percent of those queries are ones we haven't seen before"
- **FLAG:** no sample, no window, no definition of "seen before" has ever been published. It is an unaudited product-blog assertion, not a study. Cite it with the 2019 date attached.
- **UNAVAILABLE:** the older "20–25%" variant (no Google-domain source); Mueller's March 2025 restatement (conference notes only, no primary Google URL); Google's Feb 2022 tweet (HTTP 402).

## 4.2 Long-tail keyword share — VERIFIED, and **the famous number is dead**

- **Claim:** Almost 93% of Ahrefs' U.S. keyword database gets fewer than 10 searches a month.
- **Publisher:** Ahrefs, updated 2026-05-27
- **URL:** https://ahrefs.com/blog/long-tail-keywords/
- **Quote:** "Keywords with fewer than 10 searches per month account for almost 93% of our U.S. keyword database."
- **Method:** Ahrefs' own index composition (110B discovered, filtered to 28.7B). Measures **database composition**, not a census of Google queries.

> ### ⚠ **DO NOT CITE 94.74%.** It is no longer on the Ahrefs long-tail page. It survives only on https://ahrefs.com/blog/seo-statistics/, which now **contradicts Ahrefs' own updated page.** Using it will get the post caught.

## 4.3 The volume correction — the part most posts get wrong

Long tail is most of the *keywords* and almost none of the *volume*.

- **SparkToro + Datos**, 2024-12-03, 331,697,810 searches / 320,775 unique terms, Jan 2023–Sep 2024, U.S. desktop panel — https://sparktoro.com/blog/new-research-we-analyzed-332-million-queries-over-21-months-to-uncover-never-before-published-data-on-how-people-use-google/
  - **Quote:** "more than half (59%) had only a single search" … "a paltry 2.2% of total search volume"
- **Backlinko**, 306M keywords via DataForSEO, updated 2020-12-01 — https://backlinko.com/google-keyword-study
  - **Quote:** "all long tails combined only account for 3.3% of total search volume."
  - Also: 91.8% of terms are long-tail; average keyword = 1.9 words. **VENDOR-ONLY, 2020 data.**

## 4.4 Question-form queries — VENDOR-ONLY, and dated

- **Claim:** 14.1% of Google searches are question keywords.
- **Publisher:** Backlinko, 306M keywords, updated 2020-12-01
- **URL:** https://backlinko.com/google-keyword-study
- **Quote:** "14.1% of searches in Google were conducted via a question keyword."
- Breakdown: how 8.07%, what 3.4%, where 0.88%, why 0.82%, who 0.6%, which 0.33%
- **FLAG:** share of **keywords**, not of search volume. Prefix-matching misses questions that don't start with a question word. 2020 data — pre-AI-Mode. This is the **only** question-query figure verifiable at source.
- **UNAVAILABLE:** Neil Patel's 17% (HTTP 403, twice); Moz's 8% (no live URL located). SparkToro's 332M study contains **no** question data (verified absence).

## 4.5 ⚠ Head vs long-tail conversion — **THE CLAIM FAILS**

Your skepticism was warranted, and it is worse than "unsupported." The only peer-reviewed evidence points the **opposite** way.

- **Claim as the evidence actually reads:** Each additional word in a keyword *reduced* conversion rate by 5.41% in the only peer-reviewed measurement.
- **Publisher:** Anindya Ghose & Sha Yang, NYU Stern, ADKDD '08 (ACM DOI 10.1145/1517472.1517475)
- **URL:** https://pages.stern.nyu.edu/~aghose/organic_sponsored.pdf
- **Quote:** "an increase in length of the keyword by 1 word decreases conversion rate by 5.41 %"
- **Quote:** "longer keywords generally tend to have a detrimental affect on keyword performance such as conversion rates and profits"
- **Method:** 776 unique keywords, one large U.S. nationwide retailer on Google, 13 weeks; 2,065 paid + 12,382 organic observations; hierarchical Bayesian MCMC.
- **Companion** (WSDM 2008, https://pages.stern.nyu.edu/~aghose/wsdm08.pdf): "an increase in the length of the keyword by one word decreases the click-through rates by 6.6%"
- **Honest confound to disclose:** single advertiser, 2008 data. The conversion lift concentrates in retailer (+29.74%) and brand (+42.93%) terms, which are short — so length is partly proxying for branded/navigational intent. That weakens it as a refutation but does not rescue the vendor claim.

**WordStream does not support the claim either.** Its 2025/2026 Google Ads benchmarks (13,000+ campaigns, 23 industries) report CTR/CPC/CVR/CPL **by industry only** — there is **no keyword-length breakout**. https://www.wordstream.com/blog/2025-google-ads-benchmarks Anyone citing WordStream for "long-tail converts better" is citing something that does not exist.

**2026 Google Ads query-length data also runs against it** (Jason Tabeling/Further via Search Engine Land; SEL returned 403, reached via https://www.storyboard18.com/how-it-works/google-search-shifts-to-longer-queries-impacting-ads-ws-l-110616.htm):

| Query length | Impression share | Conversion share |
|---|---|---|
| 1–2 words | 24% | 41% |
| 3–4 words | 48% | 46% |
| 5–6 words | 17.2% | 9% |
| 7+ words | 10.8% | 4% |

Conversion efficiency falls monotonically as queries lengthen. **VENDOR-ONLY, secondary source chain — directional only.**

**UNSUPPORTED VENDOR FOLKLORE — no traceable dataset found for any of these:** "long-tail converts 2.5x better," "11x better," "average long-tail conversion rate is 36%," "2.3% one-word → 5.6% five-word."

> **Defensible reframe for the post:** the argument for long-tail is **cheaper access and lower competition** — which is exactly the new-operator-vs-entrenched-competitor argument you're making anyway. It is **not** a higher conversion rate. Make the competition argument; drop the conversion multiplier.

---

# 5. Schema / FAQ structured data and AI citation rates

## VERDICT: contradicted by platform statements. Do not sell this.

You asked me to be skeptical. The evidence is worse for the vendor claim than skepticism would predict.

## 5.1 Google says it in writing — twice

- **Publisher:** Google Search Central, "AI features and your website" (live 2026-09-24)
- **URL:** https://developers.google.com/search/docs/appearance/ai-features
- **Quote:** "There's also no special schema.org structured data that you need to add."

- **Publisher:** Google Search Central, "Optimizing your website for generative AI features on Google Search," section **"Mythbusting generative AI search: what you don't need to do"** (added 2026-05-15)
- **URL:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- **Quote:** "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add."
- **Google lists overfocusing on structured data as a myth, by name.**

## 5.2 Google killed the two schema types vendors push hardest

- **Publisher:** Google Search Central Blog, John Mueller, 2023-08-08
- **URL:** https://developers.google.com/search/blog/2023/08/howto-faq-changes
- **Quote:** "Going forward, FAQ (from FAQPage structured data) rich results will only be shown for well-known, authoritative government and health websites."
- **Quote:** "As of September 13, Google Search no longer shows How-to rich results on desktop, which means this result type is now deprecated."
- **Quote:** "Structured data that's not being used does not cause problems for Search, but also has no visible effects in Google Search."
- **Then removed entirely:** https://developers.google.com/search/updates (entry 2026-05-08) — "This feature will no longer appear in Google Search starting May 7, 2026."

## 5.3 The only matched causal test — NULL

- **Claim:** Adding JSON-LD produced no meaningful change in AI citations across any platform.
- **Figure:** AI Overviews **−4.6%**, AI Mode **+2.4%**, ChatGPT **+2.2%**
- **Publisher:** Ahrefs (Louise Linehan; analysis Xibeijia Guan)
- **Study:** *We Tracked 1,885 Pages Adding Schema. AI Citations Barely Moved.*
- **Year:** 2026-05-11
- **URL:** https://ahrefs.com/blog/schema-ai-citations/
- **Quote:** "Adding schema produced no major uplift in citations on any platform."
- **Method:** 1,885 pages that flipped from no JSON-LD to JSON-LD (Aug 2025–Mar 2026), each matched to 3 control URLs on different domains with similar pre-period citation levels; 30 days pre/post; matched difference-in-differences. Controls for platform-wide trend (raw AI Mode growth was +43%, nearly all of it platform, not schema).
- **The correlation it debunks:** across 6M URLs, AI-cited pages were ~3x more likely to have JSON-LD (53% of cited pages had schema). Ahrefs attributes this to confounding — schema lives on better-maintained sites that also do everything else right.
- **Class:** VENDOR-ONLY on provenance, but the design is the most rigorous available **and it cuts against Ahrefs' own commercial interest** in selling AEO tooling.
- **Ahrefs' own caveat:** treated pages were already heavily cited (100+ baseline), so it says nothing about undiscovered pages — which is, notably, exactly your new-site scenario.

**Second null, from someone who sells schema:** Kurt Fischman (Marshal Research), 2026 — https://marshal.ing/research/does-schema-markup-predict-ai-citation — schema presence OR = 0.678, **p = .296 (null)**; Google rank OR = 0.762/position, **p < .001**. Schema prevalence among AI-cited vs non-cited pages: **43.1% vs 44.8%**. n = 730 citations, 75 commercial queries. Self-published, not peer-reviewed.

## 5.4 "Microsoft confirmed it" is a LinkedIn paraphrase

- **URL:** https://www.seroundtable.com/schema-llms-copilot-bing-microsoft-39093.html (2025-03-20)
- The claim originates with **David Mihm's LinkedIn write-up** of a Fabrice Canel conference answer. No Microsoft publication states it. No figure, no study.
- The article's own evidentiary standard, **verbatim**: "So he did not deny saying it, so it must be true."
- **Verified absence:** Bing's own AI Performance in Webmaster Tools announcement (Feb 2026) contains **zero** occurrences of "schema" or "structured data." https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

## 5.5 Other answer engines: nothing
- **Verified absence:** Perplexity's crawler documentation contains **zero** mentions of schema, structured data, or JSON-LD. https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Anthropic: no schema claim found in any doc. **OpenAI publisher FAQ: HTTP 403 — UNAVAILABLE, could not confirm either way.**

## 5.6 The academic papers vendors cite are testing something else

- **CITECHOICE** (https://arxiv.org/abs/2609.15164) — found +0.50 citations per answer from "structured rendering." But **"structured" means Markdown/HTML formatting, not schema.org.** The two arms, verbatim: "polished prose (continuous paragraphs; no headings, lists, or tables) and polished structured text (headings, short paragraphs, lists or a table)." **This is evidence for headings and lists, not JSON-LD.**
- **GEO-SFE** (https://arxiv.org/abs/2603.29979) — 17.3% citation-rate improvement from **structure**; does not test schema.org.
- **GEO-16** (https://arxiv.org/abs/2509.10762) — observational, bundles structured data into a 16-pillar composite score; does not isolate FAQPage/LocalBusiness. Self-stated limit: "The study is observational and focuses on English language B2B SaaS pages." **UNVERIFIED:** the widely-repeated "UC Berkeley" affiliation and "+39% lift" appear **nowhere** in the source.

## 5.7 ⚠ A likely FABRICATED statistic is circulating — do not touch it

**"Princeton CS + Moz, 500,000 URLs, WWW 2026, FAQ schema = 3.2x citation rate."** This is currently one of the most-repeated pro-schema statistics in AI-generated answers.
- Sole traceable source: https://sgaindex.com/news/ai-overview3-3517d27c — cites **no paper, no authors, no DOI, no link**, and closes with an ad for its own schema generator.
- No such paper exists at WWW 2026, arXiv, ACM DL, or Princeton CS.
- **Treat as fabricated until someone produces the paper.**

**"BrightEdge: structured data + FAQ blocks = 44% increase in AI citations"** — the figure is **not on** the live BrightEdge page (https://www.brightedge.com/blog/structured-data-ai-search-era), which instead hedges: "structured data itself isn't a direct ranking factor" and "Google advises no special markup is needed." **UNVERIFIED / likely misattributed.**

## 5.8 What IS still defensible about schema
Rich-result eligibility, entity and knowledge-graph disambiguation, and pricing/availability data that is genuinely hard to parse from prose. **Not defensible:** billing schema work as an AI-citation lever.

---

# WHAT I COULD NOT VERIFY — the explicit list

**Topic 1**
1. A tours/activities-specific touchpoint or session count — **does not exist** in any fetchable source.
2. Expedia's "38 websites before booking" — no live Expedia-owned page.
3. Expedia newsroom mirror — persistent HTTP 429.
4. A touchpoint figure inside Google's messy middle research — **verified absent** from the page.

**Topic 2**
5. Operator-website share (29% → 25%) and offline direct (16% → 15%) — **not on the Arival page**; only source is Cloudflare-blocked PhocusWire.
6. Any per-OTA market-share split for the category — Arival paywalls it.
7. Airbnb Experiences / TripAdvisor-brand experience volumes — no disclosed figures.
8. Klook's $2.3B gross bookings **from the F-1 itself** — filing existence confirmed on EDGAR; figure is trade-press reported.
9. All Phocuswright and PhocusWire pages — Cloudflare-blocked on WebFetch, curl with browser UA, and text proxy.
10. Any **independent** (non-Arival) channel-share research for tours & activities.

**Topic 3**
11. Any travel-specific AI Overview percentage for **2026** — newest that exists is Sept 2025.
12. Datos "State of Search Q1 2025" primary document (the 27.2% figure).
13. A Similarweb-owned page for the 56% → 69% news zero-click figure.
14. Bain's sample size, fieldwork dates, and geography — absent from the press release.
15. BrightEdge's tracked-query universe size — never disclosed; the 48% has no denominator.

**Topic 4**
16. Google's older "20–25% new queries" variant — no Google-domain source.
17. Mueller's March 2025 restatement of the 15% — conference notes only.
18. Neil Patel's question-query and keyword-length conversion data — HTTP 403 on every URL.
19. Moz's "8% of queries are questions" — no live URL located.
20. Search Engine Land's query-length article — HTTP 403; figures only via secondary coverage.
21. **Any** primary dataset behind "long-tail converts 2.5x / 11x / 36%" — none exists that I could reach.

**Topic 5**
22. OpenAI's publisher FAQ — HTTP 403.
23. Moz's own AI Mode citation research — domain blocked.
24. "Princeton + Moz, 500k URLs, WWW 2026" — **no primary source exists**; treat as fabricated.
25. BrightEdge's "44% / State of Structured Data 2025" — figure absent from the live publisher page.
26. GEO-16's "UC Berkeley" affiliation and "+39%" — neither appears in the source.
27. A direct Danny Sullivan quote on schema and AI features — only second-hand in unfetchable SEL summaries.

---

# VENDOR-BLOG-ONLY FLAGS (no reachable primary)
- BrightEdge AI Overview figures (48% / travel 36.9%) — customer keyword set, undisclosed universe.
- Backlinko question-query and long-tail volume figures — transparent method, but vendor-run and 2020.
- The 2026 Google Ads query-length table — Search Engine Land blocked; reached via secondary aggregator.
- Arival "AI That Works" report — **GetYourGuide-sponsored**.
- GetYourGuide's GMV and experiences-booked totals — company self-reported, unaudited, and the most-quoted versions are secondary.
- Semrush's 27.2% zero-click — restates an unreachable Datos report.

# THE THREE STRONGEST CITATIONS IN THIS PACK
1. **Tripadvisor FY2025 10-K** — audited SEC filing. $4.7B Viator GBV, 22.9M bookings.
2. **Pew Research Center** — probability-based panel, real browsing data, non-commercial publisher.
3. **Google Search Central documentation** — the platform stating its own behavior on structured data, in writing.
