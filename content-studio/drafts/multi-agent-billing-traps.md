kw: claude code subscription billing
kw_secondary: claude agent sdk credits, multi-agent ai stack, claude -p metered billing, third-party harness detection
insight: "Flat-fee" is a property of your auth path and your payload — not your plan. Three silent traps reclassify subscription work to metered API rates, and the durable fix is interactive tmux sessions, not headless `-p`.
cta: Share this with someone running a Claude Max sub inside an agent stack.
title: The Flat-Fee Multi-Agent Stack — and the 3 Billing Traps That Quietly Meter You

---

# The Flat-Fee Multi-Agent Stack — and the 3 Billing Traps That Quietly Meter You

*By Mitchell Miller · ~6 min read · AI engineering / agent ops*

## TL;DR

A pattern has settled across the agent-builder community: run an **orchestrator** (Hermes or Codex) on one subscription, delegate the heavy coding to **Claude Code** on another, glue it together with Telegram and a small always-on box, and pay **two flat monthly fees instead of metered API rates.** It works — until it quietly doesn't. Three things silently reclassify that "flat-fee" work to **per-token API billing**: (1) the June→July 2026 **unbundling** of programmatic usage into a separate metered credit pool, (2) a **headless `-p` routing bug** that billed some users at API rates even with no API key set, and (3) **third-party-harness *string detection*** — a `HERMES.md` in your git history was enough to get one user reclassified and hit with **~$200 in API charges.** The through-line: *flat-fee is a property of your **auth path** and your **payload**, not your plan.* The durable fix is to stop shelling out to `claude -p` and run Claude Code in an **interactive tmux session** the orchestrator monitors.

## The stack everyone converged on

If you've read the r/hermesagent threads, you've seen the same shape over and over:

- **Orchestrator:** Hermes (or Codex/GPT-5.x) on a ChatGPT subscription via OAuth — holds memory, tools, cron, messaging.
- **Coding specialist:** Claude Code, authenticated against a **Claude Max** subscription.
- **Interface:** Telegram, so you can drive it from your phone.
- **Execution:** a NUC / mini-PC / VPS for files, shell, cron, Home Assistant.

The appeal is entirely economic. Both sides authenticate through **OAuth against a subscription**, so nothing meters per token. The orchestrator *shells out* to the `claude` CLI as a subprocess — from Anthropic's side it looks identical to you typing the command yourself. Two flat fees, no API meter. The worst case used to be a rate-limit, not a bill.

That's the part people get right. Here's the part that bites.

<figure style="margin:2rem 0;"><svg viewBox="0 0 780 560" role="img" aria-label="The flat-fee agent stack and its three metering traps" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;">
<rect x="0" y="0" width="780" height="560" rx="14" fill="#0f172a"/>
<text x="30" y="46" fill="#f1f5f9" font-size="25" font-weight="800">Where &#8220;flat-fee&#8221; ends</text>
<text x="30" y="72" fill="#94a3b8" font-size="14">The two-subscription agent stack &#8212; and the 3 traps that switch it to metered API billing</text>
<text x="30" y="110" fill="#10b981" font-size="12" font-weight="800" letter-spacing="0.06em">FLAT-FEE ZONE &#8212; OAUTH / SUBSCRIPTION AUTH</text>
<g font-size="12.5" font-weight="700" text-anchor="middle">
<rect x="30" y="122" width="132" height="52" rx="9" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="96" y="145" fill="#f1f5f9">You + Telegram</text><text x="96" y="162" fill="#94a3b8" font-size="10.5" font-weight="400">phone interface</text>
<rect x="188" y="122" width="150" height="52" rx="9" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="263" y="145" fill="#f1f5f9">Orchestrator</text><text x="263" y="162" fill="#94a3b8" font-size="10.5" font-weight="400">Codex / Hermes (OAuth)</text>
<rect x="364" y="122" width="160" height="52" rx="9" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="444" y="145" fill="#f1f5f9">Claude Code</text><text x="444" y="162" fill="#94a3b8" font-size="10.5" font-weight="400">interactive, Max sub</text>
<rect x="550" y="122" width="132" height="52" rx="9" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/><text x="616" y="145" fill="#f1f5f9">Local box</text><text x="616" y="162" fill="#94a3b8" font-size="10.5" font-weight="400">files, shell, cron</text>
</g>
<g stroke="#10b981" stroke-width="2" fill="none"><path d="M162 148 H188"/><path d="M338 148 H364"/><path d="M524 148 H550"/></g>
<line x1="30" y1="205" x2="750" y2="205" stroke="#334155" stroke-width="1" stroke-dasharray="5 5"/>
<text x="30" y="232" fill="#ef4444" font-size="12" font-weight="800" letter-spacing="0.06em">&#9888; THE METER STARTS HERE &#8212; 3 WAYS SUBSCRIPTION WORK GETS RECLASSIFIED TO API RATES</text>
<g>
<rect x="30" y="248" width="232" height="150" rx="10" fill="#1e293b"/><rect x="30" y="248" width="4" height="150" rx="2" fill="#ef4444"/>
<text x="48" y="276" fill="#f1f5f9" font-size="14" font-weight="800">1 &#183; Programmatic unbundling</text>
<text x="48" y="300" fill="#94a3b8" font-size="12"><tspan x="48" dy="0">claude -p &amp; the Agent SDK now</tspan><tspan x="48" dy="17">draw from a separate metered</tspan><tspan x="48" dy="17">credit pool ($20 / $100 / $200).</tspan></text>
<text x="48" y="372" fill="#f59e0b" font-size="11.5" font-weight="700"><tspan x="48" dy="0">Announced May 14 &#8594; paused</tspan><tspan x="48" dy="15">Jun 15 &#8594; live ~Jul 10, 2026.</tspan></text>
<rect x="274" y="248" width="232" height="150" rx="10" fill="#1e293b"/><rect x="274" y="248" width="4" height="150" rx="2" fill="#ef4444"/>
<text x="292" y="276" fill="#f1f5f9" font-size="14" font-weight="800">2 &#183; Headless -p bug</text>
<text x="292" y="300" fill="#94a3b8" font-size="12"><tspan x="292" dy="0">-p silently routed to API</tspan><tspan x="292" dy="17">billing for some users &#8212; even</tspan><tspan x="292" dy="17">with no API key set.</tspan></text>
<text x="292" y="372" fill="#f59e0b" font-size="11.5" font-weight="700"><tspan x="292" dy="0">Sub usage looks normal while</tspan><tspan x="292" dy="15">charges accrue elsewhere.</tspan></text>
<rect x="518" y="248" width="232" height="150" rx="10" fill="#1e293b"/><rect x="518" y="248" width="4" height="150" rx="2" fill="#ef4444"/>
<text x="536" y="276" fill="#f1f5f9" font-size="14" font-weight="800">3 &#183; Harness string detection</text>
<text x="536" y="300" fill="#94a3b8" font-size="12"><tspan x="536" dy="0">HERMES.md / OpenClaw in your</tspan><tspan x="536" dy="17">git history &#8594; flagged as a 3rd-</tspan><tspan x="536" dy="17">party harness &#8594; API rates.</tspan></text>
<text x="536" y="372" fill="#f87171" font-size="11.5" font-weight="800"><tspan x="536" dy="0">One case: ~$200 surprise bill</tspan><tspan x="536" dy="15">from a commit message.</tspan></text>
</g>
<rect x="30" y="424" width="720" height="74" rx="10" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
<text x="50" y="448" fill="#10b981" font-size="14" font-weight="800">&#10003; The durable fix</text>
<text x="50" y="470" fill="#f1f5f9" font-size="13">Run Claude Code in an <tspan font-weight="700">interactive tmux session</tspan> &#8212; it stays on your subscription.</text>
<text x="50" y="489" fill="#f1f5f9" font-size="13">Avoid headless <tspan font-weight="700">-p</tspan>; grep your git history for harness strings (HERMES.md / OpenClaw).</text>
<text x="30" y="524" fill="#94a3b8" font-size="10.5">Sources: Anthropic support; TechTimes; koromo; Tygart Media; r/hermesagent.</text>
</svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">The two-subscription agent stack and the three ways subscription work silently becomes metered API billing.</figcaption></figure>

## Trap 1 — Programmatic usage got unbundled (and it's live now)

On **May 14, 2026**, Anthropic announced that starting June 15, **Agent SDK and `claude -p`** usage would stop drawing from the subscription pool and instead consume a **separate monthly credit** billed at API list rates ($20 Pro / $100 Max 5× / $200 Max 20×). Then the timeline got confusing: the change was **paused on June 15**, and then **quietly went live around July 10, 2026.**

So as of now, the important line is: **interactive Claude Code in the terminal still runs on your subscription. Anything *programmatic* — `claude -p`, the Agent SDK, GitHub Actions, third-party harnesses on subscription auth — draws from the metered credit pool.** The exact thing that makes the "flat-fee orchestrator shells out to `claude -p`" pattern convenient is the thing that now meters.

## Trap 2 — The headless `-p` silent-routing bug

Independent of policy, there was a **bug**: `claude -p` headless mode silently routed to **API billing for some users even with no `ANTHROPIC_API_KEY` set.** If your orchestrator fires dozens of `claude -p` calls a day, a silent misroute doesn't rate-limit you — it *bills* you, and you find out on the invoice. The tell is that your subscription usage looks normal while charges accrue on a separate track.

## Trap 3 — Harness *string* detection (the expensive one)

This is the trap most people miss. Anthropic runs logic to detect **third-party harnesses** and route them to API billing. The problem: it can fire on a **string**, not on an actual harness running. Claude Code pulls your **`git status` and recent commit messages into its system prompt** for context — so a file literally named **`HERMES.md`**, or an `OpenClaw` reference sitting in some JSON, was enough to get flagged. One documented case: **~$200 in surprise API charges** because "HERMES.md" showed up in a commit. Anthropic acknowledged it as a bug and refunded, but only after it went public.

The uncomfortable implication for this community specifically: **naming your orchestrator files after a known harness can become a billing input.** Your git history is now a billing surface.

## The fix: interactive over headless

The pattern the community landed on after the announcement is simple and durable: **don't shell out to `claude -p`.** Instead, have the orchestrator **launch Claude Code in an interactive `tmux` session** and monitor it. Interactive terminal usage stays on the subscription; you also get to peek at live progress. It's slightly more setup than a one-shot subprocess call, but it's the difference between flat-fee and metered.

| Trap | What it does | Guardrail |
|---|---|---|
| **Programmatic unbundling** (live ~Jul 2026) | `claude -p` / Agent SDK meter against a separate credit pool | Use **interactive tmux** sessions, not `-p`; watch the credit balance |
| **Headless `-p` routing bug** | Silently bills API even with no key set | `claude /status`; check the console for unexpected API usage |
| **Harness string detection** | `HERMES.md`/`OpenClaw` in git → reclassified to API | Grep history for harness strings; use neutral filenames (`orchestrator.md`) |

## The one-line takeaway

**"Flat-fee" isn't a plan you buy — it's a path you protect.** Subscription vs. metered is decided by *how* the call is made (interactive vs. headless/SDK) and *what's in the payload* (harness signatures in your git state), not by which tier you pay for. Audit both, and the two-sub pattern still holds.

<!--CTA-->
> **Found this useful?** Share this with someone running a Claude Max sub inside an agent stack — the git-history billing trap is the one that gets people. And if you want the deeper dive on the `HERMES.md` detection bug, I broke it down [here](https://mitchjmiller.com/blog/studying/claude-watermark-seo).

## Sources

- Anthropic support: [Use the Claude Agent SDK with your Claude plan](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)
- [Anthropic Ends Subscription Subsidy for Agents June 15 (TechTimes)](https://www.techtimes.com/articles/317625/20260602/anthropic-ends-subscription-subsidy-agents-june-15-credit-pool-replaces-flat-rate-access.htm)
- [Claude Agent SDK Credit Guide (koromo)](https://koromo.io/en/blog/claude-agent-sdk-credit-guide/)
- [Claude Code Billing in 2026 (Tygart Media)](https://tygartmedia.com/claude-code-billing-credit-pool-2026/)
- Community pattern + billing anecdotes: r/hermesagent multi-agent setup threads.
