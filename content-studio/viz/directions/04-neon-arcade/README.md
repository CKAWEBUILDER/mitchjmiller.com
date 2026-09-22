# Direction 04 — NEON ARCADE

## Concept

A Google results page drawn as an arcade cabinet: pure black ground, eleven
stacked neon layers running top-of-page to off-the-page, each one a labelled
cell with an icon, a colour-coded intent, a real measurement and its source.
A single loud title bar carries the shock stat — **68.01% of U.S. Google
searches ended with no click** — in white-hot glowing type, and a legend ties
every colour to a search intent so the poster reads as a reference chart, not a
statement graphic. In motion the layers ignite in sequence while the headline
number counts up, a scanline sweeps the stack, a bloom fires at the payoff, and
the settled board holds before looping — attract mode for a SERP.

Spatial metaphor: **ecosystem layers**. Cell 01 is the AI Overview at the top of
the page; 11 is the answer engine off the page entirely. The order on the
poster is the order on the screen.

## Files

| File | What it is |
|---|---|
| `index.html` | The artifact. Self-contained, no external requests, system fonts only. `?size=1080x1350` (default), `?size=1080x1080`, `?size=640x800`. `?static=1` freezes the settled state; `?t=1.8` seeks a frame. Exposes `window.VIZ = { ready, duration, settled, seek(t), play() }`. |
| `export.mjs` | Poster + GIF exporter, plus the fit check. |
| `poster-1080x1350.png` | LinkedIn portrait 4:5 — the highest-reach still. |
| `poster-1080x1080.png` | LinkedIn square 1:1. Same cells, two-column grid, layers 01 and 11 span full width. |
| `anim-640x800.gif` | 35 frames · 11 fps · 3.2 s + 1.1 s hold · loops forever · 1.02 MB. |

## Commands

Run from this folder. Node 22, Chrome already installed (`CHROME_PATH` honoured).

```bash
cd content-studio/viz/directions/04-neon-arcade

node export.mjs              # posters + gif + fit check (the full deliverable)
node export.mjs --check      # fit check only, writes nothing
node export.mjs --posters    # the two PNGs only
node export.mjs --gif        # the GIF only

# GIF knobs
node export.mjs --gif --fps 12 --clip 3.6 --colors 128 --hold 1200
```

`export.mjs` imports `../../kit/export/lib/browser.mjs` for Chrome discovery and
the hardened page open (all non-`file:` requests are blocked — anything reaching
the network fails the run), and resolves `gifenc` / `pngjs` out of
`../../kit/node_modules`. Nothing under `kit/` is written to, including
`kit/exports/`.

### Fit check

Every export run asserts, at all three sizes, that nothing sits outside the
frame, no clipping box has hidden text, no two laid-out text boxes overlap, and
no band's content spills its padding box. It exits non-zero on a failure and
names the offending element. Current state: clean at 1080×1350, 1080×1080 and
640×800.

## Palette

Pure black ground, fully saturated neon at full intensity. Colour is the intent
legend — it is never decorative.

| Token | Hex | Means |
|---|---|---|
| ground | `#000000` | the cabinet |
| cyan | `#00F0FF` | informational |
| magenta | `#FF2D95` | commercial |
| orange | `#FF8A1E` | transactional |
| lime | `#7CFF2A` | navigational |
| yellow | `#FFE600` | local |
| violet | `#C06CFF` | all queries / not intent-segmented |
| ink | `#FFFFFF` | body copy |
| ink-2 | `#CBD8E6` | subline |
| ink-3 | `#8D9CB1` | source tags, footer |

Type: **Arial Black** for the headline number, layer titles and metrics;
**Helvetica Neue** for body lines; **Menlo** for kicker, source tags and legend.
All three ship with macOS, so the file has no web-font request.

### Glow discipline

Glow is applied only to type at 19px and above (headline number, layer titles,
metrics, bar labels, index numbers, icons) and to rules, chips and bar fills.
Detail lines, source tags and the footer carry **no** text-shadow, so nothing
small is blurred. Kinetic effects — the scanline sweep, the per-band ignition
flash, the payoff bloom — are transient and never sit under body copy for more
than ~2 frames. The CRT scanline and vignette are static, which is also what
keeps the GIF under 3 MB: the delta encoder only pays for pixels that change.

## Data

Every figure comes from `content-studio/research/2026-09-14/search-intent/`
(`data.json`, `shock-stats.md`, `sources.md`). Nothing is estimated, rounded for
effect, or invented. Each cell carries its publisher, sample and date, plus a
confidence dot: **●** high, **◐** medium, matching the ledger's own rating.

Deliberately excluded per `notes.md` — the "do not use" and "verify before use"
sets:

- the fabricated Semrush "18.4 billion queries / 57.3% informational" intent split
- the contradictory Perplexity citation-density figures
- AI Mode "93% zero-click" (Seer attribution not confirmed at source)
- the featured-snippet 15.41% → 5.53% series (Ahrefs URL not re-verified)
- Datos ~30% navigational share (secondary roundup only)
- seoClarity ~30% AI Overview prevalence (secondary reporting only)
- Tinuiti 13.05% / 0.59% brand citation pair (primary report not located)
- **People Also Ask 64.9% (Semrush)** — the cited URL 404s and no Semrush page
  states the figure; the trail runs through aggregators quoting each other.
  Excluded by the ledger's 2026-09-15 lead correction.

Cell 08 (People Also Ask) uses the ledger's sourced replacement: Semrush,
1,000,000 US desktop keywords, **49.37% desktop / 52.27% mobile**, published
2020-09-30. The reading's age is on the cell twice — in the sentence and in the
unit label under the metric — because it is the oldest figure on the poster by
five years. It also keeps the explicit **not measured** chip: no public study
segments PAA presence by intent. That gap is in the legend, not hidden.

Cell 02's five bars come from three different panels (Seer, Whitespark,
Authoritas). Each bar names its own source, and the lead line says so:
*"three panels, not one method."* They are comparable in direction, not in
methodology — per `notes.md`, this space has no single agreed trigger-rate
number.

## Legibility

Three deliberate tiers, which is how dense reference posters work:

1. **Glance, at phone size (~420px wide in-feed):** headline number, headline
   line, the eleven layer titles, the per-layer metric, the legend colours.
   Verified by downscaling both PNGs to 420px and reading them.
2. **Tap and zoom:** the one-to-two-line measurement under each title.
3. **Fine print:** the source tag per cell and the one-line footer.

The GIF renders the 1080×1350 layout scaled to 0.5926, so its composition is
identical to the portrait poster; tier-2 text is small at that size by design —
the GIF is the hook, the PNG is the save.

## Not verified

- The GIF was inspected as individual frames (t = 0.30 / 0.95 / 1.70 / 2.45 /
  3.05) and by header (`GIF89a`, 640×800, `NETSCAPE2.0` loop count 0). It has
  not been played back in LinkedIn's own feed renderer.
- The one medium-confidence figure (GrowthSRC position-2 CTR) is marked **◐** on
  the poster but was not independently re-sourced during this pass; it carries
  the ledger's rating, not a new check.
- The replacement PAA figures (49.37% / 52.27%) were taken from the ledger's
  2026-09-15 correction; the Semrush post itself was not re-fetched here.
- Colour contrast was judged by eye against the black ground, not run through
  the kit's `contrast.mjs`.
