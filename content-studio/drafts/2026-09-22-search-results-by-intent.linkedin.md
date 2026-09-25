post: LinkedIn tease for `2026-09-22-search-results-by-intent.blog.md`
status: draft — not posted, not scheduled
approved: no
supersedes: 2026-09-14-search-results-by-intent.linkedin.md (old post also unposted; that draft is untouched)

attach (personal profile): content-studio/viz/directions/01-data-mandala/anim-640x800.gif
  — NOTE: this direction has no `exports/` subfolder, the GIF sits at the direction root. Checked
  2026-09-22 08:28: the mandala's clickable-panel revision has already landed in `index.html` and
  its posters (regenerated same timestamp), but this GIF file is still Sep 15's PRE-revision
  animation — regenerate with `node export.mjs --gif` from that folder before posting, or the GIF
  won't show the click behavior the blog post's hero now has.
attach (M² profile): content-studio/viz/directions/05-journey-map/exports/anim-640x800.gif
  — this direction DOES use an `exports/` subfolder. Its jump-link revision has not started yet
  (index.html unchanged since 15 September) — do not post until it lands and this file is re-exported.
  Mitch alternates the mandala on his personal profile with the journey map on M², so both are
  listed — post ONE per profile, not both on the same post.

alt_attach (either profile, still image instead of GIF):
  - Mandala poster: content-studio/viz/directions/01-data-mandala/poster-1080x1350.png (~522 KB, this IS the revised/current version as of 08:28 — safe to use today)
  - Journey map poster: content-studio/viz/directions/05-journey-map/exports/poster-1080x1350.png (~457 KB, pre-revision — no jump-link behavior yet)

image_alt (mandala): Data mandala — search results by intent. Five intents as sectors around three
  measured rings: AI Overview trigger rate, click-through impact, year-over-year mix shift. Two
  cells marked not measured.
image_alt (journey map): Journey map — a route through five search-intent territories ending at a
  zero-click destination card reading 68.01%, with a landmark key and one entry marked not measured.

---

## Post copy

SparkToro has been tracking US Google zero-click share since 2016: ~45% then. 68.01% now.

Five intents, five different result pages, built for five different reasons. Click one in the artifact and the page redraws to what's actually been measured:

→ Informational: 36% AI Overview, 85.9% when the query is a question (Seer Interactive, 5.47M queries)
→ Commercial investigation: 95.4% for "X vs Y" comparisons — the highest rate in the whole dataset
→ Transactional: 5%, and the only intent where AI Overview presence went backwards over the last six months tracked
→ Navigational: 0% in a late-2024 sample, 10.33% a year later — even "just take me to the site" isn't AI-immune anymore
→ Local: 15% AI Overview, 93% local pack (Whitespark, 540 hand-collected queries)

The one that stopped me: being cited inside an AI Overview is worth roughly +120% more organic clicks per impression than showing up and not being cited. Same rank. Same page. Different outcome. (Seer Interactive.)

None of this caught the field off guard. Ahrefs is on its second edition of the same click-tax study. Seer is on its third. SparkToro has run the zero-click number since 2016. Search strategists — SEO especially, organic and paid both — were measuring this compression years before "zero-click future" became a phrase people needed explained to them.

The next shift is agentic, and the "60% would let an agent do it" number people keep repeating doesn't exist in any survey I can find. What's real: 58% say they've already replaced search engines with generative AI for recommendations (Capgemini). 51% would let AI run their entire purchase once preferences are set (Adyen). Only 14% actually trust AI to place the order (Bain). Interest is in the 50s. Trust is in the teens. That gap is the story.

**The animation attached is the rudimentary version of the living artifact.** Click a sector, see what that intent's results page actually returns, jump straight to the sourced numbers behind it.

Full breakdown, including what a near-zero-click search means for citation, authority, and the shift from search engines to agents as the gatekeeper: mj2.pro/blog/search-results-by-intent/

Share this with someone budgeting 2027 content against a search-intent split that hasn't been remeasured since 2008.

#AEO #SEO #AISearch #GEO #SearchIntent #DataViz #ZeroClick

---

## Notes for Mitch (not part of the post)

- **Nothing has been posted.** Copy only, per house rule 6 — LinkedIn needs your explicit OK, per post, every time.
- **Two attachments, two profiles, alternating as you do it.** Post the mandala GIF on your personal profile and the journey-map GIF on M², not both on one post. Checked both folders directly while writing this (2026-09-22 08:28): the mandala's clickable-sector revision has already landed in its `index.html` and posters, but its GIF is still stale (Sep 15, pre-revision) — regenerate before posting. The journey map's jump-link revision hasn't started at all yet — neither its GIF nor its poster reflect it. Bottom line: the mandala poster (not the GIF) is the only one of the four attachment files that's actually current right now.
- **Hook** is the ten-year SparkToro series (45% → 68.01%) rather than the raw 68.01% headline alone — the headline number gets scrolled past by now; "we've been tracking this since 2016" is the harder thing to argue with in the comments, and it sets up the "measured before it had a name" framing that's new in this version.
- **This post assumes the blog is live** at `mj2.pro/blog/search-results-by-intent/` and supersedes the unposted 2026-09-14 LinkedIn draft for the same post — that old draft is untouched, per your instruction, in case you want to compare copy.
- **One claim still open**, carried from the 09-14 draft: the Ahrefs featured-snippet figure (15.41% → 5.53%) is a secondary citation, not independently re-verified. It's not in this LinkedIn copy, so it doesn't block posting this one, but it does block the blog post it links to.
- **Word count** 373 after the fill pass (was ≈260) — added one paragraph once `content-studio/research/2026-09-22/zero-click-future/` landed, giving the agentic-shift line real, sourced figures instead of a generic gesture. Still shorter than the 09-14 version's ≈400.
- **Fill pass applied.** The agentic-shift paragraph now carries exact figures (Adyen 51%/59%, Capgemini 58%, Bain 14%) rather than the placeholder "shift from search engines to agents" gesture the first draft used — matches the blog's conclusion and the same "never round to 60%" instruction (no survey found states that figure; see `zero-click-future/notes.md`). The E-E-A-T/gatekeeper material is still blog-only, deliberately — this post stays short and links out rather than carrying that argument itself.
