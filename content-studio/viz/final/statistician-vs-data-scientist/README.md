# Two Roads Into Data: statistician vs data scientist (journey map)

Final graphic for `content-studio/drafts/2026-09-14-statistician-vs-data-scientist.{blog,linkedin}.md`, rebuilt on 2026-09-24 in the journey-map language Mitch picked (`../../directions/05-journey-map/`, v2). It replaces the rejected kit dashboard at `../../statistician-vs-data-scientist/`. The data is unchanged; the look is new. That folder stays in place as the old version and should not be published.

## Concept

One trailhead, "a career in data", has four exits. **Two paved roads**, statistician (SOC 15-2041) on the left and data scientist (SOC 15-2051) on the right, fork below the trailhead, run the outer channels and pass the same **five stops**: education gate, pay, employment & growth, tools, and live postings. Each stop is a colour-coded territory split down the middle, with the statistician half on the left and the data scientist half on the right. The roads meet at a dark **journey's end** that states the practice difference in one line each: *prove why* (inference) vs *predict what next* (prediction), citing Yardstick and Indeed Career Advice. **Growth engineer and AI engineer** leave the same trailhead as **dashed side paths** that end at red "NO BLS CODE" signposts. They never reach a stop because there is no BLS data to stop at. They carry only job-board counts, and the lead figure is AI engineer's **1,985 Wellfound remote listings vs 161 for data scientist** (12.3×). The title bar carries the shock stat: **2 of 4 data job titles don't officially exist to the U.S. government.**

Cells: 5 stops (10 halves), 2 signposts, journey's end and a 6-entry map key. A one-line source strip runs along the bottom, and the live page adds a sources drawer.

## Data (all from `content-studio/research/2026-09-14/roles/data.json`; ledger path beside each figure in `index.html`)

| Stop | Statistician | Data scientist | Product / scope |
|---|---|---|---|
| Education gate | 62% master's; 10% doctoral, 14% bachelor's; BLS typical entry: master's | 48% bachelor's / 44% master's; BLS typical entry: bachelor's | O*NET 15-2041.00 / 15-2051.00; BLS OOH |
| Pay | $105,650 median; **$167,180 in computer systems design** (the flip, ~$35K above DS there) | $120,230 median; $132,380 in computer systems design | BLS OOH pages (Pay tab, May 2025 wages). Not OEWS Table 1, per critic B |
| Pay, surveys | — | $82,910 global · $160,000 US-only, shown side by side, **not averaged** | Stack Overflow 2025 + techrecruiting.io US re-cut |
| Employment & growth | +11% 2025–35; 31,300 employed (OOH) · 29,030 (OEWS) | +35% (more than 3× the statistician rate); 275,600 (OOH) · 262,440 (OEWS) | OOH vs OEWS are different BLS products, **both shown, labelled** |
| Tools | SPSS · SAS · Minitab · MATLAB | TensorFlow · Spark · Kubernetes | O*NET primary tools. Survey strip: Python 57.9% (+7 pts), SQL 58.6%, R 4.9% of 31,771 SO 2025 respondents of every role (not per-role figures) |
| Live postings, 2026-09-14 | Indeed 1,000 (rounded bucket) · Built In 2 (exact) · Wellfound: no role page | Indeed: no count displayed · Built In 32 · Wellfound 161 (remote-only) | Board methods on the map; Built In skewed to Binance/APAC that day |
| Side paths, no BLS code | Growth engineer: Indeed 50 (rounded) · Built In 3 · Wellfound: no role page | AI engineer: Wellfound 1,985 remote (vs 161 DS) · Built In 103 · Indeed 3,000 (rounded) | Job boards only |

The only derived figures are the ledger's own shock-stat wording: "more than 3×" (#1), "~$35K" (#2) and "12.3×" (#3). An automated pass pulled every number out of the settled poster, the drawer and the screen-reader summary and matched each one to a literal in `data.json` or `shock-stats.md`. There were no orphans. "Not measured" style gaps are spelled out ("no role page", "no count displayed").

## Palette and type

It matches direction 05: paper `#FBF3E4` ground, posterised terrain, ink `#17120F`, gold `#FFC53D` chevrons and accents, brown trail `#8C5A2B`, a dark journey's end with a gold burst. The title bar is `#B22F16`, with a lighter gold `#FFE594` for the eyebrow. It was darkened on 2026-09-24 for WCAG AA. Measured worst case, including the 5% white stripes, the eyebrow is 4.69:1, the cream lines and sub-line are 5.29:1 or better, and the `#FFC53D` "2 OF 4" numeral is 4.02:1 (large text). The previous `#C9361A` bar measured 3.07:1 for the eyebrow and 4.40:1 for the sub-line over the stripes. A second pass the same day cleared every other small line:
- Muted text went from `#6E6055` to `#5E5249`.
- Red text and chips went from `#C9361A` to `#A82D12`.
- The signpost hatching was lightened from 16% to 8%.
- Postings board counts use a deeper `#A3164E`.
- The decorative rings are masked out from under every text line. The holes fade in with the text, so empty stops keep whole rings during the draw.

No text was resized. Stop colours: education `#6A3FD1`, pay `#217A45`, growth `#0B7A7C`, tools `#9A6300`, postings `#CC1D63`. Teal and amber were darkened from 05 so the 14px white header tags clear 4.5:1. Type is Avenir Next Condensed Heavy for figures and titles and Avenir Next for body text. Both are macOS system fonts, so the page makes no network request.

## Click contract (live page) and embed

Every stop is a keyboard-reachable `<a target="_top">`. A click, Enter or Space highlights it and posts `{ type: 'viz-intent', intent: '<section>', stop: '<stop>' }` to `window.parent`. The link itself is the fallback, pointing to `<parent>#role-<section>`. `<section>` always names an anchor that exists in the blog draft:

| Stop | `intent` → anchor | Blog section |
|---|---|---|
| growth-engineer, ai-engineer | `no-bls-code` → `#role-no-bls-code` | The gap in the data |
| education | `education` | The education gate |
| pay | `pay` | What each role pays |
| growth | `growth` | Who's growing faster |
| tools, postings | `methods` | How to read these numbers (neither has its own section yet) |
| journey's end | `practice` | Prove why, or predict what's next |

A prompt bar appears on the live page only: "Click a stop on either road to jump to its section." On hover or focus it changes to "Read the section: <stop> →", and a Sources button opens the drawer (Escape closes it). `?parent=` accepts only http(s)/file URLs. Without a usable `?parent=`, a framed page uses `document.referrer` (the embedding page). A page opened on its own, such as a click from the LinkedIn link, sends every stop to `https://mj2.pro/blog/statistician-vs-data-scientist/#role-<section>` (`STANDALONE_PARENT` in `index.html`). It never uses a top-level referrer, which would be LinkedIn or Google. With no `?size=` the page is fluid and fits whatever frame it is given. `prefers-reduced-motion` gets the settled frame. `window.VIZ = { ready, duration, schedule, seek(t), frame(), selectIntent(slug), stops }`.

```html
<iframe src="/viz/statistician-vs-data-scientist/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fstatistician-vs-data-scientist%2F"
        title="Two roads into data: statistician vs data scientist journey map" loading="lazy"
        style="display:block;width:100%;aspect-ratio:1080/1410;border:0;border-radius:10px;background:#FBF3E4"></iframe>
```

The host listener belongs in the page shell, because the post body does not run scripts:

```html
<script>
  (function () {
    var ALLOWED = ['https://mj2.pro'];
    window.addEventListener('message', function (e) {
      if (ALLOWED.indexOf(e.origin) === -1 || !e.data || e.data.type !== 'viz-intent') return;
      var el = document.getElementById('role-' + e.data.intent);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#role-' + e.data.intent);
    });
  })();
</script>
```

The message type matches the search-intent maps (`viz-intent`), so one listener can serve both. It needs the prefix mapped per post (`intent-` there, `role-` here), or a data attribute on the iframe.

## Motion and GIF timing

Pacing follows Mitch's 2026-09-22 rule. Drawing runs about 2× slower than natural, with a 0.7 s beat on arrival. First the dashed side paths run out to their signposts (0.15–0.95 s), a beat passes, and the signpost counters roll (1,985). Then both roads draw together from 1.65 s and stop for a beat at each of the five stops: 4.15 s, 5.63 s, 7.11 s, 8.49 s and 9.95 s. The fork leg is capped at 2.5 s so the first figure arrives sooner. A stop's figures appear and count up only once its road arrives, so an un-rolled counter never reads as a zero. The flip highlight sweeps in behind $167,180. The roads end at 11.77 s, and journey's end resolves by about 12.7 s. **One rendering takes 13.02 s.**

`anim-640x800.gif`: 11 fps (90 ms frames), 143 frames per rendering × 3 = 429 frames. It holds **1.59 s** after renderings 1 and 2, then **50.09 s** on the final frame after rendering 3, before the NETSCAPE loop (`loop=0`) restarts it. The full loop runs **91.6 s**. These values come from parsing the file's own Graphic Control Extension bytes (`export.mjs` prints them) and were cross-checked with PIL.

## Output

| File | Size |
|---|---|
| `poster-1080x1350.png` | 390 KB |
| `poster-1080x1080.png` | 332 KB |
| `poster-2160x2700.png` | 826 KB (2× portrait, for zoom) |
| `anim-640x800.gif` | 1.25 MB (ceiling 3 MB) |
| `index.html` | live page, self-contained |

Copy `index.html` and the PNG/GIF files to `public/viz/statistician-vs-data-scientist/`. `export.mjs` and this README are source files and should not be published.

## Commands

```sh
cd content-studio/viz/final/statistician-vs-data-scientist
node export.mjs                 # 3 posters + gif; each poster gated by the text audit
node export.mjs --posters --verbose   # also lists every line under 14px
node export.mjs --gif --reps 1 --final-hold 1500   # quick single-rendering preview
node export.mjs --interaction   # headless click/keyboard/fallback/drawer/mode checks
open "file://$PWD/index.html?parent=https%3A%2F%2Fexample.com%2Fpost"   # live, fluid
open "file://$PWD/index.html?size=1080x1350&poster=1"                   # settled poster
```

It borrows the kit's Chrome harness plus its `gifenc`/`pngjs` (`../../kit`) and writes nothing there.

**Text audit (every poster).** Each line carries `data-box`. The audit reads the real ink box, taking horizontal extent from `getBBox()` and vertical extent from the font's glyph metrics (`measureText`). It fails the poster if a line leaves its box, touches the frame, overlaps another line, sits under a road, side path or pip, or falls below 12px. Lines within 2px of a neighbour are listed. Current state: 116 lines per poster and 0 problems. Portrait and 2×: smallest 12.5px, and the only line under 14px is the source strip. Square: smallest 12px, with 67 lines at 12–13.5px, because 14px does not fit the square's height with the same content. All three PNGs were opened and reviewed by eye.

**Contrast audit (every poster, gating).** This is measured, not computed from hex pairs. The audit hides all text, screenshots the background, and keeps the worst WCAG ratio over every pixel inside each line's ink box, so rings, hatching, stripes and highlights under a line all count. It gates every line on every poster, and any miss blocks the export. Title-bar lines need 4.5:1, except the display numeral, which needs 3:1. Everywhere else the WCAG AA rule applies: 4.5:1, or 3:1 for large text (at least 24px, or 18.66px at weight 700+).

Current state: all 116 lines pass on all three posters. Worst normal-size ratio per poster:
- Portrait and 2×: 4.69:1, the title-bar eyebrow.
- Square: 4.62:1, "Primary tools · O*NET 15-2041". Its darkest sampled pixel is the thin rule about 1px below its descenders; on its tint alone it measures about 6.3:1.

Worst large-size ratio on all three posters: 3.38:1, the green `$167,180` on its gold highlight, which passes the 3:1 large-text threshold. Nine large-text lines sit between 3.38:1 and 4.47:1: the stop figures and tool names in their stop colours, and the "2 OF 4" numeral. `--verbose` lists them.

## Verified (2026-09-24, headless Chrome)

- Text audit clean on all three posters. The contrast gate passes on every line of all three posters, measured. Worst normal-size: 4.69:1 on portrait and 2×, 4.62:1 on square. Worst large-size: 3.38:1. The eyebrow was 3.07:1 and the sub-line 4.40:1 before this pass. Data audit: every number traces to the ledger.
- Interaction 25/25: 8 stops; every fallback href equals `parent#role-<section>` with `target=_top`. Tab order runs Sources, GE, AI, stops 1–5, journey's end. Real mouse clicks on all 8 post the right `{intent, stop}` and land the parent on the right hash, and so do Enter and Space. `selectIntent` accepts stops and sections and rejects anything else. The prompt swaps on hover. The drawer opens with focus on its heading, and Escape closes it with focus returning to the button. The prompt bar is hidden under `?poster=1` and `?gif=1`. Reduced motion shows the settled frame. A `javascript:` parent is refused. Opened standalone, every stop links to the post section. No page errors and zero network requests.
- Fluid live page at 700×905 and 360×470: no horizontal scroll, and the map letterboxes to fit.
- GIF structure (GIF89a, 429 frames, loop 0, holds) was confirmed from its bytes and with PIL.

## Not verified

- Safari and Firefox: SVG `<a>` focus, the Space handler and `postMessage` were driven in headless Chrome only.
- A real https embed on mj2.pro, including `document.referrer` fallback and whether the host listener's origin check is right. Only the `?parent=` path was exercised, through a `file://` harness.
- GIF playback of the 50 s hold in LinkedIn, Slack and iOS viewers. The bytes are correct, but I did not watch a real 91.6 s loop.
- Legibility of the 12px text at phone width inside a 360px iframe, where the map scales to about 30%.
- Contrast in the GIF, where palette quantisation may shift colours slightly. It was measured on the PNG posters only.
- Ledger figures were carried at the ledger's stated confidence and not re-fetched today. Job-board counts are a 2026-09-14 snapshot. The $160,000 US figure is a secondary re-cut. O*NET education shares do not sum to 100.
