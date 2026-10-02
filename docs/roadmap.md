# M² roadmap

**As of 2026-10-01** · **Owner:** Mitch · The canonical roadmap for M² and https://mj2.pro (source: this repository).
**To update:** each session edits this file at its end: move items between Now / Next / Later, refresh status and blockers, add record links, bump the date above and add itself to Sources.
**Scope:** [PROJECT.md](../PROJECT.md) stays the release log and `handoffs/` hold session detail; link them, do not copy them here. This repository is public: no client names, credentials, personal data or job-search specifics.

## Objectives
1. **Career:** become a forward-deployed / multi-agent engineer (the job search continues). M² and this site are the proof of work.
2. **Offer:** define 2–4 services. Small, non-technical businesses first: an audit, then a handoff with clear instructions or an agent team that implements for a monthly fee, growing into larger clients.
3. **Content:** a large data-viz blog (interactives, fintech, glossaries) that earns inbound, plus a freemium collab lab (simulated populations, prediction models, data science, design/dev, audits, strategy consults with handoffs).
4. **Outreach:** use the SFC case for new or underperforming Waikīkī businesses.
5. **Not M² scope (own projects):** LabelSafe (label scanner), DateNite, a happy-hour finder.

Source for 1–5: Mitch, 2026-09-25, in the [reconciliation handoff](../handoffs/2026-09-25-one-checkout-reconciliation.md) (on PR #1 until it merges).

## Live now
- **Production:** https://mj2.pro/ on GitHub Pages. Records: [PROJECT.md](../PROJECT.md), [release-2026-10-01-m2](release-2026-10-01-m2/README.md).
  - **Version:** `gh-pages` `664c757` (2026-10-01 19:34 UTC, Pages build succeeded), built from `main` `956a65b`; `main` has since moved only by docs commits.
  - **Content:** 74 sitemap URLs, including 10 posts (6 with living infographics), 25 study notes, the case studies, the Spanish pilot (5 pages), `/services/`, `/lab/` with the population workbench, `/products/` and a contact form. 7 `/viz/` embeds and 4 Coming Soon pages are noindex.
  - **Hosting plan** (2026-10-01 brief): static on GitHub Pages, anything dynamic on Cloudflare, no new host.
  - **Not re-probed live:** cloud egress to mj2.pro is blocked, so everything here comes from records and the GitHub API.
- **Shipped 2026-10-01** (per the release record, not probed live): the M² mark replaced the headshot (header, About cards, favicons); the four resume PDFs are retired and `/resume/` is a transfer page; `/clients/` opens the portal; "portfolio" links go to LinkedIn; the logo carousel is unchanged at 5 logos.
- **Portal:** https://mitchjmiller-clients.pages.dev (Cloudflare Pages, passcode-gated; `clients.mj2.pro` is not active). A 2026-10-01 session summary says a first client workspace now sits inside: not verified here, and the portal repo's own record is dated 2026-09-11.
- **Contact Worker** `mitchjmiller-api`: version `cdf6a033` per records (pre-Stripe). Leads are written to D1 only; the source has no notification to Mitch.
- **Routines:**
  - claude.ai: *The Next New Thing weekly intake* (Fri 08:47 Manila) and its 14:47 catch-up are enabled with no run yet (first fire 2026-10-02). Drafts go to a Drive folder behind three reply gates; no publish target is set.
  - claude.ai: two private client-engagement routines, out of scope here.
  - Mitch's Mac: the blog-research and LinkedIn-queue routines cannot be seen from the cloud. No run log is committed after 2026-09-18, and the cadence is recorded two ways (routine spec: Tue/Fri 06:30 PT; PROJECT.md: Mon/Wed/Fri 06:00 ET).
  - Nothing posts to LinkedIn or X without Mitch's per-post approval, and no post is recorded as published.
- **Open PRs:** [#1](https://github.com/CKAWEBUILDER/mitchjmiller.com/pull/1), records (open since 2026-09-25, branch updated 2026-10-01 with a merge of `main` and the SEO crawl). Until it merges, `main` lacks Mitch's Sept 25 direction, the narration finding and the start-here pointers. #2 (M² mark) is closed; its work shipped.
- **Gated, not done:**
  - **Stripe:** code on `main` (`114ceec`), not deployed. Needs a restricted key and webhook secret as Worker secrets, `STRIPE_PRICES`, the D1 migration, a webhook endpoint and a tax decision ([runbook](stripe/README.md)). A push to `main` touching `cloudflare/api-worker/**` runs the Worker deploy workflow once repo secrets exist (0 on 2026-09-25, not re-checked).
  - **Narration:** 11 audio files (10 English, 1 Spanish) use macOS system voices; per the 2026-09-25 finding, Apple's license bars publishing recordings of them. Replace with Kokoro-82M or drop ([finding](../handoffs/2026-09-24-site-standards-build.md)).
  - **mitchjmiller.com:** as of 2026-09-25, `http://` 301s to mj2.pro and `https://` times out (the registrar forwarding has no TLS).
  - **Search Console / GA4:** property, sitemap submission and realtime check are not recorded as done since the 2026-09-23 cutover; GA4 has no custom events.
  - **Carousel artwork:** 30 staged clients have no official logo (brand sites are blocked from cloud sessions); 4 ambiguous names plus Baylor are on hold.
  - **Semrush:** UI only (API units were out on 2026-09-12 and 09-14 per OPERATING.md; not re-tested). Seed lists are ready: the [100-keyword list](../content-studio/research/2026-09-25/keyword-msv/README.md) and the 97-keyword [agency list](../content-studio/research/2026-10-01/agency-keywords/README.md) (committed `5a9cfd5`); msv and kd are "pending" on every row.
  - **Live probes and IndexNow** for the 2026-10-01 release (74 URLs).

## Now (this week)
| Outcome | Owner | Status | Blocker | Record |
|---|---|---|---|---|
| **Name the offer:** 2–4 services with prices and a delivery model (audit, then handoff or monthly agent team) | Mitch decides, Claude drafts | Not decided. The 2026-10-01 research favors an AI-visibility plus local audit (fixed fee, written handoff), then monthly SEO and AI-visibility management as an upsell, then a strategy session; its prices are unverified | Mitch's choice and prices | [handoff](../handoffs/2026-09-25-one-checkout-reconciliation.md), [keyword research](../content-studio/research/2026-10-01/agency-keywords/README.md) |
| **Close the 2026-10-01 release:** live probes and IndexNow for 74 URLs | Mitch or a local session | Pending since 19:34 UTC | Cloud egress blocks mj2.pro and IndexNow; open question: who checks live after each release | [PROJECT.md](../PROJECT.md), [RELEASE-READY](../RELEASE-READY.md) steps 6–7 |
| **Merge PR #1** (records, SEO crawl, this roadmap) so `main` carries the Sept 25 direction | Claude | Open since 2026-09-25 | None known; confirm `main` has not moved | [PR #1](https://github.com/CKAWEBUILDER/mitchjmiller.com/pull/1) |
| **Fix the crawl findings:** 144 no-slash internal links, 40 long titles, 33 long descriptions, 14 pages without schema, study-note suffix still naming Mitchell Miller, orphaned `/resume/` | Claude | Crawl done 2026-10-01, no fixes yet | SFC report's head title needs the parity rule relaxed (Mitch) | [crawl](seo/crawl-2026-10-01/README.md) |
| **Decide narration:** Kokoro-82M or drop, then one release that removes the Apple-voice files | Mitch decides, Claude builds (render on the Mac) | Finding recorded 2026-09-25 | The decision. Until then a new post needs the Mac for its macOS `say` narration | [brief](../handoffs/2026-09-24-site-standards-build.md) |
| **Verify Search Console and GA4** for mj2.pro; submit the 74-URL sitemap | Mitch | Not recorded done since 2026-09-23 | Account access | [migration ledger](site-migration-2026-09-21/README.md) |
| **mitchjmiller.com:** go or no-go on the staged personal-portfolio cutover | Mitch | Built by a 2026-10-01 session; DNS swap ready, mail records preserved, waiting for "go" | The swap replaces the forwarding that 301s old paths to mj2.pro, so old deep links need a plan | [split record](../handoffs/2026-09-25-personal-site-split.md) |
| **Run the Semrush UI pull:** paste the 97-keyword agency list (US database), export, save beside it; the 100-keyword list too | Mitch | Lists ready; msv and kd pending | His Semrush UI session (no API units) | [README](../content-studio/research/2026-10-01/agency-keywords/README.md) |

## Next (2–4 weeks)
| Outcome | Owner | Status | Blocker | Record |
|---|---|---|---|---|
| **Rebuild `/services/` and add the new pages** from the research page map (`/services/ai-visibility-audit/`, `/hawaii/`, more): one proof per service, a "start with an audit" path; each new page needs a manifest route, share card and sitemap entry | Claude | Waiting | The offer decision | [page map](../content-studio/research/2026-10-01/agency-keywords/README.md), [services page](../site/pages/services/index.astro) |
| **Run Mitch's site-audit brief** (service depth and proof, IA, about 60% visuals, internal links) against the new services | Mitch, Claude | Brief drafted in his notes; no result found | Offer decision first; the 2026-10-01 crawl is now the input | Mitch's project notes (Drive), [crawl](seo/crawl-2026-10-01/README.md) |
| **Stripe go-live** (sandbox first), then a checkout form or `/pay/` | Mitch (login, keys, tax advisor), Claude | Code ready, not deployed | The offer; Mitch's keys | [runbook](stripe/README.md) |
| **Leads that reach Mitch:** Worker notification on new contacts, plus GA4 events (form submit, CTA click, narration play) | Claude | Not started | Pick a channel and secret; same Worker as Stripe, so sequence the deploys | [Worker source](../cloudflare/api-worker/src/index.js) |
| **Portal ready for a real client:** activate `clients.mj2.pro` (DNS), login rate limit, Cloudflare Access, retention and backup, shared and internal roadmap templates | Mitch (DNS, client permission), Claude | Live on pages.dev | Mitch's DNS access; the first client's permission | [migration ledger](site-migration-2026-09-21/README.md), `mitchjmiller-clients` repo |
| **Carousel artwork:** official logos from each brand's own site, a follow-up release, a services-specific logo set | Claude (Full network or local), Mitch for names | 30 staged, none fetched | Network access; the 4 ambiguous names plus Baylor | [carousel handoff](../handoffs/2026-09-25-m2-brand-carousel.md) |
| **Blog cadence:** next is `rank-new-site-saturated-market` (gate PASS, hero image not built, not approved); fix the live "ads follow-up coming" line (needs re-narration); a "recommended by ChatGPT" post is on the page map | Routines draft, Claude builds, Mitch approves each | Draft ready | Approval; narration (see Now); the draft's AI Overview claim conflicts with a Search Engine Journal headline and needs a re-check | [OPERATING](../content-studio/OPERATING.md), [draft](../content-studio/drafts/2026-09-24-rank-new-site-saturated-market.blog.md) |
| **Outreach pilot:** the SFC case for Waikīkī businesses, by hand first (idea: an "AI versus reality" spot check extending the 54-vendor audit method); decide later whether to build Local Growth Ops | Mitch, Claude | Idea only; the v0 pipeline plan (Drive, 2026-09-27) is unbuilt | The offer; a sending domain and mailbox (the plan says never cold-send from the mj2.pro root) | [direction](../handoffs/2026-09-25-one-checkout-reconciliation.md) |
| **Spanish pilot review:** native-speaker check, `og:locale` choice, Search Console by language at 60–90 days (2026-11-23 to 2026-12-23) | Mitch | Live since 2026-09-24 | A native speaker; Search Console access | [PROJECT.md](../PROJECT.md), [standards](site-standards.md) |

## Later
| Outcome | Owner | Status | Blocker | Record |
|---|---|---|---|---|
| **Freemium collab lab:** Mitch's 2026-10-01 idea is a teaser on mj2.pro with the tools on `lab.mj2.pro` (not decided) | Mitch decides; Codex or Claude builds (ai-os BACKLOG #31 says Codex) | Population workbench live at `/lab/population-workbench/` | Placement and the free-versus-gated split; new simulation work is its own workstream | [AGENTS.md](../AGENTS.md), [workbench](lab/population-workbench.md) |
| **Proof content:** a migration case study and whitepaper (70+ domains to one CMS, location pages) | Mitch confirms figures, Claude drafts | Not started | Figures need his confirmation; client-permission rules apply | [PIPELINE](../content-studio/PIPELINE-2026-09.md) corrections |
| **Forward-deployed proof of work:** a "Meet the team" page for the AI personas and a forward-deployed-engineer guide | Claude | Backlog (ai-os #20, todo 2026-09-18) | None; needs a slot after the offer work | [site standards](site-standards.md) |
| **Open skills and a `/skills` page** (an estate-storage-audit skill, a `mj2-pro` GitHub org) | Mitch decides | Built in a 2026-09-30 Mac session, not in this repo; status unverified | Create the org; a ship call | Session summary only |
| **More languages** (German needs an Impressum; Japanese, Korean, Chinese) | Mitch | Waiting on Spanish evidence | 60–90 day data | [site standards](site-standards.md) |
| **Separate products** (LabelSafe, DateNite, happy-hour finder): own repos; M² links to one only when it is live | Mitch | DateNite active in the ai-os registry; happy-hour finder a candidate; LabelSafe has no row (a 2026-10-01 brief calls it "Label Scanner", rename flagged) | Mitch's priorities; which unfinished work M² should show | [direction](../handoffs/2026-09-25-one-checkout-reconciliation.md) |
| **Housekeeping:** brand name and slogan ("Measured Momentum" was the only candidate with no conflicts found; parked), mj2.pro renewal (paid to 2027-09-21), lockfile (`npm ci` needs npm 11), Linux card fonts | Mitch, Claude | Parked | None urgent | [handoff](../handoffs/2026-09-25-one-checkout-reconciliation.md) |

## Decisions waiting on Mitch (ranked by what each unblocks)
1. **Name the offer** (2–4 services, prices, delivery model; the 2026-10-01 research favors an audit-first line, then a monthly line, then a strategy session). Unblocks the services rebuild, the Stripe catalog, the outreach pilot, post CTAs and the site audit.
2. **Narration: Kokoro or drop.** Unblocks removal of license-conflicting audio and releasing new posts without the Mac.
3. **mitchjmiller.com: redirect to mj2.pro (fix HTTPS) or serve the personal portfolio (go on the staged cutover, plus a plan for old deep links).** Unblocks a waiting session, the HTTPS fix and reverting the LinkedIn-link stopgap (`3c9519d`).
4. **Who checks live and submits IndexNow after each release; whether cloud sessions get Full network.** Unblocks closing the 2026-10-01 release and logo sourcing from the cloud.
5. **Stripe inputs** (login, restricted keys, catalog, webhook, tax advisor). Unblocks checkout and invoicing; the catalog depends on 1.
6. **Collab lab placement** (`lab.mj2.pro` or `/lab/`) and what is free versus gated. Unblocks lab scoping and lead capture.
7. **Outreach:** manual pilot first, or build Local Growth Ops. Unblocks the first small-business pipeline.
8. **Carousel answers:** which St. Luke's, UCSF, Insomnia Cafe, Blue Planet Adventures and Baylor; keep Stanford. Unblocks the artwork release.
9. **Content debts:** post 2's first-person AEO line; a signed-in check of the ZipRecruiter and Glassdoor figures in post 3; approve `rank-new-site-saturated-market`; the publish target for the weekly intake routine; the SFC report head-title exception; a service-area Google Business Profile for M² (no home address); X handle for `twitter:site`.
10. **Brand name and slogan; Spanish `og:locale`.** Parked, nothing blocks on them.

## Sources inspected (2026-10-01)
- **Agent sessions and routines:** `list_sessions` (own, 100 newest, 2026-09-01 to 2026-10-01), `get_session` on 9 M²-related sessions, `list_triggers` (13 routines) and the claude.ai artifact "One Host, One Plan". Sessions last reported as waiting on Mitch:
  - *mitchjmiller.com migration*: go for the personal-site DNS swap.
  - *Artifact shipping*: Full network access for logo sourcing.
  - *Ship M² logo, client logos and resume removal*: who checks live after each release.
  - *Blog writing and social publishing skill*: slogan and mark.
  - *File audit and organization across devices*: a `mj2-pro` GitHub org and a `/skills` page.
  - *Version status and client gating setup* asked where mitchjmiller.com is hosted and who owns the redesign; both are answered in PROJECT.md.
- **Repos (read-only):**
  - This repository: `git log --since=2026-09-20 --all`, the top six PROJECT.md entries, the 9 handoffs changed since 2026-09-20, the 2026-10-01 release record, Stripe runbook, site standards, content-studio OPERATING and PIPELINE, draft approval states, the 2026-10-01 SEO crawl and agency keyword research (both committed to the records branch during this run).
  - GitHub PRs, commits and Actions runs; the `mitchjmiller-clients` PROJECT.md.
  - `ai-os` `origin/main` (fetched): newest commit 2026-09-22, so BACKLOG, PROJECTS, sprint W39 and the registry lag; later registry edits on Mitch's Mac are uncommitted per the reconciliation record.
- **Drive (read-only):** the M² project folder and its roadmap doc, searches for roadmap / M2 / M² / mj2, the 50 most recently modified files (back to 2026-09-25), Mitch's project notes (site, services and collab-lab sections only), the Local Growth Ops v0 plan, the fleet tracker sheet and the 10/1 to-do sheet.
- **Not reachable:**
  - Chrome history and open tabs, and claude.ai chat history (session summaries stand in for chats). A Drive export of Chrome history (9/24 to 10/1) exists; only the short preview the Drive reader returns was seen, and a full read was declined by this session's PII guard, so none of it informs this roadmap.
  - The Mac-local repos and routines, the live site (probes return no response), repo secrets, and the Search Console, GA4, Stripe, Cloudflare and registrar dashboards.
- **Drive mirror:** the Google Sheet "M² — Roadmap and Progress" in the M² project's `01_Roadmap` folder (https://docs.google.com/spreadsheets/d/15kz_xkYZuyKoTnFdQZ7ohdfXQri91HvR4pPG6_N8SaY/edit) is this file as of 2026-10-01 in Mitch's roadmap-sheet design (Overview, Metrics tracking, Roadmap and Decisions tabs) and also carries the open items from his own roadmap notes. The Drive connector cannot edit a Sheet's cells, so until a Google Sheets connector is added each update is a new file. The Google Doc "M² Roadmap" in the `mitchjmiller-com` Drive project folder is an earlier 2026-10-01 snapshot of this file (https://docs.google.com/document/d/1XkQ0EpzyKRuNtO6zvr0Uf7sAEMoW6dNKJlPOeYBgPsg/edit). This file stays the source of truth. The September 21 doc there, which called mitchjmiller.com the canonical site, was renamed "mitchjmiller.com Roadmap (superseded 2026-10-01, see M² Roadmap)" and left otherwise untouched.
