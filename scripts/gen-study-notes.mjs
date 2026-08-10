// One-off-ish generator: convert published study-note markdown into site data.
// Reads synthesis blog-post.md files from the private library, strips the
// transcript (never included — .md has none), rewrites image paths, converts
// ```mermaid fences to <pre class="mermaid">, and emits src/lib/study-notes.ts.
// Copies frame images into public/images/study/<slug>/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const LIB = "/Users/mitchellmiler/Desktop/claude-code/youtube-library";

// slug on the site  ->  { dir, topic }   (only publish-ready syntheses)
const NOTES = [
  { slug: "hermes-seo-agent", dir: "agentic-engineering/hermes-agent-just-automated-seo-completely", topic: "AI Search / GEO", date: "2026-08-09" },
  { slug: "codex-obsolete-9-moves", dir: "agentic-engineering/codex-just-made-claude-obsolete", topic: "Agentic Engineering", date: "2026-08-09" },
  { slug: "chatgpt-sites", dir: "agentic-engineering/chatgpt-sites-build-host-apps-from-codex", topic: "Agentic Engineering", date: "2026-08-09" },
  { slug: "book-to-skill", dir: "agentic-engineering/i-accidentally-turned-a-book-into-an-ai-agent", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "claude-code-6-new-rules", dir: "agentic-engineering/claude-code-just-changed-forever-6-new-rules-by-anthropic-engineers", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "claude-code-make-money", dir: "agentic-engineering/i-asked-claude-code-to-make-me-as-much-money-as-possible", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "build-ai-agents-full-course", dir: "agentic-engineering/build-ai-agents-to-automate-your-entire-business-full-course", topic: "Agentic Engineering", date: "2026-07-24" },
  { slug: "codex-voice-jarvis", dir: "agentic-engineering/openai-just-released-codex-voice-its-basically-jarvis", topic: "Agentic Engineering", date: "2026-07-24" },
  { slug: "pi-coding-agent", dir: "agentic-engineering/the-pi-coding-agent", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "ships-100x-faster", dir: "agentic-engineering/why-this-dev-ships-100x-faster", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "forget-loop-engineering", dir: "agentic-engineering/forget-loop-engineering", topic: "Agentic Engineering", date: "2026-07-25" },
  { slug: "mark-cuban-ai-bubble", dir: "other/mark-cuban-on-the-ai-bubble-who-actually-gets-wiped-out", topic: "AI & Markets", date: "2026-07-24" },
  { slug: "hormozi-build-this-instead", dir: "other/alex-hormozis-warning-stop-chasing-ai-build-this-instead", topic: "Business & AI", date: "2026-07-24" },
  { slug: "old-seo-collapsing", dir: "other/the-old-seo-system-is-collapsing", topic: "AI Search / GEO", date: "2026-07-25" },
  { slug: "seo-2026-ai-era", dir: "other/seo-in-2026-ai-era", topic: "AI Search / GEO", date: "2026-07-25" },
  { slug: "aeo-geo-aio", dir: "other/aeo-vs-geo-vs-aio", topic: "AI Search / GEO", date: "2026-07-25" },
  { slug: "smith-chart-scariest-ee", dir: "other/the-scariest-chart-in-electrical-engineering", topic: "Science / Systems", date: "2026-07-25" },
  { slug: "aeo-80-percent", dir: "other/learn-80-of-aeo-in-19-minutes", topic: "AI Search / GEO", date: "2026-07-25" },
];

marked.setOptions({ gfm: true });

function extract(md, slug) {
  const titleM = md.match(/^#\s+(.+)$/m);
  const title = titleM ? titleM[1].trim() : slug;
  const bylineM = md.match(/\*Original video by \*\*(.+?)\*\*.*?\((https?:\/\/[^)]+)\)/s);
  // fallback: article-style byline "*Source: **Name** ... [label](url)"
  const srcM = md.match(/\*Source:\s*\*\*(.+?)\*\*[\s\S]*?\((https?:\/\/[^)]+)\)/);
  const creator = bylineM ? bylineM[1].trim() : srcM ? srcM[1].trim() : "";
  const youtubeUrl = bylineM ? bylineM[2].trim() : srcM ? srcM[2].trim() : "";
  const isVideo = !!bylineM;
  const whyM = md.match(/>\s*\*\*Why I'm studying this:\*\*\s*([\s\S]*?)(?:\*\(|\n\n|\n>?\s*---)/);
  const why = whyM ? whyM[1].replace(/\*\*/g, "").replace(/\s+/g, " ").trim() : "";
  // body = TL;DR onward
  const idx = md.indexOf("## TL;DR");
  let body = idx >= 0 ? md.slice(idx) : md;
  // excerpt: first sentence of TL;DR
  const tldrM = body.match(/## TL;DR\s+([\s\S]*?)\n\n/);
  const excerpt = tldrM ? tldrM[1].replace(/\*\*/g, "").replace(/\s+/g, " ").trim().slice(0, 220) : "";
  // pull mermaid fences out, convert rest, reinsert
  const blocks = [];
  body = body.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) => {
    blocks.push(code.trim());
    return `@@MERMAID${blocks.length - 1}@@`;
  });
  let html = marked.parse(body);
  blocks.forEach((b, i) => {
    const esc = b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(new RegExp(`<p>@@MERMAID${i}@@</p>`), `<pre class="mermaid">${esc}</pre>`);
    html = html.replace(`@@MERMAID${i}@@`, `<pre class="mermaid">${esc}</pre>`);
  });
  // rewrite image src frames/x.jpg -> /images/study/<slug>/x.jpg
  html = html.replace(/src="frames\/([^"]+)"/g, `src="/images/study/${slug}/$1"`);
  return { title, creator, youtubeUrl, isVideo, why, excerpt, contentHtml: html };
}

const out = [];
for (const n of NOTES) {
  const mdPath = path.join(LIB, n.dir, "blog-post.md");
  const md = fs.readFileSync(mdPath, "utf8");
  const data = extract(md, n.slug);
  // copy frames
  const framesDir = path.join(LIB, n.dir, "frames");
  if (fs.existsSync(framesDir)) {
    const dest = path.join(REPO, "public", "images", "study", n.slug);
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(framesDir)) {
      if (f.endsWith(".jpg")) fs.copyFileSync(path.join(framesDir, f), path.join(dest, f));
    }
  }
  out.push({ slug: n.slug, topic: n.topic, date: n.date, ...data });
  console.log(`  ${n.slug}: ${data.creator} — ${data.contentHtml.length} chars html`);
}

const ts = `// AUTO-GENERATED by scripts/gen-study-notes.mjs — do not edit by hand.
export interface StudyNote {
  slug: string;
  title: string;
  creator: string;
  youtubeUrl: string;
  isVideo: boolean;
  topic: string;
  date: string;
  why: string;
  excerpt: string;
  contentHtml: string;
}

export const studyNotes: StudyNote[] = ${JSON.stringify(out, null, 2)};
`;
fs.writeFileSync(path.join(REPO, "src", "lib", "study-notes.ts"), ts);
console.log(`\nWrote src/lib/study-notes.ts (${out.length} notes)`);
