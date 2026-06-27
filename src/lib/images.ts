import { publicPath } from "./paths";

export type AssetStatus = "ready" | "placeholder" | "missing";

export type PortfolioImage = {
  src: string;
  alt: string;
  status: AssetStatus;
  note?: string;
  sourceUrl?: string;
  fit?: "cover" | "contain";
};

export const headshot = publicPath("/images/headshot.png");

export const resumePdf =
  publicPath("/files/Mitchell_Miller_SEO_AEO_GEO_Director_Final_V2_2026.pdf");

export const portfolioImages: Record<string, PortfolioImage> = {
  "claritypulse-ai-reporting": {
    src: publicPath("/images/claritypulse-dashboard.png"),
    alt: "Representative ClarityPulse AI reporting dashboard mockup",
    status: "ready",
    note: "Representative product mockup; not client data.",
  },
  "searchforge-content-intelligence": {
    src: publicPath("/images/searchforge-dashboard.png"),
    alt: "Representative SearchForge AI content intelligence dashboard mockup",
    status: "ready",
    note: "Representative product mockup; not client data.",
  },
  "actionthread-transcript-execution": {
    src: publicPath("/images/actionthread-dashboard.png"),
    alt: "Representative ActionThread transcript-to-execution workflow mockup",
    status: "ready",
    note: "Representative product mockup; not client data.",
  },
  domainsignal: {
    src: publicPath("/images/domainsignal.png"),
    alt: "DomainSignal mobile domain intelligence prototype screen",
    status: "ready",
  },
  "date-night": {
    src: publicPath("/images/datenight.png"),
    alt: "Date Night mobile app prototype screen",
    status: "ready",
  },
  "apple-seasonal-search": {
    src: publicPath("/images/proof-optimized/apple-seasonal-holiday.png"),
    alt: "Apple Newsroom holiday season page showing seasonal gift guide coverage",
    status: "ready",
    note: "Public Apple seasonal surface used as representative proof context.",
    sourceUrl:
      "https://www.apple.com/newsroom/2022/11/apple-celebrates-the-holiday-season/",
  },
  "apple-store-amr": {
    src: publicPath("/images/proof-optimized/apple-store-amr.png"),
    alt: "Apple Store public page showing ecommerce category and merchandising surface",
    status: "ready",
    note: "Current public apple.com/store surface used as representative proof context.",
    sourceUrl: "https://www.apple.com/store",
  },
  "apple-education-store": {
    src: publicPath("/images/proof-optimized/apple-education-store.png"),
    alt: "Apple Education Store public page showing education merchandising surface",
    status: "ready",
    note: "Current public Apple Education Store surface used as representative proof context.",
    sourceUrl: "https://www.apple.com/us-edu/store",
  },
  "stanford-myhealth-seo": {
    src: publicPath("/images/proof-optimized/stanford-myhealth-appstore.png"),
    alt: "Stanford Health Care MyHealth App Store page showing mobile app screenshots",
    status: "ready",
    note: "Public App Store surface used as representative proof context.",
    sourceUrl:
      "https://apps.apple.com/us/app/stanford-health-care-myhealth/id922978966",
  },
  "commonspirit-locations-conversion-engine": {
    src: publicPath("/images/proof-optimized/dignity-locations-conversion-engine.png"),
    alt: "CommonSpirit location finder public page showing location search and care-site discovery",
    status: "ready",
    note: "Current public location-finder surface used as representative proof context.",
    sourceUrl: "https://locations.dignityhealth.org/",
  },
  "commonspirit-network-consolidation": {
    src: publicPath("/images/proof-optimized/commonspirit-network-consolidation.svg"),
    alt: "Representative CommonSpirit network consolidation architecture diagram",
    status: "ready",
    note: "Representative architecture diagram based on resume/profile experience.",
    fit: "contain",
  },
  "commonspirit-medical-content-library": {
    src: publicPath("/images/proof-optimized/dignity-medical-content-library.png"),
    alt: "CommonSpirit orthopedic surgery service-line page showing patient acquisition content surface",
    status: "ready",
    note: "Current public service-line page used as representative proof context.",
    sourceUrl:
      "https://www.dignityhealth.org/conditions-and-treatments/orthopedics/orthopedic-surgery",
  },
  "aem-content-fragmentation-architecture": {
    src: publicPath("/images/proof-optimized/aem-content-fragmentation-architecture.svg"),
    alt: "Representative AEM content fragment architecture diagram",
    status: "ready",
    note: "Representative architecture diagram based on resume/profile experience.",
    fit: "contain",
  },
  "yext-entity-data-foundation": {
    src: publicPath("/images/proof-optimized/yext-entity-data-foundation.svg"),
    alt: "Representative Yext entity data foundation architecture diagram",
    status: "ready",
    note: "Representative architecture diagram based on resume/profile experience.",
    fit: "contain",
  },
  "aeo-visibility-infrastructure": {
    src: publicPath("/images/aeo-measurement-dashboard.png"),
    alt: "Representative AEO measurement dashboard mockup",
    status: "ready",
    note: "Representative measurement mockup; replace with a redacted Profound-style dashboard if available.",
  },
  "vet-advocates-growth-system": {
    src: publicPath("/images/placeholders/vet-advocates-growth-system.png"),
    alt: "Temporary placeholder for Vet Advocates growth system case study",
    status: "placeholder",
    note: "Replace with anonymized campaign or funnel proof asset.",
  },
};

export const caseStudyImages: Record<string, string> = Object.fromEntries(
  Object.entries(portfolioImages).map(([slug, image]) => [slug, image.src]),
);
