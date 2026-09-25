# Growth title market — data mandala (final, 2026-09-24)

Ten growth, SEO and AI-search job titles as a rose window. **The ten titles are the sectors;
three rings, read from the crown inward, are the measurements; the hub is the headline.**
Rebuilt in the 01-data-mandala visual language (`../../directions/01-data-mandala/`) after the
kit dashboard version (`../../growth-title-market/`) was rejected on looks. The data, its
exclusions and the panel/sources ideas carry over unchanged; every number is re-derived from
the ledger by `build-data.mjs`.

One file is the poster source, the GIF source and the living blog embed (`?poster=1` / `?t=`
switch it to poster mode).

## What the wheel encodes

| part | encodes | scale / mark |
|---|---|---|
| **order** | clockwise from 12 o'clock, most exact-phrase postings first (239 → 0). Head of AEO/GEO sits last, out of order: its 435 is a mentions count, not a title count | computed, not typed |
| **crown** | title name on an inset plate (one or two curved lines, never crossed) | 10 spectral hues |
| **ring 1 — postings** (outer) | medallion: exact-phrase floor over LinkedIn's placeholder (`239` over `10K+`). Band: solid blade = floor; hatched zone + dashed arc = LinkedIn's claim | log10(n+1), 1–12,000 |
| **ring 2 — pay** (middle) | medallion: spread between the lowest and highest published **median** (`3.5×`) over the two medians in $K (`102–360`). Band: range bar from one median to the other, ink caps at both ends. Never averaged | linear, $40K–$480K |
| **ring 3 — dated signal** (inner) | the trend figure the ledger has, typed: solid band = measured on the title (GTM +205%, 720 AI-search titles); hatched = whole category (+14%, +10%, +23%, 20.3% of SEO ads); dashed grey disc = **NOT MEASURED** (3 titles) or **CLAIM PULLED** (RevOps) | no bar — mixed units |
| **hub** | `0` vs `10,000+`, Growth Operations Engineer: a dashed yellow ring (the placeholder) swept all the way round, a solid ink tick at 12 o'clock (the exact count, which stays at zero) | — |
| **thin data** | the two low-confidence titles (Growth Operations Engineer, Data Engineer, Growth) are hatched and dashed in every ring and the crown, with a `THIN DATA` bracket outside the wheel | ledger `confidence: low` |

Title bar: **"0 job postings. Or 10,000+. Same title, same day, two boards."** Reading rail
(4:5 only): one straight line per title in wheel order — name · `floor vs ceiling` · `$median–$median · spread [flag]` · dated signal —
plus a legend line. Sources: one line on the art, all 21 with dates in the live drawer.

### Headline stat — why `0 vs 10,000+`

Both numbers were observed on the same day (14 Sep 2026): SimplyHired states the zero in a sentence
("We could not find any 'growth operations engineer' jobs in United States"), and LinkedIn's guest
search showed 10,000+ for the same words. The claim is about the two measurements, labelled as
exact phrase vs placeholder, so it does not depend on either being a true market size. The
alternative, Growth Engineer's `3.5×` pay spread ($101,752 ZipRecruiter vs $359,824 Glassdoor), rests on
a Glassdoor sample of 38 that the ledger itself calls an outlier, and neither page can be re-fetched
(HTTP 403). It stays on the wheel (ring 2) and in the rail, not in the hub.

## Data

`node build-data.mjs --inject` reads `content-studio/research/2026-09-14/titles/data.json` and writes the
`#viz-data` block; `--check` fails if the block has drifted. Every number is computed; the authored strings
(crown line breaks, rail captions, one-line readings, which signal sits on ring 3) have their quoted figures
asserted against the ledger text, so a ledger edit that breaks a caption fails the build.

Carried over from the 2026-09-14 artifact and critic re-check, enforced in code:
- **RevOps 127% year over year — withdrawn.** Ring 3 shows `CLAIM PULLED`; the number appears nowhere in the page (build fails on `127%`).
- **Head of AEO/GEO 435 — mentions, not titles.** Grey dashed ring-1 disc reading `435 mentions`, no floor blade, held out of the order.
- **GTM Engineer growth — GTME Pulse, quoted verbatim** (Rome Thorndike, March 2026, re-checked 2026-09-14): "grew 205% year-over-year from 2024 to 2025"; "more than 3,000 open GTM Engineer roles" as of March 2026. The stale "1,400 → 3,000+" paraphrase is excluded (build fails on `1,400`).
- LinkedIn counts are shown only as placeholders; every gap is a lower bound. Pay is never averaged. No Google Trends data (the page rate-limited during research).

## Motion (the GIF)

`anim-640x800.gif` — **1.43 MB**, GIF89a, NETSCAPE loop count 0 (loops forever), **226 frames, 11 fps**
(9 cs per moving frame), 96 colours. Same pacing engine as the 01 mandala:

| stage | seconds | what moves |
|---|---|---|
| crown | 0.00 → 1.30 | ten crown wedges sweep in, plates and names fade up (0.05 s stagger) |
| **beat** | **0.70** | one frame, one long delay |
| ring 1 | 2.00 → 3.10 | outer band, floor blades grow, placeholder hatch + dashed arcs, medallions pop |
| **beat** | **0.70** | |
| ring 2 | 3.80 → 4.90 | middle band, pay range bars, medallions |
| **beat** | **0.70** | |
| ring 3 | 5.60 → 6.70 | inner band, signal medallions and the honest blanks |
| **beat** | **0.70** | |
| hub | 7.40 → 8.45 | the dashed placeholder ring sweeps 360°; the zero tick stays put |
| headline | 0.30 → 8.45 | "Or 0" climbs to "Or 10,000+" while "0 job postings" never moves |
| **settled hold** | **1.50** | one frame |
| reverse wipe | 9.95 → 10.55 | back to bare armature (renderings 1 and 2 only) |

Loop: three renderings (10.85 s, 10.85 s, 10.31 s) then **one frame held 50 s** → 82.0 s per loop
(81.8 s as encoded: 90.9 ms frames round to 9 cs). Delays read out of the file: 210 × 9 cs, 12 × 70 cs,
3 × 150 cs, 1 × 5000 cs. Assembly runs ~8.5 s including beats, the approved v2 pace (about 2× natural).

## Exports

| file | size |
|---|---|
| `poster-1080x1350.png` — 4:5 hero, with the reading rail | 785 KB |
| `poster-1080x1080.png` — square; no room for the rail at ≥14 px, so the legend moves to the footer | 642 KB |
| `poster-2160x2700.png` — the 4:5 layout at `deviceScaleFactor: 2`, for zooming | 1.78 MB |
| `anim-640x800.gif` | 1.43 MB |

## Blog embed

```html
<iframe
  src="/viz/growth-title-market/?parent=https://mj2.pro/blog/growth-title-market/"
  title="Ten job titles, two right answers: an interactive data mandala of US postings, published pay and dated signals"
  style="width:100%;max-width:1120px;height:1560px;border:0;display:block;margin:0 auto"
  loading="lazy"></iframe>
```

Put this listener on the post page. It scrolls to the section, sizes the iframe to its content, and
answers the viz so its buttons stop navigating:

```js
window.addEventListener("message", e => {
  if (e.origin !== location.origin) return;                   // the viz is served from this site
  const d = e.data || {};
  if (!/^viz-/.test(d.type || "")) return;
  e.source && e.source.postMessage({ type: "viz-host" }, e.origin);
  if (d.type === "viz-intent") {
    const id = /^(title-[a-z0-9-]+|how-to-read)$/.test(d.anchor || "") ? d.anchor : "title-" + d.intent;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  if (d.type === "viz-height" && d.height > 0)
    for (const f of document.querySelectorAll("iframe")) if (f.contentWindow === e.source) f.style.height = d.height + "px";
});
```

**Contract.** "Read the section" posts `{type:"viz-intent", intent:"<title-slug>", anchor:"<id>"}` to the
parent and is also a plain `<a target="_top" href="<parent>#<id>">`. Once the listener has answered
`viz-host`, the click scrolls by message only, so a reader on a UTM-tagged URL is never reloaded; with no
listener the link still lands on the section. `<parent>` comes from `?parent=` (http/https only), else
`document.referrer` when framed, else `https://mj2.pro/blog/growth-title-market/` (standalone pages always use it). The viz also posts `viz-hello` on load and `viz-height` whenever its content resizes.

**Anchors.** The post has per-title sections for five titles; the other five jump to the method section
instead of a missing anchor:

| title slug | anchor | section |
|---|---|---|
| `director-of-seo` | `title-director-of-seo` | The floor |
| `growth-ops-engineer` | `title-growth-ops-engineer` | The zero |
| `growth-engineer` | `title-growth-engineer` | The disagreement |
| `gtm-engineer` | `title-gtm-engineer` | The one that is actually growing |
| `head-of-aeo` | `title-head-of-aeo` | The payoff |
| `growth-marketing-manager`, `growth-strategist`, `revops-engineer`, `marketing-automation-engineer`, `growth-data-engineer` | `how-to-read` | How to read these numbers |

**Behaviour.** Prompt above the wheel: "Click a title: see what the market actually pays and posts."
On load the wheel assembles once and holds; `prefers-reduced-motion: reduce` shows the settled wheel.
Sectors are `role="button" tabindex="0"`: Tab, Enter/Space to open, Escape or Close to dismiss;
`aria-pressed` tracks the selection; the others are veiled. `?title=<slug>` opens a panel on load.
The panel: the one-line reading; **1 · postings**, every board row with its query, date, note and a
floor / placeholder tag, plus the gap; **2 · pay**, every published figure by source (low / median / high /
as of) with the floor and ceiling medians highlighted and the proxy/family/bands caveat; **3 · dated
signals** with source and date; employers; stack; definition; the section jump. Below it, the sources
drawer: method note and all 21 sources with dates, links and detail. All panel text is written with
`textContent`, never parsed as markup. API: `window.VIZ.selectTitle(slug)` (false on an unknown slug),
`.selected`, `.titles`, plus the export hooks `seek` / `seekMs` / `duration` / `settled` /
`framePlan(fps,{wipe})` / `audit()`.

## Commands

Run from this folder. Needs Node and the Chrome already on the Mac; borrows
`viz/kit/export/lib/browser.mjs` and resolves `gifenc` + `pngjs` from `viz/kit/node_modules`. Writes only
here and fails if the page touches the network.

```sh
cd content-studio/viz/final/growth-title-market
node build-data.mjs --inject   # ledger -> #viz-data (then --check to confirm no drift)
node export.mjs                # posters (1x + 2x) + verify + GIF
node export.mjs --posters      # poster-1080x1350 / 1080x1080 / 2160x2700
node export.mjs --verify       # text audit, exits 1 on any finding
node export.mjs --gif          # anim-640x800.gif (226 frames, 11 fps, 96 colours)
open "index.html?poster=1&size=1080x1350"   # frozen poster, straight off disk
open "index.html?size=640x800&t=3.10"       # any animation frame
```

## Verification, and what is not verified

`node export.mjs --verify` measures glyph ink (cap height + descenders) for every `<text>` and reports:
type under 14 px normalised to 1080 wide; any two texts touching; **any visible stroke crossing a text**
(lines, circles, rect edges and sampled paths, ignoring strokes painted under the opaque disc a text sits
on); curved crown names longer than their arc; text off the canvas. Current state:

```
verify 1080x1350: 131 text runs + 14 crown arcs · 0 under 14px · 0 overlaps · 0 line crossings · 0 arc overflows · 0 off-canvas
verify 1080x1080:  84 text runs + 14 crown arcs · 0 under 14px · 0 overlaps · 0 line crossings · 0 arc overflows · 0 off-canvas
verify 640x800 (gif canvas): 131 text runs + 14 crown arcs · 0 overlaps · 0 line crossings · 0 arc overflows · 0 off-canvas
```

Crown names use 33–93% of their arc. Rail columns are sized from the widest entry measured at each
canvas size, which is why the 640 GIF canvas (where small type sets proportionally wider) also passes.

Also checked: all three PNGs opened, the 2× poster inspected at 1:1 around the hub, the thin-data
quadrant and the Director of SEO sector; a 12-frame contact sheet of the animation; the GIF's header,
loop extension and every delay parsed out of the bytes, and its 50 s hold frame decoded. The living
version was driven in headless Chrome over a throwaway `http://localhost:5341` host page (stopped
afterwards): click, keyboard focus/Enter/Escape, `aria-pressed`, `?title=`, drawer (21 sources, all
https, `noopener`), no horizontal scroll at 390 px, zero external requests, zero console errors;
`viz-height` sized the iframe (1527 → 2414 with the panel open → 1527); with the listener the jump
scrolled by message and left the URL alone; with no listener the `_top` link landed on the section;
titles without a section landed on `how-to-read`. `build-data.mjs --check` passes, and the page
contains neither "127%" nor "1,400".

**Not verified:**
- **The 0 / 10,000+ pair was not re-fetched.** It is the researcher's 14 Sep 2026 observation (ledger + shock-stats #1). The critic re-fetched the same method on Director of SEO (19 / 3,000+, exact match), not this pair. Live counts move daily; the art is dated 14 Sep 2026 throughout.
- **ZipRecruiter and Glassdoor pay figures** (including Growth Engineer's $101,752 / $359,824) return HTTP 403 to every automated fetch; never independently re-checked. The live drawer says so on both source entries.
- **Ring 3 category figures** (+14% Kalungi/Robert Half synthesis, ~+10% Robert Half, ~+23% JobsPikr, and SearchForHire's 12.2% → 20.3%) are ledger values, not re-fetched. The critic re-fetched SearchForHire's 720 / 28% / 20.5% figures and GTME Pulse's 205% quote, not these.
- **The site embed.** Nothing was copied to `public/`, built or deployed; the listener has not run on mj2.pro, and the post template's ability to host it is untested.
- **Real-client playback and phone reading.** GIF delays were read from the file, not watched in LinkedIn / Slack / Safari (clients that clamp long delays shorten the 50 s hold, not the loop). At phone width the SVG type is ~5 px; the HTML panel is the phone-readable layer.
- **Nothing was committed.** No git, no site build, no servers left running.

## Files

`index.html` (living version + poster/GIF source, data embedded) · `build-data.mjs` (ledger → data) ·
`export.mjs` (posters, audit, GIF) · `poster-1080x1350.png` · `poster-1080x1080.png` ·
`poster-2160x2700.png` · `anim-640x800.gif` · this README.
