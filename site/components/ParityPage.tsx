import { Router } from "wouter";
import type { ComponentType } from "react";
import { caseStudies } from "../../baseline/src/lib/data";
import { studyNotes } from "../../baseline/src/lib/study-notes";
import { studyNoteTeaser } from "../../baseline/src/lib/study-note-teaser";
import { visibleBlogPosts, excludedDraftSlugs, duplicateBlogSlugs } from "../../baseline/src/lib/published";
import { headshot, portfolioImages } from "../../baseline/src/lib/images";
import BlogPost from "../../baseline/src/pages/blog-post";
import StudyNote from "../../baseline/src/pages/study-note";
import CaseStudyDetail from "../../baseline/src/pages/case-study-detail";
import NotFound from "../../baseline/src/pages/not-found";
import Home from "../../baseline/src/pages/home";
import About from "../../baseline/src/pages/about";
import Contact from "../../baseline/src/pages/contact";
import CollabIdeas from "../../baseline/src/pages/collab-ideas";
import Resume from "../../baseline/src/pages/resume";
import Systems from "../../baseline/src/pages/systems";
import Work from "../../baseline/src/pages/work";
import VibeCoding from "../../baseline/src/pages/vibe-coding";
import BlogIndex from "../../baseline/src/pages/blog-index";
import CaseStudiesIndex from "../../baseline/src/pages/case-studies-index";
import AeoGeo from "../../baseline/src/pages/aeo-geo";

export interface ParityRoute {
  path: string;
  title: string;
  description: string;
  image?: string;
  standalone?: boolean;
  noindex?: boolean;
  Component?: ComponentType;
}

// Production snapshot 2745c7e. Existing Coming Soon routes remain noindex.
// Titles/descriptions for work, writing, about, contact and resume follow the
// 2026-09-14 agency copy pack (content-studio/drafts/2026-09-14-agency-copy-pack.md §h).
// Duplicate slugs resolve to the first entry, matching production behavior.
export const parityExceptions = { excludedDraftSlugs, duplicateBlogSlugs };
export const parityRoutes: ParityRoute[] = [
  { path: "/", title: "Mitchell Miller \u2014 Director of SEO, AEO/GEO & AI Search Systems", description: "Senior search and AI-growth leader with a decade owning enterprise organic at Apple, CommonSpirit, and Stanford Health Care. $15.21M FY22 attributable revenue, 4.9M+ organic sessions, three shipped AI products.", Component: Home },
  { path: "/about", title: "About Mitchell Miller, Principal", description: "From Apple and CommonSpirit Health to SFC Surf School \u2014 the practice behind the search and growth work.", Component: About },
  { path: "/contact", title: "Contact \u2014 Start a Conversation", description: "Tell Mitchell Miller the problem you want to solve. No booking confirmation, no pricing quote \u2014 just a reply.", Component: Contact },
  { path: "/collab-ideas", title: "Collab Ideas | Mitchell Miller", description: "Ways to collaborate with Mitchell Miller across enterprise SEO, AEO/GEO measurement, organic systems, and practical AI workflow prototypes.", Component: CollabIdeas },
  { path: "/resume", title: "Resumes \u2014 Mitchell Miller", description: "Four resumes, one chronology: Search Direction, AI Search Engineering, Product Management, Organic Systems Architecture.", Component: Resume },
  { path: "/systems", title: "Systems Architecture | Mitchell Miller", description: "Mitchell Miller's operating architecture across search, analytics, and AI systems.", Component: Systems },
  { path: "/work", title: "Work \u2014 Search, Growth & AI-Search Case Studies", description: "17 case studies spanning Apple, CommonSpirit Health, Stanford Health Care, SFC Surf School and more.", Component: Work },
  { path: "/selected-builds", title: "Selected Builds | Mitchell Miller", description: "Selected side builds, AI experiments, and workflow tools that support Mitchell Miller's SEO, AEO/GEO, and product systems portfolio.", Component: VibeCoding },
  { path: "/blog", title: "Writing \u2014 Search, Growth & AI-Search Notes", description: "Field notes on enterprise search, AI-search measurement and growth systems, from real engagements.", Component: BlogIndex },
  { path: "/case-studies", title: "Case Studies | Mitchell Miller", description: "In-depth case studies on enterprise SEO, AEO/GEO, and AI Search.", Component: CaseStudiesIndex },
  { path: "/aeo-geo", title: "AEO/GEO Measurement Methodology \u00b7 Mitchell Miller", description: "Mitchell Miller's AEO/GEO measurement methodology: prompt-cluster construction, citation velocity tracking, AI share-of-voice benchmarking, and closed-loop optimization across ChatGPT, Perplexity, and Google AI Overviews.", Component: AeoGeo },
  ...caseStudies.map(study => ({
    path: `/case-studies/${study.slug}`, title: `${study.title} | Mitchell Miller`,
    description: study.thesis, image: portfolioImages[study.slug]?.src,
    standalone: Boolean((study as { external?: boolean }).external), Component: CaseStudyDetail,
  })),
  ...visibleBlogPosts.map(post => ({
    path: `/blog/${post.slug}`, title: `${post.title} | Signals & Systems`,
    description: post.teaser, noindex: post.status === "draft", Component: BlogPost,
  })),
  ...studyNotes.map(note => ({
    path: `/blog/studying/${note.slug}`, title: `${note.title} | Studying — Mitchell Miller`,
    description: studyNoteTeaser(note), Component: StudyNote,
  })),
];

export function parityMetadata(path: string) {
  const normalized = path.replace(/\/$/, "") || "/";
  const route = parityRoutes.find(route => route.path === normalized);
  return route ? { ...route, image: route.image || headshot } : undefined;
}

export default function ParityPage({ path }: { path: string }) {
  const normalized = path.replace(/\/$/, "") || "/";
  const Page = parityRoutes.find(route => route.path === normalized)?.Component || NotFound;
  return <Router ssrPath={normalized}><Page /></Router>;
}
