export type Origin = "waikiki" | "connecticut" | "unknown";
export type IntentScenario = "private" | "safety" | "family" | "nearby";

export const intentScenarios = {
  private: { query: "private surf lessons Waikīkī", label: "Choose a lesson", intent: "Destination + service choice", action: "A visitor is comparing a specific lesson format in Waikīkī.", organic: "A dedicated private-lesson page with price, group size, instructor details and a clear booking path.", maps: "A complete Waikīkī business profile with the lesson offering, meeting point, current photos and relevant reviews.", content: "Private vs. group lessons · what is included · where to meet" },
  safety: { query: "safe surf lessons Waikīkī", label: "Build confidence", intent: "Destination + reassurance", action: "A visitor wants to feel confident choosing a surf lesson in Waikīkī.", organic: "Explain supervision, student-to-instructor ratios, swimming expectations and how conditions affect lesson decisions.", maps: "Show the real location and instructor experience. Relevant reviews and photos can help a visitor assess fit.", content: "First-lesson preparation · instructor approach · choosing suitable conditions" },
  family: { query: "things to do in Waikīkī with kids", label: "Plan a family trip", intent: "Destination + activity planning", action: "A family is exploring activities in Waikīkī; surf lessons may be one option.", organic: "A useful family activity guide that explains age, ability and scheduling considerations, with a relevant lesson path.", maps: "Make the business easy to evaluate when the family moves from trip planning to selecting an activity provider.", content: "Family activity planning · lesson suitability · what to bring" },
  nearby: { query: "surf lessons near me", label: "Find something nearby", intent: "Proximity + service choice", action: "The searcher wants a nearby provider. Here, the location context supplies the destination.", organic: "Match the actual service area and make the location unmistakable. Keep meeting-point details and booking information consistent.", maps: "Proximity matters directly to the request. Accurate location and service information help people evaluate nearby options.", content: "Service area · meeting point · lesson availability" },
} satisfies Record<IntentScenario, { query: string; label: string; intent: string; action: string; organic: string; maps: string; content: string }>;

export function interpretIntent(scenario: IntentScenario, origin: Origin) {
  const explicit = scenario !== "nearby";
  const destination = explicit ? "Waikīkī, Hawaiʻi" : origin === "waikiki" ? "Waikīkī area" : origin === "connecticut" ? "Near the searcher in Connecticut" : "Needs location context";
  const originNote = explicit
    ? origin === "connecticut" ? "The search names Waikīkī. A searcher in Connecticut still expresses interest in that destination." : origin === "waikiki" ? "The named destination and current location align. The visitor could be choosing a lesson while already there." : "The query itself identifies the destination, even without knowing the searcher’s current location."
    : origin === "connecticut" ? "“Near me” points to the searcher’s area. It does not express a Waikīkī destination preference." : origin === "waikiki" ? "“Near me” and the current location together point toward Waikīkī providers." : "Without a named destination or current location, this model cannot identify the intended service area.";
  return { ...intentScenarios[scenario], explicit, destination, originNote };
}

export function compareCounts(previous: number, current: number) {
  const change = current - previous;
  const percentage = previous === 0 ? null : (change / previous) * 100;
  return { change, percentage, multiplier: previous === 0 ? null : current / previous };
}

export const growthSnapshot = {
  previous: { label: "Jul 15–Aug 11, 2026", clicks: 5, impressions: 470 },
  current: { label: "Aug 12–Sep 8, 2026", clicks: 54, impressions: 1652 },
};

export type ArchitecturePreset = "local" | "library" | "reporting";
export const architecturePresets = {
  local: { label: "Location engine", basedOn: "Dignity Health location system", slug: "commonspirit-locations-conversion-engine", summary: "Consistent location data becomes useful pages and measurable patient actions.", field: "Call to action", defaultValue: "Find an appointment", pages: ["Primary care", "Urgent care", "Cardiology"], override: "Find a cardiology appointment", source: "Location, specialty, address, hours and service-area records", model: "Organization → facility → service relationships", content: "Location-page template with reusable service and contact fields", publish: "Website pages and location listings with consistent entity details", measure: "Calls, directions and appointment actions, linked to the relevant location", govern: "Named data owners, validation rules and a reviewable change history" },
  library: { label: "Content library", basedOn: "Conditions & Treatments / AEM", slug: "commonspirit-medical-content-library", summary: "A governed content model gives each market a useful starting point while preserving room for local care details.", field: "Shared next step", defaultValue: "Explore care options", pages: ["Condition overview", "Treatment guide", "Local care page"], override: "Find care in your area", source: "Demand research, clinical expertise and approved source material", model: "Condition, symptom, treatment and service-line relationships", content: "Reusable summaries, metadata, FAQs and regional content fields", publish: "Market pages assembled from approved content fragments", measure: "Discovery, engagement and relevant care actions by content and market", govern: "Clinical review, version history and controlled local variations" },
  reporting: { label: "Reporting system", basedOn: "ClarityPulse reporting prototype", slug: "claritypulse-ai-reporting", summary: "Keep source definitions beside the numbers so a reporting workflow can produce a decision people understand.", field: "Shared reporting window", defaultValue: "Last 28 complete days", pages: ["Search readout", "Acquisition readout", "Executive brief"], override: "Last complete calendar month", source: "Search, analytics and campaign exports with source timestamps", model: "Account, channel, metric, period and comparison definitions", content: "Reusable chart, finding, evidence and recommended-action blocks", publish: "Client reports and executive summaries built from the same definitions", measure: "Data completeness, review status and the resulting business actions", govern: "Source provenance, human review and explicit metric ownership" },
} satisfies Record<ArchitecturePreset, { label: string; basedOn: string; slug: string; summary: string; field: string; defaultValue: string; pages: string[]; override: string; source: string; model: string; content: string; publish: string; measure: string; govern: string }>;

export const architectureLayers = [
  { key: "source", number: "01", label: "Source truth", caption: "What do we know?" },
  { key: "model", number: "02", label: "Model entities", caption: "How does it connect?" },
  { key: "content", number: "03", label: "Compose content", caption: "What can we reuse?" },
  { key: "publish", number: "04", label: "Publish clearly", caption: "Where does it live?" },
  { key: "measure", number: "05", label: "Measure actions", caption: "What happened next?" },
  { key: "govern", number: "06", label: "Keep it reliable", caption: "Who owns the change?" },
] as const;
