import { Layout } from "@/components/layout";
import { ResumeCard } from "@/components/resume-card";
import { SEO } from "@/components/seo";
import { resumeOptions } from "@/lib/resumes";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
export default function Resume(){return <Layout><SEO title="Resumes — Mitchell Miller" description="Download current two-page resumes for search leadership, AI search engineering, product systems and organic growth. Updated September 2026."/><div className="site-wrap"><header className="page-intro"><p className="eyebrow">THE EXPERIENCE, IN TWO PAGES</p><h1>Same background.<br/><em>The right emphasis.</em></h1><p className="intro-deck">Enterprise search, AI implementation, and hands-on growth work. Choose the view that’s most relevant to your team.</p><p className="eyebrow mt-6 text-muted-foreground">UPDATED SEPTEMBER 2026 · PDF DOWNLOADS · TWO PAGES EACH</p></header><div className="grid gap-5 md:grid-cols-2 pb-12">{resumeOptions.map(r=><ResumeCard key={r.id} resume={r}/>)}</div><div className="flex flex-wrap items-center justify-between gap-5 border-t py-8 mb-12"><p className="text-sm text-muted-foreground">Want to see how that experience translates into delivered work?</p><Link href="/case-studies" className="text-link">Explore the case studies <ArrowUpRight size={17}/></Link></div></div></Layout>}
