# Critic pass — 2026-09-24 — statistician-vs-data-scientist (journey map rebuild)

Critic: independent re-run, read-only except this file. No git, no site build, no purchases/logins/posts.
Local static servers on ports 5302/5303 (python3 -m http.server) for browser checks, both stopped after use;
browser preview and all tabs closed at the end. Today: 2026-09-24.

Target: `content-studio/viz/final/statistician-vs-data-scientist/` (`index.html`, `export.mjs`, `README.md`,
3 posters, GIF) + drafts `content-studio/drafts/2026-09-14-statistician-vs-data-scientist.{blog,linkedin}.md`
+ ledger `content-studio/research/2026-09-14/roles/` + prior critic
`content-studio/routines/runs/2026-09-14-critic-B.md` (fixes must still hold).

**Prior-critic fix re-verified: holds.** Critic B's fix was on the *old, rejected* kit-dashboard build
(`content-studio/viz/statistician-vs-data-scientist/`, superseded 2026-09-24). Its rule — medians and the
industry flip cite BLS OOH, OEWS only on head counts — carries into the new journey-map build cleanly.
Grepped `OEWS` across `index.html` + both drafts: it appears only beside the 29,030/262,440 head-count figures
and in general source lists; never attached to $105,650/$120,230/$167,180/$132,380. The artifact's own
`SOURCES` array states it explicitly: *"A different BLS product from the Handbook, so the two are shown side
by side, not merged."* Blog TL;DR/Pay section/FAQ all link the two OOH pages for the pay figures, not
`ocwage.t01.htm`. Confirmed holding, no regression.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Numbers: 8 figures → ledger → live BLS re-fetch | **8/8 trace to ledger; 6/6 BLS-OOH figures confirmed live today, exact.** No orphaned figures found. |
| 1b | "2 of 4 titles have no BLS code" defensible? | **Yes, with the same evidentiary ceiling critic B noted** — see below. |
| 2 | Text audit (poster PNGs) | **Pass.** Did not re-run `--posters` (would overwrite files outside my write scope); read the audit's own bbox/glyph-metric logic, cross-checked its numeric claims against the `F`/`M` size constants in `index.html`, and opened + visually inspected all 3 PNGs. No overlap, no clipping, nothing under a road, consistent with README's "116 lines, 0 problems" claim. |
| 3 | GIF | **Pass, byte-exact.** Parsed with PIL (my own hand-rolled block-walker had a bug — see below, discarded in favor of PIL). |
| 4 | Interaction @1360/390 | **Pass.** Ran the artifact's own `node export.mjs --interaction`: **25/25**, matching README. Independently cross-verified hrefs, postMessage, tab order, `javascript:` refusal and standalone fallback via a second, separate harness (sandboxed iframe + direct page). |
| 5 | Copy (house rules / keyword / front-matter / FAQ+JSON-LD / Sources / share CTA / URLs / embed / anchors / LinkedIn) | **Pass, 2 minor nits** (both non-blocking, both same class of nit critic B waved through on the prior draft). |
| 6 | Contrast (gold-on-red title bar + any pair <4.5:1) | **1 real AA finding** (title-bar eyebrow), **4 near-4.5 pairs that are fine because they're large text**. See table. |
| 7 | Publish readiness | **Not yet publishable.** `approved: no`; artifact not copied to `public/`; no `blogPosts` entry in `src/lib/data.ts`; confirmed `mj2.pro/blog/statistician-vs-data-scientist/` 404s live today. |

## Figure table

All 8 traced to `content-studio/research/2026-09-14/roles/data.json`. The 6 BLS OOH figures were re-fetched
live against bls.gov today (2026-09-24); O*NET/Wellfound figures are 2026-09-14 snapshots per the task brief
and need only ledger match.

| # | Figure | Ledger | Live re-fetch (2026-09-24) | Result |
|---|---|---|---|---|
| 1 | Data scientist median pay **$120,230** | `data_scientist.median_pay_2025_usd` | `bls.gov/ooh/math/data-scientists.htm` → "$120,230 per year" (May 2025); lowest 10% <$67,240, highest 10% >$199,130 — matches ledger's p10/p90 too | **Exact** |
| 2 | Statistician median pay **$105,650** | `statistician.median_pay_2025_usd` | `bls.gov/ooh/math/mathematicians-and-statisticians.htm` → "The median annual wage for statisticians was $105,650 in May 2025"; p10 <$64,000, p90 >$174,050 — matches ledger | **Exact** |
| 3 | Data scientist growth **35%**, 2025–35 | `growth_pct_2025_2035` | Same OOH page, Job Outlook: "grow 35 percent from 2025 to 2035" | **Exact** |
| 4 | Statistician growth **11%**, 2025–35 | `growth_pct_2025_2035` | Job Outlook **tab** chart, "Percent change in employment": Statisticians 11% — correctly the statistician-only figure, distinct from the combined "Mathematicians and statisticians" 10% shown on the same chart. Employment table confirms SOC 15-2041, 31,300→34,700, 11%/3,400 | **Exact — and correctly disambiguated from the combined-category 10%**, an easy figure to conflate |
| 5 | Statistician pay in computer systems design **$167,180** (the flip) | `pay_by_industry_usd_median_annual[0]` | Pay tab, statisticians' industry table: "Computer systems design and related services — $167,180" (all 5 industries in the table match the ledger exactly) | **Exact** |
| 6 | Data scientist pay in computer systems design **$132,380** | `pay_by_industry_usd_median_annual[1]` | Pay tab, data scientists' industry table: "Computer systems design and related services — 132,380" (all 5 match) | **Exact** |
| 7 | Education: statistician **62%** master's; DS **48%·44%** bachelor's/master's | `onet.education_distribution_pct` both roles | Ledger-match only (O*NET, dated 2026-09-14 per task brief) | **Match** |
| 8 | AI engineer **1,985** Wellfound remote vs DS **161** (**12.3×**) | `job_postings_snapshot_2026_09_14.wellfound` | Ledger-match only (2026-09-14 snapshot per task brief) | **Match.** 1985/161 = 12.329 → "12.3×" correct |

Derived-figure math checked: "more than 3×" (35/11=3.18 ✓), "~$35K" (167,180−132,380=34,800 ✓), "12.3×" (✓ above).
No figure on poster/post was found absent from the ledger.

**"2 of 4 titles have no BLS code" — defensibility.** Live-fetched `bls.gov/soc/notices/2022/finding_soc_code.htm`:
real, current BLS guidance confirming SOC classifies by **job duties, not job titles** — which is the correct,
careful framing the ledger already uses (growth engineer maps ad hoc to Software Developers/Marketing Manager;
AI engineer's duties get absorbed into 15-1221/15-2051/15-1252 depending on role). The claim is defensible as
written: neither title has its **own dedicated** SOC code, OOH page, or OEWS entry — the artifact never claims
their duties are unclassifiable, just that the titles aren't officially recognized. This is an absence claim,
which structurally can't be fetch-verified as conclusively as a positive figure (same ceiling critic B flagged
on the prior build) — I could not find a live BLS tool that does a definitive negative title-search within
this task's time-box (O*NET's search tool hung/failed to load twice; BLS's own SOC search is a downloadable
Direct Match Title File, not a live query tool). Sourcing (BLS's own guidance + O*NET absence + job-board-only
tracking) is the same reasonable method critic B accepted; not disputing it.

## Text audit detail

`export.mjs`'s `FIT_FN` (read in full, not just described) is genuinely rigorous: per-line ink box from
`getBBox()` + canvas `measureText()` glyph metrics, checks box-overflow, frame-clipping, the 12px floor,
line-to-line overlap, and literal road/pip collision via `getPointAtLength()` sampling every 3px along every
`path[data-road]`. I did not re-run `--posters`/`--gif` because both **write** the poster PNGs / GIF to this
folder, outside my write scope (only this report file). Instead: read the audit logic (above), cross-checked
its size claims against the actual `F` constants in `index.html` (portrait: `src:12` — the only sub-14 element,
matching "the only line under 14px is the source strip"; square: `chip:12, keyCap:13, keyTxt:13.5, src:12` —
matching "smallest 12px, 67 lines at 12–13.5px"), and opened all 3 PNGs directly. Visual read: clean on all
three — no overlap, no clipping, nothing crossing a road, the gold-on-red title bar is visibly lower-contrast
than the white lines beside it (consistent with the contrast finding below), and the `$167,180` flip highlight
(dark green on gold) is readable but visibly softer than the pure ink-on-tint pairs elsewhere.

## GIF detail

My own hand-rolled GIF block-walker had a bug (misaligned after the first Graphic Control Extension, threw
"unexpected byte" at offset 807, and would have reported a false `loop=1`) — discarded rather than trusted.
Re-parsed with PIL (`Pillow 11.3.0`, already installed) instead:

- Header: `GIF89a`. Size: 640×800, matches filename and README.
- **429 frames** exactly (143/rendering × 3).
- Loop: `0` (infinite / NETSCAPE2.0), confirmed.
- Delay histogram: **426 frames @ 90ms**, **2 frames @ 1590ms** (at indices 142 and 285 — exactly the last
  frame of renderings 1 and 2), **1 frame @ 50090ms** (the very last frame). Sum of all delays = **91.61s**.
- File size: 1,318,199 B = **1.257 MB**, under the 3 MB ceiling.

All of this is an **exact** match to the README's claims (429 frames, loop 0, 1.59s × 2, 50.09s final, 91.6s
total). Also live-pulled `window.VIZ.schedule` from the running page and cross-checked the prose timing:
`sideEnd:0.95, roadStart:1.65, stops:{education:4.15, pay:5.632, growth:7.113, tools:8.492, postings:9.948},
roadEnd:11.7746, duration:13.0246` — every value matches the README's "Motion and GIF timing" section to the
stated rounding. The "~0.7s beats" claim is a property of the live animation's own easing/hold logic (baked
into frame content, not GIF-level delay values), corroborated via this schedule rather than the delay bytes.

## Interaction detail

Ran `node export.mjs --interaction` directly (non-destructive: writes one throwaway harness to `os.tmpdir()`,
deleted in a `finally` block — nothing in the project touched). Result: **25/25 passed**, including the one
check I could not force live myself — reduced motion: `{"at":13.0246,"dur":13.0246,"end":"1.000"}`, i.e. under
`reducedMotion:true` the clock jumps straight to the settled frame with journey's-end fully revealed. Matches
source-code prediction exactly.

Independently re-verified the same mechanics through a second, separate path (sandboxed cross-origin iframe +
a direct top-level page, both served from my own `python3 -m http.server` on 5302/5303):
- All 8 stop hrefs read directly from the DOM: `growth-engineer→#role-no-bls-code`, `ai-engineer→#role-no-bls-code`,
  `education→#role-education`, `pay→#role-pay`, `growth→#role-growth`, `tools→#role-methods`,
  `postings→#role-methods`, `practice→#role-practice` — all `target="_top"`, all `tabindex="0"`. All 6 anchors
  exist as `id="role-<slug>"` headings in the blog draft.
- **First unsandboxed click** (before I added a test sandbox) actually navigated my whole browser tab to
  `https://mj2.pro/blog/statistician-vs-data-scientist/#role-no-bls-code` — real proof the fallback mechanism
  works end to end, and incidentally proved the post **isn't live yet** (mj2.pro returned "Page not found").
  Re-tested afterward inside a `sandbox="allow-scripts allow-same-origin"` iframe (blocks only top-navigation)
  to capture `postMessage` without losing the harness: `{type:'viz-intent', intent:'pay', stop:'pay'}` etc.
  fired correctly on every stop tested, on both click and Enter/Space.
- Tab order, clean reload, no prior click: **Sources → Growth Engineer → AI Engineer → Stop 1 (education) →
  pay → growth → tools → postings → journey's end**, exactly as README claims. (My first attempt at this,
  inside the sandboxed iframe, showed a confusing out-of-order result after activating a link — traced this to
  the sandbox's blocked-navigation side effect on focus, an artifact of my own test harness, not the page; the
  clean unsandboxed re-test resolved it and matches `export.mjs --interaction`'s own tab-order assertion.)
- `?parent=javascript:alert(1)` → resulting href correctly falls back to the standalone post URL, no alert,
  confirmed both via the interaction script and my own manual test.
- Standalone open, no `?parent=`, no referrer → falls back to `STANDALONE_PARENT`, confirmed
  (`document.referrer` was empty in this test and it still resolved correctly, never blank).
- Framed, no `?parent=` → uses `document.referrer` (confirmed via a blocked-navigation console log showing an
  attempt to navigate the actual embedding page's origin, not a guess — I did not extract the literal resolved
  string this way, a minor methodological caveat).
- 1360px and 390px direct-page widths: `scrollWidth === innerWidth` at both, no horizontal overflow.

**New finding beyond the README's own "Not verified" list — mobile iframe-embed legibility, now confirmed, not
just unverified.** Built the exact embed snippet from the blog draft/README
(`width:100%;aspect-ratio:1080/1410`) in a real iframe at 390px width (with a correct
`<meta name=viewport>` — my first attempt lacked one and got a misleading 980px "virtual viewport" result,
caught and corrected). At 390px the SVG scales by **390/1080 = 0.361×**. Effective on-screen text sizes:
- 12–14px native (source line, chips, key labels, side-signpost body) → **~4.3–5.1px** — not legible.
- 19–26px native (side-signpost titles, stop-header white text) → **~6.9–9.4px** — not legible.
- 34–40px native (the big hero stat figures: 62%, $105,650, +11%, etc.) → **~12.3–14.4px** — still readable.
The map does letterbox/fit correctly (no overflow, no scrollbar — confirmed via `getBoundingClientRect()` on
the iframe box matching the CSS aspect-ratio math exactly, 390×509.16px), so this isn't a layout bug. It's a
legibility ceiling inherent to putting one dense 1080-wide canvas in a ~390px mobile column: readers get the
headline numbers but lose almost every label, source, and side-path detail. The README correctly flagged this
as a risk it hadn't checked; I checked it, and it's real.

## Copy detail

House rules: grepped `index.html` + both drafts for revolutionary/game-changer/everyone/nobody/changed
everything/best ever/broke the internet — **zero hits**. "agency"/"agencies" — **zero hits**. Front-matter
complete: `kw` ✓ `kw_secondary` ✓ `kw_note` ✓ (honestly flags Semrush-unverified) `insight` ✓ `cta` ✓
`title` ✓ (62 chars, counted) `meta_description` ✓ (134 chars, ≤155, counted) `slug` ✓ `suggested_url` ✓
(matches the embed `?parent=` exactly) `approved: no` ✓. Sources section: 8 linked lines + explicit ledger
pointer. Share CTA present, verbatim match to `cta:`. Embed path `/viz/statistician-vs-data-scientist/` with
`?parent=` present in the blog's iframe markup. All artifact-owned URLs (embed src, standalone parent,
suggested_url, LinkedIn link) point at `mj2.pro`, consistently.

FAQ: 3 questions, visible text and `FAQPage` JSON-LD both parse/match for Q1 and Q3 verbatim. **Q2 is a
paraphrase, not verbatim**: visible answer says "...same two BLS Occupational Outlook Handbook pages' industry
tables," JSON-LD says "...BLS Occupational Outlook Handbook, 2025) ... same source" — same facts, different
wording (JSON-LD strips the inline markdown links, which forced a rewrite). Minor, non-blocking; Google's
guidance prefers verbatim but this isn't a factual mismatch.

One keyword per section: spot-checked the draft's own table against the prose. "BLS occupation code" (stated
keyword) vs. body text's "BLS SOC code" — an LSI-level variant, same pattern critic B waved through on the
prior draft as non-blocking. "data scientist job growth" and "statistician vs data scientist degree" are
topically present but not literal phrase matches either. Consistent with house precedent; not flagging as new.

**LinkedIn draft**: self-reported "Character count: 1388" — **independently verified exact** (1,388, counted
the same way: from the opening line through the hashtags). Under the 1,400 cap with 12 chars to spare. Share
line present, verbatim match to the blog's CTA line, correctly placed after the link and before hashtags. The
**"rudimentary version of the living artifact" line**: the concept is fully present but split across two
sentences — "I built this as a living artifact, not a static chart" (paragraph 4) and "The image attached here
is the rudimentary version — a flat copy of the whole map" (paragraph 5) — never combined into the literal
phrase named in the brief. Same class of wording nit critic B explicitly called non-blocking on the prior
LinkedIn draft ("communicates the same substance... not worth a rewrite"); flagging only because the brief
named it by name.

## Contrast detail

Computed WCAG 2.x contrast ratios (relative luminance formula) for every fill/background pairing found in
`index.html`. WCAG large-text exemption (3:1 instead of 4.5:1) requires ≥24px regular **or** ≥18.66px
(14pt) bold.

| Pair | Ratio | 4.5:1 | 3:1 | Size / weight | Large-text exempt? |
|---|---|---|---|---|---|
| **Gold `#FFC53D` on bar `#C9361A`** — eyebrow line | **3.30:1** | **FAIL** | pass | 18px / 800 | **No — 18px is under the 18.66px bold cutoff.** Real AA finding. |
| Gold `#FFC53D` on bar `#C9361A`` — "2 OF 4" numeral | 3.30:1 | fail | **pass** | 120px / 800 | Yes, unambiguous. **Large text passes.** |
| Cream `#FBF3E4` on bar — heading lines / sub-line | 4.73:1 | pass | pass | 19–30px / 600–800 | n/a, passes either way |
| White on `flagDeep`/bar — "NO BLS CODE" chip | 5.22:1 | pass | pass | 14px / 800 | passes either way |
| Ink on `flagTint` — side-signpost titles | 15.16:1 | pass | pass | — | comfortable |
| White on territory deep (5 header strips: edu/pay/growth/tools/postings) | 5.05–6.47:1 | pass | pass | 14–26px / 800 | passes either way |
| Territory-deep figure text on territory tint (pay/growth/tools/postings big stats) | 4.24–4.47:1 | fail | **pass** | 34–40px / 800 | Yes — always large text where used. Not a real issue, flagged only because close to the line. |
| Green `#217A45` on gold flip-highlight (`$167,180`) | 3.38:1 | fail | **pass** | 40px / 800 | Yes, unambiguous |
| Gold on ink (journey's-end eyebrow/heads/src) | 11.78:1 | pass | pass | — | comfortable |
| endText/cream/muted/ink on cream (body copy, map key, sources line, drawer) | 5.49–16.85:1 | pass | pass | — | comfortable |

**Answering the brief directly: does large-text pass?** Yes for the "2 OF 4" numeral (unambiguous, 3.30:1 ≥
3:1). **No for the eyebrow line** — same 3.30:1 ratio, but at 18px/800-weight it sits just under WCAG's
18.66px bold large-text threshold, so it should be held to 4.5:1 and fails. This is the one genuine, precise
AA violation on the page; the README's own note ("about 3.3:1, which passes only as large text") treats both
uses of gold-on-bar as one case — they're not quite the same case, and the smaller one likely doesn't clear
the bar it's claiming. Cheap fix: darken the bar slightly, bump the eyebrow's weight/size, or lighten the gold
a few points — any one would probably clear it given the margin needed is small (need ~4.5:1, sitting at 3.30).

## Publish readiness

- **Mitch's approval** — `approved: no`. Required before anything ships per house rules. Not given.
- **Not copied to `public/`** — confirmed by direct search: no `public/viz/statistician-vs-data-scientist`
  anywhere in the repo (checked both `./public` and `./baseline/public`). Files to copy, per the README:
  `index.html`, `poster-1080x1350.png`, `poster-1080x1080.png`, `poster-2160x2700.png`, `anim-640x800.gif`.
  **Not** `export.mjs` or `README.md` (source files, explicitly marked not-for-publish).
- **No site entry** — grepped `src/lib/data.ts`'s `blogPosts` array (and `baseline/src/lib/data.ts`): no
  `slug: "statistician-vs-data-scientist"` entry exists yet. The markdown body still needs conversion to
  `contentHtml` per `content-studio/skills/publish/SKILL.md`.
- **Confirmed live, today**: `https://mj2.pro/blog/statistician-vs-data-scientist/` returns "Page not found."
  The post is not live. (Learned incidentally — a stop's real fallback link navigated my browser there during
  interaction testing.)
- **FAQ JSON-LD survival** — same open question the blog draft's own notes raise: confirm the
  markdown→`contentHtml` conversion carries the `<script type="application/ld+json">` block through unmodified.
  I can't check this myself since the conversion hasn't run.
- **Host `message` listener** — the README/blog draft specify a listener that must live in the page shell
  (not the post body, which doesn't run scripts). Could not confirm it exists on the live site since the post
  isn't deployed; release owner should verify before/at deploy, not assume.
- **Semrush** — correctly not run by this pass (off-limits per standing rule) or by the draft (disclosed:
  "not enough API units," 2026-09-12/09-14 attempts both hit this). Re-run `keyword_research` via the browser
  UI before publish, per standing instructions.
- **LinkedIn** — correctly gated, DRAFT ONLY, not posted.

## Ranked fixes

**Blocking**
1. Artifact not copied to `public/`, and no `blogPosts`/`contentHtml` entry in `src/lib/data.ts` — the post
   doesn't exist on the live site in any form yet. Two release-mechanics steps, both already correctly
   identified in the draft's own notes; listed here because the brief asks for blockers explicitly and because
   this pass independently confirmed both are still outstanding today (2026-09-24) via repo search + a live
   404 on the production URL.
2. Mitch's approval outstanding (`approved: no`) — the actual gate, not a quality defect.
3. Title-bar eyebrow line: gold-on-red at 3.30:1 fails WCAG AA (4.5:1) because its 18px/800 size doesn't clear
   the large-text exemption threshold (18.66px). Precise, cheap to fix (see Contrast detail).
4. Mobile iframe-embed legibility: at the exact embed width the blog's own snippet produces (~390px), all text
   below the hero-figure tier (12–26px native — labels, sources, chips, side-signpost titles, stop-header
   names) renders at roughly 4–9px effective and is not legible. Headline stat numbers (34–40px native) remain
   readable. This is confirmed, not the theoretical risk the README flagged — the release owner should decide
   knowingly (accept the desktop-first trade-off, raise the mobile min-height/aspect-ratio, or design a
   distinct compact mobile view) rather than ship it unexamined.

**Optional**
1. FAQ JSON-LD answer #2 is a paraphrase of the visible answer (same facts, different wording) — tidy up for
   structured-data best practice, not a factual issue.
2. LinkedIn's "rudimentary version ... living artifact" framing is split across two sentences rather than the
   literal combined phrase named in the brief — meaning is fully present; same class of nit critic B called
   non-blocking on the prior draft.
3. Four territory-color figure-on-tint pairs (pay/growth/tools/postings big stats, 4.24–4.47:1) and the gold
   flip-highlight (3.38:1) sit under 4.5:1 but are always used at large-text sizes today, so they comply. Worth
   a note if these colors are ever reused at smaller sizes elsewhere in the kit.
4. Keyword-per-section matches are LSI-level variants ("BLS SOC code" vs. stated "BLS occupation code," etc.),
   not literal — consistent with house precedent already established by critic B; not a new issue.
5. The "no BLS code" claim is an absence claim that can't be fetch-verified as conclusively as a positive
   figure; sourcing is reasonable (BLS's own duty-vs-title guidance, live-confirmed today) but carries an
   inherent evidentiary ceiling, same as critic B noted on the prior build.
6. Did not re-run `export.mjs --posters`/`--gif` myself (would have overwritten deliverables outside this
   report's write scope) — relied on reading the audit's logic, cross-checking its size claims against source
   constants, running the non-destructive `--interaction` mode directly, and opening/visually inspecting all 3
   PNGs and the GIF bytes independently. Flagging the methodological choice for the record, not as a defect.

## Verdict

**Not yet publishable — hold for the 4 blocking items above.** The research is sound: all 8 traced figures
match the ledger, all 6 BLS OOH figures were independently re-fetched live today and match exactly (including
correctly using the statistician-specific 11% growth figure rather than the combined-category 10% it's easy to
conflate with), the derived-stat math checks out, and critic B's citation fix (OOH for medians/the flip, OEWS
only on head counts) holds cleanly in the rebuild. The interactive mechanics are real and thoroughly verified,
not just self-reported: the artifact's own `--interaction` audit ran clean at 25/25 under my own execution,
independently cross-checked through a second harness, including the one thing I couldn't force manually
(reduced motion). The GIF is byte-exact to spec (429 frames, loop 0, three holds at the right places, 91.6s
total, well under the 3MB ceiling). Copy is clean on house rules (no hype words, no "agency"), front-matter is
complete, and the FAQ/JSON-LD is valid with only one paraphrased (not wrong) answer. What blocks publish: two
known, already-disclosed release-mechanics steps (copy to `public/`, wire into `src/lib/data.ts`) that are
still outstanding as of this check; Mitch's sign-off; one precise, cheap-to-fix WCAG AA contrast miss on the
title-bar eyebrow; and a newly-confirmed (not merely suspected) mobile-embed legibility problem that the
release owner should decide on deliberately rather than discover after publish.
