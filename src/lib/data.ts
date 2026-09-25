import { publicPath } from "./paths";

export const caseStudies = [
  {
    slug: "apple-seasonal-search",
    title: "Apple Seasonal Search",
    thesis: "Enterprise SEO program across Apple seasonal commerce surfaces",
    role: "Program Manager, SEO - Americas Region (AMR)",
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
    role: "Program Manager, SEO - Americas Region (AMR)",
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
    role: "Program Manager, SEO - Americas Region (AMR)",
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
    thesis: "Internal AI reporting system: source data → a brief people can act on",
    role: "Builder / AI Practitioner",
    context: "Internal reporting prototype built and used at Clarity AI",
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
    context: "AEO/GEO measurement system built at Clarity AI",
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
    title: "SFC Surf School",
    thesis: "From search research to a working growth system on Waikīkī’s South Shore",
    role: "Growth strategy, search, design & engineering",
    context: "An independent Waikīkī surf school · 90-day pilot · 2026",
    problem: "SFC needed to become discoverable in a crowded destination market, answer the questions that make beginners hesitate, and turn its local knowledge into a useful digital experience.",
    system: "Competitive research across 973 pages; a rebuilt lesson and guide architecture; a geographically grounded, ten-break surf explorer with original-source video links; ten connected break guides; Google Business Profile campaign planning; source-backed reporting and controlled staging-to-production releases.",
    partners: "School owner and operations team",
    tools: "Astro, JavaScript, GitHub Actions, GSC, GA4, Semrush, geospatial imagery, Google Business Profile",
    proof: "Google Search Console clicks rose from 5 to 54 (+980%) and impressions from 470 to 1,652 (+251%, rounded), comparing August 12–September 8 with July 15–August 11, 2026. The ten-break explorer launched September 10, after that measurement window.",
    showsHiringManagers: "The ability to carry an opportunity from research through design, software, content, release safeguards and honest performance reporting.",
    placeholder: "SFC South Shore surf explorer",
    image: publicPath("/images/portfolio-proof/sfc-south-shore-explorer.png")
  }];

export const blogPosts = [
  {
    slug: "optimizing-for-ads-in-free-llm-answers",
    title: "Ads in Free LLM Answers: What to Buy, What Gets Cited",
    author: "Mitchell Miller",
    date: "September 24, 2026",
    status: "published",
    teaser: "Three assistants put ads inside free answers, one uses your chats to target ads elsewhere, and one quit. Click an assistant to see who sees ads there, and why buying the ad still doesn't buy the citation.",
    metaDescription: "ChatGPT, Google AI Mode, Copilot, Perplexity and Meta AI compared: who sees ads, what advertisers can buy today, and what still earns a citation.",
    card: { src: "/viz/llm-ads-mandala/ads-in-free-llm-answers-data-mandala-1200x630.png", alt: "Data mandala of five AI assistants across three rings: who sees the ads, how often (ChatGPT 25.94% and Google AI Mode 29.45% of commercial prompts carried an ad) and what gets cited (AI Mode advertisers' own domains 11.53%). Hub: 5.6% of ChatGPT's 900M weekly users pay." },
    contentHtml: `<p><em>By Mitchell Miller · ~7 min read · AI search / paid media · September 24, 2026</em></p>
<p>Three of the five assistants compared here place ads inside free answers: ChatGPT (Free and Go tiers, self-serve from $25 a day), Google&#39;s AI Mode and AI Overviews (through existing Search, Shopping and Performance Max campaigns) and Microsoft Copilot (sponsored recommendations). Meta AI uses chats to target ads elsewhere. Perplexity quit ads in February 2026.</p>
<figure class="viz-embed">
  <iframe src="/viz/llm-ads-mandala/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Foptimizing-for-ads-in-free-llm-answers%2F"
          title="Ads inside free AI answers: five-assistant data mandala"
          loading="lazy" width="100%" height="1120"
          style="display:block;width:100%;border:1px solid #0f2440;border-radius:10px"></iframe>
  <noscript>
    <img src="/viz/llm-ads-mandala/poster-1080x1350.png" width="1080" height="1350"
         alt="Data mandala: ChatGPT, Google AI Mode, Microsoft Copilot, Perplexity and Meta AI as five sectors across three rings: who sees the ads, how often they appear (ChatGPT 25.94%, AI Mode 29.45% of commercial prompts) and what gets cited (AI Mode ad buyers' domains 11.53%). Hub: 5.6% of ChatGPT's weekly users pay. Dashed cells are not disclosed or not measured."
         style="display:block;width:100%;height:auto;border-radius:10px" />
  </noscript>
  <figcaption>
    <strong>Click an assistant: see who sees ads there, and what still earns a citation.</strong>
    The rail under the wheel gives each medallion its study; dashed grey cells are figures the company hasn't published or no study has measured.
    <a href="/viz/llm-ads-mandala/">Open the full-screen version</a> if the frame is cut off.
  </figcaption>
</figure><h2>TL;DR: three numbers</h2>
<ul>
<li><strong>5.6%</strong> of ChatGPT&#39;s weekly users pay: 50 million paying subscribers against 900 million weekly users. <em>(OpenAI, via TechCrunch, 27 February 2026.)</em></li>
<li><strong>25.94%</strong> of 50,006 commercial ChatGPT prompts returned an ad; 14.35% of those ads were off-target. <em>(SE Ranking, data collected 23 July 2026.)</em></li>
<li><strong>11.53%</strong>: how often advertisers&#39; own domains appeared among Google AI Mode&#39;s cited sources on keywords showing their text ad. The exact ad URL: <strong>1.95%</strong>. <em>(SE Ranking, 50,032 keywords, 30 June 2026.)</em></li>
</ul>
<h2 id="assistant-chatgpt">Can you buy ads inside ChatGPT?</h2><p>Yes, self-serve, from $25 a day per campaign. Ads have run on the Free and Go ($8 a month) tiers since 9 February 2026, to logged-in adults, US first; the UK, Mexico, Brazil, Japan and South Korea followed on 11 August. Plus, Pro, Business, Enterprise and Edu are ad-free <em>(OpenAI, via MacRumors and Help Net Security)</em>, and with 50 million paying against 900 million weekly users, more than nine in ten sit on a tier that can carry ads.</p>
<p>Ads are labeled and set apart from the answer. Since 16 September, a Sponsored Agents pilot opens a labeled chat with the brand&#39;s own AI agent (US; Wayfair, HubSpot and Shopify named) <em>(OpenAI, via Forkast)</em>.</p>
<p>SE Ranking measured ads on 25.94% of commercial prompts, 14.35% of them off-target. An academic audit of 91 test accounts and 3,000+ ads found lower-income accounts received more ads, regardless of race signal <em>(Lurie, Encarnación, Friedler and Metaxa, arXiv, August 2026)</em>.</p>
<p>What still earns a citation: ChatGPT cites 4.5 sources per answer, skewed to documentation, papers and vendor pricing and help pages <em>(Orbit Media, 2 September 2026)</em>. OpenAI&#39;s policy says ads don&#39;t influence answers.</p>
<h2 id="assistant-google-ai-mode">How do ads get into Google AI Mode and AI Overviews?</h2><p>Through campaigns you already run; neither surface can be targeted directly. Existing Search, Shopping and Performance Max campaigns become eligible for AI Overviews automatically; advertisers can&#39;t target that placement or opt out, and sensitive verticals are excluded <em>(Google Ads Help)</em>. AI Mode takes AI Max, Performance Max, broad match with Smart Bidding, Dynamic Search Ads and Shopping. Since 4 September a small test also admits exact and phrase match &quot;where there is explicit and direct user intent&quot; <em>(Google Ads Liaison Ginny Marvin, via PPC Land)</em>. The Gemini app is a separate product with no ads today, though Google SVP Nick Fox told WIRED &quot;we&#39;re not ruling them out&quot; <em>(WIRED, 12 March 2026)</em>. Google discloses no paid split.</p>
<p>Measured: of 50,032 commercial keywords picked because they trigger text ads, 29.45% showed one in AI Mode on 30 June, more often as cost per click rose (24% under $2, 53.56% at $10+). On those keywords, advertisers&#39; own domains appeared among AI Mode&#39;s cited sources 11.53% of the time; the exact ad URL, 1.95% <em>(SE Ranking, 14 July 2026)</em>.</p>
<p>What still earns a citation: 54.5% of AI Overview citations also rank organically in top positions <em>(BrightEdge, September 2025)</em>. The inference: organic rank, not the ad buy, is the route into the answer.</p>
<h2 id="assistant-copilot">Does Microsoft Copilot show ads in its answers?</h2><p>Yes, as labeled sponsored recommendations on commercial queries, tested from late 2024 and generally available in 2025. No Copilot-only campaign type exists; placements draw on existing Microsoft Advertising Search, Shopping and Performance Max campaigns <em>(secondary reporting; Microsoft documents its ad-buying assistant, not this placement)</em>.</p>
<p>Who sees them: consumer Copilot, about 145 million monthly users. The consumer paid count isn&#39;t disclosed, and the 28 million paid seats are Microsoft 365 enterprise licences <em>(Microsoft figures, via Panto)</em>. The only performance data is Microsoft&#39;s own: 73% higher click-through and 16% higher conversion than traditional search, February to May 2025, unaudited <em>(Microsoft Advertising, 6 August 2025)</em>. No Copilot citation study turned up.</p>
<h2 id="assistant-perplexity">Can you still advertise on Perplexity?</h2><p>No. Sponsored follow-up questions ran from 12 November 2024; new advertisers were paused in October 2025 and ads ended in February 2026. Ad revenue in 2024 was about $20,000 of $34 million; an executive told the Financial Times the company is in &quot;the accuracy business&quot; <em>(ALM Corp, 18 February 2026)</em>. There is no program and no waitlist.</p>
<p>No one sees ads across its 100M+ monthly users; paid-share estimates (~1% vs 5–7%) contradict each other. The citation is the only door: Perplexity cites 19.2 sources per answer, the most of four assistants tracked, led by LinkedIn, YouTube and Reddit <em>(Orbit Media)</em>.</p>
<h2 id="assistant-meta-ai">Does Meta AI show ads?</h2><p>Not inside the chat. Since 16 December 2025, Meta has used Meta AI conversations to personalize content and ads across its apps in most regions, excluding sensitive topics like health <em>(Meta, 1 October 2025)</em>; the EU, the UK and South Korea are left out <em>(Proton)</em>. A shopping-carousel test inside Meta AI has run since March 2026, US and web only; Meta hasn&#39;t confirmed a sponsored label or said whether advertisers get priority <em>(MediaPost)</em>.</p>
<p>Reach: 1.2–1.5 billion monthly users by a broad count, about 640 million counting deliberate use; no consumer paid tier is live <em>(DemandSage)</em>. No Meta AI placement exists; standard Facebook, Instagram and WhatsApp ads are the route, now shaped partly by the chats. No Meta AI citation study turned up.</p>
<h2>What a small business or consultant does this quarter</h2>
<p>Missing on purpose: a Perplexity advertiser waitlist, which doesn&#39;t exist.</p>
<table>
<thead>
<tr>
<th>Lever</th>
<th>Cost</th>
<th>Eligibility</th>
<th>The catch</th>
</tr>
</thead>
<tbody><tr>
<td>Test ChatGPT ads</td>
<td>$25 a day per campaign</td>
<td>US, Canada, Australia, New Zealand or 31 European markets; Persona verification</td>
<td>$3–5 a click buys 5–8 clicks a day, too few to read conversion <em>(Top Growth Marketing)</em></td>
</tr>
<tr>
<td>Migrate to AI Max on your schedule</td>
<td>No added fee found</td>
<td>Search campaigns using automatically created assets or campaign broad match; upgrades began 1 September</td>
<td>No opt-out; less keyword control; AI Overview placement can&#39;t be targeted or declined</td>
</tr>
<tr>
<td>Import Google Ads into Microsoft Advertising</td>
<td>Free, one-time or scheduled</td>
<td>A linked Google Ads account</td>
<td>Audiences don&#39;t transfer; low bids get raised to Microsoft&#39;s floors <em>(Microsoft Learn)</em></td>
</tr>
<tr>
<td>Claim your category&#39;s review profiles</td>
<td>$0 to claim</td>
<td>G2 and Capterra for software</td>
<td>Inclusion, not rank: every ChatGPT-named SaaS tool had Capterra reviews; review counts didn&#39;t predict placement <em>(Quoleady)</em></td>
</tr>
<tr>
<td>Earn citations per assistant</td>
<td>Editorial time</td>
<td>Anyone</td>
<td>ChatGPT leans on primary docs, Perplexity on LinkedIn, YouTube and Reddit; four assistants agree on a cited domain 1.7% of the time <em>(Orbit Media)</em></td>
</tr>
</tbody></table>
<p>Wikidata and Wikipedia entries are widely recommended, not independently measured.</p>
<p>The prompt-set tracking I&#39;ve built for AI citation share covers ChatGPT, Perplexity and Google AI Overviews (<a href="/case-studies/aeo-visibility-infrastructure/">case study</a>). Report each assistant on its own line: at 1.7% agreement, a blended score hides more than it shows (measurement framework).</p>
<h2>Does schema markup earn AI citations?</h2>
<p>Unresolved. Figures attributed to BrightEdge claim 44% more AI citations for sites with structured data, and 3.2 times as many for 73 sites with proper schema. Ahrefs tested 1,885 pages and found no citation uplift from schema alone. A February 2026 SSRN preprint by Kurt Fischman leans skeptical. None was re-fetched verbatim here. This site argues entity structure helps models understand a brand (entity SEO for AI retrieval); whether markup moves citation rates is a narrower, unsettled claim. Ship schema as hygiene; don&#39;t sell it as a citation lever.</p>
<h2>How this connects to zero-click</h2>
<p><a href="/blog/search-results-by-intent/">Search Results by Intent</a> mapped how often a results page ends without a click. When the answer keeps the session, the ad moves into the answer: Alphabet earned more than 70% of its 2025 revenue from advertising <em>(Form 10-K)</em>, and in Pew&#39;s panel just 1% of visits to a page with an AI summary clicked a link inside it <em>(July 2025)</em>. Paying puts a brand beside the answer; the citation stays the unpaid route in.</p>
<p><strong>Limits.</strong> SE Ranking&#39;s numbers are single-date snapshots; Orbit&#39;s tracker covers 72 prompts for three B2B brands; OpenAI&#39;s figures reach this piece through other outlets. Google changed AI Mode ads twice in twelve days this month <em>(PPC Land, 4 September; Search Engine Watch, 16 September)</em>.</p>
<p><strong>Share this with someone deciding whether to put budget into ChatGPT ads this quarter.</strong></p>
<hr>
<h2>FAQ</h2>
<h3>How much does it cost to advertise in ChatGPT?</h3>
<p>The floor is $25 a day per campaign, self-serve, with Persona verification, for businesses in the US, Canada, Australia, New Zealand or 31 European markets. At $3–5 a click that buys 5–8 clicks a day, too few to judge conversion.</p>
<h3>Does advertising in Google AI Mode get my site cited?</h3>
<p>Not on the evidence so far: on 50,032 ad-triggering keywords, advertisers&#39; own domains appeared among AI Mode&#39;s cited sources 11.53% of the time, the exact ad URL 1.95% (SE Ranking, 30 June 2026). Organic rank is the better-documented route: 54.5% of AI Overview citations also rank in top organic positions (BrightEdge).</p>
<h3>Are there ads in Gemini?</h3>
<p>Not in the Gemini app today. Google SVP Nick Fox told WIRED in March 2026 &quot;we&#39;re not ruling them out.&quot; Ads run in Search&#39;s AI Mode and AI Overviews, a separate product.</p>
<h3>Can I still buy ads on Perplexity?</h3>
<p>No. Perplexity ended ads in February 2026 after about $20,000 in 2024 ad revenue. There is no waitlist; the route in is citation, at 19.2 sources per answer (Orbit Media).</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to advertise in ChatGPT?","acceptedAnswer":{"@type":"Answer","text":"The floor is $25 a day per campaign, self-serve, with Persona verification, for businesses in the US, Canada, Australia, New Zealand or 31 European markets. At $3–5 a click that buys 5–8 clicks a day, too few to judge conversion."}},{"@type":"Question","name":"Does advertising in Google AI Mode get my site cited?","acceptedAnswer":{"@type":"Answer","text":"Not on the evidence so far: on 50,032 ad-triggering keywords, advertisers' own domains appeared among AI Mode's cited sources 11.53% of the time, the exact ad URL 1.95% (SE Ranking, 30 June 2026). Organic rank is the better-documented route: 54.5% of AI Overview citations also rank in top organic positions (BrightEdge)."}},{"@type":"Question","name":"Are there ads in Gemini?","acceptedAnswer":{"@type":"Answer","text":"Not in the Gemini app today. Google SVP Nick Fox told WIRED in March 2026 \\"we're not ruling them out.\\" Ads run in Search's AI Mode and AI Overviews, a separate product."}},{"@type":"Question","name":"Can I still buy ads on Perplexity?","acceptedAnswer":{"@type":"Answer","text":"No. Perplexity ended ads in February 2026 after about $20,000 in 2024 ad revenue. There is no waitlist; the route in is citation, at 19.2 sources per answer (Orbit Media)."}}]}</script>
<hr>
<h2>Sources</h2>
<p>Primary and first-party, then reporting. Retrieved 24 September 2026 unless noted.</p>
<ol>
<li>Google Ads Help — <a href="https://support.google.com/google-ads/answer/16297775?hl=en">About ads and AI Overviews</a>. &quot;You can&#39;t directly target ad placements in the AI Overviews&quot;; no opt-out; sensitive-vertical exclusions.</li>
<li>SE Ranking — <a href="https://seranking.com/blog/google-ai-mode-ads/">Google AI Mode ads study</a>. 50,032 commercial keywords selected to trigger text ads, 20 niches, US, data 30 June 2026; published 14 July 2026. Write-up: <a href="https://www.searchenginejournal.com/google-ai-mode-shows-ads-on-1-in-3-commercial-keywords/582976/">Search Engine Journal</a>, 21 July 2026.</li>
<li>SE Ranking — <a href="https://seranking.com/blog/chatgpt-ads-study/">ChatGPT shows ads for 1 in 4 commercial prompts</a>. 50,006 prompts, 20 niches, US, data 23 July 2026; published 10 August 2026.</li>
<li>Orbit Media Studios (Bill Widmer) — <a href="https://www.orbitmedia.com/blog/ai-citation-sources/">LLM citation study</a>. 72 prompts, 3 B2B brands, 13,184 citations, 1,765 answers; published 2 September 2026.</li>
<li>Lurie, Encarnación, Friedler, Metaxa — <a href="https://arxiv.org/abs/2608.05008">The Beginning of ChatGPT Ads</a>. arXiv, submitted 5 August 2026; accepted to AAAI/ACM AIES 2026.</li>
<li>Microsoft Advertising — <a href="https://about.ads.microsoft.com/en/blog/post/august-2025/73-higher-ctrs-why-advertisers-need-to-pay-attention-to-conversational-ai">73% higher CTRs: why advertisers need to pay attention to conversational AI</a>. First-party data, February–May 2025; published 6 August 2025.</li>
<li>Microsoft Learn — <a href="https://learn.microsoft.com/en-us/advertising/guides/google-ads-import?view=bingads-13">Import campaigns from Google Ads</a>.</li>
<li>Meta — <a href="https://about.fb.com/news/2025/10/improving-your-recommendations-apps-ai-meta/">Improving your recommendations on our apps with AI at Meta</a>. Published 1 October 2025; effective 16 December 2025.</li>
<li>Quoleady — <a href="https://www.quoleady.com/llmo-research/">LLMO research</a>. SaaS &quot;alternatives&quot; prompts; published 4 June 2026.</li>
<li>BrightEdge — <a href="https://www.brightedge.com/resources/weekly-ai-search-insights/rank-overlap-after-16-months-of-aio">AI Overview citations now 54% from organic rankings</a>. Published 18 September 2025.</li>
<li>Alphabet Inc. — <a href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm">Form 10-K, fiscal year 2025</a>. &quot;More than 70% of total revenues from online advertising.&quot;</li>
<li>Pew Research Center — <a href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/">Do people click on links in Google AI summaries?</a> Published 22 July 2025.</li>
<li>TechCrunch — <a href="https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users">ChatGPT reaches 900M weekly active users</a>. 900M weekly users, 50M paying subscribers; 27 February 2026.</li>
<li>Help Net Security — <a href="https://www.helpnetsecurity.com/2026/08/31/chatgpt-ads-privacy-policy/">ChatGPT ads and the privacy policy</a>. Quotes OpenAI&#39;s Ads in ChatGPT policy; 31 August 2026.</li>
<li>MacRumors — <a href="https://www.macrumors.com/2026/02/09/chatgpt-now-has-ads/">ChatGPT now has ads</a>. 9 February 2026.</li>
<li>Forkast — <a href="https://forkast.news/openais-sponsored-agents-turn-chatgpt-into-an-ad-platform-where-brands-are-the-product/">OpenAI&#39;s Sponsored Agents</a>; Quartz — <a href="https://qz.com/openai-chatgpt-sponsored-agents-hubspot-shopify-091726">Sponsored Agents with HubSpot and Shopify</a>. September 2026.</li>
<li>Lapis — <a href="https://www.trylapis.com/resources/chatgpt-self-serve-ads-small-business-guide">ChatGPT self-serve ads for small businesses</a>. August 2026.</li>
<li>Top Growth Marketing — <a href="https://topgrowthmarketing.com/how-much-do-chatgpt-ads-cost/">How much do ChatGPT ads cost</a>. Updated 24 September 2026.</li>
<li>PPC Land — <a href="https://ppc.land/exact-and-phrase-match-keywords-gain-ai-mode-ads-in-google-test/">Exact and phrase match keywords gain AI Mode ads in Google test</a>. 4 September 2026.</li>
<li>Search Engine Watch — <a href="https://searchenginewatch.com/google-ai-mode-now-showing-descriptions-for-ads/">Google AI Mode now showing descriptions for ads</a>. 16 September 2026.</li>
<li>WIRED (Maxwell Zeff) — <a href="https://www.wired.com/story/google-nick-fox-advertising-search-ai-gemini/">Google Is Not Ruling Out Ads in Gemini</a>. Interview with Google SVP Nick Fox: &quot;No, we&#39;re not ruling them out. It&#39;s just not where we&#39;ve been focusing.&quot; 12 March 2026. It supersedes Google&#39;s December 2025 denial (<a href="https://searchengineland.com/google-corrects-report-claiming-ads-are-coming-to-gemini-in-2026-465856">Search Engine Land</a>).</li>
<li>Search Engine Land — <a href="https://searchengineland.com/google-to-auto-upgrade-some-search-campaigns-to-ai-max-484428">Google to auto-upgrade some Search campaigns to AI Max</a>. Auto-upgrade from 1 September 2026.</li>
<li>Implicator — <a href="https://www.implicator.ai/google-puts-gemini-at-1-billion-monthly-users-without-naming-paying-subscribers/">Google puts Gemini at 1 billion monthly users</a>. August 2026.</li>
<li>ALM Corp — <a href="https://almcorp.com/blog/perplexity-ai-abandons-advertising-2026-analysis/">Perplexity AI abandons advertising</a>. 18 February 2026. Launch detail: <a href="https://searchengineland.com/perplexity-begins-testing-ads-448277">Search Engine Land, Perplexity begins testing ads</a>.</li>
<li>Resourcera — <a href="https://resourcera.com/data/artificial-intelligence/perplexity-ai-statistics/">Perplexity AI statistics</a>; DemandSage — <a href="https://www.demandsage.com/meta-ai-users/">Meta AI users</a>. Third-party aggregations, 2026.</li>
<li>Panto — <a href="https://www.getpanto.ai/blog/microsoft-copilot-statistics">Microsoft Copilot statistics</a>. Q1 2026 figures.</li>
<li>Proton — <a href="https://proton.me/blog/meta-ai-ads">Meta AI ads</a>. December 2025.</li>
<li>MediaPost — <a href="https://www.mediapost.com/publications/article/413248/">Meta AI shopping test</a>. March 2026.</li>
<li>Kurt Fischman — <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6284518">Does schema markup predict AI citation?</a> SSRN preprint, February 2026. BrightEdge&#39;s 73-site claim and Ahrefs&#39; 1,885-page test were reached through secondary aggregation and not re-fetched.</li>
<li>Thrad and Stackmatix — secondary reporting on Copilot&#39;s in-answer ad placement.</li>
</ol>`,
  },
  {
    slug: "growth-title-market",
    title: "Ten Job Titles, Two Right Answers Each",
    author: "Mitchell Miller",
    date: "September 24, 2026",
    status: "published",
    teaser: "On 14 September 2026 I counted ten growth, SEO and AI-search job titles twice — once by exact phrase, once by keyword match — and pulled every published salary figure for each. One title returned zero postings on one board and 10,000+ on another. Two salary sources disagree by 3.5x on the same title. The living version lets you check all ten.",
    metaDescription: "Ten growth, SEO and AI-search job titles counted on one day: exact-phrase postings against loose keyword counts, and every published pay figure.",
    contentHtml: `<p><em>By Mitchell Miller · ~4 min read · job market / measurement / AI search</em></p>
<h2>TL;DR</h2>
<ul>
<li><strong>0 against 10,000+.</strong> &quot;Growth Operations Engineer&quot; returned zero results on SimplyHired&#39;s exact-phrase US search on 14 September 2026 — the page says so in a sentence — while LinkedIn&#39;s public guest search claimed 10,000+ for the same three words on the same day.</li>
<li><strong>$101,752 against $359,824.</strong> Two salary sources publish a median for &quot;Growth Engineer&quot;. They are 3.5x apart. Glassdoor&#39;s figure rests on 38 self-reported salaries.</li>
<li><strong>12.2% to 20.3% in six months.</strong> The share of SEO job ads naming AI search, GEO or AEO nearly doubled between December 2025 and June 2026, across a study of 328,650 marketing postings — and those postings carry a median $117,500 against $97,500 for ones that don&#39;t.</li>
</ul>
<h2>Open the artifact, not the summary</h2>
<figure class="viz-embed">
  <iframe src="/viz/growth-title-market/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fgrowth-title-market%2F"
    title="Ten job titles, two right answers: an interactive data mandala of US postings, published pay and dated signals for ten growth, SEO and AI-search titles"
    loading="lazy" width="100%" height="1560"
    style="display:block;width:100%;border:1px solid #d9e1ea;border-radius:10px"></iframe>
  <noscript>
    <img src="/viz/growth-title-market/poster-1080x1350.png" width="1080" height="1350"
         alt="Data mandala of ten growth, SEO and AI-search job titles across three rings: exact-phrase US postings against LinkedIn's placeholder, the lowest and highest published median pay, and the dated signal for each title. Hub: Growth Operations Engineer, 0 exact-phrase postings against 10,000+ on LinkedIn, 14 September 2026."
         style="display:block;width:100%;height:auto;border-radius:10px" />
  </noscript>
  <figcaption>
    Click any of the ten titles for every board count, every published pay figure and every dated signal, then jump to its section. The sources drawer dates all 21.
    <a href="/viz/growth-title-market/">Open the full-screen version</a> if the frame is cut off.
  </figcaption>
</figure><h2 id="title-director-of-seo">The floor</h2><p>Nineteen. That is how many US postings SimplyHired returned for the exact phrase <strong>&quot;director of SEO&quot;</strong> on 14 September 2026. Built In returned zero. <em>Reading: the title most often used for senior organic-search ownership is, as a literal string employers type, rare.</em></p>
<h2>The ceiling</h2>
<p>LinkedIn&#39;s public guest search returned 3,000+ for the same words on the same day — 158 times the exact-phrase count. Its own topic page, for the adjacent phrase, returned a much tighter 74. <em>Reading: <strong>job board counts</strong> are not one measurement. A round ceiling and a literal count answer different questions, and only one of them is countable.</em></p>
<h2 id="title-growth-ops-engineer">The zero</h2><p>Nine of the ten titles have a floor. <strong>Growth Operations Engineer</strong> has none: SimplyHired states plainly that it could not find any such job in the United States, while LinkedIn showed 10,000+. <em>Reading: this is job-description language, not a title people are hired under. It describes work accurately and costs you the search.</em></p>
<h2 id="title-growth-engineer">The disagreement</h2><p>Ask what a <strong>growth engineer salary</strong> is and you get four answers. ZipRecruiter returns $101,752 on one of its own URL slugs and $146,868 on another. GTME Pulse, working from Levels.fyi, lands at $160,000. Glassdoor says $359,824 from a sample of 38. End to end, the published band for this one title runs $84,000 to $503,754. <em>Reading: do not average these. The spread is the finding, and it is widest where the title is least standardised.</em></p>
<h2 id="title-gtm-engineer">The one that is actually growing</h2><p><strong>GTM Engineer jobs</strong> are the only title in the set with a growth rate measured on the title itself and quotable from its live source. GTME Pulse states, as the page reads today: &quot;GTM Engineer job postings grew 205% year-over-year from 2024 to 2025,&quot; and &quot;As of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards.&quot; (Rome Thorndike, March 2026; re-checked 14 September 2026.) Its exact-phrase floor is 146, the second-highest here. <em>Reading: when the floor and the trend agree, the title is real.</em></p>
<h2 id="title-head-of-aeo">The payoff</h2><p>Now the number that pays for the other five. In a study of 328,650 marketing postings collected over twelve months, 720 carried AI search, GEO or AEO directly in the job title — and 28% of those were Director, Head, VP, Principal or Lead, against 15% for standard SEO titles. Across 13,779 postings with advertised salaries, naming AI-search skills was worth a 20.5% median premium.</p>
<p><em>Reading: <strong>AI search job titles</strong> are not a junior specialism being bolted onto marketing. They are being hired at the level where budget is set, and they pay more before anyone has agreed what to call them. That is the window, and windows close when the vocabulary settles.</em></p>
<h2 id="how-to-read">How to read these numbers</h2><ul>
<li><strong>The LinkedIn figures are placeholders, not counts.</strong> All ten titles returned a round &quot;X,000+&quot; from the public guest search, including titles with one real posting or none. They do not track rarity, so every gap shown is a lower bound rather than a measurement.</li>
<li><strong>The floor is a literal count.</strong> Exact phrase, United States, one board, one day. A zero is a real zero, and a floor, not a total: adjacent titles are not in it.</li>
<li><strong>Nothing is averaged.</strong> Where sources disagree on pay, the artifact shows both ends and prints the distance. Two titles have no title-specific pay data at all; their figures are proxies from an adjacent title, marked <strong>thin data</strong> wherever they appear.</li>
<li><strong>There is no Google Trends data here.</strong> The public explore page rate-limited during the research window, so relative interest is absent from every title rather than present for some.</li>
<li><strong>One count is not a count of titles.</strong> The Head of AEO/GEO figure of 435 counts postings where AEO and GEO both appear anywhere, so it is labelled <strong>mentions, not titles</strong> and held out of the ranking rather than allowed to top it.</li>
<li><strong>One claim was withdrawn, not caveated.</strong> A widely-repeated 127% growth figure for RevOps traces to one trade article citing a report with no link and no methodology. That dataset could not be reached, so the figure appears nowhere on the artifact.</li>
<li><strong>Two measurements and a signal.</strong> The outer rings count how many jobs exist and what they pay, each as a floor and a ceiling. The inner ring is a dated signal, not a measurement: one title in ten has a growth rate measured on the title itself, one has a dated count of AI-search titles, four carry a whole-category figure, and the other four say not measured, or claim pulled.</li>
</ul>
<h2>FAQ</h2>
<h3>How many Director of SEO jobs are open in the US?</h3>
<p>Nineteen matched the exact phrase on SimplyHired on 14 September 2026, and zero on Built In. LinkedIn&#39;s guest search showed 3,000+ for the same words, but that is a loose keyword match, not a title count. Treat the literal count as a floor and the keyword count as an upper bound on a different question.</p>
<h3>Why do salary sites disagree about growth engineer pay?</h3>
<p>Because they are measuring different populations under one label. ZipRecruiter&#39;s national averages, Glassdoor&#39;s self-reported sample of 38, and Levels.fyi-derived total compensation including equity are three different things. For Growth Engineer they land $101,752, $359,824 and $160,000. Read the band, not a single figure.</p>
<h3>Which growth or AI-search job title is actually growing?</h3>
<p>GTM Engineer is the only one in this set with a growth rate measured on the title itself. Its cited source states that GTM Engineer postings &quot;grew 205% year-over-year from 2024 to 2025&quot; and that &quot;as of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards&quot; (GTME Pulse, March 2026, re-checked 14 September 2026). Six of the ten titles have no dated growth figure at all, and three of the rest measure a whole category rather than the title.</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many Director of SEO jobs are open in the US?","acceptedAnswer":{"@type":"Answer","text":"Nineteen matched the exact phrase on SimplyHired on 14 September 2026, and zero on Built In. LinkedIn's guest search showed 3,000+ for the same words, but that is a loose keyword match, not a title count. Treat the literal count as a floor and the keyword count as an upper bound on a different question."}},{"@type":"Question","name":"Why do salary sites disagree about growth engineer pay?","acceptedAnswer":{"@type":"Answer","text":"Because they are measuring different populations under one label. ZipRecruiter's national averages, Glassdoor's self-reported sample of 38, and Levels.fyi-derived total compensation including equity are three different things. For Growth Engineer they land $101,752, $359,824 and $160,000. Read the band, not a single figure."}},{"@type":"Question","name":"Which growth or AI-search job title is actually growing?","acceptedAnswer":{"@type":"Answer","text":"GTM Engineer is the only one in this set with a growth rate measured on the title itself. Its cited source states that GTM Engineer postings \\"grew 205% year-over-year from 2024 to 2025\\" and that \\"as of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards\\" (GTME Pulse, March 2026, re-checked 14 September 2026). Six of the ten titles have no dated growth figure at all, and three of the rest measure a whole category rather than the title."}}]}</script>
<h2>Sources</h2>
<p>Every figure above, and every figure on the artifact, carries its source and retrieval date in the artifact&#39;s sources drawer. The load-bearing ones:</p>
<ul>
<li>SimplyHired, exact-phrase US job search, retrieved 14 September 2026 — <a href="https://www.simplyhired.com/">https://www.simplyhired.com/</a></li>
<li>LinkedIn, public guest job search, retrieved 14 September 2026 — <a href="https://www.linkedin.com/jobs/">https://www.linkedin.com/jobs/</a></li>
<li>Built In, keyword job search, retrieved 14 September 2026 — <a href="https://builtin.com/jobs">https://builtin.com/jobs</a></li>
<li>SearchForHire, &quot;The Future of Search: 5 Experts and 328,650 Job Postings,&quot; 15 July 2026 — <a href="https://www.searchforhire.com/blog/the-future-of-search-5-experts-and-328650-job-postings-on-what-happens-next/">https://www.searchforhire.com/blog/the-future-of-search-5-experts-and-328650-job-postings-on-what-happens-next/</a></li>
<li>Bloomberry, &quot;I analyzed 1000 GTM Engineering jobs,&quot; published 3 October 2025, updated 25 January 2026 — <a href="https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/">https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/</a></li>
<li>GTME Pulse, job-market analysis 2026 — <a href="https://gtmepulse.com/insights/job-market-2026/">https://gtmepulse.com/insights/job-market-2026/</a></li>
<li>ZipRecruiter salary pages, August 2026 — <a href="https://www.ziprecruiter.com/Salaries/">https://www.ziprecruiter.com/Salaries/</a></li>
<li>Glassdoor salary pages, May 2026 — <a href="https://www.glassdoor.com/Salaries/">https://www.glassdoor.com/Salaries/</a></li>
<li>Levels.fyi, GTM Engineer, last updated 14 September 2026 — <a href="https://www.levels.fyi/t/gtm-engineer">https://www.levels.fyi/t/gtm-engineer</a></li>
<li>Kaleigh Moore, &quot;AEO Job Openings in 2026,&quot; 6 July 2026 — <a href="https://www.kaleighmoore.com/blog/2026/7/6/ai-search-jobs">https://www.kaleighmoore.com/blog/2026/7/6/ai-search-jobs</a></li>
<li>Sloane Staffing, &quot;AEO/GEO Hiring in 2026,&quot; 11 August 2026 — <a href="https://www.sloane-staffing.com/insights/aeo-geo-hiring-2026/">https://www.sloane-staffing.com/insights/aeo-geo-hiring-2026/</a></li>
<li>The Pragmatic Engineer, &quot;What is Growth Engineering?&quot;, 20 March 2025 — <a href="https://newsletter.pragmaticengineer.com/p/what-is-growth-engineering">https://newsletter.pragmaticengineer.com/p/what-is-growth-engineering</a></li>
</ul>
<p>The remaining nine sources — Salary.com, Robert Half, Growth.Talent, Agents for Hire, CRM Today, JobsPikr, ALM Corp citing Semrush, GTM 8020 and Kalungi — are listed with dates inside the artifact.</p>
<p><strong>Share this with someone who is about to pick a job title for their resume.</strong> Send them the living version and let them check their own title: <a href="/viz/growth-title-market/">/viz/growth-title-market/</a></p>`,
  },
  {
    slug: "b2b-vs-b2c-by-vertical",
    title: "In Education, Winning a B2B Customer Costs 7.3× More Than Winning a B2C One",
    author: "Mitchell Miller",
    date: "September 24, 2026",
    status: "published",
    teaser: "The widest same-vertical acquisition-cost gap in this dataset is 7.3×. The narrowest is 1.3×. Both are \"B2B vs B2C.\" Pick a vertical in the living artifact and watch the number that's actually true for your market.",
    metaDescription: "Interactive B2B vs B2C benchmarks by industry: acquisition cost, conversion, paid search and email — real 2026 data, sourced, gaps shown honestly.",
    contentHtml: `<p><em>By Mitchell Miller · ~7 min read · growth benchmarks / applied data</em></p>
<h2>TL;DR</h2>
<ul>
<li><strong>Acquisition cost, same vertical, both editions of the same report:</strong> the B2B/B2C gap runs from <strong>1.3×</strong> in ecommerce ($86 vs $66) to <strong>7.3×</strong> in education ($1,143 vs $156). Across every vertical this dataset can match, not one number describes it.</li>
<li><strong>&quot;Conversion rate&quot; is at least three numbers wearing one label.</strong> The SaaS/software category converts at 3.8% on a landing page (Unbounce) and 7.6% site-wide (Ruler Analytics) — both true, neither publisher splits the figure by B2B vs. B2C, and they&#39;re not the same measurement anyway.</li>
<li><strong>Reviews aren&#39;t the B2C-only habit they&#39;re assumed to be.</strong> 86% of B2B software buyers turned to peer-review sites to reach a final decision, per G2&#39;s 2021 survey; roughly 93% of consumers do the same before an ordinary purchase. The gap most people assume is there mostly isn&#39;t.</li>
</ul>
<h2>See it by vertical, not by average</h2>
<figure class="viz-embed">
  <iframe src="/viz/b2b-vs-b2c-by-vertical/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fb2b-vs-b2c-by-vertical%2F"
    title="B2B vs B2C by vertical — the cost to win one customer, ten verticals, three depths"
    loading="lazy" width="100%" height="2150"
    style="display:block;width:100%;border:0;"></iframe>
  <noscript>
    <img src="/viz/b2b-vs-b2c-by-vertical/poster-1080x1350.png" width="1080" height="1350" alt="Fractal-stack infographic. Winning one customer costs 7.3 times more for B2B than for B2C in Education ($1,143 vs $156). Ten verticals ranked by that gap, from 7.3x to 1.3x, with three that have no ratio. Education is opened: paid search, site conversion and email click rate are single figures their sources do not split; touchpoints are cross-industry; review reliance, landing-page conversion and sales cycle have no source." style="width:100%;height:auto;">
  </noscript>
  <figcaption><strong>Click a vertical: see what it costs to win a customer on each side.</strong> Every number carries its source and date; real gaps show as "no source," never a guess. <a href="/viz/b2b-vs-b2c-by-vertical/">Open the full-screen version</a> if the frame is cut off.</figcaption>
</figure><h2>Acquisition cost: the range hiding inside the average</h2>
<p>The most-repeated version of this stat compares two B2B figures from different industries: a B2B education customer costs <strong>$1,143</strong> to acquire; a B2B wholesale/ecommerce customer costs <strong>$86</strong> — same buyer type, same job, &quot;get a business to buy,&quot; a 13× spread between the two priciest and cheapest verticals in First Page Sage&#39;s entire B2B report. That&#39;s real, and it&#39;s the widest gap in the B2B column. What it is <em>not</em> is a B2B-vs-B2C comparison, whatever the shorthand version implies — both numbers are First Page Sage&#39;s B2B figures. The actual B2C ecommerce number is separate and lower still: $66.</p>
<p>Do the same-vertical version instead — First Page Sage&#39;s B2B and B2C reports, matched industry to industry — and the picture changes. Ecommerce: $86 vs $66, <strong>1.3×</strong>. Real estate: $791 vs $165, <strong>4.8×</strong>. Education: $1,143 vs $156, <strong>7.3×</strong>. Healthcare has no B2B figure in either report at all — a real gap, not a rounding error. Pick your own vertical in the artifact above; the number that matters is the one for your market, not the dataset&#39;s extreme.</p>
<h2>Conversion rate isn&#39;t one number</h2>
<p>This is the trap that catches the most benchmark decks. &quot;SaaS converts at 3.8%&quot; (Unbounce&#39;s SaaS landing-page category, 2024 data) and &quot;software converts at 7.6%&quot; (Ruler Analytics&#39; Software category, full site, 2026) are not in disagreement — they&#39;re answering different questions, and neither publisher splits its figure by B2B vs. B2C in the first place. One measures a single landing page; the other measures every visit to the whole site. Layer in paid-search conversion (a third, separate figure) and you get three legitimate &quot;conversion rate&quot; numbers per vertical, and a lot of decks that quietly average two of them into a number no single report actually measured.</p>
<h2>Paid search: the same click costs 4× more in one vertical than another</h2>
<p>WordStream&#39;s 2026 Google Ads benchmarks (13,000+ campaigns) put legal services at <strong>$131.63</strong> cost per lead against travel&#39;s <strong>$44.70</strong> — a gap driven almost entirely by cost-per-click ($9.87 vs $2.14), not by how often the ad gets clicked or the click converts. Three verticals in this dataset — SaaS, manufacturing, nonprofit — have no dedicated paid-search category at all in WordStream&#39;s 23-industry list. The artifact shows that as &quot;no source,&quot; not a zero.</p>
<h2>The sales cycle that goes unmeasured on the B2C side</h2>
<p>B2B sales-cycle length gets tracked in days by name — 60 for SaaS, 195 for financial services (sources disagree here by more than 2×; both are secondary and directional only), 162 for nonprofit B2B sales. B2C doesn&#39;t get the same treatment: no benchmark report in this pass quantifies &quot;B2C sales cycle&quot; in days the way B2B reports do, because consumer purchases are mostly treated as near-instant. That absence is itself the finding, not a missed search.</p>
<p>Touchpoints tell a similar story at a different scale: published B2B figures range from <strong>27 to 417</strong> depending on deal size and how &quot;touchpoint&quot; is defined, against roughly <strong>6</strong> for a consumer purchase. No single number is &quot;the&quot; B2B touchpoint count — the spread is the fact.</p>
<h2>By vertical</h2>
<p>The artifact&#39;s ten verticals in its order, ranked by the acquisition-cost gap. Every figure carries its source, year and funnel stage; &quot;industry-wide&quot; means the source does not split B2B from B2C. Touchpoints are cross-industry, so they stay in the sales-cycle section above.</p>
<h3 id="vertical-education">Education</h3><p>Winning one customer costs $1,143 on the B2B side and $156 on the B2C side, a 7.3× gap (First Page Sage, B2B edition 2026, B2C edition 2025; full funnel). The B2C figure is consumer higher-ed, so part of that gap is a different buyer. Industry-wide: paid search, impression to lead, runs 7.56% click-through, $4.81 per click and $77.48 per lead (WordStream/LocaliQ, 2026); site conversion, any visit, is 6.3% (Ruler Analytics, 2026); email click rate, nurture, is 3.02% (Mailchimp, 2023 data). No source: landing-page conversion, sales cycle, review reliance.</p>
<h3 id="vertical-financial-services">Financial services</h3><p>Both First Page Sage editions list &quot;Financial Services&quot;: $784 per B2B customer, $160 per B2C customer, 4.9× (2026 and 2025; full funnel). B2B only: a 195-day sales cycle, first contact to close, from 2026 secondary roundups that disagree (another cites 9–18 months); B2C: no source. Industry-wide: paid search 9.83% click-through, $3.39 per click, $74.44 per lead (WordStream/LocaliQ, 2026); landing-page conversion 8.4% (Unbounce, 2023–24 data, lower confidence); site conversion 6.3% (Ruler Analytics, 2026); email click rate 2.78% (Mailchimp, 2023). Review reliance: no source.</p>
<h3 id="vertical-real-estate">Real estate</h3><p>&quot;Real Estate&quot; on both sides of First Page Sage: $791 per B2B customer, $165 per B2C customer, 4.8× (2026 and 2025 editions; full funnel). Industry-wide: paid search, impression to lead, runs 7.61% click-through, $3.22 per click and $102.51 per lead (WordStream/LocaliQ, 2026); site conversion, any visit, is 2.8% (Ruler Analytics, 2026). Promodo&#39;s 4.7% measures visitor to lead, a different stage, so it stays out of the chart. No source: landing-page conversion, sales cycle, email click rate, review reliance.</p>
<h3 id="vertical-travel-hospitality">Travel &amp; hospitality</h3><p>$683 to win a B2B customer against $228 for a B2C one, 3.0× (First Page Sage, 2026 and 2025 editions; full funnel), but the two sides are different sub-industries, Aviation and Hotels &amp; Resorts, so read the ratio directionally. Industry-wide: paid search, impression to lead, runs 9.32% click-through, $2.14 per click and $44.70 per lead (WordStream/LocaliQ, 2026); site conversion, any visit, is 1.9%, the lowest of Ruler Analytics&#39; 13 industries (2026). No source: landing-page conversion, sales cycle, email click rate, review reliance.</p>
<h3 id="vertical-professional-services">Professional services</h3><p>Legal services on both sides: $749 per B2B customer, $323 per B2C customer, 2.3× (First Page Sage, 2026 and 2025 editions; full funnel). Industry-wide: attorney paid search, impression to lead, runs 5.87% click-through, $9.87 per click and $131.63 per lead, the highest cost per click and per lead of WordStream/LocaliQ&#39;s 23 industries (2026); landing-page conversion is 6.1% (Unbounce, 2023–24 data); site conversion, any visit, 6.1% (Ruler Analytics, 2026); email click rate 4.9% (a 2026 aggregator, lower confidence). No source: sales cycle, review reliance.</p>
<h3 id="vertical-saas-software">SaaS &amp; software</h3><p>$239 per B2B SaaS customer against $166 for consumer SaaS, 1.4× (First Page Sage, 2026 and 2025 editions; full funnel). B2B only: 86% of B2B software buyers used peer-review sites to reach a final verdict (G2 survey, 2021; pre-click research), and the sales cycle runs about 60 days, first contact to close (2026 roundups); B2C: no source for either. Industry-wide: landing-page conversion is 3.8% (Unbounce, 2023–24 data) and site conversion, any visit, 7.6% (Ruler Analytics, 2026). No source: paid search, email click rate.</p>
<h3 id="vertical-ecommerce-retail">Ecommerce &amp; retail</h3><p>$86 per B2B customer, First Page Sage&#39;s wholesale and ordering-platform figure, against $66 in B2C ecommerce, 1.3× (2026 and 2025 editions; full funnel). B2B only: a 70-day wholesale sales cycle, first contact to close (2026 roundups); B2C: no source. Industry-wide: paid search 8.28% click-through, $4.14 per click, $49.40 per lead (WordStream/LocaliQ, 2026); landing-page conversion 4.2% (Unbounce, 2023–24 data); site conversion 2.4% (Ruler Analytics, 2026); email click rate 1.74% (Mailchimp, 2023). Review reliance: no source.</p>
<h3 id="vertical-healthcare">Healthcare</h3><p>No ratio here. First Page Sage&#39;s B2B edition (2026) has no healthcare category, so the B2B side is no source; B2C medical practices cost $148 per customer (2025 edition; full funnel). Industry-wide: paid search for physicians and surgeons, impression to lead, runs 6.61% click-through, $4.76 per click and $40.04 per lead, the lowest cost per lead here (WordStream/LocaliQ, 2026); site conversion, any visit, is 2.3% (Ruler Analytics, 2026). No source: landing-page conversion, sales cycle, email click rate, review reliance.</p>
<h3 id="vertical-manufacturing-industrial">Manufacturing &amp; industrial</h3><p>$723 to win a B2B manufacturing customer (First Page Sage B2B edition, 2026; full funnel). The B2C edition has no manufacturing category, so the consumer side is no source and there is no ratio. The only other figure is industry-wide: site conversion, any visit, is 4.9% for Ruler Analytics&#39; closest proxy, construction and engineering (2026). No source: paid search, landing-page conversion, sales cycle, email click rate, review reliance.</p>
<h3 id="vertical-nonprofit">Nonprofit</h3><p>Neither First Page Sage edition covers nonprofits, so both sides of acquisition cost are no source; the sector measures cost per donor instead. B2B only: selling to nonprofits takes about 162 days, first contact to close, the longest cycle cited (2026 roundups); B2C: no source. Industry-wide: 1.6% of site visitors donated (M+R, 2026, a different method), and the email click rate is 3.27% (Mailchimp, 2023 data), which M+R splits into 0.59% for fundraising asks and 2.3% for advocacy. No source: paid search, landing-page conversion, review reliance.</p>
<h2>How to read these numbers</h2>
<ul>
<li><strong>Three funnel stages, never one axis.</strong> Landing-page conversion (a single page), full-site conversion (any visit, anywhere), and paid-search conversion are different measurements. This piece and the artifact keep them in separate rows on purpose.</li>
<li><strong>Report years and sample sizes, because they vary a lot.</strong> Ruler Analytics: 110M+ sessions, 13 industries, 2026. Unbounce: 41,000 landing pages / 464M visitors, data through mid-2024. WordStream/LocaliQ: 13,000+ US Search campaigns, Apr 2025–Mar 2026. First Page Sage: anonymized client-analytics accounts, B2B edition data through Aug 2025 (published Jan 2026), B2C edition from 103 clients (published Jul 2025). Mailchimp&#39;s benchmark page was fetched September 2026 but states its underlying data was last updated December 2023 — still their current published figure, cited as such.</li>
<li><strong>&quot;Overall&quot; means the source didn&#39;t split B2B from B2C.</strong> Most conversion and paid-search figures here are industry-wide, not buyer-type-specific — marked plainly, never invented.</li>
</ul>
<h2>FAQ</h2>
<h3>Is B2B customer acquisition cost really higher than B2C?</h3>
<p>Usually, but the size of the gap depends entirely on the vertical — from roughly 1.3× in ecommerce to more than 7× in education, in matched First Page Sage data. A single blended &quot;B2B costs more&quot; number erases that range.</p>
<h3>Why do B2B and B2C conversion rate benchmarks disagree so much?</h3>
<p>Mostly because &quot;conversion rate&quot; describes at least three different funnel stages — a landing page, a full site, or a paid-search click — that different publishers measure differently. Two accurate numbers for the same vertical can look contradictory if you don&#39;t check which stage each one is measuring.</p>
<h3>Do B2B buyers read reviews as much as B2C shoppers?</h3>
<p>In the one vertical with sourced data on both sides, yes, almost as much: 86% of B2B software buyers turned to peer-review sites before a final decision (G2&#39;s 2021 B2B Software Behavior Survey) versus roughly 93% of consumers generally. The &quot;reviews are a B2C thing&quot; assumption doesn&#39;t hold up where it can actually be checked.</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is B2B customer acquisition cost really higher than B2C?","acceptedAnswer":{"@type":"Answer","text":"Usually, but the size of the gap depends entirely on the vertical — from roughly 1.3× in ecommerce to more than 7× in education, in matched First Page Sage data. A single blended \\"B2B costs more\\" number erases that range."}},{"@type":"Question","name":"Why do B2B and B2C conversion rate benchmarks disagree so much?","acceptedAnswer":{"@type":"Answer","text":"Mostly because \\"conversion rate\\" describes at least three different funnel stages — a landing page, a full site, or a paid-search click — that different publishers measure differently. Two accurate numbers for the same vertical can look contradictory if you don't check which stage each one is measuring."}},{"@type":"Question","name":"Do B2B buyers read reviews as much as B2C shoppers?","acceptedAnswer":{"@type":"Answer","text":"In the one vertical with sourced data on both sides, yes, almost as much: 86% of B2B software buyers turned to peer-review sites before a final decision (G2's 2021 B2B Software Behavior Survey) versus roughly 93% of consumers generally. The \\"reviews are a B2C thing\\" assumption doesn't hold up where it can actually be checked."}}]}</script>
<p><strong>Share this with someone about to build a &quot;B2B vs B2C&quot; slide from one benchmark study that doesn&#39;t say which funnel stage it measured.</strong></p>
<h2>Sources</h2>
<ul>
<li>First Page Sage, <a href="https://firstpagesage.com/reports/average-customer-acquisition-cost-cac-by-industry-b2b-edition-fc/">Average Customer Acquisition Cost (CAC) by Industry: B2B Edition</a> (Jan 2026) and <a href="https://firstpagesage.com/reports/average-cac-by-industry-b2c-edition/">B2C Edition</a> (Jul 2025).</li>
<li>Ruler Analytics, <a href="https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/">Conversion Rate Benchmarks 2026</a>.</li>
<li>Unbounce, <a href="https://unbounce.com/average-conversion-rates-landing-pages/">Conversion Benchmark Report</a>.</li>
<li>WordStream (LocaliQ), <a href="https://www.wordstream.com/blog/2026-google-ads-benchmarks">Google Ads Benchmarks 2026</a>.</li>
<li>Mailchimp, <a href="https://mailchimp.com/resources/email-marketing-benchmarks/">Email Marketing Benchmarks by Industry</a>.</li>
<li>M+R Benchmarks 2026, <a href="https://mrbenchmarks.com/email-messaging/">Email &amp; Messaging</a>.</li>
<li>G2 2021 B2B Software Behavior Survey, via <a href="https://www.demandgenreport.com/industry-news/new-research-86-of-b2b-software-buyers-rely-on-third-party-reviews-when-making-a-purchase-decision/7019/">DemandGen Report</a> (B2B review reliance; corrected Sept 14, 2026).</li>
</ul>`,
  },
  {
    slug: "statistician-vs-data-scientist",
    title: "Statistician vs Data Scientist — and Two Jobs With No BLS Code",
    author: "Mitchell Miller",
    date: "September 24, 2026",
    status: "published",
    teaser: "Statistician and data scientist both carry a BLS occupation code, a wage survey and a 2035 growth projection. Growth engineer and AI engineer carry neither. Real numbers, an interactive comparison, and the gaps shown rather than guessed.",
    metaDescription: "Real BLS pay, employment and 2035-growth data for statistician vs data scientist, plus the two roles with no official occupation code.",
    contentHtml: `<p><em>By Mitchell Miller · ~4 min read · labor data / applied statistics</em></p>
<h2>TL;DR</h2>
<ul>
<li>Data scientist employment is projected to grow <strong>35%</strong> from 2025–2035 — more than 3x statisticians&#39; <strong>11%</strong>. (<a href="https://www.bls.gov/ooh/math/data-scientists.htm">BLS Occupational Outlook Handbook</a>, 2025 edition)</li>
<li>Data scientists out-earn statisticians by <strong>$14,600</strong> a year at the national median (<a href="https://www.bls.gov/ooh/math/data-scientists.htm">$120,230</a> vs <a href="https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm">$105,650</a>) — but that flips inside computer systems design: statisticians <strong>$167,180</strong>, data scientists <strong>$132,380</strong> (same two BLS Occupational Outlook Handbook pages, industry pay tables).</li>
<li><strong>Growth engineer and AI engineer have no BLS occupation code at all</strong> — no SOC classification, no wage survey, no growth projection — even though AI engineer out-posts every other title on every job board checked. (<a href="https://www.bls.gov/soc/notices/2022/finding_soc_code.htm">BLS SOC lookup guidance</a>)</li>
</ul>
<figure class="viz-embed">
  <iframe src="/viz/statistician-vs-data-scientist/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fstatistician-vs-data-scientist%2F"
          title="Two roads into data: statistician vs data scientist journey map, with growth engineer and AI engineer as the two titles that have no BLS code"
          loading="lazy" width="100%" height="1000"
          style="display:block;width:100%;border:0;border-radius:10px;background:#FBF3E4"></iframe>
  <noscript>
    <img src="/viz/statistician-vs-data-scientist/poster-1080x1350.png" width="1080" height="1350"
         alt="Journey map: statistician and data scientist roads pass five stops (education gate, pay, employment and growth, tools, live postings) to a journey's end reading prove why versus predict what next; growth engineer and AI engineer end at signposts marked no BLS code."
         style="display:block;width:100%;height:auto;border-radius:10px" />
  </noscript>
  <figcaption>Click a stop on either road to jump to its section. <a href="/viz/statistician-vs-data-scientist/">Open the full-screen version</a> if the frame is cut off.</figcaption>
</figure><h2 id="role-no-bls-code">The gap in the data</h2><p>Statistician and data scientist each carry a BLS SOC code, an annual OEWS wage table and an Occupational Outlook Handbook page. Growth engineer and AI engineer carry neither — no code, no wage survey, no official growth projection exists for either title, confirmed against BLS&#39;s own SOC-lookup guidance. That&#39;s not a gap in this research; it&#39;s a gap in the federal government&#39;s occupational taxonomy. The map above shows it: both titles are dashed side paths that end at a &quot;no BLS code&quot; signpost, while statistician and data scientist run through all five stops. Click a stop on either road to jump to its section.</p>
<h2 id="role-pay">What each role pays</h2><p>Data scientists earn <a href="https://www.bls.gov/ooh/math/data-scientists.htm"><strong>$120,230</strong></a> a year at the national median against statisticians&#39; <a href="https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm"><strong>$105,650</strong></a> (BLS Occupational Outlook Handbook, 2025). But &quot;the&quot; data-scientist salary depends on which 2025 survey you read: Stack Overflow&#39;s global sample says <strong>$82,910</strong>; a US-only re-cut of that dataset says <strong>$160,000</strong>; BLS lands between. (<a href="https://survey.stackoverflow.co/2025/work">2025 Stack Overflow Developer Survey</a>) None of those is wrong — different scopes, not different facts, and averaging them would hide that. Growth engineer has no compensation survey tracking the title directly at all.</p>
<h2 id="role-growth">Who's growing faster</h2><p>Data scientist employment is projected to grow <strong>35%</strong> from 2025 to 2035; statistician, <strong>11%</strong>. (<a href="https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm">BLS Employment Projections</a>) Growth engineer and AI engineer have no projection to cite — the closest BLS-tracked cousin to &quot;AI engineer,&quot; Computer and Information Research Scientists, is projected at 22%, and it is explicitly a proxy, not a measurement of AI engineer itself.</p>
<h2 id="role-education">The education gate</h2><p><strong>62%</strong> of statisticians hold a master&#39;s degree as their highest credential; data scientists split <strong>48%</strong> bachelor&#39;s and <strong>44%</strong> master&#39;s — a materially lower graduate bar. (<a href="https://www.onetonline.org/link/summary/15-2051.00">O*NET OnLine</a>) Neither growth engineer nor AI engineer has an O*NET occupational profile to pull an education distribution from.</p>
<h2 id="role-practice">Prove why, or predict what's next</h2><p>Underneath the pay and growth numbers is a practice difference that explains most of the rest. A statistician&#39;s work is inference: design the study, quantify the uncertainty, defend the result under scrutiny — usually against data someone else already curated. A data scientist&#39;s work is prediction: build and ship a model optimized for forecast accuracy, usually after cleaning the messy data themselves. (<a href="https://yardstick.team/compare-roles/what-is-the-difference-between-data-scientist-and-statistician">Yardstick</a>) One is hypothesis-driven; the other, exploratory. (<a href="https://www.indeed.com/career-advice/finding-a-job/data-scientist-vs-statistician">Indeed Career Advice</a>) Prove why the number moved, or predict what moves it next — that split, more than the job titles, is what the pay and growth gaps above are actually pricing.</p>
<h2 id="role-methods">How to read these numbers</h2><p>Two BLS products disagree on purpose, not by error. Occupational Outlook Handbook employment counts run 5–8% higher than the raw OEWS survey estimate for the same occupation-year — OOH&#39;s Employment Projections program adjusts the OEWS number rather than repeating it, so both are legitimate. Survey pay figures carry the same caveat at a larger scale: a self-reported developer survey, a US-only cut of it, and a government wage census measure overlapping but different populations — why data-scientist pay above spans <strong>$82,910</strong> to <strong>$160,000</strong> before BLS&#39;s figure even enters the range. The artifact&#39;s sources drawer labels every number with its specific product and date rather than blending them into one line.</p>
<h2>FAQ</h2>
<h3>Is a data scientist the same as a statistician?</h3>
<p>No. Statisticians work hypothesis-driven inference on curated data; data scientists work exploratory prediction on data they usually clean themselves, per BLS occupational data and Indeed/Yardstick&#39;s role comparisons.</p>
<h3>Which pays more, statistician or data scientist?</h3>
<p>Data scientist, at the national median (<a href="https://www.bls.gov/ooh/math/data-scientists.htm">$120,230</a> vs <a href="https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm">$105,650</a>) — but statistician pays more specifically inside computer systems design ($167,180 vs $132,380, same two BLS Occupational Outlook Handbook pages&#39; industry tables).</p>
<h3>Do growth engineer and AI engineer have official job classifications?</h3>
<p>No. Neither has a BLS SOC occupation code, wage table or growth projection; job-board volume and practitioner surveys are the only available signal for either title.</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is a data scientist the same as a statistician?","acceptedAnswer":{"@type":"Answer","text":"No. Statisticians work hypothesis-driven inference on curated data; data scientists work exploratory prediction on data they usually clean themselves, per BLS occupational data and Indeed/Yardstick's role comparisons."}},{"@type":"Question","name":"Which pays more, statistician or data scientist?","acceptedAnswer":{"@type":"Answer","text":"Data scientist, at the national median ( $120,230 vs $105,650 ) — but statistician pays more specifically inside computer systems design ($167,180 vs $132,380, same two BLS Occupational Outlook Handbook pages' industry tables)."}},{"@type":"Question","name":"Do growth engineer and AI engineer have official job classifications?","acceptedAnswer":{"@type":"Answer","text":"No. Neither has a BLS SOC occupation code, wage table or growth projection; job-board volume and practitioner surveys are the only available signal for either title."}}]}</script>
<h2>Sources</h2>
<ul>
<li>BLS Occupational Outlook Handbook — <a href="https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm">Statisticians/Mathematicians</a> · <a href="https://www.bls.gov/ooh/math/data-scientists.htm">Data Scientists</a> · <a href="https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm">Computer and Information Research Scientists</a> — 2025 edition, modified 2026-08-27</li>
<li><a href="https://www.bls.gov/news.release/ocwage.t01.htm">BLS Occupational Employment and Wage Statistics, Table 1</a> — news release USDL-26-0725, May 2025</li>
<li>O*NET OnLine — <a href="https://www.onetonline.org/link/summary/15-2041.00">Statisticians 15-2041.00</a> · <a href="https://www.onetonline.org/link/summary/15-2051.00">Data Scientists 15-2051.00</a></li>
<li><a href="https://www.bls.gov/soc/notices/2022/finding_soc_code.htm">BLS SOC-code lookup guidance</a> — no SOC code for growth engineer or AI engineer</li>
<li><a href="https://survey.stackoverflow.co/2025/work">2025 Stack Overflow Developer Survey</a> · <a href="https://techrecruiting.io/en/stack-overflow-developer-survey-2025-usa/">US-only re-cut, techrecruiting.io</a> (secondary analysis)</li>
<li><a href="https://www.indeed.com/career-advice/finding-a-job/data-scientist-vs-statistician">Data Scientist vs. Statistician, Indeed Career Advice</a> · <a href="https://yardstick.team/compare-roles/what-is-the-difference-between-data-scientist-and-statistician">Yardstick role comparison</a></li>
<li>Job-board snapshots, live 2026-09-14: <a href="https://www.indeed.com/jobs?q=%22data+scientist%22&l=">Indeed</a> · <a href="https://builtin.com/jobs?search=AI%20engineer">Built In</a> · <a href="https://wellfound.com/role/r/ai-engineer">Wellfound</a></li>
</ul>
<p><strong>Share this with someone choosing between a statistics track and a data-science track — or writing the job description for either.</strong></p>`,
  },
  {
    slug: "search-results-by-intent",
    title: "Search Results by Intent: Five Pages and the Zero-Click Future SEOs Already Measured",
    author: "Mitchell Miller",
    date: "September 24, 2026",
    status: "published",
    teaser: "One search box, five different pages, and a zero-click trajectory SEOs were charting a decade before the phrase existed. Click a sector and the result surface redraws to the rates the studies actually measured — then the conclusion asks what optimizing for citation looks like once the gatekeeper is an agent, not a ranking page.",
    metaDescription: "Watch the results page redraw by intent — AI Overview, CTR, zero-click rates, sourced and dated — and why SEOs measured this coming.",
    contentHtml: `<p><em>By Mitchell Miller · ~9 min read · AI search / measurement</em></p>
<h2>Click a sector</h2>
<figure class="viz-embed">
  <iframe src="/viz/search-results-by-intent-mandala/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fsearch-results-by-intent%2F"
          title="Search results by intent — data mandala"
          loading="lazy" width="100%" height="1200"
          style="display:block;width:100%;border:1px solid #0f2440;border-radius:10px"></iframe>
  <noscript>
    <img src="/viz/search-results-by-intent-mandala/poster-1080x1350.png" width="1080" height="1350"
         alt="Data mandala: five search intents as sectors around three measured rings — AI Overview trigger rate, click-through impact and year-over-year mix shift. Two cells marked not measured."
         style="display:block;width:100%;height:auto;border-radius:10px" />
  </noscript>
  <figcaption>
    <strong>Click a sector: see what that search usually returns, then jump to its section.</strong>
    Every medallion carries its own study and date; the dashed grey cells are the ones no study has measured.
    <a href="/viz/search-results-by-intent-mandala/">Open the full-screen version</a> if the frame is cut off.
  </figcaption>
</figure><h2>TL;DR — three numbers</h2>
<ul>
<li><strong>68.01%</strong> of US Google searches ended with no click at all, January–April 2026 — up from 60.45% two years earlier. <em>(SparkToro, Similarweb clickstream panel, 9 June 2026.)</em></li>
<li>Position-one organic CTR falls <strong>58%</strong> once an AI Overview appears on the page — nearly double the 34.5% the same team measured eight months before. <em>(Ahrefs, 300,000 keywords via Search Console, 4 February 2026.)</em></li>
<li>SparkToro&#39;s own tracker already had zero-click share at <strong>≈45%</strong> in 2016. Ten years of the same measurement, not a 2026 discovery.</li>
</ul>
<p>Five intents, five different pages, five different reasons Google built them that way. Click a sector above or read straight through.</p>
<h2 id="intent-informational">Informational — the cheapest answer to keep in-platform</h2><p><strong>Scale:</strong> Google itself reports more than 5 trillion searches a year, globally <em>(Vidhya Srinivasan, blog.google, 3 March 2025)</em> — no publisher has broken that total down into a US-only, informational-specific share.</p>
<p><strong>36%</strong> of informational queries trigger an AI Overview, rising to <strong>85.9%</strong> when the query is phrased as a question — &quot;what,&quot; &quot;how,&quot; &quot;why.&quot; <em>(Seer Interactive, 5.47M queries / 53 brands, Jan 2025–Feb 2026, published 24 April 2026.)</em> A separate late-2024 panel put &quot;informational/brand&quot; sub-intent at <strong>69.8%</strong>, inside an overall rate of 29.9% of keywords but only 11.5% of search volume <em>(Authoritas, 10,000 US desktop keywords, published January 2025)</em> — a smaller panel than Seer&#39;s, not a contradiction.</p>
<p>Citation status decides the click: <strong>3.35%</strong> organic CTR with no AI Overview on the page, <strong>2.07%</strong> when one appears and you&#39;re cited, <strong>0.94%</strong> when one appears and you&#39;re not — a <strong>3.6×</strong> drop for showing up uncited. <em>(Seer Interactive, same study.)</em> Featured snippets fell from <strong>15.41%</strong> to <strong>5.53%</strong> of desktop SERPs in six months as AI Overviews took the slot <em>(Ahrefs, 1M US desktop SERPs, January vs June 2025, published 22 July 2025)</em>.</p>
<figure class="serp-example">
  <img src="/images/blog/serp-examples/informational-desktop.png" alt="Representative rendering, not a screenshot: an informational results page for “what is answer engine optimization” with an AI Overview and three cited sources above the organic results." width="1200" height="713" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:8px" />
  <figcaption>Representative rendering; real capture pending.</figcaption>
</figure><p><strong>What this page optimizes for:</strong> a synthesized answer that satisfies the query inline. Informational intent is the cheapest volume to answer with a model, and question-format queries get the highest synthesis rate measured here — keeping the session from ever reaching a competing result.</p>
<p>Google&#39;s own 10-K states it plainly: more than 70% of Alphabet&#39;s total revenue came from online advertising in 2025. Its interface keeps the session inside it — every click away risks a slower page, the wrong answer, or a worse experience. <em>(Alphabet Inc. Form 10-K, FY2025.)</em></p>
<h2 id="intent-commercial">Commercial investigation — the shortlist Google monetizes twice</h2><p><strong>Scale:</strong> Same global anchor as every intent here — more than 5 trillion searches a year <em>(Google, blog.google, 3 March 2025)</em>. No source breaks that down by US commercial-investigation volume specifically.</p>
<p><strong>8%</strong> of commercial-investigation queries trigger an AI Overview overall — but <strong>95.4%</strong>, the highest rate anywhere in this dataset, when the query is a direct comparison: &quot;X vs Y.&quot; <em>(Seer Interactive, 267 of 280 comparison queries, published 24 April 2026.)</em> AI Overview presence on commercial SERPs grew <strong>71%</strong> in the six months to April 2026, led by finance at +231.25%. <em>(Semrush, 600,000+ keywords / 10 industries, published 2 July 2026.)</em></p>
<p>Paid took what organic lost. In the US headphones category, combined paid click share went <strong>16% → 36%</strong> in one year while organic fell <strong>73% → 50%</strong> <em>(Search Engine Land / Aleyda Solis, Similarweb data, Jan 2025 vs Jan 2026, published 18 February 2026)</em> — the same direction, smaller scale, across jeans, greeting cards and online games in the same study.</p>
<figure class="serp-example">
  <img src="/images/blog/serp-examples/commercial-desktop.png" alt="Representative rendering, not a screenshot: a commercial-investigation results page for “AEO agency vs in-house team” with an “X vs Y” AI Overview and cited sources above the organic results." width="1200" height="713" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:8px" />
  <figcaption>Representative rendering; real capture pending.</figcaption>
</figure><p><strong>What this page optimizes for:</strong> an extended shortlist. AI synthesis frames the comparison, paid units monetize it, both on one page, selling the same attention twice — commercial-investigation traffic prices higher per click than any other intent.</p>
<p>The same incentive holds at a higher price: more than 70% of Alphabet&#39;s 2025 revenue was online advertising <em>(Alphabet Inc. Form 10-K, FY2025)</em>, and a session that stays on-SERP outvalues one that leaves after the first click.</p>
<h2 id="intent-transactional">Transactional — the one intent moving away from AI synthesis</h2><p><strong>Scale:</strong> Against Google&#39;s own more-than-5-trillion-a-year total <em>(blog.google, 3 March 2025)</em>, no publisher has measured what share of US transactional queries that represents.</p>
<p><strong>5%</strong> — under 1 in 20 transactional queries trigger an AI Overview, the lowest of the three intents Seer tracks this way, and the only one moving backwards: <strong>-5%</strong> between November 2025 and April 2026, while commercial-investigation AI Overviews grew 71% in the same window. <em>(Seer Interactive; Semrush, published 24 April 2026 and 2 July 2026.)</em> Organic CTR when present-but-uncited fell <strong>48%</strong> across the tracking window — 4.17% down to 2.15% by December 2025 — and being cited (1.65%) did not clearly beat being uncited here, the one intent in this dataset where that pattern breaks. <em>(Seer Interactive.)</em></p>
<p>Purchase-intent queries stayed under <strong>2.1%</strong> of tracked activity across 41 high-traffic sites in 2025 <em>(SparkToro with Datos — summary-sourced, medium confidence)</em>.</p>
<figure class="serp-example">
  <img src="/images/blog/serp-examples/transactional-desktop.png" alt="Representative rendering, not a screenshot: a transactional results page for “hire an AEO consultant” with sponsored text ads and Shopping units above the organic results." width="1200" height="713" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:8px" />
  <figcaption>Representative rendering; real capture pending.</figcaption>
</figure><p><strong>What this page optimizes for:</strong> the shortest path to a completed transaction. Google has the least incentive to insert a synthesized answer between a ready-to-buy searcher and the ad or Shopping unit that converts — consistent with the lowest, and still-falling, AI Overview rate of any intent measured.</p>
<p>Even on a ready-to-buy query the incentive doesn&#39;t flip. Alphabet&#39;s own 10-K states more than 70% of its 2025 revenue came from online advertising — every click away risks a destination slower or worse than what Google could have kept showing.</p>
<h2 id="intent-navigational">Navigational — the intent that needed AI least, and got it anyway</h2><p><strong>Scale:</strong> Google&#39;s total is more than 5 trillion searches a year, globally <em>(blog.google, 3 March 2025)</em> — navigational&#39;s US share of it has not been measured in anything found for this piece.</p>
<p><strong>0%</strong> AI Overview trigger rate in a late-2024 sample of 10,000 US desktop keywords <em>(Authoritas, published January 2025)</em> — then <strong>0.84% → 10.33%</strong> in Semrush&#39;s 2025 tracking, roughly a twelvefold rise in the one intent that least needed a synthesized answer in the first place <em>(Semrush, 10M+ keywords, published 2 February 2026)</em>.</p>
<p>Navigational SERPs stay structurally simple — one dominant brand result plus sitelinks — which is exactly why a near-zero starting rate could climb this fast without anyone calling it a trend: there was no floor to fall through.</p>
<figure class="serp-example">
  <img src="/images/blog/serp-examples/navigational-desktop.png" alt="Representative rendering, not a screenshot: a navigational results page for “mitch j miller” with one dominant result, sitelinks and a knowledge panel." width="1200" height="713" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:8px" />
  <figcaption>Representative rendering; real capture pending.</figcaption>
</figure><p><strong>What this page optimizes for:</strong> routing, at the lowest possible serving cost. One confirmed destination, sitelinks instead of synthesis — no ambiguity to resolve and no comparison to sell ads against.</p>
<p>Navigational is where this incentive is weakest — the destination is already decided — but the fact underneath doesn&#39;t change: Alphabet&#39;s 2025 10-K reports more than 70% of total revenue from online advertising, so even a brief on-platform session still counts toward the same business.</p>
<h2 id="intent-local">Local — the intent Google never has to hand off</h2><p><strong>Scale:</strong> The same 5-trillion-plus global total applies <em>(Google, blog.google, 3 March 2025)</em>; a US-only local-intent share of it isn&#39;t published anywhere found for this piece.</p>
<p><strong>15%</strong> of local-intent queries trigger an AI Overview — the lowest structural rate measured here — against 92% for informational and 97% for hybrid-intent queries within that same local-services study. <strong>Local Pack presence: 93%</strong> on local-intent queries, versus 6% on informational-only queries and 39% averaged across all query types in the same study. <em>(Whitespark, 540 queries / 3 US metros / 6 verticals, hand-collected, published 12 May 2025.)</em></p>
<figure class="serp-example">
  <img src="/images/blog/serp-examples/local-desktop.png" alt="Representative rendering, not a screenshot: a local results page for “surf lessons waikiki” with a map and a three-listing local pack above the organic results." width="1200" height="713" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:8px" />
  <figcaption>Representative rendering; real capture pending.</figcaption>
</figure><p><strong>What this page optimizes for:</strong> keeping the transaction — the call, the directions, the booking — inside Google&#39;s own Maps and Local Pack surface rather than sending the click to a website at all. Success here looks least like a click and most like a completed action Google never had to hand off.</p>
<p>Local is where this incentive is most visible: a call or a set of directions completed inside Maps never has to survive a destination page that loads slow or disappoints off-platform — and more than 70% of Alphabet&#39;s 2025 revenue, per its own 10-K, was online advertising in the first place.</p>
<h2>The route through all five</h2>
<p>Lay the five pages end to end and they form a route: a session moving from a synthesized answer, through a monetized shortlist, toward a transaction Google would rather keep on-platform — navigational and local are the two stops where a click was barely the point. The journey map below draws that route, ending where 68.01% of sessions already do.</p>
<figure class="viz-embed">
  <iframe src="/viz/search-results-by-intent-journey/?parent=https%3A%2F%2Fmj2.pro%2Fblog%2Fsearch-results-by-intent%2F"
          title="Search results by intent — journey map"
          loading="lazy" width="100%" height="1200"
          style="display:block;width:100%;border:1px solid #0f2440;border-radius:10px"></iframe>
  <noscript>
    <img src="/viz/search-results-by-intent-journey/poster-1080x1350.png" width="1080" height="1350"
         alt="Journey map: a route through five search-intent territories ending at a zero-click destination card reading 68.01%, with a landmark key and one entry marked not measured."
         style="display:block;width:100%;height:auto;border-radius:10px" />
  </noscript>
  <figcaption>
    The same measured rates, laid out as a route rather than a wheel — ending at the zero-click terminus.
    <a href="/viz/search-results-by-intent-journey/">Open the full-screen version</a> if the frame is cut off.
  </figcaption>
</figure><h2>The zero-click future SEOs measured before it had a name</h2>
<p>Search strategists — SEOs especially, organic and paid both — were not caught off guard by zero-click. SparkToro&#39;s own tracker puts US Google zero-click share at roughly 45% in 2016, 49% in 2019, 60.45% in 2024 and 68.01% this year — that last jump, 7.56 points in two years, moved faster than the prior eight-year trend. Ahrefs&#39; 58% click-tax figure updates its own April 2025 study; Seer Interactive&#39;s is the third edition of a recurring one — a measured decade, run by people who publish methodology, not a narrative that arrived with a phrase attached.</p>
<p>Google&#39;s own team, meanwhile, described the result as &quot;relatively stable year-over-year&quot; click volume <em>(Liz Reid, VP, Head of Google Search, blog.google, 6 August 2025)</em> — eleven days after Pew Research&#39;s independent tracking panel measured a standard organic result clicked on <strong>8%</strong> of visits when an AI summary was present, versus <strong>15%</strong> when it wasn&#39;t, with only <strong>1%</strong> of visits clicking a link inside the summary itself <em>(Pew Research Center, 900 US adults tracked in March 2025, published 22 July 2025)</em>. Neither source cites the other.</p>
<p>The next measured shift is agentic, and it resists a single number as hard as intent share does. <strong>51%</strong> of US shoppers would let AI run the entire purchase — including the final transaction — once their preferences are set, rising to <strong>59%</strong> among Millennials specifically <em>(Adyen 2026 US Retail Report, 9 January 2026)</em>. <strong>58%</strong> say they&#39;ve already replaced search engines with generative AI for product and service recommendations, up from 25% two years before <em>(Capgemini Research Institute, 9 January 2025)</em>. Trust drops hard once real money moves: only <strong>14%</strong> actually trust AI to place an order on their behalf <em>(Bain &amp; Company, 2025)</em>. Interest in delegating clusters in the 50s; trust in the completed transaction sits in the teens — that gap is the finding, not an average of the two.</p>
<p>A near-zero-click result does not make the underlying website less important — it makes the paths to it narrower and more scrutinized. Being cited inside an AI Overview is worth roughly <strong>+120% more organic clicks per impression</strong> than appearing and not being cited <em>(Seer Interactive)</em> — same rank, same page, different outcome. Brand visits, agent-initiated checkout and AI citations all still resolve to a site: Stripe&#39;s Instant Checkout inside ChatGPT routes to named merchants (Etsy live at launch, Shopify and its 1M+ merchants including Glossier and Vuori announced to follow), and Google&#39;s Universal Commerce Protocol was built on the same principle, naming Shopify, Etsy, Wayfair, Target and Walmart as launch partners <em>(Stripe newsroom, 29 September 2025; Google Developers Blog, 11 January 2026)</em>. The click moved earlier or later in the session rather than disappearing.</p>
<p>That raises the bar on authority, authenticity and trustworthiness rather than lowering it — the same &quot;expertise, experience, authoritativeness and trustworthiness&quot; elements Gartner told brands to keep demonstrating in the same forecast that predicted a 25% drop in search volume by 2026 <em>(Gartner, analyst Alan Antin, 19 February 2024)</em>. And the gatekeeper is no longer singular. Profound&#39;s 680-million-citation study found Google AI Overviews&#39; top cited source (Reddit, 2.2% of citations) barely overlaps with ChatGPT&#39;s (Wikipedia, 7.8%) or Perplexity&#39;s (Reddit, 6.6%) <em>(Profound, Aug 2024–Jun 2025 window)</em>, and Semrush watched Reddit&#39;s own share of ChatGPT&#39;s citations fall from roughly 60% in early August 2025 to about 10% by mid-September 2025, around a single platform change <em>(Semrush, 230,000+ prompts, published 10 November 2025)</em>. Three platforms, three reference libraries, one rewriting itself in six weeks — &quot;rank well&quot; was never one instruction.</p>
<p>Optimizing for citation differs from optimizing for ranking — covered in the <a href="/case-studies/aeo-visibility-infrastructure/">AEO visibility work</a>, not repeated here. The next piece in this series takes the layer above citation: what it means that free ChatGPT answers are starting to carry ads. <em>Optimizing for ads in free LLM answers</em> — coming.</p>
<p><strong>Share this with someone budgeting 2027 content against a search-intent split that hasn&#39;t been remeasured since 2008.</strong></p>
<hr>
<h2>FAQ</h2>
<h3>How often does an AI Overview appear, by search intent?</h3>
<p>It depends on the panel and the query pattern inside it. Seer Interactive&#39;s 5.47M-query study measured 36% for informational, 8% for commercial investigation and 5% for transactional, published 24 April 2026. That same study found comparison-format (&quot;X vs Y&quot;) queries trigger one 95.4% of the time — the highest rate in any panel checked here. Whitespark measured 15% for local intent and 92% for informational queries inside local-service verticals, published 12 May 2025. Navigational intent moved from roughly 0% (Authoritas, Dec 2024) to 10.33% (Semrush, 2025 tracking) — even the intent least likely to need an answer picked one up.</p>
<h3>Do AI Overviews reduce organic clicks?</h3>
<p>The two largest disclosed samples say yes, clearly. Ahrefs measured a 58% drop in position-one CTR on AI-Overview keywords, 300,000 keywords via Search Console, published 4 February 2026 — nearly double the 34.5% it measured eight months earlier. Seer Interactive measured 0.94% organic CTR when an AI Overview is present and the brand is not cited, against 3.35% with no AI Overview at all, and 2.07% when cited. Transactional intent is the exception worth naming: there, being cited (1.65%) did not clearly outperform being uncited (2.15%).</p>
<h3>What share of searches is informational, commercial, transactional, navigational or local in 2026?</h3>
<p>No modern full-sample answer has been published for any of the five. The 80/10/10 split still in wide circulation comes from a 2008 study of 1.5 million queries. Until a full-sample panel covering all five intents is published, treat any confident 2026 intent split as an estimate rather than a measurement.</p>
<h3>Does a near-zero-click search result make a website&#39;s own content less important?</h3>
<p>No — it makes the paths into that content narrower. Citation inside an AI Overview is worth roughly +120% more organic clicks per impression than presence without citation (Seer Interactive), and brand visits, agent-initiated purchases and AI citations still resolve to a site even when the search itself produced no click. What changes is which signals earn the citation in the first place, which is why authority and verifiable trust signals matter more under measurement, not less — see the <a href="/case-studies/aeo-visibility-infrastructure/">AEO visibility work</a> for how that gets built.</p>
<hr>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How often does an AI Overview appear, by search intent?","acceptedAnswer":{"@type":"Answer","text":"It depends on the panel and the query pattern inside it. Seer Interactive's 5.47M-query study measured 36% for informational, 8% for commercial investigation and 5% for transactional, published 24 April 2026. That same study found comparison-format (\\"X vs Y\\") queries trigger one 95.4% of the time — the highest rate in any panel checked here. Whitespark measured 15% for local intent and 92% for informational queries inside local-service verticals, published 12 May 2025. Navigational intent moved from roughly 0% (Authoritas, Dec 2024) to 10.33% (Semrush, 2025 tracking) — even the intent least likely to need an answer picked one up."}},{"@type":"Question","name":"Do AI Overviews reduce organic clicks?","acceptedAnswer":{"@type":"Answer","text":"The two largest disclosed samples say yes, clearly. Ahrefs measured a 58% drop in position-one CTR on AI-Overview keywords, 300,000 keywords via Search Console, published 4 February 2026 — nearly double the 34.5% it measured eight months earlier. Seer Interactive measured 0.94% organic CTR when an AI Overview is present and the brand is not cited, against 3.35% with no AI Overview at all, and 2.07% when cited. Transactional intent is the exception worth naming: there, being cited (1.65%) did not clearly outperform being uncited (2.15%)."}},{"@type":"Question","name":"What share of searches is informational, commercial, transactional, navigational or local in 2026?","acceptedAnswer":{"@type":"Answer","text":"No modern full-sample answer has been published for any of the five. The 80/10/10 split still in wide circulation comes from a 2008 study of 1.5 million queries. Until a full-sample panel covering all five intents is published, treat any confident 2026 intent split as an estimate rather than a measurement."}},{"@type":"Question","name":"Does a near-zero-click search result make a website's own content less important?","acceptedAnswer":{"@type":"Answer","text":"No — it makes the paths into that content narrower. Citation inside an AI Overview is worth roughly +120% more organic clicks per impression than presence without citation (Seer Interactive), and brand visits, agent-initiated purchases and AI citations still resolve to a site even when the search itself produced no click. What changes is which signals earn the citation in the first place, which is why authority and verifiable trust signals matter more under measurement, not less — see the AEO visibility work for how that gets built."}}]}</script>
<h2>Sources</h2>
<ul>
<li>SparkToro — <a href="https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/">In 2026, less than one third of Google searches still send a click</a>. Similarweb clickstream panel, US, Jan–Apr 2026, with the publisher&#39;s own 2016–2026 tracking series. Published 9 June 2026.</li>
<li>SparkToro — <a href="https://sparktoro.com/blog/new-research-search-happens-everywhere-an-analysis-of-41-websites-with-significant-search-activity/">Search Happens Everywhere: 41-website analysis</a>, with Datos. Published 2025.</li>
<li>Ahrefs — <a href="https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/">AI Overviews reduce clicks (2026 update)</a>. 300,000 keywords, Search Console, Dec 2025 vs Dec 2023. Published 4 February 2026.</li>
<li>Ahrefs — <a href="https://ahrefs.com/blog/ai-overviews-reduce-clicks/">AI Overviews reduce clicks (original)</a>. Published April 2025.</li>
<li>Ahrefs — <a href="https://ahrefs.com/blog/how-serp-features-have-evolved-in-the-ai-era/">Goodbye, Featured Snippets: How SERP Features Have Evolved in the AI Era</a> (Ryan Law). 1,000,000 US desktop SERPs, January vs June 2025. Published 22 July 2025.</li>
<li>Seer Interactive — <a href="https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update">AIO impact on Google CTR: 2026 update</a>. 5.47M queries, 53 brands, Jan 2025–Feb 2026. Published 24 April 2026.</li>
<li>Whitespark — <a href="https://whitespark.ca/blog/case-study-the-prevalence-of-ai-overviews-in-local-search/">The prevalence of AI Overviews in local search</a>. 540 queries, 3 US metros, 6 verticals, hand-collected. Published 12 May 2025.</li>
<li>Semrush — <a href="https://www.semrush.com/blog/ai-overviews-commercial-search-study/">AI Overviews are expanding across commercial intent search</a>. 600,000+ keywords, Nov 2025–Apr 2026. Published 2 July 2026.</li>
<li>Semrush — <a href="https://www.semrush.com/blog/serps-with-ads-and-ai-overviews/">SERPs with ads and AI Overviews grew over 394% in 2025</a>. 10M+ keywords. Published 2 February 2026.</li>
<li>Semrush — <a href="https://www.semrush.com/blog/most-cited-domains-ai/">Most-cited domains in AI: a 3-month study</a>. 230,000+ prompts, 100M+ citations, Jul–Oct 2025. Published 10 November 2025.</li>
<li>Authoritas — <a href="https://www.authoritas.com/blog/ai-overview-user-intent-research">How user intent drives AI Overview appearance rates</a>. 10,000 US desktop keywords, collected Dec 2024. Published January 2025.</li>
<li>Search Engine Land / Aleyda Solis — <a href="https://searchengineland.com/paid-search-clicks-double-organic-clicks-fall-study-469519">Paid search click share doubles as organic clicks fall</a>. Similarweb data, 4 US categories, Jan 2025 vs Jan 2026. Published 18 February 2026.</li>
<li>Search Engine Land — <a href="https://searchengineland.com/study-80-percent-of-searches-are-informational-20-are-navigational-or-transactional-13745">80% of searches are informational (Penn State / Jansen)</a>. 1.5M+ queries. Published 10 April 2008.</li>
<li>Profound — <a href="https://www.tryprofound.com/blog/ai-platform-citation-patterns">AI platform citation patterns</a>. 680M citations, Aug 2024–Jun 2025.</li>
<li>Google — <a href="https://blog.google/products/ads-commerce/ai-personalization-and-the-future-of-shopping/">AI, personalization and the future of shopping</a> (Vidhya Srinivasan). &quot;More than 5 trillion searches on Google annually.&quot; Published 3 March 2025.</li>
<li>Google — <a href="https://blog.google/products-and-platforms/products/search/ai-search-driving-more-queries-higher-quality-clicks/">AI in Search is driving more queries and higher quality clicks</a> (Liz Reid). Published 6 August 2025.</li>
<li>Alphabet Inc. — <a href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm">Form 10-K, fiscal year 2025</a>. &quot;More than 70% of total revenues from online advertising in 2025.&quot; SEC EDGAR.</li>
<li>Pew Research Center — <a href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/">Do people click on links in Google AI summaries?</a> 900 US adults, KnowledgePanel Digital, tracked March 2025. Published 22 July 2025.</li>
<li>Adyen — <a href="https://www.adyen.com/press-and-media/retail-report-2026-us">2026 US Retail Report</a>. Censuswide, n=2,000 US adults 16+, fielded Nov–Dec 2025. Published 9 January 2026.</li>
<li>Capgemini Research Institute — <a href="https://www.capgemini.com/news/press-releases/71-of-consumers-want-generative-ai-integrated-into-their-shopping-experiences/">71% of consumers want generative AI integrated into their shopping experiences</a>. n=12,000, 12 countries. Published 9 January 2025.</li>
<li>Bain &amp; Company — <a href="https://www.bain.com/insights/agentic-ai-commerce-hinges-on-consumer-trust/">Agentic AI commerce hinges on consumer trust</a>. 2025.</li>
<li>Gartner, Inc. — <a href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents">Gartner predicts search engine volume will drop 25% by 2026</a> (analyst Alan Antin). Published 19 February 2024.</li>
<li>Stripe Newsroom — <a href="https://stripe.com/newsroom/news/stripe-openai-instant-checkout">Stripe powers Instant Checkout in ChatGPT and releases Agentic Commerce Protocol codeveloped with OpenAI</a>. Published 29 September 2025.</li>
<li>Google Developers Blog — <a href="https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/">Under the Hood: Universal Commerce Protocol (UCP)</a>. Published 11 January 2026.</li>
</ul>`,
  },
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
    date: "September 10, 2026",
    status: "published",
    teaser: "From enterprise search programs to AI tools and a Waikīkī surf explorer: how I learned to carry an idea all the way into a working system.",
    content: `
I surf, rock climb, and practice martial arts. I'm a builder by nature — prototyping things before there were tools to make prototyping easy.

My career didn't start with SEO. It started with curiosity about how businesses actually grow. Working in agency environments, I learned across ecommerce, SaaS, B2B, healthcare, and enterprise accounts. I discovered that search wasn't just a marketing channel — it was an operating system for understanding user intent, the competitive landscape, and business opportunity.

I learned early to speak two languages: the language of data and the language of the business.

### The Scale-Up Years

During my agency years at Wpromote and DemandWave, I learned enterprise SEO from scratch. I built technical SEO methodologies and learned how to work with engineering teams, explaining why crawl budgets matter in a company budget meeting.

Then came the CommonSpirit and Dignity Health years — the scale-up moment. I built a 1,000+ location entity system, ran 20+ migrations, and watched $15.21M in attributable revenue get reported back to executives I'd convinced to prioritize SEO.

At Apple, I worked as Program Manager, SEO - Americas Region (AMR), connecting seasonal demand to engineering and commerce execution. I experienced presenting search strategy to 60+ stakeholders, learning what "enterprise alignment" really means. At Stanford Health Care, I navigated regulated healthcare, balancing paid and organic, working with clinical teams who don't speak "keyword" fluently.

At Clarity AI, the past decade converged. I built ClarityPulse as an internal reporting prototype, connecting source data to a narrative that could be checked and acted on. Alongside that work, independent prototypes such as SearchForge and ActionThread let me explore content research and workflow automation hands-on.

In 2026, the SFC Surf School pilot brings that approach into a small business: competitive research, a rebuilt search and content foundation, a ten-break interactive Waikīkī surf explorer and performance reporting grounded in actual Search Console data. The scale is different from an enterprise, but the responsibility is the same—carry the idea through to a useful, working result.

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
    description: "Internal Clarity AI reporting prototype that turns raw GA4 and GSC data into source-backed executive narratives.",
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
