# Handoff — study-note routes missing from agency build + availability gap (2026-09-22)

**From:** Claude Code (content/repo lane) · **To:** release owner of the mj2.pro agency cutover (Codex lane)
**Do not treat as a request to publish** — the redesign is paused per PROJECT.md ("Do not publish while paused"). This only records two things to handle when the cutover resumes.

## 1. Public availability gap during the paused cutover
As of 2026-09-22, verified by curl:
- `https://mitchjmiller.com/` → **404** (gh-pages `CNAME` is now `mj2.pro`, so Pages no longer serves the old apex).
- `https://mj2.pro/` → **000** (DNS resolves to 207.207.210.229/.107 — not GitHub Pages' 185.199.108–111.153 — but nothing answers; TLS/connect fails).

Net: the portfolio is publicly unreachable on both domains while the cutover is paused. Flagging because it overlaps an active job search. Not actioned by me (domain/host is the infra lane).

## 2. Study-note routes are not emitted by the agency (astro) build
Source is intact on `main` (`7068a03`): `scripts/gen-study-notes.mjs` NOTES has all entries and `src/lib/study-notes.ts` now has **24 notes**. But the deployed gh-pages agency release (`0b9073d`, "Release 2026-09-21: M squared agency site on mj2.pro") ships only **21** `/blog/studying/*` routes — the three newest are absent from the deploy though present in source:
- `pocock-ai-coding-workflow` (added today, `7068a03`)
- `fde-1m-ai-job` (`1701d2d`)
- `pocock-agentic-workflow` (`512be11`)

Likely cause: the astro build path (`prepare-astro-staging.mjs` → `astro build` → parity/agency verifiers) doesn't enumerate the `study-notes.ts` slugs the legacy vite path emitted via `create-route-copies.mjs`. When resuming the cutover, ensure the agency build emits every `studyNotes[].slug` under `/blog/studying/<slug>/` (indexable, `index, follow`), or the study library regresses on mj2.pro.

## 3. New content this session (source only, already on main)
- `7068a03` — study note "Matt Pocock full AI-coding workflow" (SVG-only, 6 infographics + CSS-only Buzz). Note markdown lives in the private library at `youtube-library/agentic-engineering/full-walkthrough-workflow-for-ai-coding-matt-pocock/blog-post.md`; regenerate with `node scripts/gen-study-notes.mjs`.
- Companion global skill `forward-deployed-engineer` added earlier under `~/.claude/skills/` (not in this repo).

## Note for whoever runs gen-study-notes.mjs
It copies **all** frames from a note's `frames/` dir into `public/images/study/<slug>/` even when the note's HTML references none (SVG-only notes). I removed 184 unused frames for `pocock-ai-coding-workflow` before committing. If a future run re-copies them, delete `public/images/study/pocock-ai-coding-workflow/` before release, or guard the copy to referenced images only.
