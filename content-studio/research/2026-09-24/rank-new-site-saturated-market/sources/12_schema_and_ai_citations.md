# Does schema markup increase AI citation? (verified 2026-09-24)
VERDICT: (c) CONTRADICTED BY PLATFORM STATEMENTS + (b) remaining support is vendor correlation only.

## GOOGLE SAYS NO, IN WRITING
1. https://developers.google.com/search/docs/appearance/ai-features
   "There's also no special schema.org structured data that you need to add."
2. https://developers.google.com/search/docs/fundamentals/ai-optimization-guide  (added 2026-05-15,
   section "Mythbusting generative AI search: what you don't need to do")
   "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add."
   ^ Google lists overfocusing on structured data AS A MYTH, by name.

## GOOGLE KILLED THE TWO SCHEMA TYPES VENDORS PUSH HARDEST
https://developers.google.com/search/blog/2023/08/howto-faq-changes (2023-08-08, John Mueller)
 "Going forward, FAQ (from FAQPage structured data) rich results will only be shown for well-known, authoritative government and health websites."
 "As of September 13, Google Search no longer shows How-to rich results on desktop, which means this result type is now deprecated."
 "Structured data that's not being used does not cause problems for Search, but also has no visible effects in Google Search."
https://developers.google.com/search/updates (entry 2026-05-08)
 "This feature will no longer appear in Google Search starting May 7, 2026."  <- FAQ removed entirely

## THE ONLY MATCHED CAUSAL TEST -- NULL RESULT
Ahrefs, "We Tracked 1,885 Pages Adding Schema. AI Citations Barely Moved." 2026-05-11
https://ahrefs.com/blog/schema-ai-citations/
 "Adding schema produced no major uplift in citations on any platform."
 "our data doesn't support that bet"
Result: AI Overviews -4.6%, AI Mode +2.4%, ChatGPT +2.2%
Design: 1,885 pages that flipped from no JSON-LD to JSON-LD (Aug 2025-Mar 2026), each matched to 3 control URLs on
different domains with similar pre-period citation levels; 30 days pre/post; matched difference-in-differences.
Controls for platform trend (raw AI Mode growth was +43%, nearly all platform, not schema).
CONFOUND DEBUNKED: across 6M URLs, AI-cited pages were ~3x more likely to have JSON-LD (53% of cited pages).
Ahrefs attributes this to confounding -- schema lives on better-maintained sites that do everything else right.
CLASS: VENDOR-ONLY provenance BUT cuts against Ahrefs' own commercial interest. Strongest design available.
CAVEAT (Ahrefs' own): treated pages were already heavily cited (100+ baseline); says nothing about undiscovered pages.

## SECOND NULL, FROM SOMEONE WHO SELLS SCHEMA
Kurt Fischman (Marshal Research), "Does Schema Markup Predict AI Citation?" 2026
https://marshal.ing/research/does-schema-markup-predict-ai-citation
Schema presence OR = 0.678, p = .296 (NULL). Google rank OR = 0.762/position, p < .001.
Schema prevalence AI-cited vs non-cited: 43.1% vs 44.8%.
n = 730 AI citations, 75 commercial queries, ChatGPT + Gemini, 1,006 unique pages.
CLASS: VENDOR-ONLY, self-published, not peer-reviewed. Author sells schema consulting and still reports a null.

## "MICROSOFT CONFIRMED IT" IS A LINKEDIN PARAPHRASE
https://www.seroundtable.com/schema-llms-copilot-bing-microsoft-39093.html (2025-03-20)
The claim originates with David Mihm's LinkedIn write-up of a Fabrice Canel conference answer.
The article's own evidentiary standard, verbatim: "So he did not deny saying it, so it must be true."
No Microsoft publication states this. No figure, no study.
VERIFIED ABSENCE: Bing Webmaster Tools AI Performance announcement (Feb 2026) has ZERO occurrences of
"schema" or "structured data". https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

## OTHER ANSWER ENGINES: NOTHING
VERIFIED ABSENCE: Perplexity crawler docs -- zero mentions of schema/structured data/JSON-LD.
https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Anthropic: no schema claim in any doc found. OpenAI publisher FAQ: HTTP 403, UNVERIFIED either way.

## THE ACADEMIC PAPERS VENDORS CITE ARE TESTING SOMETHING ELSE
CITECHOICE https://arxiv.org/abs/2609.15164 -- +0.50 citations/answer from "structured rendering".
 But "structured" = Markdown/HTML formatting, NOT schema.org. Verbatim arms:
 "polished prose (continuous paragraphs; no headings, lists, or tables) and polished structured text (headings, short paragraphs, lists or a table)"
 => This is evidence for HEADINGS AND LISTS, not JSON-LD. Citing it as schema evidence is miscitation.
GEO-SFE https://arxiv.org/abs/2603.29979 -- 17.3% improvement from STRUCTURE. Does not test schema.org. Same risk.
GEO-16 https://arxiv.org/abs/2509.10762 -- observational, bundles structured data into a 16-pillar composite.
 "The study is observational and focuses on English language B2B SaaS pages"
 UNVERIFIED: the widely-repeated "UC Berkeley" affiliation and "+39% lift" appear NOWHERE in the source.

## *** LIKELY FABRICATED STATISTIC IN WIDE CIRCULATION -- DO NOT CITE ***
"Princeton CS + Moz, 500,000 URLs, WWW 2026, FAQ schema = 3.2x citation rate."
Sole traceable source: https://sgaindex.com/news/ai-overview3-3517d27c -- cites no paper, no authors, no DOI, no link,
and ends with an ad for its own schema generator. No such paper found at WWW 2026, arXiv, ACM DL, or Princeton CS.
TREAT AS FABRICATED until someone produces the paper.

"BrightEdge: structured data + FAQ blocks = 44% increase in AI citations" -- figure is NOT on the live BrightEdge page
https://www.brightedge.com/blog/structured-data-ai-search-era which instead hedges: "structured data itself isn't a
direct ranking factor" and "Google advises no special markup is needed." UNVERIFIED / likely misattributed.

## WHAT IS STILL DEFENSIBLE
Rich-result eligibility, entity/knowledge-graph disambiguation, and pricing/availability data that is genuinely hard to
parse from prose. NOT defensible: billing schema work as an AI-citation lever.
