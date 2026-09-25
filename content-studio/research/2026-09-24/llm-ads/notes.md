# Research Notes — Ads Inside Free LLM Answers
2026-09-24. Read this before drafting. Companion files: `data.json` (42 sourced entries,
sections a-f), `sources.md`. Starting point: the five sources named in
`content-studio/research/2026-09-22/zero-click-future/notes.md`'s follow-up brief — all five
referenced by pointer here, not duplicated (see `does_not_duplicate` in data.json).

## Headline framing this research supports
The brief's premise holds up: two platforms are doubling down on in-answer ads (OpenAI, Google)
and one walked away entirely (Perplexity) — and the picture got MORE lopsided this month, not
less. Google shipped two more AI Mode ad-format changes inside a single 12-day window this
research pass alone (2026-09-04 exact/phrase-match test, 2026-09-16 ad-description test), and
OpenAI's Sponsored Agents (2026-09-16) raise the bar again — advertisers now need their own
conversational AI agent, not just ad creative, to participate. Meanwhile Microsoft and Meta
occupy a third, less-discussed lane: Microsoft has ads live in Copilot but its own performance
claims are unaudited and 13 months stale; Meta has NO confirmed in-chat sponsored placements
yet, only (a) using AI conversations to target ads elsewhere on its apps, and (b) a narrow
shopping-carousel test. That three-way split (double down / walk away / quietly different
model) is a stronger structure than a simple "who has ads" binary.

## Disagreements found — flagged, not resolved (do not silently pick a number)

1. **Google AI Overview ad-share:** one source cluster says ads on ~25.5% of AIO SERPs
   (up from ~3% Jan 2025); a separate cluster says ~40%+ by Nov 2025, from the same ~3%
   starting point. Neither is Google-published. See `data.json:google_aio_ad_share_disagreement`.
2. **Perplexity paid-conversion rate:** one estimate says ~1M paid users out of 100M+ MAU
   (~1%); an adjacent estimate in the same search cluster says "5-7% conversion" — arithmetically
   inconsistent (5-7% of 100M would be 5-7M, not 1M). Perplexity discloses neither. Confounded
   further by mass free-Pro giveaways (e.g., a 360M-eligible Airtel bundle in India). See
   `data.json:perplexity_mau_paid_split_disagreement`.
3. **Does schema markup cause higher AI-citation rates?** Actively disputed. BrightEdge-attributed
   claim: +44% citations, 3.2x more likely cited, from 73 sites. Ahrefs: tested 1,885 pages,
   found NO uplift. SSRN preprint (Fischman, Feb 2026) leans skeptical. None independently
   re-fetched verbatim this pass. This is the sharpest live methodological fight in the whole
   ledger — worth naming explicitly in the post rather than picking a side. See
   `data.json:schema_markup_citation_disagreement`.
4. **Trust in AI ads:** Zappi (n=1,000, AI-assistant users, 2026-05-18) says 82% find AI ads at
   least as trustworthy as Google Search ads. The Information says 77% of "chatbot users" don't
   trust AI with ads. NOT a clean contradiction — likely different populations/questions (Zappi
   sampled existing power-users and asked a comparative question; The Information's methodology
   is unconfirmed, paywalled). Present both, dated, without resolving — same move the
   2026-09-22 ledger used for the Liz Reid/Pew Research contrast.
5. **FTC per-violation penalty for undisclosed AI ads:** sources say both $51,744 and $53,088.
   Neither traced to FTC.gov directly this pass. Use "approximately $51-53K," not a false-precise
   single figure.
6. **Meta AI MAU:** 1.2-1.5B under a broad "received an AI response" definition vs. 640M under
   a stricter deliberate-use definition the source itself calls more comparable to ChatGPT/Claude
   MAU. Not a disagreement between sources so much as two different metrics being blurred
   together in coverage — flag the definitional gap, not a factual conflict.

## Gaps — not found, not disclosed, or explicitly blocked

- **OpenAI's own policy pages were unreachable all session.** Five separate help.openai.com /
  openai.com/index/ URLs all returned HTTP 403 to direct WebFetch (Ads in ChatGPT policy,
  Testing ads in ChatGPT, Reimagining advertising with AI, Ads Manager setup, Ads Manager
  availability, Ad policies). Every OpenAI-sourced figure in this ledger is secondary-quoting-primary
  as a result, capped at medium-high confidence. This matches the 2026-09-22 researcher's
  experience on the same domain — worth a standing note that openai.com/help.openai.com may be
  systematically blocking this tool's fetcher, not a one-off.
- **Consumer Copilot Pro paid-subscriber count:** not disclosed anywhere found. Microsoft
  discloses M365 Copilot enterprise seats (28M) but not the consumer subscription tier.
- **Meta AI paid consumer tier:** no evidence it's live. TechCrunch (2026-05-27) reports Meta
  launched IG/FB/WhatsApp subscriptions with "more to come, including AI plans" — roadmap
  language only.
- **No FTC action specific to in-answer/conversational AI ads** (as distinct from the general
  AI-content-disclosure framework) was located. The "dual disclosure" requirement being reported
  is general AI-advertising guidance applied by inference, not a chatbot-ads-specific rule.
- **UK ASA has no published chatbot-ad guidance yet** — only a CEO signal that it's "on the
  radar" (2026-08-27), with formal guidance "reasonably expected during 2026" per the source
  itself. Forward-looking, not actionable today.
- **Microsoft's own Copilot-in-advertising page documents the ad-BUYING assistant tool, not
  how ads are placed inside end-user Copilot chats.** The in-Copilot placement mechanic is
  sourced only from secondary write-ups this pass — a real documentation gap on Microsoft's
  side, not just a research miss.
- **No second independent replication** of either SE Ranking study (ChatGPT 25.94% ad share;
  AI Mode 29.45% ad share / 11% citation overlap) was found. Single-study source for two of the
  ledger's strongest numbers — flagged medium-high, not high, for that reason.
- **Wikipedia's 47.9%-of-ChatGPT-citations figure** — single blog (subscribepr.com), not
  independently corroborated. Don't use as a standalone tile without a second source.

## Arithmetic shown (computed only from sourced inputs, per house convention)

- ChatGPT paid-consumer conversion: 50,000,000 / 900,000,000 = **5.56% ≈ 5.6%** (both figures
  OpenAI-disclosed, Feb 2026). This is the single cleanest "what share of ChatGPT's free
  audience is ad-eligible" number in the ledger — implying roughly 19 in 20 consumer WAU sit on
  Free or Go.
- Gemini paid-conversion, shown with its limits: a third-party estimate (not Google-sourced)
  puts 15-25M paid subscribers against a base the ESTIMATE ITSELF states as "then-750M MAU"
  (≈2-3%, the source's own math). Recomputing that same 15-25M against Google's newer,
  confirmed 1B MAU figure gives 1.5-2.5% — this recomputation is this researcher's, not
  sourced, flagged in data.json, and should not be used as a citable figure on its own, only
  as a "the ratio likely fell further as MAU grew" directional note.

## SHOCK-STAT SHORTLIST — 10 tile-ready sentences, sourced

1. **OpenAI has disclosed both halves of the fraction: 50 million paid ChatGPT subscribers
   against 900 million weekly active users — meaning roughly 19 out of 20 people using ChatGPT
   every week are on a tier that can show them ads.** *(OpenAI, Feb 2026, via multi-outlet
   reporting; 5.6% computed this pass.)*
2. **A 50,000-prompt independent study found ChatGPT shows an ad on 1 in 4 commercial
   questions — and judged 1 in 7 of those ads irrelevant to what was actually asked.**
   *(SE Ranking, 50,006 prompts, data collected 2026-07-23.)*
3. **The same research team found Google's AI Mode shows ads on 29% of commercial
   searches — but the company paying for that ad shows up anywhere in the answer's own
   citations only 11% of the time, and at its exact advertised page just 1.95% of the time.**
   *(SE Ranking via Search Engine Journal, published 2026-07-21.)*
4. **The first independent academic audit of ChatGPT's ad targeting — 91 test accounts, 186
   advertisers, 3,000+ ads — found lower-income accounts get more ads than higher-income
   accounts, regardless of the race the account signaled.** *(Lurie, Encarnación, Friedler,
   Metaxa, arXiv, submitted 2026-08-05, accepted AAAI/ACM AIES 2026.)*
5. **Perplexity's entire 15-month ad experiment brought in about $20,000 against $34 million in
   revenue — under 0.1% — before it walked away completely. OpenAI hit a $1 billion annualized
   ad run-rate in roughly the same stretch of calendar time.** *(Cross-referenced from the
   2026-09-22 ledger; both companies' trajectories reconfirmed this pass.)*
6. **Track the same 72 questions across ChatGPT, Claude, Gemini, and Perplexity for three
   months — 13,184 citations, 1,765 answers — and all four AI systems agree on citing the exact
   same source for the exact same question just 1.7% of the time.** *(Orbit Media Studios /
   Bill Widmer, published 2026-09-02, data through 2026-08-23.)*
7. **Google's own help documentation says it plainly: advertisers can't choose where their ad
   lands inside an AI Overview, and once a campaign is eligible, there is no way to opt back
   out.** *(Google Ads Help, support.google.com, fetched directly.)*
8. **Google changed what its own AI Mode ads can do twice in twelve days this month —
   opening exact-match keywords to AI Mode eligibility on September 4, then adding description
   text to AI Mode ads on September 16.** *(Google Ads Liaison Ginny Marvin, 2026-09-04;
   Search Engine Watch, 2026-09-16.)*
9. **82% of people already using an AI assistant say its ads feel at least as trustworthy as a
   Google Search ad — but in the same survey, more than 1 in 4 say they can't tell an ad apart
   from the AI's real answer.** *(Zappi, n=1,000 US adults, published 2026-05-18.)*
10. **Microsoft's own (unaudited) numbers claim Copilot ads get 73% higher click-through and
    close deals in a third fewer steps than traditional search ads — a figure from August 2025
    that's still being published as current a year later.** *(Microsoft Advertising, 2025-08-06.)*

## Proposed infographic structure — five sectors, three rings

Five assistants as sectors (reconciling the assignment's six-item list: Google's AI Mode, AI
Overviews, and Gemini collapse into one "Google" sector since they're one company with sharply
different ad status per surface — that internal split is itself worth showing inside the
Google wedge rather than treating Gemini as a sixth sector):

**Sectors (5):** OpenAI/ChatGPT · Google (AI Mode + AI Overviews + Gemini) · Microsoft/Copilot ·
Perplexity · Meta AI

**Ring 1 (innermost) — Who sees ads / audience split:**
| Sector | Figure | Source |
|---|---|---|
| OpenAI | Free + Go tiers only; 50M/900M paid = 5.6% | OpenAI Feb 2026 (data.json:chatgpt_wau_paid_split) |
| Google | Gemini app: 0% (no ads). AI Mode/AI Overviews: ads to all users, no tier gate — paid Google AI Plus/Ultra doesn't remove Search ads (not a "no-ads" purchase the way ChatGPT Plus is) | Search Engine Land denial + Google Ads Help (data.json:gemini_app_ad_free_vs_ai_mode) |
| Microsoft | Copilot ads shown across consumer surfaces; 28M paid are enterprise M365 seats, not a consumer ad-removal tier; consumer Copilot Pro paid count **not disclosed** | data.json:copilot_mau_split |
| Perplexity | N/A — no ad program exists; 100M+ MAU, paid split disputed (~1% vs 5-7%, unresolved) | data.json:perplexity_mau_paid_split_disagreement |
| Meta AI | No in-chat ads yet; 1.2-1.5B (broad) / 640M (strict) MAU; no consumer paid tier confirmed live | data.json:meta_ai_mau_two_measurements |

**Ring 2 (middle) — Ad format(s) live today:**
| Sector | Format | Source |
|---|---|---|
| OpenAI | Labeled banner-style ads (Free/Go) + Sponsored Agents (brand's own AI agent opens a separate labeled chat) | data.json:chatgpt_free_go_ad_tiers, chatgpt_sponsored_agents_detail |
| Google | Search/Shopping/PMax ads above, below, or (narrow markets) inside AI Overviews; AI Mode text ads now via AI Max, PMax, broad+Smart Bidding, DSA, Shopping, OR (new, narrow) exact/phrase match | data.json:google_aio_ad_buying_mechanics, google_ai_mode_exact_phrase_test |
| Microsoft | "Sponsored" recommendation inside Copilot answers, sourced from existing Search/Shopping/AI Max/PMax campaigns | data.json:microsoft_copilot_ads_status |
| Perplexity | **Not disclosed / not applicable — discontinued.** Historical-only: sponsored follow-up questions in Related Questions module | data.json:perplexity_historical_ad_mechanics |
| Meta AI | Shopping-recommendation carousel (test, US, web only); no "Sponsored" label mechanic confirmed | data.json:meta_ai_no_in_chat_ads_yet |

**Ring 3 (outer) — Organic citation levers / ads-vs-citations interaction:**
| Sector | Finding | Source |
|---|---|---|
| OpenAI | 4.5 citations/answer average, leans primary sources + vendor docs; income-based ad-targeting disparity is a citation-adjacent trust risk | data.json:citation_diversity_across_llms_orbitmedia |
| Google | Ad presence and citation presence empirically decoupled: only 11% domain overlap, 1.95% exact-URL overlap on keywords carrying an ad | data.json:google_ai_mode_ad_share_and_citation_gap_seranking |
| Microsoft | **Not disclosed** — no citation-lever study specific to Copilot found this pass | gap |
| Perplexity | Historically heaviest on Reddit/YouTube/G2/Yelp/TripAdvisor-style citation mix (context only, pre-existing ledger territory) | cross-reference, not re-entered |
| Meta AI | **Not disclosed** — no citation study specific to Meta AI found this pass | gap |
| All five (cross-cutting) | Only 1.7% cross-model agreement on which domain gets cited for the same query; schema-markup's causal effect on citation is actively disputed | data.json:citation_diversity_across_llms_orbitmedia, schema_markup_citation_disagreement |

Use "not disclosed" cells as-is rather than estimating — the blank space is itself the finding
(Microsoft and Meta have published far less about their own mechanics than Google or the
independent researchers have published about ChatGPT).

## What a small business/consultant can actually do this quarter — reality-checked

The assignment brief's suggested lever list ("structured data, entity pages, review sites,
Microsoft Advertising import, Google AI Max opt-in, Perplexity/OpenAI advertiser waitlists")
is about 80% right and one item is dead:

- **Correct and live:** Microsoft Advertising's Google Ads import (free tool, data.json:microsoft_ads_google_import_free_lever),
  Google AI Max opt-in (auto-upgrade deadline already passed its start date — 2026-09-01 — so
  "opt in" is now really "control your forced migration," data.json:google_ai_max_auto_upgrade_deadline),
  OpenAI's ads platform (open self-serve, $25/day floor, no waitlist, data.json:chatgpt_ads_manager_cost_floor).
- **Dead, remove from the post's lever list:** a "Perplexity advertiser waitlist" does not
  exist — the program was fully discontinued in February 2026 with nothing to replace it
  (data.json:perplexity_advertiser_access_does_not_exist). Recommending it would be stale advice.
- **Real but evidence-thin, flag honestly if used:** structured data/schema markup as a citation
  lever is actively disputed (see disagreement #3 above) — don't present it as a settled win.
  Entity pages / Wikidata / Wikipedia presence is asserted constantly by SEO-vendor content but
  no controlled study was found proving the causal claim this pass — present as "widely
  recommended, not independently measured" rather than proven.
- **Trade-off to name, not just a lever:** AI Max/broad-match adoption for AI Mode eligibility
  costs advertisers keyword-level control and opt-out ability — Google's own page confirms both
  losses. A consultant recommending this quarter's opt-in should pair it with that cost.

## Time-box
Session used roughly 60 WebSearch/WebFetch calls (well under the ~150 budget) in one continuous
pass. Stopped once all six assignment categories (a-f) had at least medium-confidence coverage
and the highest-value primary sources (Google Ads Help, Zappi, Microsoft Advertising blog, the
arXiv audit, Orbit Media, Quoleady, Ginny Marvin's quote) had been directly fetched rather than
left as search-synthesis only.
