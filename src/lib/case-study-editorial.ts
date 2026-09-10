import { publicPath } from "./paths";
import { portfolioImages, type PortfolioImage } from "./images";

export const studyCategories = ["All work", "Enterprise search", "AI & measurement", "Growth systems", "Product experiments"] as const;
export type StudyCategory = (typeof studyCategories)[number];
export type StudyChapter = { title: string; paragraphs: string[] };
export type StudyEditorial = {
  category: StudyCategory;
  client: string;
  period: string;
  headline: string;
  summary: string;
  accent: string;
  metrics: { value: string; label: string; note?: string }[];
  chapters: StudyChapter[];
  takeaway: string;
  evidence: string;
  links?: { label: string; href: string; external?: boolean }[];
};

export const featuredStudySlugs = ["sfc-surf-school", "commonspirit-locations-conversion-engine", "apple-seasonal-search", "commonspirit-medical-content-library", "claritypulse-ai-reporting", "aeo-visibility-infrastructure"];

export const studyEditorial: Record<string, StudyEditorial> = {
  "sfc-surf-school": {
    category: "Growth systems", client: "SFC Surf School", period: "2026 · 90-day pilot", accent: "Waikīkī, Hawaiʻi",
    headline: "Make local knowledge a reason to choose the business.",
    summary: "A complete path from competitive research to a better website, an interactive surf guide and measurable search momentum.",
    metrics: [
      { value: "+980%", label: "Google search clicks", note: "5 → 54 across consecutive 28-day periods" },
      { value: "+251%", label: "Search impressions", note: "470 → 1,652 · rounded growth" },
      { value: "10", label: "Breaks, with connected guides", note: "Explorer and articles released September 10" },
    ],
    chapters: [
      { title: "Start with the market, then build the right thing.", paragraphs: [
        "Waikīkī has established surf schools, travel publishers and booking platforms competing for the same visitors. SFC’s advantage was specific: an experienced local instructor, a clear teaching philosophy and firsthand knowledge of the water. The website needed to make that difference useful before somebody booked.",
        "I mapped the competitor set from actual search visibility and crawled 973 pages across ten businesses. Desktop and mobile keyword-gap research turned that material into a publishing plan. The audit also uncovered 38 completed pages that had not been published: a delivery problem as much as a content problem.",
        "The research informed lesson choices, location pages, first-timer guidance and practical planning topics. A query naming Waikīkī signals interest in Waikīkī, whether the searcher is already there or planning a trip. That connects the organic content strategy with the school’s Google Maps presence."
      ] },
      { title: "Turn a list of surf spots into a useful product.", paragraphs: [
        "The South Shore guide became a ten-break explorer. Visitors can select a named reef, see surfing footage from that exact break, follow the original video source, check conditions and read a dedicated guide. The same structure ties together Ala Moana Bowls, Rock Piles, Kaisers, Fours, Threes, Paradise, Populars, Canoes, Queens and Publics.",
        "Geography mattered. An attractive generated map did not describe the real coastline accurately enough. I replaced it with a georeferenced January 27, 2022 NAIP aerial hosted by NOAA, projected the break locations onto the image and incorporated the owner’s corrections to the western markers. The source imagery, approximate reef areas and local placement decisions are documented.",
        "I designed the interaction for phones as well as desktops: readable selectors, keyboard controls, one clearly selected break and lighter preview images that load as the reader approaches the map. The experience respects the limits of a planning guide: recorded surfing footage is not a live conditions report, and a reef marker is not a promise of where a lesson will run."
      ] },
      { title: "Ship the surrounding system, too.", paragraphs: [
        "The explorer was paired with ten substantive surf-break articles and internal links back into lesson planning. Its release brought the production sitemap to 63 indexable pages. A 30-post Google Business Profile campaign connected educational themes and original imagery to a publishing schedule; seven posts were published and 23 scheduled at the September 10 review.",
        "The engineering work included staging and production parity checks, an exact-commit promotion process and a verified rollback archive before deployment. All 63 production routes passed the final release audit, and all ten map selections were checked against their video and article destinations.",
        "That operational discipline lets a small business get the benefit of rapid iteration without treating its live booking website as an experiment."
      ] },
      { title: "Show the progress and preserve the timeline.", paragraphs: [
        "Google Search Console recorded 54 clicks and 1,652 impressions for August 12–September 8, compared with 5 clicks and 470 impressions for July 15–August 11. That is +980% clicks and +251% impressions, rounded. The homepage generated 41 clicks, and the conditions-planning guide generated four.",
        "Those results describe the earlier website and search work. The new explorer and ten guides launched September 10, after the reporting window. Their impact belongs in a later comparison. I kept that chronology explicit in the client presentation and separated search engagement from confirmed bookings.",
        "The next opportunities came from actual query data: ‘safe surf lessons’ averaged position 6.5 across six impressions, while timing and South Shore map queries were appearing near the first page. These are useful early signals for prioritizing better answers. The reporting also surfaced the next measurement tasks: clean production-only analytics and dedicated explorer interaction events."
      ] },
    ],
    takeaway: "Research becomes valuable when it changes what gets shipped. Here, strategy, content, interface design and release engineering became one connected piece of client work.",
    evidence: "Search Console comparison: Aug 12–Sep 8 vs Jul 15–Aug 11, 2026. Percentages use observed counts, not forecasts. The map launched Sep 10. Product screenshot is from the production release review; Insights image is a source capture cropped to remove account and browser controls.",
    links: [{ label: "Explore the live surf map", href: "https://sfcsurfschool.com/surf-guides/south-shore-surf-breaks/", external: true }, { label: "Try the interactive lab", href: "/lab" }],
  },
  "commonspirit-locations-conversion-engine": {
    category: "Enterprise search", client: "Dignity Health / CommonSpirit", period: "2018–2019 build · continuing measurement", accent: "Patient acquisition infrastructure",
    headline: "A thousand locations. One system for the next patient action.",
    summary: "An entity-driven location platform that connected search discovery to calls, directions and appointments across a fragmented healthcare network.",
    metrics: [{ value: "1,000+", label: "Location pages", note: "Across nine service areas and 20+ regional markets" }, { value: "$15.21M", label: "FY22 attributable revenue", note: "Later reporting for the continuing location system" }, { value: "88K", label: "Appointments", note: "Later CommonSpirit system reporting" }],
    chapters: [
      { title: "The patient did not see one health system.", paragraphs: ["Dignity Health’s nine service areas operated like separate web experiences. Templates, location information and paths to care varied by market. A patient could find a facility and still face unnecessary work to call, get directions or start an appointment.", "The legacy Sitecore publishing process made a page-by-page solution impractical. We needed an infrastructure decision: a reusable location system, with dependable entity data underneath it and measurable patient actions on top."] },
      { title: "Put the entity model before the page template.", paragraphs: ["I drove the location conversion system with SEO, design, analytics, internal data owners, regional stakeholders and Yext engineering. Parent and child entities described the relationship between facilities, specialties and service areas. Standardized names, addresses, phone numbers and metadata gave each location a consistent identity.", "Yext Pages provided a publishing layer outside the legacy CMS bottleneck. Reusable templates, structured data, database uploads and feed pushes made it possible to scale more than 1,000 pages while keeping the important details governed centrally."] },
      { title: "Make the business outcome observable.", paragraphs: ["The design connected discovery to calls, directions, appointment starts and booking pathways. Measurement was part of the product requirements, so search performance could be evaluated in terms of patient-acquisition actions.", "The system was estimated to account for 60–80% of tracked location actions within months of launch, depending on the action and reporting window. Its contribution continued into later CommonSpirit reporting: 175,000 calls and directions, 88,000 appointments and $15.21 million in FY22 attributable revenue. These later totals describe the continuing system, rather than a single launch-period lift."] },
    ],
    takeaway: "The durable SEO asset was the infrastructure: clean entities, reusable pages and a measurable path from discovery to care.",
    evidence: "Scope and outcome figures are drawn from the existing approved portfolio and career records. Build-period estimates and later FY22 outcomes are distinct. Public and archived website images illustrate the experience; they are not internal analytics exports.",
    links: [{ label: "View the archived 2018 site", href: "https://web.archive.org/web/20180209061904/https://www.dignityhealth.org/", external: true }, { label: "Explore the system in the lab", href: "/lab" }],
  },
  "apple-seasonal-search": {
    category: "Enterprise search", client: "Apple", period: "Americas program", accent: "Global commerce · regional execution",
    headline: "Make seasonal search a program the whole organization can execute.",
    summary: "Connected customer demand, international SEO and engineering requirements across Apple’s seasonal commerce surfaces.",
    metrics: [{ value: "4", label: "Americas markets", note: "US, Canada, Mexico and Brazil" }, { value: "60+", label: "Stakeholder audiences", note: "Seasonal strategy and executive alignment" }],
    chapters: [
      { title: "Seasonal relevance is an operating problem.", paragraphs: ["Holiday gifting, Mother’s Day, back-to-school and education campaigns each bring a different customer need and a narrow execution window. On Apple.com, the work also spans languages, locales and teams with distinct priorities.", "As Program Manager, SEO - Americas Region (AMR), I translated seasonal demand into a coordinated search program. The goal was to make the right commerce surfaces discoverable while giving stakeholders a clear account of what needed to happen and why."] },
      { title: "Connect the technical issue to the customer opportunity.", paragraphs: ["The program brought together demand research, hreflang and locale architecture, JavaScript rendering and indexation checks, and evergreen content strategy. That made the search conversation concrete enough for engineering, design, marketing and regional teams to act on.", "Executive readouts reached audiences of more than 60 stakeholders. I used those conversations to secure engineering roadmap prioritization and include AI search considerations in the longer-term program."] },
      { title: "Build a repeatable seasonal capability.", paragraphs: ["The important result was organizational: search requirements became part of planning and launch execution rather than a late-stage request. The program connected technical fluency with the ability to influence work across teams I did not manage directly."] },
    ],
    takeaway: "At enterprise scale, a good search recommendation needs an execution path, an owner and a business reason to make the roadmap.",
    evidence: "Scope and responsibilities are from the existing approved career record. Public Apple seasonal imagery provides context. No unpublished Apple performance metrics or internal materials are presented.",
  },
  "apple-store-amr": {
    category: "Enterprise search", client: "Apple", period: "Americas store program", accent: "International commerce",
    headline: "Keep seasonal merchandising coherent across markets.",
    summary: "Locale architecture, rendering QA and coordinated commerce updates for the Apple Store in the Americas.",
    metrics: [{ value: "AMR", label: "Regional program", note: "Commerce surfaces across multiple locales and languages" }],
    chapters: [
      { title: "One merchandising moment, many local experiences.", paragraphs: ["Seasonal store changes need to remain useful to shoppers in different languages and markets. Local variations also have to coexist with consistent URL, rendering and indexation behavior. That makes coordination as important as the recommendation itself."] },
      { title: "Translate search requirements into launch work.", paragraphs: ["I coordinated seasonal SEO updates with merchandising and engineering teams, mapped locale architecture and supported evergreen URLs. Rendering checks, locale QA and launch support gave teams concrete requirements they could incorporate into the release process."] },
      { title: "Make repeatability part of quality.", paragraphs: ["This work established a repeatable way to support seasonal commerce rather than treating every market and campaign as an isolated audit. It required understanding the international structure and communicating the search implications clearly to the people shipping the experience."] },
    ], takeaway: "International SEO works best when local relevance and shared operating standards reinforce one another.", evidence: "Qualitative scope is from the existing approved portfolio. The current public Apple Store screenshot is representative context, not a record of a specific historical launch.",
  },
  "apple-education-store": {
    category: "Enterprise search", client: "Apple", period: "Back-to-school program", accent: "Seasonal launch readiness",
    headline: "Prepare for the moment demand arrives.", summary: "Demand forecasting and technical readiness for a high-stakes education commerce season.",
    metrics: [{ value: "BTS", label: "Seasonal search program", note: "Education demand, pre-launch audits and launch support" }],
    chapters: [
      { title: "A narrow season leaves little room for late fixes.", paragraphs: ["The education buying cycle concentrates demand around a predictable period. Search readiness has to be addressed before that peak: the pages, rendered content and locale behavior need to be ready when students and families begin comparing options."] },
      { title: "Bring demand and technical readiness together.", paragraphs: ["I supported the Education Store with demand forecasting, pre-launch audits and rendering and indexation checks. Working with education marketing and engineering connected the customer’s timing to the team’s launch process."] },
      { title: "Reduce uncertainty before launch.", paragraphs: ["The value of the program was disciplined preparation. It made search considerations visible while changes were still practical to make, with a shared understanding of which issues could affect the seasonal experience."] },
    ], takeaway: "The best time to solve seasonal search problems is while the launch is still being planned.", evidence: "Responsibilities come from approved portfolio records. The current public Education Store image illustrates the product surface; no private performance results are claimed.",
  },
  "stanford-myhealth-seo": {
    category: "Enterprise search", client: "Stanford Health Care", period: "Interim SEO/SEM leadership", accent: "Regulated healthcare",
    headline: "Coordinate paid and organic discovery around patient needs.", summary: "Full-funnel search strategy, measurement and cross-functional work for clinical service lines and the MyHealth ecosystem.",
    metrics: [{ value: "Paid + organic", label: "One search strategy", note: "Clinical service-line coverage and measurement" }],
    chapters: [
      { title: "The channel plan had to reflect the care journey.", paragraphs: ["Patients move from understanding a condition to evaluating care options and managing ongoing treatment. Stanford Health Care needed coordinated search coverage across high-value clinical service lines while search behavior was also shifting toward AI-assisted discovery."] },
      { title: "Give the channels a shared structure.", paragraphs: ["As Interim SEO/SEM Manager, I owned budget and measurement responsibilities alongside keyword strategy and campaign taxonomy. I restructured paid and organic coverage to make those decisions more coherent across the funnel.", "The work connected content, UX and clinical strategy rather than treating search as an independent publishing queue. GA4, Google Ads, Bing Ads, Search Console and Semrush supported a common view of the opportunity."] },
      { title: "Work with the constraints of healthcare.", paragraphs: ["A regulated academic healthcare environment requires precision in claims, experience and measurement. The contribution was a clearer operating structure for search decisions, with clinical context informing how demand was addressed."] },
    ], takeaway: "Good healthcare search connects acquisition goals with the patient’s need for clear, credible information.", evidence: "Approved role and responsibility records; public MyHealth App Store imagery. No patient data or private campaign figures are displayed.",
  },
  "commonspirit-network-consolidation": {
    category: "Enterprise search", client: "CommonSpirit Health", period: "Post-merger network program", accent: "Migration & measurement",
    headline: "Keep discovery and measurement intact through a merger.", summary: "Search and analytics ownership through more than 20 migrations and a fragmented 63-plus-site network.",
    metrics: [{ value: "20+", label: "Enterprise migrations", note: "Technical requirements, coordination and post-launch review" }, { value: "2.65M → 4.9M+", label: "Organic sessions", note: "Across tenure, not a migration-only causal estimate" }],
    chapters: [
      { title: "Consolidation changed more than the websites.", paragraphs: ["The CHI–Dignity Health merger created a large, fragmented digital estate. More than 63 sites, organizational changes and analytics disruption made it difficult to preserve a consistent account of performance while the network itself was changing."] },
      { title: "Treat migration as a product program.", paragraphs: ["I owned search and analytics requirements across more than 20 enterprise migrations. The work combined technical specifications, stakeholder coordination and post-launch audits, with IT, marketing and regional executives involved in different parts of the decision.", "Analytics product ownership continued through the organizational restructuring. That kept measurement and organic discovery in the conversation as platform and ownership decisions were being made."] },
      { title: "Maintain the trajectory through change.", paragraphs: ["Organic sessions increased from 2.65 million to more than 4.9 million across the tenure in which this work occurred. The figure describes the broader program’s trajectory. It is not an experiment isolating the effect of migration alone."] },
    ], takeaway: "A migration succeeds when the organization can still find its customers—and understand its performance—on the other side.", evidence: "Approved career and portfolio records. The diagram is a representative explanation of the network program, not a private system export.",
  },
  "commonspirit-medical-content-library": {
    category: "Enterprise search", client: "Dignity Health / CommonSpirit", period: "Content product & platform adoption", accent: "Search intelligence → reusable content",
    headline: "A content library that gave 34 markets a reason to change.", summary: "Turned competitive intelligence into a patient-acquisition product and a practical adoption case for AEM.",
    metrics: [{ value: "10,000", label: "Terms in the research universe", note: "Conditions and treatments" }, { value: "1M+", label: "Annual organic visits", note: "Later library performance" }, { value: "34", label: "Healthcare markets", note: "A concrete use case for modular AEM content" }],
    chapters: [
      { title: "Prioritization mattered more than publishing volume.", paragraphs: ["Content production was limited to roughly five or six new articles a month, while major medical publishers had comprehensive libraries. Across more than 60 legacy CMS environments, the system also lacked a unified way to structure conditions and treatments content.", "I crawled competing medical libraries against a 10,000-term universe, then prioritized by demand, competition, service-line alignment and effort. The question became which reusable content products could serve patients and the business, given the team’s actual capacity."] },
      { title: "Make the strategy tangible enough to earn support.", paragraphs: ["I proposed the initiative during PI planning to more than 70 stakeholders and earned more than 80% buy-in. The proposal connected an observable competitive gap to a specific library structure and a practical delivery plan.", "The library model later became modular AEM content fragments: reusable metadata, summaries, FAQ and schema fields, taxonomy and regional variations. Markets could see how the content would work for them before being asked to embrace an abstract platform change."] },
      { title: "Let the product create adoption.", paragraphs: ["The library went on to generate more than one million organic visits annually. It also gave 34 markets a concrete reason to adopt reusable AEM content. A search initiative became a way to improve the organization’s publishing architecture."] },
    ], takeaway: "The strongest platform business case can be a useful product that teams actually want to publish.", evidence: "Figures and outcomes are retained from approved portfolio records. The public service-line image is representative context, not an internal reporting capture.",
  },
  "aem-content-fragmentation-architecture": {
    category: "Enterprise search", client: "Dignity Health / CommonSpirit", period: "AEM migration strategy", accent: "Content architecture",
    headline: "Show the useful part of the platform first.", summary: "A reusable content model that helped regional teams understand the practical value of an AEM migration.",
    metrics: [{ value: "60+", label: "Existing websites", note: "Regional publishing environments with different needs" }],
    chapters: [
      { title: "A platform mandate was not enough.", paragraphs: ["Regional teams had their own websites, audiences and working habits. A top-down migration request did not explain how a new platform would make their work easier or improve their local experience."] },
      { title: "Demonstrate reuse with content people need.", paragraphs: ["I used the Conditions & Treatments library to make AEM content fragments concrete. Titles, descriptions, summaries, FAQ and schema fields, taxonomy and regional variations became a reusable model that could preserve shared SEO standards while supporting local-market needs.", "Working with Adobe architects and regional leaders connected the technical architecture to actual publishing decisions. A market could see how to adapt a service-line page without recreating the underlying content structure."] },
      { title: "Translate architecture into operating value.", paragraphs: ["The demonstration gave teams a practical reason to consider migration: reuse, local flexibility and less duplicated CMS work. It complemented the broader library initiative and turned an engineering capability into a business conversation."] },
    ], takeaway: "Architecture earns adoption when people can recognize their own work inside the proposed system.", evidence: "Approved role history and portfolio narrative. The architecture visual is an explanatory reconstruction, not a production system screenshot.",
  },
  "yext-entity-data-foundation": {
    category: "Enterprise search", client: "Dignity Health", period: "Network entity program", accent: "Local search at scale",
    headline: "Give every location a dependable identity.", summary: "Entity cleanup and syndication for a network of more than 1,000 healthcare locations.",
    metrics: [{ value: "1,000+", label: "Locations", note: "Shared identity and publisher coverage" }],
    chapters: [
      { title: "Inconsistent data creates a fragmented patient experience.", paragraphs: ["Duplicate listings and inconsistent names, addresses and phone numbers weakened the network’s presence across search, maps and directories. Without a managed entity foundation, every publisher could present a different version of a location."] },
      { title: "Establish the source, then distribute it.", paragraphs: ["I worked with Yext and local operations on NAP cleanup, duplicate suppression and entity management. The structured records supported syndication across Google, Apple Maps, Siri, Alexa, Bing and Yelp.", "That entity foundation also supported the larger location-page program. The web experience and the external discovery surfaces could use the same description of the facility rather than accumulating separate definitions."] },
      { title: "Make consistency repeatable.", paragraphs: ["The result was a managed way to maintain location identity at network scale. It shifted the work from correcting individual listings to maintaining the data that those listings depend on."] },
    ], takeaway: "Local SEO at enterprise scale starts with data ownership, not a spreadsheet of one-time listing fixes.", evidence: "Approved portfolio and role records. The visual explains the entity architecture and publisher relationships.",
  },
  "claritypulse-ai-reporting": {
    category: "AI & measurement", client: "Clarity AI · internal", period: "Internal product prototype", accent: "Reporting operations",
    headline: "Give the narrative a traceable source.", summary: "An internal reporting prototype that connects performance data, evidence and the next action.",
    metrics: [{ value: "Data → brief", label: "Reporting workflow", note: "GA4, GSC, ads and SEO sources" }],
    chapters: [
      { title: "The bottleneck was turning reports into decisions.", paragraphs: ["Manual client reporting consumed time and produced inconsistent narratives. The information already existed in GA4, Search Console, advertising and SEO tools. The missing layer was a dependable way to connect those numbers to a useful executive explanation."] },
      { title: "Build the checks into the product.", paragraphs: ["I built ClarityPulse as an internal prototype at Clarity AI. Its modules combined raw KPI values and deltas, source freshness, evidence-tagged narrative, trend charts and an action queue. A source-health view and low-confidence review state made the evidence visible alongside the answer.", "The export process included a review gate rather than treating generated prose as automatically client-ready. Python, data APIs and LLMs supported the workflow, with the interface organized around the analyst’s responsibility to verify what was being reported."] },
      { title: "Automate the assembly; preserve judgment.", paragraphs: ["The prototype turned scattered performance inputs into structured weekly briefs. Its practical contribution was a consistent reporting shape: what changed, what supports that explanation, what needs attention and what should happen next."] },
    ], takeaway: "Useful AI reporting makes the source easier to inspect and the decision easier to make.", evidence: "Internal Clarity AI work, retained from the approved portfolio. The displayed dashboard is a representative product mockup and contains no client data. No time-saved or adoption figure is asserted.",
    links: [{ label: "Try source-aware reporting in the lab", href: "/lab" }],
  },
  "searchforge-content-intelligence": {
    category: "AI & measurement", client: "Independent prototype", period: "Content intelligence", accent: "Research & editorial operations",
    headline: "Start the brief with what the topic needs.", summary: "A prototype for entity gaps, topic clusters, source targets and better editorial preparation.",
    metrics: [{ value: "Research → brief", label: "Content workflow", note: "Entity coverage, sources and editorial QA" }],
    chapters: [
      { title: "Generic briefs produce generic work.", paragraphs: ["A keyword and a word count do not tell a writer which concepts matter, which questions remain unanswered or which sources should support the article. Identifying those gaps manually is useful work, but difficult to repeat consistently."] },
      { title: "Make the preparation reusable.", paragraphs: ["SearchForge combines entity-gap research, topical clustering, FAQ and schema prompts, citation targets and editorial QA. I built the prototype with Python, search APIs and language models to turn a set of inputs into a more complete content brief."] },
      { title: "Keep the output in the editorial workflow.", paragraphs: ["The product is a preparation tool. Its value is organizing what a writer and reviewer need to investigate and explain, with the content team retaining ownership of accuracy, selection and publication."] },
    ], takeaway: "AI is most useful to content teams when it improves the questions and evidence before drafting begins.", evidence: "Approved personal prototype. The interface is a representative mockup, not a client production dashboard.", links: [{ label: "Explore working examples in the lab", href: "/lab" }],
  },
  "actionthread-transcript-execution": {
    category: "AI & measurement", client: "Independent prototype", period: "Workflow automation", accent: "Meetings → accountable follow-through",
    headline: "A transcript is only useful if the work moves forward.", summary: "Extract decisions, owners and deadlines from conversations and turn them into follow-up work.",
    metrics: [{ value: "Call → action", label: "Execution workflow", note: "Decisions, owners, deadlines and task updates" }],
    chapters: [
      { title: "Decisions were getting stranded in meeting notes.", paragraphs: ["Summaries can describe a conversation without making its next steps actionable. The operational problem is connecting the decision to an owner, a deadline and the task system where the work will actually happen."] },
      { title: "Structure the handoff.", paragraphs: ["ActionThread uses transcripts as inputs to a workflow that extracts summaries, decisions, owners and deadlines, then prepares follow-up tasks and task updates. I combined transcription, language models and task-management APIs to explore that chain end to end."] },
      { title: "Design for follow-through.", paragraphs: ["The prototype focuses on execution debt: the time and effort required to reconstruct commitments after the meeting. A structured handoff gives the team a clearer place to review and act on those commitments."] },
    ], takeaway: "The output of a productive meeting is owned work, not just a well-written summary.", evidence: "Approved personal prototype. The displayed interface is representative, with no private transcript or client account data.", links: [{ label: "See interactive workflow examples", href: "/lab" }],
  },
  "aeo-visibility-infrastructure": {
    category: "AI & measurement", client: "Clarity AI", period: "AI search measurement", accent: "AEO / GEO",
    headline: "Measure whether the answer includes you.", summary: "A framework for observing AI search visibility and turning the findings into a prioritized work queue.",
    metrics: [{ value: "3", label: "Answer environments", note: "ChatGPT, Perplexity and Google AI Overviews" }],
    chapters: [
      { title: "Traditional rank tracking left a new blind spot.", paragraphs: ["Brands needed to understand whether they appeared in AI-generated answers, which sources were cited and where competitors had better coverage. Conventional search positions alone did not answer those questions."] },
      { title: "Define a repeatable observation set.", paragraphs: ["At Clarity AI, I built a measurement approach around prompt sets, citation share, competitor visibility and source coverage. Profound and custom scripts supported tracking across ChatGPT, Perplexity and Google AI Overviews.", "The system connected those observations to a prioritized fix queue. That made it possible to discuss what content, source or entity gap needed investigation instead of presenting a visibility score with no next step."] },
      { title: "Make the measurement actionable.", paragraphs: ["The practical result was an operating view for AI search: a defined set of questions, observable answer behavior, evidence about sources and a way to prioritize improvements. It established the work required to measure a changing search environment consistently."] },
    ], takeaway: "AEO measurement should lead to a source, content or entity decision that someone can act on.", evidence: "Approved internal work narrative. Dashboard imagery is representative; it contains no private measurement export or claimed uplift.", links: [{ label: "Try the AI search lab", href: "/lab" }],
  },
  domainsignal: {
    category: "Product experiments", client: "Independent build", period: "Domain intelligence prototype", accent: "Data product design",
    headline: "Turn scattered domain signals into a clearer decision.", summary: "A hands-on experiment in aggregating, scoring and reviewing domain intelligence.",
    metrics: [{ value: "Solo build", label: "End-to-end prototype", note: "Data inputs, scoring and interface" }],
    chapters: [
      { title: "The inputs were easier to find than to interpret.", paragraphs: ["Domain evaluation draws on several signals with different meanings and levels of reliability. I wanted a more useful way to aggregate those inputs and inspect a consistent evaluation."] },
      { title: "Build the scoring loop.", paragraphs: ["DomainSignal combines targeted data sources, scoring models and feedback-loop refinement. Python, data APIs and language models supported a working prototype that brought the information together in one interface."] },
      { title: "Use the prototype to sharpen the product question.", paragraphs: ["The project demonstrates hands-on data-product work: choosing inputs, shaping an evaluation model and presenting the result in a way a person can use. It remains an independent prototype."] },
    ], takeaway: "A scoring product is only as useful as the inputs and reasoning a user can understand.", evidence: "Approved personal build. Product interface shown; no public customer adoption or financial outcome is claimed.",
  },
  "date-night": {
    category: "Product experiments", client: "Independent build", period: "Mobile product prototype", accent: "Relationship-first discovery",
    headline: "Build for the people who already found each other.", summary: "A couples-focused app prototype for shared discovery and planning.",
    metrics: [{ value: "2 people", label: "One shared plan", note: "A product designed around an existing relationship" }],
    chapters: [
      { title: "The product opportunity starts after the match.", paragraphs: ["Dating products tend to focus on meeting somebody new. Date Night explores a different need: helping people in an existing relationship discover activities and make plans together."] },
      { title: "Make discovery a shared activity.", paragraphs: ["I built a couples-app prototype around shared planning, relationship-first discovery and date recommendations, using React Native and Firebase. The product work connected a specific audience need to the structure of the experience."] },
      { title: "Explore beyond the familiar category.", paragraphs: ["This is a creative product experiment rather than a search-marketing engagement. It demonstrates interface design, product judgment and the ability to make a concept concrete in a working prototype."] },
    ], takeaway: "A useful product can emerge by asking which part of the customer’s life a category stops serving.", evidence: "Approved personal prototype and existing product imagery. No usage or revenue claim is made.",
  },
  "vet-advocates-growth-system": {
    category: "Growth systems", client: "Veterans-services nonprofit", period: "Pro bono engagement", accent: "Acquisition & handoff",
    headline: "Make outreach a system someone else can run.", summary: "A structured acquisition program and documented handoff for a nonprofit serving veterans.",
    metrics: [{ value: "2–3 → 25–50", label: "Monthly signups", note: "Reported range before and after the program" }],
    chapters: [
      { title: "The mission needed a repeatable way to reach people.", paragraphs: ["The nonprofit lacked a structured acquisition process for connecting with veterans in need. A temporary campaign would not be enough if nobody could maintain the work afterward."] },
      { title: "Build the campaign and the operating instructions.", paragraphs: ["I created a structured Facebook advertising system, documented how to run it and trained an outsourced virtual assistant. The work connected Meta Ads, the CRM and the organization’s follow-through process."] },
      { title: "Leave a capability behind.", paragraphs: ["Reported monthly signups increased from roughly two or three to between 25 and 50. The handoff was part of that result: the organization received a repeatable operating process, not simply a one-off improvement."] },
    ], takeaway: "Growth work has more lasting value when the team can continue it without the original builder.", evidence: "Anonymized ranges retained from approved portfolio records. No veteran, donor or account data appears in the visual.",
  },
};

export function getStudyImage(slug: string): PortfolioImage | undefined {
  if (slug === "sfc-surf-school") return {
    src: publicPath("/images/portfolio-proof/sfc-south-shore-explorer.png"),
    alt: "The shipped SFC Surf School explorer, with ten named surf breaks anchored to a real Waikīkī aerial photograph",
    status: "ready", fit: "cover",
    note: "Production release review, September 10, 2026. Aerial: USDA-FSA NAIP, January 27, 2022, via NOAA Digital Coast.",
    sourceUrl: "https://sfcsurfschool.com/surf-guides/south-shore-surf-breaks/",
  };
  return portfolioImages[slug];
}
