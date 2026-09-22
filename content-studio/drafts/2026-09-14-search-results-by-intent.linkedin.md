post: LinkedIn tease for `2026-09-14-search-results-by-intent.blog.md`
status: draft — not posted, not scheduled
approved: no
attach: content-studio/viz/search-results-by-intent/exports/search-results-by-intent-640x640.gif (2.07 MB, 38 frames — animates in feed on native upload, under LinkedIn's ~7.8 MB ceiling)
alt_attach: content-studio/viz/search-results-by-intent/exports/search-results-by-intent-poster-1200x1500.png (0.93 MB — portrait still, if the GIF is not wanted)
doc_attach: content-studio/viz/search-results-by-intent/exports/search-results-by-intent-poster.pdf (1.43 MB — single page, so keep it as a printable reference rather than posting it as a swipeable document post)
image_alt: Living infographic — search results by intent. Informational searches: 64% carry no AI Overview, 36% do. Below, the result page redrawn to measured presence rates for AI Overview, People Also Ask, featured snippet, local pack, ads and organic results, each labelled with its study and date.

---

## Post copy

Three studies measured AI Overview presence on informational queries and got 36%, 69.8% and 92%.

Same intent label. Fifty-six points apart. Different keyword panels.

That gap is the reason I stopped quoting a single "AI Overviews appear on X% of searches" number, and built something that shows the panel next to the number instead.

Pick an intent and the result page redraws to the rates the studies actually measured:

→ Informational: 36% AI Overview (Seer Interactive, 5.47M queries, Apr 2026)
→ Transactional: 5% — and the only intent where AI Overview presence went *down* over the last measured window
→ Local: 15% AI Overview, but 93% local pack (Whitespark, 540 hand-collected queries)
→ "X vs Y" comparisons: 95.4% — the highest rate in the whole dataset

And the number under all of it: 68.01% of US Google searches ended with no click at all between January and April 2026, up from 60.45% two years earlier (SparkToro, Similarweb clickstream panel, published 9 June 2026).

Here is the part I did not expect when I started pulling the data.

Of the twenty-five intent-by-measure cells in this thing, seventeen have a source and eight are empty. People Also Ask, featured snippets and ad presence have no by-intent measurement in any study I could find — only all-query averages. The intent split the whole industry still quotes (80/10/10) was measured in 2008.

We segment strategy by intent every day. The published measurement covers two thirds of the grid, and the gaps are rarely labelled as gaps.

So the empty cells are drawn as gaps rather than filled with something plausible. That felt more useful than a tidy chart.

**The GIF above is the rudimentary version.** The living one has the intent selector, the measure picker, the per-intent result surface and a source with a date behind every single number — including the one I have flagged as a secondary citation, and the two widely-circulated stats I threw out because no primary source for either of them exists.

One of those two is worth naming. "People Also Ask appears on 64.9% of searches" is all over the statistics roundups, attributed to Semrush. No Semrush page says it. The trail ends at a roundup citing a roundup. Semrush's own PAA study — a million US desktop keywords — measured 49.37%, and it was published in 2020. That is the number on the artifact, with its date printed on the bar.

Living version: mitchjmiller.com/viz/search-results-by-intent/
Write-up, with how to read the numbers: mitchjmiller.com/blog/search-results-by-intent/

Share this with someone who is still planning for "informational intent" as if it were one page.

#AEO #SEO #AISearch #GEO #SearchIntent #DataViz #AIOverviews

---

## Notes for Mitch (not part of the post)

- **Nothing has been posted.** This is copy only, per house rule #6 — LinkedIn needs your explicit OK, per post.
- **Hook** is the 36 / 69.8 / 92 disagreement rather than the 68.01% zero-click number. The zero-click figure is better known and gets scrolled past; the disagreement is the thing people argue with in the comments, and it is defensible because all three panels are named and dated.
- **Attach the GIF** (`search-results-by-intent-640x640.gif`). It carries the amber honesty strip saying it is the rudimentary version and pointing at the living one, so the framing holds even if someone reposts the image alone. The portrait PNG is the fallback if you would rather post a still; the PDF is there if you want to run it as a document post.
- **Both links assume the artifact is published** at `/viz/search-results-by-intent/` and the post at `/blog/search-results-by-intent/`. Neither exists yet — the artifact has not been copied into `public/`. If you prefer the existing `/artifacts/` convention, both links and `meta.liveUrl` inside the artifact need the same change.
- **Word count** ≈ 400, which is long for the feed but this audience reads. If you want the short cut: keep the opening three lines, the four intent bullets, the "seventeen of twenty-five" paragraph, the rudimentary-version line and the two links.
- **One claim to confirm before this goes out**, the same one flagged in the blog draft: the Ahrefs featured-snippet decline (15.41% → 5.53%), still a secondary citation. It is labelled as such inside the artifact. The People Also Ask figure that was on the earlier version has been chased down and replaced with Semrush's own 2020 study — that one is now resolved, and the post copy above names the substitution deliberately, because "I checked and threw one out" is the most credible thing in the post.
