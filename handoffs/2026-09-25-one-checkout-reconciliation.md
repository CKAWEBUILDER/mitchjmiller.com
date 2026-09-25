# Handoff — one checkout, one branch (2026-09-25)

**From:** Claude Code (reconciliation worker) · **To:** every agent working on mitchjmiller.com / mj2.pro
**Status:** branch `claude/reconcile-2026-09-25`, fast-forwarded into `main` (no force). Nothing deployed: production stays gh-pages `94016fa` from `main` `b838034`.

## Result

- **One working checkout:** `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`, on `main`. `python3 ~/Documents/ai-os/scripts/where.py mitchjmiller.com` resolves here.
- **One long-lived branch:** `main`. Production (https://mj2.pro/) is built only from `main`.
- **Archived or kept, all recoverable:**
  - Branch `claude/agency-redesign` → tag `archive/agency-redesign-2026-09-25` (= `4ec97df`). The branch stays on `origin` and was not deleted.
  - Checkout `~/Documents/mitchjmiller.com`: **left in place, not archived.** At 04:34 EDT, while this reconciliation was running, the content lane recorded Mitch's answer to its "retire the duplicate checkout?" question in `handoffs/checkout-reconciliation-2026-09-25.md`. His words (Career Coach session, 2026-09-25): "as far as i care we can keep mitchjmiller.com as my personal work history portfolio", separate from the M² site. So the move in the reconciliation brief was not made. The folder holds nothing unique: its `main` `f3dc1c6` is an ancestor of `origin/main`, it has 0 uncommitted or untracked files, and its ignored files are build output only (`node_modules`, `dist`, `.stage-assets`, `.npm-cache`, `.tsbuildinfo`). Its one local-only commit, the legacy Vite `gh-pages` build `7f7618e` ("Deploy: Pocock agentic workflow note", 2026-09-18, never pushed), → tag `archive/checkout-b-gh-pages-2026-09-18`. Nothing was changed in the folder.
  - If Mitch retires that folder later, move it to `~/Archive/<date>/`, the registry's consolidation rule (`~/Documents/ai-os/PROJECTS.md`, Rules). Do not use `~/Documents/_archive/`: `where.py --audit` walks `~/Documents` without skipping `_archive`, so a record set there stays flagged.

## Method

The work was built in a temporary clone of `origin/main` (`/private/tmp/claude-501/mjm-reconcile-2026-09-25`, removed afterwards). For each of the 19 agency-only commits, the content of every file was compared with `main`. The comparison used blob diffs against the agency base `1e6ed24`, whose tree equals `main`'s `bb32728` minus two study notes. Commit ids were not used.

## What moved (agency branch → `main`, `cherry-pick -x`)

| Agency | On `main` | Content |
|---|---|---|
| `1c89a2c` | `9921673` | Site-migration ledger: release and DNS handoff |
| `2b73738` | `4a97850` | Content studio: `AGENTS.md` → `OPERATING.md` (one record set per project), CLAUDE.md, PIPELINE, hook, skills, trends log, drafts, research, viz kit and directions, routines. `.design-sync` previews and the `src/ds` component mirror (`tsconfig.ds.json`, `scripts/build-ds-css.mjs`, package.json `types`/`module`). Staging-only review pages `/review/brand-options/` and `/review/homepage-mockup/` with their assets (the release build removes `/review/`). Redesign and release QA records and screenshots: about 39 MB of PNG/GIF, already in the repository's history. AGENTS.md "One record set" section: a conflict, resolved as `main`'s text plus that section. |
| `b3a2648` | `8481ce6` | Site-migration ledger: DNS blocker (its PROJECT.md hunk went into the history section) |
| `f82ee51` | `fb92c20` | Tailwind `@source not` for `src/ds`, `.design-sync`, `content-studio`, `docs` |
| `64a5a93` | `690ea66` | Site-migration ledger: contact-Worker origin fix (PROJECT.md hunk went into history) |
| `28a08fd` | `114ceec` | Stripe for the `mitchjmiller-api` Worker: `POST /checkout`, `POST /stripe/webhook`, `src/stripe.js`, D1 tables in `schema.sql`, invoice CLI, tests, `.githooks/pre-commit`, `.dev.vars.example`, `docs/stripe/`, `handoffs/2026-09-22-stripe-integration.md`. Code only, not deployed. PROJECT.md hunk went into history. |
| `122630c` | `2a54de6` | Site-migration ledger: HTTPS cutover status |
| `f74b887`, `b824faa` | records commit | Record-only. Their PROJECT.md and parity-design text was appended as dated history, and `main`'s text was kept. |

The records commit also fixed the stale pointer lines in AGENTS.md, PROJECT.md, README.md, the parity-design handoff, the site-migration record and the study-notes handoff.

Last, the canonical checkout's uncommitted and untracked work was copied in and committed: content-studio drafts, research, `viz/directions`, `viz/final`, routine runs, OPERATING.md, the PROJECT.md and parity-design paragraphs (appended) and the content lane's `handoffs/checkout-reconciliation-2026-09-25.md`. This happened immediately before the commit, so the concurrent content agents' latest files were included. The copy commit's message lists the files.

## Already on `main` (not ported)

- `1a117f2`…`1e6ed24` (9 commits) are patch-identical to `main`'s `945a3b5`…`bb32728` (`git cherry` marks them `-`). `1e6ed24` "launch M squared agency redesign" duplicates `bb32728`.
- `4ec97df` (site standards): `docs/site-standards.md` is byte-identical on `main`. `main`'s `handoffs/2026-09-24-site-standards-build.md` is a superset, with two more completion sections. The AGENTS.md pointer text is identical.

## Dropped, and why

- No file content was dropped; only superseded record wording.
  - The agency branch rewrote PROJECT.md's top section and the parity-design "Current continuation" paragraph in place. Those rewrites were not applied over `main`'s text, because `main` is authoritative for releases. The final agency text is kept verbatim in dated history sections.
  - The intermediate 2026-09-22 "site is dark on both domains" gate (`b3a2648`) survives only in the archived branch; the 2026-09-23 text supersedes it.
- The branch-pointer lines (`codex/html-parity-design-20260911` on `main`, `claude/agency-redesign` on the agency branch) were replaced with the truth.
- `7f7618e` from the second checkout was neither merged nor deployed. It was built on the pre-Astro `gh-pages` line, and its note has been live since gh-pages `7844899` (2026-09-24). It is kept as a tag.

## Verification (temporary clone, same build path for both builds)

- `npm run typecheck` PASS. `npm run build:release-candidate` PASS. Route counts are unchanged: 73 published routes and 73 sitemap URLs, parity 57/57 + 20/20, 25/25 bodies, agency PASS (73 routes, 6 embeds), standards PASS (84/84 documents, narration 9 en + 1 es). The verifiers were not modified.
- The release output was compared with a rebuild of `6ad50ce`, which reproduces the wave-2 artifact file for file except the two path-dependent lab island pages. It is byte-identical except for one dead text-transform utility rule, which no page uses and which the Tailwind scan fix no longer emits. That renames the one stylesheet (`AgencyLayout.*.css`), so all 77 shell documents differ only in that `href`. Tailwind still scans the root records and `handoffs/`; only `src/ds`, `.design-sync`, `content-studio` and `docs` are excluded. A word in a record can therefore still add a dead utility: an earlier draft of this handoff named that utility's class, and the rule came back until the wording changed.
- Worker: `node scripts/test-stripe.mjs` 12/12, `node scripts/test-limits.mjs` 9/9 (in `cloudflare/api-worker`).

## Outcome after the push (2026-09-25, 04:43–04:55 EDT)

- `main` moved `6ad50ce` → `c96e913` (ported commits, records, the copy) → `59e4c31`, both fast-forwards. `59e4c31` syncs three files the content lane wrote between 04:39 and 04:43 (the saturated-market drafts and `routines/runs/2026-09-25-critic-saturated-market.md`). Branch `claude/reconcile-2026-09-25` was pushed at the same tip, and both archive tags were pushed.
- GitHub Actions on the push: Cloudflare Worker run `36114466582` and Pages mirror run `36114466660` each logged "CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID not set; skipping" and skipped every deploy step. `gh-pages` is untouched at `94016fa`.
- The canonical checkout switched from `claude/agency-redesign` to `main` `59e4c31` at 04:47 EDT, with no stash and nothing discarded.
  - Before the switch, each of its 119 uncommitted files was checked. 117 were byte-identical to `main`. For PROJECT.md and the parity-design handoff, the added paragraphs were confirmed present on `main`.
  - Those files were staged, `git checkout main` ran and `git pull --ff-only` found nothing to pull. `git status` is clean, and the local `claude/agency-redesign` ref is kept.
  - Stale worktree entries for the deleted folders `/private/tmp/mj2-ghpages` and `/private/tmp/mj2-release.pqt3WZ` were pruned; their commits `0b9073d` and `bb32728` are on `origin`.
  - An insurance copy of the 119 files, with a `README.txt`, is at `~/Archive/2026-09-25/mitchjmiller-html-migration-pre-main-switch/` (24 MB).
- Another agent created `~/Documents/mitchjmiller-html-migration-UNCOMMITTED-BACKUP-2026-09-25` at 04:36 EDT (117 files, PROJECT.md at its root). 113 of its files are byte-identical to `main`; the other 4 are older versions of PROJECT.md, the parity-design handoff and two saturated-market drafts, all newer on `main`. `where.py --audit` lists it. It was left for its owner to move to `~/Archive/2026-09-25/`.
- The second checkout `~/Documents/mitchjmiller.com` was not moved (see Result) and nothing in it was changed.
- Registry: in `~/Documents/ai-os`, the PROJECTS.md row for mitchjmiller.com and BACKLOG #33 and #37 were updated. They are not committed, because that repository is on `codex/m2-ai-search-crm-research` with other agents' pending edits. `where.py mitchjmiller.com` resolves to the canonical checkout. `where.py --audit` still lists three mitchjmiller entries: `~/Documents/mitchjmiller.com` and its `content-studio/AGENTS.md` (kept by Mitch's decision) and the other agent's backup folder.
- Harness note: Tailwind's automatic source scan still reads the root records and `handoffs/`, so ordinary words in those files can emit dead utilities. A candidate follow-up is adding `@source not` lines for `handoffs` and the root `*.md` files in `baseline/src/index.css`. That changes the release CSS, so it belongs in a release that is reviewed on its own.

## Rule going forward

- Work only in `/Users/mitchellmiler/Documents/mitchjmiller-html-migration`. To start a task: `git fetch origin && git switch main && git pull --ff-only`, then `git switch -c claude/<task>` (or `codex/<task>`).
- Commit by explicit path, never `git add -A`. Push the branch, then fast-forward `main` with `git push origin claude/<task>:main` (never force). Finish with `git switch main && git pull --ff-only`.
- A build or release may use a temporary clone under `/private/tmp/claude-501/`; remove it when the task ends. Never create a second persistent checkout or a long-lived worktree, and do not work on this repository in `~/Documents/mitchjmiller.com`.
- Scheduled content routines (`blog-research-dataviz-draft`, `linkedin-syndication-queue`) keep reading and writing `content-studio/` in this checkout; they never run git. The next task commits their new files on its short-lived branch.
- Any push to `main` that touches `cloudflare/api-worker/**` triggers `.github/workflows/cloudflare-worker.yml`. It deploys the Worker, now including Stripe, as soon as the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist. There were 0 on 2026-09-25, so the gate skips it. Keep the Stripe deploy a separate, explicitly approved step: add Worker secrets, set `STRIPE_PRICES`, apply the `schema.sql` D1 migration, create the webhook endpoint and decide on tax (see `docs/stripe/README.md`).

## Open for Mitch

1. `https://mitchjmiller.com/` still times out (re-checked 2026-09-25 04:25 EDT); `http://` 301s to mj2.pro with the path kept. The fix is SSL on the Namecheap redirect or a Cloudflare redirect rule, and it needs registrar or Cloudflare access. Options are in `docs/site-migration-2026-09-21/README.md` and `handoffs/study-notes-deploy-gap-2026-09-22.md`.
2. Stripe go-live inputs (`docs/stripe/README.md`).
3. The remaining items from the wave-2 release record at the top of PROJECT.md.
4. Decide what `~/Documents/mitchjmiller.com` is for. If mitchjmiller.com becomes a separate personal-portfolio product, give it its own repository and registry row. If not, retire the folder to `~/Archive/<date>/`. Until then, `where.py --audit` keeps flagging it and its `content-studio/AGENTS.md`.
