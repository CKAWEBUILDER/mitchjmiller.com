import type { StudyNote } from "./study-notes";

// A historical excerpt was cut inside an HTML tag. Read its complete source
// before shortening it so both the index and metadata show useful prose.
export function studyNoteTeaser(note: StudyNote): string {
  if (!/<[a-z]/i.test(note.excerpt)) return note.excerpt;
  const text = note.contentHtml
    .replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}…` : text;
}
