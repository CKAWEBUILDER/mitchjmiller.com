title: I Audited 54 Companies Selling AI Visibility
slug: ai-visibility-vendors-audited
url: https://mj2.pro/blog/ai-visibility-vendors-audited/
suggested_url: https://mj2.pro/blog/ai-visibility-vendors-audited/
date: September 26, 2026
kw: AI visibility
kw_secondary: generative engine optimization, answer engine optimization, llms.txt, AI crawler robots.txt
kw_note: editorial pick, Semrush unverified (no API units on any account per operating rules)
insight: The 2015 technical SEO checklist is not what separates AI-visibility vendors — 68% of them pass all ten basic checks on their own homepage. The split is inside the new work: 46% shipped llms.txt, a proposal no major engine has confirmed it reads, while 18% ship no structured data at all, which demonstrably feeds retrieval. Adoption tracked visibility of the artifact, not evidence for it.
meta_description: I ran one technical audit against 54 companies selling AEO, GEO and AI visibility. 68% pass the 2015 checklist. 18% have no structured data. 46% shipped llms.txt.
teaser: Nearly half shipped the fashionable file. Nearly one in five skipped the one that actually feeds retrieval. Same 54 companies.
cta: Share this with someone about to sign a GEO retainer.
infographic: content-studio/viz/ai-visibility-vendors-audited/ (hero, clickable living artifact; exports/ai-visibility-vendors-audited-poster-1080x1350.png as the noscript fallback)
image_alt: Audit results for 54 companies selling AI visibility: 68% pass all ten 2015-era technical checks, 18% ship no structured data, 86% never name an AI crawler in robots.txt, 46% ship an llms.txt file, and 19% refused an identified research crawler with a 403.
hero_type: viz
hero: /viz/ai-visibility-vendors-audited/
hero_alt: Five-bar audit result for 54 AEO/GEO vendors — 68% pass the 2015 checklist, 18% no structured data, 86% no named AI crawler, 46% have llms.txt, 19% refused the crawler.
og_image: /viz/ai-visibility-vendors-audited/ai-visibility-vendors-audited-1200x630.png
audio: pending; narration is rendered at publish per docs/site-standards.md
parent: ai-citation-rate-by-platform
status: draft
approved: no

---

# I Audited 54 Companies Selling AI Visibility

*By Mitchell Miller · ~7 min read · AI search / measurement · September 26, 2026*

I went looking for evidence that most sites still fail the same technical audit they failed in 2015. I picked the population most likely to prove it by contrast — companies that sell AEO, GEO and "AI visibility" — expecting them to be clean and everyone else to be the mess.

They were clean. **68% passed all ten 2015-era checks on their own homepage.** That killed the thesis I started with, so here is the one the data actually supports.

The old checklist is broadly solved among people who sell this work. The interesting failure is inside the *new* layer, and it does not look like incompetence. It looks like a bet on the wrong artifact.

## What I measured

54 vendors. One homepage request, one `robots.txt`, one `sitemap.xml`, and a check for `llms.txt` — each. The crawler identified itself honestly as `mj2-audit/1.0 (+https://mj2.pro)`.

The sample is a rule, not a shortlist. I took the first page of four searches on 25 September 2026 (GEO agencies, AEO agencies, AI visibility tools, LLM SEO agencies), collected every domain that appeared as a result plus every vendor named in those results — 62 candidates — then kept only the ones whose *own homepage* matches at least one category term. 54 qualified. Full frame, queries, exclusions and scripts are in the method section at the bottom.

Vendors are reported in aggregate and unnamed. The point is the pattern, not a pillory.

## Finding 1 — the 2015 checklist is not the differentiator any more

| Check | Fail rate (n=44 fetched) |
|---|---|
| Title tag | 0% |
| Viewport meta | 0% |
| HTTPS | 0% |
| `robots.txt` present | 0% |
| Meta description | 2% |
| `html lang` | 2% |
| Sitemap reachable | 2% |
| Canonical tag | 5% |
| Exactly one H1 | 7% |
| **Schema.org JSON-LD** | **18%** |

30 of 44 passed everything. Twelve failed exactly one check. Two failed two.

If you have been telling clients that their AI visibility problem is a missing canonical, this population says otherwise. Whatever separates winners here, it is not the 2015 exam.

## Finding 2 — 18% ship no structured data at all

Eight of 44 homepages carry no JSON-LD whatsoever. No `Organization`, no `WebSite`, nothing.

Structured data is the single most common technical recommendation in AEO and GEO sales copy. It is the one thing in the category with a clear mechanical path into retrieval: it tells a parser what an entity *is* without asking it to infer from prose. Among the 36 that do ship it, the types are exactly what you would expect — `Organization` (31), `WebSite` (26), `WebPage` (22), `Person` (15).

Nearly one in five companies selling that advice have not taken it on their own front page.

## Finding 3 — 86% have never named an AI crawler

Of the 51 vendors serving a readable `robots.txt`, **seven name any AI crawler at all.** The other 44 mention none of GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent or Bytespider.

**This one needs an honest caveat, so here it is up front: silence is not blocking.** An unnamed crawler is allowed by default, and allow-everything is the *correct* configuration for a company that wants to be cited. None of these vendors are shooting themselves in the foot. Exactly one blocks CCBot; nobody blocks the four that matter.

So the finding is not "they misconfigured it." The finding is thinner and more interesting: the people who sell bot policy as a deliberate business decision have mostly never made one themselves. They inherited a default that happens to point the right way. Their clients inherit the same silence — and for a client with paywalled content, licensing exposure, or a competitor scraping them, the default does *not* point the right way.

## Finding 4 — 46% shipped `llms.txt`

25 of 54 serve a real `llms.txt` or `llms-full.txt`.

`llms.txt` is a proposal. No major AI system has confirmed it as a retrieval or ranking input. It might become one. Today its measurable effect is that it exists.

Put the two numbers side by side:

- **46%** adopted a file with no confirmed effect.
- **82%** ship structured data, which has a documented path into retrieval — meaning **18% skipped it.**

Adoption tracked how *visible and new* the artifact was, not how much evidence sat behind it. `llms.txt` is cheap, legible, and demonstrates currency to a prospect who just read about it. Schema is tedious, invisible, and demonstrates nothing to anyone who is not looking at your source.

That is the actual shape of the 2026 layer in this sample: fashionable work outpacing load-bearing work, in the one population that should know the difference.

## Finding 5 — 19% refused an identified crawler

Ten of 54 returned 401, 403 or 429 to a self-identifying research crawler. A plain refusal at the edge, from companies whose product is being fetched and cited.

This is not hypocrisy — edge rules from Cloudflare and similar commonly challenge unknown agents while explicitly allowing named AI crawlers, and several of these had permissive `robots.txt` files behind the block. But it is worth noticing: **your CDN is now an SEO setting.** Whatever `robots.txt` says, the rule in front of it votes first, and in most companies that rule was written by someone who has never read `robots.txt`.

I kept those ten in the sample rather than dropping them. Dropping unfetchable sites would have biased the results toward permissive hosts and quietly inflated every pass rate on this page.

## What this means

**If you are buying:** ask the vendor to run their own audit on their own domain and show you. It takes one afternoon. Ask specifically whether their recommendations are load-bearing (a documented path into retrieval) or fashionable (present because it is new). Both can be worth paying for; only one should be sold as mechanism.

**If you are doing the work:** the boring layer still wins. Structured data over `llms.txt` if you only have budget for one. And go read your edge configuration — it is the part of your technical SEO that no SEO tool audits.

**If you run the team:** make the bot policy an explicit decision with a date and an owner, even if the decision is "allow everything." A default is not a policy; it is just what happened.

**For the industry:** every number here came from one HTTP request per site and a short script. The bar for first-party evidence in AI search is far lower than the volume of opinion suggests. More of us should be measuring instead of asserting — I started this expecting a different answer and the data corrected me, which is the whole point of collecting it.

## Limitations

Stated plainly, because they matter:

- **Homepage only.** Not a full-site crawl. A missing canonical or JSON-LD on a homepage does not mean the site lacks it everywhere.
- **n=54, one snapshot, one day.** This is a sample of who ranks for four queries, not a census of the industry.
- **Silence in `robots.txt` is not blocking**, and for this population allow-by-default is the outcome they want. The 86% is about deliberateness.
- **The 19% refusal rate concerns my crawler, not GPTBot.** Named AI crawlers may well be allowed through the same edge rules.
- **`llms.txt` presence is adoption, not effectiveness.** If it turns out engines do read it, 46% looks like foresight rather than fashion.
- **I am not neutral.** I work in this field and compete with some of these companies for the same roles. That is why every vendor is unnamed, the frame is a documented rule rather than my judgement, and the scripts are published so you can re-run it and contradict me.

## Method — reproduce it

Frame construction, the four queries, the qualification rule, the exclusion list, every check and every limitation are recorded in the research directory alongside the raw JSON. The audit is three short stdlib-only Python scripts: `qualify.py` builds the frame, `audit.py` runs the ten checks plus bot policy, `llms.py` checks for `llms.txt`. Re-run them and you will get a different snapshot — the population moves.

## Sources for the timeline references

- Schema.org launch, 2 June 2011 — [Google Search Central blog](https://developers.google.com/search/blog/2011/06/introducing-schemaorg-search-engines)
- Knowledge Graph, 16 May 2012 — [Google blog](https://blog.google/products-and-platforms/products/search/introducing-knowledge-graph-things-not/)
- Hummingbird, announced 26 September 2013 — [Search Engine Land](https://searchengineland.com/google-birthday-event-172791)
- BERT, 25 October 2019 — [Search Engine Land](https://searchengineland.com/welcome-bert-google-artificial-intelligence-for-understanding-search-queries-323976)
- ChatGPT public release, 30 November 2022 — [Wikipedia](https://en.wikipedia.org/wiki/ChatGPT)
- GPTBot documentation published, 7 August 2023 — [Search Engine Land](https://searchengineland.com/gptbot-openais-new-web-crawler-430360)
- AI Overviews US rollout, 14 May 2024 — [Google blog](https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/)

---

*Share this with someone about to sign a GEO retainer.*
