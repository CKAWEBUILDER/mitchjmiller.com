import { publicPath } from "./paths";

export const resumeOptions = [
  {
    id: "search-direction",
    label: "Search Direction",
    description: "Enterprise search leadership + AI-search strategy.",
    href: publicPath("/files/Mitchell-Miller-Search-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Search-Systems-Background-2026.pdf",
    signals: ["Search strategy", "Enterprise scale", "AI visibility"],
    talkTrack:
      "Use this for search leadership, enterprise SEO operating models, cross-functional roadmap influence, or how AI search changes the search org.",
  },
  {
    id: "ai-search-engineering",
    label: "AI Search Engineering",
    description: "Hands-on AEO/GEO optimization + AI tooling.",
    href: publicPath("/files/Mitchell-Miller-AI-Search-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-AI-Search-Systems-Background-2026.pdf",
    signals: ["AEO/GEO", "LLM tooling", "Measurement"],
    talkTrack:
      "Use this for prompt-set monitoring, AI citation visibility, entity optimization, custom evaluation workflows, or practical LLM tooling.",
  },
  {
    id: "product-management",
    label: "Product Management",
    description: "Roadmap, requirements, shipped AI products.",
    href: publicPath("/files/Mitchell-Miller-Product-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Product-Systems-Background-2026.pdf",
    signals: ["Roadmaps", "Requirements", "Execution"],
    talkTrack:
      "Use this for product ownership, requirements, stakeholder alignment, shipped internal tools, AI workflow products, or system handoffs.",
  },
  {
    id: "organic-systems-architecture",
    label: "Organic Systems Architecture",
    description: "Programmatic SEO + organic growth systems.",
    href: publicPath("/files/Mitchell-Miller-Organic-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Organic-Systems-Background-2026.pdf",
    signals: ["Programmatic SEO", "Entity systems", "Growth loops"],
    talkTrack:
      "Use this for programmatic SEO, entity architecture, multi-location systems, content libraries, migrations, and durable organic growth loops.",
  },
] as const;

export const defaultResume = resumeOptions[0];
