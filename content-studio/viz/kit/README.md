# Living Infographic Kit

One source file becomes three published things: an **interactive artifact** on the blog, a
**static poster** (PNG + PDF) and an **animated GIF** for LinkedIn. Self-contained HTML, vanilla
JS, no build step, no network. Read `SPEC.md` before changing the design language.

```
content-studio/viz/kit/
  SPEC.md              visual + interaction language, palettes with measured contrast
  README.md            this file
  template.html        the artifact — copy it, replace the data JSON, ship it (64 KB)
  package.json         gifenc + pngjs, local to this folder only
  export/
    run-all.mjs        contrast → verify → poster → gif, writes exports/manifest.json
    contrast.mjs       WCAG check of every palette in the template
    verify.mjs         render checks at 1360 and 390, incl. reduced motion
    poster.mjs         PNG 1200×1500 + 1080×1080, PDF
    gif.mjs            animated GIF via deterministic frame capture
    lib/browser.mjs    Chrome discovery + puppeteer-core launch, output naming
    lib/still-check.mjs frame-integrity assertions for every still
  exports/             output (binaries git-ignored; manifest.json + verify.json tracked)
```

---

## Author workflow

### 1. Copy the template

```bash
cd content-studio/viz/kit
cp template.html ../<post-slug>.html
```

Keep working inside `content-studio/viz/`. Nothing is copied into `public/` by the kit —
publishing is a separate, deliberate step (§5).

### 2. Replace the data

Edit the one block: `<script type="application/json" id="viz-data">`. Nothing else in the file
needs to change for a normal post.

```jsonc
{
  "meta": {
    "sample": false,              // MUST be false once every number is real
    "seed": 20260914,             // any integer — fixes the mandala composition
    "palette": "aurora",          // aurora | ember | verdant  (see SPEC.md §2)
    "eyebrow": "Living infographic · AI search",
    "title": "Headline states the {lit}takeaway{/lit}, not the topic",
    "deck": "…",
    "askPrefix": "What happens to conversion in",   // the question is the control:
    "askMiddle": "when the intent is",              //   askPrefix [select] askMiddle [select] askSuffix
    "askSuffix": "?",
    "columns": { "cited": {...}, "absent": {...} }, // the two constant columns
    "hero": "cvr",                                  // which metric gets the big numeral
    "byline": "Mitchell Miller · mitchjmiller.com",
    "liveUrl": "mitchjmiller.com/artifacts/<slug>/",
    "gifNote": "Rudimentary GIF of a living artifact.",
    "gifNoteSub": "Selectors, sources and per-intent search results are in the interactive version."
  },
  "dimensions": { "vertical": {...}, "intent": {...} },  // the two selectors
  "prompts":    [ { "label": "What happens when …?", "set": { "intent": "transactional" } } ],
  "metrics":    [ { "id": "cvr", "label": "…", "note": "…", "unit": "%",
                    "decimals": 1, "better": "higher", "source": "s-ga4" } ],
  "values":     { "<vertical>": { "<intent>": { "<metric id>": [cited, absent] } } },
  "serp":       { "<vertical>": { "<intent>": { "query": "…", "note": "…", "rows": [...] } } },
  "sources":    [ { "id": "s-ga4", "label": "…", "detail": "…", "asOf": "2026-09-14", "url": "" } ]
}
```

Hard requirements — `verify.mjs` fails the run otherwise:
- every `metrics[].source` resolves to an entry in `sources[]`;
- every source has an `asOf` date;
- `values` covers every vertical × intent combination the selectors offer;
- `meta.sample` is `false` only when nothing on the artifact is invented.

`metrics[].unit` renders as a suffix (`%`, `d`) unless you add `"prefix": true`, which puts it
in front (`$310`). `better` decides which direction is green and whether the ratio reads
`4.6×` or `2.2× lower`.

**Mapping from the research folder.** Records under `content-studio/research/<date>/<topic>/data.json`
already carry everything a source entry needs — map them straight across:

| research field | kit field |
|---|---|
| `source` + `publisher` | `sources[].label` |
| `url` | `sources[].url` |
| `retrieved` | `sources[].asOf` |
| `note` | `sources[].detail` |
| `value` / `unit` / `vertical` / `segment` | `values[vertical][intent][metric]` and `metrics[].unit` |

Once real records replace the placeholders, set `meta.sample` to `false`.

### 3. Set seed and palette

Either in `meta`, or at the URL while you are choosing:

```
file:///…/viz/<post-slug>.html?palette=ember&seed=7781
```

Then write the pair you picked back into `meta` — the exporters read `meta`, not your browser
history. Changing the seed changes the mandala, so re-export afterwards.

### 4. Run the pipeline

```bash
cd content-studio/viz/kit
npm install                                   # once: gifenc + pngjs, local to this folder
node export/run-all.mjs --template ../<slug>/index.html
```

**Defaults follow the artifact, so you rarely pass `--out` or `--name`:**
- `--out` → `<artifact folder>/exports` (`../<slug>/exports/…`, `verify` under `…/exports/verify`).
  Running the kit against someone else's artifact never overwrites `kit/exports/`.
- `--name` → the file basename, **unless it is `index.html`, in which case the folder name is
  used**. `../<slug>/index.html` exports `<slug>-poster-1200x1500.png`, never `index-poster-*.png`.

Individual steps (all accept `--template`, `--out`, `--name`, `--vertical`, `--intent`, `--palette`, `--seed`):

```bash
node export/contrast.mjs --template ../<slug>/index.html   # WCAG check on that file's palettes
node export/contrast.mjs '#EAF2FA' '#0A1A30'               # one-off pair check
node export/verify.mjs   --template ../<slug>/index.html
node export/poster.mjs   --template ../<slug>/index.html
node export/gif.mjs      --template ../<slug>/index.html
node export/poster.mjs   --template ../<slug>/index.html --report-only   # list every bad still
```

### Still checks — why a poster can fail while verify passes

A still is laid out in a fixed frame with `overflow:hidden`, so anything that does not fit is
**silently clipped**: `document.scrollHeight` stays equal to the viewport and every live-artifact
check still passes. One real poster shipped with sources cut off the bottom and source labels
overlapping, and `verify.mjs` never saw it, because verify only inspects the interactive version.

So `poster.mjs` and `gif.mjs` now measure each still **after `fitStill()` and before writing the
file**, and abort the run naming the still and the offending element:

| Assertion | Catches |
|---|---|
| frame height / width not exceeded | document larger than the frame |
| shell overflow after `fitStill` is 0 | the fit loop hit its floor and gave up |
| sources drawer / source line / honesty note / byline / honesty strip inside the frame | attribution pushed off the poster |
| still carries source evidence on its face | a still with no sources at all — nobody can hover a PNG |
| every source row fully inside the frame | rows cut off the bottom |
| no source text cut off inside its box | `text-overflow`/`line-clamp` ellipsis mid-sentence |
| no two source labels overlap | text runs colliding (measured with a `Range`, so overflow counts, not just the cell) |

`--report-only` writes every still anyway and exits non-zero, so you see the full list in one run
instead of one failure at a time. The measured `--fit` factor and every assertion land in
`exports/manifest.json` under `stills` (plus a flat `stillFailures` list); running `poster.mjs` or
`gif.mjs` alone leaves the same record in `exports/stills.json`.

When a still fails: shorten the source `detail` strings, cut a metric or a source, or split the
artifact. **Do not raise the clip tolerance.** A source the reader cannot read is a source the
artifact does not have.

Useful GIF flags: `--size 640 --height 640 --fps 12 --clip 3.2 --hold 1400 --colors 160`.
For a LinkedIn portrait GIF: `--size 720 --height 900`. Watch the printed file size — the
script warns above ~7.8 MB, which is where LinkedIn stops animating.

To export a specific comparison rather than the default state:

```bash
node export/poster.mjs --vertical b2c --intent transactional --palette ember
```

**Measured on this Mac** (M-series, Chrome 153, Node v22.22.3, 14 Sep 2026):

| Step | Time | Output |
|---|---|---|
| `contrast` | 0.04 s | 51/51 checks |
| `verify` | 5.2 s | 36/36 checks, 6 screenshots, `verify.json` |
| `poster` | 2.8 s | 3 stills × 10 frame assertions, all pass |
| `gif` | 5.5 s | 1 still × 9 frame assertions, all pass |
| `poster` | 3.1 s | 1200×1500 PNG 983 KB (0.46 s) · 1080×1080 PNG 694 KB (0.29 s) · PDF 1.4 MB (1.16 s) |
| `gif` | 5.6 s | 38 frames captured in 4.0 s, encoded in 0.78 s → 640×640 GIF, 1.87 MB |
| **`run-all`** | **~14 s wall** | + `exports/manifest.json` |

`verify`'s check count scales with the artifact: **30 fixed checks + 2 per declared dimension**
(one "dimension exists" check and one probe per dimension, at each of the two viewports). The
shipped template declares two dimensions → 36.

### 5. Publish

**Interactive artifact.** `public/artifacts/` is the established precedent for standalone HTML
artifacts on this site (`public/artifacts/destination-intent-explorer.html` is the existing
one); `public/viz/` is the alternative if you want the two kinds separated. Copy the finished
single file there and link it from the post. Astro serves `public/` verbatim, so the artifact
needs nothing else.

> The kit deliberately does **not** copy anything into `public/`. Do that yourself, once, when
> the piece is approved.

**Poster / GIF.** Upload from `exports/<slug>/` to LinkedIn directly:
- `…-poster-1200x1500.png` — portrait still, the highest-reach image format;
- `…-poster-1080x1080.png` — square still;
- `…-poster.pdf` — for a LinkedIn document post;
- `…-640x640.gif` — the animated version.

If you also want the poster inside the blog post, put it in `content-studio/drafts/assets/`
alongside the draft, per the `infographic` skill.

Always link the living version in the LinkedIn copy. The GIF's amber strip already says it is
the rudimentary version; the post text should say where the real one is.

---

## How the machinery works (only needed if you are changing the kit)

- **Clock.** One master timeline; `window.VIZ.seek(t)` renders any moment deterministically.
  The exporters step that clock rather than racing `requestAnimationFrame`, which is why two
  runs produce identical frames.
- **Modes.** `?poster=1` and `?gif=1` switch layout and force the settled state. `fitStill()`
  then shrinks a `--fit` scale factor until the content fits the frame exactly, so a longer
  dataset can never clip a ledger row off a poster.
- **`verify` knows nothing about your data.** It reads `DATA.dimensions` out of the artifact's
  own `#viz-data` block, finds each dimension's control in the DOM (`#sel-<dimension>`, or any
  `<select>` offering those option values, falling back to `VIZ.setState`), sets the first two
  real options in turn, and asserts a rendered number changes. No option id is hardcoded, so
  forks that rename a dimension (`metric` instead of `intent`) or use role/intent ids are
  checked as-is — and a dimension that only changes prose fails honestly instead of being
  papered over with stub values.
- **Stills are measured, not trusted.** `export/lib/still-check.mjs` runs geometric assertions
  inside the frame — `getBoundingClientRect()` still reports an element's true position when an
  ancestor clips it, which is the only way to see a clipped poster from the outside.
- **Self-containment is enforced, not assumed.** `export/lib/browser.mjs` aborts every request
  that is not `file:`/`data:` and the poster/verify steps fail the run if any were attempted.
- **Chrome.** puppeteer-core drives the Chrome already installed on this Mac, honouring
  `CHROME_PATH`, exactly like `scripts/qa/browser.mjs`. The kit never downloads a browser and
  adds nothing to the site's root `package.json`.
- **GIF encoding.** Neither ffmpeg, gifski, ImageMagick nor gifsicle is installed on this
  machine, so the kit uses pure JS: frames are captured as PNG, decoded with `pngjs`, quantized
  once to a global palette with `gifenc` (sampled across four points in the clip so late frames
  are not starved), then written with 1-bit transparency for unchanged pixels and GIF dispose
  method 1. The mostly-static background costs almost nothing after frame 0. In GIF mode the
  mandala turns exactly 1/12 of a revolution over the clip, against 12-fold symmetry, so the
  backdrop loop is seamless.

```bash
CHROME_PATH="/Applications/Chromium.app/Contents/MacOS/Chromium" node export/run-all.mjs
```

---

## Checklist before you publish

- [ ] `meta.sample` is `false` and every number is real
- [ ] every metric's `source` has a real label, `url` and `asOf` date
- [ ] headline states the takeaway, one `{lit}` highlight
- [ ] 3–5 question chips, each naming a real change in the data
- [ ] `node export/run-all.mjs` is green: 51/51 contrast, verify all-pass (36/36 for a two-dimension artifact)
- [ ] every selector actually moves a number — verify probes each declared dimension and fails
      a dimension that only changes prose
- [ ] every still passes its frame assertions (the run aborts otherwise — see above)
- [ ] poster and GIF opened and eyeballed at 100%
- [ ] `meta.liveUrl` points at where the artifact will actually live
- [ ] the artifact file copied to `public/artifacts/` and linked from the post
