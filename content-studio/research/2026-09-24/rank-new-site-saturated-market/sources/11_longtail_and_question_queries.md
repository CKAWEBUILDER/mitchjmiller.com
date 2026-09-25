# Long-tail share, question queries, and the head-vs-long-tail conversion claim (verified 2026-09-24)

## A. NEW / UNSEEN QUERIES -- Google's own statement
URL: https://blog.google/products/search/search-language-understanding-bert/
Publisher: Google (blog.google) | Pandu Nayak, Google Fellow & VP Search | 2019-10-25
VERBATIM: "We see billions of searches every day, and 15 percent of those queries are ones we haven't seen before"
CLASS: PRIMARY-VERIFIED as a Google STATEMENT. No sample, no window, no definition published. Unauditable assertion, not a study. Cite with the 2019 date.
NOT VERIFIED: the older "20-25%" variant (no Google-domain source); Mueller's Mar 2025 restatement (event notes only, no primary Google URL); Google's Feb 2022 tweet (HTTP 402).

## B. LONG-TAIL KEYWORD SHARE -- Ahrefs (FIGURE CHANGED)
URL: https://ahrefs.com/blog/long-tail-keywords/ | Updated 2026-05-27
VERBATIM: "Keywords with fewer than 10 searches per month account for almost 93% of our U.S. keyword database."
Method: Ahrefs' own index (110B discovered, filtered to 28.7B). Measures DATABASE COMPOSITION, not a census of Google queries. Keyword COUNT, not traffic.
CLASS: PRIMARY-VERIFIED
*** LANDMINE: the famous "94.74%" is DEAD. It is no longer on the long-tail page. It survives only on
    https://ahrefs.com/blog/seo-statistics/ which now CONTRADICTS Ahrefs' own updated page. DO NOT CITE 94.74%. ***

## C. THE VOLUME CORRECTION -- long tail is most of the keywords, almost none of the volume
SparkToro + Datos: https://sparktoro.com/blog/new-research-we-analyzed-332-million-queries-over-21-months-to-uncover-never-before-published-data-on-how-people-use-google/
Date: 2024-12-03 | Data Jan 2023-Sep 2024, 331,697,810 searches, 320,775 unique terms, US desktop panel ~130K devices
VERBATIM: "more than half (59%) had only a single search" ... "a paltry 2.2% of total search volume"
CLASS: PRIMARY-VERIFIED

Backlinko (306M keywords via DataForSEO, updated 2020-12-01): https://backlinko.com/google-keyword-study
VERBATIM: "all long tails combined only account for 3.3% of total search volume."
Also: 91.8% of terms are long-tail; average keyword = 1.9 words.
CLASS: VENDOR-ONLY, transparent method, 2020 data.

## D. QUESTION-FORM QUERIES
Backlinko, same study: VERBATIM "14.1% of searches in Google were conducted via a question keyword."
Breakdown: how 8.07%, what 3.4%, where 0.88%, why 0.82%, who 0.6%, which 0.33%
CLASS: VENDOR-ONLY. Share of KEYWORDS, not of search volume. 2020. Prefix-match method misses questions not starting with a question word.
NOT VERIFIED: Neil Patel 17% (HTTP 403 twice); Moz 8% (no live URL). SparkToro's 332M study contains NO question data (verified absence).

## E. *** HEAD VS LONG-TAIL CONVERSION: THE CLAIM FAILS ***
The only PEER-REVIEWED evidence points the OPPOSITE way from the vendor folklore.

Ghose & Yang, NYU Stern, "Comparing Performance Metrics in Organic Search with Sponsored Search Advertising," ADKDD '08
URL: https://pages.stern.nyu.edu/~aghose/organic_sponsored.pdf (fetched, text extracted)
VERBATIM: "an increase in length of the keyword by 1 word decreases conversion rate by 5.41 %"
VERBATIM: "longer keywords generally tend to have a detrimental affect on keyword performance such as conversion rates and profits"
Method: 776 unique keywords, one large US nationwide retailer, Google, 13 weeks; 2,065 paid + 12,382 organic observations; hierarchical Bayesian MCMC.
CLASS: PRIMARY-VERIFIED
CONFOUND TO DISCLOSE: single advertiser, 2008; the conversion lift concentrates in retailer (+29.74%) and brand (+42.93%) terms, which are short. Length is partly proxying for branded/navigational intent.

Companion (WSDM 2008): https://pages.stern.nyu.edu/~aghose/wsdm08.pdf
VERBATIM: "an increase in the length of the keyword by one word decreases the click-through rates by 6.6%"

WordStream: 2025/2026 Google Ads benchmarks report CTR/CPC/CVR/CPL BY INDUSTRY ONLY. NO keyword-length breakout exists.
https://www.wordstream.com/blog/2025-google-ads-benchmarks
Anyone citing WordStream for "long-tail converts better" is citing something that does not exist.

2026 Google Ads query-length data (Jason Tabeling/Further via Search Engine Land, SEL returned 403; reached via secondary
https://www.storyboard18.com/how-it-works/google-search-shifts-to-longer-queries-impacting-ads-ws-l-110616.htm):
 1-2 words: 24% impressions / 41% conversions
 3-4 words: 48% / 46%
 5-6 words: 17.2% / 9%
 7+  words: 10.8% / 4%
Conversion efficiency falls MONOTONICALLY as queries lengthen. CLASS: VENDOR-ONLY, secondary chain. Directional only.

UNSUPPORTED VENDOR FOLKLORE (no traceable dataset found for any):
 "long-tail converts 2.5x better" / "11x better" / "average long-tail conversion rate is 36%" / "2.3% one-word -> 5.6% five-word"

DEFENSIBLE REFRAME: the argument for long-tail is CHEAPER ACCESS AND LOWER COMPETITION, not a higher conversion rate.
