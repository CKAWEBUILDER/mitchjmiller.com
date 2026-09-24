# Site standards

Mitch's standing instruction, 2026-09-24. Applies to every page on mj2.pro and every post, on every branch that can reach production. The first implementation is briefed in [handoffs/2026-09-24-site-standards-build.md](../handoffs/2026-09-24-site-standards-build.md).

## Share cards (every page)
- Every page ships `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image`, `og:image:alt`, plus `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`. Add `twitter:site` once Mitch's X handle is known.
- `og:image`: static PNG or JPG, 1200×630, under 5 MB, absolute URL, specific to the page wherever the page has its own subject. The site default is an M² brand card.
- Never Mitch's photo as a share image, logo or favicon.

## Post heroes
- Every post has a hero image, and its static form is the post's `og:image`.
- Alternate two hero types across posts and compare them: (a) an animated data-viz artifact that explains the whole post (`og:image` = its poster frame; the on-page animation has a pause control and honours `prefers-reduced-motion`), or (b) a relevant, professional, on-brand, rights-cleared image.
- File names are lowercase kebab-case and say what the image shows (`ai-visibility-salesforce-account-page.png`). Alt text states what the image shows, including the key number for data images.
- Log the hero type and share performance per post in `content-studio/trends-log.md`; pick a default after six posts.

## Brand mark
- The M² logo replaces the selfie logo and every favicon file (ico, png, svg, apple-touch-icon) once Mitch supplies the final file. Never choose among the unapproved options in `public/review-assets/brand-options/`.

## Themes
- Light and dark. Default to the visitor's system setting; an accessible toggle (a button with `aria-pressed`, keyboard operable) overrides it and is remembered (storage wrapped in try/catch). No flash of the wrong theme on load. WCAG AA contrast in both themes. Self-contained infographics keep their own palette.

## Languages
- English is canonical. Spanish is the pilot. Add more languages only on pilot evidence (Search Console impressions and clicks by language and country after 60–90 days). Next candidates: German (needs an Impressum), Japanese, Korean, Chinese (decide Simplified vs Traditional first). Tagalog is not planned: English is the Philippines' business language, so that audience is already served.
- URL pattern `/es/<same path>`. `<html lang>` is correct on every page. Every page carries a self-referencing hreflang, reciprocal hreflang for each translation that exists, and `x-default` pointing to English. Never hreflang to a page that doesn't exist.
- Header language picker: a globe icon plus language names in their own script ("English", "Español"). No flags: a flag is a country, not a language.
- Suggest, never redirect. If the browser's preferred languages (`navigator.languages`) include one the current page is translated into, show a dismissible banner linking to that version and remember the choice. No automatic redirect by IP or browser language: Google Search Central advises against it because it hides versions from users and crawlers.
- Translations use a neutral Latin American Spanish register. Terms Spanish-speaking marketers use in English (SEO, AEO, CRM) stay in English. A model drafts, an independent second pass reviews, and the route manifest marks reviewed pages. Legal and privacy pages stay English until professionally translated.

## Accessibility (WCAG 2.2 AA baseline)
- Skip link, landmarks, one h1, logical headings, visible focus, labelled controls and forms, alt text, captions or transcripts for media, reduced motion, a pause control for anything that animates longer than five seconds, 44×44 px touch targets where practical.
- Every post has a narrated audio file (mono AAC, about 48 kbps) and a labelled "Listen to this article (N min)" control near the top. The article text is the transcript. Translated posts get narration in their language.
- Audit every template with axe before release: zero serious or critical violations.

## Later
- Meet the team: a page for the AI personas that do the work, each with role, responsibilities, skills, tools, plugins, personality and influences (for example Matt Pocock and other practitioners committed to ethical growth). Influences are credited as inspiration with links, never as endorsement, and no real person's photo or likeness is used.
