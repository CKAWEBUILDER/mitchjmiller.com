# Counter-GEO-Bench: research notes (2026-09-16)

Ledger: `data.json` (136 rows). `viz/ai-search-poisoning-guardrails/build.py` generates it and the artifact from one table, and asserts every outcome-count row reproduces Table 3 ASR = (full + 0.5 × partial) / 247.

## Method (for anyone extending)
- The arXiv HTML (v1) was fetched once with curl and its tables parsed locally, so values were read from the page source rather than from a WebFetch summary. The summarizer paraphrased tables and was not used for any number.
- Retrieved 2026-09-16 10:16 UTC.

## Disagreements / cautions
1. **Inconsistent inside the paper:** the abstract says the three off-the-shelf defenses cut ASR "at most 5.7% relative". Table 3 prints NeMo at −9.1%‡ (Gemma + Qwen average). The Section 8 claim ("no more than 3.2 pp") holds for Granite + Llama Guard. The copy uses the 3.2 pp scope and avoids the 5.7% figure.
2. Granite average reduction is 1.7 pp in Section 5.2 text and 55.7→54.0 in Table 3, but the Table 15 paired bootstrap shows +1.6 pp. It's a rounding gap. The copy uses 1.7.
3. NeMo on Llama-4 (0.4% ASR) is a refusal artifact: 98.4% clean block rate. It never appears as protection.
4. Review Flood (62.8%) has N=13 and Stealth Injection has N=15. Small classes; not ranked in the copy.
5. The paper's scope is its own harness (Ethics statement): 247 English queries, open-weight victims, single poisoned document, no adaptive attacks. Not evidence about Google AI Overviews, ChatGPT or Perplexity.
6. Anthropic models were used in the method (Sonnet 4.6 as rewriter, Opus 4.6 as judge; human κ 0.739/0.869). A disclosure line is in the post.
7. Sibling paper arXiv 2609.02964 (GEO Defender, 50.32%→6.20%) uses a different harness and attack definition, so it's prose only and never shares an axis.

## Excluded
- OECD.AI incident 2026-03-14-e431: the entry exists, but its yuan pricing and market size are press-aggregated. needs-verification, not used.
