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
  }
];

export const blogPosts = [
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
