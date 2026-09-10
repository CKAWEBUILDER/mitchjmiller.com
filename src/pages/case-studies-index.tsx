import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { CaseStudyCollection } from "@/components/case-study-collection";

export default function CaseStudiesIndex() {
  return <Layout><SEO title="Case Studies | Mitchell Miller" description="The decisions behind enterprise SEO, AI search systems and growth products for Apple, healthcare organizations, SFC Surf School and more." /><CaseStudyCollection mode="stories" /></Layout>;
}
