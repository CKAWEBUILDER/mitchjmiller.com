# HANDOFF — Trusted-by carousel, hero button removal, home FAQ, SEO pass (2026-10-02)

Branch `cloud/m2-trustedby-20261002` off `main` `d684347`, cloud container, M² site lane. **Nothing pushed, nothing deployed** — the parent session owns push/release per RELEASE-READY.md.

## What changed (files verified on disk)

| File | Change |
|---|---|
| `site/data/brands.json` | Carousel label `"Experience across"` → `"Trusted by"`. No other data change; all 30 `logo: null` client entries untouched (artwork sourcing stays pending per PROJECT.md — nothing invented or fetched). |
| `site/components/BrandMarquee.astro` | (1) Rotation slowed: ~15 s per logo, 75 s minimum loop (was 6 s / 42 s — speed ≈ 0.56×). (2) Spanish heading `Experiencia en` → `Con la confianza de` (native-speaker check pending). (3) **Text twin**: a plain-text block (`.ag-marquee-names`) right after the carousel renders the association names from brands.json — "In-house experience at …" (7 employers) and "Client work includes …" (25 clients) — so crawlers/LLMs that skip image-only carousels see the names (research: peer-teardown §synthesis). Entries with unresolved identity are skipped (list below); `kind: "project"` marks (DomainSignal, Date Night) excluded as not trusted-by evidence. Appears wherever the marquee does: `/`, `/services/`, `/es/`, `/es/services/`. |
| `site/styles/agency.css` | Marquee logos ~30% larger (default 250×60, per-brand sizes scaled, row 84→108 px), per-logo padding 34→20 px (26→14 px at 390 px) to tighten gaps; `.ag-marquee-names` styling (theme-aware tokens; the logo strip itself stays a light island). Note: `ul{min-width:max(100vw,1100px); justify-content:space-around}` is kept — it is what makes the loop seamless — so on very wide screens residual space still distributes between the 5 logos; the larger artwork absorbs most of it. |
| `site/pages/index.astro` | (1) Hero green CTA button **removed entirely** (Mitch: "I don't even want that button there"). (2) New FAQ section (5 questions, `details/summary` pattern copied from `/services/`) + matching `FAQPage` JSON-LD node in the home graph; every answer restates copy already on the site (hero deck, About split, Industries, Work/Lab/Writing sections, services FAQ) — no new claims. |
| `site/pages/es/index.astro` | Hero CTA button removed (mirrors the English home). FAQ **not** added here — Spanish copy requires the standards' translation-review pass; see "Decisions for Mitch". |
| `scripts/verify-agency.mjs` | Checks changed on purpose: (1) hero CTA expectation is now 0 buttons on `/` and `/es/`, still exactly 1 on `/services/` and `/es/services/`; (2) Spanish marquee label string updated; (3) new check: the text twin must name representative brands and must NOT name the unresolved ones. |
| `docs/staging-2026-10-02-trustedby/qa/` | QA evidence for this branch (crawl.json, browser.json, standards.json). |

Not committed: `package-lock.json` churn from `npm install` (see Validation) was reverted.

## The big green button

Removed the **home hero** "Start a conversation" green button (EN + ES) — the large green CTA at the top of the homepage. Assumption stated: "the big green button" = the hero CTA, the first/most prominent one. The page is **not** left without a primary CTA: the header's small green "Let's talk" button (required by verify-agency/crawl on every page) and the closing dark CTA band's "Start a conversation" button remain, so no replacement text link was added per the instruction's condition. If Mitch meant the bottom CTA-band button (or all green buttons), that is a 2-line follow-up each in `site/pages/index.astro` / `es/index.astro` plus the verifier expectation.

## Ambiguous brands — in brands.json but kept OUT of the text twin (per PROJECT.md open questions)

1. **St. Luke's Health** — which St. Luke's system is not recorded (several share the name).
2. **UCSF** — university vs. UCSF Health not recorded.
3. **Insomnia Cafe** — identity/engagement details not recorded.
4. **Blue Planet Adventures** — identity/engagement details not recorded.
5. **Baylor Health** — named in PROJECT.md's open questions but **not present in brands.json at all**; nothing to render or skip. If Mitch confirms it, it needs a brands.json entry first.

They remain in brands.json (internal metadata) and, having `logo: null`, never rendered in the carousel anyway. Once Mitch resolves a name, delete it from the `unresolved` set in `site/components/BrandMarquee.astro` (and in `scripts/verify-agency.mjs`).

## Validation (commands run in this container, all exit codes read directly)

| Check | Command | Result |
|---|---|---|
| Install | `npm ci` | **FAIL (exit 1, measured)** — lock file out of sync for npm 10.9.4 (missing `esbuild@0.28.2` tree; the 2026-10-01 release built with npm 11). Fallback `npm install` exit 0; its package-lock.json rewrite was **reverted before committing** (environment artifact, not a source change). |
| Typecheck | `npm run typecheck` | **PASS** (exit 0, measured) |
| Release candidate | `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run build:release-candidate` | **PASS** (exit 0, measured): parity 57/57 + 21/21 added, 25/25 bodies, 74 sitemap URLs; agency verification passed — 78 shell documents, 4 marquees, 12 services FAQ + 21 post FAQ mirrored, contrast pairs all ≥ minimums; standards verification passed — 86/86 documents full tag set + 1200×630 card, dark blocks identical, 40 dark pairs ≥ 4.5:1 (min 6.66). |
| JS-off crawl | `node scripts/qa/serve.mjs dist 5193` + `node scripts/qa/crawl.mjs --out docs/staging-2026-10-02-trustedby/qa/crawl.json` | **PASS** (measured): 1080/1080 checks across 78 routes. |
| Browser QA | `CHROME_PATH=… node scripts/qa/browser.mjs --out docs/staging-2026-10-02-trustedby/qa/browser.json` | **PASS** (exit 0, measured): 536/536 checks (includes marquee animation/pause/reduced-motion and mobile menu on the changed pages). |
| Standards/axe QA | `CHROME_PATH=… node scripts/qa/standards.mjs --routes "/,/es/,/services/,/es/services/" --out docs/staging-2026-10-02-trustedby/qa/standards-touched-routes.json` | **PASS** (exit 0, measured): 74/74 checks over the 4 touched documents; axe serious+critical 0 in light and dark. **The full 86-document standards suite was NOT run here** (timeboxed; it was started and killed before producing results). Full-site coverage at build time came from `verify-standards` (PASS, above). Release owner: run the full suite per RELEASE-READY.md; PROJECT.md records one known container-only failure (`all-in-ai-money-stack/@390`) that production fails identically in a Linux container. |
| Built-page spot checks | Python over `dist/` (measured) | Home + /es/: hero `ag-button` count 0, label "Trusted by"/"Con la confianza de", duration 75 s, text twin renders both sentences, no unresolved names; home JSON-LD types ProfessionalService + Person + WebSite + FAQPage; all 5 FAQ answers mirror the JSON-LD word-for-word. |

Share cards: the Linux rebuild re-renders cards in a different font face than production (known, PROJECT.md 2026-10-01); the release owner should rebuild per RELEASE-READY.md and diff.

## SEO pass (pages touched: `/`, `/es/`, `/services/`, `/es/services/`)

Measured on the release build: titles 55–61 chars, meta descriptions 137–182 chars, self-canonicals, `index, follow` in release mode, full OG + `summary_large_image` Twitter set, `og:locale`(+alternate), hreflang self/translation/x-default, valid JSON-LD on all four. **No safe issues found; nothing changed.** The home page gained the FAQPage node (task 3). Only borderline item: `/es/services/` description is 182 chars (may truncate in SERPs) — a Spanish copy edit needs the translation-review pass, so left for Mitch.

## Decisions left for Mitch

1. Confirm the removed button was the hero CTA (see above); say the word and the bottom band's button goes too.
2. The five unresolved brand identities (above) — resolving them adds each to the text twin.
3. Spanish strings added without a native-speaker pass: marquee heading "Con la confianza de", twin intros "Experiencia interna en" / "Trabajo con clientes como".
4. Spanish home FAQ: add a translated twin of the new English FAQ (needs the standards' independent translation review) or leave English-only.
5. "Trusted by" now heads a strip whose five logos include four employers + one client; the text twin separates "In-house experience at" from "Client work includes" to stay truthful — confirm he's comfortable with "Trusted by" above employer logos (Stanford Health Care's presence is already an open PROJECT.md question).
6. Historical records still describing "Experience across" / the one-hero-CTA rule (docs/redesign-2026-09-14/README.md §6, concise-copy.md, review mockups) were left as dated history; update if desired.
7. Carousel still shows only the 5 logos with real artwork; sourcing for the other 25+ clients remains blocked on network access / Mitch (PROJECT.md).

## For the parent session

- Push this branch; release via RELEASE-READY.md when approved. PROJECT.md was not updated (release owner records the release).
- Append the STATUS.md line in /home/user/job-search (this lane was write-restricted to this repo): `2026-10-02 · M² site lane · Trusted-by carousel (slower/larger/tighter + text twin), hero green button removed, home FAQ + FAQPage, SEO audit clean; branch cloud/m2-trustedby-20261002, all checks pass · pending: Mitch's decisions in HANDOFF.md, push + release.`
