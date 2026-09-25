# Research Notes — Zero-Click Future
2026-09-22. Read this before drafting. Companion files: `data.json` (39 sourced entries, sections a-g), `sources.md`.

## The "60%" stat — verdict up front
**No survey found says "60% of people would let an agent do their shopping and searching."** That is not in Adobe, Salesforce, Capgemini, PYMNTS, Gartner, McKinsey, Bain, or Adyen's published work as a single general-population figure covering both actions. What's real:

| Figure | What it actually measures | Source, date |
|---|---|---|
| 51% (59% Millennials) | Let AI run the *entire* shopping process incl. final purchase, once preferences are set | Adyen, 2026-01-09 |
| 58% | Have *replaced search engines* with GenAI tools for recommendations | Capgemini, 2025-01-09 |
| 56% | Would let an agent *search and compare* products (not pay) | PYMNTS (medium confidence — see gap below) |
| ~33% | Gen Z comfortable having an agent *shop for them* (general population not given) | Salesforce/YouGov, 2024-10-31 |
| 14% | Actually *trust* AI to place an order on their behalf | Bain, 2025 |

The pattern: every survey that asks about *interest* or *conditional* delegation ("once preferences are set," "search and compare") lands in the low-to-high 50s. Every survey that asks about *actual trust* or *completed behavior* lands under 25%. If Mitch's "60%" memory is real, it's almost certainly a rounding of Adyen's **59% of Millennials**, or a conflation of Capgemini's 58% (search) with a shopping figure in the same neighborhood — not a single number that exists as stated. Recommend the post either (a) use the Adyen 51%/59% pair with exact wording, or (b) run the whole table above as a "the number depends entirely on what you ask" beat, which is more defensible and more interesting than picking one.

**Correction caught mid-research:** an early web-search synthesis attributed the 51%-delegation figure to McKinsey. It's Adyen's. McKinsey's own closest figure is 68% "used at least one AI tool in the past 3 months" (ConsumerWise, Feb 2026) — general usage, not delegation. Flagging this because it's exactly the kind of mix-up that ends up laundered into a wrong-attribution the way the old ledger's fabricated Semrush "57.3%" stat did — caught this time before it went in the ledger.

## Arithmetic shown (per the assignment's instruction — computed only from sourced inputs)

**Total volume anchor:** Google itself says "more than 5 trillion searches on Google annually" (Vidhya Srinivasan, blog.google, 2025-03-03) — the freshest first-party figure available, superseding the older "8.5 billion/day" trial-testimony figure still being recycled everywhere (that recycled figure implies ~3.1 trillion/year, well under Google's own newer number; a second antitrust-trial figure from 2025 says 10 billion/day, ~3.65 trillion/year — three different "per day" numbers exist in circulation and don't agree; see data.json for all three, presented as a range, not resolved to one).

- 5,000,000,000,000 / 365 = **~13.7 billion searches/day**, global.

**Intent split (using the 2008 Jansen 80/10/10 split already in `content-studio/research/2026-09-14/search-intent/data.json` — not re-derived, just multiplied through):**

- Informational: 5T x 80% = **4.0 trillion/year (~10.96B/day)**
- Navigational: 5T x 10% = **500 billion/year (~1.37B/day)**
- Transactional: 5T x 10% = **500 billion/year (~1.37B/day)**

**Say this every time the arithmetic appears:** the split is an 18-year-old, 3-category, pre-mobile, pre-AI taxonomy with no commercial-investigation or local bucket and 74% classification accuracy on the original sample. This computation demonstrates *scale* — what "10% of searches" means in absolute terms today — it is not a claim that 10% is still the true navigational share. The existing post already makes this exact point in prose ("no full-sample replacement exists"); this arithmetic gives it a number to put on a tile, with the same caveat attached.

A modern-but-different-metric data point exists for contrast: Similarweb reports 54% of the *top 100* Google searches (2023) were navigational — but that's a head-query list (facebook, youtube, amazon by construction), not a random sample, so it's not comparable to Jansen's methodology. Low confidence, not independently re-fetched this pass. Use only as a labelled aside, never as "the 2023 replacement number."

## Google's own words vs. its own data (the sharpest contrast found this pass)
Both dated 2025, both about the same phenomenon, both from credible-but-different sources:

- **Google (Liz Reid, VP Head of Search, blog.google, 2025-08-06):** "Overall, total organic click volume from Google Search to websites has been relatively stable year-over-year." No Search Console data or chart published alongside the claim.
- **Pew Research Center (2025-07-22, n=900 US adults tracked March 2025, 68,879 queries):** 8% of visits clicked a standard result when an AI summary was present, vs. 15% when it wasn't — nearly half. Only 1% clicked a link inside the AI summary itself.

Present both, dated, without picking a side in the post's own voice — that's the more defensible move than asserting either is "right," and it mirrors how the 2026-09-14 ledger already handled the First Page Sage vs. Ahrefs/Seer disagreement.

Also worth the post noting: the 10-K's own description of Google's evolution — **"from a company that helps people find answers to a company that also helps people get things done"** — is Google narrating its own move away from the results-page-as-destination model. That is about as on-the-nose a self-description of the zero-click shift as a company is likely to publish. (Flagged in data.json as extracted-not-triple-checked; the mission-statement sentence beside it was captured cleanly and can anchor the quote if this one needs independent re-confirmation first.)

## Gartner's 25%-by-2026 forecast: not resolved, and say so precisely
Gartner's own press release (2024-02-19, analyst Alan Antin) said "traditional search engine volume will drop 25%" by 2026 due to AI chatbots. Two things are true simultaneously and the post should hold both:

1. **Google's share among search engines hasn't moved:** StatCounter puts Google at 91.1% worldwide as of August 2026 — Bing, Yahoo, Yandex, DuckDuckGo haven't taken share.
2. **That is not the same metric Gartner forecast.** Gartner's claim was about total search-engine *volume* being displaced by chatbots/agents *outright* — a category StatCounter's "share among search engines" cannot see, by definition, because a query that never touches a search engine doesn't appear in that denominator at all. The honest read: Google hasn't lost the search-engine wars, but that says nothing about whether the total pool of "searches" (broadly defined to include a ChatGPT or Gemini prompt that replaces one) has held steady. Nobody in this research pass has published a clean, dated, apples-to-apples "total query volume across search engines + chatbots, then vs. now" number — that is a real, currently-unfilled gap, not something to paper over with the StatCounter figure.

The only retrospective take found (futurefactors.ai, ~April 2026, independent blog, low-medium confidence) argues the prediction "didn't happen" — cites Google's 90%+ share and ChatGPT's ~883M MAU as evidence "search is evolving, not collapsing." Treat as framing/color, not as a citable authority.

## What's genuinely new here vs. the 2026-09-14 ledger
Confirmed independently this pass (that ledger had only flagged/located, not fetched): **BrightEdge's 54.5%-from-32.3% AI-Overview-citation/organic-rank overlap finding** (Sept 18 2025) is now directly fetched and verbatim-confirmed. Safe to upgrade its confidence rating if it's used again.

Everything else in sections a-g is new to this project's research: the Google 5-trillion/year statement, the full Alphabet FY2025 financials, the Liz Reid/Pew Research click-volume contradiction, the Gartner retrospective, the ChatGPT/Perplexity/Google AI Mode ads timelines, the Ahrefs 75k-brand visibility study, and the five-protocol agentic-checkout infrastructure cluster (Stripe/OpenAI, Mastercard, Google AP2, Google UCP, Visa).

## Confidence gaps to close before publish (do not silently upgrade these)
- PYMNTS "56% would let an agent search and compare products" — the exact report title/URL wasn't pinned after two fetch attempts landed on adjacent PYMNTS pieces. Medium confidence only.
- BrightEdge's FAQ-schema +45% citation-lift figure, Authoritas's +156% original-content figure, and the "Machine Relations" citation-durability research — all found via search synthesis only, not independently re-fetched verbatim. The "Machine Relations" publisher itself isn't independently established as a research organization — lowest confidence in the whole ledger, flag hard before using as a tile.
- The Adobe-attributed AI-referral conversion figures (42% better conversion, 37% higher revenue-per-visit, March 2026) — single reporting path, adobe.com itself not fetched. A companion claim in the same source cluster ("70.6% of AI referral sessions invisible to GA4, so traffic is undercounted 3-4x") has NO named methodology behind it — excluded from the shock-stat shortlist below for that reason; do not use it even as color without independently verifying it first.
- Full-year (not quarterly) "Google Search & other" dollar figure for FY2025 wasn't located in the earnings-release excerpt fetched. If the post wants a clean "$X billion was Search alone in 2025" figure, pull it from the 10-K's Item 7 MD&A directly before publishing.
- This session's WebSearch budget (200 calls) ran out near the end of research. Two planned date-confirmations (Search Engine Journal / Press Gazette pieces on the Google-clicks credibility dispute) were dropped rather than guessed at. Not a blocker — the Pew Research figure already carries that argument with a harder source — but noting the gap rather than hiding it.

## SHOCK-STAT SHORTLIST — 10 tile-ready sentences, sourced

1. **Google now sees more than 5 trillion searches a year — Google's own number.** *(Vidhya Srinivasan, blog.google, 2025-03-03.)*
2. **Online advertising was more than 70% of Alphabet's entire revenue in 2025.** *(Alphabet Inc. Form 10-K, FY2025.)*
3. **When an AI summary shows up in Google, only 8% of visits end in a click on a normal result — versus 15% when it doesn't. A link inside the AI summary itself gets clicked 1% of the time.** *(Pew Research Center, 900 US adults tracked March 2025, published 2025-07-22.)*
4. **Google's own Head of Search says click volume is "relatively stable." Pew's independent tracking panel, published eleven days earlier that same year, measured clicks falling by nearly half when an AI Overview appears. Neither cites the other.** *(Liz Reid/Google, 2025-08-06; Pew Research, 2025-07-22.)*
5. **Gartner predicted traditional search volume would fall 25% by 2026. Google still holds 91.1% of the worldwide search-engine market — but that number can't see the queries that went to a chatbot instead of a search engine at all.** *(Gartner, 2024-02-19; StatCounter, August 2026.)*
6. **OpenAI turned on ChatGPT ads February 9, 2026. By August 31 — under 200 days later — they were at a $1 billion annualized revenue run-rate.** *(OpenAI ads timeline, 2026.)*
7. **Perplexity ran ads for fifteen months, then walked away entirely: ad revenue was under 0.1% of its 2024 revenue — about $20,000 out of $34 million.** *(Perplexity ads launch 2024-11-12, discontinued 2026-02-18.)*
8. **Across 75,000 brands, the single strongest correlate of AI-search visibility wasn't backlinks or Domain Rating — it was YouTube brand mentions.** *(Ahrefs, 75,000 brands, published 2025-12-12.)*
9. **The share of AI Overview citations that also rank organically in Google jumped from 32.3% to 54.5% in sixteen months — being cited and being ranked are converging, not splitting apart.** *(BrightEdge, 9 industries, May 2024-Sept 2025, published 2025-09-18.)*
10. **Five different companies — Stripe/OpenAI, Mastercard, Google (twice), and Visa — each shipped their own checkout-by-agent protocol within a 13-month span. All five route the payment to a named merchant, not around one.** *(Stripe/OpenAI 2025-09-29; Mastercard 2025-04-29; Google AP2 2025-09-16; Google UCP 2026-01-11; Visa 2026-04-08.)*

## Follow-up post brief — "Optimizing for ads inside free LLM answers"
ChatGPT's free tier has carried ads since February 2026 and reportedly reached a $1 billion annualized revenue run-rate in under 200 days; OpenAI has since layered a second, more aggressive unit — Sponsored Agents, which open a direct chat with an advertiser's own AI agent inside ChatGPT rather than sending the user to a website — on top of that, starting September 2026. Google is testing its own Gemini-built formats (Conversational Discovery ads, Highlighted Answers, AI-powered Shopping ads) inside AI Mode over the same stretch. Perplexity tried the identical move — sponsored follow-up questions, launched November 2024 — and reversed out of it completely by February 2026, when ad revenue was still under 0.1% of its total and it pivoted to a subscription-only model instead. That split (two platforms doubling down on LLM-answer advertising, one walking away within fifteen months) is itself the story worth a dedicated post: free-tier LLM answers are becoming an ad-supported medium with its own placement types, targeting logic, and brand-safety questions — distinct from both classic search ads and classic AI-Overview citation — and "optimizing" for it means something different in each surviving format. A follow-up should map what each format actually looks like, who sees it, and what a brand can and can't buy, before the market consolidates further.

Five sources for the follow-up:
1. OpenAI ChatGPT ads rollout timeline (Jan-Aug 2026) — see `data.json` section e, `chatgpt_ads_timeline`.
2. OpenAI Sponsored Agents pilot announcement, 2026-09-16 — `data.json` section e, `chatgpt_sponsored_agents`.
3. Perplexity's ads launch-to-abandonment, 2024-11-12 to 2026-02-18 — `data.json` section e, `perplexity_ads_lifecycle`.
4. Google Marketing Live 2026 coverage of ads in AI Mode — `data.json` section e, `google_ai_mode_ads`.
5. Alphabet Inc. Form 10-K, FY2025 ("more than 70% of total revenues from online advertising") — for the economic backdrop on why Google is under structural pressure to protect ad revenue as more queries move into AI Mode / away from the classic ten-blue-links page.
