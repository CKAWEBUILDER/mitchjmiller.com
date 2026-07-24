import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { blogPosts } from "@/lib/data";
import { studyNotes } from "@/lib/study-notes";
import { Link } from "wouter";

type Filter = "all" | "writing" | "studying";

const writingItems = blogPosts.map((p: any) => ({
  kind: "writing" as const,
  slug: p.slug,
  href: `/blog/${p.slug}`,
  title: p.title,
  teaser: p.teaser,
  date: p.date,
  status: p.status,
  meta: "",
}));

const studyingItems = studyNotes.map((n) => ({
  kind: "studying" as const,
  slug: n.slug,
  href: `/blog/studying/${n.slug}`,
  title: n.title,
  teaser: n.excerpt,
  date: n.date,
  status: undefined as string | undefined,
  meta: `${n.topic} · via ${n.creator}`,
}));

const allItems = [...studyingItems, ...writingItems];

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "writing", label: "Writing" },
  { id: "studying", label: "Studying" },
];

export default function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? allItems : allItems.filter((i) => i.kind === filter);

  return (
    <Layout>
      <SEO
        title="Signals & Systems | Blog by Mitchell Miller"
        description="Practical notes on enterprise SEO, AEO/GEO, AI search, and growth systems — plus what I'm currently studying."
      />
      <div className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Signals &amp; Systems</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Practical notes on enterprise SEO, AEO/GEO, AI search, and growth systems — plus what
          I&rsquo;m currently studying.
        </p>

        <div className="flex items-center gap-2 mb-14">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-primary"
              }`}
              data-testid={`filter-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {items.map((post) => (
            <div key={post.href} className="border-b border-border pb-12 last:border-0">
              <div className="mb-2 flex items-center gap-3">
                {post.kind === "studying" && (
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                    Studying
                  </span>
                )}
                <span
                  className={`text-sm font-bold uppercase tracking-wider ${
                    post.status === "draft" ? "text-muted-foreground" : "text-secondary"
                  }`}
                >
                  {post.date}
                </span>
              </div>
              <Link href={post.href}>
                <h2 className="text-2xl md:text-3xl font-bold text-primary hover:text-secondary transition-colors cursor-pointer mb-3">
                  {post.title}
                </h2>
              </Link>
              {post.meta && <p className="text-sm text-muted-foreground mb-3">{post.meta}</p>}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.teaser}</p>
              <Link
                href={post.href}
                className="font-medium text-primary hover:text-secondary transition-colors"
              >
                {post.kind === "studying" ? "Read study note →" : "Read post →"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
