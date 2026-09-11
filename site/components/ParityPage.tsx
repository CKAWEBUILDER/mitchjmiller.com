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
// Duplicate slugs resolve to the first entry, matching production behavior.
export const parityExceptions = { excludedDraftSlugs, duplicateBlogSlugs };
export const parityRoutes: ParityRoute[] = [
  { path: "/", title: "Mitchell Miller \u2014 Director of SEO, AEO/GEO & AI Search Systems", description: "Senior search and AI-growth leader with a decade owning enterprise organic at Apple, CommonSpirit, and Stanford Health Care. $15.21M FY22 attributable revenue, 4.9M+ organic sessions, three shipped AI products.", Component: Home },
  { path: "/about", title: "About \u00b7 Mitchell Miller \u2014 Director of SEO, AEO/GEO & AI Search Systems", description: "Mitchell Miller is an SEO, AEO/GEO, and AI Search systems leader. He's led enterprise search at Apple, CommonSpirit Health, and Stanford Health Care.", Component: About },
  { path: "/contact", title: "Contact \u00b7 Mitchell Miller \u2014 Director of SEO, AEO/GEO & AI Search Systems", description: "Get in touch with Mitchell Miller for SEO Director, AEO/GEO Lead, AI Search Strategist, or speaking engagement opportunities.", Component: Contact },
  { path: "/collab-ideas", title: "Collab Ideas | Mitchell Miller", description: "Ways to collaborate with Mitchell Miller across enterprise SEO, AEO/GEO measurement, organic systems, and practical AI workflow prototypes.", Component: CollabIdeas },
  { path: "/resume", title: "Resume | Mitchell Miller", description: "Download Mitchell Miller's resume.", Component: Resume },
  { path: "/systems", title: "Systems Architecture | Mitchell Miller", description: "Mitchell Miller's operating architecture across search, analytics, and AI systems.", Component: Systems },
  { path: "/work", title: "Work | Mitchell Miller", description: "Portfolio of work across Enterprise SEO, AEO/GEO, and AI Products.", Component: Work },
  { path: "/selected-builds", title: "Selected Builds | Mitchell Miller", description: "Selected side builds, AI experiments, and workflow tools that support Mitchell Miller's SEO, AEO/GEO, and product systems portfolio.", Component: VibeCoding },
  { path: "/blog", title: "Signals & Systems | Blog by Mitchell Miller", description: "Practical notes on enterprise SEO, AEO/GEO, AI search, and growth systems \u2014 plus what I'm currently studying.", Component: BlogIndex },
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
