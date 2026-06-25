# Mitchell Miller — Personal Portfolio Site
## Architecture, Wireframe & Build Spec (v1)

**Owner:** Mitchell Miller
**Purpose:** Land remote Director of SEO, AEO/GEO, AI Search, or AI Systems leadership roles within 30–60 days. Also serve as a long-term authority surface for inbound consulting and speaking.
**Audience:** Recruiters, hiring managers, AI search leaders, SEO/growth directors, technical product managers, forward-deployed engineering teams, AI assistants (ChatGPT, Perplexity, Claude, Google AI Overviews) crawling and citing the site.
**Timeline:** MVP live in 5–7 days. Case-study sub-pages + writing surface in 10–14 days.

---

## 1. Positioning (the one-liner everything flows from)

**Mitchell Miller — Director-level SEO, AEO/GEO & AI Search Systems leader.**

> Senior search and AI-growth leader with a decade owning enterprise organic at Apple, CommonSpirit, and Stanford Health Care — $15.21M FY22 attributable revenue, 4.9M+ organic sessions, three shipped AI products. Operationalizing AEO/GEO measurement before most teams have the metrics.

Voice: direct, credible, technical, executive-readable. No hype. No startup fluff. No emoji. No fake founder theater.

---

## 2. Tech Stack

**Primary recommendation:** Astro + Tailwind + MDX, hosted on Vercel or Cloudflare Pages.
**Why:** near-perfect Core Web Vitals out of the box (your own site becomes a credentialing artifact), static-first for AI crawler access, MDX for the writing surface, fastest possible TTFB.

**Acceptable fallback:** React + Vite on Replit Deployments. Ships fastest if Replit AI is doing the build. Add `react-helmet-async` for meta management and pre-render with Vite SSG if you go this route.

**Required regardless of stack:**
- JSON-LD structured data on every page (`Person`, `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage` where applicable)
- `sitemap.xml`, `robots.txt`, Open Graph + Twitter cards
- `<link rel="canonical">` on every route
- Semantic HTML, ARIA labels, alt text on every image
- Lighthouse score targets: 100/100/100/100
- Core Web Vitals: LCP <1.5s, INP <100ms, CLS <0.05

---

## 3. Site Map

```
/                       Home (single scroll, anchor nav)
/aeo-geo                AEO/GEO methodology + live citation tracking
/work/apple             Case study — Apple JS rendering + holiday business case
/work/commonspirit      Case study — $15.21M, 1,000+ entity DB
/work/stanford          Case study — full-funnel paid + organic, clinical service lines
/notes                  Writing index (2–3 essays at launch)
/notes/[slug]           Individual essay
/resume                 Embedded + downloadable PDF
/contact                Contact details + Calendly embed
```

Total routes at launch: **8.** Manageable, indexable, each ranking opportunity in its own right.

---

## 4. Identity & Contact (canonical)

- **Name:** Mitchell Miller
- **Title (header):** Director of SEO, AEO/GEO & AI Search Systems
- **Location:** United States · Remote-first *(no city)*
- **Email:** mitchelljmiller26@gmail.com
- **Phone:** 1 (626) 316-8682 *(contact page only, not hero)*
- **LinkedIn:** linkedin.com/in/mitchelljmillerjr
- **GitHub:** *(link if active repos exist; skip if not)*
- **Calendly:** *(set up a 15-min intro call link; embed on contact page + as warm CTA on home)*

---

## 5. Home Page — Section-by-Section Spec

### 5.1 Hero

**Layout:** Two-column on desktop, stacked on mobile. Left = copy + CTAs. Right = headshot or a single brand visual (clean, professional, no animation).

**Copy:**

> **Mitchell Miller**
> Director of SEO, AEO/GEO & AI Search Systems
>
> Decade of enterprise organic at Apple, Stanford Health Care, and a 1,000+ location healthcare network. Operationalizing AEO/GEO measurement before most teams have the metrics.

**Proof strip (immediately under headline, 5 short anchors with logos or wordmarks):**
Apple · CommonSpirit · Stanford Health Care · Clarity Digital · UC Berkeley MIDS

**CTAs (three buttons, primary → secondary → tertiary):**
1. **View AEO/GEO Lab** (primary — your differentiator first)
2. **Download Resume** (PDF download, prefilled file name: `Mitchell-Miller-Director-SEO-2026.pdf`)
3. **Book a 15-min intro** (Calendly link)

**Nav (sticky, top right):** Work · AEO/GEO Lab · Notes · Resume · Contact

---

### 5.2 What I Do (three tracks)

**Headline:** What I lead.

**Three columns, equal weight, no decorative icons (or single-color line icons max):**

| **Track 1 — Enterprise SEO & Technical Search** | **Track 2 — AEO / GEO & AI Search Measurement** | **Track 3 — Applied AI Systems & Growth Products** |
|---|---|---|
| Multi-location architecture, entity systems, JS rendering, migrations, Core Web Vitals, Knowledge Graph. | Profound-based citation tracking, AI share-of-voice across ChatGPT, Perplexity, Google AI Overviews. Closed-loop measurement on a category most haven't operationalized. | LLM workflows, agent orchestration, internal product builds. ClarityPulse, SearchForge, ActionThread shipped end-to-end. |
| **Anchor proof:** Apple, CommonSpirit, Stanford. | **Anchor proof:** Clarity Digital enterprise portfolio. | **Anchor proof:** 3 internal AI products replacing Looker Studio, Surfer SEO, Fireflies. |

Each column ends with a one-line "See work →" link to the relevant section / page.

---

### 5.3 Proof Metrics Strip

**Headline:** What it produced.

**Six metric tiles, two rows of three on desktop, single column mobile:**

| Metric | Source |
|---|---|
| **$15.21M** attributable revenue (FY22) | CommonSpirit Health |
| **4.9M+** organic sessions (peak) | CommonSpirit Health |
| **1,000+** Yext entity pages | CommonSpirit Health |
| **88K** appointments + 175K calls/directions | CommonSpirit Health (FY22) |
| **38+ country sites · 138 hreflang variants** | Apple |
| **60+** stakeholder audiences presented | Apple |

Each tile: large number + short label + sourced attribution. No fluff text.

---

### 5.4 Selected Work (the curated grid)

**Headline:** Selected work.
**Subhead:** Enterprise programs, shipped AI products, and independent builds.

**Filter tabs (visual, not router-based):** All · Enterprise · AI Products · Independent

**Card grid, 3 columns desktop, 2 tablet, 1 mobile. SIX cards total at launch:**

#### Card 1 — Apple (Enterprise)
- **Tag:** Enterprise · SEO Program · Global
- **Headline:** Global SEO Program Manager, Americas
- **One-liner:** Owned organic for Apple's complete Americas portfolio across US, Canada, Mexico, Brazil — multi-billion-dollar revenue surface.
- **Proof bullets:** JS-rendering remediation in proprietary framework · 38+ country sites · 138 hreflang variants · holiday business case to 60+ stakeholders
- **CTA:** Read case study → `/work/apple`

#### Card 2 — CommonSpirit Health (Enterprise)
- **Tag:** Enterprise · Healthcare · Product Management
- **Headline:** SEO & Web Analytics Product Manager
- **One-liner:** PM ownership across 1,000+ location healthcare network; $15.21M attributable revenue in a single fiscal year.
- **Proof bullets:** $15.21M FY22 revenue · 88K appointments · 1,000+ Yext entity pages · 250K+ annual organic visits from medical library
- **CTA:** Read case study → `/work/commonspirit`

#### Card 3 — Stanford Health Care (Enterprise)
- **Tag:** Enterprise · Healthcare · Paid + Organic
- **Headline:** Interim SEO/SEM Manager
- **One-liner:** Full-funnel paid and organic across high-value clinical service lines for one of the most recognized academic medical centers in the U.S.
- **Proof bullets:** Multi-million-dollar attributable LTV · 6-month tenure · campaign taxonomy restructured for AI-driven search behavior
- **CTA:** Read case study → `/work/stanford`

#### Card 4 — ClarityPulse / SearchForge / ActionThread (AI Products)
- **Tag:** AI Products · Built & Shipped
- **Headline:** Three internal AI products replacing Looker Studio, Surfer SEO, and Fireflies
- **One-liner:** Defined requirements, prioritized roadmap, shipped end-to-end. AI reporting, content intelligence, transcript-to-execution.
- **Proof bullets:** Replaced commercial SaaS line items · iterated on user feedback from agency delivery teams · productized advisory work for scaled delivery
- **CTA:** *(no sub-page yet — link anchors to AEO/GEO Lab or a screenshot lightbox)*

#### Card 5 — DomainSignal (Independent)
- **Tag:** Independent · AI Product · Solo Build
- **Headline:** AI-driven domain authority & intelligence platform
- **One-liner:** Statistical models, scoring algorithms, AI-paired insights across strategically targeted data sources. Self-refining via results-feedback loops.
- **Proof bullets:** Solo full-stack build · pnpm monorepo (Express/TS + Vite/React + Capacitor) · scikit-learn / statsmodels / pandas / yfinance notebooks
- **CTA:** Visit → domainsignals.live *(if 403 issue resolved; otherwise link to screenshot lightbox)*

#### Card 6 — Clear Kayak Adventures + ClearCrew AI (Independent)
- **Tag:** Independent · Growth Systems · Real Revenue
- **Headline:** Operating system for a local tour business — founding case study for ClearCrew AI
- **One-liner:** Built end-to-end: website, OTA listings, payments, SOPs, safety workflows, pre-arrival CRM education, staff handoffs.
- **Proof bullets:** $500–$1,000/day per location · runs on 2 part-time shore staff + social VA · automation collapses on-site briefing time
- **CTA:** Read more → `/notes/clearcrew-ai` *(or external link to ClearCrew landing page when live)*

**Move below the fold / footer / or cut entirely:**
- Vet Advocates → keep as a small Pro-Bono / Growth System sidebar mention (2–3 lines) under the Selected Work grid. Strong proof but not headlineable for a Director-of-SEO portfolio.
- Date Night, Cosmetic Watchlist, Mind Games Archive, MIDS Portfolio, Philippine Travel SEO → **cut from main surface.** Either bury in a `/more` footer page or omit entirely. They scatter the narrative.

---

### 5.5 AEO/GEO Lab (the differentiator section)

**Headline:** AEO / GEO Lab — measurement most teams haven't operationalized.

**Two-column layout:**

**Left column — methodology:**
- Prompt-cluster construction across buyer-intent, brand-defense, and competitive surfaces
- Citation velocity tracking across ChatGPT, Perplexity, Google AI Overviews
- AI share-of-voice benchmarking against competitor sets
- Closed-loop measurement: input (entity, schema, content changes) → output (citation lift over 30/60/90 days)
- Tooling: Profound + custom Python eval pipelines + Claude API for prompt orchestration

**Right column — live or representative output:**
- Screenshot of a sample dashboard (redacted client identifiers)
- Short example: "Tracked client X across 240 prompts; citation share moved from 4.2% → 17.8% in 90 days after entity-graph cleanup and schema refactor."
- CTA: **Read the full methodology** → `/aeo-geo`

**Why this section is essential:** This is the surface AI assistants will cite when recruiters ask "who are leading AEO/GEO practitioners." Build it FOR those queries — FAQ schema, entity markup, definitional content, named methodology.

---

### 5.6 Live Enterprise Surfaces

**Headline:** Live work — enterprise surfaces I built or led.

**Two cards minimum:**

| Surface | URL | Description |
|---|---|---|
| Dignity Health Conditions & Treatments Library | dignityhealth.org/conditions-and-treatments | Enterprise healthcare content architecture and condition/treatment discovery surface. |
| CommonSpirit Services & Specialties Library | commonspirit.org/services-specialties/ | Service-line discovery surface for a large healthcare network. |

Add 1–2 more if Apple-side or Stanford-side surfaces can be referenced without IP/confidentiality risk.

---

### 5.7 About

**Layout:** One column, 60–80% content width. Short.

**Copy:**

> I'm Mitchell Miller. I've led enterprise SEO at Apple, Stanford Health Care, and a 1,000+ location healthcare network. I hold a Master of Information & Data Science from UC Berkeley (2017–2019) and a BA in Business Administration from Michigan State.
>
> My discipline is the convergence of search, AI systems, performance marketing, and applied data science. I find growth opportunities using data science, then build the systems that automate delivery — increasingly with AI agents, LLM workflows, and prompt evaluation pipelines.
>
> I'm currently advising enterprise clients at Clarity Digital and building independent products. Open to Director-level roles in SEO, AEO/GEO, AI Search, or AI Systems leadership.

**Below:** small grid of certs (5 max — Google AI Essentials, GA4, PSM I, CAPM, CXL CRO).
**Below that, optional:** one-line interests row — "Surfing · BJJ & Muay Thai · Drone piloting · Astronomy · Music curation" *(only if it reads as personality without distracting; otherwise omit)*.

---

### 5.8 Contact

**Layout:** Single column, centered, generous whitespace.

**Content:**
- Email: mitchelljmiller26@gmail.com
- LinkedIn: linkedin.com/in/mitchelljmillerjr
- Phone: 1 (626) 316-8682
- Calendly embed: 15-minute intro call
- Download resume: PDF link

No contact form. Recruiters hate forms. Direct email + Calendly converts better.

---

## 6. Sub-Page Specs

### 6.1 `/aeo-geo` — AEO/GEO Methodology Deep Dive

This page exists to be cited by AI assistants. Build it for that audience first, recruiters second.

**Structure:**
- H1: AEO/GEO Measurement Methodology
- Definitional intro (2–3 short paragraphs): what AEO is, what GEO is, why traditional SEO metrics miss it
- Section: Prompt-cluster design
- Section: Citation velocity tracking
- Section: AI share-of-voice benchmarking
- Section: Tooling (Profound, custom Python evals, Claude API)
- Section: Case in motion (one anonymized client narrative with numbers)
- FAQ block (5–8 questions) — *these will get cited in AI overviews*:
  - What is AEO?
  - What is GEO?
  - How is AEO measured?
  - What's the difference between AEO and traditional SEO?
  - Which tools track AI citation visibility?
  - How long does it take to see AEO/GEO lift?
- JSON-LD: `FAQPage` schema on the FAQ block, `TechArticle` schema on the page

### 6.2 `/work/apple` — Apple Case Study

- Context: scope of role, surface (apple.com/store), regional ownership
- Challenge: JS rendering gaps invisible in Search Console, proprietary framework, 38+ country sites, 138 hreflang variants
- Approach: technical audit method, stakeholder framing, engineering partnership model
- Outcome: business cases that secured engineering roadmap prioritization, holiday content case presented to 60+ stakeholders, integrated AEO/generative signals ahead of mainstream adoption
- What I'd do differently / what I learned
- Skills used (anchor tag cloud)

### 6.3 `/work/commonspirit` — CommonSpirit Case Study

- Context: 1,000+ location healthcare network, 20+ markets, multi-CMS environment
- Challenge: scalable page production, structured data syndication, attribution across a distributed network
- Approach: 1,000+ Yext entity pages with parent/child architecture and dynamic CMS templates, medical condition/treatment library, 20+ enterprise migrations
- Outcome: $15.21M FY22 revenue, 88K appointments, 175K calls/directions, organic traffic 2.65M → 4.9M+
- Strategic lever: AEM migration leverage — using medical library to convince regional brand execs of dynamic regional metadata syndication
- Skills used

### 6.4 `/work/stanford` — Stanford Case Study

- Context: academic medical center, regulated environment, high-value clinical service lines
- Challenge: full-funnel paid and organic against patient-acquisition targets
- Approach: campaign taxonomy restructured for AI-driven search behavior, cross-functional partnership with content, UX, clinical strategy
- Outcome: multi-million-dollar attributable patient LTV across 6-month tenure
- Skills used

### 6.5 `/notes` — Writing Index + Two Essays at Launch

**At-launch essays:**
1. **"Measuring AEO: a working methodology"** — your prompt-cluster + citation-velocity framework. ~800 words. This is the post that gets shared in SEO/AEO leadership Slacks.
2. **"JS rendering gaps Google won't show you"** — Apple-context-anonymized lessons on rendering remediation in proprietary frameworks. ~600 words. Pulls the technical SEO crowd.

**On the roadmap (post-launch):**
3. "The entity database is the moat" — CommonSpirit lessons on multi-location entity architecture.
4. "What ClearCrew AI taught me about deploying AI in low-trust environments" — bridge essay positioning you for both AI leadership and applied-AI consulting.

### 6.6 `/resume`

- Embedded PDF viewer (or rendered HTML version with a prominent PDF download button)
- Default variant: SEO Director Short (San Jose header swapped for "United States · Remote-first")
- Email on resume: `mitchelljmiller26@gmail.com`

---

## 7. Visual Direction

**Palette:**
- Background: white `#FFFFFF` or near-white `#FAFAFA`
- Text primary: deep charcoal `#1A1F2B` or `#0F172A`
- Text secondary: muted gray `#6B7280`
- Accent: deep navy `#0B1E3F` or muted royal `#1E40AF`
- Surface (cards): `#F5F7FA` or pure white with 1px border `#E5E7EB`
- One restrained highlight color for "Live" / "Shipped" badges — soft green `#10B981` or muted gold `#B59300`

**Typography:**
- Headings: Inter Tight, IBM Plex Sans, or Söhne — geometric, modern, executive-readable
- Body: Inter, IBM Plex Sans, or system sans
- Mono (for code samples, metrics): JetBrains Mono or IBM Plex Mono
- Type scale: 64 / 48 / 32 / 24 / 18 / 16 / 14
- Line-height: 1.2 on headings, 1.6 on body
- Letter-spacing: -0.02em on headings, 0 on body

**Layout principles:**
- Generous whitespace. Section padding 96px desktop / 48px mobile.
- Max content width 1200px, body text 720px max
- Grid: 12-column desktop, single-column mobile
- No animation beyond `transition: opacity 200ms` and `transform: translateY(2px)` hover states
- No gradients. No glassmorphism. No background images on hero. No emoji.

**Why this palette / type:** restraint signals seniority. Your Clarity Digital site uses deep purple + teal + glowing borders — that's fine for a consultancy selling AI services. Your personal portfolio targets the recruiter who has seen 200 portfolios this month and is looking for the one that doesn't try. Quieter wins.

---

## 8. SEO / AEO Optimization (build into the site itself)

This is the meta-layer most candidates skip. You are the AEO/GEO guy — your own site IS the demonstration.

**Required on every page:**
- Title tag: `[Page] · Mitchell Miller — Director of SEO, AEO/GEO & AI Search Systems`
- Meta description: 150–155 chars, written for AI snippet extraction
- `<link rel="canonical">`
- Open Graph + Twitter card meta
- JSON-LD: `Person` schema on home, `BreadcrumbList` on sub-pages, `FAQPage` on AEO/GEO page, `TechArticle` on `/notes/*`

**Person schema (home) — minimum fields:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mitchell Miller",
  "jobTitle": "Director of SEO, AEO/GEO & AI Search Systems",
  "url": "https://mitchellmiller.ai",
  "sameAs": [
    "https://www.linkedin.com/in/mitchelljmillerjr"
  ],
  "alumniOf": [
    {"@type": "CollegeOrUniversity", "name": "UC Berkeley School of Information"},
    {"@type": "CollegeOrUniversity", "name": "Michigan State University"}
  ],
  "knowsAbout": ["SEO", "AEO", "GEO", "AI Search", "Technical SEO", "Entity SEO", "Knowledge Graph", "Schema Markup", "Generative Engine Optimization", "LLM Citation Tracking", "Applied AI"],
  "worksFor": {"@type": "Organization", "name": "Clarity Digital"},
  "email": "mailto:mitchelljmiller26@gmail.com"
}
```

**Internal linking:** every project card → its case study page. Every essay → at least 2 internal links to relevant case studies or methodology page. Reciprocal linking from case studies back to AEO/GEO Lab and Notes.

**robots.txt:** allow all reputable crawlers including `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`. Do NOT block AI crawlers — you want to be cited.

**Sitemap:** include all 8 routes, submit to GSC + Bing Webmaster Tools.

---

## 9. Build Sequence (5–7 day MVP)

**Day 1:**
- Scaffold project (Astro + Tailwind + MDX, or React + Vite if going that route)
- Domain + hosting + DNS
- Set up `Person` schema, `robots.txt`, `sitemap.xml` scaffolding
- Build home page Hero + nav + footer shell

**Day 2:**
- Build home page sections: What I Do, Proof Metrics, Selected Work grid
- Wire up filter tabs (visual state, not router)
- Ensure mobile layout is clean

**Day 3:**
- Build AEO/GEO Lab section on home + `/aeo-geo` sub-page
- Write methodology copy (~1,200 words)
- FAQ block with `FAQPage` schema

**Day 4:**
- Build Live Enterprise Surfaces section + About + Contact
- Calendly embed
- Resume PDF integration on `/resume`

**Day 5:**
- Write and publish first essay on `/notes`
- Cross-link everything
- Lighthouse audit, fix any score under 95

**Day 6–7:**
- Build one case study page (`/work/commonspirit` — the highest-impact one)
- Final QA, accessibility check, GSC + Bing submission
- Launch

**Post-launch (10–14 days):**
- Second and third case study pages
- Second essay
- Iterate copy based on early recruiter feedback

---

## 10. What's Explicitly OUT of Scope

- Date Night, Cosmetic Watchlist, Mind Games Archive, MIDS Portfolio, Philippine Travel SEO from the main Selected Work grid
- Architecture diagram section (Sources → Processing → Products → Delivery) — cut entirely or compress to a 2-line sidebar in About
- "Operating Model: Data first. Systems second. AI where it compounds." section — cut from home. Reuse the principle in About if needed.
- Dark mode at launch (add later if you want; not a blocker)
- Animations beyond simple hover states
- Client testimonials at launch (add when you can get permission)
- Blog comment system

---

## 11. Open Decisions Still Required from Mitch

| Decision | Recommendation | Why |
|---|---|---|
| Final domain | `mitchellmiller.ai` if available, else `mitchmiller.com` or `mitchellmiller.com` | `.ai` reinforces positioning; `.com` is more durable. Pick one and commit. |
| Stack final call | Astro (10–14 day timeline) OR React+Vite on Replit (5–7 day timeline) | Astro is the better long-term artifact; React is the faster ship. Strong lean Astro. |
| Headshot or no headshot | Yes, one clean professional shot, right side of hero | Humanizes; Director-level recruiters expect it |
| Calendly link | Set up before launch | Captures warm recruiter intent at peak interest |
| ClearCrew AI domain | Decide before launch — does Card 6 link to ckaclear.com / clearcrewai.com / or a `/notes` essay | Don't ship a dead link |
| DomainSignal 403 issue | Fix before launch OR replace external link with screenshot lightbox | Don't ship a dead link |
| GitHub presence | Decide whether to surface | If repos exist and are clean, link. If not, omit — empty GitHub hurts more than no link. |

---

## 12. Success Criteria

**Within 7 days of launch:**
- All 8 routes live, indexable, Lighthouse 95+
- Site submitted to GSC, Bing Webmaster Tools, IndexNow
- Person + FAQPage + TechArticle schema validating cleanly

**Within 30 days:**
- First inbound recruiter contact directly attributable to the site
- AEO/GEO Lab page ranking for at least 1 long-tail variant of "AEO measurement methodology"
- Brand search ("Mitchell Miller SEO" / "Mitchell Miller AEO") surfacing site as result #1

**Within 60 days:**
- Director-level conversation in late stage attributable to portfolio
- Site cited at least once by an AI assistant (ChatGPT, Perplexity, AI Overviews) in response to a relevant prompt

---

## 13. Build Prompt — Drop-In for Replit AI / Cursor

Use sections 1–10 of this document verbatim as the PRD. Then prepend:

> Build the Mitchell Miller personal portfolio site per the spec in this document. Use [Astro / React+Vite — pick one]. Tailwind for styling. MDX for the Notes section. Static-first build. Deploy to [Vercel / Cloudflare Pages / Replit Deployments].
>
> Constraints:
> - Lighthouse target: 100/100/100/100
> - No animations beyond hover states
> - No external font CDN — self-host Inter or use system font stack
> - Every page must include JSON-LD structured data per Section 8
> - Mobile-first, single-column under 768px
> - Email used throughout: `mitchelljmiller26@gmail.com`
> - Location header: "United States · Remote-first" (no city)
>
> Ship the home page first. Then `/aeo-geo`. Then `/notes` + first essay. Then case study pages. Then `/resume` + `/contact`.

---

**End of spec.**
