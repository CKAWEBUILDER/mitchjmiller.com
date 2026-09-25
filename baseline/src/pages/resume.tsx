import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

export default function Resume() {
  return (
    <Layout>
      <SEO
        title="Work history | Mitchell Miller"
        description="Mitchell Miller’s work history now lives on LinkedIn."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-32">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">WORK HISTORY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">My work history now lives on LinkedIn.</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          The resume downloads that used to be here are retired. LinkedIn has my current role history and background.
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium" href="https://linkedin.com/in/mitchelljmillerjr" target="_blank" rel="noopener noreferrer">
            View my work history on LinkedIn
          </a>
        </div>
      </div>
    </Layout>
  );
}
