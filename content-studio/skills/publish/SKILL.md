---
name: publish
description: Ship an approved post to mitchjmiller.com (Writing) and LinkedIn. Site deploy is automatic once approved; LinkedIn requires per-post confirmation.
---

# publish

## Preconditions
- Draft passed the Stop-hook quality gate.
- **Mitchell has seen and approved the final piece.** (Outward-facing — never skip.)

## Site (mitchjmiller.com → Writing)
1. Convert the draft body to HTML (marked), inject the infographic SVG(s) and CTA block.
2. Insert a `blogPosts` entry in `../src/lib/data.ts` with `contentHtml` (renderer already
   supports it): `{ slug, title, author: "Mitchell Miller", date, status: "published", teaser,
   contentHtml }`. Keep the HTML backtick-safe (no backticks / `${`).
3. Build + deploy from the repo root:
   ```
   npm run build
   git worktree add /tmp/ghp gh-pages && rsync -a --delete --exclude=.git dist/public/ /tmp/ghp/
   cd /tmp/ghp && git add -A && git commit -m "Deploy: <slug>" && git push origin gh-pages
   git worktree remove /tmp/ghp --force
   ```
4. Verify live: confirm the slug is in the deployed JS bundle + the page renders (SVG + CTA).

## LinkedIn (browser — per-post confirmation REQUIRED)
1. Show Mitchell the final text + the PNG infographic. Get an explicit "post it".
2. In his logged-in Chrome (Claude-in-Chrome): compose a new post, paste the text, attach the
   PNG (or build a carousel from multiple PNGs), add the share CTA + a link to the full post.
   Password manager handles login; never handle the password text.
3. Confirm the post preview matches, then publish. Capture the live URL.
4. Add the LinkedIn URL + first-day engagement note to `../AGENTS.md` learnings.

## Never
- Never auto-post to LinkedIn without a per-post OK. Never enter credentials manually.
- Never publish a post that failed the quality gate or that Mitchell hasn't seen.
