# A complete-HTML portfolio, built to grow

Migration roadmap for Mitchell Miller · September 11, 2026

**Recommendation: rebuild the public site in Astro, generating complete HTML at build time, with a custom, reusable design system. Launch the approved public build on the existing GitHub Pages host first. Treat Cloudflare migration and authenticated client workspaces as separate later releases.**

The first step is an inventory and a working HTML template—not a DNS change. Changing hosts would move the existing rendering and indexing problems with it. This roadmap is planning work; it does not deploy the redesign, migrate hosting, purchase services, or publish client files.

## What success means

Every public page arrives with its actual headings, text, links, metadata and canonical URL in the initial HTML response. A normal HTML-only crawl can discover the intended public inventory. JavaScript enhances filters, calculators and interactive artifacts; it is not required to reveal the portfolio, case studies or navigation.

This is compatible with Astro and selected React components. Astro builds the public document before delivery; only individual experiences that need interaction receive browser JavaScript. We will not wrap the existing single-page application in Astro and call that a migration. [Astro islands architecture](https://docs.astro.build/en/concepts/islands/)

The site should explain the breadth of the business: enterprise search and product work, small-business growth operations, current products and experiments, resumes, writing, and useful interactive demonstrations. Historical case studies and active projects must be identifiable as different kinds of work.

Mitch's additional direction makes **data science, creativity and engineering** central to that story: UX/UI, software and backend/database work, statistics and public-data exploration, content, SEO and CRO. SEM is a future direction to describe as such until supported by relevant work. The UBI calculator is a specifically requested priority for the project inventory and lab, including the interest in simulated populations using public data. Locate its actual source, data, assumptions and working state before writing the public case or promising features. Distinguish model scenarios from observed outcomes.

SearchForge and ClarityPulse should illustrate the broader practice of combining disparate data sources into useful systems and decisions. Profound and other measurement sources can be described where the actual integrations support it; do not imply an integration, dataset license or production result merely because the tool was discussed. Filters should expose Data science & simulation, Design & engineering, and Search & growth alongside enterprise/client context. These are overlapping capabilities, not mutually exclusive project buckets.

Create a distinct independent-projects area for Date Night, DomainSignal and the other products/side projects. Include verified live demos, websites and mobile-app store links where they actually exist, with accurate availability/status labels. Building Mitch's public identity is ongoing work: the first release establishes a useful, coherent baseline, then new projects and evidence can be added through the same templates. The business priority is qualified inbound opportunities. SFC follow-up is paused for a week from September 11, per Mitch's direction; this plan does not send or schedule a follow-up.

The data-science lab's proposed flagship is now **Build your own simulated population**: a guided workbench that starts with a business/research question, suggests relevant data sources, helps prepare data, constructs a synthetic population and compares scenarios. A retailer's hypothetical product launch is one example, not a claim of work for that retailer. Begin with a public-data demonstration and transparent assumptions; authorized private CRM imports are a later capability. This new product needs its own discovery/model-validation scope and is not included in the HTML migration estimate. The UBI calculator remains a priority existing-artifact candidate and a related demonstration. [Flagship concept brief](simulation-workbench-concept.md)

## Established baseline

| Area | Current public site | Unpublished September redesign |
|---|---|---|
| Hosting | GitHub Pages, GitHub-backed source | Local review build; feature branch in the same repository |
| Rendering | React builds most content in the browser | React still builds page content; route files add metadata, not complete content |
| Public inventory | 53 unique published routes defined in source | 54 routes, including the new lab |
| Direct route coverage | 29 published route files plus one draft; 24 published routes lack files | Route copies exist, but need replacement with complete HTML |
| Crawling/indexing | Robots crawl restriction removed and verified September 11; page-level noindex remains | Review mode blocks indexing; production switch exists but has not been deployed |
| Sitemap | Both tested sitemap endpoints return 404 | Generated sitemap, not submitted or verified on production |
| Resumes | Four working but outdated PDFs | Four updated, reviewed two-page PDFs |
| Content/assets | Existing public material is approved for promotion | Expanded case studies, evidence, visuals, writing and three lab experiences available to reuse |

The 17 case studies are not proof of 17 active projects. The current Selected Builds page lists nine projects; Mitch estimates about fifteen active projects overall. Reconcile the list before claiming complete coverage. Final route count follows that reconciliation, rather than an arbitrary page target.

The earlier technical audit captured robots before the hotfix. Its robots-block finding is superseded by the verified live change; its noindex, sitemap and missing-route findings remain applicable. Crawling allowed does not mean indexed, and a sitemap count is not an indexed-page count. [Google's JavaScript crawling and indexing guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## Preserve the useful work

- Reuse the approved public content, expanded case-study narratives, current resume PDFs, evidence images, working demonstrations, and original URLs.
- Reuse the September design's typography, colors and graphics where they fit the chosen direction. Review a homepage and two representative templates before converting the whole site.
- Replace the top-level React router, content-loading dependency on JavaScript, route-copy script, and duplicated SEO setup with Astro pages, shared layouts and a validated content model.
- Preserve working interactive components where practical. Make their initial rendering safe at build time; keep browser-only behavior inside the interactive component. The current lab accesses browser location/history and needs that boundary checked.
- Keep the original checkout and its unpublished drafts intact. Do not move private client material into the public repository or build output.

## Source and release discipline

GitHub remains the source of truth. Start implementation in an isolated branch that incorporates the latest main crawl hotfix and the useful September redesign commits. Do not overwrite main with the older redesign branch. Keep public source and deployment output separate; use one release owner.

The existing production build stays in service while the new HTML build is reviewed. The old instruction to publish the React redesign after review is superseded by this HTML migration direction. No production or DNS action is required to complete the plan.

## The implementation sequence

Effort below is a planning estimate in focused, human-equivalent engineering/content hours. It is not a prediction of model runtime or a bill. Three contributors can overlap independent work after the content schema and templates are established; review, integration and deployment stay sequential.

| Step | Concrete deliverable | Owner | Effort | Exit condition |
|---|---|---|---:|---|
| 1. Establish the baseline | One register of URLs, active projects, historical cases, assets, PDFs and private exclusions; backup/release record | Lead + content agent | 3–5 h | Every current URL has a keep, redirect, or deliberate removal decision; missing active projects are named |
| 2. Set the design and content model | Custom Astro design direction; shared fields and relationships; homepage, enterprise/SFC case and project-layout designs | Content/design agent + lead | 3–5 h | Balanced enterprise/client presentation and reusable templates ready for implementation |
| 3. Prove the architecture | Build a homepage, one case-study detail and one writing page as complete HTML; include one interactive island | Lead + architecture agent | 5–8 h | Raw HTML and a JavaScript-disabled browser show meaningful content and links; direct requests return 200 |
| 4. Convert the public inventory | Static pages for existing URLs plus the reviewed lab and reconciled project additions; updated resumes and original assets | Content/template agent + lead | 8–12 h | No public page depends on the app router to exist; all intended items appear in collection HTML |
| 5. Add the enhancements | Working filters, responsive navigation, three labs, artifact downloads and useful inquiry/hiring paths | Interactive agent | 4–7 h | Existing interactions work without obscuring the underlying content; analytics events are specified |
| 6. Audit the release candidate | Full HTML crawl, link/metadata/redirect checks, representative visual/accessibility review, analytics validation and asset review | Independent QA agent + lead | 5–8 h | Release gates pass against a single identified source revision |
| 7. Publish and verify | Approved host configuration, exact release, rollback record, production crawl, sitemap submission and launch measurement record | Lead only | 4–6 h | Production content, redirects, indexing signals, analytics and direct URLs verified |
| **Public-site total** | **An HTML-first site ready for real search discovery and client review** | **Up to four agents including the lead** | **32–51 h** | **Estimated 3–5 working days of elapsed delivery with focused parallel work and timely review** |

These estimates include reuse of the existing 17 case narratives, 25 notes, four PDFs and three tools, plus modest new summaries for the missing active projects. They exclude new photo/video production, extensive missing evidence research, a CMS, CRM, bespoke booking system, and client-workspace implementation. Unknown project material or a new visual direction expands the range. The three-page pilot is the point to replace estimates with observed throughput and actual usage; do that before scaling the remaining migration.

The estimate is consolidated: overlapping estimates in the specialist appendices are not additional hours to add on top. Calendar delays for account access, DNS propagation, client permission or Mitch's review are outside focused effort. Agent parallelism does not remove those dependencies or guarantee a particular completion day.

## Agent allocation without unnecessary overlap

Use a lead and at most three contributors. The lead owns architecture decisions, shared build configuration, integration, release and rollback. The content/template contributor owns the project register, schema and page migration. The interaction contributor owns the lab and progressive enhancements. The independent reviewer owns URL/content/SEO/accessibility checks and later authentication tests.

Start with the lead and content contributor for the baseline and shared schema. Add the interaction contributor once the pilot boundaries are stable. Bring the reviewer in for pilot acceptance and full integration rather than paying for four agents to rewrite the same foundation. Only the lead changes deployment configuration or promotes a release. A specialist may switch roles between phases, but should not be the only reviewer of their own implementation.

Mitch's participation can be consolidated into three short checkpoints: confirm a prefilled active-project register, review representative designs, and approve the concrete production release. Existing public material already has publication permission. These checkpoints resolve missing facts and design choices; they do not repeat previously given permissions.

## Templates and content structure

A global header, footer, navigation and metadata layout plus seven template families cover this portfolio:

1. Homepage with balanced enterprise, current client and product proof.
2. Services/methodology pages, including existing Systems and AEO/GEO content.
3. Collections for Work, case studies, active builds and writing. All entries are present in HTML; filters enhance them.
4. Project/case detail variants: current status and artifacts for projects; challenge, contribution, decisions, outcomes and evidence for cases.
5. Article and study-note detail, with complete bodies and clear source/date context.
6. About, resumes and contact, including readable HTML career summaries and four stable PDF links.
7. Interactive-artifact wrappers with purpose, instructions, source context and a working embedded experience.

Keep industry, capability, relationship and status in separate fields. A historical Apple case study, an active small-business engagement and an internal prototype can each be accurately described and filtered. Do not call three stories from one employer three active businesses. Use Markdown/structured content in Git first; add a CMS only if the editing workflow actually requires one.

## Release gates: what must be true before launch

- **HTML:** every intended public route has actual body content, navigation, headings and links in the HTTP response. A JavaScript-disabled review can read the core site. No page-level client-only React wrapper qualifies as a pass.
- **URLs:** preserve the existing 53 published routes and four PDF paths unless a documented change is approved. Account for the new lab and any additional project pages. Direct loads and refreshes return the correct status; an unknown URL returns a real 404 rather than a homepage shell.
- **Discovery:** intended public pages permit indexing, have one correct canonical and accurate metadata, and appear in the XML sitemap. Exclude drafts, review helpers and private files from public output and the sitemap. Preview noindex is separate from authentication.
- **Redirects:** record old-to-new paths and test HTTP status and destination. Do not assume a generated HTML redirect is a server-side 301. Prefer retaining existing URLs.
- **Content:** project statuses, names, roles and dates agree across pages and PDFs. Enterprise results retain their metric definitions and attribution. The September SFC map is not credited with growth measured before its launch.
- **Functionality:** links, images, resumes, filters, lab controls, reset/deep-link behavior and downloadable HTML work. Desktop, narrow mobile, keyboard navigation and reduced motion are checked on representative templates and unique exceptions.
- **Measurement:** retain the correct production analytics property; exclude previews. Verify one page view per navigation and useful inquiry, resume-download and artifact-use events. A mailto click is an intent signal, not a verified lead or booking.
- **Operations:** source is pushed before deployment; the precise approved revision, previous release, DNS state where relevant and rollback procedure are recorded. Private files and credentials are absent from public source/output.

After launch, submit or resubmit the verified sitemap in Search Console if access is available, inspect representative public URLs, and record the launch in the measurement log. If access is missing, label submission as outstanding rather than claiming success. Recheck discovery/indexing and lead quality after 7 and 28 days; those are proposed follow-ups, not automations created by this plan. No ranking, indexing-speed or revenue guarantee is implied.

## Hosting: when Cloudflare enters the sequence

The public HTML build does not need Cloudflare to be crawlable. Keeping GitHub Pages for the first public release preserves the domain and avoids making DNS, email and authentication dependencies of the immediate goal. The same static output should remain portable to Cloudflare.

When Cloudflare is useful, make it a separate, controlled cutover: inventory DNS and email records; establish the target account and deploy rights; deploy the exact approved GitHub revision to a protected review address; verify full HTML, redirects, status codes and assets; record the old DNS/host state; switch the public domain after approval; verify apex and www, TLS, email-related records, production analytics and representative URLs; retain the prior release for rollback. Do not cancel or disable the working origin during the transition.

Mitch's existing domain must remain the canonical public address. Search traffic should not split across a GitHub project URL, a Cloudflare preview URL and the custom domain. Protect or control alternative deployment URLs deliberately; do not assume a preview-access setting protects every hostname.

Cloudflare is a useful later platform for controlled access and private file delivery, but buying or configuring it is not step one. If a concrete infrastructure requirement emerges during the pilot that makes GitHub Pages unsuitable, revise this hosting decision before launch and show the reason. Otherwise, avoid combining the first HTML release with a host migration.

## Later: the client deliverable library

Mitch clarified that this is a future product, explicitly outside the initial migration. Each client gets a private place to return to and see the history of the work: a dated timeline of deliverables, reports, demonstrations and interactive HTML tools. They can explore scenarios and inputs instead of digging through static exports or old links. Editing the original deliverable is not part of the default experience.

An initial client experience would include sign-in, a chronological project/deliverable index, artifact detail pages, full interactive HTML with its supporting files, clear delivery dates and version labels, and an export option where the artifact permits it. Keep a delivered version immutable; experimentation changes the viewer's session rather than rewriting the evidence of what was delivered. Saved scenarios, annotations, collaboration and in-browser authoring are later features if useful.

The product promise is durable access to the work and its context. Before advertising literally permanent hosted access, establish who pays for ongoing hosting, who owns the account and domain, backup/restore arrangements, retention/deletion obligations and an export/handoff path if the business or service changes. That supports the value of lasting access instead of tying it to a browser tab or one temporary hosting account.

For a first private version, retain a familiar `/clients/` entrance and use a separate protected hostname for each client workspace. Reviewed artifact JavaScript then runs on that client's origin rather than sharing the public site's browser storage and context. The proposed Cloudflare design uses Access for sign-in, a reusable Worker gateway that validates authorization, and private R2 storage. The gateway must protect HTML and every supporting file, including old versions. Public builds, unprotected preview addresses and public storage URLs must not expose private content. Validate first with two fake clients: anonymous access fails, client A cannot read B's files, Mitch can access both, revoked access fails, and backup restoration works. [Architecture and security details](architecture-plan.md)

### Future work and operating-cost estimates

| Item | Planning allowance | Scope and assumptions |
|---|---:|---|
| Optional public Cloudflare cutover | 2–4 focused operator hours, plus external waiting | Static build already complete; account/domain access available; record migration, review and rollback included; unusual DNS configurations add time |
| Private library prototype and first-client pilot | 16–32 focused human-equivalent hours | Two synthetic clients, then one approved real client; sign-in, dated index, versioned HTML/assets, isolation tests, backup/restore and repeatable onboarding; excludes editing, shared saved scenarios and arbitrary uploads |
| Public hosting | No required new recurring service for the first release | Existing GitHub Pages; existing domain renewal and model usage continue separately |
| Small future Cloudflare private library | Approximately $5/month infrastructure in the example below | Paid Workers foundation, usage within included request/CPU allowances, Access/R2 within free allowances; excludes implementation, domain and paid external APIs |

The private-cost example assumes 15 clients with two users each plus Mitch (31 people), about 5 GB of Standard storage, and modest file traffic. Workers Paid starts at $5/month; R2 Standard includes 10 GB-month and operation allowances. These are account-level allowances shared with other work. [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) · [R2 pricing](https://developers.cloudflare.com/r2/pricing/)

Authentication can become the major cost as the audience grows. Cloudflare currently advertises free Access for teams under 50 users and $7 per user/month, paid annually, on its paid offer. For example, 61 billable users would imply $427/month equivalent for Access alone if all seats are billed at that rate. Count people across the account, not client organizations, and verify the actual offer before committing. This is a future scale consideration, not a cost of the initial HTML site. No plan was purchased. [Access pricing](https://www.cloudflare.com/sase/products/access/)

Model/token costs cannot be responsibly converted to a fixed dollar quote without the selected model, billing arrangement and measured pilot usage. Use the existing tools and artifacts, avoid purchased themes or new paid APIs, and re-estimate from the three-page pilot before expanding work. Infrastructure rates were checked September 11, 2026 and remain subject to the chosen account's terms and usage.

## Questions you should be asking

- **Can I inspect a page's content and SEO in its source without running JavaScript?** This is the defining acceptance test, beyond merely changing framework or host.
- **Does the public inventory reflect all my actual active projects?** Resolve the missing identities with a prefilled register, and distinguish current engagements from historical case stories.
- **What action should a qualified visitor take, and can we measure its outcome?** A mailto click or PDF download is not a confirmed inquiry. Start with honest intent measurement; add a verified submission workflow when warranted.
- **Who owns the release and rollback?** One deploy owner, GitHub source first, a specific reviewed version and a recorded fallback prevent parallel agents from publishing unrelated changes.
- **What makes long-term client access sustainable?** Retention, exports, account ownership and access removal belong in the later client product; they need not slow the public HTML release.

## The first implementation assignment

Build the project/URL register—including the UBI calculator—and a three-page Astro proof: homepage, case-study detail and writing detail. Reuse current content and styling, include one functioning interactive island, and demonstrate the pages in an HTML-only crawl. Record actual effort and usage, settle the shared template contract, then scale to the remaining routes. No DNS move is needed for this assignment. Locating and migrating an existing UBI artifact fits the inventory work; creating a new population model from scratch would be separately estimated.

Implementation, public publication and Cloudflare changes have not been performed by this planning task. The next action after roadmap review is to start that bounded pilot; production promotion remains a concrete final approval step.

## Supporting research and continuity

- [Content, design, inventory and template workstream](content-plan.md)
- [Astro, Cloudflare and future private-library architecture](architecture-plan.md)
- [SEO, deployment, measurement and rollback workstream](release-plan.md)
- [Current live-site audit](live-audit.md), with its original pre-hotfix timestamp preserved

The consolidated roadmap above controls the recommended sequence and full-scope estimate. The technical appendix estimates a narrower conversion of existing reviewed material in agent work-hours; the content appendix estimates a broader editorial/template effort in human-equivalent hours. They are different scopes/units, not interchangeable totals. The architecture appendix describes Cloudflare as the destination when chosen; the lead recommendation is to retain the current host for the initial public release.

This plan incorporates the later voice clarifications on public HTML first, the future deliverable timeline, UBI/data science, independent projects and inbound positioning. It is stored with the existing GitHub-backed portfolio project. Source and deployment revisions for the crawl-only hotfix are recorded separately in `docs/CRAWL_ACCESS_2026-09-11.md` on main. That fix remains the only production change from this crawl/migration discussion.
