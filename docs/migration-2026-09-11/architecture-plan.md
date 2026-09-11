# Architecture plan: a complete static portfolio and private interactive client workspaces

Research date: September 11, 2026. Planning only. No code, accounts, DNS, hosting, authentication, subscriptions or deployments were changed. Official Astro, Cloudflare and browser-platform documentation was checked for the recommendations and current cost assumptions below.

## Recommended direction

Build the public portfolio as **Astro-generated static HTML**, keeping the current design, approved content, URLs, resumes and useful interactive tools. Put the finished HTML on **Cloudflare Workers Static Assets** when the migration is authorized. Keep the private client system as a separate phase with a separate release process.

For private work, retain **`mitchjmiller.com/clients/` as the familiar entrance**, then open each authenticated workspace on an isolated client hostname, such as `client-a.workspaces.mitchjmiller.com`. Use Cloudflare Access for identity and one small, reusable Worker gateway per client, each bound only to that client's private R2 bucket. Interactive HTML and its data remain under Mitch's control; they are not converted into PDFs or sent to Google Drive as the primary experience.

This is an engineering recommendation, not a claim that Cloudflare is already the host or that the client architecture has been approved. The verified production host remains GitHub Pages. **The client area is explicitly excluded from the initial HTML migration.** Public crawlability, inspectable SEO and inbound lead generation come first. That migration proceeds without choosing client passwords versus email codes, purchasing anything, or publishing confidential artifacts.

## Ground truth and scope

The source requirements are `/private/tmp/mitchjmiller-overhaul-20260910/docs/overhaul-2026-09-10/next-phase-requirements-2026-09-11.md` and the checkout's `docs/deployment.md`.

They establish that:

- The portfolio should support consulting/agency inbound and recruiting. Approximately fifteen active projects still need reconciliation against the seventeen existing case studies.
- The current production site uses GitHub Pages, `gh-pages` branch, and HTTPS. The redesign is a review build; older Cloudflare commands are not the current deployment workflow.
- Private client work requires actual authorization for every page and underlying file, durable storage, stable versions and access removal.
- Existing public material is approved for promotion. New private client material is not automatically approved for public use.
- This phase is a roadmap. It does not authorize a host migration, access setup or private upload.

## 1. Public architecture: complete HTML, selective interaction

Astro prerenders pages at build time by default. A plain static site does not require a server-rendering adapter; routes that later require on-demand rendering can opt into it with an adapter. This fits the portfolio: the page content is known at build time, while the lab needs browser interaction. [Astro rendering documentation](https://docs.astro.build/en/guides/on-demand-rendering/)

Use a common content model for projects, case studies, writing, resume links and navigation. Layouts produce the complete heading, article text, links, metadata, structured data and image markup in each route's HTML file. Preserve the existing slugs unless a deliberate redirect is documented. Generate a real 404 page and the sitemap from the public route inventory.

The lab can keep its tested React logic as isolated components. Astro renders framework components to HTML by default and hydrates only components marked with an appropriate `client:*` directive. Use `client:load` or `client:visible` for actual interaction. Avoid `client:only` for indexable page content, because it skips the server-rendered HTML. [Astro framework components](https://docs.astro.build/en/guides/framework-components/)

Important lab migration detail: all substantive text must remain readable without JavaScript. Either give each experiment its own real static route or render each experiment's initial output into the page and progressively enhance the tabs. Do not recreate a shell that renders only the selected tab after JavaScript runs. Preserve existing `#intent`, `#evidence`, `#growth` and `#architecture` links as compatibility aliases.

### Astro versus custom templates

| Option | Why it fits | Ownership cost | Recommendation |
|---|---|---|---|
| Astro static pages plus small islands | Existing React interactions can be reused; file routes, layouts and content structure are explicit | Build tooling and dependency updates, without a public runtime server | Preferred |
| A custom Node build that renders HTML templates | Also produces complete HTML and can be very small | Mitch owns routing, escaping, asset transforms, metadata, incremental conventions and the test harness | Viable if the final inventory is deliberately simple; do not invent a framework to avoid an established generator |
| Retain the current SPA and copy its shell per route | Lowest immediate source change | Does not meet the request for complete static page content | Reject |
| Make every page server-rendered | Can supply complete HTML | Adds runtime and caching decisions to pages whose content is static | Unnecessary for the public site |

“Static” describes the HTML delivered to the browser. It does not prohibit JavaScript charts, filters, maps or interactive artifacts.

## 2. Hosting choice: Pages versus Workers Static Assets

| Consideration | Cloudflare Pages | Workers Static Assets |
|---|---|---|
| Public Astro HTML | Good fit | Good fit |
| Public asset request cost | Free static requests | Free, unlimited static asset requests |
| Private routes | Pages Functions and carefully applied Access policies can enforce access | Small gateway Workers provide explicit authorization and storage bindings |
| Default asset behavior | Function routing can fall back to static assets | Matching assets are served before Worker code by default |
| Previews | Branch and immutable hash aliases; Access preview protection has distinct scope | Version preview URLs; enable/disable explicitly in source config |
| Operating model for public + private work | Pages plus a Worker/R2 layer is workable | One platform family for public assets, protected gateway code and R2 bindings |
| Decision | Reasonable if already established; no need to declare it obsolete | Prefer for this new Cloudflare setup, to avoid building a Pages-specific layer and migrating it later |

Cloudflare documents broadly similar static/function pricing and a broader runtime feature set on Workers. This does **not** mean that the public site needs dynamic rendering or those additional services. [Pages-to-Workers comparison](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)

A security trap with Workers Static Assets is its default **asset-first** behavior. Authentication inside the Worker does not protect a matching asset that bypasses the Worker. If confidential assets are ever served through an Assets binding, `run_worker_first` must cover every protected HTML, JS, JSON, image, download and path variant. The recommendation instead keeps confidential artifacts out of the public Assets directory entirely. [Worker/asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)

For a subfolder implementation on Pages, every confidential route must match authorization code; unmatched routes can fall back to files. `_routes.json` exclusions and any framework-generated route configuration must be audited. Do not assume that a login page protects a separate download path. [Pages Functions routing](https://developers.cloudflare.com/pages/functions/routing/)

## 3. Future phase only: a durable client deliverable library

Mitch's clarified product is a client-login library and timeline of dated interactive HTML/JavaScript deliverables. Clients return to earlier reports, explore the controls and follow the engagement's history over time. They are not editing the original deliverables by default. This is separate from, and follows, the public HTML migration.

The future library should present date, title, purpose, current version and prior versions; offer sorting/filtering and stable deep links; and retain the complete interactive packages. A newly published report is a dated addition, not an overwrite of the past. Local sliders, filters and exploratory inputs need not create a server database or change the source artifact. Shared notes, saved collaborative state or client editing would be additional product decisions.

Treat ongoing access as a service commitment with defined custody and continuity: durable URLs, retained source packages, account/domain ownership, backups, restoration and export. “Permanent” should describe the intention to preserve access rather than promise that an account or domain can operate indefinitely without an owner or funding. The operating plan should cover access after an engagement ends, who pays continuing costs, and how the client receives a usable archive if the service closes. Resolve those terms in the future client phase; they do not delay public migration.

### Suggested user journey

1. A client receives a stable link such as `mitchjmiller.com/clients/client-a/`.
2. That link leads to the client's protected workspace hostname. The public entrance contains no confidential inventory or report data.
3. Cloudflare Access authenticates the approved person.
4. The client gateway validates the signed application token and its expected application audience before serving anything.
5. A complete workspace page lists only that client's approved artifacts and versions.
6. Selecting an artifact opens its actual HTML application with its related scripts, images and data. Downloads remain optional.

The hostname is illustrative. Production names must be chosen and documented during the client phase. Cloudflare Workers Custom Domains require an active Cloudflare zone and exact hostnames; they do not accept wildcard Custom Domain records. At the proposed initial scale, provisioning one known hostname per client is straightforward and reviewable. [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

### Why a subfolder alone is insufficient

Paths do not create different browser origins. A script at `/clients/a/report.html` is on the same origin as `/clients/b/` and the public site. It can use that origin's storage and make authenticated same-origin requests available to the person viewing it. This is particularly significant for Mitch, who can access multiple clients. Separating clients by hostnames creates a browser-origin boundary. Cookie rules need separate consideration: avoid broad parent-domain application cookies or tokens. [Browser same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)

Therefore, the recommended first private version keeps arbitrary report JavaScript **off the public site's origin** and uses a different origin for each client. A single `clients.mitchjmiller.com` hostname with `/a/` and `/b/` paths would separate the public site but would still leave all client artifacts sharing an origin.

A portfolio-path viewer can later embed isolated artifacts if staying visually under `/clients/` matters. Use a separate-origin iframe with a deliberate sandbox policy and a minimal, validated `postMessage` interface. Do not combine `allow-scripts` and `allow-same-origin` for untrusted HTML hosted on the parent origin. An iframe alone also does not help if the same unsafe artifact is directly available outside the sandbox. [Iframe sandbox behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)

Embedding introduces login and browser-cookie behavior to test, so the simplest initial release should open the protected workspace as a top-level page. It still preserves the familiar entry link and Mitch's branding. Untrusted uploads, editing, comments and cross-client administrative dashboards can be later features with their own threat review.

### Concrete components

| Component | Initial design | Reason |
|---|---|---|
| Public site | Static HTML and approved public assets | Its build cannot accidentally contain private reports |
| Public `/clients/` | Generic entrance and approved individual redirect links; no client directory by default | Familiar URL without publishing confidential inventory |
| Client host | One explicit hostname per client | Browser-origin separation |
| Access application | One application/policy boundary per client hostname | Mitch plus that client's named users |
| Gateway | Reuse one source implementation; deploy a small Worker per client with one expected hostname and Access audience | A deployment cannot accidentally read another client's bucket |
| Artifact storage | One private R2 bucket per client; no public bucket domain or `r2.dev` exposure | Storage bindings provide an additional client boundary |
| Artifact inventory | Private manifest: ID, title, purpose, deliverable date, version, entry file, required assets, approval, checksum, creation/review dates | A dated timeline, stable links, ownership and durable versions |
| Authoring source | GitHub-backed code; private content source and access metadata kept separately from public build inputs | Code continuity without leaking client material |

A shared multi-tenant gateway and bucket prefixes could reduce deployment objects later. At roughly fifteen clients, the simpler authorization review of one bucket binding per client is worth the modest configuration overhead. Use one maintained gateway template, not fifteen divergent codebases. Current account limits allow 100 Workers on Free or 500 on Paid, with 100 Custom Domains per zone; account-wide existing usage must be checked first. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)

### Required enforcement

- Validate the `Cf-Access-Jwt-Assertion` token's signature, issuer, expected client application audience and validity window using Cloudflare's rotating public keys. Reject a missing token, unknown hostname, audience mismatch or invalid key lookup. Do not trust a decoded token or an email header alone. Cloudflare specifically requires JWT validation in a Worker behind Access. [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)
- Apply authorization to HTML **and all** JSON, images, JS, PDFs, archives and old versions. Serve private files from the bound bucket only after validation. Resolve object keys from the client's validated manifest; reject traversal, encoded separators, unsupported files and unknown versions.
- Use no public bucket endpoint. R2's custom-domain and `r2.dev` exposure are independent. Protecting one while leaving the other public is a documented bypass. A Worker binding avoids needing either public bucket endpoint. [R2 public bucket access](https://developers.cloudflare.com/r2/buckets/public-buckets/)
- Return private content with a deliberate `Cache-Control: private, no-store` policy initially. Do not put personalized inventories or confidential responses into a shared cache. Optimize caching only after a reviewed authorization-aware design.
- Set CSP, correct content types, `nosniff`, a restrictive referrer policy and explicit allowed connections for each artifact class. Review third-party dependencies; bundle them when practical. A chart should not unknowingly upload report data to an external service.
- Keep public GA4/marketing pixels out of private workspaces by default. Operational logs should record access outcomes and artifact identifiers without tokens or confidential payloads.
- Initial gateway is read-only. Later uploads or mutations require their own authorization, file validation, CSRF controls, quotas and audit record.

If Mitch ultimately insists that every file remain under the public hostname's `/clients/` path, implement Access plus server authorization and separate private storage, but restrict served HTML to reviewed first-party code and acknowledge the remaining shared-origin exposure. That choice should be explicit rather than hidden inside the implementation.

## 4. Sign-in and access removal

**Recommended first client sign-in: named email allowlists with Cloudflare Access email codes.** Mitch grants an email address permission; the person receives a one-time login code. It avoids building password storage, reset flows and outbound authentication mail infrastructure. Access supports an external identity provider instead or alongside it. Current new Zero Trust accounts do not automatically enable OTP; it must be configured deliberately. This is a client-phase choice, not a prerequisite for the public migration. [Access one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/)

If actual assigned usernames/passwords are required, use a maintained identity provider and connect it to Access or the gateway. Do not hand-roll password authentication in a static page or store credentials in browser code. The additional provider's cost and support responsibility must be evaluated when that requirement is confirmed.

For each client, define named users, Mitch's admin access, session length, access expiry, who can grant access and how access is removed. Do not use a broad “any authenticated email” policy or a single shared password. A per-client Access audience makes tokens from client A invalid for client B's gateway.

Offboarding must remove the allow rule **and revoke existing sessions**, then verify both a fresh sign-in and a previously authenticated browser. Existing application tokens have a lifecycle; a policy edit alone is not a dependable immediate logout plan. Provide a real logout link and a session-expiry recovery flow for interactive data requests. [Access session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/)

Seat cleanup is separate from session revocation: revoking a user's session does not remove their active seat consumption. Include seat review in the operational runbook. [Access seat management](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/)

For any alternative path-based Access configuration, specific application paths override broader paths rather than inheriting every parent policy. Test exact roots, trailing slashes and asset paths. [Access application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/)

## 5. Prevent origin and preview bypasses

| Surface | Required treatment before private content |
|---|---|
| `workers.dev` | Disable for production private gateways in checked-in configuration |
| Version preview URLs | Explicitly disable or protect separately; test the exact URL of each private version |
| Preview hostname | Use a dedicated protected staging host and separate test storage; synthetic data first |
| Private R2 bucket | No public `r2.dev`, no public bucket custom domain, no browser-exposed storage credential |
| Old artifact versions | Same access policy and gateway checks as the current version |
| Public build output | Automated allowlist and private-content checks; never copy all reports or the workspace directory into `public/` |
| Public JavaScript/source maps | No client data, private file inventories, credentials or sensitive configuration |
| Unauthorized gateway request | Fail closed; no fallback to static files or an old origin |

Set both `workers_dev: false` and `preview_urls: false` explicitly in private Worker configuration rather than relying on dashboard defaults. Cloudflare documents that a dashboard-only change can be reversed on the next Wrangler deployment. If previews are necessary, give them explicit protection and verify it. [Workers preview configuration](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)

Pages requires additional care: its “Enable access policy” preview setting protects preview deployment URLs, **not** the production `project.pages.dev` or the custom domain. Immutable prior preview hashes can remain reachable even after a branch alias moves. If Pages is selected, cover all production and preview hostnames explicitly and test old deployment URLs. [Pages preview protection](https://developers.cloudflare.com/pages/configuration/preview-deployments/)

## 6. Step-by-step delivery order

| Step | Work | Reviewable output / exit criterion |
|---|---|---|
| 1. Freeze the reference | Record source/deploy commits, current routes, asset inventory, analytics settings and rollback state. Reconcile the active-project list separately. | A route/content matrix and exact known-good production release |
| 2. Establish static templates | Build Astro layouts and content models in the isolated branch. Convert a representative homepage, case study, writing page and lab experiment. | Raw HTML contains their complete content; browser works with JavaScript disabled |
| 3. Complete public migration | Convert remaining templates, preserve links/resumes, build responsive images and progressively enhance interactions. | Every approved route produces its own valid HTML, canonical metadata and linked assets |
| 4. Validate locally | Compare route inventory, heading/body text, forms, deep links, image/PDF URLs, 404 status, redirects, sitemap and analytics host gating. | A no-JS and JS functional QA record, plus desktop/mobile review |
| 5. Select the public release path | Confirm Cloudflare account/zone ownership and actual quotas. If Cloudflare isn't ready, the exact static output can remain on GitHub Pages temporarily. | Host choice and build/release driver documented; no auth decision required |
| 6. Prepare Cloudflare preview | On authorization, deploy only public material to a protected review environment. Match redirect, caching, headers and HTML-serving behavior to the intended production setup. | A concrete review URL, source commit, output checksum and rollback target |
| 7. Public release gate | Review the finished static site and the exact DNS/hosting change. Preserve the existing GitHub release for rollback. | Approval addresses a tested artifact and a specific change, not an abstract migration |
| 8. Move the public host | Migrate DNS/host only after checking all records, HTTPS and canonical host handling. Preserve mail MX/TXT/SPF/DKIM/DMARC and other subdomains. | Public URLs return complete HTML; mail and non-site records unchanged; rollback verified |
| 9. Observe the public release | Check crawl/indexability, sitemap, redirects, 404s, resumes, site functions and clean analytics. Record what changed and when. | Public migration is complete independently of client access |
| 10. Future project: prototype private library | After the public migration is finished, use two fake clients, separate origins, Access audiences, gateways and private buckets. Implement login, a dated artifact timeline, filtering, streaming assets, logout and version inventory. | An unauthenticated user gets no content; client A cannot read B's page or assets; Mitch sees both; prior deliverables remain interactive and read-only |
| 11. Exercise bypass/offboarding tests | Probe previews/origins, stale sessions, swapped JWT audience, old versions, encoded paths and direct file requests. Test iframe behavior if chosen. | Denied responses contain no confidential bytes; no static fallback; revoked access fails |
| 12. Onboard one real client | Confirm audience/content approval, archive the complete artifact package, record checksum/version and permissions, then issue access. | The real interactive report works, access can be removed, and a restoration test passes |
| 13. Reuse the proven template | Roll out the same configuration pattern to subsequent clients; track users, storage, versions and cost. | A repeatable onboarding/offboarding checklist and a maintained inventory |

The host change should follow static conversion and local QA. Moving the existing JavaScript shell first would add a migration without solving the primary requirement. Authentication work should follow the public release rather than delay it.

## 7. Cost model and relevant limits

Estimates are USD, excluding tax, existing domain renewal, implementation labor, paid analytics/API tools and any additional identity provider. No subscription was purchased. Prices are public documentation checked September 11, 2026; account-wide usage and the final offer must be checked before purchase.

### Public site

- Astro has no hosting license fee. A Workers project serving only static assets has free, unlimited asset requests and no separate asset-storage charge. Files must fit platform limits: 25 MiB per file, 20,000 files on Free or 100,000 on Paid. Larger video/report files should not be forced into the public static bundle. [Static Assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) and [platform limits](https://developers.cloudflare.com/workers/platform/limits/)
- Workers Builds includes 3,000 build minutes/month on Free; paid plans include 6,000, then $0.005/minute. A planning assumption of 100 two-minute builds/month consumes 200 minutes. Limit automated branch builds to useful changes. [Workers build pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/)
- Pages is also a viable $0 static host within limits; its Free tier currently permits 500 builds/month, one concurrent build and 20,000 files, with a 25 MiB file limit. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

### Private foundation

Workers Paid begins at **$5/month per account**, not $5 per client Worker. It includes 10 million Worker requests and 30 million CPU milliseconds/month; additional requests are $0.30/million and additional CPU is $0.02/million milliseconds. Protected asset requests that invoke authorization code count as Worker requests. Free Workers provides 100,000 requests/day with a 10 ms CPU limit, but those hard limits should be assessed against real authentication tests. [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)

R2 Standard includes 10 GB-month storage, 1 million Class A operations and 10 million Class B operations each month. Beyond the included usage: $0.015/GB-month, $4.50/million Class A and $0.36/million Class B operations, with no egress fee. These are account-wide allowances, not new free allowances per client bucket. Use Standard initially; Infrequent Access adds minimum-duration and retrieval considerations. [R2 pricing](https://developers.cloudflare.com/r2/pricing/)

Cloudflare Access advertises Free for teams under 50 users; its listed paid offer is **$7/user/month paid annually**. This is the likely scaling cost, not HTML storage. Count actual people, including Mitch, staff and other account users—not just client organizations. Confirm the exact free seat threshold and plan terms in the account before rollout. [Access pricing](https://www.cloudflare.com/sase/products/access/)

| Scenario | Explicit assumptions | Estimated incremental infrastructure cost |
|---|---|---|
| Public portfolio only | Static assets; 200 build minutes/month; no paid APIs | About $0/month, excluding domain |
| Private pilot / 15 small client groups | 15 clients × 2 people + Mitch = 31 users; 5 GB Standard storage; 100,000 private file requests/month; 50,000 write operations; gateway total below paid CPU allotment | About $5/month with Workers Paid; Access/R2 within stated free usage |
| More archived reports | Same users/traffic, 50 GB average stored for the month | About $5.60/month: $5 Worker base + 40 excess GB × $0.015 |
| Access seats exceed the free plan | Illustrative 61 billable users at the published $7 rate | $427/month equivalent for Access alone, billed annually; about $432 before storage/other usage. This assumes all 61 seats are paid, not just seats above the free threshold; obtain the actual offer before choosing that plan |

The private-request example counts individual HTML and asset requests, not page views. One report can request many files. Add usage alerts and sensible Worker CPU limits before serving real clients. A spending alert is not automatically a hard cost ceiling. For ordinary reports, the main operating cost is maintaining access and reliable artifacts, not bandwidth.

## 8. Durable artifact operations

Preserve each artifact as a package containing its HTML entry point, scripts, CSS, fonts/images, data files, source/build reference, content-type map and manifest. Record approved audience, client, owner, creation/review dates, version, checksum and any external dependencies. Do not rely on open browser tabs or temporary files as the archive.

Use immutable version keys such as `artifacts/<artifact-id>/<version>/index.html`; keep a small reviewed “current version” pointer so a stable client link can be updated or rolled back. Retain a tested archive outside the serving bucket or account. A serving copy and revision history are not, by themselves, a complete backup plan.

Default to authorized download/export where needed, and explain the practical boundary: someone allowed to view a report can retain its contents. Revoking web access cannot retrieve copies already downloaded. Decide retention and ownership during client onboarding. For long-term continuity, provide complete HTML/data/asset packages that work independently where feasible, while identifying any live API dependency or licensed resource that requires continued access. A PDF alone does not preserve the interactive deliverable.

Source code, infrastructure configuration and runbooks remain GitHub-backed. Confidential datasets and private artifacts must never enter a public repository, a public build manifest, a public static directory or public CI output. Use separate scoped deployment credentials for public releases and client releases, with release approval attached to the correct target.

## Questions Mitch should be asking

These should be resolved when their phase starts; none should block producing the complete static public site.

1. **Is `/clients/` the familiar entrance, or must every report keep that exact browser origin?** The first preserves a simpler security boundary for custom HTML.
2. **How many actual people need access?** Fifteen clients can fit the free Access tier at two users each, but a larger audience can make authentication the dominant bill.
3. **Who may author or upload HTML?** Reviewed Mitch-authored reports are a different trust model from arbitrary client uploads or third-party applications.
4. **Who owns access removal, renewal, backup and restoration?** An interactive report library needs an operating owner, not just a deploy button.
5. **Do clients need local editing, shared saved state or just read-only interaction?** Read-only tools can be served as HTML packages. Shared state adds an application/database phase.
6. **What is safe to download, retain or republish?** Public portfolio approval and private workspace access are different permissions.
7. **What happens if a host migration or auth change fails?** Public rollback and client access rollback must be separate, tested procedures.

## Immediate handoff

Root can combine this architecture assessment with the static migration inventory and content roadmap. The next authorized output is a clear step-by-step implementation plan. Before any eventual release, confirm the reviewed site, exact host/DNS change, cost assumptions and rollback. Client sign-in and confidential artifact onboarding remain a later, separately tested phase.
