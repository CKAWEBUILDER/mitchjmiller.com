// Progressive enhancements only: every page body and destination is static HTML.
const resumeChooser = document.querySelector<HTMLDialogElement>("#resume-chooser");
document.querySelectorAll<HTMLAnchorElement>("[data-resume-open]").forEach(trigger => {
  trigger.addEventListener("click", event => {
    if (!resumeChooser?.showModal) return;
    event.preventDefault();
    document.querySelectorAll<HTMLDetailsElement>(".parity-mobile-menu").forEach(menu => menu.open = false);
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
