post: LinkedIn for 2026-09-24-ads-in-free-llm-answers.blog.md
target: personal
route: manual
attach: content-studio/viz/final/llm-ads-mandala/anim-640x800.gif (upload natively so it animates; still fallback: poster-1080x1350.png)
image_alt: Animated data mandala of five AI assistants (ChatGPT, Google AI Mode, Microsoft Copilot, Perplexity, Meta AI) across three rings: who sees ads, how often ads appear, and what gets cited. The hub reads 5.6% of ChatGPT's weekly users pay; Google AI Mode's citation ring reads 11.53%.
link: https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/?utm_source=linkedin&utm_medium=social&utm_campaign=optimizing-for-ads-in-free-llm-answers
status: draft
approved: no
---
## Post
When Google's AI Mode showed an advertiser's text ad, that advertiser's own domain made the answer's cited sources 11.53% of the time.

Buying the ad doesn't buy the citation. (SE Ranking, June 2026 data.)

And the ad audience is most of ChatGPT: 5.6% of its 900M weekly users pay (OpenAI, February 2026), and ads run on the Free and Go tiers. 25.94% of commercial ChatGPT prompts came back with an ad (SE Ranking, July 2026).

Each assistant sells something different: ChatGPT, self-serve ads; Google, eligibility through campaigns you already run; Copilot, sponsored recommendations; Meta AI, targeting built from chats; Perplexity, nothing since February.

The citation is still earned: primary sources, pages that rank, review profiles, measured assistant by assistant.

The GIF is the rudimentary version of the living artifact. On the blog, click an assistant to see who sees ads there, what you can buy and what still earns a citation:
https://mj2.pro/blog/optimizing-for-ads-in-free-llm-answers/?utm_source=linkedin&utm_medium=social&utm_campaign=optimizing-for-ads-in-free-llm-answers

Share this with someone deciding whether to put budget into ChatGPT ads this quarter.

#AEO #PaidSearch #AISearch
---
## First comment
Sources for the three numbers: SE Ranking's Google AI Mode ads study (50,032 commercial keywords, data 30 June 2026), SE Ranking's ChatGPT ads study (50,006 prompts, data 23 July 2026), and OpenAI's February 2026 figures as reported by TechCrunch. Every other source is listed at the end of the post.
---
## Notes (not posted)
- Nothing has been posted. Copy only; LinkedIn needs Mitch's explicit OK for this exact version. Route is manual (no working `linkedin_post.py --whoami --live` confirmed this session): paste the post, upload the GIF natively, then add the first comment.
- Blog first: the link returns 404 until `/blog/optimizing-for-ads-in-free-llm-answers/` is published.
- Critic fix 2 (24 September 2026): cut from 1,509 to 1,208 characters, link and hashtags included, under the 1,400 cap. The link now sits in the post body because the brief counts it in the post; the linter warns that body links can cost reach (a third-party study, not a LinkedIn statement). The first comment carries the sources instead.
- Three sourced figures, as the brief asked: 11.53% (SE Ranking, Google AI Mode ads study, 50,032 commercial keywords selected to trigger text ads, US, data 30 June 2026, published 14 July 2026), 5.6% (50M paying ÷ 900M weekly users, OpenAI via TechCrunch, 27 February 2026), 25.94% (SE Ranking, ChatGPT ads study, 50,006 prompts, data 23 July 2026, published 10 August 2026). All three were checked against the primary pages this pass.
- "Most of ChatGPT": 900M − 50M paying = 850M on Free (94.4%); if the separately reported 9M+ business users sit inside the 900M, 841M (93.4%). Go subscribers see ads too.
- The one-line rundown reuses only claims from the blog's sourced sections: ChatGPT self-serve ads (Lapis; Top Growth Marketing), Google eligibility through existing campaigns (Google Ads Help), Copilot sponsored recommendations (secondary reporting; the softest line here), Meta AI chat-based targeting (Meta, 1 October 2025), Perplexity's February 2026 exit (ALM Corp).
- The GIF: 640×800, 0.99 MB, loops forever; three slowed renderings (0.70 s beats, 1.50 s holds) then a 50 s still. LinkedIn animates GIFs only when uploaded natively; schedulers flatten them. Some clients clamp long frame delays, which shortens the 50 s pause but doesn't break the loop.
- Timing default from the skill: Tue–Thu 08:00–10:00 ET, after the blog is live. Mitch's personal profile per the header; the M² page is the alternate per his two-profile plan.
- Gate (24 September 2026, after the critic fixes): `check_package.py` PASS, 0 fail, 0 warn. The LinkedIn plugin's `post_linter.py`: 90/100 — SHIP at 1,208 characters. Findings: the body-link reach warning (accepted, per the brief) and the alt-text reminder (alt text is in the header).
