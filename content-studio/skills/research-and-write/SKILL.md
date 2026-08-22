---
name: research-and-write
description: Research deeply and write a high-value, KW-targeted Writing post for mitchjmiller.com. Use when Mitchell wants a new article/essay/concept explored (not a YouTube note).
---

# research-and-write

Produce one genuinely valuable post that can pull inbound (AEO/GEO / AI-search / agentic-eng).

## Steps
1. **Ideate against `../trends-log.md`** — pick an angle with real demand + a unique take.
2. **Keyword research (Semrush — via BROWSER).** The Semrush MCP has **no API units** (and
   never has), so pull volume/difficulty by driving semrush.com in Mitchell's logged-in browser
   (Claude-in-Chrome) — Keyword Overview / Keyword Magic Tool. Record primary + 2–3 secondaries
   in the draft front-matter. If the browser is unavailable, demand-sense with WebSearch and
   label the numbers as estimates.
3. **Deep research** — WebSearch + WebFetch primary sources; capture real numbers with citations.
   Never fabricate a stat. If sources disagree, say so.
4. **Find the unique insight** — original analysis, first-party experience (Clarity Digital AEO,
   DomainSignal, CommonSpirit $15.21M as *supporting* proof only, never the lead), or a
   defensible contrarian read. Write it as the `insight:` front-matter line.
5. **Draft** to `../drafts/<slug>.md` with front-matter, then body: TL;DR → sections → a summary
   table where useful → **share CTA**. Match Mitchell's voice: dense, evidence-led, no hype.
6. Hand off to `infographic` for the hero visual, then `publish`.

## Draft front-matter template
```
kw: <primary keyword>            # + Semrush volume/difficulty in a comment
kw_secondary: <k1>, <k2>, <k3>
insight: <the one thing readers can't get on page 1 of Google>
cta: Share this with someone who <specific situation>
title: <headline with the KW, no clickbait>
```

## Guardrails
- House rules in `../CLAUDE.md` are binding (no sycophancy; cite; unique insight; viz + CTA).
- Lead with recent/relevant work; old roles are supporting proof only.
- The Stop-hook quality gate will block an incomplete draft — build it complete.
