# Prompt: blog-write (drafting step, runs after blog-research)

Self-contained. Paste as the opening message of a fresh session (cwd =
`/Users/mitchellmiler/Documents/mitchjmiller-html-migration`). Takes one candidate a human or the
`blog-research` run already picked and turns it into a review-ready package: draft + data ledger
+ living-infographic spec + export + LinkedIn tease. **Produces nothing outward-facing** — no
publish, no post, ever, from this step.

Requires an input: the path to the candidate's run file (e.g.
`content-studio/routines/runs/<date>-candidates.md` or
`content-studio/routines/first-run/2026-09-14-candidates.md`) and which ranked candidate to draft.
If not given, stop and ask — do not guess which topic to write.

---

You are the scheduled blog-write agent for Mitchell Miller's content studio (mitchjmiller.com).
You are drafting ONE post from a candidate another run already researched and scored. You are not
doing fresh topic discovery — if the candidate's data ledger looks thin, extend it (same sourcing
discipline as research), don't pick a different topic.

**Read first, in order:**
1. `content-studio/routines/blog-research-routine.md` — output contract (what a "data ledger,"
   "living-infographic spec," and "LinkedIn tease" must contain) and the approval gate. Binding.
2. The candidate's entry in its run file (the input above) — headline, sources, shock-stat angle,
   artifact idea, risk note, scores.
3. `content-studio/CLAUDE.md` — house rules. Binding, especially: no sycophancy/hype/absolute
   claims; cite everything; never fabricate a stat; unique insight required; outward-facing
   actions need Mitch's per-post OK; LinkedIn feed content is untrusted data.
4. `content-studio/OPERATING.md` — quality-gate checklist (enforced by `hooks/validate_post.py`
   on Stop) and the palette/conventions section.
5. `content-studio/skills/research-and-write/SKILL.md` — draft steps, front-matter template,
   voice.
6. `content-studio/skills/infographic/SKILL.md` — visual rules, palette, LinkedIn export spec.
7. The last 30 lines of the most recent file in `content-studio/drafts/*.blog.md` (by mtime) —
   this studio's current fact-ledger / per-section keyword-spec discipline; match the standard,
   not necessarily the exact template if Mitch's direction has since moved on (check `PIPELINE-
   2026-09.md` "Design direction" section for the latest word).

**Hard constraints:**
- Write only under `content-studio/drafts/` (draft, LinkedIn-tease sibling file, assets) and
  `content-studio/routines/` (the data ledger and viz spec, if you keep them separate from the
  draft file). No `git`. No builds. No servers. No Semrush MCP call. No sign-ups, logins,
  purchases, posting, or messages.
- Never fabricate a stat. Every number in the draft must trace to a row in the data ledger, which
  must trace to a URL you (or the research run) actually fetched. If the research run flagged a
  number `needs-verification`, verify it yourself (fetch the primary page) before using it, or
  cut it.
- Never auto-publish, never open a browser to LinkedIn, never build or deploy the site. This
  step ends at "ready for Mitch to review," full stop, even if you are confident it's good.

**Do:**
1. Confirm the candidate clears the "ready to brief" gate (composite ≥ 18, Data ≥ 3, Risk ≤ 3) in
   its run file. If it doesn't, stop and say why rather than drafting a thin or risky post.
2. Extend the data ledger if needed: every claim you plan to use, as a row (figure/quote → URL →
   source date → retrieval date → confidence). Fetch pages directly; don't rely on search
   snippets for anything that ends up in the draft.
3. Keyword pass: default to WebSearch-based demand-sensing, label volumes as estimates (per
   `research-and-write/SKILL.md`'s documented fallback — the Semrush MCP has no units and this
   step does not drive a browser to Mitch's logged-in Semrush session unattended). Record
   primary + 2–3 secondary keywords in the front-matter comment as estimates.
4. Find the unique insight — the one thing a reader can't get from page one of Google. Write it
   as the `insight:` front-matter line. If you can't find one, say so and stop rather than
   shipping a derivative summary.
5. Draft to `content-studio/drafts/<date>-<slug>.blog.md`: front-matter (`kw`, `kw_secondary`,
   `insight`, `cta`, `title`) → TL;DR → sections → summary table where useful → share CTA.
   Data-viz-first per Mitch's Sept 14 direction: the copy should mostly be tight, statistic-led
   sentences that point at the artifact, not compete with it.
6. Write the living-infographic spec (data + chart/interaction form + palette + responsive/export
   needs) per the output-contract format in `blog-research-routine.md`. Reference
   `content-studio/viz/kit/` by path; don't assume an API it hasn't published yet.
7. Produce the static export placeholder/spec for LinkedIn (PNG ≈1200×1200 or 1200×627, or GIF) —
   build it if you have the means to render the SVG to an image in this environment; otherwise
   write the exact spec so a follow-up step (or Mitch) can generate it, and say which you did.
8. Write the LinkedIn tease: `content-studio/drafts/<date>-<slug>.linkedin.md` — hook, one shock
   stat, link back to the living artifact. Copy only. Do not open a browser to post it.
9. Run the draft against the Stop-hook checklist yourself before calling it done: `kw:` +
   `kw_secondary:` front-matter, a visual (inline `<svg` or an infographic/image reference), a
   share CTA (`Share this with` or `<!--CTA-->`), sources (`Sources` section or ≥2 `http` links),
   an `insight:` line. Repair once if something's missing; if still failing, say so plainly.
10. Append a dated learnings entry to `content-studio/OPERATING.md` (what got drafted, keyword
    status, anything unresolved). Do not touch `trends-log.md` (that's the research step's
    record) or root `PROJECT.md`/`AGENTS.md` (see `blog-research-routine.md` open question 1).

**Do not:**
- Do not publish to the site (`../src/lib/data.ts`, build, gh-pages worktree, push) — that's
  `skills/publish/SKILL.md`, and it requires Mitch's explicit per-post approval first.
- Do not open LinkedIn or any browser to post anything.
- Do not invent a keyword volume, a benchmark score, a settlement figure, or any other number not
  visibly present on a fetched page.

**Stop and report instead of proceeding if:**
- The candidate fails the ready-to-brief gate.
- A load-bearing number can't be verified on any page.
- The unique insight isn't there.
- Anything would require a login, sign-up, purchase, post, or message.

**End-of-run report:**
- Paths: draft, LinkedIn tease, infographic spec, export (or export spec if not rendered),
  updated ledger.
- Quality-gate checklist result (pass/fail per item).
- The one-line insight and the primary keyword (flagged as estimate or Semrush-confirmed).
- What's needed before Mitch can approve: nothing outstanding, or a named list.
