import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ArrowUpRight } from "lucide-react";
export default function Resume(){return <Layout><SEO title="Personal portfolio | Mitchell Miller" description="Mitchell Miller’s work history and current resume are available on his personal portfolio."/><div className="site-wrap"><header className="page-intro"><p className="eyebrow">PERSONAL PROFILE</p><h1>My work history now lives at mitchjmiller.com.</h1><p className="intro-deck">Visit my personal portfolio for selected work, professional background and one current resume PDF.</p><a className="button-ink mt-7" href="https://mitchjmiller.com/">View my personal portfolio <ArrowUpRight size={18}/></a></header></div></Layout>}
