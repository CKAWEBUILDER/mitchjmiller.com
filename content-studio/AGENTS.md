# AGENTS.md — Content Studio operating doc (self-updating)

This file is the studio's evolving playbook. **Agents update it** at the end of each session:
what worked, what flopped, new house rules Mitchell added, formats that got engagement.

## Roles (when running multi-agent)
- **Editor (main):** owns the post end-to-end; enforces house rules in `CLAUDE.md`.
- **Researcher (subagent):** deep web + Semrush KW pulls; returns sourced findings, never prose.
- **Designer (subagent):** builds the infographic SVG from the researcher's data.
- **Critic (Stop-hook / subagent):** blocks completion until the quality gate passes.

## Quality gate (enforced by `hooks/validate_post.py` on Stop)
A draft pointed to by `.active-draft` must contain:
- [ ] `kw:` front-matter (primary keyword) + `kw_secondary:`
- [ ] a visual: an inline `<svg` **or** an `infographic:`/image reference
- [ ] a share CTA (`Share this with` or `<!--CTA-->`)
- [ ] sources / links (a `Sources` section or ≥2 `http` links)
- [ ] a stated **unique insight** (`insight:` front-matter line)
Missing any → the hook returns a block with the checklist so the Editor repairs it.

## Conventions
- Drafts live in `drafts/<slug>.md` with YAML-ish front-matter (kw, kw_secondary, insight, cta).
- One post = one clear thesis + one hero data-viz + a skimmable structure (TL;DR, sections, CTA).
- Infographics: self-contained dark-panel SVG (theme-independent), Mitchell's palette
  (#2563eb / #7c3aed / #10b981 / #f59e0b), captioned, share-worthy at a glance.

## Learnings log
_(Append dated entries. Newest on top.)_
- 2026-08-19 — Studio scaffolded. Site Writing pipeline = `blogPosts` in `data.ts` with
  `contentHtml`; deploy via gh-pages worktree rsync. LinkedIn = browser + per-post approval
  (no API). Semrush MCP available for KW data. First post queued: multi-agent flat-fee stack
  + billing traps (ties to the live `hermes.md` billing-bug post).
