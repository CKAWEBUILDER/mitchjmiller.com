# Direction 01 — THE DATA MANDALA (v2, 2026-09-22)

A rose window where the mandala *is* the chart: five search intents are the sectors, three
metrics are the rings, and every one of the fifteen cells is a medallion with an icon and a
value. Ring ① is a real radial bar — blade length is the AI Overview trigger rate on a linear
0–36% scale with an ink cap at the bar end — and the hub is a gauge whose yellow arc is 58% of
the circle, the exact size of the click loss it reports.

**v2 is the blog-post hero.** The same file is the poster source, the GIF source and the living
interactive version; `?poster=1` / `?t=` switches it into poster mode.

---

## What changed after Mitch's review

**Readability**

| v1 | v2 |
|---|---|
| Crown names rode a bare arc and were crossed by the tick ring and the outer rule | Each crown name sits on its own inset plate inside the crown, at 21px, with the tick ring removed from the crown and the boundary circles kept off the plate. The glyph baseline is offset half a cap-height so the word is centred on the plate on both halves of the wheel instead of riding over the ring line |
| Fifteen long curved inscriptions in the ring gaps, auto-shrunk to ~9–12px, reversed and unreadable along the bottom | Inscriptions are gone from the wheel. All fifteen are straight, horizontal, ≥14px, in a **reading rail** under the wheel, keyed by intent colour (column) and ring number (row). Nothing curves; nothing crosses a line |
| `n/m` | **NOT MEASURED**, spelled out on the medallion face, on a dashed disc that is deliberately larger than the others so the long word fits at ≥14px. Footer repeats `NOT MEASURED = this ledger has no figure for that cell` |
| Minimum type ~8.8px at 1080 wide (hub source line, footer sources, ring marks) | **Hard floor of 14px at 1080 wide, enforced in code** (`MIN_PX`) and checked by `node export.mjs --verify`, which walks every `<text>` node and reports anything under 14px or any text box that overlaps another |
| Circled numerals ①②③ as ring marks — mush at small sizes | Plain digits in solid chips, 14px, in both the ring key and the rail |
| Footer sources on one over-long fitted line | Three balanced source lines at 14px, wordmark on the last |
| 1080×1350 and 1080×1080 only | Adds **poster-2160x2700.png** — the same layout at `deviceScaleFactor: 2`, for zooming |

**Pacing** — see *Motion* below. **Living version** — see *Blog embed* below.

**Layout constants that moved**: hub 0.225R → 0.255R (it now holds three 14px lines), band
thickness 0.1977R → 0.1877R, crown 0.1119R with a 4.5/5.5px inset plate, title bar 196 → 190px
with the headline at 48px so the two lines never touch.

**Square crop (1080×1080)**: no room for the reading rail at ≥14px without shrinking the
medallions below the floor, so the square drops the rail and carries the five-intent legend in
the footer instead — wheel, values, crown names, ring key and sources, no per-cell captions.
The 4:5 hero and the interactive version carry the captions.

---

## Data

Every figure comes from `content-studio/research/2026-09-14/search-intent/` (`data.json`,
`shock-stats.md`, `sources.md`), read against `notes.md`.

- The **64.9% People Also Ask** figure flagged in the 2026-09-15 correction was never on this
  poster — there is no PAA cell — so there was nothing to swap. The sourced replacement
  (Semrush, 1M US desktop keywords, 2020-09-30: 49.37% desktop / 52.27% mobile) is therefore
  not shown here either; adding it would be new content, not a correction.
- Two cells are honestly empty and say so in words: navigational ② (no intent-segmented CTR
  study in the ledger) and local ③ (one 2025 snapshot, no trend series).
- Two values are arithmetic on two ledger figures and print both raw numbers in the rail:
  `−34pt` (91.3% → 57.1%) and `12×` (0.84% → 10.33%).
- Ring ① mixes panels — Seer Interactive for informational / commercial / transactional,
  Authoritas for navigational, Whitespark for local. The ring-key chip says `mixed panels` and
  each rail caption names its own sample. **That note is unchanged from v1 and still on the art.**

---

## Motion (the GIF)

`anim-640x800.gif` — **0.94 MB**, GIF89a, NETSCAPE application extension with loop count 0
(loops forever), 226 frames, 11 fps (90ms → 9 centiseconds per moving frame).

One *rendering* is a slowed assembly with a beat between stages:

| stage | seconds | what moves |
|---|---|---|
| crown | 0.00 → 1.30 | five crown wedges + their name plates, 0.10s stagger |
| **beat** | **0.70** | one frame, one long delay |
| ring ③ | 2.00 → 3.10 | outer band + medallions |
| **beat** | **0.70** | |
| ring ② | 3.80 → 4.90 | middle band + medallions |
| **beat** | **0.70** | |
| ring ① | 5.60 → 6.70 | inner band, the radial bars and their ink caps |
| **beat** | **0.70** | |
| hub | 7.40 → 8.45 | gauge sweeps to 58%, headline rolls 0.00 → 68.01% |
| **settled hold** | **1.50** | one frame, one long delay |
| reverse wipe | 9.95 → 10.55 | clears back to bare armature (renderings 1 and 2 only) |

The loop is **three renderings in a row** — 10.85s, 10.85s, 10.31s — and then **one frame held
for 50.00 seconds** on the settled wheel before it loops. **Total loop 81.8 s.** The beats, the
settled holds and the 50s hold are each a single frame carrying a long delay, so an 82-second
loop costs 226 frames and under a megabyte. Assembly is roughly 2× slower than v1 (v1 assembled
in ~2.7s, v2 in ~8.5s including beats).

The continuous tick-ring rotation from v1 is gone: it touched every pixel of every frame, which
is expensive in a delta-encoded GIF and wrong for a 50-second hold. The armature (grain, ticks,
spokes, boundary circles) is now static and visible from frame 0.

---

## Blog embed

```html
<iframe
  src="/viz/01-data-mandala/index.html?parent=https://mitchjmiller.com/blog/<slug>"
  title="Search intent × the AI SERP — interactive data mandala"
  style="width:100%;max-width:1120px;height:2300px;border:0;display:block;margin:0 auto"
  loading="lazy"></iframe>
```

Put this on the parent page so the sector buttons scroll the post instead of navigating it:

```js
window.addEventListener("message", e => {
  if (e.data?.type === "viz-intent")
    document.getElementById("intent-" + e.data.intent)?.scrollIntoView({behavior:"smooth"})
})
```

Give the post these anchor ids: `intent-informational`, `intent-commercial`,
`intent-transactional`, `intent-navigational`, `intent-local`.

**Both paths are live, on purpose.** The button posts `{type:"viz-intent", intent:"<slug>"}` to
the parent *and* is a plain `<a target="_top">` to `<parentUrl>#intent-<slug>`, so it still
works if the listener above is missing. `parentUrl` comes from `?parent=` (http/https only —
anything else is ignored) and falls back to `document.referrer`.

**Behaviour**: on load the wheel runs one slowed assembly and holds. `prefers-reduced-motion:
reduce` renders the settled frame immediately with no animation. The five sectors are
`role="button" tabindex="0"` paths — Tab to them, Enter/Space to open, Escape or the Close
button to dismiss; `aria-pressed` tracks the selection. Selecting a sector veils the other four
and rings the chosen one.

**The panel** carries, per intent: the dominant result type with its ledger rate and source;
two or three example queries from this site's lanes (AEO/GEO, AI search, SEO consulting, growth
systems — the local example is SFC's "surf lessons waikiki"); an example results page; and a
"Read the … section ↓" button.

**The results-page image** loads from
`../../../research/2026-09-22/serp-examples/<intent>-desktop.png`
(`informational` · `commercial` · `transactional` · `navigational` · `local`). **As of
2026-09-22 that folder does not exist yet** — another agent is capturing it — so every panel
currently shows a **representative rendering drawn in SVG**, labelled as such on the image
itself and in the caption. No fake screenshots. Drop the PNGs in and the panels pick them up
with a "Captured results page" caption; no rebuild needed.

**API**: `window.VIZ.selectIntent(slug)` (returns `false` on an unknown slug),
`window.VIZ.selected`, `window.VIZ.intents`, plus the export hooks
`seek(s)` / `seekMs(ms)` / `duration` / `settled` / `framePlan(fps,{wipe})` / `audit()`.

---

## Commands

Run from this folder. Needs nothing but Node and the Chrome already on the Mac; the exporter
borrows `viz/kit/export/lib/browser.mjs` and resolves `gifenc` + `pngjs` from
`viz/kit/node_modules`. It writes only into this folder and fails the run if the page reaches
the network.

```sh
cd content-studio/viz/directions/01-data-mandala

node export.mjs                     # posters (1x + 2x) + verify + GIF
node export.mjs --posters           # poster-1080x1350 / 1080x1080 / 2160x2700
node export.mjs --verify            # type-size and text-overlap audit, exits 1 on a finding
node export.mjs --gif               # anim-640x800.gif  (226 frames, 11fps, 0.94 MB)
node export.mjs --gif --fps 12 --colors 96 --hold 40
```

Preview straight off disk — no server:

```sh
open "index.html"                          # living version: one assembly, then sectors are buttons
open "index.html?poster=1&size=1080x1350"  # frozen poster
open "index.html?size=640x800&t=3.10"      # any animation frame
```

`?size=WxH` · `?t=<seconds>` · `?poster=1` · `?static=1` · `?parent=<blog url>`.

---

## Verification, and what is not verified

Run `node export.mjs --verify`. It opens each canvas and reports, for every `<text>` node,
anything rendering under 14px normalised to 1080 wide, and any text bounding box overlapping
another. Current state:

```
verify 1080x1350: 101 text runs, 0 under 14px, 0 overlaps
verify 1080x1080:  50 text runs, 0 under 14px, 0 overlaps
verify  640x800:   87 text runs, 0 overlaps
```

Checked by hand as well: both posters opened at full size and the 2× poster inspected at 1:1
around the crown and the rail; GIF header, loop extension and every frame delay parsed out of
the bytes; the panel, the keyboard path, `selectIntent`, the `?parent=` and `document.referrer`
href fallbacks and the `postMessage` → parent `scrollIntoView` round trip all driven in
headless Chrome, over a throwaway `http://localhost:5312` host page (stopped afterwards) because
a `file://` iframe will not run the embedded script.

**Not verified:**

- **The captured results pages.** `research/2026-09-22/serp-examples/` does not exist yet. The
  `img.onload` swap was exercised by aliasing an existing PNG onto the path in the test server,
  so the code path is proven — the actual captures are not, and the drawn fallback is what
  ships today.
- **Real-browser phone rendering.** Every cell clears the 14px floor at 1080 wide, but a
  1080-wide poster shown at ~390px puts the three-character values (36%, 93%, 12×, 0%, 5%, 8%,
  15%, −5%) at ~11px on screen and the longer ones (0.94%, 2.15%, −34pt, +71%) at ~7–8px. The
  headline, the crown names and the rail are the tiers that survive a phone; the long values
  need the 2× poster or the interactive version. That is a physics limit of fifteen cells on one
  wheel, not a settings problem.
- **The GIF played in Slack / LinkedIn / Safari.** Delays were read out of the file, not watched;
  some clients clamp long frame delays, and a client that clamps the 50s hold will shorten the
  pause, not break the loop.
- **Nothing was committed, built or deployed.** No git, no site build, no servers left running.

## Files kept for comparison

`poster-v1-1080x1350.png`, `poster-v1-1080x1080.png`, `anim-v1-640x800.gif`, `index-v1.html.bak`
— the pre-review versions, untouched.
