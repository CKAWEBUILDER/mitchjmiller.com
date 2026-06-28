import { publicPath } from "./paths";

export const resumeOptions = [
  {
    id: "search-direction",
    label: "Search Direction",
    description: "Enterprise search leadership + AI-search strategy.",
    href: publicPath("/files/Mitchell-Miller-Search-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Search-Systems-Background-2026.pdf",
  },
  {
    id: "ai-search-engineering",
    label: "AI Search Engineering",
    description: "Hands-on AEO/GEO optimization + AI tooling.",
    href: publicPath("/files/Mitchell-Miller-AI-Search-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-AI-Search-Systems-Background-2026.pdf",
  },
  {
    id: "product-management",
    label: "Product Management",
    description: "Roadmap, requirements, shipped AI products.",
    href: publicPath("/files/Mitchell-Miller-Product-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Product-Systems-Background-2026.pdf",
  },
  {
    id: "organic-systems-architecture",
    label: "Organic Systems Architecture",
    description: "Programmatic SEO + organic growth systems.",
    href: publicPath("/files/Mitchell-Miller-Organic-Systems-Background-2026.pdf"),
    download: "Mitchell-Miller-Organic-Systems-Background-2026.pdf",
  },
] as const;

export const defaultResume = resumeOptions[0];
