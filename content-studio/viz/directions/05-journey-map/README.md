# Direction 05 — THE JOURNEY MAP

v2 — revised after Mitch's review (2026-09-22). This is the second graphic in the
blog post and a LinkedIn asset. v1 exports are kept as `exports/v1-*` for reference.

## Concept

A searcher's trail is drawn as a road winding across a bright illustrated map, passing through five coloured territories — one per search intent — each one a dense labelled region carrying an icon, a bold title and two real measurements plus a footnote. Landmarks of the results page (AI Overview, ads, organic, local pack, People Also Ask) are pulled out into a map key along the bottom, and the road ends at a dark "Journey's End" marker holding the shock stat: 68.01% of U.S. Google searches ended with no click. In the animated version the trail draws itself territory by territory, pausing a beat at each one, each region's headline figure counting up only once the trail reaches it, the 68.01% rolling last, then holding.

The spatial metaphor is doing real work: every row now reads left-to-right in both the grid and the route (1→2, 3→4, 5→end) — plain reading order, not doubled back — and a short dogleg jog carries the trail from the right margin back to the left between rows instead of sweeping a row backwards. Numbered milestones and direction chevrons still make the route unambiguous.

## What changed since v1 (Mitch's review, 2026-09-22)

1. **Route order.** Territory 3 (Commercial) sat right of territory 4 (Transactional) in row two, so the grid read 1, 2, 4, 3, 5 even though the road visited them in order. Swapped the two cards (3 now left / L2, 4 now right / R2); every row is a straight left-to-right sweep now. The connecting road between rows dips into a short jog (down, across, down) so it still visits 1→2→3→4→5 in order — cards draw *after* the road (z-order), so the sliver of jog that passes behind a card's top edge is simply hidden under it. Numbered pips and chevrons are unchanged code paths; they just follow the new geometry automatically.
2. **Pacing.** The trail draws roughly 2× slower than v1 and now holds for a beat (~0.7 s) as it crosses into each territory, on top of the slower draw — a piecewise schedule of eased "move" segments and flat "hold" segments (see `PAUSE`/`SEGS` in `index.html`), built from the milestones' real positions along the finished road so it stays correct regardless of route geometry. One full rendering (draw + pauses + destination roll) is **10.98 s**, up from v1's 4.25 s.
3. **Interactivity.** Territories are real, keyboard-reachable `<a>` elements (Tab order = 1→2→3→4→5; Enter/click both fire). A prompt — "Click a territory to jump to its section." — sits above the map in the live page only (hidden in `?poster=1` / `?gif=1` exports). Clicking or calling `window.VIZ.selectIntent(slug)` highlights that territory and posts `{type:'viz-intent', intent:slug}` to `window.parent`, plus every territory carries a `target="_top"` fallback link to `<parentUrl>#intent-<slug>` for hosts that don't listen for the message. `prefers-reduced-motion: reduce` skips straight to the settled frame; otherwise the live page plays one slowed draw on load, then holds — it no longer loops forever on its own.
4. **2× poster.** Added `exports/poster-2160x2700.png` (same portrait layout, twice the pixels). Every figure still traces to `data.json`; nothing added or dropped in the swap. Raised the text-size floor from ~9–11px to 12px everywhere, and to 14px wherever it still fit (see Fit checking).

## What is on it

- **Prompt** (live page only) — "Click a territory to jump to its section."
- **Title bar** — one loud takeaway, the headline stat in the subline.
- **Start marker** — the search box, labelled with the largest sample in the ledger (5.47M queries / 53 brands / 2.43B impressions, Seer).
- **5 territories** — Informational, Navigational, Commercial, Transactional, Local. Each: number disc, name, icon, two measured figures with labels and detail lines, a footnote, a tiny publisher chip, and (live page) a keyboard-reachable click target with a highlight ring.
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
| Title bar, "not measured" flags, highlight ring | `#E8441F` |
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

## Interactive API and embedding

```
window.VIZ = {
  ready, duration, seek(t), frame(),
  selectIntent(slug)   // slug: informational | commercial | transactional | navigational | local
}
```

`selectIntent(slug)` highlights that territory and, if the page is inside an iframe,
posts a message to the parent. A real click or Enter-key on a territory does the
same thing, and — being a plain `<a href target="_top">` — also carries the native
browser fallback if nothing is listening for the message.

**Embed** (pass `parent` so the fallback link points at the actual post, and give the
frame room — the live page is naturally taller than the poster's pixel size because
of the prompt banner):

```html
<iframe
  src="/viz/directions/05-journey-map/index.html?size=640x800&parent=https%3A%2F%2Fmitchjmiller.com%2Fblog%2Fsearch-intent"
  width="640" height="860" style="border:0" loading="lazy"
  title="The Journey Map — search results by intent"></iframe>
```

**Listener** (on the host page, to react to a click instead of relying on the
fallback link — e.g. to scroll smoothly or expand a matching section):

```html
<script>
window.addEventListener('message', (e) => {
  if (!e.data || e.data.type !== 'viz-intent') return;
  const el = document.getElementById('intent-' + e.data.intent);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
</script>
```

If `parent` is omitted, the fallback link falls back in turn to `document.referrer`,
then to a same-page `#intent-<slug>` anchor — harmless, but less useful for a host
that never sets referrer (common for `file://`, and some cross-origin policies).

Without `?poster=1` / `?gif=1` / `?static=1`, the live page auto-plays one slowed
draw on load and then holds (it does not loop). `prefers-reduced-motion: reduce`
skips the draw and renders the settled frame immediately. Territories are in the
normal Tab order; Enter or Space activates the focused one exactly like a click.

## Commands

From this folder:

```sh
cd content-studio/viz/directions/05-journey-map

node export.mjs                              # posters + gif + text-fit report
node export.mjs --posters                    # posters only (now 3: 1080x1350, 1080x1080, 2160x2700)
node export.mjs --gif                        # gif only
node export.mjs --gif --fps 10 --colors 128  # smaller gif
node export.mjs --gif --reps 1 --final-hold 1500   # a single rendering, no long hold — for quick previews
```

Open it live (macOS, default browser):

```sh
open "file://$PWD/index.html?size=1080x1350"                      # animating, portrait
open "file://$PWD/index.html?size=1080x1080&poster=1"             # square, settled frame
open "file://$PWD/index.html?size=640x800&t=2.2"                  # seek to 2.2 s
open "file://$PWD/index.html?size=640x800&parent=https%3A%2F%2Fexample.com%2Fpost"  # test the click fallback
```

`export.mjs` borrows the kit's Chrome discovery (`../../kit/export/lib/browser.mjs`) and the kit's local `gifenc` + `pngjs`. It writes only to `./exports` — nothing in `viz/kit` is touched.

### Fit checking

Every laid-out line carries `data-box="x,y,w,h"`. Before each PNG is written, the exporter compares each line's rendered ink box (cap height to descender) against that rect, against the frame, and against every other line, and refuses to pass a poster with clipped, overflowing, overlapping, or sub-11px text. Current state: 72 lines portrait / 66 square, all fitting, smallest **12px** (floor raised from v1's ~9–11px; most labels, details, footnotes and the legend now sit at 14px — the exceptions are the square-mode combined legend line and the small per-card source citations, which stay at a 12px floor because 14px doesn't fit their boxes).

## Output

| File | Size |
|---|---|
| `exports/poster-1080x1350.png` | ~459 KB |
| `exports/poster-1080x1080.png` | ~395 KB |
| `exports/poster-2160x2700.png` | ~954 KB (new — 2× portrait) |
| `exports/anim-640x800.gif` | ~847 KB — 363 frames (121 × 3 renderings), 11 fps, GIF89a + NETSCAPE loop |
| `exports/v1-poster-1080x1350.png`, `v1-poster-1080x1080.png`, `v1-anim-640x800.gif` | Mitch's approved v1, kept for reference |

The GIF holds well under the 3 MB ceiling: three complete renderings are written
back-to-back re-using the same captured/quantised frames (no extra screenshots),
each ending on a **~1.5 s** settled hold, except the third, which holds on the final
frame for **50 s** (one frame, delay = 5009 centiseconds) before the GIF's own
NETSCAPE loop (`repeat: 0`) starts it over. Per-frame delay is 9 centiseconds
(~11 fps, within the 10–12 fps ask). Verified by parsing the file's Graphic Control
Extension blocks directly rather than trusting the encoder.

## Verified this pass

- All three posters pass the automated fit-checker (no clipped/overflowing/overlapping text) and were opened and visually reviewed — correct 1→2 / 3→4 / 5 reading order, road/jog doesn't visibly cross any card.
- GIF89a header, `NETSCAPE2.0` loop extension, 363-frame count, ~1.5 s holds at frames 121/242, 50.09 s hold at the final frame — confirmed by parsing the file's own bytes.
- Headless Chrome: territory `<a>`s are in the Tab order (1→2→3→4→5); Enter and a real mouse click both post `{type:'viz-intent', intent:<slug>}` to the parent, highlight only the clicked territory, and land the fallback navigation on `<parentUrl>#intent-<slug>`; `selectIntent()` accepts exactly the five spec'd slugs and rejects anything else; the prompt renders in the live page and is absent under `?poster=1` and `?gif=1`; `prefers-reduced-motion` renders the fully-settled frame (destination counter at `68.01%`) with no animation.

## Not verified

- **Cross-browser.** Everything above was driven through the same headless Chrome the exporter itself uses (per the "no servers, verify in headless Chrome" brief). Safari/Firefox SVG-`<a>` focus and `postMessage` behaviour weren't checked.
- **`document.referrer` fallback in a real https embed.** Confirmed the code path and its safe empty-string degradation, but `file://`-to-`file://` iframes in this test harness never populate `document.referrer` (a Chrome/file: limitation, not an artifact bug) — the `?parent=` param path is fully verified and is the recommended way to embed regardless.
- **The 50 s hold at real-world playback speed.** Confirmed at the byte level (delay field = 5009 centiseconds) and by summing all delays (≈85.7 s total loop length); did not sit and watch a real 85-second wall-clock loop in a browser tab.
- **GIF file-size / visual behaviour in non-Chrome viewers** (e.g., how iOS Messages or Slack's GIF preview handle a single ~50 s-delay frame) — untested outside Chrome.
