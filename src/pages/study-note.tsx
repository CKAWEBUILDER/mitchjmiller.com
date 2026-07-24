import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { studyNotes } from "@/lib/study-notes";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Youtube } from "lucide-react";

export default function StudyNote() {
  const [, params] = useRoute("/blog/studying/:slug");
  const note = studyNotes.find((n) => n.slug === params?.slug);

  useEffect(() => {
    if (!note) return;
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });
      if (!cancelled) {
        try {
          await mermaid.run({ querySelector: ".study-content .mermaid" });
        } catch {
          /* ignore render errors */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [note?.slug]);

  if (!note) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Study Note Not Found</h1>
          <Link href="/blog" className="text-secondary hover:underline">
            Return to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={`${note.title} | Studying — Mitchell Miller`} description={note.excerpt} />
      <article className="container mx-auto px-4 md:px-8 max-w-3xl py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Signals &amp; Systems
        </Link>

        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-sm">
            <span className="font-bold uppercase tracking-wider text-secondary">Studying</span>
            <span className="text-muted-foreground">{note.topic}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {note.title}
          </h1>
          {note.why && (
            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-2 border-secondary pl-4">
              {note.why}
            </p>
          )}
          <a
            href={note.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            <Youtube className="h-4 w-4" /> Watch the original by {note.creator} on YouTube
          </a>
        </header>

        <div
          className="study-content prose prose-lg prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />

        <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
          A study note synthesizing{" "}
          <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
            {note.creator}&rsquo;s video
          </a>
          . All credit for the original ideas goes to the creator; the summary, structure, and
          diagrams here are my own.
        </footer>
      </article>
    </Layout>
  );
}
