#!/usr/bin/env python3
"""
Stop-hook quality gate for the Content Studio.

Only acts when an active draft is declared: the Editor writes the draft's path into
`<studio>/.active-draft` when starting a post, and clears it after publishing. If no active
draft, this is a no-op (exit 0) so normal chatting is never blocked.

When active, it checks the draft for the studio's required elements. If any are missing it
returns a Stop-hook block decision (JSON on stdout) with a checklist, so the agent repairs
the post before finishing. Clear `.active-draft` (or pass the gate) to stop.
"""
import os, sys, json, re

studio = os.environ.get("CLAUDE_PROJECT_DIR") or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
marker = os.path.join(studio, ".active-draft")

# read stdin (hook payload) but we don't need it; guard against re-loop
try:
    payload = json.load(sys.stdin)
except Exception:
    payload = {}
if payload.get("stop_hook_active"):
    sys.exit(0)  # already in a stop-hook loop; don't re-block

if not os.path.exists(marker):
    sys.exit(0)  # no active draft → nothing to gate

draft_path = open(marker).read().strip()
if not draft_path or not os.path.exists(draft_path):
    sys.exit(0)

text = open(draft_path, encoding="utf-8").read()
low = text.lower()

checks = {
    "primary keyword (`kw:` front-matter)": bool(re.search(r'^\s*kw:\s*\S', text, re.M)),
    "secondary keywords (`kw_secondary:`)": bool(re.search(r'^\s*kw_secondary:\s*\S', text, re.M)),
    "unique insight (`insight:` line)": bool(re.search(r'^\s*insight:\s*\S', text, re.M)),
    "a data-viz / infographic (`<svg` or `infographic:` or a .png)": (
        "<svg" in low or "infographic:" in low or ".png" in low),
    "a share CTA (`Share this with` or `<!--CTA-->`)": (
        "share this with" in low or "<!--cta-->" in low),
    "sources / links (a Sources section or >=2 links)": (
        "sources" in low or len(re.findall(r'https?://', text)) >= 2),
}
missing = [name for name, ok in checks.items() if not ok]

# soft lint: flag hype/sycophancy words (warn, not block)
hype = [w for w in ("revolutionary", "game-changer", "game changer", "everyone else",
                    "nobody", "broke the internet", "changed everything", "the best ever")
        if w in low]

if missing:
    reason = ("Content Studio quality gate — this draft isn't ready to finish.\n"
              "Missing required elements:\n- " + "\n- ".join(missing) +
              "\nAdd them to " + draft_path + " (see AGENTS.md). "
              "When the post is genuinely done and approved, clear .active-draft.")
    if hype:
        reason += "\nAlso soften hype/sycophancy: " + ", ".join(hype)
    print(json.dumps({"decision": "block", "reason": reason}))
    sys.exit(0)

# passed structural gate; still nudge on hype but allow stop
if hype:
    print(json.dumps({"decision": "block",
                      "reason": "Quality gate passed, but soften these hype/absolute phrases first: "
                                + ", ".join(hype) + " (house rule: no sycophancy/exaggeration)."}))
sys.exit(0)
