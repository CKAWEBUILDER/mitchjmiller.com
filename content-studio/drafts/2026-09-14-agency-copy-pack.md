# Agency Copy Pack — 2026-09-14

Draft copy and data only. Nothing here is published. Written for the build worker on `claude/agency-redesign` (agency positioning, portfolio secondary, Contiem.com-style structure, green CTAs, brand-logo carousel). Every claim below traces to `src/lib/data.ts`, `src/lib/case-study-editorial.ts`, `docs/overhaul-2026-09-10/content-evidence.md`, `docs/overhaul-2026-09-10/resumes/README.md`, `docs/design-review-2026-09-11/content-proposal.json`, `docs/design-review-2026-09-11/content-brief.md` and `docs/lab/population-workbench.md` — see the claims ledger in §(i). "We" is practice voice; no team size is claimed anywhere. Mitch Miller is the principal. Links below use confirmed routes (`/work/`, `/contact/`, `/lab/`, `/case-studies/<slug>/`) or the real 17 case-study slugs. No route is named in the six source-of-truth records for a Services page, so none of this copy hardcodes a "Services" href — noting only as an aside, not as a sourced claim, that `site/pages/services/index.astro` already exists in this checkout at `/services/` as of this writing, so that path is very likely stable.

## (a) Hero positioning — 3 options

**Option 1 — Search & AI-search systems**
- Headline: *Because search decides who gets found. Search is what we build.*
- Body: Search stopped being a checklist and became an operating system — for what customers ask, what an AI cites, and what engineering ships next. We build the research, entity architecture and AEO/GEO measurement that keep a business visible whether the answer arrives as a ranked link or a generated response.
- CTA 1: Explore the work → `/work/`
- CTA 2: Start a conversation → `/contact/`

**Option 2 — Growth systems**
- Headline: *Because growth isn't a campaign. Growth systems are what we build.*
- Body: A thousand-location platform and a ten-break surf guide solve the same problem at different scale: connect research to content to conversion to honest measurement, so growth survives a migration, a merger, or an ordinary Tuesday. That's the system, from enterprise programs to small, hands-on engagements.
- CTA 1: See the work → `/work/`
- CTA 2: Start a conversation → `/contact/`

**Option 3 — AI-search / answer-engine framing**
- Headline: *Because the answer is the new front page. AI-search systems are what we build.*
- Body: Search is moving from ranked links to generated answers, and the entities that win are the ones that already won at structured data. We build and measure that visibility — prompt-set tracking across ChatGPT, Perplexity and Google AI Overviews, backed by the entity and content architecture underneath it.
- CTA 1: See the AI-search work → `/work/`
- CTA 2: Start a conversation → `/contact/`

## (b) Lifecycle strip — Understand → Design → Build → Grow

These four lines are carried over verbatim from the approved taxonomy in `content-proposal.json` (`home.capabilities.items[].body`) — reuse, don't rewrite:

1. **Understand** — Connect research, data and measurement to a question worth answering.
2. **Design** — Make the information clear and the experience useful.
3. **Build** — Connect the interface, content and underlying system so the idea can work.
4. **Grow** — Improve discovery, clarify the next action and measure the change.

## (c) Objectives grid — 4 tiles

**1. Be the answer, not just a result.**
As search shifts from ranked links to generated answers, visibility depends on structured, entity-rich content an AI can cite. We build and measure that — prompt-set tracking across ChatGPT, Perplexity and Google AI Overviews, and the entity architecture underneath it.

**2. Make scale an advantage.**
A thousand-location health network or a sixty-site publishing environment can turn into an inconsistent mess or a repeatable system — the difference is architecture. We've built the entity data, reusable templates and migration discipline that keep scale from becoming the liability.

**3. Ship the system, not the slide deck.**
Strategy that stays in a deck doesn't move a number. We build the working thing — an internal AI reporting tool, a staged and rollback-safe production release — so the recommendation and the delivery are the same project.

**4. Report what's true, not what's convenient.**
Every metric gets a source, a date range and a plain statement of what it does and doesn't prove — the way the SFC case study separates a measured search-traffic gain from a feature that launched after the measurement window. That discipline is the product, not just the write-up.

## (d) Services page copy

### Understand
- **Problems solved:** Performance data scattered across GA4, GSC, ads and SEO tools with no single narrative to act on. No way to measure whether an AI answer engine cites the business at all. Content briefs built on guesswork instead of entity and topic-gap research.
- **Typical outputs:** Source-backed KPI narratives and risk queues. Prompt-set visibility tracking across AI answer engines. Competitive and keyword research at real scale — hundreds to thousands of pages or terms, not a spot check.
- **Working approach:** Pull from the client's actual data, label every number by where it came from, and stop at a finding someone can act on — not a slide that just restates the dashboard.
- **Evidence:**
  - [AEO Visibility Infrastructure](/case-studies/aeo-visibility-infrastructure/) — prompt-set tracking across ChatGPT, Perplexity and Google AI Overviews.
  - [SearchForge](/case-studies/searchforge-content-intelligence/) — entity-gap and topic-cluster research behind content briefs.
  - [SFC Surf School](/case-studies/sfc-surf-school/) — 973 pages crawled across ten competing businesses before a word was rewritten.
  - [Dignity Health Conditions & Treatments Library](/case-studies/commonspirit-medical-content-library/) — a 10,000-term research universe that grew into 1M+ annual organic visits across 34 healthcare markets.

### Design
- **Problems solved:** Nine regional web experiences with inconsistent templates and no shared conversion path. A generated map that looked polished and described the coastline wrong. A product category that had stopped designing for people who already found each other.
- **Typical outputs:** Reusable entity and page templates. Interactive, real-data-driven interfaces. Reporting UIs that show the source next to the number instead of burying it.
- **Working approach:** Design from the research, not around it — and ship an interface that works on a phone, with the underlying data model doing the work the visual design usually gets sole credit for.
- **Evidence:**
  - [Dignity Health Yext Location Conversion Engine](/case-studies/commonspirit-locations-conversion-engine/) — parent/child entity templates standardized across 1,000+ locations.
  - [SFC Surf School](/case-studies/sfc-surf-school/) — a ten-break interactive explorer built on a real, georeferenced aerial photograph.
  - [ClarityPulse](/case-studies/claritypulse-ai-reporting/) — a reporting interface designed around evidence tags, not just KPI tiles.

### Build
- **Problems solved:** Legacy CMS constraints (Sitecore) blocking clean, scalable patient-action pages. A migration mandate facing resistance across 60+ regional websites with no practical reason to move. Manual, inconsistent post-call follow-up creating execution debt.
- **Typical outputs:** Production entity and data systems. Modular CMS content models built for reuse across markets. Internal AI tools shipped with real release discipline — staging, rollback, verification.
- **Working approach:** Build in the client's actual stack, ship behind staging-to-production controls, and verify before calling it done — the SFC release, for example, passed a 63-route audit and a rollback check before launch.
- **Evidence:**
  - [Dignity Health Yext Location Conversion Engine](/case-studies/commonspirit-locations-conversion-engine/) — a 1,000+ page system built outside the legacy CMS bottleneck; later CommonSpirit reporting attributed $15.21M in FY22 revenue to the continuing system.
  - [AEM Content Fragmentation Architecture](/case-studies/aem-content-fragmentation-architecture/) — a reusable content model proposed for 60+ regional sites.
  - [ActionThread](/case-studies/actionthread-transcript-execution/) — call transcripts turned into owner-tagged follow-up work automatically.

### Grow
- **Problems solved:** Organic sessions at risk during a post-merger, 63-plus-site consolidation. A veterans-services nonprofit with no structured way to reach the people it serves. Clinical service lines losing full-funnel coverage as AI-assisted search shifted query patterns.
- **Typical outputs:** Migration-safe organic growth. Honestly attributed campaign reporting. Before/after measurement with explicit date ranges and a clear line under what each number does and doesn't prove.
- **Working approach:** Pair the technical and content work with conversion and measurement from day one, and report growth the way the SFC case study does — a measured gain, a specific date range, and an explicit boundary around what launched after that window.
- **Evidence:**
  - [CommonSpirit Network Consolidation](/case-studies/commonspirit-network-consolidation/) — organic sessions from 2.65M to 4.9M+ across tenure, through 20+ enterprise migrations.
  - [SFC Surf School](/case-studies/sfc-surf-school/) — Google Search clicks +980% (5→54) and impressions +251% (470→1,652, rounded), Aug 12–Sep 8 vs. Jul 15–Aug 11, 2026.
  - [Vet Advocates Growth System](/case-studies/vet-advocates-growth-system/) — monthly signups from 2–3 to 25–50.

### How an engagement runs
1. **Start with the real question.** A working conversation about the problem, the goal, and what data or access already exists.
2. **Establish the evidence.** Research, measurement and competitive audits, each number labeled by what's observed versus assumed.
3. **Design and build the system.** The specific mix of content, entity architecture, interface and engineering the problem actually needs — not a fixed package.
4. **Ship and report honestly.** A staged release, then results reported with real dates and a clear statement of what each number does and doesn't prove.

### FAQ
**Is this a team or one person?**
Mitch Miller is the principal on every engagement — scoping the research, setting the strategy, and on most projects doing the entity architecture, content and code himself. Specialist help gets brought in per engagement rather than kept on a fixed roster; nothing here claims a specific team size.

**What does this cost?**
It depends on scope — an enterprise entity migration and a small operator's search overhaul aren't priced the same way, and no fixed rates are published here. Start a conversation and get a scoped recommendation before anything is agreed.

**Do you only work with large companies?**
No. The work spans enterprise programs (Apple, Stanford Health Care, Dignity Health, CommonSpirit Health) and small, hands-on engagements (SFC Surf School, Clear Kayak Adventures, a pro bono system for Vet Advocates). Same discipline, different scale.

**Is there a free way to see how this works before hiring?**
Yes — the population workbench in the Lab is free: define a question, filter real Census microdata, compare two scenarios and export the result. If it's useful applied to your own customer or CRM data, calibrated and validated, that becomes a paid conversation; no pricing is posted publicly.

**How do you report results — can the numbers be trusted?**
Every figure carries a source and a date range, with a plain statement of what it does and doesn't prove. The SFC case study, for example, separates a measured search-traffic gain (Aug 12–Sep 8 vs. Jul 15–Aug 11) from the ten-break explorer that launched after that window, so the two aren't confused. The population workbench uses the same discipline — every output labeled observed, calculated, simulated or assumed.

## (e) Industries grid

- **Healthcare.** Enterprise and academic health systems — entity-driven location platforms, AEM content migration and full-funnel search for Stanford Health Care, Dignity Health and CommonSpirit Health.
- **Global commerce & tech.** Seasonal and international search programs at Apple scale, across the Americas region's store and education storefronts.
- **AI & software.** Internal AI reporting, AEO/GEO measurement and content-intelligence tools built at Clarity AI and as independent prototypes.
- **Travel, recreation & local services.** Search, content and growth systems for small, real-world operators — SFC Surf School and Clear Kayak Adventures.
- **Nonprofit.** A pro bono acquisition system for a veterans-services nonprofit, built to keep running without the original builder.

## (f) CTA band variants — 4

1. **What are you trying to make possible?** → Start a conversation → `/contact/`
2. **Want to know if AI answers are citing you?** → See the AI-search work → `/case-studies/aeo-visibility-infrastructure/`
3. **Ready to turn local knowledge into a growth system?** → Start a conversation → `/contact/`
4. **Try the free population workbench, then talk about your own data.** → Explore the Lab → `/lab/` · Start a conversation → `/contact/`

## (g) About-page opener (agency voice, Mitch as principal)

Mitch Miller is the principal behind this practice — the person who scopes the research, sets the strategy and ships the system. The work spans Apple's seasonal commerce programs, the thousand-location platform built across Dignity Health and CommonSpirit Health, Stanford Health Care's regulated search environment, and the AI-search measurement built at Clarity AI. It also includes smaller, hands-on engagements — SFC Surf School, Clear Kayak Adventures, a pro bono system for Vet Advocates — where the same discipline applies at a different scale. We connect data, design and engineering because a client's problem rarely respects the boundary between them; the practice exists to carry an idea from research through to a working, measured result.

## (h) Meta titles and descriptions

| Page | Meta title (chars) | Meta description (chars) |
|---|---|---|
| Home | Mitchell Miller — Search, Growth & AI-Search Systems (52) | Search, growth and AI-search systems for enterprise and small business, built by principal Mitchell Miller. (107) |
| Services | Services — Search, Growth & AI-Search Systems (45) | How engagements run, stage by stage — Understand, Design, Build, Grow — with evidence from real case studies. (109) |
| Work | Work — Search, Growth & AI-Search Case Studies (46) | 17 case studies spanning Apple, CommonSpirit Health, Stanford Health Care, SFC Surf School and more. (100) |
| Lab | Lab — Free Search & Growth Tools (32) | Try free, in-browser tools, including a population workbench built on real Census microdata. (92) |
| Writing | Writing — Search, Growth & AI-Search Notes (42) | Field notes on enterprise search, AI-search measurement and growth systems, from real engagements. (98) |
| About | About Mitchell Miller, Principal (32) | From Apple and CommonSpirit Health to SFC Surf School — the practice behind the search and growth work. (103) |
| Contact | Contact — Start a Conversation (30) | Tell Mitchell Miller the problem you want to solve. No booking confirmation, no pricing quote — just a reply. (109) |
| Resume | Resumes — Mitchell Miller (25) | Four resumes, one chronology: Search Leadership, AI Search Engineering, Growth & Product Systems, Organic Systems Architecture. (127) |

All titles are under 60 characters; all descriptions are under 155 characters (exact counts above, verified with a character-count script — see report).

## (i) Claims ledger

| Claim used in this pack | Value / result | Source (file · section) |
|---|---|---|
| Dignity Health location pages | 1,000+ | `src/lib/data.ts` (commonspirit-locations-conversion-engine); `src/lib/case-study-editorial.ts` (same slug, metrics) |
| Later CommonSpirit attributable revenue | $15.21M FY22 | `src/lib/data.ts` (commonspirit-locations-conversion-engine, proof); `src/lib/case-study-editorial.ts` (metrics) |
| Regional sites needing a shared content model | 60+ | `src/lib/case-study-editorial.ts` (aem-content-fragmentation-architecture, metrics) |
| Post-merger site consolidation | 63+ sites | `src/lib/data.ts` (commonspirit-network-consolidation, context) |
| Organic sessions through migrations | 2.65M → 4.9M+ | `src/lib/case-study-editorial.ts` (commonspirit-network-consolidation, metrics) |
| Enterprise migrations completed | 20+ | `src/lib/case-study-editorial.ts` (commonspirit-network-consolidation, metrics) |
| SFC competitive research scope | 973 pages / 10 businesses | `src/lib/case-study-editorial.ts` (sfc-surf-school, chapters) |
| SFC production routes at release audit | 63 indexable routes | `docs/overhaul-2026-09-10/content-evidence.md` |
| SFC Google Search clicks | +980% (5 → 54) | `src/lib/case-study-editorial.ts` (sfc-surf-school, metrics); `docs/overhaul-2026-09-10/content-evidence.md` |
| SFC Google Search impressions | +251% rounded (470 → 1,652) | `src/lib/case-study-editorial.ts` (sfc-surf-school, metrics); `docs/overhaul-2026-09-10/content-evidence.md` |
| SFC comparison window | Aug 12–Sep 8 vs. Jul 15–Aug 11, 2026; map launched Sep 10 | `docs/overhaul-2026-09-10/content-evidence.md` |
| Dignity Health content research universe | 10,000 terms | `src/lib/case-study-editorial.ts` (commonspirit-medical-content-library, metrics) |
| Library's later annual organic visits | 1M+ | `src/lib/case-study-editorial.ts` (commonspirit-medical-content-library, metrics) |
| Healthcare markets using the library | 34 | `src/lib/case-study-editorial.ts` (commonspirit-medical-content-library, metrics) |
| Vet Advocates monthly signups | 2–3 → 25–50 | `src/lib/case-study-editorial.ts` (vet-advocates-growth-system, metrics) |
| Named AI answer engines measured | ChatGPT, Perplexity, Google AI Overviews | `src/lib/case-study-editorial.ts` (aeo-visibility-infrastructure) |
| Total case studies (Work meta) | 17 | `docs/overhaul-2026-09-10/content-evidence.md` ("All 17 existing case-study slugs are preserved"); `src/lib/case-study-editorial.ts` |
| Resume count and labels (Resume meta) | 4: Search Leadership, AI Search Engineering, Growth & Product Systems, Organic Systems Architecture | `docs/overhaul-2026-09-10/resumes/README.md` |

Employer/client years used only in `site/data/brands.json` (not restated here): Apple Aug 2022–Jan 2024; Dignity Health/CommonSpirit Health Sept 2018–Aug 2022; Wpromote/DemandWave Apr 2015–Aug 2018; Stanford Health Care through Dec 2025; Clarity AI through Feb 2026; SFC Surf School May 2026–present — all from `docs/overhaul-2026-09-10/resumes/README.md`.
