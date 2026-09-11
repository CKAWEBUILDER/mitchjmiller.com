# Content, design and template roadmap

Prepared September 11, 2026. Planning only: no website source, deployment, DNS, account or hosting changes were made for this plan.

## Desired outcome

A complete static-HTML public website for Mitchell Miller’s consulting, creative and technical work: data science, public-data simulations, UX/UI, software and backend/database engineering, content, SEO and conversion optimization. Enterprise evidence, active projects, historical case studies, current resumes and interactive artifacts should demonstrate how these capabilities connect. Search is an important part of the record, not the boundary of the portfolio. Recruiting remains a clear secondary path. The site should communicate an independent practice led by Mitch; it should not imply an agency team, clients or capabilities that have not been established. Future SEM offerings remain a planned direction unless a specific published claim is supported by existing work.

Every public page must arrive with its meaningful content, links, metadata and navigation in the initial HTML response. JavaScript enhances filters and interactive tools; it must not be required to read the portfolio or discover its links. Astro static output with a few interactive islands is a good fit, subject to the broader architecture decision.

Private client workspaces are a later, distinct workstream. Their eventual URL location does not determine their security or require rebuilding the public content model.

## What the evidence currently establishes

The current public site is an enterprise-search hiring portfolio. Its production HTML references the existing `index-8VF9Ek7b.js` bundle, and the deployed files are available on `origin/gh-pages`. The audit used that branch and original `origin/main`, not the proposed redesign as evidence of live content.

- The live data contains 17 case-study entries, including several stories from the same employers. They are not an inventory of approximately 15 active projects.
- The current Selected Builds list contains nine projects: DomainSignal, ClarityPulse, SearchForge, ActionThread, AEO Visibility Infrastructure, Date Night, Clear Kayak Adventures, FolioTrack and Vet Advocates. It has no complete active-status inventory, and its cards lack project/demo destinations.
- SFC exists in the case-study index but is absent from all Work filters. Its deployed standalone report is dated August 14, 2026.
- The four deployed resume PDFs omit SFC and retain the older Clarity Digital name.
- The proposed September 10 redesign already contains substantial reusable work: 17 authored narratives, four current two-page PDFs, three working lab experiences, 25 writing/study items, an improved contact path and a coordinated visual system.
- Its 54 physical route files are React shells with metadata. They are useful routing work, but do not satisfy the new requirement that full page content be delivered as static HTML.

Source records: `docs/overhaul-2026-09-10/README.md`, `next-phase-requirements-2026-09-11.md`, `content-evidence.md`, `interactive-lab.md` and `resumes/README.md` in the isolated redesign repository. The next implementation must start from a fresh canonical baseline so the separate production crawl fix is preserved.

## Reuse versus rebuild

| Asset or system | Decision | Work required |
|---|---|---|
| Cream, ink, vermilion and sage visual system | Reuse as the design starting point | Adjust hierarchy to give enterprise and current growth work comparable prominence; approve a small representative page set before broad migration. |
| Seventeen narrative case studies | Reuse after source reconciliation | Split project/employer identity from individual case stories; preserve all established URLs; sharpen contributions, dates and outcomes where new evidence supports them. |
| Existing images, architecture diagrams and SFC source visuals | Reuse | Keep provenance and representative/actual labels. Generate required sizes and meaningful alt text; avoid unrelated new illustration work. |
| Four refreshed resume PDFs and original download URLs | Reuse | Confirm new inventory/claims do not require content changes. Re-render only changed PDFs; do not redo an approved visual format unnecessarily. |
| Four published articles and 21 study notes | Reuse | Render complete content at build time. Keep articles distinct from research notes and drafts; preserve source attribution and dates. |
| Three React lab tools and standalone HTML explorer | Reuse interactions | Place in statically rendered wrappers; hydrate only each tool. Preserve working inputs, resets, deep links and HTML export. These are the existing baseline, not the limit of the future lab. |
| UBI calculator and public-data population/society simulation work | Priority inventory candidates explicitly requested by Mitch | Locate canonical sources and working artifacts; verify status, inputs, methodology, datasets, outputs and actual implementation. Do not invent a functioning calculator, simulation feature or result. Reuse verified assets and interactions once reviewed; new implementation needs separate scope. |
| Current SPA page components | Rebuild as static templates | Move headings, paragraphs, cards, links, figures, tables and navigation into build-rendered HTML. Reuse CSS and content rather than redesigning everything twice. |
| Runtime SEO component and route-shell copier | Replace | Generate page metadata, canonicals, social previews, sitemap and complete HTML from one content inventory at build time. |
| Contact composition flow | Reuse initially | Maintain the honest “compose email, review and send” behavior. A server form, CRM or booking integration is a separate requirement if wanted. |
| Future confidential client artifacts | Do not copy into the public build | Plan a separate protected artifact inventory and storage/deployment path; implementation depends on approved authorization architecture. |

## Step-by-step work packages

### 1. Reconcile the inventory before claiming completeness

Create one project register from the live site, the reviewed redesign, existing canonical project repositories and Mitch’s active-project list. Do not assume the 17 case studies or nine builds are the approximately 15 current projects.

Each project needs: stable ID, public name, employer/client/independent relationship, engagement scope, active/maintained/completed/archived/unknown status, status date, role, dates, canonical repository or source location, public URL if any, available artifact/demo, capability tags, approved public summary, evidence owner and publication permission. Record the actual frontend, backend, database and data/model components only when verified. Keep private operational fields outside the public content export.

**Inventory priority:** locate the UBI calculator first as a specifically requested candidate, then public-data population/society simulations and other active technical/creative projects. Confirm whether these are existing working tools, prototypes, archived experiments or ideas before describing their status. For UBI, identify what the calculator actually computes and which inputs and assumptions it uses; do not infer features from the project name. For simulations, identify the model, data sources and what a scenario means. SearchForge and ClarityPulse are existing examples to place within a broader systems capability, not reasons to constrain the inventory to SEO tools. Include Profound and other disparate measurement sources in the evidence/architecture inventory, distinguishing actual integrations from manual research or planned connections.

Relate multiple case studies to one project or employer. For example, the three Apple stories are separate case studies within enterprise experience, not automatically three current projects. An internal reporting tool is not automatically an independent business. Preserve ClarityPulse’s internal Clarity AI classification.

Produce three explicit sets: active projects; historical work/case studies; independent experiments. A project can have several capabilities and case studies without being counted twice. Confirm the missing project identities with Mitch once, using a prefilled register; this is the essential dependency for claiming full coverage.

### 2. Agree on the information architecture and buyer paths

Use a client-first homepage that makes the work and available help clear while giving enterprise credibility substantial visual weight. Present a balanced opening group: enterprise program, scalable healthcare system, current growth engagement and a verified data/creative/interactive product. Give the UBI calculator a visible place in Work and the lab once its source and status are checked; it should not be buried behind search-only examples. The opening message should connect analytical thinking, creative experience design and working implementation rather than define Mitch solely through SEO.

Recommended navigation: Work, Services, Lab (tools, data & experiments), Writing, About, Contact; retain a prominent Resumes/Hiring path. Keep the navigation short and use content facets to expose the breadth rather than creating one top-level link per discipline. Final labels can retain familiar existing route names where that avoids needless URL changes.

Within Work, separate engagement context (Enterprise, Small-business growth & operations, Independent projects) from capability and status, including Active. Use a many-to-many capability taxonomy: **Data science & modeling; Creative strategy & visual communication; UX/UI & product design; Software, backend & database engineering; AI systems & workflow automation; Measurement & source integration; Content & editorial systems; SEO & discovery; CRO & growth operations.** A project can demonstrate several capabilities without being duplicated or counted several times. SEM can appear as a planned service direction; specific historical paid-search experience may be shown only with its existing employer attribution and evidence. Search and filters must operate over the complete inventory, including SFC and, once reconciled, the UBI/simulation work.

Services should explain problems solved, typical outputs, working approach and relevant evidence. Use an independent-consulting voice. Do not invent packages, prices, staff, partner relationships or results to create an “agency” appearance.

### 3. Define shared templates and structured content

A global shell plus seven template families is sufficient:

1. **Homepage:** positioning, balanced proof, current work, capabilities, lab entry, about and client/hiring actions.
2. **Services and methodology:** problem, audience, scope, process, relevant case studies and inquiry link; can support existing Systems, AEO/GEO and Collab Ideas URLs.
3. **Collections:** Work, case studies, projects/builds and writing; complete initial HTML listings, progressive filters, counts and empty states.
4. **Project/case-study detail:** shared base with variants. Project pages show current state and artifacts; case studies explain challenge, contribution, decisions, implementation, outcomes, evidence and related work. Every metric retains period and definition.
5. **Writing detail:** full article or study-note body, author/date, source links and related items; drafts excluded.
6. **Profile, resumes and contact:** lightweight informational variants using the same readable layout. Resume pages include useful HTML summaries and direct PDF downloads.
7. **Interactive artifact wrapper:** purpose, instructions, data/source context and static explanation around the working island or standalone tool; preserve export/open options where available. Support calculators, simulations, data visualizations and creative/product experiments as well as search tools. The UBI candidate needs its own descriptive page and an actual verified interaction if available; otherwise publish only an accurately labeled project record, not a fake demo.

Use validated content records or collections for projects, case studies, writing, services, resume variants and artifacts. Slug, title, description, status and relationships should drive routes, links, metadata and sitemap together. Public asset manifests should include type, dimensions, alt text, provenance and whether the image is actual or representative.

Data/calculator/simulation artifacts also need a methodology record: dataset/provider, public source URL, release or observation date, reuse permission, units, inputs, assumptions, outputs, scenario meaning and known limitations. Keep observed data, calculated values and simulated results distinct. Document real source connections—including Profound or other measurement tools—so a reader can understand how information is assembled without being shown private account data. Architecture diagrams should distinguish implemented frontend/backend/database components from proposed ones.

### 4. Review representative pages before migrating everything

Prepare one complete homepage, one enterprise case study, the SFC case study, one active data/creative project page and the Work collection. Prefer the UBI calculator for that active-project example if its source and status are confirmed; otherwise select another verified project and keep UBI explicitly tracked as pending inventory. Review desktop and narrow-mobile layouts, type hierarchy, reading length, proof treatment and calls to action.

Use this checkpoint to settle enterprise-versus-small-business balance and the project status model. Once these decisions are accepted, fill the remaining templates from structured content instead of changing the design separately on every route.

### 5. Migrate all public content into actual static HTML

Render all content during the build. The existing route-shell duplication approach should be removed rather than supplemented with more client-side metadata. Retain established paths and original PDF/asset links; if a deliberate consolidation changes a URL, record a redirect and check inbound/internal links.

Move only interactive behavior into client code: collection filtering, mobile navigation if necessary, email composition and lab controls. Render all collection items before filtering so search engines and no-JavaScript users can discover every public project. For interactive tools, deliver a meaningful static explanation and default-state information even before the island loads.

Migrate narrative assets and source dates together. Historical SFC reports can be retained as clearly dated historical material; the current case study must not present the August report as the latest state or carry forward its mistaken labeling of search CTR as conversion rate.

### 6. Apply the claims and publication gates while importing

Existing public portfolio material is approved for promotion; do not repeatedly ask Mitch to approve it. The recent SFC work was explicitly requested. Future client material follows the permission requirement Mitch established.

For every quantitative claim, record the value, metric definition, period, source, contribution and any limitation that changes its meaning. Lead public copy with the demonstrated result; keep source detail close enough to make it assessable.

Specific reconciliation items:

- SFC: 5→54 clicks (+980%) and 470→1,652 impressions (+251% rounded), Aug 12–Sep 8 vs Jul 15–Aug 11, 2026. The Sep 10 map cannot be credited with causing earlier results.
- Dignity/CommonSpirit: do not replace the existing 60–80% estimate of tracked location actions with “80% of all online bookings” without establishing the actual denominator, period and source. Preserve distinct later FY22 figures.
- Apple: document the claimed influence of the AMR search program on global strategy if evidence supports it. Keep the accurate formal title, Program Manager, SEO - Americas Region (AMR).
- Stanford/MyHealth: identify Mitch’s specific contribution and delivery scope from existing evidence; do not imply ownership of the entire product.
- Internal tools: distinguish a prototype, an internal operational system and a public client product. ClarityPulse remains internal Clarity AI work; SearchForge can illustrate research/product-system capability according to its actual source record. Do not invent adoption, revenue, time-saved or customer counts.
- UBI and public-data simulations: label scenarios as scenarios, identify sources and assumptions, and avoid presenting modeled populations or outcomes as observed real populations or validated forecasts. Verify functionality before offering a demo; verify data reuse before bundling datasets.
- Broad capability claims: tie UX/UI, data science, backend/database engineering, content, SEO/CRO and measurement integration to specific evidence of Mitch’s contribution. Profound and disparate-source reporting should be shown as concrete work where verified. Planned SEM expansion must not be presented as a newly proven service or result.
- Destination search: explicit place qualifiers demonstrate destination interest regardless of current location. Do not confuse that with a measured visitor-origin percentage or exact local keyword volume.

Public imports must exclude client email, private account UI, credentials, private Drive URLs and confidential reports/assets. Representative interfaces stay labeled. Source code, HTML downloads and their supporting files need the same review as screenshots.

### 7. Validate the complete portfolio and make launch review concrete

Run the content and template acceptance checks below against the exact production candidate. Prepare a short review of changed content, inventory coverage, representative pages, redirects and remaining exclusions. Production promotion is a distinct final action after approval; the roadmap does not authorize it.

Keep the public migration independent of a future client portal so the useful public site does not wait on an authentication design. Carry the approved content inventory and artifact relationship model forward into that later work.

## Acceptance criteria

- **Inventory:** every reconciled active project has a public page or an explicitly documented reason it is not public. Approximately 15 is a planning target until identities/status are confirmed. The specifically requested UBI calculator and public-data simulations have source/status entries and a deliberate presentation decision; neither is silently omitted. Seventeen historical case-study URLs remain accounted for.
- **Complete HTML:** with JavaScript disabled, each public route exposes its heading, meaningful body, images/alt text, navigation and internal links. Collection entries and resume links are all available. Raw fetched HTML contains the actual page content, not only an empty root node.
- **Discoverability:** production pages are crawlable and indexable; one correct canonical, useful unique metadata and a sitemap entry for each intended public page. Review environments remain blocked from indexing. Re-running the build does not duplicate metadata or omit content.
- **Balanced positioning:** enterprise work is prominent on the homepage and collection; small-business growth/operations is substantive; verified data science, creativity, UX/UI and engineering projects are visible alongside search work. Recruiting and client paths are both clear. The lab is not framed as exclusively an SEO lab.
- **Truthful content:** roles, employer names, dates and project status agree across About, project pages, case studies and all four resumes. All material new claims have source/attribution support. Historical charts are dated; modeled outputs are labeled; real and planned functionality are separated. SEM expansion is a future direction unless a specific claim is independently supported by the existing record.
- **Working paths:** no broken internal route, PDF, media or artifact link; direct loading and refresh work for every route. SFC appears in appropriate filters. Changed URLs have deliberate redirects.
- **Progressive interaction:** filters, keyboard navigation, focus states, mobile menu, lab controls/deep links and artifact export work. Core information remains readable without interaction. Reduced-motion behavior is respected.
- **Visual quality:** representative templates and every unique content variant checked on desktop and narrow mobile; no overflow, clipped metric text, unreadable image captions or placeholder media.
- **Data separation:** a build inventory confirms no private-client files, secrets or unapproved artifacts enter the public output or source maps. A public HTML download is treated as public content.
- **Resume completeness:** four correct PDFs retain their stable filenames; only changed files require renewed render checks. Hiring pages clearly distinguish the four purposes.
- **Launch handoff:** exact approved source revision, production build mode, redirects and route checks are recorded, with rollback and post-launch verification owned by the deployment workstream.

## Future private client-area content contract

Plan client workspaces as a distinct collection with client ownership, authorized audience, artifact ID, version, status, title, description, file/asset manifest and retention rule. Keep that confidential inventory out of the public project export. Public case studies may refer to a sanitized artifact only when approved; a private workspace must not become public because a case study links to it.

The protected experience should eventually support an artifact index, version history, full interactive HTML and assets, and a stable entry point for each authorized client. Authentication and per-client authorization must apply to the underlying files as well as the index page. Backups, removal of access and export ownership belong in the architecture/operations plan. A hidden URL or noindex flag is not protection.

This phase is not implemented or included in the public-template effort estimate. Provider, identity mechanism, storage and ongoing cost remain architecture decisions. Current GitHub Pages hosting should not be changed merely to write this roadmap.

## Effort estimate and dependencies

Planning estimate for this content/design/template workstream, assuming one experienced implementer using the reviewed materials and ordinary parallel assistance where useful:

| Work package | Focused effort | Dependency |
|---|---:|---|
| Reconcile active projects and claims register | 3–5 hours | Access to canonical project records and one consolidated confirmation from Mitch |
| Information architecture and representative design review | 3–5 hours | Inventory model and enterprise/client positioning decision |
| Structured content and template adaptation | 8–12 hours | Chosen static rendering approach; existing CSS/narratives reused |
| Full content import and missing project summaries | 5–9 hours | Approved evidence and usable assets for the missing active projects |
| Content, no-JS, link, interaction and visual acceptance | 5–8 hours | Integrated static build and all chosen public content |
| **Total for this workstream** | **24–39 focused hours** | Excludes waiting for evidence/feedback and other workstreams below |

These are human-equivalent focused work estimates, not a promise about model runtime or a fixed invoice. Parallelism can shorten elapsed time after the shared content schema and representative templates are settled; parallel rewriting before those decisions increases rework. Infrastructure setup, deployment engineering, analytics implementation and private authentication/storage are outside this estimate and should not be double-counted in the parent roadmap.

Assumptions: existing 17 narratives, 25 notes, four PDFs and three tools are substantially reusable; no new photography, large video production, brand naming exercise or extensive claims research is required; most missing active-project descriptions can be assembled from existing project records. Initial source/status discovery for UBI and public-data simulations is part of inventory reconciliation. Rebuilding those products, creating new models, collecting substantial datasets or implementing new backend/database services is outside this migration estimate until their actual state is known. If a project has no source material or approved visuals, expect additional effort per project rather than silently substituting a generic card. Mitch’s review can be consolidated into an inventory confirmation, a representative-design checkpoint and final launch review.

## Questions to settle before implementation

- Which named projects make up the approximately 15 active projects, and what does “active” mean for prototypes, internal tools and maintained client sites? Where are the canonical UBI calculator and public-data simulation sources, and what currently works?
- Which visitor action is primary: consulting inquiry, discovery booking or a hiring conversation? An agency-style presentation does not decide the operating workflow.
- Which newly emphasized enterprise claims have a precise source and denominator, particularly the online-booking share and global Apple-program influence?
- Which future client artifacts may be public examples, and which must be isolated from the public repository/build and served only after authorization?

The fastest safe sequence is inventory → shared content model → representative templates → full static import → acceptance review → approved launch. It preserves the substantial completed work while correcting the underlying delivery format and missing project coverage.
