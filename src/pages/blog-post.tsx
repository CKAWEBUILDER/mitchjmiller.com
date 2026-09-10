import { marked } from "marked";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { blogPosts } from "@/lib/data";
import { Link, useRoute } from "wouter";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find((item) => item.slug === params?.slug && item.status === "published");

  if (!post) {
    return (
      <Layout>
        <SEO title="Post not found" description="Explore published writing and study notes by Mitchell Miller." />
        <div className="site-wrap page-intro pb-24">
          <p className="eyebrow">FIELD NOTES</p>
          <h1>Post not found.</h1>
          <Link href="/blog" className="text-link"><ArrowLeft size={17} /> Return to all notes</Link>
        </div>
      </Layout>
    );
  }

  // Content is authored locally in the repository. Preserve rich HTML posts;
  // parse legacy Markdown fully so paragraphs, headings and lists remain semantic.
  const contentHtml = post.contentHtml || marked.parse(post.content || "", { async: false, gfm: true });

  return (
    <Layout>
      <SEO title={`${post.title} | Signals & Systems`} description={post.teaser} />
      <article className="site-wrap max-w-4xl! pb-16 md:pb-24">
        <header className="page-intro border-b border-border">
          <Link href="/blog" className="text-link mb-9"><ArrowLeft size={16} /> All field notes</Link>
          <p className="eyebrow">WRITING / {post.date}</p>
          <h1 className="text-[clamp(32px,4vw,54px)]!">{post.title}</h1>
          <p className="intro-deck max-w-none!">{post.teaser}</p>
          <p className="mt-6 text-xs text-muted-foreground">By {post.author}</p>
        </header>
        <div className="prose prose-lg mt-9 max-w-none text-muted-foreground prose-headings:font-medium prose-headings:text-primary prose-a:text-secondary prose-strong:text-primary prose-img:rounded-none prose-pre:overflow-x-auto" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <footer className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7">
          <Link href="/blog" className="text-link"><ArrowLeft size={17} /> More field notes</Link>
          <Link href="/collab-ideas" className="text-link">Put an idea to work <ArrowUpRight size={17} /></Link>
        </footer>
      </article>
    </Layout>
  );
}
