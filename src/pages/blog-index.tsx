import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { blogPosts } from "@/lib/data";
import { Link } from "wouter";

export default function BlogIndex() {
  return (
    <Layout>
      <SEO 
        title="Signals & Systems | Blog by Mitchell Miller" 
        description="Practical notes on enterprise SEO, AEO/GEO, AI search, and growth systems."
      />
      <div className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Signals & Systems</h1>
        <p className="text-xl text-muted-foreground mb-16">
          Practical notes on enterprise SEO, AEO/GEO, AI search, and growth systems.
        </p>
        
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <div key={post.slug} className="border-b border-border pb-12 last:border-0">
              <div className="mb-2">
                <span className={`text-sm font-bold uppercase tracking-wider ${post.status === 'draft' ? 'text-muted-foreground' : 'text-secondary'}`}>
                  {post.date}
                </span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-primary hover:text-secondary transition-colors cursor-pointer mb-4">
                  {post.title}
                </h2>
              </Link>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.teaser}
              </p>
              <Link href={`/blog/${post.slug}`} className="font-medium text-primary hover:text-secondary transition-colors">
                Read post →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
