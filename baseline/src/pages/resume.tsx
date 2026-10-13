import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

export default function Resume() {
  return (
    <Layout>
      <SEO
        title="Personal portfolio | Mitchell Miller"
        description="Mitchell Miller’s work history and current resume are available on his personal portfolio."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-32">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">PERSONAL PROFILE</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">My work history now lives at mitchjmiller.com.</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Visit my personal portfolio for selected work, professional background and one current resume PDF.
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium" href="https://mitchjmiller.com/">
            View my personal portfolio
          </a>
          <a className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 font-medium" href="https://linkedin.com/in/mitchelljmillerjr" target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </Layout>
  );
}
