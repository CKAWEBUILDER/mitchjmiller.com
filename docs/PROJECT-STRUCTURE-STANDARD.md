# REQUIRED PROJECT STRUCTURE — EVERY PROJECT

Standing instruction from Mitch, clarified September 11, 2026. This applies to every project, not only when switching agents. It establishes ongoing version-controlled continuity and does not mean a handover has been requested.

- Keep one identified canonical GitHub repository and persistent local working folder per project. Temporary previews/worktrees are disposable references; essential source, state and evidence must survive them.
- Before substantive work, read and maintain root `AGENTS.md` (shared operating contract), root `PROJECT.md` (current objective/state/decisions/permissions/next task), and root `README.md` (human entry point and real commands). Provide root `CLAUDE.md` referencing the same records when Claude Code is a supported executor; do not duplicate conflicting rules.
- Keep focused continuation records in `handoffs/`, and link decision/task/validation records from PROJECT.md. Existing equivalent records can be reused when clearly mapped; do not create parallel, conflicting sources of truth.
- Record actual branch and source/deploy state, complete versus proposed work, evidence and test results, blockers, preserved user changes, approval boundaries and the exact next step. Keep live production, review builds and future ideas distinct.
- Use version control for source and project records. Validate locally, commit accepted changes, push GitHub source before deployment, and identify one release owner with a rollback path. Do not overwrite unrelated changes or expose private data/secrets in public repositories.
- Update these records as work progresses and at completion, so any authorized agent can resume without reconstructing a chat or asking Mitch to repeat the project. An agent switch is optional; the shared records are mandatory.
- Do not claim universal compliance without checking existing projects. Apply the standard to each project as it is worked on; a fleet-wide audit is separate work when requested.

Minimum layout:

```text
project/
  AGENTS.md
  PROJECT.md
  README.md
  CLAUDE.md
  handoffs/
  docs/  # linked decisions, plans and validation evidence as needed
  ...version-controlled source and reproducible configuration...
```
