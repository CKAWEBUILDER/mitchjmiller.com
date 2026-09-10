import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ArrowUpRight } from "lucide-react";
export default function NotFound(){return <Layout><SEO title="Page not found" description="This page isn’t part of Mitchell Miller’s portfolio. Explore the work or return to the homepage."/><div className="site-wrap page-intro pb-24"><p className="eyebrow">404 / A DETOUR</p><h1>Let’s get you<br/><em>back to the work.</em></h1><p className="intro-deck">That page isn’t here. The case studies and interactive lab are good places to start.</p><div className="hero-actions"><Link href="/case-studies" className="button-ink">Explore the case studies <ArrowUpRight size={18}/></Link><Link href="/" className="text-link">Back to home</Link></div></div></Layout>}
