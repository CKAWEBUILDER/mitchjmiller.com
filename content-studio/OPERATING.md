# Content Studio — Content Studio operating doc (self-updating)

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
- 2026-09-18 — Scheduled blog-research run. Drafted `ai-citation-rate-by-platform` from arXiv 2609.19244 (Sept 16), a study of what ChatGPT, Claude, Grok and DeepSeek retrieve vs cite, in 171,264 donated chats plus API replays. Scout subagent (Sonnet) scanned the sources, then the main session did primary verification. Learnings: (1) LaTeXML sometimes renders tables as nested `<span class="ltx_tabular/ltx_tr/ltx_td">`, not `<table>`. A `<tr>` regex returned empty bodies for 8 of 15 tables. Reuse the span-aware parser at `research/2026-09-18/retrieved-vs-cited/parse_arxiv_tables.py`. Its output for this paper is `arxiv-2609.19244-tables.json` beside it. (2) Read the appendix before writing copy. The appendix said the API prompts were sampled from ChatGPT users only, and a second appendix contradicted a main-text domain claim. Both would have shipped wrong from the main text alone. (3) The kit has no way to show a missing cell (`pair()` falls back to [0,0], which would print a fake 0), so a platform with blank table cells goes outside the grid and into copy. That's safer than inventing a zero. (4) Pick the default selector state to match the headline, because the poster renders the default. (5) Semrush MCP not called (routine says no units), so keywords are editorial. Gate passes. Critic pass still pending, as it is for the Sept 16 draft. The visual-direction pick now blocks three artifacts.
- 2026-09-16 — Scheduled blog-research run (Mon/Wed/Fri 06:00 ET). Drafted `ai-search-poisoning-guardrails` from Counter-GEO-Bench (arXiv 2609.02316, EMNLP 2026) using a scout subagent (Sonnet) for the source scan, then primary verification in the main session. Learnings: (1) WebFetch's summarizer paraphrases tables and blended two different accuracy tables; for papers, curl the arXiv HTML and parse `<table>` locally. Every number then comes from the page source. (2) One build script (`viz/<slug>/build.py`) now writes both the research ledger and the artifact data from the same table and asserts internal consistency (outcome counts reproduce ASR), so ledger and artifact can't drift. (3) Kit defect found and patched in this fork only: the payoff badge always used accent 4, which is green in Ember, so a worse result (a guardrail raising attack success 54.7→56.9) read green. The fork colours it by good/bad direction, prints ±10%-of-parity ratios to 2 decimals, and adds "higher" for lower-is-better metrics. The SERP row tags (answer/citation/organic/pack) now accept a `label`. Worth back-porting to `kit/template.html` once the visual direction is picked. (4) Papers can contradict themselves (the abstract's 5.7% vs Table 3's −9.1%‡). Scope claims to the sentence that's true for all rows, and log the inconsistency. (5) Still pending: Mitch's pick among `viz/directions/01–05`. This artifact ships in the rejected kit look with data ready to port. Semrush MCP was not called (routine says no units), so keywords are editorial. Gate: validate_post.py checks pass. The mandatory critic pass has not run yet.
- 2026-09-15 — Visual layer rejected. The kit's first look (navy dashboard tiles, faint mandala, big sources footer) conflated the site's austere palette with the infographic brief. Rule going forward: infographics follow the reposts DNA in PIPELINE-2026-09.md (dense reference posters, 8–14 labelled cells, legend, icons, loud title bar, spatial metaphor) plus Mitch's words (bright, mandala/fractal as structure, motion, dopamine); the site's restraint never applies to them; sources one tiny line; offer several directions before rebuilding a set. Five candidates live in viz/directions/. Also: research ledgers must be corrected in place when a builder retracts a figure, or later agents inherit it (the 64.9% PAA case).
- 2026-09-14 (evening) — Content engine, set one. Learnings: (1) research agents that return ledgers, not prose, caught a fabricated stat circulating on AI-statistics sites ("18.4 billion queries / 57.3% informational") and a PAA figure whose trail dead-ended in aggregators; rule: a number that cannot be fetched is not a number. (2) LinkedIn guest job counts are rounded placeholders; show floor and ceiling with methodology instead of one number. (3) Sources disagree by 2–3.5× on pay for unstandardised titles; show the spread, never average. (4) Kit lessons: verify must probe every declared dimension (an inert second selector passed the old harness twice); stills need geometric checks (a poster clipped 7 of 11 sources while verify passed); source detail strings must be short in still mode. (5) LinkedIn: native-uploaded GIFs animate and schedulers flatten them; PNG poster fallback; a single-page PDF is not a carousel. (6) The critic step found real citation errors in 3 of 4 pieces; keep it mandatory before publish. Files: research/2026-09-14/, viz/kit/, viz/<slug>/, drafts/2026-09-14-<slug>.*, routines/runs/2026-09-14-critic-A/B/C.md.
- 2026-09-14 — Drafted `drafts/2026-09-14-growth-engineering-without-the-title.blog.md` (Writing post on
  positioning + agent-team method; hero SVG in the site navy/green rather than the old four-colour palette,
  matching Mitch's Sept 14 direction). Gate elements present. Semrush MCP still has no API units (second
  time; Sept 12 too) — keywords are editorial picks until re-run. Two claims flagged for Mitch in the draft
  notes. Per-section keyword/icon spec included so the redesign's section icons can carry alt = keyword.
- 2026-08-19 — Studio scaffolded. Site Writing pipeline = `blogPosts` in `data.ts` with
  `contentHtml`; deploy via gh-pages worktree rsync. LinkedIn = browser + per-post approval
  (no API). Semrush MCP available for KW data. First post queued: multi-agent flat-fee stack
  + billing traps (ties to the live `hermes.md` billing-bug post).
