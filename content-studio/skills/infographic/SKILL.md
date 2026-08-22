---
name: infographic
description: Build a clean, shareworthy data-visualization/infographic for a post (site + LinkedIn). Use once a draft's data is ready.
---

# infographic

Every post ships at least one hero visual that's worth sharing on its own.

## Rules
- **Self-contained + theme-independent:** a dark-panel SVG with its own background (`#0f172a`
  panel, `#1e293b` cards, light text) so it reads identically in light/dark and as a LinkedIn image.
- **Palette:** `#2563eb` blue · `#7c3aed` purple · `#10b981` green · `#f59e0b` amber · `#ef4444` red.
- **Responsive** for the site: `viewBox` + `width:100%;height:auto`, wrapped in `<figure>` with a caption.
- **Honest data only** — real numbers with a source line in the caption. No invented bars.
- **One idea per graphic.** Scoreboard, comparison, ladder, timeline, or matrix — pick the form
  that fits the insight. Big legible numbers; a reader gets it in 3 seconds.
- **Shareable framing:** the title states the takeaway, not the topic.

## For LinkedIn
- Export the SVG to **PNG** (≈1200×1200 or 1200×627) for upload. Use `rsvg-convert` or headless
  Chrome / a quick Node canvas; if none available, render the SVG in the browser and screenshot.
- Keep text ≥ 28px effective so it survives the mobile feed.

## Output
- Inline SVG string injected into the post's `contentHtml` (site).
- A PNG in `../drafts/assets/<slug>-<n>.png` for LinkedIn.
- Reference the built pattern from earlier posts (Intrepid scoreboard/retention/segment SVGs)
  as the quality bar.
