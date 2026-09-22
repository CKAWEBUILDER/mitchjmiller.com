# Direction 03 — The Reference Poster

## Concept

A bright-ground print poster, not a dashboard: a loud black title bar carrying the single
shock stat (68.01% of U.S. Google searches end with no click) over twelve numbered cells in
a strict 3×4 grid, each a flat high-saturation colour block with an icon, a big measurement,
a bold title and one to three short lines. The spatial metaphor is an intent ladder — each
row is one query intent, named on a coloured rail down the left edge, descending from
informational (where AI Overviews are everywhere) through commercial and transactional to
"the edges" (navigational, local, and the one number that hits every intent). It is built to
be screenshotted and saved: dense, colour-coded with a legend, every figure carrying its
source and year in a tiny mono line, and an explicit NOT MEASURED strip naming what the
public research does not yet cover.

## What is on it

| Cell | Intent | Figure | Source |
|---|---|---|---|
| 01 | Informational | 36% AI Overview trigger | Seer Interactive 2026-04-24 |
| 02 | Informational | 85.9% of question-format queries | Seer Interactive 2026-04-24 |
| 03 | Informational | 0.94% CTR when present but uncited (3.35% / 2.07% comparators) | Seer Interactive 2026-04-24 |
| 04 | Commercial | 8% AI Overview trigger | Seer Interactive 2026-04-24 |
| 05 | Commercial | 95.4% of "X vs Y" comparisons | Seer Interactive 2026-04-24 |
| 06 | Commercial | +71% growth Nov 2025 → Apr 2026, Finance +231% | Semrush 2026-07-02 |
| 07 | Transactional | 5% AI Overview trigger | Seer Interactive 2026-04-24 |
| 08 | Transactional | −5% share change over the same six months | Semrush 2026-07-02 |
| 09 | Transactional | 2.15% CTR, uncited, Dec 2025 (was 4.17%) | Seer Interactive 2026-04-24 |
| 10 | Navigational | 0% → 10.33% presence, Dec 2024 → Oct 2025 | Authoritas 2025-01 / Semrush 2026-02-02 |
| 11 | Local | 15% AI Overview, 93% Local Pack | Whitespark 2025-05-12 |
| 12 | Every intent | −58% position-one CTR (was −34.5%, Apr 2025) | Ahrefs 2026-02-04 |

Headline: SparkToro on Similarweb clickstream, published 2026-06-09 (68.01%, Jan–Apr 2026;
60.45% for 2024 from the same publisher's series).

Every number comes from `content-studio/research/2026-09-14/search-intent/data.json`.
Nothing is estimated, rounded up, blended across studies, or invented. Figures that
`notes.md` flags as unverified or fabricated are deliberately absent — in particular the
"18.4 billion queries / 57.3% informational" Semrush claim, the 93% AI Mode zero-click
figure, the Ahrefs featured-snippet 15.41% → 5.53% pair, the Datos ~30% navigational share,
the seoClarity ~30% AIO prevalence, the First Page Sage CTR curve, and the Tinuiti
13.05%/0.59% brand-citation split.

## Palette

Bright print, one ink and one paper. Colour is a second channel only — each band is also
named on its rail and in the legend, and cells are numbered in reading order.

| Role | Hex | Contrast |
|---|---|---|
| Ink (all text, keylines, offset shadows) | `#131015` | 17.19:1 on paper · 18.87:1 on white |
| Paper (ground) | `#FFF3DE` | — |
| Panel white (NOT MEASURED strip) | `#FFFFFF` | — |
| Informational | `#FF5A36` | ink on it **6.08:1** |
| Commercial | `#FFC01E` | ink on it **11.51:1** |
| Transactional | `#00C2A0` | ink on it **8.29:1** |
| Navigational | `#5B8CFF` | ink on it **5.97:1** |
| Local | `#33D17A` | ink on it **9.47:1** |
| Every intent | `#C77DFF` | ink on it **7.02:1** |

Title bar reverses: paper text on ink, the rolling counter in `#FFC01E` (11.51:1) and the
highlighted clause in `#00C2A0` (8.29:1). Sub-line `#CFC6BC` on ink is 11.20:1.

Type: system stack only (`ui-sans-serif, system-ui, -apple-system, …`), mono
(`ui-monospace, SFMono-Regular, Menlo`) reserved for the eyebrow, source lines and sources
footer. No webfont, no network request of any kind — the exporter aborts if the page
requests anything off `file:`.

## Motion

Deterministic 4.2 s timeline, no CSS transitions or keyframes anywhere: every frame is a
pure function of `t`, so captures are reproducible. The title bar is present from frame
zero (the first GIF frame has to be a usable thumbnail), the headline counter rolls
0.00% → 68.01% over 1.5 s, the legend wipes in left-to-right, each intent rail grows
downward as its row arrives, and the twelve cells flip up on their top edge in reading
order (0.185 s apart, 0.40 s each, with the solid offset shadow growing in). The NOT
MEASURED strip and sources land last, then the poster holds and loops.

## Files

```
index.html              the artifact — self-contained, both sizes, seek hook
export.mjs              PNG + GIF exporter with frame checks
poster-1080x1350.png    portrait poster (LinkedIn 4:5)
poster-1080x1080.png    square poster (LinkedIn 1:1)
anim-640x800.gif        the reveal, 44 frames, 11 fps, 4.0 s + 0.7 s hold, loops forever
```

## Commands

Run from this folder. Node 22, Chrome already installed; `puppeteer-core` resolves from the
repo root, `gifenc` and `pngjs` from `content-studio/viz/kit/node_modules`. The kit is read
only — nothing under `viz/kit/` is written to.

```bash
cd /Users/mitchellmiler/Documents/mitchjmiller-html-migration/content-studio/viz/directions/03-reference-poster

node export.mjs                    # both PNGs + the GIF, with frame checks
node export.mjs --only poster      # stills only
node export.mjs --only gif         # GIF only
node export.mjs --only gif --fps 11 --clip 4.0 --hold 700 --colors 112
node export.mjs --only gif --gw 640 --gh 640   # square GIF instead
```

Preview in a browser (no server needed, `file:` works):

```
file://…/03-reference-poster/index.html                      # live reveal, portrait
file://…/03-reference-poster/index.html?size=1080x1080       # live reveal, square
file://…/03-reference-poster/index.html?static=1             # settled poster
file://…/03-reference-poster/index.html?t=2.4                # frozen at 2.4 s
```

### Frame checks

`export.mjs` runs four assertions in the page before writing anything, and a failing still
aborts the run rather than shipping a broken PNG:

1. no element's content is taller or wider than its own box (clipped text),
2. no cell child crosses the line `overflow:hidden` actually clips at,
3. no two text rectangles intersect (overlap),
4. nothing escapes the stage;
   plus it reports the smallest rendered type in exported pixels.

Current run: **clean at both poster sizes and at the settled GIF frame.** Smallest type is
11 px on the portrait poster, 8.8 px on the square, 6.5 px in the GIF — in every case that
is the one-line sources footer, which is meant to be small. The measurements, titles and
body lines are 38 / 18 / 15.5 px on the portrait poster.

## Phone legibility

Checked by opening the PNGs. At a 390 px phone width the portrait poster scales to 0.36×:
the 68.01% headline and the twelve big figures stay readable in-feed, cell titles are
borderline, and the body lines and sources need a tap-to-zoom. That is the intended trade
for this direction — it is a reference poster built to be saved and zoomed, not a statement
graphic read at a glance. If a glance-legible variant is wanted, it is a different
direction, not a tuning of this one.

## Not verified

- The poster has not been viewed on an actual phone or in the LinkedIn composer; legibility
  above is derived from the rendered PNGs and the measured type sizes.
- The GIF has not been played in a LinkedIn feed. It is 357 KB, 640×800, GIF89a with the
  NETSCAPE2.0 loop extension set to loop forever — verified by parsing the file, not by
  uploading it.
- Colour rendering is sRGB as exported (`--force-color-profile=srgb`); no print proof or
  wide-gamut display check was done.
- The underlying figures inherit whatever confidence `data.json` assigns them. All twelve
  cells and the 68.01% headline use entries the ledger marks **high** confidence. One
  **medium**-confidence figure is on the poster: the 60.45% 2024 comparator in the title
  sub-line. `data.json` flags it because SparkToro's own 2024 report framed that year as a
  37.4% open-web click rate, which is a different metric from zero-click share. The poster
  states both years as zero-click share from the same publisher's series, which is the
  framing `notes.md` says to pick — but it is the one number here that another reading of
  the same publisher could dispute. Drop the sub-line clause if that matters.
