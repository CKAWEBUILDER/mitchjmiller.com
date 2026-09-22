# Living Infographic Kit — visual & interaction spec

**Status:** v0.1, 14 September 2026. Verified against `template.html` in this folder.
**Scope:** the reusable language for interactive data artifacts on mitchjmiller.com, plus the
static poster / animated GIF that LinkedIn will actually accept.

The page around the artifact stays austere — navy `#0f2440`, green `#14804a`, white paper,
Inter, thin rules (`site/styles/agency.css`). **The artifact is the vivid object inside it.**
Everything in this spec exists to make that contrast deliberate rather than accidental.

---

## 1. The three-artifact rule

Every living infographic ships as **three files from one source**:

| Artifact | Where | Made by |
|---|---|---|
| Living version — interactive, selectable, sourced | blog post (`public/artifacts/` or `public/viz/`) | `template.html` |
| Static poster — 1200×1500 and 1080×1080 PNG, plus PDF | LinkedIn image / document post | `?poster=1` + `export/poster.mjs` |
| Animated GIF — the reveal, looping | LinkedIn feed | `?gif=1` + `export/gif.mjs` |

The GIF and poster are **derivatives, never the deliverable**. Both carry a visible label
saying so and a pointer back to the living version. The GIF's amber bottom strip is not
decoration — it is the honesty contract. Do not remove it.

---

## 2. Palettes

Three sets. All are dark-ground — the artifact reads as a lit object dropped onto white paper,
which is what makes it stand out beside the site's restrained shell. Declared in
`template.html` → `<script type="application/json" id="viz-palettes">`.

Verify any change with `node export/contrast.mjs` (51 checks; it reads the palettes straight
out of the template, so the spec cannot drift from the code).

### Aurora — default. Cool electric, closest to the site's navy.
| Role | Hex | Contrast |
|---|---|---|
| ground | `#0A1A30` | 17.45:1 vs site paper `#ffffff` · 1.12:1 vs site navy `#0f2440` |
| panel | `#12294A` | — |
| line | `#2B4670` | 1.84:1 on ground (non-text boundary) |
| text | `#EAF2FA` | **15.44** on ground · **12.89** on panel |
| muted | `#A8C0D8` | **9.30** / **7.77** |
| a1 cyan | `#5BF0F5` | 12.65 / 10.56 |
| a2 lime | `#C6FF4F` | 14.81 / 12.36 |
| a3 magenta | `#FF7AB6` | 7.24 / 6.04 |
| a4 amber | `#FFC53D` | 11.06 / 9.23 |
| a5 violet | `#B9A2FF` | 8.04 / 6.71 |

### Ember — warm and hot. Use when the story is a cost, a loss, or a deadline.
ground `#190B24` · panel `#2A1138` · line `#47205C` · text `#FFF1E8` (17.04 / 15.37) ·
muted `#E3B9C8` (10.80 / 9.74) · accents `#FF8A4C` `#FFD400` `#FF7AB6` `#4DF39A` `#B9A2FF`
(lowest accent-on-panel **7.05**).

### Verdant — green-led, site-native. Safest when the artifact sits next to the green CTA.
ground `#06251B` · panel `#0C3B2A` · line `#17614A` · text `#ECFDF3` (15.46 / 11.89) ·
muted `#A6D9BE` (10.32 / 7.94) · accents `#4DF39A` `#C6FF4F` `#35D6E8` `#FFB020` `#FF7AB6`
(lowest accent-on-panel **5.20**).

**Rules**
- Every accent in every palette clears **4.5:1 on both ground and panel**, so any accent may
  carry text. Nothing in the kit relies on the large-text 3:1 exemption.
- Panels are at least **95% opaque** over the generative field. That cap is what makes the
  measured ratios above true in practice — do not lower it to "let the mandala through".
- Semantic roles are fixed across palettes: **a2 = the favourable column**, **a3 = the
  unfavourable column**, **a4 = the payoff / source markers**, **a1 = interaction affordances**,
  **a5 = the search-surface strip**. A reader who has seen one artifact can read the next.
- Colour is never the only channel. Favourable/unfavourable also differ by column position,
  label, and the delta suffix (`4.6×` vs `2.2× lower`).

---

## 3. Typography

- **One stack, no webfont, no network:** `ui-sans-serif, system-ui, -apple-system, "Segoe UI",
  Roboto, Helvetica, Arial`. On the site this renders in SF and sits naturally beside Inter.
  Fetching a webfont would break the self-contained rule and the GIF exporter.
- **Mono** (`ui-monospace, SFMono-Regular, Menlo, Consolas`) is reserved for two things only:
  example search queries, and source/date metadata. Mono means *this is verbatim evidence*.
- **Counters use `font-variant-numeric: tabular-nums`.** Without it a roll-up jitters
  horizontally and reads as broken.
- Scale (fluid, `clamp()`): h1 `1.85–3.15rem` / 1.05 / `-0.03em`; question line `1.05–1.5rem` 600;
  hero numeral `2.7–4.9rem` 800 `-0.045em`; ledger value `1–1.28rem` 800; body `1rem`/1.55;
  labels `0.87rem`; eyebrows and column names `0.63–0.78rem` 700–800 `.10–.14em` uppercase.
- **Minimum effective size in an export is 24 px.** LinkedIn's mobile feed downscales; below
  that the number stops being the point of the graphic. The still exports enforce this
  through `--fit` (§8) rather than by hand.
- Headline states the **takeaway**, not the topic, and may mark one clause with `{lit}…{/lit}`
  to colour it in the accent. One highlight per headline.

---

## 4. Generative backdrop — mandala + fractal

A single `<canvas id="bg">` behind everything. Pure function of `(seed, t)` — no draw-time
randomness, so an export at frame *N* is byte-reproducible.

**Construction** (`buildSpec(seed)` → `drawBackdrop(t)`):
1. `mulberry32(seed)` produces the whole composition once and caches it per seed.
2. Radial ground bloom: `panel → ground` radial gradient.
3. **Spokes** — `K*2` radial lines: the mandala's skeleton.
4. **Phyllotaxis dot lattice** — 460 dots at the golden angle `π(3−√5)`, radius `√(i/n)`.
5. **Petal rings** — 6–7 concentric rings, each with **K-fold symmetry**, each petal a
   two-bezier form that **recursively spawns two children at 0.47 scale** for 2–3 levels.
   That recursion is the fractal; the K-fold repetition is the mandala.
6. **Centre rosette** — the anchor the eye lands on.
7. **Tick rings** — 3 concentric rings of `K·(i+2)` radial ticks.

All of it drawn with `globalCompositeOperation = 'lighter'` so overlaps bloom instead of muddying.

**Constants**
- `K = 12` fold symmetry. It is also the GIF loop divisor (§6).
- Backdrop pixel budget is capped at **1600 px on the long side** regardless of DPR. It is a
  soft glow; upscaling is invisible and it keeps a 38-frame GIF capture under ~4 s.
- Field strength is multiplied by **1.3 in poster/GIF mode**, where opaque panels cover more
  of the frame.
- Layout: on a tall blog page the disc is anchored near the top (`R = 0.62·width`); in a
  fixed-aspect still it is centred (`R = 0.82·min(w, 0.92h)`).

**Type protection.** The field is loud on purpose, so type gets scrims rather than a weaker
mandala: a radial scrim behind the header block, a small one behind the delta badge, a linear
one behind the footer. Panels stay ≥95% opaque. Result: the ratios in §2 hold wherever the
mandala lands.

**Seed discipline.** One seed per published artifact, recorded in `meta.seed`. Changing the
seed changes the composition, so re-export the poster and GIF if you change it.

---

## 5. Motion presets

One master clock drives everything. `VIZ.seek(t)` renders any moment deterministically —
that is what makes GIF export reproducible instead of a race against `requestAnimationFrame`.

| Phase | Seconds | What moves |
|---|---|---|
| **Anticipation** | 0.00 – 0.34 | columns lift 10 px into place, nothing numeric moves yet |
| **Progressive reveal** | 0.34 – 2.15 | counters roll `0 → value`, `easeOutExpo`, staggered ≤ 0.16 s apart; bars grow with them |
| **Payoff** | 2.15 – 2.60 | the headline difference lands with `easeOutBack` overshoot (0.72 → 1.0 scale) |
| **Hold / drift** | 2.60 – 4.60 | foreground is still; only the backdrop breathes and turns |

- **Anticipation before payoff is the whole trick.** The 340 ms where nothing counts up is what
  makes the numbers feel *delivered* rather than merely displayed. Do not delete it to save time.
- Easing: `easeOutExpo` for counters (fast start, long settle — reads as "measured"),
  `easeOutBack` once for the payoff only, `easeInOut` for the anticipation lift.
- The reveal rail under the question is an **honest progress cue** (Zeigarnik): it tracks the
  real clock to `payoffEnd`. It is not a fake loader and never runs longer than the animation.
- Changing any selector **re-runs the whole timeline**. The re-animation is the reward for
  interacting.

### `prefers-reduced-motion: reduce`
Not a degraded version — the same artifact, already settled.
- `--dur` collapses to `0s`; every CSS transition is inert.
- The clock jumps straight to `payoffEnd`: counters show final values, the payoff is present
  and unscaled, the backdrop renders exactly one static frame.
- **No `requestAnimationFrame` loop is scheduled at all** (verified: 0 callbacks in 900 ms).
- The `aria-live` announcement still fires.
- `?motion=reduce` forces the same path for testing.

---

## 6. Export modes

| Param | Effect |
|---|---|
| `?static=1` | freeze at the settled state, no rAF |
| `?poster=1` | poster layout, fills the viewport exactly (implies static) |
| `?gif=1` | GIF layout: controls hidden, honesty strip shown, seamless backdrop loop |
| `?frame=N&frames=M` | deterministic frame N of M across the reveal |
| `?t=1.8` | deterministic absolute time |
| `?loop=3.2` | backdrop turns exactly `2π/K` over this many seconds → seamless GIF |
| `?palette=` `?seed=` `?vertical=` `?intent=` | state, also used for deep links |
| `?motion=reduce` | force the reduced-motion path |

`window.VIZ`: `ready` (promise), `duration`, `timeline`, `fold`, `seek(s)`, `frame(n, total)`,
`setState({palette, seed, vertical, intent})`, `snapshot()`, `play()`, `stop()`.

Poster mode also force-opens the Sources drawer: **a still must carry its sources on its face**,
because nobody can hover a PNG.

---

## 7. Interaction patterns

### 7a. The question prompt — the keyword *is* the control
The headline of the control panel is a sentence with the variables inline:

> What happens to conversion in **[B2B SaaS]** when the intent is **[informational]**?

Both bracketed tokens are native `<select>` elements styled as pill-shaped words in the
sentence. Native means: keyboard works, mobile gets the system picker, screen readers get a
labelled combobox. No custom listbox, no ARIA to get wrong.

Beneath it, a row of **question chips** that jump to interesting states —
"What happens when the intent turns transactional?", "Where is the gap widest?",
"Where is the gap narrowest?". Each is a `<button aria-pressed>` that sets state and re-runs
the reveal. They are the curiosity gap made clickable: a reader who would not touch a dropdown
will click a question.

Authoring rules: **3–5 chips.** Each must name a real change in the data, phrased as something
the reader already wonders. Never phrase one as a claim the artifact does not support.

### 7b. Selector-driven comparison
Pick a vertical → two columns animate side by side.
- The columns are the **constant** axis (in the answer / not in the answer); the selector swaps
  the dataset behind them. Comparing the same two things across contexts is what makes the
  pattern legible over a series of posts.
- Hero metric large in both columns + a half-gauge scaled to the pair's max; the ratio between
  them is the payoff badge in the gutter.
- Remaining metrics fall into a ledger: label, left value, mirrored bars, right value, ratio.
- `better: "higher" | "lower"` per metric decides which direction is green. The suffix says it
  out loud (`2.2× lower`) so colour is never load-bearing.

### 7c. Search results by intent
A stylised result surface per vertical × intent: rows tagged `answer` / `citation` / `organic` /
`pack` / `ad`, each with its own accent bar, plus one sentence saying what that surface means
for the reader. This is a **schematic, not a screenshot** — it must never look like a real SERP
capture, and the copy should stay true whatever the engines do this month.

### 7d. Psychological patterns — used, and refused
Used, because they serve comprehension: curiosity gap (question as control); anticipation →
payoff timing; progressive reveal (one number at a time beats five at once); Zeigarnik progress
rail; contrast framing (the unfavourable column named plainly, not hidden); endowed progress
(chips pre-answer one dimension so the first interaction is free); deep-linkable state so a
reader can share the exact comparison they found.

Refused, permanently: fabricated counts or "X people viewed this"; countdowns and false
scarcity; content gated behind an interaction; animation that delays information the reader
already asked for; any colour or scale trick that exaggerates a gap. House rule 1 and 5 of
`content-studio/CLAUDE.md` outrank engagement.

---

## 8. Accessibility

- **Keyboard:** everything is a native `<button>`, `<select>`, `<summary>` or `<a>`. Focus ring
  is `3px solid` accent 1 at `4px` offset (same shape as the site's `:focus-visible`).
- **Changing numbers:** counters are not announced while they roll. A single
  `role="status" aria-live="polite" aria-atomic="true"` region announces the settled comparison
  once per change, as a sentence: *"B2B SaaS, informational intent. Visit → qualified action:
  2.8% in the answer versus 0.9% not in the answer — 3.1×."*
- **Contrast:** all text ≥ 4.5:1 against its own background (§2), measured, not eyeballed.
- **Source markers** are real buttons with a descriptive `aria-label` including the date, and a
  popover on hover **and** focus. Clicking opens the Sources drawer and highlights the row.
- **Motion:** §5. **Colour:** never the only signal (§7b).
- Backdrop canvas is `aria-hidden="true"`. Gauges are `aria-hidden` — they duplicate a number
  that is already text.
- One `<h1>`; every section has a heading, visually hidden where the design does not want one.
- Target size ≥ 38 px on every control; 44 px on the mobile layout.

---

## 9. Performance budget

| Budget | Limit | Current |
|---|---|---|
| Single self-contained HTML file | < 300 KB before images | **64 KB** |
| External requests | **zero** | zero (enforced: the exporter aborts any non-`file:` request and fails the run) |
| Images / fonts / CDN scripts | none | none |
| Backdrop canvas | ≤ 1600 px long side, DPR ≤ 2 | enforced in `sizeCanvas()` |
| rAF while settled + reduced motion | 0 | 0 |
| Poster PNG | ≤ 1.5 MB | 0.98 MB / 0.69 MB |
| GIF | ≤ 8 MB (LinkedIn animates below this) | 1.9 MB |

The artifact must work from `file://`. No build step, no bundler, no framework.

---

## 10. The honesty rule

Non-negotiable, and it outranks every aesthetic decision here.

1. **Every number carries a source id.** `metrics[].source` must resolve to an entry in
   `sources[]`; the verifier fails the run otherwise.
2. **Every source carries a date.** `asOf`, ISO, shown in the marker popover, the drawer, the
   poster, and the GIF's compact source line.
3. **The Sources drawer is visible in the UI**, force-opened in every still export.
4. **Sample data is labelled as sample.** `meta.sample: true` turns on the amber SAMPLE badge
   and swaps the footer note to say plainly that nothing on the artifact is a measurement.
   Ship `false` only when every value is real.
5. **The GIF says what it is.** "Rudimentary GIF of a living artifact" plus what the reader is
   missing, in an amber strip that cannot be cropped out without obviously damaging the frame.
6. **No axis or scale games.** Bars are linear and scaled to the pair's max. Ratios are printed
   as computed. `better: "lower"` metrics say "lower", they do not get silently flipped.
7. If a number cannot be sourced, it does not go on the artifact. Cut the metric.
