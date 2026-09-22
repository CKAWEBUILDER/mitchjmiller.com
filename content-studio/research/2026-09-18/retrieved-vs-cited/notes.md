# Retrieved vs cited (arXiv 2609.19244): research notes (2026-09-18)

Ledger: `data.json` (134 rows). `viz/ai-citation-rate-by-platform/build.py` generates it and the artifact from one table. It asserts cited ÷ retrieved reproduces every printed citation rate (Table 8, incl. DeepSeek app) and that Table 1 sums equal the Section 2 text (613 users, 171,264 conversations). Raw table parse: `arxiv-2609.19244-tables.json`.

## Method
- arXiv HTML v1 fetched with curl at 2026-09-18 10:14 UTC. Tables parsed locally, including the span-based LaTeXML tabulars that a naive `<tr>` parse misses (Tables 3–9, 14). No WebFetch summary was used for any number.
- A scout subagent (Sonnet) scanned the routine's sources. Only this paper's numbers were re-verified in the main session.

## Disagreements / cautions
1. **Internal rounding:** Section 5.1 says citation rates range 1.7–34.0% (app) and 10.6–40.0% (API). Tables 6/8 print 1.8–34.1% and 10.6–39.7%. The copy uses the tables.
2. **Internal contradiction:** Section 4.3 says reddit.com and youtube.com are "completely absent in Claude search". Appendix H.6 says wikipedia/reddit/youtube dominate search results "across all four platforms". The "absent" claim is not used. The copy uses only H.6's platform profile (Claude → coding sites; the others → consumer sites).
3. **API prompts are ChatGPT prompts:** the 1,000 in-vitro prompts were sampled from ChatGPT in-vivo traces (500 searched, 500 not; Appendix C.1). App-vs-API gaps for Grok and Claude therefore mix model, prompt set and setting.
4. DeepSeek API rows print "–" for citations, so DeepSeek is outside the artifact grid. Its app figures are in the copy.
5. Claude app sample is small (102 users, 1,696 search turns) and has wide CIs (citation rate 17.2–22.9; parametric factuality 2.51–4.20).
6. Factuality is judge-scored (GPT-4o-mini with web search, 5-point Likert, Appendix G.1). The replay-quality judge (a different task) shows low human κ in Table 15. Not used for copy.
7. "14%–53%" of claims on uncited-but-retrieved pages is a text range over a figure (Figure 10). Per-platform values are not in a table, so the range isn't split.
8. Vendor neutrality: Claude is a measured platform and the studio's vendor. There's a disclosure line in the post.

## Excluded
- A circulating "ChatGPT cites ~15% of pages it retrieves" (search-snippet only, untraced).
