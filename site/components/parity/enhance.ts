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
  const messages: Record<string, string> = {
    validation: "Please check the highlighted fields and try again.",
    turnstile_failed: "The spam check did not pass. Please try again.",
    rate_limited: `Too many messages from this connection in the last hour. Please try again later or email ${email}.`,
    origin_not_allowed: `This form only works on mitchjmiller.com. Please email ${email}.`,
    network: `The message could not be sent (network error). Please email ${email}.`,
  };
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    contactForm.querySelectorAll<HTMLElement>("[aria-invalid]").forEach(field => field.removeAttribute("aria-invalid"));
    const data = new FormData(contactForm);
    data.set("source_url", location.href);
    if (!data.get("turnstileToken") && !data.get("cf-turnstile-response")) {
      say("Please wait a moment for the spam check to finish, then send again.", "error");
      return;
    }
    if (submit) submit.disabled = true;
    say("Sending…", "info");
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
      say(`Thanks — your message was received. I reply from ${email}.`, "ok");
      return;
    }
    if (out.error === "validation" && out.fields) {
      for (const name of Object.keys(out.fields)) contactForm.querySelector<HTMLElement>(`[name="${name}"]`)?.setAttribute("aria-invalid", "true");
    }
    if (out.error === "turnstile_failed") turnstile?.reset?.();
    say(messages[out.error || ""] || `The message could not be sent (${out.error || "unknown error"}). Please email ${email}.`, "error");
  });
}
