# Content Pipeline — Sept 2026

Built from Mitchell's topic dump (2026-08-31) + a read of the existing blog + a scan of what he reposts on LinkedIn. Follows `CLAUDE.md` house rules and the `AGENTS.md` quality gate.

---

## The model: blog-first, LinkedIn as the teaser

Every topic ships as **one blog post on mitchjmiller.com** (the asset) plus **one LinkedIn post** (the tease) that carries the hero infographic and drives to the post. LinkedIn gets the hook and the takeaway; the blog gets the depth, the extra charts, the author bio, and the collaboration CTA.

Site pipeline already exists: posts are `blogPosts` entries in `src/lib/data.ts` with rich `contentHtml`; routes `/blog/:slug` and `/blog/studying/:slug` are live; deploy is build → gh-pages worktree rsync (`skills/publish/SKILL.md`).

### Blog post template (new — needs building once, then reused)
- Hero infographic (SVG, inline, theme-independent)
- 2–4 supporting visuals: line charts, comparison tables, architecture diagrams
- **Author bio block** — photo, background, current interests, future plans
- **CTAs**: résumé (`/resume`), collaboration (`/collab-ideas`, `/contact`), case studies (`/case-studies`)
- **Comment section with moderation** — comments held until Mitchell approves. Needs a backend (site is a static Vite/React SPA on Cloudflare Pages), so this is a real build decision: Cloudflare Pages Functions + KV/D1, or a hosted widget (Giscus/Cusdis) with pre-moderation. **Open question for Mitchell — see below.**

---

## Topic slate

Legend: **NEW** = nothing on the blog yet · **ADJ** = adjacent post exists, needs a distinct angle

### AI systems & multi-agent (his strongest differentiated lane)
| # | Topic | Status | Angle |
|---|---|---|---|
| 1 | Orchestration stack: n8n + Zapier + cron — when to use which, together | ADJ (`build-ai-agents-full-course`, `forget-loop-engineering`) | The decision matrix + the breakage pitfalls: retries, idempotency, silent failures, state, cost metering |
| 2 | Build your own AI OS vs. download one from GitHub | ADJ (`hermes-concepts-field-guide`, `hermes-seo-agent`) | Hermes as orchestrator + recursive learning; Claude Code/Codex as brain; Perplexity/DeepSeek research; Gemini/Grok realtime. Compare against top-downloaded agent OSes |
| 3 | Claude Code + Codex without redundancy or breakage | ADJ (`claude-code-6-new-rules`, `codex-obsolete-9-moves`, `codex-voice-jarvis`) | Which for what, handoff patterns, shared-runtime pitfalls — **plus the correction below** |
| 4 | Open-source vs frontier models — using OS models to see the reasoning frontiers now hide | NEW | Genuinely underserved; ties to his eval work |
| 5 | Population simulation: 10s → millions of synthetic personas | NEW | Public + private data sources, use cases for companies/orgs/govts, modelling outcomes before rollout, budget planning. **No comparable post in his field — highest originality** |
| 6 | The ethics of restricting open-source AI | NEW | Opinion piece; pairs with #4 |
| 7 | Purposeful, reusable AI skill development | ADJ (`book-to-skill`) | First-party story: the job-applier skill, months of kink-working, what made it finally reliable |

### Search (his hire-me lane)
| # | Topic | Status | Angle |
|---|---|---|---|
| 8 | Ranking a new site in a saturated legacy market | ADJ (`sfc-surf-school`) | The full method he described: export 100Ks of rows, ID market-share holders and their footprint, "SEO is now Everywhere Optimization", touchpoint count before conversion, OTA importance, geographic/channel gaps, paid as quick win, SQL-style querying over the corpus, then pre-commercial-intent content nobody owns ("best time of day to surf in Waikiki"), free-value assets for authority, FAQ schema for AI citation |
| 9 | The evolution of search & SEO → AI | ADJ (`old-seo-collapsing`, `traditional-seo-to-ai-search`) | The full arc: black hat → manual actions → dev guides → the Google communicators era → tool evolution (Moz → Ahrefs → Semrush → seoClarity → Profound) → AEO/GEO/Everywhere Optimization incl. TikTok shopping → agent-to-agent commerce. **House rule: link tools and companies, never people** |

### Already scheduled on LinkedIn (Sep 1–7)
- Sep 1 — Robots.txt / AI crawler access ✅
- Sep 2 — GEO ownership problem ✅
- Sep 3 — **73 websites, one CMS** (rewritten from Mitchell's own telling) ✅
- Sep 7 — The five fundamentals ✅
- Sep 4, 5, 6 — open, to be filled from the slate above

---

## Corrections applied
- **Deleted** from the queue: "10,000 medical terms", "5 AI tools", "63 websites", "I run a kayak company."
- **The CommonSpirit post was rewritten** to Mitchell's account: ~73 sites to one CMS; the resisting service areas were the highest-revenue ones and *were right*; the health glossary (Mayo/WebMD/Cleveland Clinic/UCSF style) prioritized by high volume + low competition among those libraries; content fragments gave each service area a bespoke version, which is what moved the holdouts.
- Removed the unverified figures Mitchell didn't recognize (10,000-term universe, 80%+ buy-in, 1M+ visits/yr, 34 markets). They appear on mitchjmiller.com but he is the source of truth — **reinstate only if he confirms.**

## One factual correction for topic #3
Mitchell's assumption: "Codex voice can control Claude Code; Claude Code can't drive Codex."

Claude Code **can** drive Codex — via the installed `codex` plugin (`codex:rescue` skill and the `codex:codex-rescue` subagent, which hands tasks to Codex over a shared runtime). So the control relationship is bidirectional; what's asymmetric is the *voice* layer (Codex Voice is realtime and can drive the desktop; Claude Code's voice mode is mobile-only). Worth verifying hands-on before publishing — it changes the post's thesis.

---

## Design direction (from his reposts)

What he reposts and calls outstanding: Jonathan Parsons' "Ultimate ChatGPT Guide", Searchable's "10 Principles of AI-Citable Content" and "AEO/GEO Resources", Emilia Möller's "AI Search Visibility Ecosystem 2026", the MCP/plugins map.

Shared DNA — **this is the brief**:
- **Dense multi-panel reference posters**, not minimal statement graphics. 8–14 labelled cells.
- **Colour-coded sections** with a legend; each cell has an icon, a bold title, 1–3 short lines.
- Reads as a **thing you save**, not a thing you scroll past.
- A single loud title bar at the top stating the takeaway.
- Numbered principles or a clear spatial metaphor (radial map, ecosystem layers, stack).

This is a real departure from the dark-minimal carousel already published. The studio's `skills/infographic/SKILL.md` palette (`#2563eb`/`#7c3aed`/`#10b981`/`#f59e0b`) still applies — the change is **density and structure**, not colour.

Recommended: build the hero as a dense reference poster; keep the existing clean style for the supporting charts inside the blog post.

---

## Open questions for Mitchell
1. **Comments backend** — the site is a static SPA. Pre-moderated comments need either Cloudflare Pages Functions + D1/KV (own it, ~half a day) or a hosted widget with moderation (Cusdis/Giscus, ~an hour, third-party). Which?
2. **Confirm or drop** the CommonSpirit figures listed under Corrections.
3. **Headline** — site says "Director of SEO, AEO/GEO & AI Search Systems", LinkedIn says "Growth Marketing Manager". Pick one; the LinkedIn one is the higher-leverage edit.
4. **Order** — which topic ships first? Recommendation: **#5 population simulation** (nothing comparable in his field, highest ceiling) or **#8 saturated-market ranking** (closest to a hiring manager's problem).
