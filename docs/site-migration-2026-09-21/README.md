# mj2.pro migration — 2026-09-21

## Scope and approval

Mitchell approved the public-site redesign and domain cutover on September 21, 2026.
The new canonical public domain is `https://mj2.pro/`. The existing `mitchjmiller.com`
domain remains a redirect source. The public site keeps the Mitchell Miller name; the
new business identity is **M²** (M squared).

The staging portal uses synthetic/demo content until real client materials exist. Client
workspaces remain private. Shared roadmaps are client-readable; shared and internal
roadmaps are editable only by Mitchell.

## Approved information architecture

```text
mj2.pro/
├── services/                         Understand · Design · Build · Grow
├── work/                             work hub
│   ├── case-studies/[slug]/          proof-led case studies
│   ├── selected-builds/
│   ├── systems/
│   └── aeo-geo/
├── products/
├── lab/
│   ├── population-workbench/
│   └── population-workbench/methodology/
├── blog/[slug]/                      Signals & Systems
├── blog/studying/[slug]/
├── about/
├── resume/
├── contact/
├── clients/                          public portal entrance
└── 404/

clients.mj2.pro/
├── sign-in
└── c/[client-slug]/
    ├── overview
    ├── roadmap/shared
    ├── roadmap/internal             owner-only
    ├── deliverables
    └── activity
```

## Template contract

| Area | Template | State |
|---|---|---|
| Home | Agency home: problem → outcome → proof → CTA | approved/current agency shell |
| Services | Understand → Design → Build → Grow lifecycle | approved/current agency shell |
| Work | Case-study index and proof cards | approved/current shell |
| Case study | Problem → intervention → artifact → result → evidence | existing content retained |
| Products | Product/tool collection with explicit status | approved/current shell |
| Lab | Interactive tool hub and workbench application | existing public tools retained |
| Writing | Editorial index, article and study-note templates | existing content retained |
| About / Resume / Contact | Principal, resume selector and inquiry templates | existing templates retained |
| Client entrance | Public explanation and portal link | portal domain cutover pending |
| Client workspace | Authenticated overview, deliverables and activity | portal v1 exists |
| Shared roadmap | Read-only client view | planned template |
| Internal roadmap | Mitchell-only editor | planned template |

## Redirect plan

- `mitchjmiller.com/*` → `https://mj2.pro/*`, preserving path and query.
- `www.mitchjmiller.com/*` → `https://mj2.pro/*`, preserving path and query.
- `http://mj2.pro/*` → `https://mj2.pro/*`.
- `/selected-builds/` → `/work/`.
- `/systems/` → `/services/`.
- `/aeo-geo/` → `/services/`.
- `/collab-ideas/` → `/contact/`.
- `/design/`, `/review/`, `/proof/`, `/themes/` remain staging-only and are excluded from release output.
- `mitchjmiller-clients.pages.dev/*` → `https://clients.mj2.pro/*` after the custom hostname is active.

Case-study and blog URLs remain stable where possible to minimize migration work.

## Analytics and search continuity

- Keep GA4 measurement ID `G-HCKYWCZQ8E` for historical continuity.
- Release pages use the existing GA4 ID; staging remains noindex and analytics-free.
- The private client portal and gated artifacts do not load GA4.
- Add/verify the `mj2.pro` Search Console property and submit `https://mj2.pro/sitemap.xml` after DNS is live.
- Keep the old Search Console property available to monitor the redirect transition.

Tradeoff recorded: a new GA4 property would provide a clean baseline, but would split historical
reporting, reset audiences and require event/report reconstruction. Keeping the existing property
preserves continuity; host filtering and a clean staging/private boundary are the safeguards.

## Design references

The direction combines Contiem's lifecycle/proof framing, Cherryleaf's problem → outcome → proof
sequence, Scriptorium's numbered principles, MadCap's workflow evidence, and a compressed
capability × industry model. Use deep navy for authority, green sparingly for action and state,
warm white/pale gray for breathing room, editorial typography, and restrained motion.

## Progress ledger

- [x] Canonical checkout verified with `where.py --here`.
- [x] Existing agency redesign and uncommitted user work preserved.
- [x] Approved tree/template map recorded.
- [x] Canonical URL, CNAME, sitemap, robots, portal link and contact-origin source updates started.
- [x] Run typecheck, release build, parity, agency, crawl and browser QA. Exact release results: typecheck/build PASS; parity 57/57; agency 59/59; crawl 844/844; browser 233/233.
- [x] Commit and push accepted source changes to GitHub. Source is on `main` at `bb32728`; the approved redesign branch is on `claude/agency-redesign` at `1e6ed24`.
- [x] Publish the new release artifact to `gh-pages` at `0b9073d` with `CNAME` set to `mj2.pro`.
- [ ] **Activate DNS and configure old-domain forwarding — blocked on Mitch, site is dark on both domains.** Checked Sep 22, 2026: the Porkbun DNS editor for `mj2.pro` holds **zero custom records**, so the 207.207.210.229/.107 answers are Porkbun default parking and `https://mj2.pro/` fails to connect. `mitchjmiller.com` still resolves to the GitHub Pages IPs but returns 404, because Pages now serves `mj2.pro` per the published `CNAME`. Agent DNS writes are refused by permission policy, so Mitch applies these at https://porkbun.com/account/dns/mj2.pro :

  | Type | Host | Answer | TTL |
  |---|---|---|---|
  | A | *(blank)* | 185.199.108.153 | 600 |
  | A | *(blank)* | 185.199.109.153 | 600 |
  | A | *(blank)* | 185.199.110.153 | 600 |
  | A | *(blank)* | 185.199.111.153 | 600 |
  | CNAME | `www` | `ckawebuilder.github.io` | 600 |

  Then set registrar URL forwarding for `mitchjmiller.com` → `https://mj2.pro` (path-preserving, 301). After propagation, confirm HTTPS in the repository's Pages settings (`Enforce HTTPS`) once the certificate is issued. Rollback: delete the added records — parking returns and nothing else is touched.
- [ ] Activate `clients.mj2.pro` and verify the demo workspace.
- [x] Contact origin verified September 22, 2026. The deployed Worker was stale — last deployed September 11, before the mj2.pro decision — so it rejected `https://mj2.pro` at CORS preflight and the contact form would have failed on every submission after cutover. Redeployed from the committed source at version `cdf6a033-8e6e-4006-93c6-28580f08e9e2` (previous version `8a08874e-9be0-4b1c-9139-007502857a3d` is the rollback). Probed after deploy: `mj2.pro`, `www.mj2.pro`, `mitchjmiller.com`, `www.mitchjmiller.com` and `mitchjmiller-com.pages.dev` are allowed; an unknown origin gets no `Access-Control-Allow-Origin`. A real end-to-end submission still has to wait for DNS.
- [ ] Verify GSC sitemap and GA4 realtime. Both need the site reachable, so they are blocked behind DNS.
- [ ] Update personal LinkedIn and create the M² business page.
- [ ] Invite Rio as Talent Acquisition Manager after exact profile resolution.

## Questions you should be asking

- Does the M² page represent the business legally, or is it a public brand page only?
- Should Rio be invited only after he accepts the role and provides the exact profile URL?
- Which roadmap fields are client-visible versus owner-only before the first real client is onboarded?
- What is the rollback owner if DNS propagation or contact-form origin checks lag during cutover?
