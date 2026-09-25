# Handoff — two-checkout reconciliation + content lane state (2026-09-25)

**From:** Claude Code (Career Coach session, content lane)
**To:** the wave-2 release session, and any agent that touches mitchjmiller.com
**Status:** diagnosis complete, nothing deleted, nothing published. Two actions need Mitch.

Both sessions independently flagged "main vs claude/agency-redesign needs reconciling" (wave-2 report item 6; this session's blocker before drafting). It is now settled with git facts rather than either session's assumption.

## Ground truth, 2026-09-25

| Fact | Value |
|---|---|
| `origin/main` | `6ad50ce` (2026-09-25) — matches the wave-2 release record |
| Deployed | gh-pages `94016fa` from `3559667`; 5 posts live on mj2.pro |
| `~/Documents/mitchjmiller.com` | branch `main`, HEAD `f3dc1c6`, **0 uncommitted**, 0 studio drafts |
| `~/Documents/mitchjmiller-html-migration` | branch `claude/agency-redesign`, HEAD `4ec97df`, **37 uncommitted**, all 11 studio drafts |
| `where.py mitchjmiller.com` | resolves to **mitchjmiller-html-migration** |
| `where.py --audit` | flags `mitchjmiller.com` + its `content-studio` as unregistered |

## Verdict

**`mitchjmiller-html-migration` is canonical.** It is what `where.py` resolves to (the standing rule for finding a project's one real folder), it holds every content-studio draft, and it holds the uncommitted working state the wave-2 session described.

**RULING FROM MITCH, 2026-09-25 — do not retire `mitchjmiller.com`.** He wants it kept as his personal work-history portfolio, separate from the M² site, and is fine with some overlap if it keeps things organized. So this is a deliberate two-product split, not a duplicate to delete. The retirement analysis below stands only as evidence that nothing is currently stranded there.

~~`~/Documents/mitchjmiller.com` is a redundant duplicate and can be retired.~~ Verified that nothing is stranded in it:

```
git -C ~/Documents/mitchjmiller.com merge-base --is-ancestor f3dc1c6 origin/main   # exit 0
git -C ~/Documents/mitchjmiller.com status --porcelain -uall | wc -l               # 0
```

Its HEAD is fully contained in `origin/main` and it has zero uncommitted or untracked files. Nothing is lost by removing it. Removing it also clears two of the six entries in `where.py --audit`.

**Correction to an earlier claim from this session:** I previously wrote that I had drafted into "the paused one" and that the registry and production disagreed. That was wrong. The migration checkout is both the registry's answer and the working checkout; the disagreement was that its local `main` ref was stale, not that the folder was wrong. The drafts are in the right place.

## The real divergence (separate problem)

The checkout question is settled. The branch question is not:

```
claude/agency-redesign vs origin/main:  19 ahead, 27 behind
```

That is a merge to plan, not a folder to pick. Production ships from `main`; the redesign branch has its own 19 commits and is 27 behind. PROJECT.md already records that the redesign branch "must adopt these standards before it is ever released."

## Uncommitted work in the canonical checkout — do not discard

37 files, 18 modified + 19 untracked. Includes:

- `PROJECT.md` (the wave-2 working-copy record)
- `content-studio/OPERATING.md`
- Modified drafts for three posts that are **already live**: `b2b-vs-b2c-by-vertical`, `growth-title-market`, `statistician-vs-data-scientist`
- `content-studio/viz/directions/01-data-mandala/` and `05-journey-map/` (index.html, export.mjs, posters, GIF)
- Two new drafts from this session (below)

Live posts whose source drafts exist only as an uncommitted working copy is the fragile part. Committing the content-studio paths would fix it without touching site source.

## Content lane state (this session)

New package, **gate PASS (0 fail, 0 warn), LinkedIn lint 88/100 SHIP, nothing published**:

- `content-studio/drafts/2026-09-24-rank-new-site-saturated-market.blog.md`
- `content-studio/drafts/2026-09-24-rank-new-site-saturated-market.linkedin.md`
- `content-studio/research/2026-09-24/rank-new-site-saturated-market/` (findings.md + 12 source files)

Topic: ranking a new site in a market legacy competitors own. No overlap with the five live posts.

Three claims in the brief were contradicted by the research and the post was rewritten around the contradiction:

1. **Local intent is where AI Overviews are rarest.** seoClarity (500M+ keywords): 0.14% of local keywords March 2025 → 0.01% September 2025. Whitespark ~15% local-intent vs 92% informational. *Trap: Whitespark's circulated 68% is their mixed-intent set.*
2. **Long-tail converts worse.** Ghose and Yang (NYU Stern): +1 word = −5.41% conversion. The access argument survives; the conversion argument does not.
3. **Schema is not the AI-citation lever.** Google's AI-features docs state no markup is required; FAQ rich results removed from Search 2026-05-07; Ahrefs' matched difference-in-differences (1,885 pages) measured AI Overviews −4.6%.

**Two poisoned citations any agent in this lane should refuse:**
- A "Princeton CS + Moz, 500,000 URLs, WWW 2026, FAQ schema = 3.2x citation rate" statistic. No such paper; sole source is an unattributed page advertising its own schema generator.
- Ahrefs' 94.74% long-tail figure — revised, and Ahrefs' own stats page now contradicts it.

`hero_type: image` on this draft, because the five live posts are all `viz`. Hero asset not yet built.

## Needs Mitch

1. ~~Retire the duplicate checkout.~~ **Answered 2026-09-25: keep it** as the personal work-history portfolio. Open question moved to the M² lane: who owns the mitchjmiller.com vs M² content boundary, and does the portfolio need its own repo rather than sharing one with the M² site.
2. **`mitchjmiller.com` HTTPS is still dead** (both sessions confirm). `http://` 301s to mj2.pro with the path preserved; `https://` times out — Namecheap URL-forwarding has no certificate. Registrar or Cloudflare access required; options in the site-migration record.

## Not doing without instruction

Committing anything in the canonical checkout (the wave-2 session owns that working copy), merging the redesign branch, deleting the duplicate, publishing this draft, touching DNS.
