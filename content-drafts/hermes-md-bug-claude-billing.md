# The `hermes.md` Bug: How a Filename Quietly Rerouted a Claude Max User to Pay-Per-Token Billing

*By Mitchell Miller · draft · ~7 min read*

> **The short version:** A Claude Max subscriber ($200/month) got hit with an extra **$200.98 in API charges** they never opted into. The trigger wasn't overuse — it was a *string in their git history*. Anthropic's system for detecting third-party "harnesses" pattern-matched the filename **`hermes.md`**, decided a non-Anthropic framework was driving the session, and silently switched their billing from flat-rate subscription to metered API pricing **mid-session, with no warning.** Anthropic confirmed it was a bug and refunded them. I went looking in my own repos — and the exact trigger string is all over mine.

---

## What actually happened

Claude Code, like most coding agents, pulls **`git status` and recent commit messages into its system prompt** so the model has project context. Useful — until it isn't.

Somewhere in Anthropic's stack sits logic meant to catch people running Claude through **third-party harnesses** (community wrappers like the ones nicknamed *Hermes* or *OpenClaw*) and route *those* sessions to per-token API billing instead of the flat Max subscription. Reasonable intent: subscriptions aren't meant to subsidize someone reselling capacity through a wrapper.

The bug: **the detector fired on the mere presence of the string, not on an actual harness running.** One user had a file called `hermes.md` in their history. Another had `OpenClaw` sitting in some JSON. Neither was running a third-party harness. Both got reclassified to API pricing anyway — silently, mid-session.

According to the reporting (MindStudio's writeup, plus the original Reddit thread that hit ~1.4M views and a follow-on from Theo Browne with ~1M more), an Anthropic engineer (Tariq) acknowledged it directly:

> *"Sorry, this was a bug with the third-party harness detection and how we pull git status into the system prompt."* — as reported

Refunds went out — the original charge **plus another month of credit** — but only **after the post went viral.** The first support reply had been a flat denial: *"we are unable to issue compensation for degraded service or technical errors that result in incorrect billing routing"* (as reported).

## Why this one matters more than a normal bug

Three things make this worse than "a billing glitch":

1. **It was silent.** There was no *"you're about to be billed at API rates"* prompt. The switch happened inside a session already in progress.
2. **The dashboard lied by omission.** Usage metrics showed normal consumption while API charges accrued on a separate track. You couldn't see it by watching the meter you were told to watch.
3. **The trigger was invisible to the user.** Nobody thinks a *filename from six months ago* is a billing input. This is context you didn't know was context.

That third point is the real lesson, and it's bigger than one bug: **your git history is now a billing surface.** When agents silently ingest `git status`, commit messages, and filenames, anything in there can become an input to a heuristic you can't see and didn't consent to.

## The part that made me sit up: I'm exposed

My primary AI agent is named **Hermes**. I named it that long before this bug existed. So I ran the check on my own control-tower repo:

```bash
git log --oneline | grep -iE "hermes|harness|openclaw"
git ls-files | grep -iE "hermes.*\.md"
```

Results, abridged:

```
198f400 Add Control Tower ops docs, Hermes identity, and handoffs
docs/hermes-identity.md
automation/agent-runtime/hermes-routing-architecture.md
HERMES_OPS_HANDOFF_2026-05-27.md
```

Tracked files literally named `hermes-*.md`, and "Hermes" in commit subjects that get pulled into the system prompt every session. I run Claude Code on Max, in this repo, daily. On the reported trigger logic, that's the false-positive waiting to happen. **If you've ever named an agent, a runbook, or a doc after a known wrapper — you should assume you're in the blast radius too.**

## Protect yourself: a 5-minute audit

```bash
# 1. Does your history contain known-harness trigger strings?
git log --all --oneline | grep -iE "hermes|openclaw|harness|owl"
git ls-files | grep -iE "hermes|openclaw|harness"
```

If it does, you don't necessarily need to rewrite history (that's disruptive and rarely worth it), but you should:

- **Watch the right number.** Check your **API/console billing** separately from the subscription usage meter. The metered charges show up there, not on the plan dashboard.
- **Screenshot anomalies immediately.** The users who got refunded did it with *technical specificity* — exact amounts, timestamps, the reroute behavior. Vague complaints got denied; precise ones got paid.
- **Know the token economics** so a surprise bill is legible. At the reported Opus rates (**$5 / million input, $25 / million output**), an agentic session chewing millions of tokens across retries is real money, fast.
- **Consider renaming going forward.** For new projects, a neutral internal name (`orchestrator.md`, not `hermes.md`) sidesteps the whole class of false-positive. Cheap insurance.

## The uncomfortable systemic read

Two industry currents collide here:

- **Agents silently ingest your environment** — git state, filenames, open files — as "context." That's what makes them useful.
- **Providers run invisible heuristics on that context** — here, for billing classification.

When those two meet with **no disclosure and no confirmation step**, you get exactly this: a consequential, irreversible-feeling action (a charge) fired by an input the user never knew was live, caught only because it went viral. Anthropic did the right thing once it was public. But "it got fixed after 1.4M views" is not a billing-safety model you want to rely on.

The clean-hands version of this feature is obvious and worth asking for loudly: **if a session is about to be reclassified to metered billing, say so, in-session, and require a click.** Detection heuristics will always have false positives. Silent money movement on a false positive is the part that shouldn't ship.

## Takeaways

- **Your git history is a billing surface now.** Filenames and commit messages get pulled into the system prompt and can trip provider-side heuristics you can't see.
- **The `hermes.md` bug reclassified Max subscribers to API pricing on a string match** — no warning, dashboard looked normal, ~$200 surprise. Anthropic confirmed the bug and refunded, after it went viral.
- **Audit yourself in 5 minutes:** grep your history for `hermes`/`openclaw`/`harness`, watch the console billing meter (not just the plan meter), and screenshot anomalies with specifics.
- **The fix that should exist:** in-session disclosure + explicit consent before any billing-mode switch. Ask for it.
- **Own your context.** The more your agent ingests automatically, the more of your environment becomes an input to systems you don't control. Name things deliberately.

---

*Sources: MindStudio's writeup of the incident; the original Reddit thread and Theo Browne's follow-up; Anthropic's public acknowledgment (Tariq). Figures and quotes are as reported in those; I've added my own exposure audit and analysis. Not affiliated with Anthropic.*
