# Direction 02 — The Fractal Stack

## Concept

One US Google results page is a single cell; it subdivides into five intent cells, and each
intent cell subdivides into the metrics that were actually measured inside it — the same visual
grammar repeated at three depths (icon, bold title, filled bar, one or two short lines, a source
line), with the family colour tinting lighter as the stack goes deeper. The subdivision is
literal, not decorative: routed wires run from each parent's bottom edge to each child's top
edge, measured after layout, so a reader can trace any cell back to the page it came from.
Fourteen labelled cells, a loud acid-yellow title bar carrying the shock stat, and a GIF in which
the stack unfolds level by level — root, fan out to five intents, fan out to eight measurements —
then holds and loops.

## What it is deliberately not

Not a dark dashboard. Paper ground, ink type, saturated colour blocks, drawn borders — a
reference poster you save, in the genre of the dense multi-panel posters recorded in
`content-studio/PIPELINE-2026-09.md`. The mandala is a solid 12-fold recursive rosette drawn
on the title bar (each petal spawns two children at 0.47 scale for three levels) and it turns
exactly 1/12 of a revolution over the GIF clip, so the loop is seamless. It is a signature mark,
not a watermark behind the type.

## Palette

| Role | Hex | Use |
|---|---|---|
| paper | `#FFF6E9` | ground |
| ink | `#15100C` | all body type, borders, footer, level-1 family |
| acid yellow | `#FFE500` | title bar, byline |
| informational | `#1B3BEF` | family |
| commercial | `#E0006C` | family |
| transactional | `#FF6B00` | family |
| navigational | `#7A22D8` | family |
| local | `#00A05A` | family |
| not measured | `#8A7F70` | the honest gap cell |

Cell backgrounds are the family mixed toward paper — 80% at level 1, 84.5% at level 2, 90.5% at
level 3, which is the "lighter tint at deeper levels" rule. Strip labels pick white or ink
automatically, whichever clears the wider margin. `export.mjs` runs 31 WCAG pairs before it
renders anything; the current minimum is **4.79:1**, so every label clears 4.5:1 without relying
on the large-text exemption.

## Data

Every figure comes from `content-studio/research/2026-09-14/search-intent/`
(`data.json`, `shock-stats.md`, `sources.md`). Only high-confidence entries are used.

Deliberately excluded, per `notes.md`: the fabricated Semrush "18.4 billion queries / 57.3%
informational" claim, the internally contradictory Perplexity citation-density pair, the
medium-confidence Ahrefs featured-snippet series, the unconfirmed "93% of AI Mode searches end
without a click", the secondary-only Datos ~30% navigational share, the low-confidence Tinuiti
brand-citation gap, and the First Page Sage CTR-impact claim.

The 2008 Penn State intent split is **not** used as a treemap area. Instead the poster carries a
cell that says `NOT MEASURED`: no 2025–26 study partitions US queries by intent, so every share
on the poster is a trigger rate *within* an intent, never a share *of* all search. That cell
descends from the root, not from any intent, and its wire says so.

The same rule is stated in three places so no cell can be read out of context:

- the deck, in the title bar — "every percentage below level 1 is a rate within its own intent,
  not a share of all search";
- each level-2 sub-label reads **`OF THESE QUERIES`**, with the intent named in the cell title
  directly above it (so `36%` is 36% of *informational* queries, per Seer, not 36% of all
  search). An earlier build read `OF ALL QUERIES`, which was wrong;
- the `NOT MEASURED` cell itself.

Two derived numbers are printed: `2.4×` (85.9 / 36) and `7.56 points` (68.01 − 60.45). Both are
arithmetic on ledger values, not new measurements.

## Files

```
index.html               self-contained, no network, no build step
export.mjs               posters + GIF + frame checks
poster-1080x1350.png     LinkedIn portrait
poster-1080x1080.png     LinkedIn square
anim-640x800.gif         46 frames, 11 fps, 4.2 s, loops forever, 367 KB
```

## Commands

```bash
cd content-studio/viz/directions/02-fractal-stack

node export.mjs              # contrast + both posters + GIF + all frame checks
node export.mjs --posters    # posters only
node export.mjs --gif        # GIF only
node export.mjs --gif --w 720 --h 900 --fps 12 --colors 160   # bigger/smoother GIF
```

Chrome discovery and the self-containment guard come from the kit
(`../../kit/export/lib/browser.mjs`); `gifenc` and `pngjs` are required out of
`../../kit/node_modules`. Nothing in the kit is written to, and `kit/exports/` is untouched.
Honour `CHROME_PATH=/path/to/Chrome` if Chrome is somewhere unusual.

### Viewing it live

```
open "index.html"                       # portrait, animating, loops
open "index.html?size=1080x1080"        # square
open "index.html?static=1"              # settled, no rAF
open "index.html?t=1.4"                 # any moment of the reveal
open "index.html?frame=20&frames=46"    # the exact frame the GIF exporter captures
```

`window.VIZ` exposes `ready`, `duration`, `timeline`, `seek(t)`, `frame(n, total)`, `fitNotes`.
`?motion=reduce` (and the OS setting) renders the settled state with no animation loop.

## How it is checked

`export.mjs` measures each still in the poster's own 1080-wide design space, with the viewport
scale removed, and fails the run on: content larger than the frame; any cell, text run, title
bar, legend or footer clipped; any two text runs overlapping (measured with a `Range`, so
overflowed text counts); the footer, source line or byline pushed outside the frame; a cell count
outside 8–14; a missing date on the source line; the auto-fit loop giving up on any cell; any
request leaving `file:`; and a GIF over 3 MB. All green as shipped.

The layout auto-fits **after** the counters are seeked to their final values, because "0" is
narrower than "68.01%" and fitting against the zeroed state is what silently clipped the first
build.

## Motion

| Phase | Seconds | What moves |
|---|---|---|
| anticipation | 0.00 – 0.26 | the root cell lifts into place, nothing counts yet |
| root reveal | 0.26 – 0.95 | `68.01%` rolls, its bar grows |
| first subdivision | 0.72 – 1.10 | five wires draw down from the root |
| intents | 0.88 – 1.99 | five cells lift and roll, staggered 75 ms |
| second subdivision | 1.70 – 2.08 | eight wires draw, routed through free channels |
| measurements | 1.88 – 2.95 | eight cells lift and roll, staggered 62 ms |
| hold | 2.95 – 4.20 | still, except the rosette turning to its loop point |

## Known trade-offs

- At LinkedIn feed width (~400 px) the headline, the five intent names and every headline
  percentage stay legible; the one-to-two-line body copy does not. That is the reference-poster
  genre — it rewards a tap and a save — but it is a real trade against a single-statement graphic.
- The GIF spends its first ~0.9 s on a mostly empty lower half. That is the anticipation beat; if
  it reads as dead space in the feed, shorten `T.cell.in0` in `index.html`.
- The root cell's bar (no-click share) and the intent cells' bars (AI Overview trigger rate) are
  different metrics sharing one visual grammar. Each cell names its own metric in the caption
  beside the number, and the legend says the fill is "the share that cell names" — but a reader
  skimming only the bars could read them as one continuous quantity.
