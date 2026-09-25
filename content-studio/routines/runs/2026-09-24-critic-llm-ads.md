# Critic pass — 2026-09-24 — llm-ads-mandala ("Ads in Free LLM Answers")

Critic: independent, read-only except this file. No git, no site build, no purchases/logins/posting.
Local static servers on ports **5311** (artifact root) and **5312** (three purpose-built postMessage
host harnesses) for browser checks — both started and stopped by this pass. Two foreign Python
processes on **5302/5303** were already listening before this pass started (same ports flagged as
"not mine" in today's earlier `2026-09-24-critic-titles.md`) — left untouched, not opened by me.
Today: 2026-09-24.

Target: `content-studio/viz/final/llm-ads-mandala/` (index.html, export.mjs, README.md, 3 posters,
anim-640x800.gif); drafts `content-studio/drafts/2026-09-24-ads-in-free-llm-answers.{blog,linkedin,x}.md`;
ledger `content-studio/research/2026-09-24/llm-ads/{data.json,notes.md,sources.md}` (42 entries).
Parent post `https://mj2.pro/blog/search-results-by-intent/` re-checked live: **200**.

---

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Numbers: 10 figures traced to ledger + live re-fetch of 9 primaries | **PASS, 1 stale quote, 2 ledger gaps** | See figure table. 9/10 re-fetched primaries match word-for-word or number-for-number. 1 (Gemini "no current plans") is accurately quoted but **superseded** by a later on-record Google statement. 2 figures used in the post (BrightEdge 54.5%, Pew 1%) are real and correctly sourced — but sourced to the **sibling** 2026-09-22 ledger, not re-entered or pointered in *this* post's own ledger. |
| — | Hub arithmetic | **PASS** | 50,000,000 / 900,000,000 = 5.5556% → **5.6%**, matches hub exactly. 14,733/50,032 = 29.445% → **29.45%** (AI Mode). 12,974-equivalent/50,006 → **25.94%** (ChatGPT). 30/1,792 = 1.674% → **1.7%** (Orbit). All confirmed by independent computation, not just ledger copy. |
| — | "Not disclosed" / "not measured" cells | **PASS** | All 5 ND/NM medallions (Google-①, Copilot-①, Copilot-③, Meta AI-③, plus rail "not disclosed" captions) match a ledger entry that explicitly states the figure was searched for and not found — none is a company figure being hidden. |
| 2 | Text audit — `node export.mjs --verify`, PNGs incl. 2× at 1:1 | **PASS, reproduced independently** | Ran the script myself (read-only, no network, no writes): `verify 1080x1350: 84 text runs, 0 under 14px, 0 overlaps, 0 outside their box, 0 crown misfits` / `1080x1080: 54 text runs, all 0` / `640x800 (gif canvas): 84 text runs, 0 overlaps, 0 outside their box` — **exact match to README's claimed output**, exit clean. All three posters opened in full; two true 1:1 crops of the 2160×2700 file (hub, a rail row) show crisp curved type, no bleed, no line crossing text. |
| 3 | GIF: header, NETSCAPE loop, delays, size | **PASS, byte-verified** | `GIF89a`, 640×800, **226 frames** (PIL). `NETSCAPE2.0` extension found at byte offset 400, loop=0 (infinite, confirmed via `im.info['loop']`). Delay histogram, parsed from the file directly: **210 × 90 ms** (moving frames) · **12 × 700 ms** (beats) · **3 × 1,500 ms** (settled holds) · **1 × 50,000 ms** (final hold). Sum **81,800 ms = 81.8 s/loop**, matches README exactly. Three renderings confirmed in `export.mjs` source (`[...cycleWipe, ...cycleWipe, ...cycleLast, finalHold]`). File size **1,035,980 B ≈ 0.99 MB**, well under 3 MB. |
| 4 | Interaction @1360 and @390 | **1 BLOCKING bug, rest PASS** | See Interaction detail below — every check was live-driven, not read from source alone. Sectors clickable and keyboard-reachable (Tab→Enter, confirmed by screenshot sequence), Escape closes (confirmed), postMessage `viz-resize` fires with the exact documented shape (confirmed twice via a real cross-origin iframe host), no external network requests at any point (full request log audited), reduced motion verified by code-path inspection only (tool has no reduced-motion emulation control — same limitation the builder's own README implicitly has, since its verification list doesn't claim to have driven this live either). **Jump-link target resolution fails in 3 of 4 tested scenarios** — see blocking fix #1. |
| 5 | Copy: house rules, keyword/section, front-matter, FAQ+JSON-LD, Sources, share CTA, mj2.pro URLs, embed path, anchors, schema dispute, no dead Perplexity advice, case-study line, LinkedIn/X length | **1 BLOCKING (LinkedIn length), rest PASS** | See Copy detail below. |
| 6 | Contrast pairs under 4.5:1 | **PASS** | Computed WCAG contrast for every text/background pairing in the palette (20 pairs). **Every pair actually used for text clears 4.5:1**; the tightest is INK-on-Google's-tinted-crown-plate at 13.95:1 (plate is a 20%-tint, not the raw hue — I initially mis-tested against the raw hue and corrected it). One color (`NM #9A8F81`, 2.96:1 against paper) is used only for **decorative strokes/fills** (dashed "not disclosed" ring outline, band tint), never as text — technically under the separate 3:1 non-text-UI minimum, optional fix. |
| 7 | Publish readiness | **Nothing copied to `public/` yet; 1200×630 card missing (fallback exists)** | See Publish readiness below. |

---

## Figure table

| # | Figure (poster/post) | Ledger trace | Primary re-fetch | Verdict |
|---|---|---|---|---|
| 1 | **50M / 900M → 5.6%** paid ChatGPT users (hub) | `data.json:chatgpt_wau_paid_split`, high confidence | TechCrunch, 27 Feb 2026: *"ChatGPT has reached 900 million weekly active users"* / *"50 million paying subscribers"* | **Exact match** |
| 2 | **25.94%** ChatGPT commercial prompts with an ad; **14.35%** off-target | `data.json:chatgpt_ad_relevance_share_seranking` / `..._offtarget_seranking` | seranking.com/blog/chatgpt-ads-study/: *"ChatGPT shows ads on 25.94% of commercial prompts"*; *"14.35% were no more closely related to their own query than an ad paired with a random query"*; 50,006 prompts, data 23 Jul 2026 | **Exact match** |
| 3 | **29.45%** AI Mode commercial keywords with a text ad | `data.json:google_ai_mode_ad_share_and_citation_gap_seranking` | seranking.com/blog/google-ai-mode-ads/: *"Out of the 50,032 commercial keywords we analyzed, 14,733 returned a text ad... That is 29.45%"*; published 14 Jul 2026, data 30 Jun 2026 | **Exact match**, and dates are *more* precise than the ledger's SEJ-sourced 21 Jul date |
| 4 | **11.53%** ad-domain citation overlap / **1.95%** exact-URL overlap (AI Mode) | Ledger's own field literally says "**11**" (SEJ rounding); the draft's own notes claim a "correction" to 11.53% | Same seranking.com page, verbatim: *"Only 11.53% of advertiser domains showed up among the cited sources, and just 1.95% at the exact URL"* | **Builder's correction is verified accurate.** Primary itself says 11.53%, not 11% — the *post* is right; the *ledger file* (data.json) was never amended and still reads "11%" (optional fix). |
| 5 | **1.7%** cross-model citation agreement; **19.2/8.1/4.5/3.6** sources per answer | `data.json:citation_diversity_across_llms_orbitmedia` | orbitmedia.com/blog/ai-citation-sources/ (curl→403, WebFetch succeeded): *"all four models only agreed on citing the same domain... 30 times. That's 1.7%"*; per-platform averages confirmed verbatim; 13,184 citations / 1,765 answers confirmed; published 2 Sept 2026 | **Exact match** |
| 6 | Google Ads Help: *"can't directly target"* / *"can't opt out"* (AI Overviews) | `data.json:google_aio_ad_buying_mechanics`, high confidence, direct fetch | support.google.com/google-ads/answer/16297775: both quotes verbatim; Search/Shopping/PMax eligible; sensitive verticals excluded | **Exact match.** New detail not in post: AIO ads are English-only, 12 countries — post doesn't claim otherwise, so not an error, just unmentioned scope (optional). |
| 7 | Gemini: *"no ads in the Gemini app and... no current plans to change that"* | `data.json:gemini_app_ad_free_vs_ai_mode`, high confidence | searchengineland.com blocked WebFetch (403); WebSearch corroborates the quote (Dan Taylor, Google VP Global Ads, Dec 2025) — **but** a later ALM Corp piece quotes Google SVP Nick Fox to WIRED, "early 2026": *"No, we're not ruling them out. It's just not where we've been focusing"* — specifically about the Gemini **app** | **Quote is accurately reported but stale.** Google's own most recent on-record position is softer than "no current plans to change that." Underlying fact (0 ads live today) likely still holds; the framing doesn't. **Blocking fix #3.** |
| 8 | Perplexity ads: **~$20K of $34M** (2024), ended **Feb 2026**, "accuracy business" | `data.json:perplexity_no_ad_program_today` | almcorp.com: Feb 18 2026 date confirmed; "$20,000 out of $34 million... less than 0.1%" confirmed; "the accuracy business" phrase confirmed (embedded in a longer quote) | **Exact match** |
| 9 | arXiv 2608.05008: 91 accounts, 335 prompts, 3,000+ ads/186 advertisers, income-disparity finding | `data.json:openai_ads_academic_targeting_audit`, high confidence | arxiv.org/abs/2608.05008: title/authors (Lurie, Encarnación, Friedler, Metaxa) confirmed; *"lower-income accounts, regardless of race, are more likely to receive ads"* confirmed verbatim; all sample-size figures confirmed | **Exact match** |
| 10 | Microsoft: **73%** CTR / **16%** conversion / **33%** shorter journeys | `data.json:microsoft_copilot_ctr_vendor_claim`, direct fetch | about.ads.microsoft.com blog, 6 Aug 2025: all three figures confirmed verbatim, methodology line confirmed word-for-word | **Exact match** (vendor-published, correctly caveated as "unaudited" in the post) |
| 11 (bonus) | **54.5%** of AIO citations also rank organically (Google organic-citation panel + blog body) | **Absent from this post's `data.json`/`notes.md`/`sources.md`.** Found instead in `2026-09-22/zero-click-future/data.json` (value 54.5, BrightEdge, confirmed direct-fetch there) | Not re-fetched this pass (out of this post's own ledger, so out of scope for re-verification here) | **Figure is real and correctly attributed — but this post's ledger doesn't carry it.** Add a cross-reference pointer (optional fix). |
| 12 (bonus) | Pew: **1%** of AI-summary visits click a link inside the summary (blog body) | Same gap: not in this post's ledger; found in `2026-09-22/zero-click-future/data.json` line ~282 (part of the same Pew entry the `does_not_duplicate` note says is carried over, but that note only names the "8%-vs-15%" half, not the 1% figure explicitly) | Not re-fetched this pass | **Real figure, same ledger-pointer gap as #11** (optional fix) |

**Sources-section URL audit** (blog.md, 33 distinct URLs — not 32 as the draft's own notes claim):
25 return 200, 8 return 403 (bot-blocks: SSRN, Quartz, Search Engine Land ×3, Search Engine Watch,
Orbit Media, SEC — same 8-item list the draft names). **No 404s.** The draft's self-reported "24 of
32" undercounts by one URL and one 200; composition of the 403 set is otherwise accurate (optional
fix — arithmetic only, doesn't change any figure).

---

## Interaction detail (live-driven, both viewports)

Served the artifact from `:5311`; built three throwaway host pages on `:5312` replicating the
release owner's own postMessage-listener contract (blog.md §1) to test the normal embed, the
no-`?parent=` case, and the `?parent=javascript:...` case separately.

- **Sectors clickable + keyboard reachable.** Mouse click opens the panel (tested ChatGPT and
  Google AI Mode). `Tab` moves focus to a sector (`role="button" tabindex="0"`), `Enter` opens it
  (confirmed by the selection veil appearing around the other four sectors in a before/after
  screenshot pair), `Escape` closes it (veil removed, confirmed by a third screenshot). Document-level
  Escape handler also present and independently confirmed.
- **postMessage `viz-resize`.** Fired on load and on panel open, exact shape
  `{"type":"viz-resize","height":1471}` → `{"type":"viz-resize","height":2377}`, received by a
  **cross-origin** host (`:5312` iframing `:5311`) — proves the channel works end-to-end with `'*'`
  targeting, not just in-source.
- **No external requests.** Full network log across the entire session (initial loads, every click,
  every panel open, both viewports, all three parent scenarios): **only** `localhost:5311` and
  `localhost:5312` requests appear. Zero calls to any third-party host, webfont, or analytics
  endpoint.
- **Reduced motion.** `matchMedia('(prefers-reduced-motion: reduce)')` correctly gates `playOnce()`
  and renders `T.settled` immediately (index.html:326-329, 927-928) — verified by code path, not
  emulated live (the browser tool used here has no reduced-motion emulation control).
- **1360 px.** Two-column panel (`@media (min-width:720px)`) renders correctly; wheel, key strip,
  reading rail all fit inside 1360 with no clipping.
- **390 px.** `document.documentElement.scrollWidth === clientWidth === 390` — **programmatically
  confirmed zero horizontal scroll**, not just eyeballed. Panel collapses to one column correctly.

### BLOCKING: jump-link target resolution fails whenever `?parent=` is absent or invalid

`parentBase()` (index.html:934-942) is:
```js
const raw = Q.get('parent') || document.referrer || '';
if (!raw) return '';
const u = new URL(raw, location.href);
if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';
return u.origin + u.pathname + u.search;
```
There is **no hardcoded canonical fallback**. Three scenarios reproduced, each ending with the
"Read the [X] section" link (`target="_top"`) landing somewhere other than
`https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/#assistant-<slug>`:

1. **No `?parent=`, no referrer** (direct navigation — e.g. a bookmark, or a search-engine result
   pointing straight at the standalone page). Inspected the link's `href` attribute directly:
   `#assistant-chatgpt` — a bare in-page anchor. The standalone page has no such element, so the
   click is a silent no-op.
2. **No `?parent=`, referrer present** (the page reached via a link from another site). Built a
   harness at `:5312` that iframes the artifact with no `?parent=`; Chrome sends the trimmed
   `strict-origin-when-cross-origin` referrer (`http://localhost:5312/`). Clicked through for real:
   the **entire top-level tab navigated to `http://localhost:5312/#assistant-chatgpt`** — confirmed
   by `tabs_context` (origin flipped from `:5312`'s harness page to a directory listing at `:5312`
   root) and a screenshot showing "Directory listing for /". In production this is the referring
   **third-party site's own homepage** with a meaningless hash — e.g. a reader who reaches the
   standalone `/viz/llm-ads-mandala/` page from a LinkedIn or Reddit link would be bounced back to
   linkedin.com or reddit.com, not to mj2.pro.
3. **`?parent=javascript:alert(1)`.** The protocol check does correctly refuse this — no `javascript:`
   URL is ever assigned to an `href`, no code executes (confirmed: no alert dialog, no console error).
   **This specific security check passes.** But because `Q.get('parent')` is truthy, it short-circuits
   the `||` chain *before* falling back to `document.referrer`, so the function returns `''` — same
   broken bare-anchor path as scenario 1, except this time `target="_top"` resolves the relative
   `#assistant-chatgpt` against the **iframe's own document base**, and clicking it navigated the
   whole tab to `http://localhost:5311/content-studio/viz/final/llm-ads-mandala/index.html#assistant-chatgpt`
   — confirmed via `tabs_context` showing origin `5311`. Not dangerous, still not the blog.

This is directly reachable in the shipped draft: blog.md's own fallback link is
`<a href="/viz/llm-ads-mandala/">Open the full-screen version</a>` (blog.md:42) — **no `?parent=`
query string** — so any reader who uses that exact link and then clicks a section link inside the
panel hits failure mode 1. **Fix:** give `parentBase()` a hardcoded canonical default
(`https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/`) for when `?parent=` is absent or
fails validation, and stop trusting `document.referrer` as a navigation target at all (it can be any
site on the internet). Cheapest complementary fix: append `?parent=` to the blog's own "Open the
full-screen version" link too, but that doesn't fix scenario 2/3 for anyone who lands on the
standalone page some other way.

---

## Copy detail

- **House rules.** Zero hits for revolutionary / game-changer / everyone / nobody / changed
  everything / best ever / "agency" / "agencies" across all three drafts (blog, LinkedIn, X). **PASS.**
- **One keyword per section.** Table present in blog.md §2 draft-notes, one keyword + LSI envelope
  per section, matches the actual section headers. **PASS.**
- **Front-matter.** Blog: `title, slug, url, suggested_url, date, kw, kw_secondary, kw_note, insight,
  meta_description, teaser, cta, infographic, image_alt, parent, status, approved` all present;
  `approved: no`, `parent: search-results-by-intent` — **matches the brief exactly.** LinkedIn and X
  front-matter also complete for their own schemas (`post, target/handle, route, attach, image_alt,
  link, status, approved`). **PASS.**
- **FAQ + JSON-LD.** 4 visible FAQ Q&As; JSON-LD block parses as valid JSON, `@type: FAQPage`, 4
  `mainEntity` entries whose `name` fields match the 4 visible questions **exactly**, word-for-word
  answer text matches too. **PASS** on validity/match. Not yet in the document `<head>` — it's inline
  in the markdown body, correctly flagged by the builder as a release-owner task (optional/checklist,
  not a content defect).
- **Anchors.** All 5 required ids present and correctly slugged: `assistant-chatgpt`,
  `assistant-google-ai-mode`, `assistant-copilot`, `assistant-perplexity`, `assistant-meta-ai`
  (blog.md:52,62,70,76,82) — matches the viz's own `ASSISTANTS[].slug` values exactly. **PASS.**
- **Schema-markup dispute.** Presented as genuinely unresolved: *"Unresolved... None was re-fetched
  verbatim here... Ship schema as hygiene; don't sell it as a citation lever"* (blog.md:104-106).
  No side is picked. **PASS.**
- **No dead Perplexity-waitlist advice.** Blog explicitly states *"Missing on purpose: a Perplexity
  advertiser waitlist, which doesn't exist"* (blog.md:90) and the lever table has no Perplexity row.
  **PASS.**
- **First-person AEO case-study line.** Blog: *"The prompt-set tracking I've built for AI citation
  share covers ChatGPT, Perplexity and Google AI Overviews"* linking `/case-studies/aeo-visibility-infrastructure/`.
  Fetched the live page: it lists, third-person, *"Prompt-set monitoring, citation velocity, AI
  share-of-voice... across ChatGPT, Perplexity, Google AI Overviews."* **Platforms match exactly**;
  the phrasing is a first-person paraphrase of third-person case-study copy. Builder already flagged
  this for Mitch's sign-off (blog.md §4.1) — leaving it **pending, not broken.**
- **Every URL mj2.pro.** All in-body links are relative (`/blog/...`, `/case-studies/...`) — resolve
  to mj2.pro on the live site, never hardcode a different domain. **PASS.** All 4 internal links
  (aeo-geo-measurement-framework, case-studies/aeo-visibility-infrastructure, entity-seo-for-ai-retrieval,
  search-results-by-intent) return live **200**.
- **Embed path.** `iframe src="/viz/llm-ads-mandala/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Foptimizing-for-ads-in-free-llm-answers%2F"`
  (blog.md:30) — correct path, correct `?parent=`, URL-encoded correctly. **PASS.**
- **Share CTA.** Present, identical wording, in front-matter `cta`, in-body `<!--CTA-->` block, and
  end of LinkedIn post. **PASS.**
- **LinkedIn.** Contains the "rudimentary version" line (*"The GIF is the rudimentary version of the
  living artifact"*) and the share line. **Length: 1,509 characters** (measured precisely, body only,
  excluding markdown scaffolding) — **exceeds the 1,400-char cap by 109 characters.** The drafter's
  own `post_linter.py` scored it 98/100 SHIP at the same 1,509-character count — that gate is
  evidently tracking something else (mobile-fold hook, hashtag count, no body links), not a 1,400
  hard cap, so it shipped this as passing when it doesn't clear this brief's stated bar. **Blocking
  fix #2.**
- **X posts.** Post 1: 272/280. Post 2: 278/280 (2 chars of margin — fragile to any future edit, not
  currently a violation). Reply: 200 raw chars, ~80 X-weighted (long URL counts as 23 by X's own
  rule) — well under. **All three PASS ≤280**, Post 2's margin noted as informational only.

---

## Contrast detail

Computed WCAG 2.x contrast ratios for every text/background color pairing actually used in the
artifact's CSS and SVG (20 pairs). Selected results:

| Pairing | Ratio | Note |
|---|---|---|
| INK on PAPER (body text, medallion numbers) | 17.69:1 | |
| INK_SOFT on PAPER (source captions) | 7.23:1 | |
| HOT on INK / INK on HOT (title bar, highlighted keyword) | 14.95:1 | |
| INK on Google's crown **plate** (`tint(hue,0.20)`, not the raw hue) | 13.95:1 | Tightest of the 5 crown plates, still far clear |
| "NOT DISCLOSED/MEASURED" label `#6E6457` on paper | 5.41:1 | |
| `#0B63CE` focus-visible outline on paper | 5.31:1 | Clears both the 3:1 (UI) and 4.5:1 (text) bars |
| `NM #9A8F81` (decorative stroke/fill only — dashed ring outline, band tint) | 2.96:1 | Never used as text; optional to darken for the 3:1 non-text-UI minimum |

**No text pairing falls under 4.5:1.** **PASS.**

---

## Publish readiness

- **Files to copy** (per blog.md §1, confirmed accurate): `index.html` → `public/viz/llm-ads-mandala/index.html`;
  `poster-1080x1350.png` → same dir (noscript fallback + LinkedIn still); optionally the 2160×2700 and
  1080×1080 posters; `anim-640x800.gif` for LinkedIn/X only, not the page. **Confirmed: `public/viz/`
  does not exist yet** — nothing has been copied, built, or deployed. This is the expected
  pre-publish state, not a defect.
- **1200×630 social card: genuinely missing.** No `og:image`-sized asset exists in the folder. Builder's
  stated fallback (point `og:image` at `poster-1080x1080.png`, or accept the site-default) is
  reasonable as a stopgap — optional to build a proper card before or shortly after publish.
- **Parent post note is stale and wrong.** blog.md's own draft-notes (§1) say *"Parent post... returned
  404 on 24 September 2026."* Re-checked live just now: `https://mj2.pro/blog/search-results-by-intent/`
  → **200**. The note must be corrected before handoff so the release owner doesn't treat this as an
  open blocker (or worse, stops trusting the *other* "checked live" claims in that same section
  without re-verifying) — **blocking fix #4, but trivial: delete or update one sentence.**
- **JSON-LD placement, Copilot source pins:** both already flagged by the builder as release-owner
  tasks; carried into optional fixes below rather than re-flagged as new findings.

---

## Ranked fixes

### Blocking (fix before publish)

1. **Jump-link fallback is broken whenever `?parent=` is absent or invalid** — confirmed live in 3
   scenarios (no-parent/no-referrer, no-parent/foreign-referrer, invalid-scheme parent), one of
   which is directly reachable from the blog's own "Open the full-screen version" link. Give
   `parentBase()` a hardcoded canonical default; stop trusting `document.referrer` for navigation.
   `index.html:934-942`.
2. **LinkedIn post is 1,509 characters against a 1,400-char cap** (109 over). Trim before posting.
3. **Gemini "no current plans to change that" quote is stale.** Google SVP Nick Fox told WIRED
   (early 2026, per ALM Corp's reporting) *"we're not ruling them out"* for the Gemini app
   specifically — a more recent, on-record softening of the Dec-2025 denial this post/viz both quote
   as current. Soften the claim or add the more recent statement, in both `blog.md` and
   `index.html`'s Google `status` array.
4. **Draft's own "parent post 404" note is now false** (parent is live, 200). Correct or delete the
   sentence in blog.md's draft-notes before handoff.

### Optional (recommended, non-blocking)

5. Add cross-reference pointers in `content-studio/research/2026-09-24/llm-ads/{data.json,sources.md}`
   for the BrightEdge 54.5% and Pew 1% figures actually used in the post — both are real and correctly
   sourced, just absent from this post's own ledger.
6. Amend `data.json:google_ai_mode_ad_share_and_citation_gap_seranking`'s note field from "11%" to
   "11.53%" so the ledger matches the primary the drafter already re-checked.
7. Move the FAQPage JSON-LD from the markdown body into the actual document `<head>` at publish time
   (already on the builder's own list).
8. Pin real URLs for the Copilot in-answer placement claim (currently "Thrad, Stackmatix" with no
   links) or soften further to "reported" (already on the builder's own list).
9. Build a real 1200×630 social card; the square-poster fallback is fine short-term.
10. Correct the Sources-URL self-report from "24 of 32" to the actual "25 of 33" (200/total) — no
    figure changes, arithmetic only.
11. Darken `NM #9A8F81` slightly if a stricter 3:1 non-text-UI margin is wanted; it's currently 2.96:1
    and used only for decorative strokes/fills, never text.
12. Mention AI Overview ads' actual scope (English, 12 countries) somewhere near the Google section —
    not a false claim as written, just unstated scope.

---

## Verdict

**HOLD — 4 blocking fixes, all small and concrete.** Research is exceptionally clean: 9 of 10 traced
figures matched their primary sources exactly on live re-fetch (the SE Ranking AI Mode 11.53%
correction the builder made against the ledger's rounded 11% is itself verified accurate), hub and
every displayed percentage recompute correctly, the GIF and posters reproduce their own documented
audit output byte-for-byte, and copy passes every house-rule and structural check (FAQ/JSON-LD,
anchors, schema-dispute framing, no dead Perplexity advice, mj2.pro-only links). The defects found are
narrow and specific, not systemic: one real interaction bug in the parent-URL fallback path (reachable
from the blog's own full-screen link), one hard length violation (LinkedIn, trim ~110 chars), one
stale quote (Gemini/Fox), and one stale note in the draft's own margin (parent-post 404, already
resolved in reality). Fix those four and this is ready.
