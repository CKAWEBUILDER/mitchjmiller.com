import { publicPath } from "./paths";

export const caseStudies = [
  {
    slug: "apple-seasonal-search",
    title: "Apple Seasonal Search",
    thesis: "Enterprise SEO program across Apple seasonal commerce surfaces",
    role: "SEO Program Manager, Americas",
    context: "Apple.com-scale organic search across US, Canada, Mexico, Brazil",
    problem: "Seasonal commerce surfaces (holiday, Mother's Day, back to school, education) needed search strategy, rendering fixes, and executive alignment",
    system: "Demand research, international SEO (hreflang), JS rendering/indexation remediation, evergreen content strategy, stakeholder readouts to 60+ audiences",
    partners: "Engineering, design, marketing, regional teams",
    tools: "GSC, Screaming Frog, internal tooling",
    proof: "Secured engineering roadmap prioritization, presented seasonal search strategy to 60+ stakeholder audiences, and added AI search considerations to the long-term roadmap.",
    showsHiringManagers: "Ability to operate at massive enterprise scale, influence engineering without reporting authority, and present to large executive stakeholder groups.",
    placeholder: "Placeholder: Apple seasonal commerce screenshot — Apple Holiday Gift Guide"
  },
  {
    slug: "apple-store-amr",
    title: "Apple Store AMR",
    thesis: "Seasonal merchandising SEO for the Americas",
    role: "SEO Program Manager, Americas",
    context: "Apple.com/store Americas region",
    problem: "Needed consistent seasonal merchandising visibility across multiple locales and languages.",
    system: "Coordinated merchandising updates, locale architecture mapping, and evergreen URLs.",
    partners: "Merchandising, Engineering",
    tools: "Internal CMS, GSC",
    proof: "Coordinated seasonal SEO updates across Americas store surfaces, including locale checks, rendering QA, and launch support.",
    showsHiringManagers: "Experience managing complex locale architectures for global ecommerce.",
    placeholder: "Placeholder: apple.com/store seasonal AMR merchandising screenshot"
  },
  {
    slug: "apple-education-store",
    title: "Apple Education Store",
    thesis: "Back-to-school search optimization",
    role: "SEO Program Manager, Americas",
    context: "Apple Education Store",
    problem: "High-stakes seasonal peak requiring flawless execution.",
    system: "Pre-launch audits, rendering checks, and demand forecasting.",
    partners: "Education Marketing, Engineering",
    tools: "GSC, Screaming Frog",
    proof: "Supported back-to-school launch readiness with demand forecasting, pre-launch audits, and rendering/indexation checks.",
    showsHiringManagers: "Ability to handle high-stakes, time-sensitive enterprise campaigns.",
    placeholder: "Placeholder: Apple Education Store back-to-school screenshot"
  },
  {
    slug: "stanford-myhealth-seo",
    title: "Stanford MyHealth SEO",
    thesis: "Full-funnel paid and organic search for regulated academic healthcare",
    role: "Interim SEO/SEM Manager",
    context: "Stanford Health Care, regulated academic healthcare, MyHealth mobile app",
    problem: "High-value clinical service lines needed full-funnel search coverage; AI-driven search behavior shifting query patterns",
    system: "Budget/measurement ownership, keyword strategy, campaign taxonomy restructuring, cross-functional content/UX/clinical strategy work",
    partners: "Content, UX, Clinical Strategy",
    tools: "GA4, Google Ads, Bing Ads, GSC, Semrush",
    proof: "Restructured paid and organic search coverage for clinical service lines as patient search behavior shifted toward AI-assisted discovery.",
    showsHiringManagers: "Experience navigating HIPAA-compliant environments and balancing paid/organic strategy.",
    placeholder: "Placeholder: Stanford Health Care MyHealth mobile app screenshot"
  },
  {
    slug: "commonspirit-locations-conversion-engine",
    title: "Dignity Health Yext Location Conversion Engine",
    thesis: "Programmatic SEO and conversion infrastructure across 1,000+ healthcare location pages",
    role: "Product Manager, SEO & Web Analytics",
    context: "Dignity Health, 2018-2019 build period, nine service areas, 1,000+ locations, 20+ regional markets",
    problem: "Dignity Health operated like nine regional web experiences with inconsistent templates, local governance, conversion paths, SEO architecture, and location data. Legacy Sitecore publishing constraints made it difficult to scale clean patient-action pages, and Google often lacked enough structured location context to match the right specialty, facility, or market to the right local search intent.",
    system: "Developed a 1,000+ page Yext location conversion system driven by the SEO team and built cross-functionally with design, analytics, internal data owners, regional stakeholders, and Yext engineering; used Yext Pages, parent/child entity architecture, reusable templates, structured data, database uploads, and feed pushes to create scalable location pages outside the legacy CMS bottleneck; standardized NAP, specialty, service-area, and location metadata so Google, Apple Maps, Siri, Alexa, and other publishers could understand each entity and market; connected the page system to appointment, call, direction, and location-action measurement so SEO could claim attributable patient-acquisition value.",
    partners: "SEO, analytics, design, data owners, Yext engineering, regional market teams",
    tools: "Yext Pages, Yext Knowledge Graph, Sitecore, Adobe Analytics, GA4, GSC, Python/SQL/BigQuery, database uploads",
    proof: "Estimated 60-80% share of tracked location actions within months of launch, across calls, directions, appointment starts, and booking pathways depending on metric and reporting window; the system continued compounding into later CommonSpirit reporting, including 175K calls/directions, 88K appointments, and $15.21M FY22 attributable revenue",
    showsHiringManagers: "End-to-end product ownership linking programmatic SEO, entity architecture, CRO, analytics, and cross-functional execution to measurable patient-acquisition value.",
    placeholder: "Placeholder: locations.dignityhealth.org multi-brand conversion engine screenshot"
  },
  {
    slug: "commonspirit-network-consolidation",
    title: "CommonSpirit Network Consolidation",
    thesis: "Analytics and SEO preservation during massive health system merger",
    role: "PM, SEO & Web Analytics",
    context: "CHI-Dignity Health merger, 63+ site consolidation",
    problem: "Post-merger web fragmentation, analytics infrastructure dissolution, migration risk",
    system: "20+ enterprise migrations with technical requirements, stakeholder coordination, post-launch audits; analytics product ownership through org restructure; organic sessions from 2.65M to 4.9M+ across tenure",
    partners: "IT, Marketing, Regional Executives",
    tools: "Adobe Analytics, GA4, Screaming Frog",
    proof: "Organic sessions increased from 2.65M to 4.9M+ while 20+ site migrations and post-merger analytics changes were underway.",
    showsHiringManagers: "Resilience and strategic vision during chaotic enterprise mergers.",
    placeholder: "Placeholder: CommonSpirit Health post-merger network consolidation screenshot"
  },
  {
    slug: "commonspirit-medical-content-library",
    title: "Dignity Health Conditions & Treatments Library",
    thesis: "Competitive-intelligence content library that became AEM migration leverage",
    role: "PM, SEO & Web Analytics",
    context: "Dignity Health / CommonSpirit patient-acquisition content system",
    problem: "No unified SEO content strategy for conditions and treatments; 60+ legacy CMS environments had inconsistent structure; content capacity was limited to 5-6 new articles per month while WebMD, Mayo Clinic, Cleveland Clinic, and other medical-library competitors owned symptom and treatment intent.",
    system: "Proposed the initiative in PI planning to 70+ stakeholders; crawled competitor medical libraries against a 10,000-term condition/treatment universe; sorted opportunities by monthly search volume, competition, service-line alignment, and publication effort; converted the resulting glossary/library strategy into modular AEM content fragments with reusable metadata, summaries, FAQ/schema fields, and local-market variations.",
    partners: "Content strategy, medical reviewers, engineering, product, regional market leaders",
    tools: "Screaming Frog, Semrush, CMS, AEM content fragments, schema markup, keyword and competitor crawls",
    proof: "Earned 80%+ stakeholder buy-in; the library later generated 1M+ organic visits/year and gave 34 healthcare markets a concrete reason to adopt AEM content fragments.",
    showsHiringManagers: "Ability to turn data science-style opportunity sizing into a scalable content product, then use that product as change-management leverage for enterprise platform migration.",
    placeholder: "Placeholder: CommonSpirit Health medical content library screenshot"
  },
  {
    slug: "aem-content-fragmentation-architecture",
    title: "AEM Content Fragmentation Architecture",
    thesis: "Turned the Conditions & Treatments library into a modular AEM adoption case",
    role: "PM, SEO & Web Analytics",
    context: "Adobe Experience Manager migration strategy",
    problem: "Top-down migration mandate faced regional resistance across 60+ unique websites; markets needed a practical reason to move, not another abstract platform directive.",
    system: "Turned the Conditions & Treatments glossary into a modular AEM content-fragment model: reusable titles, descriptions, summaries, FAQ/schema fields, taxonomy, and regional variations. The demo showed how markets could localize service-line content while preserving SEO governance and reducing duplicated CMS work.",
    partners: "Adobe Architects, Regional Leaders",
    tools: "AEM, Data mapping",
    proof: "Gave regional teams a reusable content model with titles, summaries, FAQ/schema fields, taxonomy, and local-market variations instead of a generic migration mandate.",
    showsHiringManagers: "Technical fluency with AEM and ability to translate engineering capabilities into executive and market-level business value.",
    placeholder: "Placeholder: Adobe Experience Manager content fragmentation architecture screenshot"
  },
  {
    slug: "yext-entity-data-foundation",
    title: "Yext Entity Data Foundation",
    thesis: "Network-wide entity cleanup and syndication",
    role: "PM, SEO & Web Analytics",
    context: "1,000+ location network, Dignity Health",
    problem: "Duplicate listings, NAP inconsistency, no publisher network coverage",
    system: "NAP cleanup, duplicate suppression, entity management, syndication to Google, Apple Maps, Siri, Alexa, Bing, Yelp",
    partners: "Yext, Local Operations",
    tools: "Yext",
    proof: "Cleaned duplicate listings, standardized NAP data, and syndicated location entities across Google, Apple Maps, Siri, Alexa, Bing, and Yelp.",
    showsHiringManagers: "Mastery of local SEO and entity data management at scale.",
    placeholder: "Placeholder: Yext network-wide entity data cleanup screenshot"
  },
  {
    slug: "claritypulse-ai-reporting",
    title: "ClarityPulse",
    thesis: "Personal AI reporting prototype: GA4, GSC, ads data → source-backed narratives",
    role: "Builder / AI Practitioner",
    context: "Personal AI reporting prototype built and used internally at Clarity Digital",
    problem: "Client reporting was manual, time-consuming, inconsistent; no single surface connected GA4, GSC, ads, SEO data into a narrative",
    system: "Built internal AI product with modules: header (generated time, client, source freshness, QA state), KPI cards with raw values and deltas, executive narrative with evidence tags, trend chart, risk/action queue table, source health, export lock / low-confidence review state",
    partners: "Internal Agency Teams",
    tools: "Python, LLM APIs, GA4/GSC APIs",
    proof: "Converted GA4, GSC, ads, and SEO data into KPI cards, source-backed narratives, risk queues, and export-ready weekly briefs.",
    showsHiringManagers: "Ability to prototype AI tools that solve real operational bottlenecks.",
    placeholder: "Placeholder: ClarityPulse internal dashboard mockup",
    image: publicPath("/images/claritypulse-dashboard.png"),
    isMockup: true
  },
  {
    slug: "searchforge-content-intelligence",
    title: "SearchForge",
    thesis: "AI content intelligence for entity-driven brief generation",
    role: "Builder / AI Practitioner",
    context: "Personal AI content intelligence prototype",
    problem: "Content briefs were generic; entity gaps and topical authority gaps were identified manually",
    system: "AI system for briefs, entity gap detection, topic clusters, schema generation, FAQs, source/citation targets, editorial QA",
    partners: "Content Teams",
    tools: "Python, Search APIs, LLMs",
    proof: "Automated entity gaps, topic clusters, schema prompts, FAQs, source targets, and editorial QA for SEO content briefs.",
    showsHiringManagers: "Deep understanding of how AI can scale high-quality SEO content operations.",
    placeholder: "Placeholder: SearchForge content intelligence screen",
    image: publicPath("/images/searchforge-dashboard.png")
  },
  {
    slug: "actionthread-transcript-execution",
    title: "ActionThread",
    thesis: "AI transcript-to-execution workflow automation",
    role: "Builder / AI Practitioner",
    context: "Personal AI workflow automation prototype",
    problem: "Post-call follow-up was manual, inconsistent, and created execution debt",
    system: "Transcript → summary → decisions → owners → deadlines → follow-up tasks and task updates",
    partners: "Project Management",
    tools: "Whisper, LLMs, Task Management APIs",
    proof: "Converted transcripts into owner-tagged follow-ups, decisions, deadlines, and task updates.",
    showsHiringManagers: "Focus on operational velocity and practical AI workflow automation.",
    placeholder: "Placeholder: ActionThread transcript-to-execution screen",
    image: publicPath("/images/actionthread-dashboard.png")
  },
  {
    slug: "aeo-visibility-infrastructure",
    title: "AEO Visibility Infrastructure",
    thesis: "Measurement system for brand visibility in AI search engines",
    role: "Builder / AI Practitioner",
    context: "AEO/GEO measurement system built at Clarity Digital",
    problem: "No measurement for brand visibility in AI search engines",
    system: "Prompt-set monitoring, citation velocity, AI share-of-voice, competitor gap analysis, source coverage tracking, prioritized fix queue across ChatGPT, Perplexity, Google AI Overviews",
    partners: "SEO Strategists",
    tools: "Profound, Custom Scripts",
    proof: "Built prompt-set tracking for AI citation share, competitor visibility, source inclusion, and prioritized fix queues.",
    showsHiringManagers: "Forward-thinking approach to the next generation of search visibility.",
    placeholder: "Placeholder: AEO Visibility Infrastructure dashboard"
  },
  {
    slug: "domainsignal",
    title: "DomainSignal",
    thesis: "AI-driven domain authority and intelligence platform",
    role: "Solo Builder",
    context: "Personal AI side project / solo build",
    problem: "Needed better ways to score and aggregate domain intelligence signals.",
    system: "Scoring models, targeted data sources, and feedback-loop refinement",
    partners: "None",
    tools: "Python, Data APIs, LLMs",
    proof: "Built a working domain-evaluation prototype using scoring models, targeted data sources, and feedback-loop refinement.",
    showsHiringManagers: "Technical curiosity and capability to build full data products.",
    placeholder: "Placeholder: DomainSignal dashboard",
    image: publicPath("/images/domainsignal.png")
  },
  {
    slug: "date-night",
    title: "Date Night",
    thesis: "Couples-focused app prototype for shared discovery",
    role: "Solo Builder",
    context: "Product prototype / personal creative build",
    problem: "Dating app market has forgotten about people who are already in relationships.",
    system: "Shared planning, relationship-first discovery, date recommendations.",
    partners: "None",
    tools: "React Native, Firebase",
    proof: "Built a working couples-app prototype for shared planning, discovery, and date recommendations.",
    showsHiringManagers: "Product sense, UX thinking, and ability to build beyond SEO.",
    placeholder: "Placeholder: Date Night mobile app screens",
    image: publicPath("/images/datenight.png")
  },
  {
    slug: "vet-advocates-growth-system",
    title: "Vet Advocates Growth System",
    thesis: "Structured acquisition system for a veterans-services nonprofit",
    role: "Growth Consultant",
    context: "Pro bono growth system / nonprofit work",
    problem: "Nonprofit lacked structured acquisition to reach veterans in need.",
    system: "Built structured Facebook ad system, codified the system, and trained an outsourced VA.",
    partners: "Nonprofit Leadership",
    tools: "Meta Ads, CRM",
    proof: "Signups increased from 2-3/mo to 25-50/mo.",
    showsHiringManagers: "Ability to drive full-funnel growth and document systems for handoff.",
    placeholder: "Placeholder: Vet Advocates campaign results"
  },
  {
    slug: "sfc-surf-school",
    external: true,
    href: "/case-studies/sfc-surf-school/",
    title: "SFC Surf School Search Visibility",
    thesis: "Competitive analysis and search growth plan for a Waikiki surf school",
    role: "Growth / SEO Lead",
    context: "Local service business competing in a saturated Waikiki tourism market",
    problem: "A newly rebuilt site was indexed and relevant but ranking on page four to five, with the market leader holding roughly forty times more ranking keywords.",
    system: "Derived the true competitor set from organic visibility data rather than reputation, crawled 973 competitor pages to map content patterns and coverage gaps, ran desktop and mobile keyword-gap studies, and built a prioritised page plan around measured demand.",
    partners: "Owner and operations lead",
    tools: "Google Search Console, Semrush, first-party crawler",
    proof: "Identified 38 completed pages that had never been published, found the highest-volume opportunity nobody in the market had a page for, and surfaced that mobile visitors converted five times better than desktop.",
    showsHiringManagers: "Ability to replace assumption with measurement, build original tooling when off-the-shelf data falls short, and turn analysis into a concrete publishing plan.",
    placeholder: "SFC Surf School search visibility report"
  }
];

export const blogPosts = [
  {
    slug: "gbp-2026-ai-grounding",
    title: "Your Google Business Profile Is Now an AI Grounding Source — What Actually Changed in 2026",
    author: "Mitchell Miller",
    date: "August 2026",
    status: "published",
    teaser: "For a decade a Google Business Profile was a visibility asset. In 2026 it became an AI grounding source — and a thin profile now gets an unfavorable AI summary regardless of its star rating. The levers that actually changed, and the 2026 playbook.",
    contentHtml: `<h2>TL;DR</h2>
<p>For a decade, a Google Business Profile (GBP) was a <em>visibility</em> asset — win the local pack, get the calls. In 2026 that framing broke. GBP is now a primary <strong>grounding source for AI answers</strong>: Google&#39;s new <strong>AI-generated Place Summaries</strong> pull from your reviews, posts, web content, and — critically — your <strong>products catalogue</strong> to write the paragraph a searcher (or an AI assistant acting for them) reads <em>instead of</em> your profile. The uncomfortable consequence: a <strong>thin profile now gets an unfavorable AI summary regardless of its star rating.</strong> Five stars and empty is worse than four stars and complete. The levers that matter shifted accordingly — from &quot;post for ranking&quot; to &quot;feed the machine a good answer&quot;: a narrow primary category, steady <strong>review velocity</strong> (2–5/week beats a spike), a <strong>populated products catalogue</strong> (now a direct AI input), <strong>seeded FAQs</strong> (grounding text), and monthly fresh photos. Meanwhile the risk surface hardened: <strong>video verification is now the default</strong>, an <strong>AI-content policy</strong> auto-enforces against fake reviews/photos/awards, and a new <strong>AI Surface attribution</strong> metric finally separates &quot;classic local panel&quot; views from &quot;Maps AI summary&quot; and &quot;AI Overviews&quot; views. This is a synthesis of <a href="https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026">Digital Applied&#39;s 2026 GBP guide</a>, reframed through what it means for AI search.</p>
<h2>The one shift that reframes everything</h2>
<p>Here&#39;s the mental model change. Old GBP: <em>get found in the map pack.</em> New GBP: <strong>be the source the AI trusts when it answers for you.</strong></p>
<p>Google now writes an <strong>AI Place Summary</strong> — a generated paragraph describing your business — assembled from your reviews, posts, website, and product listings. Increasingly, that summary (or an <strong>agentic assistant</strong> querying on your behalf) is the surface the user actually sees. So the question stopped being &quot;do I rank?&quot; and became &quot;<strong>when AI describes me, does it have enough good material to describe me well?</strong>&quot; A profile with a great star rating but no products, stale photos, and an empty Q&amp;A gives the model nothing to work with — and it will generate a flat, generic, or unfavorable summary. Completeness is now a ranking <em>and</em> a reputation input.</p>
<figure style="margin:2rem 0;"><svg viewBox="0 0 780 600" role="img" aria-label="Google Business Profile in 2026 — from visibility listing to AI grounding source" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;">
<rect x="0" y="0" width="780" height="600" rx="14" fill="#0f172a"/>
<text x="30" y="46" fill="#f1f5f9" font-size="25" font-weight="800">Google Business Profile in 2026</text>
<text x="30" y="72" fill="#94a3b8" font-size="14">The shift that reframes every local-SEO decision this year</text>
<rect x="30" y="92" width="345" height="66" rx="10" fill="#1e293b"/>
<text x="47" y="118" fill="#94a3b8" font-size="11" font-weight="800" letter-spacing="0.06em">THE OLD JOB</text>
<text x="47" y="140" fill="#f1f5f9" font-size="15" font-weight="700">Visibility — win the map pack</text>
<rect x="405" y="92" width="345" height="66" rx="10" fill="rgba(37,99,235,0.14)" stroke="#2563eb" stroke-width="1.5"/>
<text x="422" y="118" fill="#60a5fa" font-size="11" font-weight="800" letter-spacing="0.06em">THE NEW JOB (2026)</text>
<text x="422" y="140" fill="#f1f5f9" font-size="15" font-weight="700">Be the source AI trusts to describe you</text>
<text x="381" y="132" fill="#94a3b8" font-size="22" font-weight="800" text-anchor="middle">→</text>
<text x="30" y="192" fill="#f87171" font-size="12.5" font-weight="800">⚠ The new penalty: a THIN profile gets an unfavorable AI summary — even with 5 stars.</text>
<text x="30" y="228" fill="#f1f5f9" font-size="13" font-weight="800" letter-spacing="0.05em">THE HIGH-LEVERAGE LEVERS (priority order)</text><rect x="30" y="244" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="244" width="4" height="52" rx="2" fill="#2563eb"/>
<circle cx="58" cy="270" r="13" fill="#2563eb"/><text x="58" y="275" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">1</text>
<text x="82" y="266" fill="#f1f5f9" font-size="14.5" font-weight="700">Primary category</text>
<text x="82" y="285" fill="#94a3b8" font-size="12">narrow it; audit monthly (taxonomy changed ~40× in '25)</text><rect x="30" y="302" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="302" width="4" height="52" rx="2" fill="#10b981"/>
<circle cx="58" cy="328" r="13" fill="#10b981"/><text x="58" y="333" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">2</text>
<text x="82" y="324" fill="#f1f5f9" font-size="14.5" font-weight="700">Review velocity</text>
<text x="82" y="343" fill="#94a3b8" font-size="12">2–5 / week beats a spike · 2.8× CTR lift · reply in 24h</text><rect x="30" y="360" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="360" width="4" height="52" rx="2" fill="#7c3aed"/>
<circle cx="58" cy="386" r="13" fill="#7c3aed"/><text x="58" y="391" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">3</text>
<text x="82" y="382" fill="#f1f5f9" font-size="14.5" font-weight="700">Products catalogue</text>
<text x="82" y="401" fill="#94a3b8" font-size="12">now a DIRECT input to AI answers · most-empty surface</text><rect x="30" y="418" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="418" width="4" height="52" rx="2" fill="#f59e0b"/>
<circle cx="58" cy="444" r="13" fill="#f59e0b"/><text x="58" y="449" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">4</text>
<text x="82" y="440" fill="#f1f5f9" font-size="14.5" font-weight="700">Seed 10–15 FAQs</text>
<text x="82" y="459" fill="#94a3b8" font-size="12">grounding text for the AI summary — seed it yourself</text><rect x="30" y="476" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="476" width="4" height="52" rx="2" fill="#0891b2"/>
<circle cx="58" cy="502" r="13" fill="#0891b2"/><text x="58" y="507" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">5</text>
<text x="82" y="498" fill="#f1f5f9" font-size="14.5" font-weight="700">Weekly posts + photos</text>
<text x="82" y="517" fill="#94a3b8" font-size="12">+42% directions · +35% clicks · refresh 4–6/month</text><rect x="30" y="534" width="720" height="46" rx="9" fill="rgba(239,68,68,0.10)" stroke="#ef4444" stroke-width="1.3"/>
<text x="47" y="554" fill="#f87171" font-size="12" font-weight="800">NEW RISK SURFACE</text>
<text x="47" y="572" fill="#f1f5f9" font-size="12.5">Video verification is now the default · AI-content policy auto-enforces against fake reviews, photos &amp; awards.</text>
<text x="30" y="588" fill="#94a3b8" font-size="10.5">Source: Digital Applied 2026 GBP guide. 200M+ verified profiles · 46% of local searches show Maps. Framing: GBP as an AI grounding source.</text>
</svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">In 2026, Google Business Profile shifts from a visibility listing to the dataset AI reads about you.</figcaption></figure><h2>The high-leverage levers (in priority order)</h2>
<p>Most GBP advice is a flat checklist. Here&#39;s the version weighted by 2026 impact:</p>
<ol>
<li><strong>Primary category — the single biggest lever.</strong> It&#39;s your one-word positioning statement to Google. Narrow beats broad; match the primary category of your top-three ranking competitors. Google changed its category taxonomy ~40 times in 2025, so <strong>audit it monthly</strong> — a silently retired category quietly tanks you.</li>
<li><strong>Review velocity, not review count.</strong> A steady <strong>2–5 reviews per week over 90 days</strong> compounds into &quot;prominence&quot; and correlates with a <strong>2.8× CTR lift</strong>; a sudden volume spike reads as manipulation. Respond within <strong>24 hours</strong> — the response itself is an engagement signal.</li>
<li><strong>Products catalogue — the most under-leveraged surface.</strong> It now feeds AI answers <em>directly</em> (&quot;does anyone nearby sell X?&quot;). Most local businesses leave it empty. Populating it is one of the highest-ROI, lowest-competition moves available in 2026.</li>
<li><strong>Seed 10–15 FAQ questions yourself.</strong> User Q&amp;A is a grounding source for the AI summary — and if you don&#39;t seed it, misinformation or competitors will. Seed the real questions with the real answers.</li>
<li><strong>Weekly posts + monthly photo refresh.</strong> Posts drive <em>conversion</em>, not ranking — but they occupy competitive space and feed the summary. Profiles with photos see <strong>~42% more direction requests and ~35% more website clicks</strong>; refresh 4–6 photos monthly rather than dumping a batch once.</li>
</ol>
<h2>The distinctions that trip people up</h2>
<ul>
<li><strong>Posts drive conversion, not ranking.</strong> Stop expecting a &quot;What&#39;s New&quot; post to move you up the pack; expect it to convert the person already looking.</li>
<li><strong>Velocity beats volume on reviews.</strong> Two per week for a year beats 100 in a month.</li>
<li><strong>Completeness is now reputational.</strong> The thin-profile penalty is new: the AI writes a worse summary about a sparse profile even with good reviews.</li>
<li><strong>&quot;AI as editor, not generator.&quot;</strong> Google&#39;s tightened policy permits AI-<em>assisted</em> drafting but auto-enforces against AI-<em>generated</em> reviews, fabricated staff photos, and invented awards. Keep a human on every customer-facing string.</li>
</ul>
<h2>The new risk surface</h2>
<p>Three things hardened in 2026, and each can cost you visibility:</p>
<ul>
<li><strong>Video verification is now the default</strong> for storefronts and service businesses (postcard is deprecated). Expect to film one continuous, unedited clip showing signage → interior → a management action. Get it right the first time.</li>
<li><strong>AI-content policy with automated enforcement.</strong> Fake reviews, AI-fabricated photos, invented services/awards → suspension risk. Soft suspension limits functionality; <strong>hard suspension removes you from Search and Maps</strong> entirely.</li>
<li><strong>The classic suspension triggers still bite:</strong> NAP/address mismatch, category-vs-storefront conflict, duplicate listings, keyword-stuffed business names. Run a <strong>citation-consistency sweep</strong> on your top 20 citations quarterly — NAP drift erodes the entity confidence the AI relies on.</li>
</ul>
<h2>Finally, a metric that tells you where AI sends you</h2>
<p>The overhauled Performance tab added <strong>AI Surface attribution</strong> — it splits your impressions across the <strong>classic local panel</strong>, the <strong>Maps AI summary</strong>, and <strong>Google AI Overviews</strong>. For the first time you can see how much of your discovery is already coming through AI surfaces versus the traditional panel. If you do one measurement thing this quarter, watch that split; it tells you how fast the grounding-source era is arriving for <em>your</em> category.</p>
<h2>The 2026 GBP playbook (do these)</h2>
<table>
<thead>
<tr>
<th>Move</th>
<th>Why it matters in 2026</th>
</tr>
</thead>
<tbody><tr>
<td>Narrow the <strong>primary category</strong>; audit monthly</td>
<td>Biggest ranking lever; taxonomy changed ~40× in 2025</td>
</tr>
<tr>
<td>Steady <strong>2–5 reviews/week</strong>; respond in 24h</td>
<td>Velocity → prominence; <strong>2.8× CTR lift</strong></td>
</tr>
<tr>
<td><strong>Populate the products catalogue</strong></td>
<td>Direct input to AI answers; under-leveraged</td>
</tr>
<tr>
<td><strong>Seed 10–15 FAQs</strong> with real answers</td>
<td>Grounding text for the AI summary</td>
</tr>
<tr>
<td><strong>Weekly posts + 4–6 fresh photos/month</strong></td>
<td>Conversion + summary material; <strong>+42% directions / +35% clicks</strong></td>
</tr>
<tr>
<td><strong>Complete every field</strong></td>
<td>Thin profiles get unfavorable AI summaries</td>
</tr>
<tr>
<td><strong>Human-edit all AI-assisted text</strong></td>
<td>Policy auto-enforces against AI-generated content</td>
</tr>
<tr>
<td>Quarterly <strong>citation/NAP sweep</strong></td>
<td>Protects entity confidence AI depends on</td>
</tr>
<tr>
<td>Watch <strong>AI Surface attribution</strong></td>
<td>Shows how much discovery is already AI-driven</td>
</tr>
</tbody></table>
<h2>The bottom line</h2>
<p>The businesses that win local in 2026 aren&#39;t the ones with the most reviews — they&#39;re the ones that give the AI the <strong>richest, most consistent, most complete</strong> material to ground an answer in. Treat your Business Profile less like a listing you set and forget, and more like the <strong>canonical dataset an AI reads about you every day.</strong> Feed it well.</p>
<!--CTA-->
<blockquote>
<p><strong>Found this useful?</strong> Share this with anyone running local or multi-location marketing — the &quot;thin profile&quot; penalty is the one that surprises people. And if AI search visibility (AEO/GEO) is on your radar, that&#39;s the work I do.</p>
</blockquote>
<h2>Sources</h2>
<ul>
<li><a href="https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026">Google Business Profile 2026 Guide — Digital Applied</a> (feature inventory, stats, and 2026 changes synthesized here; analysis and framing are my own).</li>
</ul>
`,
  },

  {
    slug: "multi-agent-billing-traps",
    title: "The Flat-Fee Multi-Agent Stack — and the 3 Billing Traps That Quietly Meter You",
    author: "Mitchell Miller",
    date: "August 2026",
    status: "published",
    teaser: "The two-subscription agent stack (orchestrator + Claude Code) is real and works — but three silent traps reclassify that flat-fee work to metered API rates. What they are, the verified 2026 timeline, and the durable fix.",
    contentHtml: `<h2>TL;DR</h2>
<p>A pattern has settled across the agent-builder community: run an <strong>orchestrator</strong> (Hermes or Codex) on one subscription, delegate the heavy coding to <strong>Claude Code</strong> on another, glue it together with Telegram and a small always-on box, and pay <strong>two flat monthly fees instead of metered API rates.</strong> It works — until it quietly doesn&#39;t. Three things silently reclassify that &quot;flat-fee&quot; work to <strong>per-token API billing</strong>: (1) the June→July 2026 <strong>unbundling</strong> of programmatic usage into a separate metered credit pool, (2) a <strong>headless <code>-p</code> routing bug</strong> that billed some users at API rates even with no API key set, and (3) <strong>third-party-harness <em>string detection</em></strong> — a <code>HERMES.md</code> in your git history was enough to get one user reclassified and hit with <strong>~$200 in API charges.</strong> The through-line: <em>flat-fee is a property of your <strong>auth path</strong> and your <strong>payload</strong>, not your plan.</em> The durable fix is to stop shelling out to <code>claude -p</code> and run Claude Code in an <strong>interactive tmux session</strong> the orchestrator monitors.</p>
<h2>The stack everyone converged on</h2>
<p>If you&#39;ve read the r/hermesagent threads, you&#39;ve seen the same shape over and over:</p>
<ul>
<li><strong>Orchestrator:</strong> Hermes (or Codex/GPT-5.x) on a ChatGPT subscription via OAuth — holds memory, tools, cron, messaging.</li>
<li><strong>Coding specialist:</strong> Claude Code, authenticated against a <strong>Claude Max</strong> subscription.</li>
<li><strong>Interface:</strong> Telegram, so you can drive it from your phone.</li>
<li><strong>Execution:</strong> a NUC / mini-PC / VPS for files, shell, cron, Home Assistant.</li>
</ul>
<p>The appeal is entirely economic. Both sides authenticate through <strong>OAuth against a subscription</strong>, so nothing meters per token. The orchestrator <em>shells out</em> to the <code>claude</code> CLI as a subprocess — from Anthropic&#39;s side it looks identical to you typing the command yourself. Two flat fees, no API meter. The worst case used to be a rate-limit, not a bill.</p>
<p>That&#39;s the part people get right. Here&#39;s the part that bites.</p>
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
</svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">The two-subscription agent stack and the three ways subscription work silently becomes metered API billing.</figcaption></figure><h2>Trap 1 — Programmatic usage got unbundled (and it&#39;s live now)</h2>
<p>On <strong>May 14, 2026</strong>, Anthropic announced that starting June 15, <strong>Agent SDK and <code>claude -p</code></strong> usage would stop drawing from the subscription pool and instead consume a <strong>separate monthly credit</strong> billed at API list rates ($20 Pro / $100 Max 5× / $200 Max 20×). Then the timeline got confusing: the change was <strong>paused on June 15</strong>, and then <strong>quietly went live around July 10, 2026.</strong></p>
<p>So as of now, the important line is: <strong>interactive Claude Code in the terminal still runs on your subscription. Anything <em>programmatic</em> — <code>claude -p</code>, the Agent SDK, GitHub Actions, third-party harnesses on subscription auth — draws from the metered credit pool.</strong> The exact thing that makes the &quot;flat-fee orchestrator shells out to <code>claude -p</code>&quot; pattern convenient is the thing that now meters.</p>
<h2>Trap 2 — The headless <code>-p</code> silent-routing bug</h2>
<p>Independent of policy, there was a <strong>bug</strong>: <code>claude -p</code> headless mode silently routed to <strong>API billing for some users even with no <code>ANTHROPIC_API_KEY</code> set.</strong> If your orchestrator fires dozens of <code>claude -p</code> calls a day, a silent misroute doesn&#39;t rate-limit you — it <em>bills</em> you, and you find out on the invoice. The tell is that your subscription usage looks normal while charges accrue on a separate track.</p>
<h2>Trap 3 — Harness <em>string</em> detection (the expensive one)</h2>
<p>This is the trap most people miss. Anthropic runs logic to detect <strong>third-party harnesses</strong> and route them to API billing. The problem: it can fire on a <strong>string</strong>, not on an actual harness running. Claude Code pulls your <strong><code>git status</code> and recent commit messages into its system prompt</strong> for context — so a file literally named <strong><code>HERMES.md</code></strong>, or an <code>OpenClaw</code> reference sitting in some JSON, was enough to get flagged. One documented case: <strong>~$200 in surprise API charges</strong> because &quot;HERMES.md&quot; showed up in a commit. Anthropic acknowledged it as a bug and refunded, but only after it went public.</p>
<p>The uncomfortable implication for this community specifically: <strong>naming your orchestrator files after a known harness can become a billing input.</strong> Your git history is now a billing surface.</p>
<h2>The fix: interactive over headless</h2>
<p>The pattern the community landed on after the announcement is simple and durable: <strong>don&#39;t shell out to <code>claude -p</code>.</strong> Instead, have the orchestrator <strong>launch Claude Code in an interactive <code>tmux</code> session</strong> and monitor it. Interactive terminal usage stays on the subscription; you also get to peek at live progress. It&#39;s slightly more setup than a one-shot subprocess call, but it&#39;s the difference between flat-fee and metered.</p>
<table>
<thead>
<tr>
<th>Trap</th>
<th>What it does</th>
<th>Guardrail</th>
</tr>
</thead>
<tbody><tr>
<td><strong>Programmatic unbundling</strong> (live ~Jul 2026)</td>
<td><code>claude -p</code> / Agent SDK meter against a separate credit pool</td>
<td>Use <strong>interactive tmux</strong> sessions, not <code>-p</code>; watch the credit balance</td>
</tr>
<tr>
<td><strong>Headless <code>-p</code> routing bug</strong></td>
<td>Silently bills API even with no key set</td>
<td><code>claude /status</code>; check the console for unexpected API usage</td>
</tr>
<tr>
<td><strong>Harness string detection</strong></td>
<td><code>HERMES.md</code>/<code>OpenClaw</code> in git → reclassified to API</td>
<td>Grep history for harness strings; use neutral filenames (<code>orchestrator.md</code>)</td>
</tr>
</tbody></table>
<h2>The one-line takeaway</h2>
<p><strong>&quot;Flat-fee&quot; isn&#39;t a plan you buy — it&#39;s a path you protect.</strong> Subscription vs. metered is decided by <em>how</em> the call is made (interactive vs. headless/SDK) and <em>what&#39;s in the payload</em> (harness signatures in your git state), not by which tier you pay for. Audit both, and the two-sub pattern still holds.</p>
<!--CTA-->
<blockquote>
<p><strong>Found this useful?</strong> Share this with someone running a Claude Max sub inside an agent stack — the git-history billing trap is the one that gets people. And if you want the deeper dive on the <code>HERMES.md</code> detection bug, I broke it down <a href="https://mitchjmiller.com/blog/studying/claude-watermark-seo">here</a>.</p>
</blockquote>
<h2>Sources</h2>
<ul>
<li>Anthropic support: <a href="https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan">Use the Claude Agent SDK with your Claude plan</a></li>
<li><a href="https://www.techtimes.com/articles/317625/20260602/anthropic-ends-subscription-subsidy-agents-june-15-credit-pool-replaces-flat-rate-access.htm">Anthropic Ends Subscription Subsidy for Agents June 15 (TechTimes)</a></li>
<li><a href="https://koromo.io/en/blog/claude-agent-sdk-credit-guide/">Claude Agent SDK Credit Guide (koromo)</a></li>
<li><a href="https://tygartmedia.com/claude-code-billing-credit-pool-2026/">Claude Code Billing in 2026 (Tygart Media)</a></li>
<li>Community pattern + billing anecdotes: r/hermesagent multi-agent setup threads.</li>
</ul>
`,
  },

  {
    slug: "multi-agent-billing-traps",
    title: "The Flat-Fee Multi-Agent Stack — and the 3 Billing Traps That Quietly Meter You",
    author: "Mitchell Miller",
    date: "August 2026",
    status: "published",
    teaser: "The two-subscription agent stack (orchestrator + Claude Code) is real and works — but three silent traps reclassify that flat-fee work to metered API rates. What they are, the verified 2026 timeline, and the durable fix.",
    contentHtml: `<h2>TL;DR</h2>
<p>A pattern has settled across the agent-builder community: run an <strong>orchestrator</strong> (Hermes or Codex) on one subscription, delegate the heavy coding to <strong>Claude Code</strong> on another, glue it together with Telegram and a small always-on box, and pay <strong>two flat monthly fees instead of metered API rates.</strong> It works — until it quietly doesn&#39;t. Three things silently reclassify that &quot;flat-fee&quot; work to <strong>per-token API billing</strong>: (1) the June→July 2026 <strong>unbundling</strong> of programmatic usage into a separate metered credit pool, (2) a <strong>headless <code>-p</code> routing bug</strong> that billed some users at API rates even with no API key set, and (3) <strong>third-party-harness <em>string detection</em></strong> — a <code>HERMES.md</code> in your git history was enough to get one user reclassified and hit with <strong>~$200 in API charges.</strong> The through-line: <em>flat-fee is a property of your <strong>auth path</strong> and your <strong>payload</strong>, not your plan.</em> The durable fix is to stop shelling out to <code>claude -p</code> and run Claude Code in an <strong>interactive tmux session</strong> the orchestrator monitors.</p>
<h2>The stack everyone converged on</h2>
<p>If you&#39;ve read the r/hermesagent threads, you&#39;ve seen the same shape over and over:</p>
<ul>
<li><strong>Orchestrator:</strong> Hermes (or Codex/GPT-5.x) on a ChatGPT subscription via OAuth — holds memory, tools, cron, messaging.</li>
<li><strong>Coding specialist:</strong> Claude Code, authenticated against a <strong>Claude Max</strong> subscription.</li>
<li><strong>Interface:</strong> Telegram, so you can drive it from your phone.</li>
<li><strong>Execution:</strong> a NUC / mini-PC / VPS for files, shell, cron, Home Assistant.</li>
</ul>
<p>The appeal is entirely economic. Both sides authenticate through <strong>OAuth against a subscription</strong>, so nothing meters per token. The orchestrator <em>shells out</em> to the <code>claude</code> CLI as a subprocess — from Anthropic&#39;s side it looks identical to you typing the command yourself. Two flat fees, no API meter. The worst case used to be a rate-limit, not a bill.</p>
<p>That&#39;s the part people get right. Here&#39;s the part that bites.</p>
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
<rect x="30" y="424" width="720" height="60" rx="10" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
<text x="50" y="450" fill="#10b981" font-size="14" font-weight="800">&#10003; The durable fix</text>
<text x="50" y="472" fill="#f1f5f9" font-size="13">Run Claude Code in an <tspan font-weight="700">interactive tmux session</tspan> the orchestrator monitors &#8212; interactive terminal use stays on the subscription. Avoid <tspan font-weight="700">-p</tspan>. Grep git history for harness strings.</text>
<text x="30" y="516" fill="#94a3b8" font-size="10.5">Sources: Anthropic support (Agent SDK + plan); TechTimes; koromo; Tygart Media; r/hermesagent. &#8220;Flat-fee&#8221; = a function of auth path + payload, not plan tier.</text>
</svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">The two-subscription agent stack and the three ways subscription work silently becomes metered API billing.</figcaption></figure><h2>Trap 1 — Programmatic usage got unbundled (and it&#39;s live now)</h2>
<p>On <strong>May 14, 2026</strong>, Anthropic announced that starting June 15, <strong>Agent SDK and <code>claude -p</code></strong> usage would stop drawing from the subscription pool and instead consume a <strong>separate monthly credit</strong> billed at API list rates ($20 Pro / $100 Max 5× / $200 Max 20×). Then the timeline got confusing: the change was <strong>paused on June 15</strong>, and then <strong>quietly went live around July 10, 2026.</strong></p>
<p>So as of now, the important line is: <strong>interactive Claude Code in the terminal still runs on your subscription. Anything <em>programmatic</em> — <code>claude -p</code>, the Agent SDK, GitHub Actions, third-party harnesses on subscription auth — draws from the metered credit pool.</strong> The exact thing that makes the &quot;flat-fee orchestrator shells out to <code>claude -p</code>&quot; pattern convenient is the thing that now meters.</p>
<h2>Trap 2 — The headless <code>-p</code> silent-routing bug</h2>
<p>Independent of policy, there was a <strong>bug</strong>: <code>claude -p</code> headless mode silently routed to <strong>API billing for some users even with no <code>ANTHROPIC_API_KEY</code> set.</strong> If your orchestrator fires dozens of <code>claude -p</code> calls a day, a silent misroute doesn&#39;t rate-limit you — it <em>bills</em> you, and you find out on the invoice. The tell is that your subscription usage looks normal while charges accrue on a separate track.</p>
<h2>Trap 3 — Harness <em>string</em> detection (the expensive one)</h2>
<p>This is the trap most people miss. Anthropic runs logic to detect <strong>third-party harnesses</strong> and route them to API billing. The problem: it can fire on a <strong>string</strong>, not on an actual harness running. Claude Code pulls your <strong><code>git status</code> and recent commit messages into its system prompt</strong> for context — so a file literally named <strong><code>HERMES.md</code></strong>, or an <code>OpenClaw</code> reference sitting in some JSON, was enough to get flagged. One documented case: <strong>~$200 in surprise API charges</strong> because &quot;HERMES.md&quot; showed up in a commit. Anthropic acknowledged it as a bug and refunded, but only after it went public.</p>
<p>The uncomfortable implication for this community specifically: <strong>naming your orchestrator files after a known harness can become a billing input.</strong> Your git history is now a billing surface.</p>
<h2>The fix: interactive over headless</h2>
<p>The pattern the community landed on after the announcement is simple and durable: <strong>don&#39;t shell out to <code>claude -p</code>.</strong> Instead, have the orchestrator <strong>launch Claude Code in an interactive <code>tmux</code> session</strong> and monitor it. Interactive terminal usage stays on the subscription; you also get to peek at live progress. It&#39;s slightly more setup than a one-shot subprocess call, but it&#39;s the difference between flat-fee and metered.</p>
<table>
<thead>
<tr>
<th>Trap</th>
<th>What it does</th>
<th>Guardrail</th>
</tr>
</thead>
<tbody><tr>
<td><strong>Programmatic unbundling</strong> (live ~Jul 2026)</td>
<td><code>claude -p</code> / Agent SDK meter against a separate credit pool</td>
<td>Use <strong>interactive tmux</strong> sessions, not <code>-p</code>; watch the credit balance</td>
</tr>
<tr>
<td><strong>Headless <code>-p</code> routing bug</strong></td>
<td>Silently bills API even with no key set</td>
<td><code>claude /status</code>; check the console for unexpected API usage</td>
</tr>
<tr>
<td><strong>Harness string detection</strong></td>
<td><code>HERMES.md</code>/<code>OpenClaw</code> in git → reclassified to API</td>
<td>Grep history for harness strings; use neutral filenames (<code>orchestrator.md</code>)</td>
</tr>
</tbody></table>
<h2>The one-line takeaway</h2>
<p><strong>&quot;Flat-fee&quot; isn&#39;t a plan you buy — it&#39;s a path you protect.</strong> Subscription vs. metered is decided by <em>how</em> the call is made (interactive vs. headless/SDK) and <em>what&#39;s in the payload</em> (harness signatures in your git state), not by which tier you pay for. Audit both, and the two-sub pattern still holds.</p>
<!--CTA-->
<blockquote>
<p><strong>Found this useful?</strong> Share this with someone running a Claude Max sub inside an agent stack — the git-history billing trap is the one that gets people. And if you want the deeper dive on the <code>HERMES.md</code> detection bug, I broke it down <a href="https://mitchjmiller.com/blog/studying/claude-watermark-seo">here</a>.</p>
</blockquote>
<h2>Sources</h2>
<ul>
<li>Anthropic support: <a href="https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan">Use the Claude Agent SDK with your Claude plan</a></li>
<li><a href="https://www.techtimes.com/articles/317625/20260602/anthropic-ends-subscription-subsidy-agents-june-15-credit-pool-replaces-flat-rate-access.htm">Anthropic Ends Subscription Subsidy for Agents June 15 (TechTimes)</a></li>
<li><a href="https://koromo.io/en/blog/claude-agent-sdk-credit-guide/">Claude Agent SDK Credit Guide (koromo)</a></li>
<li><a href="https://tygartmedia.com/claude-code-billing-credit-pool-2026/">Claude Code Billing in 2026 (Tygart Media)</a></li>
<li>Community pattern + billing anecdotes: r/hermesagent multi-agent setup threads.</li>
</ul>
`,
  },

  {
    slug: "intrepid-agency-spotlight",
    title: "Agency Spotlight: Intrepid Digital and the Long Game in Search Marketing",
    author: "Mitchell Miller",
    date: "August 2026",
    status: "published",
    teaser: "Intrepid has produced content for AWS for about seven years — a strong run in a field where SEO clients churn near 38% a year. An observational look at the repeatable mechanics behind search-client longevity: specialization, broad-spectrum coverage, CRO, and metric discipline.",
    contentHtml: `<p>Seven years is a long time to keep any client, and for a search-marketing engagement specifically it&#39;s worth a second look. SEO carries an annual client-churn rate near <strong>38%</strong>, and the typical organic-search contract runs six to twelve months. Plenty of agencies retain clients for years — that&#39;s not rare, and average agency tenure is actually rising industry-wide. But Intrepid Digital has kept <strong>Amazon Web Services</strong> — a demanding, heavily-scrutinized marketing organization — producing content that drives <strong>4.5 million organic sessions a month</strong> for the better part of a decade. That&#39;s a strong run against a fast-moving benchmark, and it&#39;s worth understanding why it held.</p>
<p>This is an observational piece, not a sales pitch and not a claim that Intrepid is the only agency doing this well. I pulled their public case studies, their conversion philosophy, and the industry&#39;s own retention data to look at the specific, repeatable mechanics behind a relationship like this. The name isn&#39;t really the point; the mechanics are.</p>
<aside style="border:1px solid rgba(37,99,235,0.35);border-left:4px solid #2563eb;border-radius:10px;background:rgba(37,99,235,0.06);padding:20px 22px;margin:1.5rem 0;">
<div style="font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;margin-bottom:8px;">TL;DR — for humans and AI agents</div>
<p style="margin:0 0 10px;">Intrepid Digital has kept <strong>Amazon Web Services for ~7 years</strong> — a strong run given SEO's ~38% annual client churn (long retention isn't unique, but this run is worth studying). Four repeatable habits show up across their public work:</p>
<ol style="margin:0 0 10px;padding-left:1.25rem;">
<li><strong>Deep specialization</strong> — dedicated expert teams, weekly testing/audits, rather than high-volume throughput.</li>
<li><strong>Broad-spectrum coverage</strong> — SEO + paid + CRO under one roof, so a budget shift can move <em>within</em> the agency instead of away from it.</li>
<li><strong>CRO that ties traffic to pipeline</strong> — making value legible to the CFO who controls the budget (50Floor +41% CVR).</li>
<li><strong>Adapting the metric to the client's real goal</strong> — AmeriVet's NC&nbsp;ROAS→Cost-Per-Booking shift drove <strong>+182% new clients YoY</strong>.</li>
</ol>
<p style="margin:0;"><strong>Where this points:</strong> as AI Overviews and attribution decay reshape search, the durable edge is <em>determinism</em> — first-party data, provable pipeline, metric discipline. Agencies that already work this way are positioned for the shift; those competing mainly on output volume are more exposed.</p>
</aside>
<h2>The seven-year anomaly</h2>
<p>Start with why retention this long is genuinely rare. In 2025 the ANA and 4As reported that the average client–agency tenure had climbed to <strong>roughly seven years</strong>, more than double the 3.2-year average of 2016. But that headline number covers broad agency-of-record and media relationships. <strong>Search is a different animal.</strong> SEO carries a ~38% annual churn rate; retention sits around <strong>60% at the twelve-month mark</strong>; project-based shops lose <strong>28% of clients within six months</strong>. Retainer relationships average <strong>56 months</strong> of life, hybrids 36, performance shops 30, project shops 24.</p>
<p>There&#39;s a structural tell in the data, too: <strong>independent agencies average 7.3 years of tenure versus 5.8 for holding-company agencies</strong>, and clients <em>without</em> mandatory review cycles stay <strong>8.1 years versus 3.8</strong> for those reviewed constantly. Longevity correlates with independence, trust, and being hard to commoditize — not with size or volume.</p>
<p>That last point is worth stating plainly. Some of the fastest-churning relationships come from the highest-volume, lowest-price shops — the ones that compete mainly on deliverable count. When an engagement is built to maximize output volume rather than business outcomes, the client eventually notices the work isn&#39;t moving their numbers, and the relationship ends. That&#39;s not a moral failing on anyone&#39;s part; it&#39;s a structural mismatch between what&#39;s being sold (activity) and what&#39;s wanted (results). Determinism is the opposite posture: engineer the engagement so the client&#39;s success and the agency&#39;s success are as close to the <em>same variable</em> as possible, and there are far fewer natural reasons for the relationship to end.</p>
<figure style="margin:2rem 0;"><svg viewBox="0 0 760 430" role="img" aria-label="Average client lifespan by agency model" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;"><rect x="0" y="0" width="760" height="430" rx="14" fill="#0f172a"/><text x="32" y="46" fill="#f1f5f9" font-size="24" font-weight="700">How long clients actually stay</text><text x="32" y="72" fill="#94a3b8" font-size="14">Average client lifespan by agency model — the SEO benchmark Intrepid is beating</text><text x="238" y="127" fill="#f1f5f9" font-size="13" font-weight="700" text-anchor="end">AWS × Intrepid</text><rect x="250" y="108" width="410.8695652173913" height="26" rx="5" fill="#10b981" stroke="#34d399" stroke-width="2"/><text x="670.8695652173913" y="127" fill="#f1f5f9" font-size="13" font-weight="700">84+ mo</text><text x="238" y="171" fill="#94a3b8" font-size="13" font-weight="400" text-anchor="end">Independent agencies (avg)</text><rect x="250" y="152" width="430.4347826086956" height="26" rx="5" fill="#3b82f6"/><text x="690.4347826086956" y="171" fill="#f1f5f9" font-size="13" font-weight="700">7.3 yr</text><text x="238" y="215" fill="#94a3b8" font-size="13" font-weight="400" text-anchor="end">Retainer model (avg)</text><rect x="250" y="196" width="273.9130434782609" height="26" rx="5" fill="#64748b"/><text x="533.9130434782609" y="215" fill="#f1f5f9" font-size="13" font-weight="700">56 mo</text><text x="238" y="259" fill="#94a3b8" font-size="13" font-weight="400" text-anchor="end">Hybrid model</text><rect x="250" y="240" width="176.08695652173913" height="26" rx="5" fill="#64748b"/><text x="436.0869565217391" y="259" fill="#f1f5f9" font-size="13" font-weight="700">36 mo</text><text x="238" y="303" fill="#94a3b8" font-size="13" font-weight="400" text-anchor="end">Performance model</text><rect x="250" y="284" width="146.7391304347826" height="26" rx="5" fill="#f59e0b"/><text x="406.7391304347826" y="303" fill="#f1f5f9" font-size="13" font-weight="700">30 mo</text><text x="238" y="347" fill="#94a3b8" font-size="13" font-weight="400" text-anchor="end">Project model</text><rect x="250" y="328" width="117.3913043478261" height="26" rx="5" fill="#ef4444"/><text x="377.3913043478261" y="347" fill="#f1f5f9" font-size="13" font-weight="700">24 mo</text><line x1="32" y1="392" x2="728" y2="392" stroke="#334155" stroke-width="1"/><text x="130" y="418" fill="#f87171" font-size="18" font-weight="800" text-anchor="middle">38%</text><text x="174" y="418" fill="#94a3b8" font-size="12" text-anchor="start">SEO annual churn</text><text x="360" y="418" fill="#f87171" font-size="18" font-weight="800" text-anchor="middle">60%</text><text x="404" y="418" fill="#94a3b8" font-size="12" text-anchor="start">retained at 12 mo</text><text x="590" y="418" fill="#f87171" font-size="18" font-weight="800" text-anchor="middle">28%</text><text x="634" y="418" fill="#94a3b8" font-size="12" text-anchor="start">project clients gone by mo 6</text></svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">Sources: ANA/4As 2025 tenure report; published SEO-agency churn benchmarks. AWS bar = Intrepid's ~7-year run.</figcaption></figure>
<p>So when an agency holds an AWS-caliber account for seven years, it isn&#39;t just beating a benchmark — it&#39;s operating two to three times past the SEO-specific half-life, against a client with infinite alternatives and relentless internal scrutiny. The interesting question is what makes that repeatable rather than a one-off.</p>
<h2>What actually sets Intrepid apart</h2>
<p>Most churn is not the agency&#39;s fault in any dramatic sense. Clients leave for mundane, structural reasons: <strong>cost, control, and continuity</strong>. Client-side leadership turns over and the new VP brings their own shop. Budgets tighten and marketing is first to be cut. And most commonly in search: <strong>budget gets reallocated from SEO to paid</strong>, because SEO is slower to show impact and harder to tie directly to pipeline than a media invoice. &quot;Sweatshop&quot; agencies — the high-volume, low-specialization deliverable factories — are uniquely exposed to all three, because they compete on price and output, the two things a client can most easily replace or in-house for $3,000–$5,000 a month.</p>
<p>Intrepid&#39;s public work suggests a different operating model, built on three principles that make a partnership <em>deterministic</em> rather than hopeful:</p>
<ul>
<li><strong>Specialization over throughput.</strong> For Skyscanner they didn&#39;t spin up a generalist pod — they assigned a <strong>specialized four-person team</strong> with divided areas of expertise, embedded directly in the client&#39;s Contentful stack, and shipped ~<strong>5 SEO tests every week</strong>. For Huntress they ran <strong>weekly technical health audits</strong> and earned <strong>100+ links through journalistic outreach</strong>, not link farms. Depth is the moat; it&#39;s the one thing a content factory structurally can&#39;t fake.</li>
<li><strong>Adapting the metric to the client&#39;s actual goal.</strong> For AmeriVet — a network of 200+ veterinary clinics — Intrepid recognized that the incumbent &quot;NC ROAS&quot; metric was too lagged and inconsistent to steer against, and <strong>rebuilt the entire paid program around New Client Cost-Per-Booking</strong>. That single act of re-framing is why the account grew new-client volume <strong>+182% year over year</strong> while cutting cost-per-acquisition. Measuring what the business actually cares about is how you survive the budget conversation.</li>
<li><strong>Broad-spectrum coverage under one roof.</strong> Across their case studies you find enterprise content SEO, Core Web Vitals migrations, international hreflang, CRO, Google Ads, Meta, and AI-Overview optimization. That breadth is not a menu — it&#39;s a <em>retention mechanism</em>, and it deserves its own section.</li>
</ul>
<h2>The budget-reallocation survival mechanism</h2>
<p>Here is the most underrated insight in the whole data set. The single most common reason search agencies lose clients is <strong>budget moving from SEO to paid</strong> (or, increasingly, to &quot;real-time&quot; social and AI-answer visibility). For a single-discipline SEO shop, that reallocation is an extinction event — the money leaves the building.</p>
<p>For a broad-spectrum agency, <strong>the money can move within the building instead.</strong> When AmeriVet&#39;s growth thesis pointed at paid acquisition, Intrepid was already the paid team. When Clio needed Google Ads help, Intrepid delivered a <strong>90% CTR increase</strong> — for the same client whose organic rankings they&#39;d fixed. Flyhomes shows the same pattern across channels: <strong>105% more activated leads</strong> on Google Ads and <strong>22% more MQLs</strong> on Meta. An agency that can execute SEO <em>and</em> paid <em>and</em> CRO is much harder to reallocate away from — it can often become the destination of the reallocation rather than its casualty.</p>
<p>This is a big part of how a relationship survives shifting budgets. If you can run whichever discipline the moment rewards, a market swing becomes a reason to consolidate spend with you rather than a reason to leave. It doesn&#39;t make you immune — client-side leadership still changes, budgets still get cut outright — but it removes one of the most common exits.</p>
<p>It&#39;s worth naming what this does to the <em>relationship itself</em>, because it compounds. Every quarter an agency executes across channels, it accumulates something a competitor pitching for the account cannot replicate: institutional memory of the client&#39;s stack, their seasonality, their internal politics, which experiments already failed and why. A likely reason AWS renewed for seven years isn&#39;t contractual lock-in — it&#39;s that re-teaching a new agency the shape of a business that complex would cost <em>months</em> of lost momentum. Agencies that last tend to engineer this deliberately: embed in the client&#39;s tooling (Skyscanner&#39;s Contentful, AmeriVet&#39;s Patient Prism and Vetstoria), earn the right to touch more of the funnel, and let the accumulated context become a genuine advantage. The flywheel is simple — deliver a provable win, earn a wider mandate, accumulate more context, deliver a bigger win — and once it&#39;s spinning, the relationship starts to look less like a vendor contract and more like part of the client&#39;s operating stack.</p>
<figure style="margin:2rem 0;"><svg viewBox="0 0 760 500" role="img" aria-label="Selected Intrepid results across disciplines" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;"><rect x="0" y="0" width="760" height="500" rx="14" fill="#0f172a"/><text x="32" y="44" fill="#f1f5f9" font-size="24" font-weight="700">One agency, every discipline</text><text x="32" y="70" fill="#94a3b8" font-size="14">Selected public results — SEO, paid, technical, CRO &amp; AI search, across B2B and B2C</text><rect x="32" y="92" width="228" height="96" rx="10" fill="#1e293b"/><rect x="32" y="92" width="4" height="96" rx="2" fill="#3b82f6"/><text x="50" y="132" fill="#f1f5f9" font-size="26" font-weight="800">4.5M/mo</text><text x="50" y="152" fill="#94a3b8" font-size="12.5">organic sessions</text><text x="50" y="174" fill="#f1f5f9" font-size="12.5" font-weight="600">AWS</text><text x="246" y="174" fill="#3b82f6" font-size="10.5" font-weight="700" text-anchor="end">Content · B2B</text><rect x="272" y="92" width="228" height="96" rx="10" fill="#1e293b"/><rect x="272" y="92" width="4" height="96" rx="2" fill="#3b82f6"/><text x="290" y="132" fill="#f1f5f9" font-size="26" font-weight="800">+538%</text><text x="290" y="152" fill="#94a3b8" font-size="12.5">clicks YoY</text><text x="290" y="174" fill="#f1f5f9" font-size="12.5" font-weight="600">Huntress</text><text x="486" y="174" fill="#3b82f6" font-size="10.5" font-weight="700" text-anchor="end">Non-brand · B2B</text><rect x="512" y="92" width="228" height="96" rx="10" fill="#1e293b"/><rect x="512" y="92" width="4" height="96" rx="2" fill="#a78bfa"/><text x="530" y="132" fill="#f1f5f9" font-size="26" font-weight="800">360</text><text x="530" y="152" fill="#94a3b8" font-size="12.5">SEO tests · 60% wins</text><text x="530" y="174" fill="#f1f5f9" font-size="12.5" font-weight="600">Skyscanner</text><text x="726" y="174" fill="#a78bfa" font-size="10.5" font-weight="700" text-anchor="end">Experiment · B2C</text><rect x="32" y="200" width="228" height="96" rx="10" fill="#1e293b"/><rect x="32" y="200" width="4" height="96" rx="2" fill="#a78bfa"/><text x="50" y="240" fill="#f1f5f9" font-size="26" font-weight="800">+52pt</text><text x="50" y="260" fill="#94a3b8" font-size="12.5">mobile CLS gain</text><text x="50" y="282" fill="#f1f5f9" font-size="12.5" font-weight="600">Smith Optics</text><text x="246" y="282" fill="#a78bfa" font-size="10.5" font-weight="700" text-anchor="end">Technical · B2C</text><rect x="272" y="200" width="228" height="96" rx="10" fill="#1e293b"/><rect x="272" y="200" width="4" height="96" rx="2" fill="#f59e0b"/><text x="290" y="240" fill="#f1f5f9" font-size="26" font-weight="800">+182%</text><text x="290" y="260" fill="#94a3b8" font-size="12.5">new clients YoY</text><text x="290" y="282" fill="#f1f5f9" font-size="12.5" font-weight="600">AmeriVet</text><text x="486" y="282" fill="#f59e0b" font-size="10.5" font-weight="700" text-anchor="end">Paid · B2C</text><rect x="512" y="200" width="228" height="96" rx="10" fill="#1e293b"/><rect x="512" y="200" width="4" height="96" rx="2" fill="#3b82f6"/><text x="530" y="240" fill="#f1f5f9" font-size="26" font-weight="800">+90%</text><text x="530" y="260" fill="#94a3b8" font-size="12.5">Google Ads CTR</text><text x="530" y="282" fill="#f1f5f9" font-size="12.5" font-weight="600">Clio</text><text x="726" y="282" fill="#3b82f6" font-size="10.5" font-weight="700" text-anchor="end">Paid · B2B</text><rect x="32" y="308" width="228" height="96" rx="10" fill="#1e293b"/><rect x="32" y="308" width="4" height="96" rx="2" fill="#a78bfa"/><text x="50" y="348" fill="#f1f5f9" font-size="26" font-weight="800">+861%</text><text x="50" y="368" fill="#94a3b8" font-size="12.5">non-brand clicks</text><text x="50" y="390" fill="#f1f5f9" font-size="12.5" font-weight="600">GOOD AMERICAN</text><text x="246" y="390" fill="#a78bfa" font-size="10.5" font-weight="700" text-anchor="end">SEO · B2C</text><rect x="272" y="308" width="228" height="96" rx="10" fill="#1e293b"/><rect x="272" y="308" width="4" height="96" rx="2" fill="#10b981"/><text x="290" y="348" fill="#f1f5f9" font-size="26" font-weight="800">+1900%</text><text x="290" y="368" fill="#94a3b8" font-size="12.5">non-brand clicks</text><text x="290" y="390" fill="#f1f5f9" font-size="12.5" font-weight="600">Hawx Pest</text><text x="486" y="390" fill="#10b981" font-size="10.5" font-weight="700" text-anchor="end">Local · B2C</text><rect x="512" y="308" width="228" height="96" rx="10" fill="#1e293b"/><rect x="512" y="308" width="4" height="96" rx="2" fill="#10b981"/><text x="530" y="348" fill="#f1f5f9" font-size="26" font-weight="800">+41%</text><text x="530" y="368" fill="#94a3b8" font-size="12.5">lead-gen CVR</text><text x="530" y="390" fill="#f1f5f9" font-size="12.5" font-weight="600">50Floor</text><text x="726" y="390" fill="#10b981" font-size="10.5" font-weight="700" text-anchor="end">CRO</text><rect x="32" y="416" width="228" height="96" rx="10" fill="#1e293b"/><rect x="32" y="416" width="4" height="96" rx="2" fill="#f59e0b"/><text x="50" y="456" fill="#f1f5f9" font-size="26" font-weight="800">+680%</text><text x="50" y="476" fill="#94a3b8" font-size="12.5">lead volume</text><text x="50" y="498" fill="#f1f5f9" font-size="12.5" font-weight="600">Hiro</text><text x="246" y="498" fill="#f59e0b" font-size="10.5" font-weight="700" text-anchor="end">Demand</text><rect x="272" y="416" width="228" height="96" rx="10" fill="#1e293b"/><rect x="272" y="416" width="4" height="96" rx="2" fill="#f59e0b"/><text x="290" y="456" fill="#f1f5f9" font-size="26" font-weight="800">+105%</text><text x="290" y="476" fill="#94a3b8" font-size="12.5">activated leads</text><text x="290" y="498" fill="#f1f5f9" font-size="12.5" font-weight="600">Flyhomes</text><text x="486" y="498" fill="#f59e0b" font-size="10.5" font-weight="700" text-anchor="end">Paid · B2C</text><rect x="512" y="416" width="228" height="96" rx="10" fill="#1e293b"/><rect x="512" y="416" width="4" height="96" rx="2" fill="#2dd4bf"/><text x="530" y="456" fill="#f1f5f9" font-size="26" font-weight="800">AI</text><text x="530" y="476" fill="#94a3b8" font-size="12.5">Overview visibility</text><text x="530" y="498" fill="#f1f5f9" font-size="12.5" font-weight="600">Taylor Farms</text><text x="726" y="498" fill="#2dd4bf" font-size="10.5" font-weight="700" text-anchor="end">Emerging</text></svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">Selected results from Intrepid's public case-study library (intrepidonline.com/case-studies).</figcaption></figure>
<h2>CRO: the retention moat hiding in plain sight</h2>
<p>If broad-spectrum coverage is the survival mechanism, <strong>conversion rate optimization is the trust mechanism</strong> — and it&#39;s the piece most volume agencies neglect because it&#39;s hard, slow, and unglamorous.</p>
<p>Intrepid&#39;s own framing is revealing. They describe CRO on-page optimization as <em>&quot;not just a strategy; it&#39;s a necessity,&quot;</em> built on a <strong>data-driven, user-centric model</strong> that ties every change to <em>&quot;measurable results&quot;</em> clients can <em>&quot;track and measure the tangible impact&quot;</em> of — explicitly rejecting vanity metrics. The proof points are concrete: <strong>50Floor</strong> saw a <strong>41% increase in lead-generation conversion rate</strong> and a <strong>25% drop in bounce rate</strong>; <strong>Clio</strong> got a <strong>26% conversion-rate lift</strong> by simplifying the UX and optimizing a lead-gen form.</p>
<p>Why does this matter for a seven-year relationship? Because CRO is what converts SEO and paid traffic into <em>pipeline</em> — and <strong>pipeline is the only thing that survives a budget review.</strong> Recall the industry finding: SEO gets cut because it&#39;s &quot;harder to tie to pipeline.&quot; An agency that pairs traffic growth with conversion lift closes that gap directly. It changes the client conversation from &quot;what did my rankings do&quot; to &quot;what did my revenue do.&quot; The retention data points the same direction — agencies with <strong>transparent KPIs see roughly 26% less churn</strong>, and those with dedicated content strategists see <strong>~34% higher retention</strong>. CRO is how you make your value legible to a CFO, and value that finance can see is much harder to cut.</p>
<p>There&#39;s a second-order effect worth noting: CRO also <em>protects the traffic work from itself</em>. An SEO program that doubles sessions but leaves conversion flat produces a risky internal narrative — &quot;traffic is up but nothing&#39;s happening&quot; — that can get the whole line item cut in the next planning cycle. By owning the conversion step too, an agency helps ensure the traffic it earns actually shows up as bookings and leads, which in turn justifies the SEO spend that produced it. The disciplines reinforce each other. It&#39;s also why treating CRO as an occasional upsell rather than a core competency leaves an agency more exposed: it builds the top of a funnel it isn&#39;t equipped to convert, and the ROI question eventually follows.</p>
<h2>How B2B and B2C businesses of every size can actually win</h2>
<p>The case studies map cleanly onto a segment playbook. Same principles, different center of gravity. The unifying rule across all of them: <strong>find the single metric that maps to the client&#39;s actual business outcome, then engineer relentlessly against it</strong> — new-client bookings for a clinic network, non-branded pipeline for a security vendor, conversion rate for a home-services brand. What changes by segment is which metric matters and which lever moves it fastest.</p>
<ul>
<li><strong>Enterprise B2B (AWS, Huntress, Clio).</strong> The winning move is <strong>non-branded category authority</strong>. Huntress went from <strong>97% branded / 3% non-branded traffic to 26% / 74%</strong> — a <strong>538% year-over-year click increase</strong> — by building 1,500+ pages of buyer-journey content. AWS built a content pipeline that now drives a third of all its organic traffic. In B2B, the constraint is rarely money; it&#39;s <em>internal bottlenecks and content velocity</em>. The agency&#39;s job is to be the production system the client can&#39;t build in-house fast enough.</li>
<li><strong>Enterprise / mid-market B2C (Skyscanner, Smith Optics, GOOD AMERICAN, Allbirds).</strong> Here the game is <strong>experimentation velocity and technical performance</strong>. Skyscanner&#39;s 360 tests and Smith&#39;s 52-point mobile CLS gain are the template: in crowded consumer categories, compounding small, measured wins beats big bets, and site speed is table stakes.</li>
<li><strong>Multi-location &amp; local (AmeriVet, Hawx Pest Control).</strong> The lever is <strong>first-party signal quality and acquisition efficiency</strong>. AmeriVet&#39;s +182% and Hawx&#39;s <strong>1,900% non-branded click growth</strong> came from cohorting locations and optimizing to a booking/acquisition metric, not a vanity one.</li>
<li><strong>SMBs generally.</strong> The lesson from the retention data is blunt: don&#39;t buy volume, buy <strong>specialization and honest KPIs</strong>. The agencies that set realistic expectations at onboarding retain <strong>15–20 points better</strong> than average. A small business is better served by one deterministic discipline done deeply than by a cheap everything-bundle done shallowly.</li>
</ul>
<figure style="margin:2rem 0;"><svg viewBox="0 0 760 380" role="img" aria-label="The playbook by business segment" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;"><rect x="0" y="0" width="760" height="380" rx="14" fill="#0f172a"/><text x="32" y="44" fill="#f1f5f9" font-size="24" font-weight="700">The playbook by segment</text><text x="32" y="70" fill="#94a3b8" font-size="14">Same principles, different center of gravity — how any business can apply the model</text><text x="32" y="104" fill="#94a3b8" font-size="11" font-weight="700" letter-spacing="0.05em">SEGMENT</text><text x="230" y="104" fill="#94a3b8" font-size="11" font-weight="700" letter-spacing="0.05em">PRIMARY LEVER</text><text x="470" y="104" fill="#94a3b8" font-size="11" font-weight="700" letter-spacing="0.05em">PROOF</text><rect x="32" y="120" width="696" height="52" rx="9" fill="#1e293b"/><rect x="32" y="120" width="4" height="52" rx="2" fill="#3b82f6"/><text x="50" y="151" fill="#f1f5f9" font-size="14" font-weight="700">Enterprise B2B</text><text x="230" y="151" fill="#f1f5f9" font-size="12.5">Non-branded category authority</text><text x="470" y="146" fill="#94a3b8" font-size="11.5">Huntress 3%→74% non-brand ·</text><text x="470" y="162" fill="#94a3b8" font-size="11.5">AWS ⅓ of traffic from content</text><rect x="32" y="182" width="696" height="52" rx="9" fill="#1e293b"/><rect x="32" y="182" width="4" height="52" rx="2" fill="#a78bfa"/><text x="50" y="213" fill="#f1f5f9" font-size="14" font-weight="700">Mid-market B2C</text><text x="230" y="213" fill="#f1f5f9" font-size="12.5">Experimentation velocity + performance</text><text x="470" y="208" fill="#94a3b8" font-size="11.5">Skyscanner 360 tests ·</text><text x="470" y="224" fill="#94a3b8" font-size="11.5">Smith +52pt mobile CLS</text><rect x="32" y="244" width="696" height="52" rx="9" fill="#1e293b"/><rect x="32" y="244" width="4" height="52" rx="2" fill="#10b981"/><text x="50" y="275" fill="#f1f5f9" font-size="14" font-weight="700">Multi-location / Local</text><text x="230" y="275" fill="#f1f5f9" font-size="12.5">First-party signals + acquisition efficiency</text><text x="470" y="270" fill="#94a3b8" font-size="11.5">AmeriVet +182% new clients ·</text><text x="470" y="286" fill="#94a3b8" font-size="11.5">Hawx +1900% clicks</text><rect x="32" y="306" width="696" height="52" rx="9" fill="#1e293b"/><rect x="32" y="306" width="4" height="52" rx="2" fill="#f59e0b"/><text x="50" y="337" fill="#f1f5f9" font-size="14" font-weight="700">SMB (any vertical)</text><text x="230" y="337" fill="#f1f5f9" font-size="12.5">Specialization + honest KPIs</text><text x="470" y="332" fill="#94a3b8" font-size="11.5">+15–20pt retention vs industry avg when KPIs are set at onboarding</text></svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">How B2B and B2C businesses of every size can apply Intrepid's operating model.</figcaption></figure>
<h2>Do they need to evolve? Yes — and they already are</h2>
<p>No moat is permanent. The same forces reshaping search — AI Overviews, generative answer engines, degrading attribution — will test every agency&#39;s model over the next 24 months. The good news for Intrepid is that its answer to the last disruption is the same as its answer to this one: <strong>own the source authority, prove the pipeline, adapt the metric.</strong></p>
<p>The evidence they&#39;re already moving: a <strong>Taylor Farms</strong> case study explicitly optimizing for <strong>AI Overviews</strong> (thousands of monthly organic visits from AI answers) and another recovering <strong>876% more clicks</strong> through hreflang fixes. AI answer engines pull from exactly the structured, entity-rich, authoritative content that good SEO has always produced — so the agencies that already do content and technical SEO well are <em>positioned</em>, not threatened. The risk isn&#39;t the technology; it&#39;s complacency. The prediction below is that determinism itself — first-party data, provable pipeline, metric discipline — becomes the entire game as third-party attribution collapses.</p>
<p>The evolution Intrepid — and any serious agency — has to make explicit over the next two years is threefold. First, <strong>treat AEO/GEO as a measured discipline, not a buzzword</strong>: track citation share in AI answers the way SEO tracks rankings, and report it with the same rigor. Second, <strong>lean harder into first-party measurement</strong>, because as cookies deprecate and platform attribution degrades, the agencies still steering by third-party ROAS will fly blind while the ones who rebuilt around owned signals (like AmeriVet&#39;s Cost-Per-Booking) keep a clear picture. Third, <strong>use AI to widen the specialization gap rather than to cut corners</strong> — the content-factory shops will use generative AI to produce <em>more</em> thin output faster, accelerating their own commoditization, while the deterministic agencies use it to compress research and free their specialists for the judgment work machines can&#39;t do. The agencies that survive the next disruption will be the ones that were already deterministic before it arrived. That&#39;s the whole thesis: the habits that produced a seven-year AWS relationship are the same habits that make an agency antifragile to whatever comes next.</p>
<h2>The inferences, and the data-supported predictions</h2>
<table>
<thead>
<tr>
<th>Inference</th>
<th>Evidence</th>
<th>Prediction (data-supported)</th>
</tr>
</thead>
<tbody><tr>
<td>Longevity comes from being <em>un-commoditizable</em>, not from size</td>
<td>Independent agencies average <strong>7.3-yr</strong> tenure vs 5.8 for holding-cos; no-review clients stay <strong>8.1 yr</strong> vs 3.8</td>
<td>Specialized independents widen the retention gap as AI commoditizes generic output</td>
</tr>
<tr>
<td>Broad-spectrum coverage softens budget reallocation</td>
<td>Clio (SEO <strong>+90% CTR</strong> Ads), Flyhomes (Ads <strong>+105%</strong> / Meta <strong>+22% MQLs</strong>), AmeriVet paid pivot</td>
<td>Full-funnel agencies retain better through SEO→paid shifts; single-discipline shops are more exposed to SEO&#39;s ~<strong>38%/yr</strong> churn</td>
</tr>
<tr>
<td>CRO strengthens retention</td>
<td>50Floor <strong>+41% CVR</strong>; Clio <strong>+26% CVR</strong>; transparent-KPI agencies see ~<strong>26%</strong> less churn</td>
<td>Pipeline/attribution proof becomes a primary defense against budget cuts through 2027</td>
</tr>
<tr>
<td>Metric discipline helps win the budget review</td>
<td>AmeriVet NC ROAS→CPB → <strong>+182%</strong> new clients, <strong>−20%</strong> CPA</td>
<td>First-party/CPB-metric approaches hold up better as attribution degrades</td>
</tr>
<tr>
<td>Non-branded authority is a core B2B growth engine</td>
<td>Huntress <strong>3%→74%</strong> non-brand (<strong>+538%</strong> clicks); AWS ⅓ of traffic from content</td>
<td>AI Overviews reward the same entity-rich content; early movers likely compound citation share</td>
</tr>
<tr>
<td>The AI-search shift favors those who already do SEO well</td>
<td>Taylor Farms AI-Overview visits; hreflang <strong>+876%</strong> clicks</td>
<td>AEO/GEO looks more like continuity than disruption for structured-content teams; slower movers risk losing ground</td>
</tr>
</tbody></table>
<h2>The bottom line</h2>
<p>Intrepid&#39;s seven-year AWS run isn&#39;t a story about being the biggest or the cheapest — it reads more like a case study in being <strong>hard to replace.</strong> Specialization makes you hard to commoditize. Broad-spectrum coverage makes you harder to reallocate away from. CRO makes your value legible to the person holding the budget. And metric discipline helps the whole thing survive a bad quarter. None of these is exotic, and none is unique to Intrepid — but together, applied consistently over years, they compound into a relationship that&#39;s genuinely difficult to unwind.</p>
<p>For any business choosing an agency — or any agency trying to be worth choosing — that&#39;s the more durable model: sell outcomes you can prove, not output you can count.</p>
<hr>
<p><em>Research draws on Intrepid Digital&#39;s public <a href="https://www.intrepidonline.com/case-studies/">case studies</a>, <a href="https://www.intrepidonline.com/">services</a>, and <a href="https://www.intrepidonline.com/glossary/the-power-of-cro-on-page-optimization/">CRO glossary</a>; case studies cited include <a href="https://www.intrepidonline.com/case-studies/aws-global-seo-content/">AWS</a>, <a href="https://www.intrepidonline.com/case-studies/huntress-non-branded-traffic/">Huntress</a>, <a href="https://www.intrepidonline.com/case-studies/skyscanner/">Skyscanner</a>, <a href="https://www.intrepidonline.com/case-studies/smith-migration/">Smith Optics</a>, and <a href="https://www.intrepidonline.com/case-studies/amerivet-new-client-acquisition/">AmeriVet</a>. Retention benchmarks from the ANA/4As 2025 tenure report and published SEO-agency churn studies. Analysis is my own; I have no affiliation with Intrepid.</em></p>
`,
  },

  {
    slug: "mitchell-miller-journey",
    title: "The Long Road to Systems Thinking: My Journey in Search, AI, and Building Things",
    author: "Mitchell Miller",
    date: "June 2026",
    status: "published",
    teaser: "From agency environments to Apple-scale SEO programs, and why search in 2026 feels like being at the edge of a new map.",
    content: `
I'm based in San Jose, CA. I surf, rock climb, and practice martial arts. I'm a builder by nature — prototyping things before there were tools to make prototyping easy.

My career didn't start with SEO. It started with curiosity about how businesses actually grow. Working in agency environments, I learned across ecommerce, SaaS, B2B, healthcare, and enterprise accounts. I discovered that search wasn't just a marketing channel — it was an operating system for understanding user intent, the competitive landscape, and business opportunity.

I learned early to speak two languages: the language of data and the language of the business.

### The Scale-Up Years

During my agency years at Wpromote and DemandWave, I learned enterprise SEO from scratch. I built technical SEO methodologies and learned how to work with engineering teams, explaining why crawl budgets matter in a company budget meeting.

Then came the CommonSpirit and Dignity Health years — the scale-up moment. I built a 1,000+ location entity system, ran 20+ migrations, and watched $15.21M in attributable revenue get reported back to executives I'd convinced to prioritize SEO.

At Apple, I operated at a scale where even a small rendering fix could affect millions of impressions. I experienced presenting search strategy to 60+ stakeholders, learning what "enterprise alignment" really means. At Stanford Health Care, I navigated regulated healthcare, balancing paid and organic, working with clinical teams who don't speak "keyword" fluently.

Most recently at Clarity Digital, the past decade converged. I used AI to build the tools I always wished I had. ClarityPulse, SearchForge, ActionThread — these aren't products I'm pitching. They are experiments I built for myself and found genuinely useful.

### The Shift to AI Search

The transition from traditional SEO to AEO/GEO wasn't a sudden pivot — it was a natural evolution. AI answers pull from the exact same sources that good SEO has always targeted: authoritative, structured, entity-rich content.

I started monitoring AI search visibility before it had a name. I built prompt-set tracking systems. I measured citation velocity. I quickly understood that the entities that win in AI are the ones that already won in structured data.

### Building Things

Outside of my day job, I like to build:
- **DomainSignal**: a domain intelligence tool I built as a personal experiment in scoring and data aggregation.
- **Date Night**: a couples app prototype I built because I thought the dating app market had forgotten about people who are already in relationships.
- **Clear Kayak Adventures**: a small outdoor business I helped operate — building the website, OTA listings, payments, SOPs, and CRM.
- **Vet Advocates**: a structured Facebook ad system for a veterans-services nonprofit that increased monthly signups from 2-3 to 25-50.

Through surfing, climbing, and martial arts, I reset. The physical practice of doing something hard with your body keeps you honest — you can't fake a wave or a wall.

Search in 2026 feels like being at the edge of a genuinely new map. The rules are changing, but the fundamentals of systems thinking, clean data, and business alignment matter more than ever.
    `
  },
  {
    slug: "traditional-seo-to-ai-search",
    title: "From Traditional SEO to AI Search: What Actually Changed",
    author: "Mitchell Miller",
    date: "Coming Soon",
    status: "draft",
    teaser: "A breakdown of how information retrieval has shifted from blue links to generated answers, and what it means for enterprise strategy."
  },
  {
    slug: "aeo-geo-measurement-framework",
    title: "AEO vs GEO vs SEO: A Practical Measurement Framework",
    author: "Mitchell Miller",
    date: "Coming Soon",
    status: "draft",
    teaser: "How to measure brand visibility, citation velocity, and share-of-voice across ChatGPT, Perplexity, and Google AI Overviews."
  },
  {
    slug: "entity-seo-for-ai-retrieval",
    title: "Entity SEO for AI Retrieval Systems",
    author: "Mitchell Miller",
    date: "Coming Soon",
    status: "draft",
    teaser: "Why structured data and parent/child entity architecture are the foundational infrastructure for LLM understanding."
  },
  {
    slug: "enterprise-seo-business-cases",
    title: "The Enterprise SEO Business Case: How to Get Engineering Prioritized",
    author: "Mitchell Miller",
    date: "Coming Soon",
    status: "draft",
    teaser: "Translating technical requirements into executive-ready models that secure roadmap placement."
  }
];

export const vibeProjects = [
  {
    name: "DomainSignal",
    category: "Research & AI",
    description: "AI-driven domain authority scoring and intelligence platform using targeted data sources and feedback-loop refinement.",
    goal: "Evaluate domain trust signals efficiently.",
    placeholder: "Placeholder: DomainSignal interface",
    image: publicPath("/images/domainsignal.png")
  },
  {
    name: "ClarityPulse",
    category: "Research & AI",
    description: "AI-powered SEO reporting assistant that turns raw data from GA4 and GSC into executive narratives.",
    goal: "Automate manual agency reporting.",
    placeholder: "Placeholder: ClarityPulse reporting dashboard",
    image: publicPath("/images/claritypulse-dashboard.png")
  },
  {
    name: "SearchForge",
    category: "Research & AI",
    description: "Content intelligence system for entity-driven brief generation, topic clustering, and editorial QA.",
    goal: "Scale high-quality content operations.",
    placeholder: "Placeholder: SearchForge content brief output",
    image: publicPath("/images/searchforge-dashboard.png")
  },
  {
    name: "ActionThread",
    category: "Process Automation",
    description: "AI transcript-to-execution workflow tool that extracts decisions, owners, and deadlines from call transcripts.",
    goal: "Reduce PM execution debt.",
    placeholder: "Placeholder: ActionThread task extraction",
    image: publicPath("/images/actionthread-dashboard.png")
  },
  {
    name: "AEO Visibility Infrastructure",
    category: "Research & AI",
    description: "Prompt-set monitoring and AI share-of-voice measurement across ChatGPT, Perplexity, and Google AI Overviews.",
    goal: "Track AI search visibility across prompt sets and citation sources.",
    placeholder: "Placeholder: AEO dashboard",
    image: publicPath("/images/aeo-measurement-dashboard.png")
  },
  {
    name: "Date Night",
    category: "Mobile & Web Apps",
    description: "Couples app prototype for shared date planning and relationship-first discovery.",
    goal: "Explore a gap in the post-dating app market.",
    placeholder: "Placeholder: Date Night app mockups",
    image: publicPath("/images/datenight.png")
  },
  {
    name: "Clear Kayak Adventures",
    category: "Mobile & Web Apps",
    description: "Digital infrastructure for a small outdoor business, including OTA listings, payments, and CRM.",
    goal: "Streamline local business operations.",
    placeholder: "Placeholder: Clear Kayak Adventures website",
    image: publicPath("/images/proof-optimized/clear-kayak-adventures-site.png")
  },
  {
    name: "FolioTrack",
    category: "Finance Tools",
    description: "Personal investment portfolio tracking prototype with AI-assisted insights and rebalancing suggestions.",
    goal: "Simplify multi-account financial tracking.",
    placeholder: "Placeholder: FolioTrack financial dashboard",
    image: publicPath("/images/foliotrack.png")
  },
  {
    name: "Vet Advocates",
    category: "Volunteer & Community",
    description: "Structured Facebook ad growth system for a veterans-services nonprofit.",
    goal: "Scale veteran outreach.",
    placeholder: "Placeholder: Vet Advocates campaign metrics",
    image: publicPath("/images/proof-optimized/vet-advocates-growth-system.svg")
  }
];
