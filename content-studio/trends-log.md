# Trends Log — what the field is talking about (append-only, newest on top)

The studio reads this before ideating and appends after every LinkedIn/field scan.
Each entry: date · source · observed trend/gap · opportunity for Mitchell.

---

## 2026-09-18 · scheduled blog-research scan (arXiv cs.AI/CL/IR/MA, lab blogs, SEL/SER/Semrush/Ahrefs/SparkToro blogs, Import AI, Stratechery, Platformer, FTC)
- **Retrieved ≠ cited, now measured across four assistants.** arXiv 2609.19244 (Sept 16) logs donated real chats. Citation rates were Grok app 1.8%, ChatGPT 13.3%, Claude 19.9% and DeepSeek 34.1%. API replays ran 10.6%–39.7%, and 14–53% of claims rest on retrieved-but-uncited pages. → Mitch's measurement angle: citation share is the last step of a funnel, and "not cited" ≠ "not used." Drafted: `drafts/2026-09-18-ai-citation-rate-by-platform.*`.
- **Newer models cite less (ChatGPT logs).** GPT-4.1 cited 18.6% of retrieved pages; the GPT-5.2 models cited 7.8% and 6.0% (same paper, Table 9). → Watch for replication; a longitudinal "citation rate by model generation" piece if a second source appears.
- **PAA → AI Overviews.** SER (Sept 9) reports AlsoAsked data showing 97% of People Also Ask results are AI Overviews. It's one day outside the scan window, and the PAA trail has dead-ended before. → Backlog until the AlsoAsked primary page is fetched.
- **LLM brand recommendations as a ranking problem** (arXiv 2609.16304, Sept 14): brand retrieval and rank across 6 LLMs × 5 categories, with ad spend as a predictor. → Backlog: needs table-level numbers.
- **Governance:** LLM compliance with China's AIGC rules (arXiv 2609.19989) has a clean CN vs non-CN × jailbreak grid, but it's off-lane. FTC's 7-company chatbot order (Sept 11) has no numbers.

## 2026-09-16 · scheduled blog-research scan (arXiv, lab blogs, SEL/SER/Semrush/Ahrefs blogs, Import AI, HN)
- **GEO is now studied as an attack surface.** Two defense papers went up the same day (arXiv 2609.02316 Counter-GEO-Bench; 2609.02964 GEO Defender, Sept 2). Off-the-shelf safety guardrails barely move attack success, while purpose-built detectors roughly halve it or more. → Mitch's lane from the trust side: "honest GEO vs weaponized GEO" is a positioning line no SEO competitor owns. Drafted: `drafts/2026-09-16-ai-search-poisoning-guardrails.*`.
- **Mentions ≠ citations keeps replicating.** Semrush's manufacturing study (Sept 8) found 2 of the top 15 most-mentioned brands among the top 15 most-cited sources (scout-verified, not re-checked). → Backlog: a cross-vertical mentions-vs-citations artifact if a second dimension can be sourced.
- **Agent self-policing.** DeepMind's 100-agent swarm paper (arXiv 2609.04170, Import AI 472) reports role shares of 9% exploiters, 24% whistleblowers and 62% unaware solvers (scout-verified). It's a one-dimensional shape, so it suits a standalone stat post rather than the two-selector kit.
- **Google AI Contribution Pilot** (paying publishers when content feeds AI answers; Digiday Sept 14). No payout numbers are public yet, so it's a watch entry and fails the Data gate.
- **Frontier release clusters.** Several labs shipped models within about 48 hours in early September with non-overlapping benchmark suites. Apples-to-apples comparison is hard, so it's low AEO value.
- Semrush chatbot-purchase survey (Sept 7, n=2,338) has univariate splits only. Backlog.

## 2026-08-19 · seed (from this session's research)
- **AI-content watermarking panic** (Claude text watermark, SynthID) is hot and mostly
  misunderstood → opportunity: the calm, evidence-led "capability ≠ enforcement" take (already
  a study note; a LinkedIn version could travel).
- **Multi-agent flat-fee stacks** (Hermes + Codex + Claude Code) are a live r/hermesagent
  discussion, incl. the `HERMES.md` → surprise API-billing bug → opportunity: a practitioner
  post on the setup + the billing traps (post #1 candidate).
- **Agency retention in a high-churn field** (Intrepid spotlight) → opportunity: repackage the
  "un-commoditizable / broad-spectrum survives budget reallocation" thesis as a LinkedIn carousel.
- **AEO/GEO as entity-signal** (links/mentions training AI Overviews) keeps recurring → Mitchell's
  core lane; strong recurring pillar for inbound.

_Next scan: run `skills/li-trend-scan` against Mitchell's LinkedIn feed and append findings._
