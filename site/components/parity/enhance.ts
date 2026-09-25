// Progressive enhancements only: every page body and destination is static HTML.
const resumeChooser = document.querySelector<HTMLDialogElement>("#resume-chooser");
document.querySelectorAll<HTMLAnchorElement>("[data-resume-open]").forEach(trigger => {
  trigger.addEventListener("click", event => {
    if (!resumeChooser?.showModal) return;
    event.preventDefault();
    document.querySelectorAll<HTMLDetailsElement>(".parity-mobile-menu, .ag-menu").forEach(menu => menu.open = false);
    resumeChooser.showModal();
  });
});
resumeChooser?.querySelector("[data-resume-close]")?.addEventListener("click", () => resumeChooser.close());
resumeChooser?.addEventListener("click", event => {
  if (event.target !== resumeChooser) return;
  const rect = resumeChooser.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) resumeChooser.close();
});

document.querySelectorAll<HTMLElement>("[data-filter-group]").forEach(group => {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>("[data-filter-value]")];
  const cards = [...group.querySelectorAll<HTMLElement>("[data-filter-card]")];
  const choose = (value: string) => {
    cards.forEach(card => {
      card.hidden = value === "Core Portfolio" ? card.dataset.filterCore !== "true"
        : !["all", "All", card.dataset.filterCard].includes(value);
    });
    group.querySelectorAll<HTMLElement>("[data-filter-note]").forEach(note => note.hidden = note.dataset.filterNote !== value);
    buttons.forEach(button => {
      const active = button.dataset.filterValue === value;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("bg-primary", active);
      button.classList.toggle("text-primary-foreground", active);
      button.classList.toggle("bg-muted", !active);
      button.classList.toggle("text-muted-foreground", !active);
    });
    const status = group.querySelector<HTMLElement>("[data-filter-status]");
    if (status) status.textContent = `${cards.filter(card => !card.hidden).length} items shown`;
  };
  const status = document.createElement("p");
  status.className = "sr-only";
  status.dataset.filterStatus = "true";
  status.setAttribute("role", "status");
  group.append(status);
  buttons.forEach(button => button.addEventListener("click", () => choose(button.dataset.filterValue!)));
  choose(group.dataset.filterDefault!);
});

// The diagram source remains in the initial document and survives a render
// failure. Mermaid is loaded only on a page that actually contains diagrams.
async function renderDiagrams() {
  const nodes = [...document.querySelectorAll<HTMLElement>(".study-content .mermaid")];
  if (!nodes.length) return;
  const mermaid = (await import("mermaid")).default;
  mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "strict" });
  for (const [index, node] of nodes.entries()) {
    const source = node.textContent || "";
    const target = document.createElement("div");
    target.className = "parity-diagram";
    target.setAttribute("role", "figure"); // aria-label is not allowed on a plain div (axe aria-prohibited-attr)
    target.setAttribute("aria-label", "Study diagram");
    try {
      const { svg, bindFunctions } = await mermaid.render(`study-diagram-${index}`, source);
      target.innerHTML = svg;
      bindFunctions?.(target);
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Diagram text";
      node.before(target, details);
      details.append(summary, node);
    } catch {
      document.getElementById(`dstudy-diagram-${index}`)?.remove();
      // Keep the original readable source when a historical diagram is invalid.
    }
  }
}
void renderDiagrams().catch(() => { /* Offline/import failures leave the original diagram text visible. */ });

// Contact form: posts to the lane-3 Worker (see baseline/src/pages/contact.tsx).
// Without JavaScript the form is hidden and the mailto path remains.
const contactForm = document.querySelector<HTMLFormElement>("#contact-form");
if (contactForm) {
  const status = contactForm.querySelector<HTMLElement>("[data-contact-status]");
  const submit = contactForm.querySelector<HTMLButtonElement>("button[type=submit]");
  const topic = contactForm.querySelector<HTMLSelectElement>("select[name=topic]");
  const wanted = new URLSearchParams(location.search).get("topic");
  if (topic && wanted && [...topic.options].some(option => option.value === wanted)) topic.value = wanted;
  const email = "mitchelljmillerjr26@gmail.com";
  const say = (text: string, kind: "info" | "ok" | "error") => {
    if (!status) return;
    status.hidden = false;
    status.textContent = text;
    status.dataset.kind = kind;
    status.classList.toggle("text-red-600", kind === "error");
    status.classList.toggle("text-primary", kind !== "error");
  };
  const spanish = document.documentElement.lang === "es";
  const messages: Record<string, string> = spanish ? {
    validation: "Revisa los campos marcados e inténtalo de nuevo.",
    turnstile_failed: "La verificación antispam falló. Inténtalo de nuevo.",
    rate_limited: `Se enviaron demasiados mensajes desde esta conexión en la última hora. Inténtalo más tarde o escribe a ${email}.`,
    origin_not_allowed: `Este formulario solo funciona en mj2.pro. Escribe a ${email}.`,
    network: `No se pudo enviar el mensaje (error de red). Escribe a ${email}.`,
  } : {
    validation: "Please check the highlighted fields and try again.",
    turnstile_failed: "The spam check did not pass. Please try again.",
    rate_limited: `Too many messages from this connection in the last hour. Please try again later or email ${email}.`,
    origin_not_allowed: `This form only works on mj2.pro. Please email ${email}.`,
    network: `The message could not be sent (network error). Please email ${email}.`,
  };
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    contactForm.querySelectorAll<HTMLElement>("[aria-invalid]").forEach(field => field.removeAttribute("aria-invalid"));
    const data = new FormData(contactForm);
    data.set("source_url", location.href);
    if (!data.get("turnstileToken") && !data.get("cf-turnstile-response")) {
      say(spanish ? "Espera un momento a que termine la verificación antispam y vuelve a enviar." : "Please wait a moment for the spam check to finish, then send again.", "error");
      return;
    }
    if (submit) submit.disabled = true;
    say(spanish ? "Enviando…" : "Sending…", "info");
    let out: { ok?: boolean; error?: string; fields?: Record<string, string> } = {};
    try {
      const response = await fetch(contactForm.action, { method: "POST", body: data });
      out = await response.json().catch(() => ({ ok: false, error: `http_${response.status}` }));
      if (typeof out.ok !== "boolean") out = { ok: false, error: `http_${response.status}` };
    } catch {
      out = { ok: false, error: "network" };
    }
    if (submit) submit.disabled = false;
    const turnstile = (window as { turnstile?: { reset?: () => void } }).turnstile;
    if (out.ok) {
      contactForm.reset();
      turnstile?.reset?.();
      say(spanish ? `Gracias: recibí tu mensaje. Respondo desde ${email}.` : `Thanks — your message was received. I reply from ${email}.`, "ok");
      return;
    }
    if (out.error === "validation" && out.fields) {
      for (const name of Object.keys(out.fields)) contactForm.querySelector<HTMLElement>(`[name="${name}"]`)?.setAttribute("aria-invalid", "true");
    }
    if (out.error === "turnstile_failed") turnstile?.reset?.();
    say(messages[out.error || ""] || (spanish ? `No se pudo enviar el mensaje (${out.error || "error desconocido"}). Escribe a ${email}.` : `The message could not be sent (${out.error || "unknown error"}). Please email ${email}.`), "error");
  });
}

// Living infographics embedded in posts (iframes under /viz/) post {type: "viz-intent", intent}
// when a reader asks to jump to that intent's section. Only same-origin messages from one of
// this page's own /viz/ frames are honored; the frame's own target=_top link remains the fallback.
const vizFrames = [...document.querySelectorAll<HTMLIFrameElement>('iframe[src^="/viz/"]')];
if (vizFrames.length) {
  window.addEventListener("message", event => {
    if (event.origin !== window.location.origin) return;
    if (!vizFrames.some(frame => frame.contentWindow === event.source)) return;
    const data = event.data as { type?: unknown; intent?: unknown } | null;
    if (!data || data.type !== "viz-intent" || typeof data.intent !== "string" || !/^[a-z-]{1,40}$/.test(data.intent)) return;
    const target = document.getElementById(`intent-${data.intent}`);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#intent-${data.intent}`);
  });
  // Fit each frame to its content (the static height="1200" is the no-script fallback) and follow
  // later changes such as an opened panel or a narrower column. The observer is created in the
  // frame's own realm; the content never depends on the frame height, so this cannot loop.
  const fitted = new WeakSet<HTMLElement>();
  const fitFrame = (frame: HTMLIFrameElement) => {
    const view = frame.contentWindow as (Window & typeof globalThis) | null;
    const body = frame.contentDocument?.body;
    if (!view || !body || fitted.has(body)) return;
    fitted.add(body);
    const size = () => {
      const height = Math.ceil(body.getBoundingClientRect().height);
      if (height > 200) frame.style.height = `${height + 2}px`; // + the 1px top and bottom border
    };
    size();
    new view.ResizeObserver(size).observe(body);
  };
  vizFrames.forEach(frame => {
    frame.addEventListener("load", () => fitFrame(frame));
    const doc = frame.contentDocument;
    if (doc?.readyState === "complete" && doc.URL !== "about:blank") fitFrame(frame);
  });
}

// Themes (docs/site-standards.md): the inline head script applied the stored choice or the system
// theme before first paint. The header button (aria-pressed = dark theme on) overrides it and
// remembers the choice; without a stored choice the page follows system changes live.
const root = document.documentElement;
const themeButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")];
const storedTheme = () => {
  try { const value = localStorage.getItem("mj2-theme"); return value === "light" || value === "dark" ? value : null; } catch { return null; }
};
const applyTheme = (theme: "light" | "dark") => {
  root.setAttribute("data-theme", theme);
  themeButtons.forEach(button => button.setAttribute("aria-pressed", String(theme === "dark")));
};
applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
themeButtons.forEach(button => button.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("mj2-theme", next); } catch { /* Storage blocked: the choice lasts for this page view. */ }
}));
window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", event => {
  if (!storedTheme()) applyTheme(event.matches ? "dark" : "light");
});

// Languages (docs/site-standards.md): the picker is a native <details>; it also closes on Escape
// or an outside click. A language chosen in the picker or the banner is remembered
// ("mj2-lang"). The banner is shown only when the visitor's preferred languages rank this
// page's translation above the page's own language, or they chose that language before, and
// never after a dismissal. Nothing here ever changes location: suggest, never redirect.
const storedLang = () => { try { return localStorage.getItem("mj2-lang"); } catch { return null; } };
const rememberLang = (code: string) => { try { localStorage.setItem("mj2-lang", code); } catch { /* storage blocked */ } };
document.querySelectorAll<HTMLAnchorElement>("[data-lang-choice]").forEach(link => link.addEventListener("click", () => rememberLang(link.dataset.langChoice!)));
const picker = document.querySelector<HTMLDetailsElement>("[data-lang-picker]");
if (picker) {
  document.addEventListener("keydown", event => { if (event.key === "Escape" && picker.open) { picker.open = false; picker.querySelector("summary")?.focus(); } });
  document.addEventListener("click", event => { if (picker.open && !picker.contains(event.target as Node)) picker.open = false; });
}
const langBanner = document.querySelector<HTMLElement>("[data-lang-banner]");
if (langBanner) {
  const suggested = langBanner.dataset.suggestLang!;
  const current = root.lang;
  const preferred = (navigator.languages?.length ? navigator.languages : [navigator.language || ""]).map(code => code.toLowerCase().split("-")[0]);
  const firstKnown = preferred.find(code => code === current || code === suggested);
  const chosen = storedLang();
  if (chosen ? chosen === suggested : firstKnown === suggested) langBanner.hidden = false;
  langBanner.querySelector("[data-lang-dismiss]")?.addEventListener("click", () => { langBanner.hidden = true; rememberLang(current); });
}
