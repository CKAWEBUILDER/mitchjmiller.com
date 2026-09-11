# Static Astro portfolio: migration and release plan

Prepared September 11, 2026. Planning only; no source, deployment, DNS, authentication, Analytics or Search Console changes were performed in this task.

## Recommendation

Replace the public React application with an Astro site that delivers complete HTML on every published URL. Reuse the approved visual work, factual case studies, current PDFs and functioning interactive tools from the redesign. Keep React only for bounded interactive islands where it saves a rewrite; the surrounding article, navigation, proof, links and initial tool explanation must already exist in HTML. Astro supports exactly this selective-hydration model. [Astro islands](https://docs.astro.build/en/concepts/islands/)

For the lowest-risk first release, keep the public domain on its existing GitHub Pages deployment and preserve its URLs. Static Astro supports that host; neither Astro nor the public portfolio requires a hosting migration. Keep the build portable so Cloudflare remains available. Private client applications are a separate release with enforceable authorization, not a hidden directory added to the static output. [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

If Mitch chooses Cloudflare for the public domain now, make that a deliberate host decision before the production cutover. Complete the static build and review first, then execute the DNS plan below. Avoid combining framework conversion, URL renaming, nameserver changes and client authentication in one release. Google likewise recommends separating major site changes. [Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

## Current state and what the numbers mean

- Root reports the crawl-only emergency fix is live: source through `2745c7e`; production `gh-pages` at `923dfd8`, with allow-all robots rules. This supersedes my audit's pre-fix robots observation. It did not deploy the redesign or remove the React site's separate noindex directives.
- The live audit captured the previous deploy `a71410b` and source `0f9e48c`; content/resume byte comparisons established that it was the actual production version.
- Current source defines **53 unique published routes**: 11 general, 17 case studies, four unique writing posts and 21 study notes. Only 29 published routes had their own HTML file; 24 content routes fell through to an HTTP 404 shell. One additional physical route was a draft. Both sitemap endpoints returned 404.
- The reviewed redesign, most recently identified by root as `b75e620`, has **54 route copies**, adding `/lab`. Its metadata/sitemap work is useful, but route copies are not proof of full server-delivered content. The Astro migration must inspect the actual body of every generated file.
- Four working live PDF URLs serve old career details. The corrected PDFs in the review branch retain those paths and passed the locked-format, two-page QA. Their replacement belongs in the approved Astro release.
- Approximately fifteen active projects still need reconciliation. They must not be relabeled as the seventeen historical/current case studies. The final route count is derived after that inventory decision, not guessed as 54 forever.

Source records: `/private/tmp/mitch-current-live-audit-20260911/FINDINGS.md`; `docs/overhaul-2026-09-10/README.md`, `next-phase-requirements-2026-09-11.md`, and `docs/deployment.md` in the portfolio repository.

## Release sequence

| Phase | Work and output | Acceptance gate |
|---|---|---|
| 0. Freeze the contract | Record current source/deploy SHAs; reconcile published URLs, approved project inventory and evidence; decide host; create a route/resume/asset manifest | Every existing public URL has a named keep/redirect/retire decision; active and historical project sets are distinct |
| 1. Build one vertical slice | Establish pinned Astro dependencies, static output, shared layout/head, a substantial enterprise case study, one rich study note and one interactive island | Direct HTML contains their complete content; JavaScript-off navigation and downloads work; interactive island enhances its baseline |
| 2. Migrate the content and experience | Port all general pages, 17 existing cases, four writing posts, 21 study notes, four PDFs and three lab experiences; add reconciled active-project material only when complete | No missing content or asset; URLs retained; no draft placeholders; enterprise work has substantial visibility alongside SFC |
| 3. Independent release QA | Crawl every manifest URL; verify HTML, statuses, canonicals, indexability, structured data, accessibility, responsive layouts, downloads, analytics and link behavior | Zero release-blocking failures; reviewer checks delivered HTML rather than trusting the builder's summary |
| 4. Review the exact candidate | Show the complete site, project inventory, unresolved factual decisions and release diff; record approved source SHA and host | Mitch approves the concrete release; no earlier content-promotion permission is mistaken for host/DNS/private-data authorization |
| 5. Publish once | One release owner deploys only the approved build; record artifact hash, source SHA, deployment ID, previous deployment and config | Production probes pass before announcing completion |
| 6. Measure and close | Submit sitemap, inspect representative URLs, verify GA4 events, document launch and monitor regressions | Deployment is complete when live behavior is verified; Google indexing remains an observed follow-up, not a promised instant outcome |

This is a plan, not a scheduled automation. Future monitoring must be explicitly scheduled if wanted.

## Architecture and content contract

Use native `.astro` layouts/pages and structured content collections or existing typed data adapted at build time. Generate dynamic content routes from the content inventory. Use ordinary `<a href>` navigation and build-time metadata, not a whole-site client router. The route manifests and sitemap must share the same published-content filter. Astro prerendered dynamic routes require an explicit set of paths. [Astro routing](https://docs.astro.build/en/guides/routing/)

A page is migrated only when a direct HTML response contains its page-specific heading, full main narrative, evidence captions, meaningful links and navigation. A title, canonical, sitemap entry, empty root element and JavaScript bundle fail this gate. Native HTML lists must expose all published cases and notes even before filter enhancement. Native resume links must work without a modal. Keep direct email/telephone links usable; if the inquiry interaction only composes email, continue saying so rather than claiming a submitted lead.

Preserve rich local HTML, sources, SVG diagrams and the readable excerpts fixed during the redesign. Build Mermaid diagrams into static SVG where practical, with adjacent textual explanations, so reading the note does not depend on Mermaid loading. Maintain attribution of third-party ideas. Keep large libraries page-specific. Lab tools may need JavaScript to calculate or respond; give them meaningful prerendered initial values, labels, explanations and an explicit noscript message. Do not put important case-study copy in `client:only` components.

Use the reviewed PDFs, original filenames and hashes from `docs/overhaul-2026-09-10/resumes/validation/qa-report.json`. Preserve PDF-only delivery, SFC first, Clarity AI ending February 2026, Stanford ending December 2025, and Apple's exact verified title. New resume edits trigger the same two-page visual/structural QA; simple byte-preserving migration does not require regenerating them.

Preserve approved quantified claims with their organization, period, denominator and evidence. SFC's September 10 map cannot explain the August 12-September 8 growth window. The roughly 80% booking contribution and broader global influence discussed in review require precise scope/source reconciliation before public wording changes. No private client files, email receipts, internal reports, unapproved screenshots or temporary review helpers enter `public/` or the build artifact.

## URL, status and SEO contract

1. **Retain the public address space.** Keep all existing case-study, writing, study-note and PDF paths. Keep `/case-studies/sfc-surf-school/`, including the content that currently exists as a standalone static file. Preserve `/selected-builds`, `/aeo-geo`, `/systems`, `/resume`, `/work`, `/blog` and `/collab-ideas`. Changing a menu label must not rename its URL.
2. **Choose one canonical path form.** Keep the apex HTTPS domain and existing directory-style trailing-slash behavior unless evidence justifies another choice. Test slash/non-slash, `.html`, `index.html`, query-string and www/HTTP variants on the chosen host. Canonicals, links and sitemap must agree.
3. **Use real response codes.** Every retained content URL returns 200 with its own content; truly missing paths return 404. Remove the old SPA wildcard rewrite. Provide a real top-level `404.html`. Cloudflare otherwise assumes SPA routing and can match unknown paths to `/`. [Cloudflare serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
4. **Avoid unnecessary redirects.** If content truly moves, make a one-to-one permanent HTTP redirect to its closest replacement. No chains and no blanket redirect of missing URLs to the homepage. Static Astro's default redirects can be HTML meta-refresh pages; declaring a 301 in Astro does not make a static server emit that status. Test the host response. Cloudflare `_redirects` can handle static responses, but those rules do not apply to Pages Functions. [Astro redirect caveat](https://docs.astro.build/en/guides/routing/), [Cloudflare redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
5. **Separate crawler access from indexing.** Preserve the newly opened production robots policy. Public production HTML must not contain noindex in raw HTML, HTTP headers or hydrated state. Do not ship noindex and expect JavaScript to remove it: Google can skip rendering when it sees that directive. Preview builds need a deliberate noindex/access-control policy, verified independently from production. Noindex is not authentication. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
6. **Generate a real sitemap.** Include only approved canonical 200 HTML content URLs. Exclude drafts, error pages, duplicate/filter URLs, private workspaces and preview hosts. Include PDF assets only if intentionally chosen as search landing pages. Use actual meaningful content update dates; do not stamp every URL with every deployment time. Configure Astro's site origin and verify the output, regardless of whether using its official sitemap integration or a small manifest-based generator. [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
7. **Make previews accurate.** Server-deliver unique titles/descriptions, one self-canonical, OG/Twitter titles and real absolute social-image URLs. Remove Replit/preview placeholders from production. Give articles and case studies appropriate visible authorship/dates and restrained structured data matching their visible content. Do not fabricate ratings, client endorsements, FAQ content or credentials for schema.
8. **Verify Search Console.** Preserve domain-verification DNS records. Read baseline Performance/Page Indexing/Sitemaps reports before release if account access is available. Submit the new sitemap and retain the submission/readback receipt; inspect homepage, enterprise case, SFC, a writing post and a study note. Same-domain/URL host conversion does not require Change of Address. Sitemap submission is a discovery hint, not proof that all pages were crawled or indexed. [Google sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

## Validation that demonstrates real HTML

Automate exhaustive checks for this small site and use manual visual checks where automation cannot judge quality:

- Clean checkout build with locked dependency/runtime versions, type/content validation and no unpublished working-tree inputs.
- Compare generated routes against the approved manifest. Require 100% retained published-route coverage and four unchanged public PDF paths.
- Read every HTML file and HTTP response with no browser rendering. Require one page-specific h1, representative content text from that page's source, substantive article/main content, native anchor links, unique metadata and no prohibited placeholders/noindex.
- Disable JavaScript in the browser. Navigate home → enterprise case → writing/study note → resume → contact. Verify full content, mobile menu access, resume downloads and direct contact options. The lab's baseline remains understandable even if controls need JavaScript.
- JavaScript-on: test filters, responsive navigation, all three lab tools, reset states, keyboard focus, reduced-motion support and form behavior. No meaningful content vanishes during hydration.
- HTTP tests: homepage, every manifest route, four PDFs, images/scripts, two known former-404 article paths, random nonexistent URL, slash/www/HTTP variants and each explicit redirect. Compare status, content type, final destination and canonical.
- Verify social-card requests and images in raw HTML; verify offline interactive-artifact downloads and local assets.
- Inspect all page templates at desktop and narrow widths; check representative rich tables/diagrams, long titles, caption readability, alt text, contrast and keyboard access. Measure performance; do not substitute a Lighthouse score for route/content correctness.
- Compare representative approved content/asset hashes and assert no account data, secrets, draft material or temporary review pages in the build.

The independent QA agent owns the failure list. The implementer resolves failures; the reviewer retests only affected behavior and final blockers, avoiding repetitive broad test runs.

## Analytics and launch reporting

Retain the existing GA4 property only after confirming its ownership and stream match. Keep production measurement off local/previews. Measure one page_view per actual page navigation; audit any SPA history tracking left over from React to avoid duplicates with ordinary Astro document navigation.

Proposed useful events: PDF download with resume variant; case-study open; lab interaction with tool/action names; direct email/telephone click. Use the built-in `file_download` event where enhanced measurement already covers PDFs, with a documented variant mapping rather than firing a duplicate download. A mailto click is contact intent, not a completed lead or booked engagement. Use `generate_lead` only if a future real submission/CRM success supports it. Never send names, email addresses or inquiry text as Analytics parameters. Google's enhanced measurement documents file-download handling; verify events in DebugView and Realtime. [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en), [DebugView](https://support.google.com/analytics/answer/7201382?hl=en)

Record a dated launch annotation in the project's release log and, if supported/available in the account, its reporting annotation mechanism. Record source SHA, deploy ID, host, changed URLs, measurement changes and baseline period. Take follow-up snapshots after 24-48 hours, seven days and 28 days when authorized; distinguish technical recovery, search visibility and actual client inquiries. No unsupported conversion attribution or promised indexing deadline.

## Deployment control and access

One source repository remains canonical: `CKAWEBUILDER/mitchjmiller.com`. Create a dedicated migration feature branch from a reconciled base, incorporating the allow-all robots fix and selected review work. Never wholesale-replace current main with an older overhaul tree. Keep the user's original dirty checkout and unpublished content-studio drafts out of the release.

Before implementation release, verify GitHub repository write access, existing Pages settings, deployment owner, source branch, account identity and rollback capability. Use one production driver. Either preserve the current deliberate `gh-pages` publication workflow or explicitly switch to a reviewed GitHub Actions deployment; do not leave both active. An Actions-based Pages deployment needs the documented Pages/id-token permissions and deployment environment. [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Build review and production modes from the same approved source commit, but recognize their artifacts differ in robots/analytics settings. Inspect the production artifact itself before publishing. Save a manifest/hash for exactly the bytes sent to the host. A branch push is not a release; do not infer publication from a successful build.

If choosing Cloudflare, verify the correct account, zone and Pages project before authorization-dependent actions. Identify whether the project uses Git integration or Direct Upload and choose one deployment pipeline tied to GitHub source. Do not invoke legacy Cloudflare scripts just because they exist. Git integration can deploy automatically on connected branch pushes; establish production branch controls and previews deliberately. Keep deploy credentials scoped and stored in the approved secret store, never in source or reports. [Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

## Cloudflare DNS, email and rollback branch

A public static Astro build can run on Cloudflare Pages. Its apex custom-domain setup requires a Cloudflare zone/nameservers; a subdomain can use a CNAME without moving all authoritative DNS. Thus a future `clients.mitchjmiller.com` deployment need not force an apex move. This is a hosting/DNS choice, separate from where code is stored. [Cloudflare custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

Before any DNS change, export the full authoritative zone and record registrar/nameserver ownership, current A/AAAA/CNAME, MX, SPF, DKIM, DMARC, TXT verification, CAA, SRV and delegated subdomain records. Do not assume domain email is irrelevant because the portfolio displays a Gmail address. Recreate and compare the complete zone; do not rely solely on auto-import. Preserve existing mail routing/authentication and keep mail-server records DNS-only where required. [Cloudflare email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)

Check DNSSEC and registrar DS records before switching nameservers. Follow the provider's documented sequence and TTL requirements; stale DS records can cause validating resolvers to fail. Re-enable DNSSEC only through the verified new-provider sequence. Keep the prior zone and its records available through the change window. [Cloudflare DNSSEC migration](https://developers.cloudflare.com/dns/dnssec/)

Validate the complete candidate on the target host before routing the public domain. Confirm custom-domain ownership, certificates, HTTPS, apex/www redirects, real 404 behavior and no inherited SPA wildcard rewrite. Inventory existing Cloudflare cache/redirect/Access rules if any. Ensure the alternate Pages hostname and previews do not become indexed duplicates. Pages preview responses may have noindex headers, but that is not a privacy boundary. [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)

Prefer a content rollback on the same host/DNS. Preserve an approved previous production artifact and prove it can be restored. Cloudflare can roll back to successful production deployments; a preview deployment is not a valid rollback target, so a first-time cutover needs an explicit fallback artifact/production deployment rather than an assumed rollback button. DNS rollback is a second line of defense and can remain mixed during TTL propagation; do not describe it as instantaneous. [Cloudflare rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)

For GitHub Pages, retain `923dfd8` and a verified copy of the current deployed artifact as the availability fallback; note that this restores the old site's remaining noindex/content defects too. The safer long-term fallback after the Astro release is its first fully verified static production artifact. Keep the old source/deploy references even after choosing Cloudflare. Remove the old public hostname binding only after verification and a deliberate retirement plan.

Stop/rollback triggers: root navigation or key content/PDF failures, broad unexpected noindex, route/canonical misrouting, SSL/DNS failure, mail disruption, unauthorized client-data access, or a mixed artifact release. A later Search Console rank fluctuation alone is not an instant rollback trigger; inspect recrawl/status/measurement evidence first.

## Independent risk review

| Risk | Why it matters here | Required control |
|---|---|---|
| Shells mistaken for static delivery | The prior redesign generated 54 route copies; it did not prove full HTML | Body-text and JavaScript-off gates for every template and every route |
| Old branches reintroduce robots block | Source, robots-only deploy and review branch diverged | Reconcile SHAs; explicit production robots/noindex assertions; one deployer |
| Active-project scope quietly expands | Fifteen active projects and seventeen cases are different sets | Inventory before page-count commitment; completed content only |
| Live SFC static report disappears | It currently lives outside the React rendering model | Preserve URL and reconcile substantive report content deliberately |
| Corrected PDFs remain only in review | Current production downloads are stale but technically healthy | Exact path/hash manifest, two-page verification and production readback |
| Astro redirect assumed to be HTTP 301 | Static generation can emit meta-refresh only | Test actual host response; preserve URLs where possible |
| Cloudflare restores SPA catch-all | Missing 404.html/legacy rewrites can hide missing routes | Real 404 artifact; unknown-path probes; inspect old rules |
| Noindex removed only after hydration | Crawlers may stop before executing that fix | Correct raw production HTML and headers at build/deploy time |
| Public/client boundaries mixed | Hidden/noindex files remain retrievable | Separate protected artifact deployment; authenticate underlying files and all alternate origins; deny cross-client access before any private upload |
| Framework, host and authentication bundled | Failures become harder to isolate and rollback | Independent release gates; public static site can launch before private portal |
| Email/DNS regression | Apex move changes the authoritative zone | Full-zone diff, MX/TXT verification, DS/TTL sequence, rollback owner |
| Inflated analytics or causal claims | Preview events, duplicate page views, mailto-as-lead distort proof | Production-only measurement, event checks, dated baseline and precise event semantics |

The private client-area release must prove that anonymous users, another client, direct file URLs, preview/origin URLs and revoked users cannot retrieve protected artifacts. A static page with a JavaScript sign-in gate fails this requirement. Cloudflare Access can protect self-hosted applications, but its actual host/path policy and underlying storage/origin behavior must be tested. This plan does not claim that an Access toggle automatically implements the complete client workspace. [Cloudflare self-hosted application protection](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)

## Effort, agents and cost boundaries

Planning estimate for migration of the existing reviewed scope: **10-18 combined agent work-hours, approximately 5-10 elapsed focused hours with parallel work**, excluding Mitch's review latency, external authentication/DNS waiting, new active-project research and private-client functionality. This is a scope estimate, not a token quotation or delivery guarantee. Re-estimate after the first static slice and reconciled project inventory.

Use at most the available four concurrent slots, with clear file ownership:

- **Root/integrator:** Astro foundation, layouts, native navigation, build modes, SEO/release manifests and all deployment decisions; roughly 3-5 hours.
- **Content migration agent:** cases, writing/study content, project/category inventory, evidence/asset parity; roughly 3-5 hours.
- **Interactive/resume agent:** port existing lab tools as islands, preserve offline artifacts, migrate/verify four PDFs and contact behavior; roughly 2-4 hours.
- **Independent QA agent:** start with route/status/content invariants, then inspect final artifact/browser behavior and validate fixes; roughly 2-4 hours. It should not own the implementation it approves.

The first three can work in parallel after shared contracts exist; the reviewer can write read-only checks early and run them as integrations land. One agent controls the browser and one controls production. Do not spawn extra agents to reread the same project records.

Keeping current hosting introduces no required new hosting service. Cloudflare expenses depend on the selected plan, build limits, auth seats, Functions requests and storage/egress architecture; verify the account's current plan and exact features before committing to a recurring cost. Do not buy a plugin, upgrade a plan, register a new domain or create an API-billed generation pipeline merely to port existing content/assets. Reuse the already-created resumes, images, components and evidence.

A public-domain Cloudflare cutover adds an estimated 1-3 operator hours plus DNS/certificate waiting after a complete zone/account inventory. Private client workspaces require their own architecture/authorization/storage estimate. Reconciling and documenting fifteen genuinely new active projects could exceed the conversion work itself; do not hide that scope inside the 54-page migration estimate.

## Questions Mitch should be asking

- Which of the approximately fifteen active projects have enough approved evidence to publish now, and which are separate from historical case studies?
- Is Cloudflare required for the public portfolio now, or only for authenticated client applications later?
- Who owns production access, DNS/email continuity, client access removal and emergency rollback when an agent is unavailable?
- What proves success: qualified client inquiries, recruiter resume downloads, search discovery, or private-client adoption—and what event actually demonstrates each?
- What is the per-client permission boundary, including raw HTML/assets, alternate hostnames, backups and revocation?

These questions identify decisions for the plan; this task has not opened approval prompts or performed dependent changes. The exact next step is to agree on the route/project inventory and public host choice, then implement and review one full static slice before parallel migration.
