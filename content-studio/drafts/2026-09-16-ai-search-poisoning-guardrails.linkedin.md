# LinkedIn — AI search poisoning vs guardrails (living infographic)

Status: DRAFT ONLY. Not posted. Show Mitch before anything goes out (house rule #6: outward-facing = confirm, never auto-publish to LinkedIn).

Voice: first-person, direct, no hype, no emojis.

---

## Post

One rewritten web page. Four other sources left alone. The AI answer moved toward the planted false claim 55.7% of the time.

That's from Counter-GEO-Bench, a new EMNLP 2026 paper. The attacks used the moves in every GEO playbook: authority, citations, fresh dates, extractable structure.

Then the researchers tested four defenses on three open-weight models:

→ The two safety-filter guardrails cut attack success by 3.2 points at most.
→ On Llama-4, Granite Guardian made it worse: answers that fully repeated the lie went from 89 to 120 out of 247.
→ NeMo Self-Check scored 0.4% on Llama-4 by refusing 98.4% of clean questions too.
→ A purpose-built 184M-parameter detector cut attack success to 29.2%. It flagged honest GEO rewrites at 2.16%, about the same as untouched pages (2.30%).

The takeaway for anyone doing GEO for a living: in this test, the defense that worked didn't penalize honest optimization. The limits matter too. It's 247 English queries on open-weight models, not a measurement of any live answer engine.

The image here is the static version of a living artifact. On the site you can pick any defense and any model and watch the comparison re-run, with every number linked to its table.

https://mitchjmiller.com/viz/ai-search-poisoning-guardrails/

Share this with someone who runs a RAG pipeline and assumes the safety filter covers planted misinformation.

#AEO #GEO #AISearch #LLMSecurity #RAG

---

**Notes (not part of the post):**

- **Link status.** `https://mitchjmiller.com/viz/ai-search-poisoning-guardrails/` matches the artifact's `meta.liveUrl`, but it is **not live yet**. Don't post until the artifact is published, or swap in the blog URL (`https://mitchjmiller.com/blog/ai-search-poisoning-guardrails/`) once that's live. Your call.
- **File to attach.** Default is the animated GIF, `content-studio/viz/ai-search-poisoning-guardrails/exports/ai-search-poisoning-guardrails-640x640.gif` (≈2.2 MB, well under LinkedIn's ~7.8 MB animation ceiling; native upload only, since schedulers flatten GIFs). Fallback is the portrait PNG, `…-poster-1200x1500.png` (≈1.1 MB). Also available: `…-poster-1080x1080.png` (square) and `…-poster.pdf` (single page, so it's not a carousel).
- **Visual layer.** The exports use the kit look you rejected on Sept 15, so re-export after you pick a direction from `viz/directions/`. The data carries over unchanged.
- **Numbers.** Every figure traces to the blog draft's fact ledger and to `research/2026-09-16/geo-defenses/data.json`. "Answers that fully repeated the lie" is the paper's full-success outcome (judge score 1.0), Table 18.
- **Disclosure.** The benchmark used Claude Sonnet 4.6 as rewriter and Claude Opus 4.6 as judge. The disclosure is in the blog post; add it here too if you want it on LinkedIn (+1 line).
- **Character count.** ≈1,420, under LinkedIn's 3,000 limit. The hook sits within the ~210 characters shown before "see more".
