import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { blogPosts } from "@/lib/data";
import { studyNotes } from "@/lib/study-notes";
import { publicPath } from "@/lib/paths";
import { headshot } from "@/lib/images";
import { Link } from "wouter";

type Filter = "all" | "writing" | "studying";
type NoteItem = {
  kind: Exclude<Filter, "all">;
  slug: string;
  href: string;
  title: string;
  teaser: string;
  date: string;
  meta: string;
  cover?: string;
};

function firstImage(html?: string) {
  const src = html?.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1];
  return src?.startsWith("/images/") ? publicPath(src) : undefined;
}

function plainText(value: string) {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };
  const decoded = value
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<\/?[a-z][^>]*>?/gi, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      if (name.startsWith("#")) {
        const number = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : Number(name.slice(1));
        return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : "";
      }
      return entities[name.toLowerCase()] ?? entity;
    });
  return decoded.replace(/<\/?[a-z][^>]*>?/gi, " ").replace(/\s+/g, " ").trim();
}

function studyExcerpt(excerpt: string, contentHtml: string) {
  const cleaned = plainText(excerpt);
  if (cleaned.length >= 60) return cleaned;
  const paragraph = contentHtml.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  return plainText(paragraph || contentHtml).slice(0, 240);
}

// Month-only dates sort at the start of that month; their displayed precision is preserved.
function dateValue(date: string) {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00Z` : date;
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) ? parsed : 0;
}

function displayDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))
    : date;
}

function uniqueSlugs<T extends { slug: string }>(items: readonly T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

const writingItems: NoteItem[] = uniqueSlugs(blogPosts.filter((post) => post.status === "published")).map((post) => ({
  kind: "writing",
  slug: post.slug,
  href: `/blog/${post.slug}`,
  title: post.title,
  teaser: plainText(post.teaser),
  date: post.date,
  meta: "By Mitchell Miller",
  cover: firstImage(post.contentHtml),
}));

const studyingItems: NoteItem[] = uniqueSlugs(studyNotes).map((note) => ({
  kind: "studying",
  slug: note.slug,
  href: `/blog/studying/${note.slug}`,
  title: note.title,
  teaser: studyExcerpt(note.excerpt, note.contentHtml),
  date: note.date,
  meta: `${note.topic}${note.creator ? ` · via ${note.creator}` : ""}`,
  cover: firstImage(note.contentHtml),
}));

const allItems = [...writingItems, ...studyingItems].sort((a, b) => dateValue(b.date) - dateValue(a.date));
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All notes" },
  { id: "writing", label: "Writing" },
  { id: "studying", label: "Studying" },
];

function Teaser({ text, className = "" }: { text: string; className?: string }) {
  // Existing generated excerpts can end mid-word; signal that they are excerpts.
  const excerpt = /[.!?…]$/.test(text.trim()) ? text : `${text.replace(/\s+\S*$/, "")}…`;
  return <p className={className}>{excerpt}</p>;
}

export default function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? allItems : allItems.filter((item) => item.kind === filter);
  const [featured, ...remaining] = items;

  return (
    <Layout>
      <SEO title="Field Notes — Signals & Systems" description="Writing and study notes by Mitchell Miller on enterprise SEO, AI search, practical agents, and growth systems." />
      <section className="site-wrap page-intro">
        <p className="eyebrow">FIELD NOTES / SIGNALS &amp; SYSTEMS</p>
        <h1>Stay curious.<br /><em>Follow the signal.</em></h1>
        <p className="intro-deck">What I’m building, what I’m learning, and the ideas changing how search and software work.</p>
      </section>

      <section className="site-wrap pb-16 md:pb-24" aria-label="Writing and study notes">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-y border-border py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter field notes">
            {filters.map((tab) => (
              <button key={tab.id} type="button" onClick={() => setFilter(tab.id)} aria-pressed={filter === tab.id} aria-controls="field-note-results" data-testid={`filter-${tab.id}`}
                className={`px-4 py-2 text-sm transition-colors ${filter === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-primary"}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite">{items.length} {items.length === 1 ? "note" : "notes"} · Newest first</p>
        </div>

        <div id="field-note-results">
          {featured && (
            <article className="mb-5 border-b border-border pb-10 md:pb-12">
              <Link href={featured.href} className="group grid items-center gap-7 md:grid-cols-[1.05fr_1fr] md:gap-12">
                {featured.cover ? (
                  <div className="overflow-hidden bg-muted"><img src={featured.cover} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div>
                ) : (
                  <div className="grid aspect-[16/10] grid-cols-2 overflow-hidden bg-primary text-primary-foreground" aria-hidden="true"><div className="flex flex-col justify-between p-4 sm:p-7"><span className="text-[10px] tracking-[.15em]">MITCHELL MILLER</span><span className="font-serif text-[clamp(1.6rem,3vw,3rem)] leading-[1.05]">Search.<br />Systems.<br /><i className="text-[#e7ab8a]">Growth.</i></span><span className="text-[9px] tracking-widest">THE THROUGH LINE</span></div><img src={headshot} alt="" className="h-full min-h-0 w-full object-cover object-top grayscale" /></div>
                )}
                <div>
                  <p className="eyebrow mb-4">LATEST {featured.kind === "studying" ? "STUDY NOTE" : "WRITING"} / {displayDate(featured.date)}</p>
                  <h2 className="mb-4 text-2xl font-medium leading-tight tracking-tight group-hover:text-secondary md:text-3xl">{featured.title}</h2>
                  <Teaser text={featured.teaser} className="mb-4 text-base leading-relaxed text-muted-foreground" />
                  <p className="mb-6 text-xs leading-relaxed text-muted-foreground">{featured.meta}</p>
                  <span className="text-link">{featured.kind === "studying" ? "Read the study note" : "Read the article"}<ArrowUpRight size={17} /></span>
                </div>
              </Link>
            </article>
          )}

          {remaining.map((post) => (
            <article key={post.href} className="border-b border-border py-7 md:py-8">
              <Link href={post.href} className="group grid gap-4 md:grid-cols-[155px_1fr_32px] md:gap-8">
                <div className="flex gap-3 text-xs text-muted-foreground md:block"><p>{displayDate(post.date)}</p><p className="uppercase tracking-widest text-secondary md:mt-3">{post.kind === "studying" ? "Study note" : "Writing"}</p></div>
                <div><h2 className="mb-3 text-xl font-medium leading-snug tracking-tight group-hover:text-secondary md:text-2xl">{post.title}</h2><Teaser text={post.teaser} className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground" /><p className="mt-3 text-xs text-muted-foreground">{post.meta}</p></div>
                <ArrowUpRight className="hidden self-start md:block" size={22} aria-hidden="true" />
              </Link>
            </article>
          ))}
          {!items.length && <p className="py-12 text-muted-foreground">There are no published notes in this category yet.</p>}
        </div>
      </section>
    </Layout>
  );
}
