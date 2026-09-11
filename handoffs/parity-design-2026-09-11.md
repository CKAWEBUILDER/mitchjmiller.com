# Continue the two-track implementation

Read root PROJECT.md and docs/implementation-2026-09-11/README.md. The full production HTML migration and separate new homepage/full SFC case candidate are implemented locally on `codex/html-parity-design-20260911` in `/Users/mitchellmiler/Documents/Career Coach/work/mitchjmiller-parity-20260911`. Implementation commit `c2746011e054af777ed4ac1ba9f11dfa26c64764` is pushed to GitHub. It is not deployed to Sites or production. Authentication was revoked during final QA. Do not redo the implementation or restart planning.

1. Restore Codex authentication (sign out/in); Sites returned token_revoked and approval review rejected the browser interaction check for that same reason.
2. Resume focused browser QA with the browser skill. One task tab may remain at the design homepage, with a temporary 390x844 viewport. Restore viewport/close task resources after QA. No user tabs were modified.
3. Start `node scripts/serve-review.mjs dist 5191` if needed. Run the missing tests listed in the QA record, repair only observed problems, rebuild if source changes.
4. Verify Git status and preserve all current edits. The implementation and static/HTTP evidence are already committed/pushed. Commit/push only subsequent QA repairs and updated records. The Git worktree metadata lives in the canonical checkout; sandbox escalation may be necessary.
5. Reuse Sites project `appgprj_6aa39e9ddc0881919bc64cbef445b4a3`. Verify owner-only access, renew source credential, push exact same Git commit to returned Sites source branch with per-command auth, package validated staging dist, save/deploy privately. Never print/persist secrets.
6. Update records with commit/deploy references, reconcile the canonical checkout's coordination note, and deliver `/review/`, `/design/`, `/design/case-studies/sfc-surf-school/`. Existing stage currently still holds source5bca30b, the rejected older themes/proof slice.
7. Send concise report to originating task `01a091b0-6e3a-79c1-8641-14a21d028522` if available. This task is `01a091b4-5b45-7843-8174-bff6d23ece68`. If messaging is blocked, originating task can read the final response.

Implementation/public design approval persists. Public promotion, DNS, Cloudflare, client portals, CRM/new simulation, spending remain outside this task. Claude's canonical branch/overnight proposal and the original user's unpublished drafts were preserved.
