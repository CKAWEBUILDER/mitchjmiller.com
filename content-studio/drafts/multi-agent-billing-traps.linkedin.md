You can run a full multi-agent AI stack on two flat-fee subscriptions instead of metered API rates.

Then, quietly, you can't.

The setup a lot of builders have converged on: an orchestrator (Codex or Hermes) on one subscription, Claude Code as the coding specialist on another, Telegram as the interface, a mini-PC doing the work. Both sides authenticate via OAuth, so nothing meters per token. Two flat fees.

But three things silently reclassify that work to per-token API billing:

1. Programmatic unbundling — as of ~July 2026, `claude -p` and the Agent SDK draw from a separate metered credit pool, not your subscription.

2. A headless `-p` routing bug — billed some users at API rates even with no API key set. Subscription usage looks normal while charges accrue elsewhere.

3. Harness string detection — a file named HERMES.md in your git history was enough to get one user flagged as a third-party harness and hit with ~$200 in surprise API charges. Your commit messages are now a billing surface.

The pattern underneath: "flat-fee" isn't a plan you buy — it's a path you protect. Subscription vs. metered is decided by how the call is made (interactive vs. headless) and what's in your payload (harness signatures in git), not your tier.

The durable fix: run Claude Code in an interactive tmux session instead of shelling out to `-p`, and grep your git history for harness strings.

Full breakdown + the verified May→June→July 2026 timeline (announced → paused → live): https://mitchjmiller.com/blog/multi-agent-billing-traps

♻️ Share this with someone running a Claude Max sub inside an agent stack — the git-history trap is the one that gets people.

#AIengineering #ClaudeCode #AIagents #LLMOps #AgenticAI
