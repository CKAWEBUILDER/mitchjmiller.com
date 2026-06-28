import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  ArrowRight,
  Bot,
  Compass,
  Mail,
  Megaphone,
  Network,
  Search,
} from "lucide-react";

const collaborationIdeas = [
  {
    icon: Search,
    title: "Search Strategy Sprint",
    body: "Turn a messy organic search problem into a prioritized roadmap: technical debt, content architecture, entity coverage, measurement gaps, and the first 30 days of work.",
    goodFor: "SEO Director searches, enterprise audits, migration risk, traffic recovery, search org design.",
  },
  {
    icon: Bot,
    title: "AEO/GEO Measurement Build",
    body: "Design a prompt-set, citation-tracking, and AI share-of-voice workflow that gives leadership a real baseline instead of guesses about AI search visibility.",
    goodFor: "Brands asking how ChatGPT, Perplexity, and AI Overviews change search demand.",
  },
  {
    icon: Network,
    title: "Entity & Programmatic SEO System",
    body: "Map the parent/child entity model, page templates, structured data, content modules, and analytics needed for a multi-location or multi-service growth engine.",
    goodFor: "Healthcare, marketplace, local, franchise, ecommerce, and service-line portfolios.",
  },
  {
    icon: Compass,
    title: "AI Workflow Prototype",
    body: "Prototype a small internal tool that removes a real operational bottleneck: reporting, transcript follow-up, brief generation, QA, or executive readouts.",
    goodFor: "Teams that need a working artifact before committing engineering time.",
  },
  {
    icon: Megaphone,
    title: "Workshop or Advisory Session",
    body: "Translate search, AI retrieval, and organic growth systems for leadership, marketing, product, or engineering audiences without turning it into hype.",
    goodFor: "Planning offsites, agency enablement, executive education, and strategic second opinions.",
  },
];

const signals = [
  "There is a growth/search problem, but no clear owner.",
  "The team knows AI search matters, but cannot measure it yet.",
  "Engineering needs a clearer business case before prioritizing SEO work.",
  "Content, location, or service-line pages exist, but the system does not compound.",
  "Manual reporting or meeting follow-up is consuming too much senior time.",
];

export default function CollabIdeas() {
  return (
    <Layout>
      <SEO
        title="Collab Ideas | Mitchell Miller"
        description="Ways to collaborate with Mitchell Miller across enterprise SEO, AEO/GEO measurement, organic systems, and practical AI workflow prototypes."
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-24">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary">
            Collaboration paths
          </p>
          <h1 className="mb-5 text-4xl font-bold text-primary md:text-5xl">
            Useful ways to work together.
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The best conversations usually start with a concrete system, measurement gap, or growth decision.
            These are the collaboration shapes where I can add value quickly.
          </p>
        </div>

        <section className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {collaborationIdeas.map((idea) => {
            const Icon = idea.icon;
            return (
              <article
                key={idea.title}
                className="flex min-h-72 flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-primary">{idea.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{idea.body}</p>
                </div>
                <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-primary/75">
                  <span className="font-bold text-primary">Good for: </span>
                  {idea.goodFor}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-10 border-t border-border pt-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Strong reasons to reach out.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A vague coffee chat is fine, but a specific operational question is better. These signals usually mean
              there is enough substance for a useful collaboration conversation.
            </p>
          </div>
          <div className="space-y-3">
            {signals.map((signal) => (
              <div key={signal} className="flex gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <p className="text-sm leading-relaxed text-primary">{signal}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-border bg-primary p-7 text-primary-foreground">
          <h2 className="mb-2 text-xl font-bold">Bring the problem, not a perfect brief.</h2>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
            A useful first message can be simple: what you are trying to change, what is blocked, what has already been tried,
            and what decision needs to happen next.
          </p>
          <a
            href="mailto:mitchelljmillerjr26@gmail.com?subject=Collab%20Idea"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Send a collab idea <Mail className="ml-2 h-4 w-4" />
          </a>
        </section>
      </div>
    </Layout>
  );
}
