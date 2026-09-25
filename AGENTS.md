# Portfolio operating contract

## Start here

Read `PROJECT.md`, then `handoffs/parity-design-2026-09-11.md`, then the applicable linked project records before substantive work. Use the newest explicit user instruction if it changes this record, and update the record. Do not re-discover documented facts or infer completed work from a plan.

## Source of truth and workspace

- Canonical GitHub repository: `https://github.com/CKAWEBUILDER/mitchjmiller.com.git`.
- Single canonical checkout: `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`, on `main` (`python3 ~/Documents/ai-os/scripts/where.py mitchjmiller.com` resolves here). Do not create a second clone or a long-lived worktree; a temporary clone under `/private/tmp/claude-501/` for a build or release is removed when that task ends.
- The second checkout `/Users/mitchellmiler/Documents/mitchjmiller.com` holds nothing that is not on `origin`: its `main` is an ancestor of `origin/main`, and its one local-only `gh-pages` build commit is tag `archive/checkout-b-gh-pages-2026-09-18`. It stays in place because Mitch, 2026-09-25: "we can keep mitchjmiller.com as my personal work history portfolio" (separate from M²; see [handoffs/checkout-reconciliation-2026-09-25.md](handoffs/checkout-reconciliation-2026-09-25.md)). Whether that portfolio gets its own repository is his open decision. Do not work on this repository there. Record: [handoffs/2026-09-25-one-checkout-reconciliation.md](handoffs/2026-09-25-one-checkout-reconciliation.md).
- The September review checkout under `/private/tmp/mitchjmiller-overhaul-20260910` is a historical preview/reference, not the durable handoff location.
- Verify the current branch, working tree and remote before edits or pushes. `main` is the only long-lived branch, and production (`https://mj2.pro/`, GitHub Pages `gh-pages`) is built only from `main`. Do each task on a short-lived branch (`claude/<task>` or `codex/<task>`) from `origin/main`, fast-forward `main` to it (never force, never rewrite `main`) and leave the pushed branch as history. `claude/agency-redesign` is archived (tag `archive/agency-redesign-2026-09-25`) and its unique work was ported to `main` on 2026-09-25; do not commit to it.
- GitHub source comes before host deployment. Push accepted source before publishing any host. One agent owns production release; do not run competing deployment workflows.

## Product contract

- Public target: Astro-generated complete HTML with native navigation, full article/case bodies and build-time SEO. JavaScript may enhance individual tools, filters and menus. A whole-site client-only React wrapper or copied metadata shell is not an HTML migration.
- Keep existing public routes and PDF paths unless an explicit keep/redirect/retire decision is documented. Maintain a route/content manifest and exclude drafts/private files.
- Position the site across data science, design, engineering, enterprise work, search/growth, independent products and hiring. Distinguish active projects from historical cases and concepts from released products.
- Retain production content/PDF bytes in the parity track. Reuse researched narratives, current review PDFs, evidence and working tools in the separate design/review track. Do not silently replace production assets with review assets.
- Cloudflare and the authenticated client-deliverable timeline are future phases, separate from the first public HTML release. New population-simulation functionality is also a separate product workstream.

## Permission and release boundaries

- Existing public portfolio content is approved for promotion; recent SFC work was explicitly requested. New private client material requires the permission Mitch said he will obtain.
- Mitch has authorized collaborative design, theme review and the Astro staging build. Implementation is underway; consult PROJECT.md and the staging task record. Production publication still requires the concrete release review.
- The React redesign has not been approved for production as the answer to the HTML request. Do not publish it. Production promotion, DNS/host changes, subscriptions and confidential artifact uploads require the applicable explicit authorization.
- Preserve the live robots-only hotfix on main. Integrate it into the migration instead of overwriting main with the older feature branch.
- Private data, credentials, client inventories and internal screenshots do not belong in public source, static output, source maps or public CI logs. Keep secrets in approved host/account secret storage.

## Evidence and quality

- Preserve precise roles, dates, metric definitions and source periods across pages and PDFs. Follow `docs/overhaul-2026-09-10/content-evidence.md` and the resume records. No invented causal claims, titles, adoption or model results.
- Destination-qualified searches demonstrate interest in that destination; do not discard that signal because volumes are nationwide. Do not invent percentages or exact local volumes.
- Validate raw HTML and an HTML-only crawl, direct HTTP status, sitemap, canonical/indexing signals, working PDFs/assets and representative responsive/accessibility behavior. Test interactive controls separately. Noindex is not access control.
- Match tests to changed behavior; do not repeatedly rebuild or retest unaffected work.

## Coordination and continuity

- Use only as many agents as useful and authorized; give disjoint ownership. At most a lead plus three contributors were proposed. One browser driver and one deploy owner prevent conflicting actions.
- Save time and usage: read the records, use the cheapest sufficient tools, consolidate missing-information questions, and keep updates short and concrete.
- At each milestone, update PROJECT.md and the applicable handoff/task record with completed work, evidence, exact next action, unresolved blockers and outstanding approval. Commit and push documentation with accepted changes.
- Close only task-created resources no longer needed. Preserve user tabs and active review previews. Never discard unsaved work.

## Site standards — September 24 standing instruction

Every page and post follows [docs/site-standards.md](docs/site-standards.md): per-page share cards (`og:image` 1200×630 plus a `summary_large_image` Twitter card, never Mitch's photo), a hero per post that doubles as its share card, light and dark themes, English plus a Spanish pilot with hreflang and a language picker (suggest, never redirect), a WCAG 2.2 AA baseline and narrated audio for every post. Production builds from `main`; the first implementation is briefed in [handoffs/2026-09-24-site-standards-build.md](handoffs/2026-09-24-site-standards-build.md).

## One record set — September 14 standing instruction

Keep exactly one AGENTS.md and one PROJECT.md, both at this checkout root. Do not create worktrees, subfolder copies or parallel record sets. Focused guidance belongs in ordinary documents linked here or from PROJECT.md. The content studio's existing playbook is preserved in [content-studio/OPERATING.md](content-studio/OPERATING.md); it is subordinate to this root contract and the user's current authorization.

The September 14 design vision and implementation decisions are summarized in [refinement record](docs/redesign-2026-09-14/refinement.md). The original user message is preserved privately in Career Coach; do not publish that raw conversation.
