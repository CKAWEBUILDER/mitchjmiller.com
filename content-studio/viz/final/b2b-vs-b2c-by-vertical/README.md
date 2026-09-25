# B2B vs B2C by vertical — the fractal stack (final, 2026-09-24)

The rejected dashboard build (`viz/b2b-vs-b2c-by-vertical/`, kit-based) is rebuilt in the
language Mitch picked, direction 02 (`viz/directions/02-fractal-stack/`): paper ground, acid
title bar, nested cells with one grammar at every depth, routed wires measured after layout,
and the 12-fold rosette. The old build's data, funnel-stage discipline and interaction ideas
carry over; its look does not. The old folder is untouched and kept for reference.

One file (`index.html`) is the poster source, the GIF source and the living version.

## The three depths

| Depth | Cell(s) | What it shows |
|---|---|---|
| 1 | **Acquiring one customer** | The headline: Education, B2B **$1,143** vs B2C **$156**, **7.3×**. First Page Sage B2B edition (published 2026-01-26) and B2C edition (2025-07-03), blended organic + paid CAC. |
| 2 | **Ten verticals**, ranked by the gap | Each cell: B2B and B2C side by side on one shared CAC scale ($0–$1,143), the ratio, and which sub-industries were paired. Order: Education 7.3×, Financial services 4.9×, Real estate 4.8×, Travel & hospitality 3.0×, Professional services 2.3×, SaaS 1.4×, Ecommerce 1.3×, then the three with no ratio: Healthcare (no B2B category), Manufacturing (no B2C category), Nonprofit (in neither report). |
| 3 | **What else was measured inside the open vertical** | Landing-page conversion, site conversion, paid search (click-through / cost per click / cost per lead), sales cycle, touchpoints, email click rate, review reliance — each labelled with its funnel stage and drawn on its own scale. |

Level 3 is grouped by what the sources can actually say, and each group hangs from one bar:

- **Split by segment** (blue B2B lane, orange B2C lane) — only where a source is segment-specific
  (sales cycle, review reliance). The B2C lane of both is an honest "no source".
- **One figure — the source does not split B2B/B2C** — rendered once, as the group bar; the cells
  under it carry one bar in their funnel-stage colour instead of two lanes. The audit fails if the
  phrase appears more than once on the page.
- **No source — a gap, not a zero** — hatched stamps, never a 0. Each says why (4:5 and live).
- **Touchpoints** hang from level 1, not from the vertical: no publisher splits them by vertical,
  so their wire comes from the root, like the NOT MEASURED cell in direction 02.

The static posters open Education. The lit path (yellow-cored wire) runs root → open vertical →
its level-3 groups as one tree; every other wire is plain ink.

## Encoding

| Mark | Meaning |
|---|---|
| Blue `#1B3BEF` lane · orange `#E25700` lane | B2B · B2C. Validated with the dataviz skill's validator: CVD ΔE 34.1 (protan), normal-vision ΔE 44.8, both ≥ 3:1 on paper. |
| Strip colour (level 3) | Funnel stage: orchid `#B5419A` before the site (research, paid search) · green `#009E73` on the site (landing page, any visit) · olive `#7A6500` nurture (email) · ink to a customer (CAC, sales cycle, touchpoints). Stage is also written in every strip, so colour is never the only cue. |
| Yellow strip, "▼ open" | The vertical whose level 3 is showing. |
| Hatch | No source. |
| Bars | One scale per metric. Levels 1–2 share the CAC scale (one metric, one method). Each level-3 bar is the value divided by the highest of the ten verticals for that metric (click-through 9.83%, cost per click $9.87, cost per lead $131.63, landing page 8.4%, site 7.6%, email 4.9%, cycle 195 d, reviews 100%, touchpoints 60). No two metrics share an axis. |
| ▪ / ▪▪ / ▪▪▪ | Depth 1 / 2 / 3. |

Contrast (`export.mjs`, 34 text pairs): all ≥ 4.5:1, minimum **4.81:1**. Non-text marks
minimum **3.04:1** (B2C bar on its track), every mark sits beside its printed value.

## Data

Every figure comes from `content-studio/research/2026-09-14/b2b-b2c/` as curated in the first
build and corrected by critic C (`routines/runs/2026-09-14-critic-C.md`).

| Vertical | B2B CAC (sub-industry) | B2C CAC (sub-industry) | Level 3 inside it |
|---|---|---|---|
| Education | $1,143 (Education) | $156 (Higher Education & College) | Paid 7.56% / $4.81 / $77.48 · site 6.3% · email 3.02% · no source: reviews, landing page, cycle |
| Financial services | $784 | $160 | Paid 9.83% / $3.39 / $74.44 · landing 8.4% (lower confidence) · site 6.3% · email 2.78% · cycle B2B 195 d (sources disagree 2×) |
| Real estate | $791 | $165 | Paid 7.61% / $3.22 / $102.51 · site 2.8% |
| Travel & hospitality | $683 (Aviation) | $228 (Hotels & Resorts) | Paid 9.32% / $2.14 / $44.70 · site 1.9% |
| Professional services | $749 (Legal) | $323 (Legal) | Paid 5.87% / $9.87 / $131.63 · landing 6.1% · site 6.1% · email 4.9% (lower confidence) |
| SaaS & software | $239 (B2B SaaS) | $166 (SaaS) | Landing 3.8% · site 7.6% · cycle B2B 60 d · reviews B2B 86% |
| Ecommerce & retail | $86 (wholesale / B2B ordering) | $66 | Paid 8.28% / $4.14 / $49.40 · landing 4.2% · site 2.4% · email 1.74% · cycle B2B 70 d |
| Healthcare | no source | $148 (Medical Practices) | Paid 6.61% / $4.76 / $40.04 · site 2.3% |
| Manufacturing & industrial | $723 | no source | Site 4.9% (Construction & Engineering proxy) |
| Nonprofit | no source | no source | Site 1.6% (M+R donations, different method) · email 3.27% · cycle B2B 162 d |

Touchpoints (all ten): B2B 27–417 by deal size, 60 shown as a mid-range count; B2C about 6.

Ratios are arithmetic on ledger values: 1143/156 = 7.33, 784/160 = 4.90, 791/165 = 4.79,
683/228 = 3.00, 749/323 = 2.32, 239/166 = 1.44, 86/66 = 1.30.

Held to the ledger's rules:

- "Conversion rate" is three funnel stages (landing page, whole site, paid click → lead); they sit
  in separate cells with separate scales.
- Open rates are out (Apple Mail Privacy Protection; publishers disagree ~2×); click rate only.
- AI-referral 14.2% is out (low confidence, paper not confirmed).
- G2's unverified 92% is out; review reliance is G2's 2021 survey, 86%, via DemandGen Report.
- The 13× figure is B2B to B2B ($1,143 Education vs $86 wholesale). It appears only in the
  Ecommerce panel note in the living version, labelled that way; never as a B2B-vs-B2C gap.
- The disputed "1.1% B2B SaaS" and ">10% free-trial" landing-page figures are out.
- Promodo's 4.7% real-estate figure is visitor → lead, a different stage; named, not charted.
- Alternates not charted: B2B Commercial Insurance $593, B2B Business Consulting $533, B2C Medical
  Device $129, WordStream Dentists and Apparel categories.

## Files

```
index.html              self-contained, no network, no build step
export.mjs              contrast + posters + audits + GIF + live round trip
poster-1080x1350.png    LinkedIn portrait, Education open          360 KB
poster-1080x1080.png    LinkedIn square, Education open            287 KB
poster-2160x2700.png    the 4:5 at 2× for zooming                  758 KB
anim-640x800.gif        248 frames, 80.0 s loop, forever           2.62 MB
```

## Layout notes

- 4:5 carries everything. The **square** drops two text layers to keep every line legible: the
  root's caveat line (the Education cell still reads "vs consumer higher-ed") and the one-line
  "why" under each no-source stamp. Stamps, group bars and all numbers stay.
- The living version grows its frame when a vertical's level 3 needs more room (financial
  services is tallest at 1,471 px); stills are fixed at 1350/1080 and only ever show Education.

## Motion (the GIF)

One rendering, against direction 02's natural pace:

| Stage | Seconds | Direction 02 took |
|---|---|---|
| Level 1: lift, count $0 → $1,143 / $156, 0 → 7.3× | 0.00–1.60 | 0.08–0.95 |
| **Beat** | **0.70** (one frame) | none |
| Subdivide into ten verticals: wires 0.8 s, cells staggered 0.11 s | 2.30–4.70 | ~1.3 s |
| **Beat** | **0.70** | none |
| Education lights up; the lit trunk draws; group bars; seven cells, staggered 0.10 s | 5.40–7.90 | ~1.3 s |
| Settled hold | **1.50** (one frame) | |
| Wipe back to the bare stack | 9.40–10.00 | |

The GIF opens on the finished poster (what previews and thumbnails show) for 1.5 s, wipes, plays
three renderings (each ending on its 1.5 s hold), then rests on the poster for 48.5 s, which runs
into the 1.5 s opening frame: a 50 s still between the last hold and the next wipe. Read back
from the file: GIF89a, 640×800, loop count 0, **248 frames, 80.03 s per loop**, delays 9 cs ×237
(11.1 fps moving frames), 70 cs ×6 (beats), 150 cs ×4 (holds), 4,850 cs ×1, 128 colours,
**2.62 MB**. The rosette turns 1/12 of a revolution per rendering during motion only, so every
loop is seamless and the long still costs one frame.

## Living version

```html
<iframe
  src="/viz/b2b-vs-b2c-by-vertical/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fb2b-vs-b2c-by-vertical%2F"
  title="B2B vs B2C by vertical — the cost to win one customer, ten verticals, three depths"
  style="display:block;width:100%;height:2150px;border:0" loading="lazy"></iframe>
```

Measured page height (drawer closed): 1,930–2,370 px across the ten verticals at 390–900 px wide;
2,036–2,136 px for the default (Education). 2,150 px fits Education up to a 900 px column; the
`viz-height` message below makes it exact.

- Prompt above the stack: **"Click a vertical: see what it costs to win a customer on each side."**
- Level-2 cells are buttons (`role="button"`, `tabindex="0"`, `aria-pressed`; Enter/Space). A
  click lights the vertical, redraws the lit trunk and re-subdivides level 3 (≈1.9 s; instant
  under `prefers-reduced-motion` or `?motion=reduce`). A polite live region announces it.
- Below the stack, a text panel restates the open vertical (sub-industries, organic/paid split,
  caveats, every level-3 figure with its source) and ends in **"Read the <vertical> section ↓"**:
  it posts `{type:"viz-intent", intent:"<vertical-slug>"}` to the parent **and** is an
  `<a target="_top">` to `<parent>#vertical-<slug>`, so it works without a listener.
- `<parent>` = `?parent=` only when it is `https://mj2.pro` (or `www.`) or a local test host
  (`http://localhost` / `http://127.0.0.1`); anything else, and every standalone view, falls back
  to `https://mj2.pro/blog/b2b-vs-b2c-by-vertical/`. `document.referrer` is never read, so a reader
  who arrives from LinkedIn is never sent back there. Slugs: `education`, `financial-services`,
  `real-estate`, `travel-hospitality`, `professional-services`, `saas-software`,
  `ecommerce-retail`, `healthcare`, `manufacturing-industrial`, `nonprofit`; the blog draft's
  "By vertical" section carries the matching `<h3 id="vertical-<slug>">` anchors.
- It also posts `{type:"viz-height", height}` on load, selection, resize and drawer toggle, for
  an optional auto-height listener.
- Sources: one tiny line on the face, and a **"Sources, dates and method"** drawer with every
  publisher, date, sample, use and link.
- The assembly starts when the frame is 25% in view; a click during it settles it first.

Parent listener (page shell, not the markdown body):

```js
addEventListener('message', e => {
  if (e.origin !== 'https://mj2.pro' || !e.data) return;
  if (e.data.type === 'viz-intent') {
    const t = document.getElementById('vertical-' + e.data.intent);
    if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', '#vertical-' + e.data.intent); }
  }
  if (e.data.type === 'viz-height') {
    const f = document.querySelector('iframe[src^="/viz/b2b-vs-b2c-by-vertical/"]');
    if (f) f.style.height = e.data.height + 'px';
  }
});
```

`window.VIZ`: `ready`, `duration`, `settled`, `seek(t)`, `framePlan(fps,{wipe})`,
`select(slug,{instant,force})`, `selected`, `verticals`, `audit()`.
Params: `?poster=1`, `?t=<s>`, `?size=1080x1350|1080x1080`, `?vertical=<slug>`, `?parent=<url>`,
`?motion=reduce`.

## Commands

```sh
cd content-studio/viz/final/b2b-vs-b2c-by-vertical
node export.mjs              # everything below
node export.mjs --posters    # three PNGs, each audited
node export.mjs --verify     # type floor, clipping, overlap; all ten verticals live at 1200 and 390 px
node export.mjs --gif        # anim-640x800.gif, read back and checked
node export.mjs --live       # round trip on a throwaway 127.0.0.1:5311 server, stopped after
```

Chrome discovery and the network guard come from `../../kit/export/lib/browser.mjs`; `gifenc`
and `pngjs` from `../../kit/node_modules`. Nothing in the kit is written to.

## How it is checked, and what is not

`index.html` audits itself (`VIZ.audit()`), in the poster's own 1080-wide space: any text under
12 px fails; runs at 12–13.9 px are listed; clipping anywhere overflow is clipped; overlapping text
runs (measured with a `Range`); cells, footer and source line inside the frame; 18 cells
(1 + 10 + 7); a dated source line; the "does not split" phrase at most once.

Current results: both posters and the 2× pass with **no clipping and no overlap, minimum 12 px**.
Every caption line and cell name is ≥ 14 px on the 4:5 (square names ≥ 15.75 px). What sits at
12–13.9 px: B2B/B2C chips (12.5), strip labels (13.5), unit labels beside numbers (12–13),
per-cell source lines (12, monospace, the "tiny" sources), the footer source line (12.5). The
living version passes the same audit for all ten verticals at 1200 and 390 px wide, with no
horizontal scroll, jump links pointing at `https://mj2.pro/blog/b2b-vs-b2c-by-vertical/#vertical-<slug>`,
`aria-pressed` and the live region. The round trip passed both ways: with a listener the parent
received `{"type":"viz-intent","intent":"healthcare"}` and scrolled to `#vertical-healthcare`;
without one, `target="_top"` landed there. Opened standalone after clicking through from a
stand-in feed page (so `document.referrer` was set), and again with `?parent=` pointing at
linkedin.com, the fallback still pointed at the mj2.pro post.

**Not verified:**

- **The anchors on the real post.** The blog draft now has the ten `vertical-<slug>` ids (added
  2026-09-24, "By vertical"); the jump was verified against a test page with the same ids, not
  against the rendered post, and the site's markdown pipeline must keep raw `<h3 id>` tags.
- **The real site.** Not copied to `public/`, not built, not deployed; the listener is not in the
  page shell. The 2,150 px iframe height is measured in headless Chrome at 390–900 px, not in the
  site's real column; the page posts its real height for an auto-height listener.
- **Phones.** At 390 px the stack scales to ~0.33: the headline, ratios and B2B/B2C numbers are
  legible, level-3 detail is not; the text panel under it carries every figure. Tested in
  headless Chrome's viewport, not on a device or Safari.
- **The GIF in LinkedIn, Slack or Safari.** Delays were read out of the file, not watched; a
  client that clamps long delays shortens the still, it does not break the loop.
- **The figures themselves** were not re-fetched today; they are the ledger's, as corrected by
  critic C on 2026-09-14.
