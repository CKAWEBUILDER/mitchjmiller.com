# LLM-ads data mandala (final, 2026-09-24)

Hero for post #2, *Ads in Free LLM Answers: What to Buy, What Gets Cited*
(`/blog/optimizing-for-ads-in-free-llm-answers/`). Built on the direction-01 engine
(`viz/directions/01-data-mandala/`, v2): same rose-window armature, paper medallions, reading
rail, 14 px floor, click panel, postMessage jump and three-rendering GIF.

Five sectors are the assistants, clockwise from the top: **ChatGPT**, **Google AI Mode + AI
Overviews** (Gemini app noted), **Microsoft Copilot**, **Perplexity**, **Meta AI**. Three rings,
inner to outer:

1. **Who sees the ads?** Ad tiers, with the paid split where a company discloses it.
2. **How often? What format?** Share of commercial prompts carrying an ad. This is the encoded
   ring: blade length is the rate on a linear 0–30% scale with an ink cap.
3. **What still gets cited?** Sources per answer, and AI Mode's ad-versus-citation overlap.

The same `index.html` is the poster source, the share-card source, the GIF source and the living
interactive version.

---

## Hub: why 5.6%

The hub reads **5.6% of ChatGPT's 900M weekly users pay** (50M paying subscribers ÷ 900M weekly
users, both OpenAI disclosures, February 2026; confirmed against TechCrunch, 27 February 2026).
The yellow gauge arc is 5.6% of the circle.

It is the most defensible number on the wheel: both inputs are the company's own figures, the
arithmetic is one division, and there is no methodology to dispute. The runners-up each carry a
caveat: SE Ranking's 11.53% / 1.95% and 25.94% are single-date snapshots from one publisher, and
Orbit Media's 1.7% comes from 72 prompts for three B2B brands. The title bar leads with the louder
25.94%, with its source line beside it.

---

## Data

Ledger: `content-studio/research/2026-09-24/llm-ads/` (`data.json`, 42 entries; `notes.md`;
`sources.md`), plus the 2026-09-22 zero-click ledger for the ChatGPT rollout dates and BrightEdge.

| Cell | Face | Rail caption | Source | Checked at the primary this pass |
|---|---|---|---|---|
| ChatGPT ① | FREE + GO | Plus, Pro, Business, Edu: ad-free | OpenAI Help Center via Help Net Security; MacRumors | no (help.openai.com returns 403) |
| Google ① | NOT DISCLOSED | Gemini app, 1B users: no ads today | Implicator; WIRED (Nick Fox), 12 Mar 2026 | WIRED **yes** |
| Copilot ① | NOT DISCLOSED | 28M paid seats are enterprise | Microsoft figures via Panto | no |
| Perplexity ① | NO ADS | since Feb 2026 · 100M+ users | ALM Corp; Resourcera | ALM Corp yes |
| Meta AI ① | NO PAID TIER | chats shape ads on Meta's apps | DemandSage; Meta, 1 Oct 2025 | Meta post yes |
| ChatGPT ② | 25.94% (bar) | had an ad · 14.35% off-target | SE Ranking, 50,006 prompts, data 23 Jul 2026 | **yes** |
| Google ② | 29.45% (bar) | of 50,032 keywords showed one | SE Ranking, 50,032 keywords, data 30 Jun 2026 | **yes** |
| Copilot ② | IN ANSWERS | sponsored picks · no rate study | secondary reporting (Thrad, Stackmatix) | no |
| Perplexity ② | 0 | program closed · no waitlist | ALM Corp; Winbuzzer | yes |
| Meta AI ② | TARGETING ONLY | carousel test: US, web only | Meta; MediaPost | Meta yes, MediaPost no |
| ChatGPT ③ | 4.5 | sources per answer, docs-heavy | Orbit Media, 2 Sep 2026 | **yes** |
| Google ③ | 11.53% | ad domain cited · exact URL 1.95% | SE Ranking AI Mode study | **yes** |
| Copilot ③ | NOT MEASURED | no Copilot citation study found | gap | — |
| Perplexity ③ | 19.2 | sources per answer, most of four | Orbit Media | **yes** |
| Meta AI ③ | NOT MEASURED | no Meta AI citation study found | gap | — |
| Hub | 5.6% | of ChatGPT's 900M weekly users pay | OpenAI via TechCrunch | **yes** |
| Title | 25.94% | came back with an ad | SE Ranking | **yes** |
| Ring ③ key | 1.7% | 4 LLMs agree on a cited domain | Orbit Media (30 of 1,792 query-domain pairs) | **yes** |

**Corrections against the ledger, from the primaries:**

- AI Mode citation overlap is **11.53%**, not 11%. The ledger took Search Engine Journal's
  rounding; SE Ranking's own page says "Only 11.53% of advertiser domains showed up among the
  cited sources, and just 1.95% at the exact URL."
- That study's 50,032 keywords were "all selected to trigger a website (text) ad", data collected
  30 June 2026, published 14 July (the ledger dated it by SEJ's 21 July write-up). The rail and
  post say "ad-triggering keywords" for that reason.
- The ChatGPT study was published 10 August 2026; data collected 23 July.
- Gemini (critic fix, 24 September): the ledger's December 2025 "no current plans to change that"
  line is superseded. WIRED, 12 March 2026 (Maxwell Zeff), fetched this pass: Google SVP Nick Fox,
  "No, we're not ruling them out. It's just not where we've been focusing," and "there are no ads in
  the Gemini app at this point." The rail says "no ads today"; the panel quotes Fox.
- The ledger's "no opt-out" for Meta AI is not used: Meta points users to Ads Preferences and
  Proton describes an objection request. The Meta ring-① face is NO PAID TIER instead.

`NOT DISCLOSED` means the company hasn't published the figure; `NOT MEASURED` means no study was
found for this piece. Both are spelled out on dashed grey discs, never abbreviated. The 14.35%,
1.95% and 1.7% figures appear in the rail and key rather than as medallion faces.

---

## Layout

**4:5 (1080×1350, hero and 2× zoom):** title bar (178 px) · ring key strip (52 px) · wheel
(R 442) · reading rail · footer (three source lines + `mj2.pro`). The rail has **one line per
assistant**: name, then the ① ② ③ captions in three columns, each behind a numbered chip.

**Square (1080×1080):** there is no room for the key strip or rail at 14 px, so the wheel takes
the full height (R 448) and the four corners carry the rest: ring key top-left and top-right,
assistant legend bottom-left, blank-cell key and wordmark bottom-right, two source lines in the
footer. The headline runs on one line. No per-cell captions; the 4:5 and the living version carry
them.

**Share card (1200×630, `ads-in-free-llm-answers-data-mandala-1200x630.png`):** the post's
`og:image` per `docs/site-standards.md`. Left panel: kicker, the 25.94% headline, subline, ring key,
hub caption, blank-disc key, headline source and `mj2.pro`. Right: the wheel at R 296 with medallion
discs and ring badges but no faces (fifteen faces can't hold 14 px in a thumbnail), short crown
names and the 5.6% hub.

Geometry (fractions of R): hub 0.24, band 0.204, gap 0.018, crown 0.082 (4:5: R 442, band 90 px, number discs r 43, word discs r 47). Number medallions sit
inside their band (r = band/2 − 2); word and blank medallions are wider, (band + gap)/2 − 2.5, so
"DISCLOSED" and "TARGETING" clear 14 px. They cover the ring rules (drawn above them), never each
other.

---

## Readability audit

`node export.mjs --verify` opens each canvas and checks every `<text>` run for:

- **type floor:** anything under 14 px normalised to 1080 wide;
- **overlaps:** ink boxes (cap height to baseline, plus descenders only where the run has them);
- **containment:** every run registers the disc or box it was drawn for; the audit fails any run
  whose ink leaves its medallion, hub core, rail cell, key chip, title bar or footer. Corner text in
  the square must stay outside the wheel. Rules, spokes and separators live only on container
  edges, so a contained run can't be crossed by a line;
- **crown fit:** each curved name fits its plate's arc and thickness.

Current output:

```
verify 1080x1350: 84 text runs, 0 under 14px, 0 overlaps, 0 outside their box, 0 crown misfits
verify 1080x1080: 54 text runs, 0 under 14px, 0 overlaps, 0 outside their box, 0 crown misfits
verify 1200x630: 23 text runs, 0 under 14px, 0 overlaps, 0 outside their box, 0 crown misfits
verify 640x800 (gif canvas): 84 text runs, 0 overlaps, 0 outside their box
```

All three posters and the share card were opened and read at full size, and the 2× poster checked at 1:1 around the
hub, the Google crown and the Copilot and Meta stacks.

---

## Motion (the GIF)

`anim-640x800.gif`: **0.99 MB**, GIF89a, NETSCAPE loop count 0 (loops forever), 226 frames,
11 fps. Read back from the file's bytes: 210 moving frames at 9 cs, 12 beats at 70 cs, 3 settled
holds at 150 cs, 1 final hold at 5,000 cs. **Loop 81.8 s.**

One rendering is a slowed assembly with a beat between stages:

| stage | seconds | what moves |
|---|---|---|
| crown | 0.00 → 1.30 | five crown wedges + name plates, 0.10 s stagger |
| beat | 0.70 | one frame, one long delay |
| ring ③ | 2.00 → 3.10 | outer band + medallions |
| beat | 0.70 | |
| ring ② | 3.80 → 4.90 | middle band, ad-rate blades + medallions |
| beat | 0.70 | |
| ring ① | 5.60 → 6.70 | inner band + medallions; title number starts rolling |
| beat | 0.70 | |
| hub | 7.40 → 8.45 | gauge sweeps to 5.6%, hub number rolls, title lands on 25.94% |
| settled hold | 1.50 | one frame |
| reverse wipe | 9.95 → 10.55 | back to bare armature (renderings 1 and 2 only) |

Three renderings (10.85 s, 10.85 s, 10.31 s), then the settled wheel held **50 s**, then loop.
Beats and holds are single frames with long delays, so the long loop stays under a megabyte.

---

## Living version (blog embed)

Prompt above the wheel: **"Click an assistant: see who sees ads there, and what still earns a
citation."** Sectors are `role="button" tabindex="0"` paths (Tab, Enter/Space, Escape;
`aria-pressed` tracks the selection). Selecting one veils the other four and opens a panel:

- **Ad status** (dated), **Who sees them**, **Measured**;
- **What you can buy today**, with cost and eligibility as sourced;
- **What still earns a citation** (organic levers);
- a **representative drawing** of the ad format, labelled on the image and in the caption as
  drawn from the ledger, not a screenshot;
- **Read the … section ↓**.

The jump posts `{type:'viz-intent', intent:'<slug>'}` to the parent **and** is a plain
`<a target="_top">`, so it works without a listener. Its target, in order:

1. the host page's own URL when the embed sits on the post itself (same origin), so a utm-tagged
   URL is kept and the jump is an in-page hash change, not a reload;
2. a `?parent=` whose origin is `https://mj2.pro` or a localhost test host;
3. otherwise the canonical post, `https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/`.

`document.referrer` is never used (it can be any site). `javascript:`, `data:`, relative,
protocol-relative, lookalike-host (`mj2.pro.evil…`, `mj2.pro@evil…`), plain-http and foreign-origin
`?parent=` values are refused. The page also posts `{type:'viz-resize', height}` on load, on panel
open/close and on resize, so the parent can size the iframe.

**Pause control.** The assembly runs 8.45 s, so the prompt bar carries a **Skip animation**
button (WCAG 2.2.2); it settles the wheel at once and becomes **Replay animation**. Under
`prefers-reduced-motion: reduce` nothing autoplays and the button offers **Play animation**. The
skip, close and jump buttons are all at least 44 px tall. Slugs and anchors: `chatgpt`, `google-ai-mode`, `copilot`, `perplexity`, `meta-ai` →
`#assistant-chatgpt` … `#assistant-meta-ai`.

```html
<iframe src="/viz/llm-ads-mandala/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Foptimizing-for-ads-in-free-llm-answers%2F"
        title="Ads inside free AI answers: five-assistant data mandala"
        loading="lazy" width="100%" height="1120" style="display:block;width:100%;border:0"></iframe>
```

The parent-page listener (origin check, both message types) is in the blog draft's notes,
`content-studio/drafts/2026-09-24-ads-in-free-llm-answers.blog.md` §1.

**API:** `window.VIZ.selectAssistant(slug)` (alias `selectIntent`; returns `false` on an unknown
slug), `.selected`, `.assistants`, and the export hooks `seek(s)` / `seekMs(ms)` / `duration` /
`settled` / `framePlan(fps,{wipe})` / `audit()`.

---

## Commands

Run from this folder. Needs Node and the Chrome already on the Mac; borrows
`viz/kit/export/lib/browser.mjs` and resolves `gifenc` + `pngjs` from `viz/kit/node_modules`.
Writes only here; fails if the page touches the network.

```sh
cd content-studio/viz/final/llm-ads-mandala
node export.mjs              # posters (1x + 2x) + verify + GIF
node export.mjs --posters    # poster-1080x1350 / 1080x1080 / 2160x2700 + 1200x630 share card
node export.mjs --verify     # floor, overlap, containment, crown audit; exits 1 on a finding
node export.mjs --gif        # anim-640x800.gif (226 frames, 11 fps, 0.99 MB)
node export.mjs --gif --fps 12 --colors 96 --hold 45
```

Preview off disk: `open index.html` (living), `open "index.html?poster=1&size=1080x1080"`,
`open "index.html?size=640x800&t=3.1"`. Params: `?size=WxH` · `?t=<s>` · `?poster=1` ·
`?static=1` · `?parent=<blog url>`.

---

## Verification, and what is not verified

Driven in headless Chrome over throwaway hosts on `localhost:5321` and `127.0.0.1:5322` (both
stopped afterwards):

- **Jump fallbacks, 15 of 15** (after the critic pass). No `?parent=` and no referrer, a foreign
  referrer at top level, a cross-origin frame with no `?parent=` and `?parent=javascript:alert(1)`
  all land on `https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/#assistant-<slug>`.
  Test navigations to mj2.pro were intercepted and aborted, so nothing was fetched. No dialog ran.
  A foreign `?parent=` and 8 parser edge cases resolve as expected. A same-origin utm-tagged host
  jumps in-page with no reload, and an allowed local parent is honoured.
- **Pause control, 7 of 7.** Skip settles mid-play by keyboard, flips to Replay and keeps focus;
  Replay restarts; the label returns to Replay at the end; skip, close and jump are 44 px tall;
  reduced motion paints the settled frame and offers Play.
- **Panel regression.** The assembly settles on 25.94% / 5.6%; five sector buttons; the Google
  panel opens with five section heads; `aria-pressed` tracks it; the jump posts `viz-intent` and
  lands the host on the anchor; `viz-resize` resized the host iframe (2,406 px with the panel open);
  Tab + Enter opens Perplexity; Escape closes; an unknown slug is rejected; with no `?parent=` the
  jump falls back to the canonical post. The only console error was the throwaway host's missing
  `favicon.ico`.

Panels were also screenshotted at 1,150 px (two columns) and 390 px (one column, no horizontal
scroll).

**Not verified:**

- **Numbers not re-fetched this pass** carry the ledger's confidence: Google Ads Help quotes,
  Gemini quote, AI Max upgrade, Microsoft import tool, Copilot audience and vendor CTR claim,
  Perplexity audience, Meta audience and carousel test, Quoleady, BrightEdge, and every OpenAI
  figure other than the TechCrunch pair.
- **Copilot's in-answer placement mechanic** rests on secondary reporting; Microsoft's own page
  documents the ad-buying assistant, not the placement.
- **Phone rendering of the posters.** Every run clears 14 px at 1080 wide; a 1080 poster shown at
  about 390 px puts faces like 25.94% near 7 px. The headline, crown names and hub survive; the
  rail needs the 2× poster or the living version.
- **The GIF in LinkedIn, X, Slack or Safari.** Delays were read from the file, not watched. A
  client that clamps long delays shortens the 50 s hold without breaking the loop.
- **The parent page.** The listener and anchors were tested on a throwaway host, not the real
  mj2.pro template. Nothing was copied to `public/`, built, committed or deployed.

## Files

`index.html` · `export.mjs` · `poster-1080x1350.png` · `poster-1080x1080.png` ·
`poster-2160x2700.png` · `ads-in-free-llm-answers-data-mandala-1200x630.png` (share card) ·
`anim-640x800.gif` · `README.md`
