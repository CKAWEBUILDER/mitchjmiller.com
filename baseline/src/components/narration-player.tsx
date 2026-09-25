import narration from "../../../site/data/narration.json";

// Site standards (docs/site-standards.md "Accessibility"): every post carries its narrated audio
// near the top. Rendered from the record scripts/narrate.mjs writes; the article text is the
// transcript. Added 2026-09-24, outside the archived post body, so body parity is unchanged.
interface NarrationItem { src: string; lang: string; voice: string; minutes: number }
const items = (narration as { items: Record<string, NarrationItem> }).items;

const copy = {
  en: { label: (minutes: number) => `Listen to this article (${minutes} min)`, note: (voice: string) => `Computer-generated narration (macOS voice “${voice}”). The article text is the transcript.`, download: "Download the narration (M4A audio)" },
  es: { label: (minutes: number) => `Escuchar este artículo (${minutes} min)`, note: (voice: string) => `Narración generada por computadora (voz de macOS “${voice}”). El texto del artículo es la transcripción.`, download: "Descargar la narración (audio M4A)" },
};

export function NarrationPlayer({ route }: { route: string }) {
  const item = items[route];
  if (!item) return null;
  const text = copy[item.lang === "es" ? "es" : "en"];
  const id = `narration-${route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`;
  return (
    <div className="mj-narration not-prose">
      <p className="mj-narration-label" id={id}>{text.label(item.minutes)}</p>
      <audio controls preload="none" aria-labelledby={id}>
        <source src={item.src} type="audio/mp4" />
        <a href={item.src}>{text.download}</a>
      </audio>
      <p className="mj-narration-note">{text.note(item.voice)}</p>
    </div>
  );
}
