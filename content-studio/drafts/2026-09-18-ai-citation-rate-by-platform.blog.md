---
kw: AI citation rate
kw_secondary: ChatGPT citations, LLM web search, AI search visibility
kw_note: editorial picks, not Semrush-verified (routine says no API units; scheduled runs do not drive the logged-in browser). Upgrade to real volume/difficulty before publish.
insight: Citation tracking measures the last step of a funnel whose width changes by platform and by setting. In 171,264 donated real-user chats, Grok's app linked 1.8% of the pages its search returned, ChatGPT 13.3%, Claude 19.9% and DeepSeek 34.1%. Grok-4.3 on the same company's API linked 25.5%, and within ChatGPT the GPT-5.2 models linked 6.0–7.8% against 18.6% for GPT-4.1. The same paper finds 14% to 53% of claims rest on pages that were retrieved and never cited. So "not cited" doesn't mean "not used", and a citation-share dashboard alone can't tell a retrieval problem from a citation problem.
cta: Share this with someone who reports AI citation share as the whole AI-visibility number.
title: AI Citation Rate by Platform: Grok's App Linked 1.8% of the Pages It Read, Claude's API 39.7%
meta_description: A new study of 171,264 real chats measures how many retrieved pages ChatGPT, Claude, Grok and DeepSeek actually cite: from 1.8% to 39.7%.
slug: ai-citation-rate-by-platform
suggested_url: https://mitchjmiller.com/blog/ai-citation-rate-by-platform/
infographic: content-studio/viz/ai-citation-rate-by-platform/index.html
poster: content-studio/viz/ai-citation-rate-by-platform/exports/ai-citation-rate-by-platform-poster-1200x1500.png
date: September 18, 2026
teaser: Researchers logged what ChatGPT, Claude, Grok and DeepSeek retrieved and what they linked. Pick a platform and a setting in the interactive version and watch the gap between read and cited.
approved: no
---

# AI Citation Rate by Platform: Grok's App Linked 1.8% of the Pages It Read, Claude's API 39.7%

*By Mitchell Miller · ~4 min read · AI search visibility*

## TL;DR

- In **171,264** donated real-user chats, the share of retrieved pages that ended up as a link was **1.8%** on Grok, **13.3%** on ChatGPT, **19.9%** on Claude and **34.1%** on DeepSeek. ([arXiv 2609.19244](https://arxiv.org/abs/2609.19244), Table 8, Sept 16, 2026)
- Grok's app read **40.7** pages per answer and linked **0.7**. Grok-4.3 on the API linked **25.5%** of what it read.
- **14% to 53%** of claims rested on pages the model retrieved and never cited (ChatGPT, Claude and Grok, both settings).

<figure class="viz-embed">
<iframe
  src="/viz/ai-citation-rate-by-platform/"
  title="Living infographic: pages retrieved vs pages cited per answer for ChatGPT, Claude and Grok, in real-user chats and API replays"
  loading="lazy"
  style="width:100%;aspect-ratio:4/5;min-height:640px;border:0;border-radius:10px;background:#0A1A30;">
</iframe>
<figcaption>Pick a platform and a setting and the comparison re-runs. Every number links to its table. Interactive not loading? <a href="/viz/ai-citation-rate-by-platform/">Open the living infographic</a>. <noscript><img src="/viz/ai-citation-rate-by-platform/poster-1200x1500.png" alt="Poster: Grok's app read 40.7 pages per answer and cited 0.7"></noscript></figcaption>
</figure>

## Read is not cited

**1 in 57.** That's how many of Grok's 110,684 retrieved pages became a link in the answer. Its app ran **4.55** web queries per prompt, more than any other platform in the study.

The **AI citation rate** here is simple: pages cited from search results, divided by pages the search returned. The spread across four platforms is **1.8% to 34.1%**. A page that ranks in an AI engine's search step starts with very different odds depending on which engine it is.

## Same company, different setting

**1.8% → 25.5%.** That's Grok's app logs against Grok-4.3 on the API. The API run used 1,000 prompts sampled from ChatGPT users' chats, half of which had triggered a search.

The app logs cover older models (grok-3, grok-4, grok-420), which cited between **0.6% and 4.1%**. So the gap mixes model, prompts and setting, and the paper doesn't separate them. The practical point holds either way: a test run through an API doesn't tell you what app users see.

ChatGPT shows the same pattern inside one product. In its own logs, **GPT-4.1** cited **18.6%** of retrieved pages. The **GPT-5.2** models cited **7.8%** and, with thinking on, **6.0%**. **ChatGPT citations** got scarcer on newer models in this sample.

## Who decides to search at all

**140 of 1,000.** That's how many prompts GPT-5.3-chat chose to search through the API. Claude Sonnet 4.6 searched **825**, Grok-4.3 **766**, DeepSeek-v4-flash **584**.

**LLM web search** is a decision the model makes before any citation question comes up. A page can't be cited from a search that never ran.

What comes back differs too. ChatGPT's, Grok's and DeepSeek's top search-result domains skew to consumer sites like reddit.com, youtube.com and facebook.com. Claude's top domains were coding sites like github.com and stackoverflow.com. Some of that likely reflects who uses each app and what they ask.

## Used but not credited

**14% to 53%** of claims were supported by a page the model retrieved and didn't cite. That range covers ChatGPT, Claude and Grok, in real chats and API replays.

That's the part that matters for **AI search visibility**. A citation tracker counts links. It can't see the pages an answer drew on without linking, and this study says that's often a large share.

Claims with no web source behind them scored lowest on a 5-point factuality scale on every platform in the real-user logs. For example, ChatGPT scored **2.84** from memory against **3.47** for claims backed by their own citation.

## How far this travels

**613 users, mostly English, data donated through GDPR exports.** The authors say the sample may not represent all users, and that platform harnesses, not just models, shape what they saw. Factuality scores come from a judge model (GPT-4o-mini with web search).

The paper also rounds its own range differently in the text (1.7–34.0%) than in its tables (1.8–34.1%). This post uses the tables.

## FAQ

**What is an AI citation rate?**
The share of pages an AI assistant's web search returns that end up linked in its answer. In arXiv 2609.19244 it ranged from 1.8% (Grok app) to 34.1% (DeepSeek app) in real-user chats, and from 10.6% (GPT-5.3-chat) to 39.7% (Claude Sonnet 4.6) through the APIs.

**Does ChatGPT cite every page it reads?**
No. In 143,730 donated ChatGPT conversations, 13.3% of retrieved pages were cited, about 4 links per answer against 28.4 pages retrieved. The GPT-5.2 models cited 6.0–7.8%.

**Can a page shape an AI answer without being cited?**
Yes. The study found 14% to 53% of claims in ChatGPT, Claude and Grok answers were supported by pages that were retrieved but not cited.

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is an AI citation rate?","acceptedAnswer":{"@type":"Answer","text":"The share of pages an AI assistant's web search returns that end up linked in its answer. In arXiv 2609.19244 it ranged from 1.8% (Grok app) to 34.1% (DeepSeek app) in real-user chats, and from 10.6% (GPT-5.3-chat) to 39.7% (Claude Sonnet 4.6) through the APIs."}},
{"@type":"Question","name":"Does ChatGPT cite every page it reads?","acceptedAnswer":{"@type":"Answer","text":"No. In 143,730 donated ChatGPT conversations, 13.3% of retrieved pages were cited, about 4 links per answer against 28.4 pages retrieved. The GPT-5.2 models cited 6.0 to 7.8%."}},
{"@type":"Question","name":"Can a page shape an AI answer without being cited?","acceptedAnswer":{"@type":"Answer","text":"Yes. The study found 14% to 53% of claims in ChatGPT, Claude and Grok answers were supported by pages that were retrieved but not cited."}}
]}
</script>

<!--CTA-->
**Share this with someone who reports AI citation share as the whole AI-visibility number.**

*Disclosure: Claude is one of the four platforms measured, and this studio runs on Anthropic models. Numbers are reported as printed in the paper, with no reweighting.*

## Sources

- Amani, Lee, Dash, El Fraihi, Jang, Kirsten, Wu, Gummadi, Gupta, Ravichander, Zafar, Das, "Characterizing Web Search by Conversational LLM Agents: From Search Decisions and Strategies to Results and Responses," arXiv 2609.19244v1, Sept 16, 2026. https://arxiv.org/abs/2609.19244 · tables read from https://arxiv.org/html/2609.19244v1 (Tables 1–3, 5, 8–14; Sections 2, 4.3, 5.1, 5.2; Appendix G.1; Limitations)
- Full data ledger (134 rows, per-cell table references): `content-studio/research/2026-09-18/retrieved-vs-cited/data.json`

---

## Notes for Mitch (not part of the post)

**Fact ledger — every number in the copy.** All `verified-on-page` from the arXiv HTML, retrieved 2026-09-18 10:14 UTC, parsed locally from the page source (not a summary). `build.py` asserts each printed citation rate equals cited ÷ retrieved, and Table 1 totals equal the Section 2 text.

| Figure in copy | Where |
|---|---|
| 171,264 conversations, 613 users | Section 2; Table 1 sums |
| 1.8 / 13.3 / 19.9 / 34.1% app citation rates | Table 8 (CIs 1.4–2.2, 13.1–13.6, 17.2–22.9, 31.6–36.7 in Table 6) |
| Grok 40.7 read / 0.7 cited per answer | Table 8 |
| 1 in 57 = 1,943 / 110,684 | Table 8 (110,684 ÷ 1,943 = 57.0) |
| Grok 4.55 queries per prompt | Table 5 |
| Grok-4.3 API 25.5% | Table 8 |
| grok-3 / grok-4 / grok-420: 1.3 / 4.1 / 0.6% | Table 9 |
| GPT-4.1 18.6%; GPT-5.2 7.8%; GPT-5.2-thinking 6.0% | Table 9 (model slugs gpt-4-1, gpt-5-2, gpt-5-2-thinking) |
| 140 / 825 / 766 / 584 of 1,000 searched | Table 3 |
| consumer-site skew (ChatGPT/Grok/DeepSeek) vs coding-site skew (Claude) | Appendix H.6 text. Section 4.3 says reddit/youtube are "completely absent" from Claude search, while H.6 says they dominate all four platforms. That contradiction is why the "absent" claim is cut. The user-population caveat is my inference, not the paper's. |
| 14%–53% claims on retrieved-but-uncited pages | Section 5.2 text (Figure 10) — range only |
| ChatGPT factuality 2.84 memory vs 3.47 own citation; parametric lowest on all four platforms in-vivo | Table 10 |
| 143,730 ChatGPT conversations; 4.0 cited vs 28.4 retrieved | Tables 1, 8 |
| API range 10.6% – 39.7% | Table 8 (invitro all) |
| API prompts: 1,000 sampled from ChatGPT in-vivo traces, 500 searched / 500 not | Appendix C.1 |
| 1.7–34.0% text vs 1.8–34.1% tables | Section 5.1 vs Tables 6/8 |
| judge GPT-4o-mini with web search | Appendix G.1 |

**Deliberately excluded:** a circulating "ChatGPT cites about 15% of the pages it retrieves" figure (seen in search snippets from marketing sites, source not traced). It's close to this paper's 13.3%, but it isn't used. DeepSeek is outside the artifact grid because its API rows print "–" for citations. Its app numbers are in the copy and ledger.

**Per-section keyword spec**

| Section | Keyword (one) | LSI envelope | Icon (alt = keyword) |
|---|---|---|---|
| TL;DR + H1 | AI citation rate | retrieved, cited, platform | funnel |
| Read is not cited | AI citation rate (definition block) | search results, link, odds | eye vs link |
| Same company, different setting | ChatGPT citations | app vs API, model version | split arrow |
| Who decides to search at all | LLM web search | search decision, domains | magnifier |
| Used but not credited | AI search visibility | attribution, tracking, uncited | ghost link |
| How far this travels | (trust block, no keyword by design) | sample, judge, limits | compass |
| FAQ | arXiv 2609.19244 (JSON-LD entity) | — | — |

**Lengths.** Body ≈ 820 words including FAQ, excluding front matter, embed, JSON-LD and notes. Title 93 characters (long). Short SERP option: "AI Citation Rate: How Often ChatGPT, Claude and Grok Cite" (57). Meta description 137 characters.

**Decisions for Mitch**
1. **Visual direction.** The artifact is built with the kit's current visual layer (Aurora palette), the look you rejected on Sept 15, because no pick from `viz/directions/01–05` is recorded yet. The data block ports as-is.
2. **Title.** Keep the long H1 or use the 57-character SERP title.
3. **Vendor neutrality.** Claude is a measured platform and the studio's own vendor. Claude's API has the highest rate in the grid and Claude's app is mid-pack. The copy reports both without comment, and the disclosure line is included.
4. **Before publish:** your approval; Semrush volumes for the four keywords; copy `viz/ai-citation-rate-by-platform/index.html` to `public/viz/ai-citation-rate-by-platform/index.html` and the portrait PNG as `poster-1200x1500.png` beside it; convert to `contentHtml` per `skills/publish/SKILL.md`; the independent critic pass (mandatory).
