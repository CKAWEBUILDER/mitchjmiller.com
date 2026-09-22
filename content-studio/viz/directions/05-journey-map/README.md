# Direction 05 — THE JOURNEY MAP

## Concept

A searcher's trail is drawn as a road winding across a bright illustrated map, passing through five coloured territories — one per search intent — each one a dense labelled region carrying an icon, a bold title and two real measurements plus a footnote. Landmarks of the results page (AI Overview, ads, organic, local pack, People Also Ask) are pulled out into a map key along the bottom, and the road ends at a dark "Journey's End" marker holding the shock stat: 68.01% of U.S. Google searches ended with no click. In the animated version the trail draws itself territory by territory, each region's headline figure counting up only once the trail reaches it, the 68.01% rolling last, then holding and looping.

The spatial metaphor is doing real work: the road doubles back through row two (territory 3 sits right, 4 sits left), which is why it carries direction chevrons and numbered milestones — the route, not the reading order, is the sequence.

## What is on it

- **Title bar** — one loud takeaway, the headline stat in the subline.
- **Start marker** — the search box, labelled with the largest sample in the ledger (5.47M queries / 53 brands / 2.43B impressions, Seer).
- **5 territories** — Informational, Navigational, Commercial, Transactional, Local. Each: number disc, name, icon, two measured figures with labels and detail lines, a footnote, and a tiny publisher chip.
- **Destination card** — the zero-click terminus, with the 2024 comparison and the "1.53% of pages are still ten blue links" framing.
- **Map key** — six landmark entries, including one deliberately labelled `not measured`.
- **One-line source strip** at the very bottom.

Twelve labelled cells in total (5 territories + destination + 6 key entries), plus the start marker.

## Palette

Warm saturated flat illustration on a light ground. No gradients except the destination's radial burst; no photos.

| Role | Hex |
|---|---|
| Paper ground | `#FBF3E4` |
| Terrain blobs | `#F4E7CD` · `#EFDFC0` |
| Contour / rules | `#D9C7A6` |
| Ink | `#17120F` |
| Muted ink | `#6E6055` |
| Title bar, "not measured" flags | `#E8441F` |
| Gold (accents, chevrons, destination figure) | `#FFC53D` |
| Trail | `#8C5A2B` (edge `#6B4220`), un-travelled route `#D2BE9B` |
| 1 Informational | `#0E8F91` on `#DCF0EE` |
| 2 Navigational | `#6A3FD1` on `#E7DFFB` |
| 3 Commercial | `#CC1D63` on `#FBDDE9` |
| 4 Transactional | `#B07000` on `#FBEACA` |
| 5 Local | `#217A45` on `#DCF0E1` |

Type: **Avenir Next Condensed** (Heavy) for the title, territory names and every figure; **Avenir Next** for body. macOS system fonts only — the file makes no network request of any kind.

## Data

Every number comes from `content-studio/research/2026-09-14/search-intent/data.json`; the `stats[]` index is written as a comment beside each string in `index.html`. Figures excluded by `notes.md` are absent: the fabricated Semrush "18.4 billion queries / 57.3% informational" claim, the Perplexity citation-density contradiction, and the widely-circulated **People Also Ask 64.9%** (stat `[25]`, excluded 2026-09-15 — its Semrush URL 404s and no Semrush page states it). The map key carries the sourced replacement instead, with its age on the cell: Semrush, *How to maximise People Also Ask opportunities*, 1,000,000 US desktop keywords, **49.37% desktop / 52.27% mobile**, published 2020-09-30. The low-confidence Datos "~30% navigational" figure is deliberately not shown — the Navigational territory says `Share of searches today: not measured` instead.

Three cells carry an honest gap, in the flag colour: navigational intent share, shopping-unit presence by intent, and (in the map key) PAA / shopping / AI citations segmented by intent.

**Not verified in this direction** — carried at the confidence the ledger assigns, not re-checked:

- `48% of SERPs · 30% on another panel` (AI Overview prevalence) — BrightEdge high / seoClarity medium, and they disagree. Shown as two numbers on purpose; `notes.md` says this figure is panel-dependent.
- `People Also Ask 49.37% desktop / 52.27% mobile` — Semrush, primary and dated, but **2020**, so it predates AI Overviews entirely; the cell is labelled `PEOPLE ALSO ASK (2020)` for that reason. Still an all-query average — PAA by intent remains flagged `not measured` in the key.
- `1.53% of pages are still ten plain blue links` — Semrush Sensor, medium confidence, secondary.
- `10.33%` navigational AI Overview presence — a note on Semrush stat `[17]`, not its headline figure.
- The Ahrefs featured-snippet collapse (15.41% → 5.53%) is in the ledger at medium confidence with an unverified URL; it is **not used** here.

## Commands

From this folder:

```sh
cd content-studio/viz/directions/05-journey-map

node export.mjs                              # posters + gif + text-fit report
node export.mjs --posters                    # posters only
node export.mjs --gif                        # gif only
node export.mjs --gif --fps 10 --colors 128  # smaller gif
```

Open it live (macOS, default browser):

```sh
open "file://$PWD/index.html?size=1080x1350"           # animating, portrait
open "file://$PWD/index.html?size=1080x1080&poster=1"  # square, settled frame
open "file://$PWD/index.html?size=640x800&t=2.2"       # seek to 2.2 s
```

`export.mjs` borrows the kit's Chrome discovery (`../../kit/export/lib/browser.mjs`) and the kit's local `gifenc` + `pngjs`. It writes only to `./exports` — nothing in `viz/kit` is touched.

### Fit checking

Every laid-out line carries `data-box="x,y,w,h"`. Before each PNG is written, the exporter compares each line's rendered ink box (cap height to descender) against that rect, against the frame, and against every other line, and refuses to pass a poster with clipped, overflowing, overlapping, or sub-11px text. Current state: 72 lines portrait / 66 square, all fitting, smallest 12px.

## Output

| File | Size |
|---|---|
| `exports/poster-1080x1350.png` | ~457 KB |
| `exports/poster-1080x1080.png` | ~395 KB |
| `exports/anim-640x800.gif` | ~212 KB — 47 frames, 11 fps, 4.25 s + 1.15 s hold, loops forever |

The GIF holds well under the 3 MB ceiling because the map is static and only the trail, the milestones, the travelling dot and the counters change; frames are delta-encoded against a single 144-colour global palette.
