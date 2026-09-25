# Sources — Ads Inside Free LLM Answers Ledger

All retrieved live 2026-09-24 via WebSearch/WebFetch, one session, ~60 tool calls. Confidence
ratings match `data.json`. Does not repeat sources already listed in
`content-studio/research/2026-09-22/zero-click-future/sources.md` (OpenAI ChatGPT ads timeline,
OpenAI Sponsored Agents original announcement, Perplexity ads launch-to-discontinuation,
Google AI Mode ads/Google Marketing Live 2026, Alphabet FY2025 10-K, Pew Research AI-Overview
CTR study) unless a NEW figure from that same publisher was pulled this pass, in which case
it's listed here with the new URL and flagged as "expands" or "cross-reference" in `data.json`.

## Primary — directly fetched and quoted verbatim (High confidence)

- **Google Ads Help — "About ads and AI Overviews"**
  https://support.google.com/google-ads/answer/16297775?hl=en
  Fetched directly. "No, you can't directly target ad placements in the AI Overviews." / "No,
  you can't opt out of serving ads in AI Overviews." Eligible campaign types, sensitive-vertical
  exclusions.

- **Zappi — AI-ads consumer trust study**
  https://www.zappi.io/web/news/zappi-study-consumers-open-to-ai-ads-but-trust-and-personalization-risks-remain/
  Published 2026-05-18. n=1,000 US adults, current AI-assistant users. 82% trust AI ads at
  least as much as Google Search ads; 33%/28% bias/distinguishability concerns. Quote from
  Nataly Kelly, CMO.

- **Microsoft Advertising — "73% higher CTRs: why advertisers need to pay attention to
  conversational AI"**
  https://about.ads.microsoft.com/en/blog/post/august-2025/73-higher-ctrs-why-advertisers-need-to-pay-attention-to-conversational-ai
  Published 2025-08-06. Microsoft's own first-party data (O&O, Search only, Global, Feb-May
  2025). 73% CTR lift, 16% conversion lift, 33% shorter journeys — vendor-published, not
  independently audited; flagged accordingly in data.json.

- **Lurie, Encarnación, Friedler, Metaxa — "The Beginning of ChatGPT Ads"** (arXiv preprint,
  accepted AAAI/ACM AIES 2026)
  https://arxiv.org/abs/2608.05008
  Submitted 2026-08-05. 91 sock-puppet accounts, 335 prompts, 3,000+ ads from 186 advertisers.
  Key finding: lower-income-signaling accounts receive more ads regardless of race signal.
  First independent academic audit of ChatGPT ad targeting found this pass.

- **Search Engine Land — "Google corrects report claiming ads are coming to Gemini in 2026"**
  https://searchengineland.com/google-corrects-report-claiming-ads-are-coming-to-gemini-in-2026-465856
  Google VP of Global Ads on-record quote: "There are no ads in the Gemini app and there are no
  current plans to change that." Confirms the Gemini-app-vs-AI-Mode distinction.

- **ppc.land — Ginny Marvin (Google Ads Liaison) on AI Mode exact/phrase-match test**
  https://ppc.land/exact-and-phrase-match-keywords-gain-ai-mode-ads-in-google-test/
  Statement dated 2026-09-04, corroborated same-day by Search Engine Roundtable and Search
  Engine Land. Direct quote captured verbatim.

- **State of California — Governor's press release, SB 1050**
  https://www.gov.ca.gov/2026/09/16/governor-newsom-signs-new-law-to-protect-workers-require-disclosures-on-ai-generated-advertising/
  Signed 2026-09-16, effective 2027-01-01. AI-generated-performer disclosure in ads — scope is
  ad production, not in-answer chatbot ads; flagged as a distinct regulatory target in notes.md.

- **EU AI Act, Article 50 — transparency-obligations summaries**
  https://artificialintelligenceact.eu/transparency-rules-article-50/
  Took effect 2026-08-02. AI-system disclosure (not ad disclosure). Penalty up to €15M or 3%
  global revenue.

- **OpenAI Help Center — "Ads in ChatGPT" policy, as quoted by Help Net Security**
  https://www.helpnetsecurity.com/2026/08/31/chatgpt-ads-privacy-policy/ (secondary, quotes
  OpenAI's own policy verbatim; help.openai.com itself returned HTTP 403 to direct WebFetch)
  Published 2026-08-31. Ad-targeting signals pre/post personalization opt-in, verbatim policy
  lines on ads not influencing answers and advertisers not receiving chat content.

## Secondary — consistent across independent outlets, primary not directly re-fetched this pass
  (Medium / Medium-High confidence)

- ChatGPT free/Go ad tiers, Plus/Pro/Business/Enterprise/Education ad-free — corroborated across
  macrumors.com/2026/02/09/chatgpt-now-has-ads/, intuitionlabs.ai, proton.me/blog/chatgpt-ads,
  launchcodex.com, christopheralarcon.com.
- OpenAI Sponsored Agents partner detail (Wayfair, HubSpot, Shopify) and mechanics —
  finance.yahoo.com/media-advertising/articles/openai-sponsored-agents-turn-chatgpt-155347973.html,
  forkast.news/openais-sponsored-agents-turn-chatgpt-into-an-ad-platform-where-brands-are-the-product/,
  qz.com/openai-chatgpt-sponsored-agents-hubspot-shopify-091726, adtechradar.com/2026/09/17/.
  Announcement itself: openai.com/index/reimagining-advertising-with-ai/ (2026-09-16, HTTP 403
  to direct WebFetch).
- ChatGPT Ads Manager self-serve terms ($25/day minimum, $200K minimum eliminated, Persona
  verification, country list) — topgrowthmarketing.com, trylapis.com (two articles), cloro.dev,
  ceaksan.com; help.openai.com/en/articles/20001213 and /20001245 both HTTP 403 to direct fetch.
- ChatGPT ad exclusion/brand-safety controls — emarketer.com/content/chatgpt-ad-exclusions-give-brands-safeguards-targeting-gaps-persist,
  contentgrip.com/chatgpt-ad-targeting-controls/, adtechradar.com/2026/03/22/openai-chatgpt-ad-policies/.
- Perplexity discontinuation financial/strategic detail ($200M ARR Oct 2025, $500M end-2026
  target, FT quote) — winbuzzer.com/2026/02/18/, digitalapplied.com, aicerts.ai, almcorp.com.
- Perplexity historical ad mechanics (Related Questions = ~40% of queries, keyword exclusion) —
  ppc.land/heres-how-perplexity-ai-ads-will-appear-sponsored-questions-and-side-media/,
  searchengineland.com/perplexity-begins-testing-ads-448277, infotrust.com.
- Microsoft Copilot ad rollout timeline and mechanics (sponsored recommendations sourced from
  Search/Shopping/AI Max/PMax campaigns) — 1digitalagency.com, thrad.ai, stackmatix.com (two
  articles), spaceads.agency; about.ads.microsoft.com/en/tools/productivity/copilot-in-microsoft-advertising
  fetched directly but documents the ad-buying assistant, not in-Copilot placement mechanics
  (gap noted in data.json).
- Meta AI ad-data-use and shopping-carousel test — proton.me/blog/meta-ai-ads,
  dataslayer.ai/blog/meta-will-use-ai-conversations-to-personalize-ads,
  techcrunch.com/2026/05/27/, mediapost.com/publications/article/413248/ (2026-03-05 shopping
  test), about.fb.com/news/2026/06/meta-business-agent/.
- SE Ranking — "ChatGPT Shows Ads for 1 in 4 Commercial Prompts"
  https://seranking.com/blog/chatgpt-ads-study/ — 50,006 prompts, 20 niches, data collected
  2026-07-23. 25.94% ad share, 14.35% off-target. Corroborated by
  searchengineland.com/study-chatgpt-ads-appear-on-26-of-commercial-prompts-484590 and
  relevantaudience.com.
- SE Ranking — "AI Mode shows ads on 1 in 3 queries: 50K keywords studied"
  https://www.searchenginejournal.com/google-ai-mode-shows-ads-on-1-in-3-commercial-keywords/582976/
  (SEJ's independent write-up of the SE Ranking study). Published 2026-07-21. 29.45% ad share
  on commercial keywords, 11% domain-citation overlap, 1.95% exact-URL overlap.
- Quoleady — "LLMO Research" (G2/Capterra/Wikipedia presence among ChatGPT-mentioned SaaS tools)
  https://www.quoleady.com/llmo-research/ — fetched directly. Published 2026-06-04.
- Orbit Media Studios (Bill Widmer) — "LLM Citation Study"
  https://www.orbitmedia.com/blog/ai-citation-sources/ — fetched directly. Published
  2026-09-02, data through 2026-08-23. 13,184 citations, 1,765 answers, 4 LLMs, 1.7% cross-model
  domain agreement.
- Search Engine Land — Google AI Max auto-upgrade deadline
  https://searchengineland.com/google-to-auto-upgrade-some-search-campaigns-to-ai-max-484428,
  corroborated by choice.marketing/research/google-ai-max-auto-upgrade/ and e2msolutions.com.
  Auto-upgrade began 2026-09-01.
- Microsoft Learn — Google Ads import tool documentation
  https://learn.microsoft.com/en-us/advertising/guides/google-ads-import?view=bingads-13,
  corroborated by about.ads.microsoft.com/en/tools/productivity/import-tools.
- FTC AI-in-advertising disclosure framework (general, not chatbot-ad-specific) —
  humanadsai.com/blog/ftc-ai-generated-content-disclosure, ppl.studio, auditsocials.com
  (three separate posts), thestacc.com. FTC.gov itself not directly fetched this pass; penalty
  figure disagrees slightly across sources ($51,744 vs. $53,088 per violation).
- OpenAI WAU/paid-subscriber figures (900M WAU, 50M+ paid consumer, 9M+ paying business) —
  digitalinformationworld.com/2026/02/openai-reports-900m-weekly-chatgpt.html,
  techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users, scalevise.com.
- Gemini 1B MAU milestone, paid-subscriber non-disclosure —
  implicator.ai/google-puts-gemini-at-1-billion-monthly-users-without-naming-paying-subscribers/,
  techtimes.com/articles/324095/, getpanto.ai/blog/google-gemini-statistics (third-party 15-25M
  paid estimate).
- Perplexity 100M+ MAU, paid-count disagreement — resourcera.com, sentisight.ai, demandsage.com,
  wytlabs.com, cloudzero.com (Airtel free-Pro-bundle context).
- Microsoft Copilot MAU tiers (420M all-surface / 145M consumer / 28M paid M365 enterprise
  seats) — getpanto.ai/blog/microsoft-copilot-statistics, stackmatix.com (two articles),
  seoscaleup.com.
- Meta AI MAU (1.2-1.5B broad / 640M strict) — demandsage.com/meta-ai-users/,
  affiliatebooster.com, resourcera.com, sqmagazine.co.uk.

## Low confidence — flag before using as a standalone tile

- The Information (Shane Burke) — "77% of Chatbot Users Don't Trust AI With Ads"
  https://www.theinformation.com/articles/77-chatbot-users-trust-ai-ads — paywalled, only
  headline + Threads teaser retrievable, methodology unconfirmed.
- BrightEdge 44%-citation-lift-from-schema claim, Ahrefs' 1,885-page no-uplift test, and Kurt
  Fischman's SSRN preprint (https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6284518,
  2026-02) — all via WebSearch synthesis only this pass, not independently re-fetched verbatim.
  Actively disagree with each other; presented as an open dispute in notes.md, not resolved.
- subscribepr.com — "Wikipedia = 47.9% of ChatGPT's top-cited sources for factual queries" —
  single industry blog, not independently corroborated.
- UK ASA forward-looking signal on AI-in-ads scrutiny —
  https://www.resultsense.com/news/2026-08-27-asa-ai-assistant-ad-claims/ — no formal guidance
  published yet, characterized as "reasonably expected during 2026" by the source itself.
- Google AI Overview ad-share disagreement (25.5% vs. ~40%+) — bir.ch/blog/google-ads-in-ai-overviews
  vs. a second, unnamed source cluster surfaced during the CTR search; neither is
  Google-published; flagged as an open disagreement, not resolved.
- Entity/Wikidata-as-citation-prerequisite advice — upgrowth.in, overthetopseo.com (two
  articles), medium.com/@tommy_81972 — directional industry assertion, no controlled study
  located.

## Research gaps (see notes.md for full detail)

- Consumer Copilot Pro paid-subscriber count: not disclosed anywhere found.
- Meta AI paid consumer tier: not yet live per sources found (only "AI plans" roadmap language,
  TechCrunch 2026-05-27); could not confirm current status beyond that.
- No FTC action specific to in-answer/conversational AI ads (as opposed to general AI-content
  disclosure) was located.
- help.openai.com and openai.com/index/ URLs returned HTTP 403 to WebFetch on every attempt
  this session (5 separate URLs tried) — same blocking pattern the 2026-09-22 researcher
  reported on this domain. All OpenAI-sourced figures in this ledger are secondary-quoting-primary,
  capped at medium-high confidence for that reason.
