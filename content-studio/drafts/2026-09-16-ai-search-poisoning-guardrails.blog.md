---
kw: AI search poisoning
kw_secondary: generative engine optimization, LLM guardrails, RAG poisoning defense, Counter-GEO-Bench
kw_note: editorial picks, not Semrush-verified (MCP has no API units; scheduled runs do not drive the logged-in browser). Upgrade to real volume/difficulty before publish.
insight: Honest GEO and weaponized GEO use the same moves (authority, citations, fresh dates, structure), and a new EMNLP 2026 benchmark shows three off-the-shelf defenses leave attack success above 50%; the two safety filters cut it 3.2 points at best, one pushed full-success lies on Llama-4 from 89 to 120, and the one "0.4%" result came from refusing 98.4% of clean questions. The detector that worked flagged honest GEO rewrites about as often as untouched pages (2.16% vs 2.30%) and distorting ones at 10.27%. So in this test, honest optimization didn't raise the false-alarm rate. That matters to anyone who does GEO for a living.
cta: Share this with someone who runs a RAG pipeline or an answer engine and assumes the safety filter covers planted misinformation.
title: Three Off-the-Shelf AI Guardrails Leave GEO Misinformation Attacks Above 50% Success
meta_description: Counter-GEO-Bench tested four defenses against AI search poisoning on three LLMs. Three guardrails barely moved attack success; one made it worse.
slug: ai-search-poisoning-guardrails
suggested_url: https://mitchjmiller.com/blog/ai-search-poisoning-guardrails/
infographic: content-studio/viz/ai-search-poisoning-guardrails/index.html
poster: content-studio/viz/ai-search-poisoning-guardrails/exports/ai-search-poisoning-guardrails-poster-1200x1500.png
date: September 16, 2026
teaser: Researchers planted false claims in one of five retrieved web pages using ordinary GEO tactics, then tested four defenses on three models. Pick a defense and a model in the interactive version and see what each one actually changed.
approved: no
---

# Three Off-the-Shelf AI Guardrails Leave GEO Misinformation Attacks Above 50% Success

*By Mitchell Miller · ~4 min read · AI search security*

## TL;DR

- One rewritten web page, among five retrieved, moved the answer toward a planted false claim **55.7%** of the time on average across three open-weight models. **79.1%** of attacks shifted the answer at least partly. ([Counter-GEO-Bench, arXiv 2609.02316](https://arxiv.org/abs/2609.02316), Tables 3 and 19, Sept 2, 2026, accepted to EMNLP 2026)
- The two safety-filter guardrails cut attack success by **3.2 points at most**. Granite Guardian's 1.7-point cut was **not statistically significant** (p = .096). NeMo Self-Check averaged **51.1%** on the two models where it didn't refuse nearly everything.
- A purpose-built **184M-parameter** detector cut it to **29.2%**, a **47.6%** relative drop, while average accuracy on unattacked pages rose 0.2 points.

<figure class="viz-embed">
<iframe
  src="/viz/ai-search-poisoning-guardrails/"
  title="Living infographic: attack success, accuracy and answer quality for four defenses against GEO misinformation across three LLMs"
  loading="lazy"
  style="width:100%;aspect-ratio:4/5;min-height:640px;border:0;border-radius:10px;background:#190B24;">
</iframe>
<figcaption>Pick a defense and a model and the comparison re-runs. Every number links to its table. Interactive not loading? <a href="/viz/ai-search-poisoning-guardrails/">Open the living infographic</a>. <noscript><img src="/viz/ai-search-poisoning-guardrails/poster-1200x1500.png" alt="Poster: Granite Guardian on Llama-4-Scout raises attack success from 54.7% to 56.9%"></noscript></figcaption>
</figure>

## The planted page

**55.7%.** That's the average attack success rate when one of five retrieved sources was rewritten to push a false claim. The other four were left untouched, and every rewrite had to pass a naturalness check.

The rewrites used familiar **generative engine optimization** moves: fake authority, fake citations, freshness markers, AI-extractable formatting, review floods. The paper sorts them into eight attack classes. Review Flood scored highest undefended, at **62.8%** (only 13 queries use it, so treat it as a signal, not a ranking).

The same playbook, used honestly, can raise visibility in generative engine answers **by up to 40%** ([Aggarwal et al., KDD 2024](https://arxiv.org/abs/2311.09735)). This benchmark is built on that paper's GEO-Bench queries.

## Where the filter made it worse

**54.7% → 56.9%.** That's Granite Guardian on Llama-4-Scout. Answers that fully repeated the lie went from **89 to 120** out of 247.

The authors count **74 queries worsened, 57 improved**. Their reading: the filter removed clean chunks that contradicted the false claim, so nothing was left to argue with it. They call it defense-as-amplifier.

These **LLM guardrails** look for policy violations. The paper's point: a fluent page with a false fact passes as ordinary information. Granite Guardian blocked **0.61%** of distorting chunks and **0.43%** of clean ones.

## The 0.4% that wasn't protection

NeMo Self-Check posted **0.4%** attack success on Llama-4. It got there by refusing **98.4%** of clean questions too.

Clean-question accuracy on that model fell from **82.4% to 1.8%**. Answer quality fell from **4.52 to 1.20** on a 5-point scale. The paper drops the cell from its average. Without the clean-question test, 0.4% would read as protection.

On Qwen, the same check blocked **12 clean queries and 8 attacked ones**. Its blocking had no link to whether an attack was present.

## What caught the lie

**184M parameters.** That's 2.3% of the size of the 8B guardrails. C-GEO Guard was trained on paired honest and distorting rewrites of the same page. It cut average attack success from **55.7% to 29.2%**.

Here's the part for anyone doing GEO for a living. It blocked **10.27%** of distorting chunks, **2.16%** of honest GEO rewrites and **2.30%** of untouched pages. In this test, honest optimization didn't raise the false-alarm rate.

It still has gaps. Structured Hijack (formatting built for AI extraction) kept **41.2%** success under C-GEO Guard, the smallest cut of any attack class. Against an independently written attack template, the relative cut fell from **47.4% to 32.0%**.

## How far this travels

**247 queries, English only, open-weight models, one poisoned page per query.** The authors say the results are tied to their own retrieval harness and don't carry over to arbitrary search systems.

So this is not a measurement of Google AI Overviews, ChatGPT or Perplexity. It's a controlled test of whether common **RAG poisoning defense** layers catch fluent misinformation. Three didn't.

A second team posted a defense paper the same day, reporting a drop in attack success from **50.32% to 6.20%** ([Li et al., arXiv 2609.02964](https://arxiv.org/abs/2609.02964)). It uses a different harness and attack definition, so the two sets of numbers shouldn't share a chart.

## FAQ

**What is AI search poisoning?**
Publishing a normal-looking page built to be retrieved and cited by an AI answer engine, so the generated answer repeats a false claim. Counter-GEO-Bench measures how often that works and which defenses reduce it.

**Do standard LLM guardrails stop GEO misinformation?**
In this benchmark, not meaningfully. Granite Guardian and Llama Guard 3 reduced average attack success by at most 3.2 percentage points, and Granite Guardian's reduction was not statistically significant. NeMo Self-Check left attack success at 51.1% on two models and refused 98.4% of clean questions on the third.

**Does detection penalize legitimate GEO?**
Not in this test. C-GEO Guard blocked 2.16% of honest GEO rewrites, about the same as the 2.30% of untouched pages, and 10.27% of distorting ones. The result comes from one harness and one detector threshold.

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is AI search poisoning?","acceptedAnswer":{"@type":"Answer","text":"Publishing a normal-looking page built to be retrieved and cited by an AI answer engine, so the generated answer repeats a false claim. Counter-GEO-Bench measures how often that works and which defenses reduce it."}},
{"@type":"Question","name":"Do standard LLM guardrails stop GEO misinformation?","acceptedAnswer":{"@type":"Answer","text":"In this benchmark, not meaningfully. Granite Guardian and Llama Guard 3 reduced average attack success by at most 3.2 percentage points, and Granite Guardian's reduction was not statistically significant. NeMo Self-Check left attack success at 51.1% on two models and refused 98.4% of clean questions on the third."}},
{"@type":"Question","name":"Does detection penalize legitimate GEO?","acceptedAnswer":{"@type":"Answer","text":"Not in this test. C-GEO Guard blocked 2.16% of honest GEO rewrites, about the same as the 2.30% of untouched pages, and 10.27% of distorting ones. The result comes from one harness and one detector threshold."}}
]}
</script>

<!--CTA-->
**Share this with someone who runs a RAG pipeline or an answer engine and assumes the safety filter covers planted misinformation.**

*Disclosure: the benchmark used Claude Sonnet 4.6 to write the attack pages and Claude Opus 4.6 as the judge. This studio also runs on Anthropic models. Neither fact changes a number here. The judge was checked against two human raters, κ = 0.739 and 0.869 (Section 5.1).*

## Sources

- Zheng, Zhao, Yang, "Counter-GEO-Bench: Evaluating Defenses Against Information-Distorting Generative Engine Optimization," arXiv 2609.02316v1, Sept 2, 2026, accepted to EMNLP 2026 Main. https://arxiv.org/abs/2609.02316 · tables read from https://arxiv.org/html/2609.02316v1 (Tables 1–5, 14–22; Sections 5.1, 5.2, 6.2; Ethics statement)
- Counter-GEO-Bench dataset card (gated, CC BY-NC 4.0). https://huggingface.co/datasets/counter-geo/counter-geo-bench
- Aggarwal et al., "GEO: Generative Engine Optimization," KDD 2024, arXiv 2311.09735v3. https://arxiv.org/abs/2311.09735
- Li et al., "When Optimization Becomes Manipulation: Defending Generative Search against Malicious Generative Engine Optimization," arXiv 2609.02964, Sept 2, 2026. https://arxiv.org/abs/2609.02964
- Full data ledger (136 rows, per-cell table references): `content-studio/research/2026-09-16/geo-defenses/data.json`

---

## Notes for Mitch (not part of the post)

**Fact ledger — every number in the copy.** All `verified-on-page` from the arXiv HTML, retrieved 2026-09-16 10:16 UTC and parsed locally (not a summary), unless marked.

| Figure in copy | Where |
|---|---|
| 55.7% avg ASR undefended | Table 3 (CI [53.1, 58.2], Table 14) |
| 79.1% at least partial shift | Table 19 (pooled 741) |
| 3.2 pp max cut by the two safety filters | Section 8; Table 15 (Llama Guard 3, p<.001). Scoped to Granite + Llama Guard: the abstract says the three off-the-shelf defenses cut ASR "at most 5.7% relative", but Table 3 prints NeMo at −9.1%‡ (2-model average). The paper is internally inconsistent here, so the copy avoids the 5.7% figure. |
| NeMo 51.1% on two models | Table 3 ‡ (Gemma + Qwen only) |
| rewrite passed a naturalness check | Appendix B quality gate (S_nat, LLM judge); Table 1 |
| Granite 1.7 pp, p = .096 | Section 5.2 text; Table 15 shows the paired Δ as +1.6 pp, a rounding gap inside the paper. Copy uses the text figure. |
| 184M params, 2.3% of 8B | Section 5.2; Table 12 |
| 29.2% avg, −47.6% relative | Table 3 |
| +0.2 pp avg clean/IP accuracy | Table 5 "Avg. Δ" (averages clean and IP cells) |
| 8 attack classes; Review Flood 62.8% (N=13) | Appendix A.2; Table 21 |
| Up to 40% visibility | arXiv 2311.09735 abstract |
| Granite on Llama-4: 54.7→56.9; full 89→120 | Tables 3, 18 |
| 74 worsened / 57 improved; defense-as-amplifier explanation | Section 6.2 |
| Granite chunk blocks 0.61% ID / 0.43% clean | Table 4 |
| NeMo Llama-4: 0.4% ASR; 98.4% clean refused; acc 82.4→1.8; quality 4.52→1.20 | Tables 3, 20, 5, 22 |
| NeMo Qwen: 12 clean vs 8 ID blocked | Section 6.2 |
| C-GEO chunk blocks 10.27 / 2.16 / 2.30 | Table 4 |
| Structured Hijack 41.2% under C-GEO | Table 21 (Appendix K text: smallest reduction, −22%) |
| Independent template: −47.4% → −32.0% | Table 7 (Qwen; GPT-written template, no quality gate) |
| 247 queries, English, open-weight, single-document | Limitations; Section 3.2 |
| "tied to our controlled … harness" | Ethics statement (paraphrased, not quoted) |
| Li et al. 50.32% → 6.20% | arXiv 2609.02964 abstract |
| Judge κ 0.739 / 0.869 | Section 5.1; Table 10 |

**Deliberately excluded:** OECD.AI incident 2026-03-14-e431 (paid GEO manipulation services in China). The log entry exists, but its pricing and market-size figures come from aggregated press and were not independently verified. Also excluded: the scout's Semrush manufacturing and chatbot-purchase figures, which belong to other topics.

**Per-section keyword spec**

| Section | Keyword (one) | LSI envelope | Icon (alt = keyword) |
|---|---|---|---|
| TL;DR + H1 | AI search poisoning | attack success rate, planted claim, benchmark | shield with crack |
| The planted page | generative engine optimization | authority, citations, freshness, visibility | page with pin |
| Where the filter made it worse | LLM guardrails | safety taxonomy, chunk filter, amplifier | filter funnel |
| The 0.4% that wasn't protection | (trust block, no keyword by design) | refusal, accuracy, answer quality | — |
| What caught the lie | (execution block, reuses primary keyword in FAQ only) | contrastive detector, false alarms | magnifier |
| How far this travels | RAG poisoning defense | retrieval harness, open-weight, limitations | compass |
| FAQ | Counter-GEO-Bench (JSON-LD entity) | EMNLP 2026, defenses | — |

**Lengths.** Body ≈ 760 words excluding front matter, embed, JSON-LD and notes. Title 83 characters (long; a short SERP title option: "AI Search Poisoning: Guardrails Barely Move Attack Success", 58). Meta description 140 characters.

**Decisions for Mitch**
1. **Visual direction.** The artifact uses the kit's current visual layer (Ember palette), which you rejected on Sept 15. It follows PROJECT.md: data and interaction engine now, visual rebuilt in whichever of `viz/directions/01–05` you pick. The data block ports as-is.
2. **Title length.** The long H1 matches the artifact headline. Pick the short SERP title above or keep it.
3. **Anthropic disclosure line.** It's included per the Sept 14 lead decision. Confirm the wording.
4. **Before publish:** your approval; Semrush volumes for the four keywords; copy `viz/ai-search-poisoning-guardrails/index.html` to `public/viz/ai-search-poisoning-guardrails/index.html` and the portrait PNG to `poster-1200x1500.png` beside it (the embed and noscript paths assume both); convert to `contentHtml` per `skills/publish/SKILL.md`; run the critic pass (mandatory per the Sept 14 learnings).
