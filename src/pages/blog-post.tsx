import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { blogPosts } from "@/lib/data";
import { Link, useRoute } from "wouter";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find(p => p.slug === params?.slug);
  const contentHtml = (post as { contentHtml?: string } | undefined)?.contentHtml;

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-secondary hover:underline">Return to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={`${post.title} | Signals & Systems`} 
        description={post.teaser}
      />
      <article className="container mx-auto px-4 md:px-8 max-w-3xl py-24">
        
        <header className="mb-12">
          <div className="mb-4">
            <span className={`text-sm font-bold uppercase tracking-wider ${post.status === 'draft' ? 'text-muted-foreground' : 'text-secondary'}`}>
              {post.date} {post.status === 'draft' && '— Coming Soon'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.teaser}
          </p>
        </header>

        {post.status === 'draft' ? (
          <div className="p-8 border border-border rounded-xl bg-muted/30 text-center">
            <p className="text-lg text-muted-foreground">This content is currently being written.</p>
            <Link href="/blog" className="inline-block mt-4 text-secondary font-medium hover:underline">
              ← Back to all posts
            </Link>
          </div>
        ) : contentHtml ? (
          <div
            className="prose prose-lg prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <div
            className="prose prose-lg prose-slate max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: post.content?.replace(/\n\n/g, '</p><p>').replace(/### (.*?)\n/g, '<h3 class="text-2xl font-bold text-primary mt-12 mb-4">$1</h3>').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-primary">$1</strong>') || ''
            }}
          />
        )}
      </article>
    </Layout>
  );
}
