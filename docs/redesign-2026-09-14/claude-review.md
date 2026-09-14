# Review — agency + software + portfolio redesign (working tree, `claude/agency-redesign`)

**Scope note:** static source reading only. Bash is disabled in this session, so I ran **no build, no `verify-agency`, no crawl, no browser, and no live probe**. No Turnstile, GA4, Worker or Search Console behaviour was tested. Contrast ratios, route counts and QA numbers below are quoted from committed evidence, not re-measured. No file, branch or record was changed.

---

## (a) Verdict

**Ship-able direction; not yet a business that can receive or measure an inquiry.** The structural work is good: the Contiem-style IA (Services · Products · Work · Lab · Writing · About + green *Let's talk*), the lifecycle strip, the stage sections with evidence links, and the new `/products/` collection do read as a purchasable practice rather than a portfolio. Copy is customer-outcome-first and — importantly — the truthfulness discipline holds: product statuses are labelled ("In development", "Internal prototype", "Representative product mockup"), the FAQ answers the team-size question honestly, no prices, counts or testimonials are invented, and `site/lib/agency.ts:3` documents that constraint in code.

Two defects block value, and both are in the conversion path, not the design: **a submitted contact form notifies no one**, and **a successful submission fires no analytics event**. Until those are fixed, the redesign's entire commercial purpose is unobservable. Fix those two plus the contact topic list before merge; everything else can follow.

---

## (b) Findings

### CRITICAL

**C1 — A submitted lead notifies nobody.**
`cloudflare/api-worker/src/index.js:88` inserts into D1 and returns. There is no email, webhook or queue anywhere in the Worker (searched: notify / mail / MailChannels / Resend / webhook — zero matches). `PROJECT.md` confirms the only retrieval path is running `scripts/leads.mjs` manually. A prospect who completes the form gets "Thanks — your message was received. I reply from…" (`site/components/parity/enhance.ts:125`) while the message sits in a database until Mitch remembers to poll it.
*Fix (smallest):* after the successful D1 insert, one `fetch()` to an email API (Resend/MailChannels) or a private webhook, wrapped in try/catch so a notification failure never fails the insert; add the API key as a Worker secret alongside `TURNSTILE_SECRET`. Keep the lead body out of logs.

**C2 — No conversion event exists.**
`scripts/finalize-parity.mjs:18` injects GA4 `G-HCKYWCZQ8E` as a **pageview-only** config. The success branch in `enhance.ts:122-126` resets the form and swaps inline status text — no `gtag('event', …)`, no redirect, no URL change. GA4 therefore has no key event to mark, so "which service page produces inquiries" is unanswerable and every CRO change below is unfalsifiable.
*Fix (smallest):* in the `out.ok` branch, `window.gtag?.('event','generate_lead',{topic:data.get('topic')||'unspecified', source_url:location.pathname})`; mark `generate_lead` as a key event in GA4. Optionally fire `workbench_open` on the `/lab/population-workbench/` CTA. No PII in parameters.

### HIGH

**H1 — The contact form is still shaped for a job search.**
`baseline/src/pages/contact.tsx:104-108`: the topic list is *A role: SEO, AEO/GEO or AI search leadership* (first), Advisory or consulting, Population simulation, Speaking, Something else. Every new agency CTA — home hero, four objective tiles, six service cards, the services CTA band, and `/products/` "Discuss a custom build" (`site/pages/products/index.astro:9,11`) — lands here. A buyer asked to build a website or a tool is offered a menu whose first option is hiring the principal. That contradicts the positioning the whole redesign exists to establish.
*Fix:* add `services-engagement` and `software-build` options, and append `?topic=` to the new CTAs (the prefill machinery already works — `enhance.ts:83-84`). Note the cost: `contact.tsx` is a parity page, so this changes a byte-preserved body and `verify-parity` expectations must be updated deliberately, not silently.

**H2 — Resumes and Clients disappear from the header at the most common laptop width.**
`site/styles/agency.css:319` hides `.ag-header-actions .ag-utility-link` between 1101px and 1280px, while the mobile `<details>` menu only appears at ≤1050px (`agency.css:252-256`). At 1101–1280px — which includes the 1280px MacBook default — the desktop nav renders with no Resumes and no Clients link. Worse, the genuinely crowded band (1051–1100px, full nav *plus* both utility links *plus* the button) is the one case the rule does **not** cover, so the breakpoint is inverted relative to its intent. Both journeys survive only via the footer.
*Fix:* change the query to `@media(min-width:1051px) and (max-width:1280px)` — or better, keep the links and shrink them, since hiring and client access are two of the four journeys in scope.

**H3 — The hero gives a product that doesn't exist equal billing with delivered client work.**
`site/pages/index.astro:69` places a DomainSignal tile ("Software & apps → DomainSignal ↗") beside a real SFC client tile, linking to `/products/#domainsignal`, where the card reads **"In development"** (`site/data/products.ts:3`). The status is honest on arrival but invisible in the hero, so the first impression above the fold implies a shipped software line. `/products/` overall has one usable item out of six.
*Fix:* either surface the status chip in the showcase tile, or swap DomainSignal for the Population Workbench — it is free, live, needs no account, and is the strongest try-before-you-buy asset on the site.

### MEDIUM

**M1 — Personal contact details in structured data.** `site/lib/agency.ts:12` publishes a personal mobile as `ProfessionalService.telephone`, plus a personal Gmail, on every page that emits the organization node. The phone appears nowhere visibly, so it is a machine-readable-only disclosure. Also `logo: /images/portfolio-social.png` (`agency.ts:107`) is a social share image, not a logo, and the org `description` (`agency.ts:103`) still says "Search, growth and AI-search systems" while the site now sells "Digital Growth, Software & Consulting". *Fix:* decide whether the phone is public; align the description; drop `logo` until a real mark exists.

**M2 — `/products/` carries only a BreadcrumbList.** `site/pages/products/index.astro:8`. The Population Workbench is genuinely free and usable, which makes a `SoftwareApplication` with `offers: {price: "0"}` an accurate claim rather than an inflated one — the single highest-value structured-data addition available here. Do **not** add `Product`/`Offer` to the five prototypes.

**M3 — Verifier and docs have drifted from the tree.** `scripts/verify-agency.mjs` now expects 59 routes and a `Products` nav label, but never asserts `/products/` exists as manifest `kind: "added"` (as it does for `/services/` at line 40), never checks the product anchors the nav links to (`agency.ts:32-33` → `/products/#domainsignal`), and never runs the shell checks against product cards. Separately, `docs/redesign-2026-09-14/README.md` describes the pre-products state and says marquee entries are labelled "EMP/CLI/PRJ", but `BrandMarquee.astro:31` renders the full word and `kindAbbr` (line 15) is now dead code. *Fix:* mirror the `/services/` manifest assertion for `/products/`, add an anchor-resolution check, delete `kindAbbr`.

**M4 — Render-blocking third-party font.** `AgencyLayout.astro:47-49` loads Google Fonts on every page. That is an external request in the critical path on a site otherwise built for fast static delivery, and an EU-visitor privacy consideration. *Fix:* self-host the Inter subset in `public/` and drop the preconnects.

**M5 — "We" voice vs. principal-led.** `index.astro:141` and `services/index.astro:151` say "Tell us what you want to improve. We'll identify…"; `services/index.astro:127` heads a column "How we work". The Services FAQ answers this correctly and prominently (`services/index.astro:80`), and business-plural "we" is a normal convention — but this is exactly the line Mitch drew, so it should be a conscious decision, not a default. The home page never states the principal-led model above the About strip at line 134.

**M6 — Small a11y/data nits.** `index.astro:67`: `aria-label` on a generic `<div>` is ignored by assistive tech (use `role="group"` or a heading). `/products/` sections have no accessible names, unlike every section on home and services. `products.ts:2` carries an `image`/`alt` pair that the population card never renders.

---

## (c) Verified vs. pending

**Verified by reading source only:** GA4 pageview loader injected once per indexable page in release mode (`finalize-parity.mjs:11,18`) and enforced by `verify-parity.mjs:146-147`; Turnstile verified **server-side** with a real siteverify call (`index.js:82,220`); KV rate limit 5/IP/hour with a salted, truncated IP hash (`index.js:69-79`) — no raw IP stored; strict origin allowlist (`index.js:233-241`); secrets held as Worker bindings, none in source; client-side no-JS fallback keeps a mailto path; all six product images exist in `public/images/`; every product and industry `href` resolves to a route present in `route-manifest.json`.

**Configured but NOT verified live (no test performed by me):** that GA4 is actually collecting; that Turnstile's site key/secret pair is valid in production; that D1 writes succeed; that the 59-URL sitemap builds; that Search Console has the new sitemap; that any contact submission has ever completed end-to-end. The committed QA (231–233 browser checks, 831 crawl checks) covers the **pre-products** commit and used a **mocked** Worker — a real submission has never been made. Re-run `verify-agency`, the crawl and the browser pass against the current tree before merge; the tree is ahead of its evidence.

---

## (d) Reporting and chatbot

**Minimum useful pipeline (owner: Mitch; cost: $0 beyond the existing Cloudflare/GA4 accounts).**
Weekly, 15 minutes, three joins: (1) GA4 `generate_lead` by landing page and `topic` — only real once C2 ships; (2) the D1 leads table, which is already the authoritative inquiry record — add `topic` and `source_url` to a saved query (both are already posted, `enhance.ts:105`); (3) Search Console page-level clicks for `/services/`, `/products/` and the case studies. Join on landing page. Real conversion definitions: **qualified inquiry** = D1 row that is not spam; **assisted** = session with a `/services/` or `/products/` pageview preceding it; **workbench trial** = workbench opened. Do *not* count form views or scroll depth. Automate only after four weeks of manual runs prove the numbers are stable — a Worker cron writing a weekly digest from D1 + the GA4 Data API is the natural step, and it reuses infrastructure already paid for. Privacy: keep names, emails and message bodies out of GA4 and out of any digest sent to a third-party service; the salted-hash pattern already in the Worker is the right precedent.

**Chatbot: exploratory, not recommended yet.** A grounded assistant would help most at one specific decision — "which of the four stages fits my problem" — where the site currently asks the visitor to self-diagnose across six service cards. If it happens, it should be retrieval-grounded on exactly three sources (the `/services/` stage copy, `case-studies` summaries, `products.ts` with statuses), have **no** ability to quote prices, availability, timelines or invent results, and escalate to `/contact/` with `?topic=` prefilled after two turns. Failure handling: any ungrounded question returns the contact link rather than a generated answer. Hard usage cap and per-IP rate limiting reusing the existing KV pattern. But: the site gets low traffic today, the conversion path itself is broken, and a hallucinated capability claim on a principal-led practice is a reputational cost with no upside. **Fix C1/C2/H1, collect four weeks of real inquiry data, then decide.** Not authorized, not built.

---

## (e) Three questions Mitch should be asking

1. **"When a stranger submits that form at 9pm, how do I find out?"** — Today: he doesn't, until he runs a script. That is the one defect that makes the redesign commercially inert.
2. **"If someone wants to buy a website or a tool, which option do they pick on my contact form?"** — There isn't one, and the first option offers to hire him. The whole agency thesis dies at the form.
3. **"What do I want /products/ to be — a shop, or proof I can build?"** — One of six items is usable. If it's proof, lead with the free workbench and let the prototypes support it. If it's a shop, it needs one more shipped product before the hero can promise software.


## Lead reconciliation after review

The review above is Claude's source-only assessment, not live testing. The existing backend DOES accept/store leads in D1; absence of notification code does not establish that no external notification/polling service exists. Live collection, notification configuration and reporting costs remain unverified. No claim of zero operating cost is approved. The current build and 348 link/asset/fragment checks passed after the earlier evidence Claude cited.

Addressed in this refinement: header uses the full mobile navigation (including Resumes/Clients) at all widths up to 1280px; DomainSignal hero explicitly says in development; showcase given a group role; unused marquee abbreviations removed; organization description aligned; products manifest assertion added. Existing lead notification and success-event gaps are retained as next implementation recommendations. No email API, live GA4 configuration or chatbot was activated. A real contact-flow test requires coordination so a test inquiry is not mistaken for a client lead.
