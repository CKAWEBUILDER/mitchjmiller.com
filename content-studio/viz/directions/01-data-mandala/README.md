# Direction 01 — THE DATA MANDALA

## Concept

A rose window where the mandala *is* the chart: five search intents are the sectors, three
metrics are the rings, and every one of the fifteen cells is a numbered medallion with an icon,
a value and a curved inscription naming what the number measures. Ring ① is a real radial bar —
the blade length is the AI Overview trigger rate on a linear 0–36% scale with a bold ink cap at
the bar end — while the hub is a gauge whose yellow arc is 58% of the circle, the exact size of
the click loss it reports. Saturated ink on bone paper, five-fold symmetry and fifteen repeated
medallions do the psychological work; the loud black title bar carries the shock stat so the
thing still lands as a thumbnail, and the density rewards the save.

## Palette

Bone paper on purpose — a saturated wheel on light stock reads as a printed reference poster,
not a dashboard, and it is the brightest possible ground for full-chroma hues.

| Role | Hex | Notes |
|---|---|---|
| paper | `#FFF6E9` | ground; `#FDEBD3` radial bloom behind the wheel |
| ink | `#14100B` | all body type, spokes, bar caps, title bar fill |
| ink soft | `#5B5147` | source line, key sub-labels |
| hot | `#FFE600` | headline number, hub gauge, ring-key glyphs |
| not measured | `#9A8F81` | `n/m` cells — dashed rim, italic type |
| informational | `#00C2FF` | cyan |
| commercial investigation | `#A855F7` | violet |
| transactional | `#FF4D97` | rose |
| navigational | `#C6FF00` | lime |
| local | `#FF9500` | amber |

Ink on every intent hue clears 4.5:1 (lowest is violet at 4.8:1), so the crown names and every
medallion value are legible without a second colour. Band fills are the hue shaded 10% and
tinted over paper at 13% / 36% / 52% for rings ① / ② / ③ — the ring you are reading is coded by
depth of colour as well as by position, and the legend repeats both.

## Data

Every figure comes from `content-studio/research/2026-09-14/search-intent/` (`data.json`,
`shock-stats.md`, `sources.md`); `notes.md` was read first and nothing flagged there is on the
poster. Two cells are honestly empty: navigational ② (no intent-segmented CTR study in the
ledger) and local ③ (one 2025 snapshot, no trend series). Two values are arithmetic on two
ledger figures and print both raw numbers in their inscription: `−34pt` (91.3% → 57.1%) and
`12×` (0.84% → 10.33%).

Ring ① mixes panels — Seer Interactive for informational / commercial / transactional,
Authoritas for navigational, Whitespark for local. That is stated on the ring-key tab
(`mixed panels`) and each cell's inscription names its own sample.

## Commands

Run from this folder. Requires nothing but Node and the Chrome already on the Mac; the exporter
borrows `viz/kit/export/lib/browser.mjs` and resolves `gifenc` + `pngjs` from
`viz/kit/node_modules`. It writes only into this folder and fails the run if the page reaches
the network.

```sh
cd content-studio/viz/directions/01-data-mandala

node export.mjs                                       # both posters + the GIF
node export.mjs --posters                             # poster-1080x1350.png, poster-1080x1080.png
node export.mjs --gif --fps 12 --dur 4.4 --colors 128 # anim-640x800.gif  (53 frames, 0.78 MB)
```

Preview in a browser straight off disk — no server:

```sh
open "index.html?size=1080x1350"          # animated, loops
open "index.html?size=1080x1080&t=3.2"    # frozen at the settled frame
open "index.html?size=640x800&t=2.0"      # any animation frame
```

`?size=WxH` · `?t=<seconds>` · `?static=1`, and `window.VIZ.seek(s)` / `seekMs(ms)` /
`duration` / `ready` for programmatic frames.

## Motion

4.4 s, 12 fps, 53 frames, infinite loop. Outside-in assembly — crown, then ring ③, ② and ①
sector by sector (85 ms stagger), then the hub gauge sweeps to 58% while the headline rolls
0.00 → 68.01. It holds settled for about a second, then a half-second reverse wipe returns the
wheel to bare armature, so the last frame is pixel-identical to the first and the loop has no
cut. The ornamental tick rings turn exactly 360°/10 across the loop, which is their own symmetry
period — the turn is continuous and still seamless.
