# Interactive lab — September 10, 2026

Implemented by the interactive-lab agent in the isolated portfolio overhaul checkout. Root owns route integration, whole-site browser review, GitHub save and deployment decisions.

## Deliverables

- `/lab/`: three working, keyboard-accessible React experiments in a shared editorial workbench.
- `/lab/#intent`: destination-intent explorer with four queries and three origin contexts.
- `/lab/#evidence` (alias `#growth`): SFC search readout plus an explicitly labeled editable comparison mode.
- `/lab/#architecture`: six selectable architecture layers, three case-study presets and live shared-field propagation with a local override.
- `/artifacts/destination-intent-explorer.html`: standalone offline HTML version of the intent explorer. Includes all 12 scenarios, reset, and downloadable scenario brief. It uses inline styles and JavaScript, no remote fonts, scripts, APIs or account requirements.
- The lab provides both open and download links to the standalone HTML. Tab buttons synchronize the selected experiment to its shareable URL hash.

## Evidence and framing

The destination model leads with the intent explicitly conveyed by a query. A Waikīkī-qualified activity/service search expresses interest in Waikīkī even if the searcher is in Connecticut or their location is unknown. The model treats `near me` separately and addresses both organic discovery and Maps/local evaluation. It does not invent a share of searchers traveling, exact keyword demand or a live SERP. It links Google's primary local-ranking guide.

The recorded SFC snapshot was supplied from the reviewed September 10 report: July 15–August 11, 2026 vs. August 12–September 8, 2026, both 28 days. Clicks 5 → 54 (+49; +980%), impressions 470 → 1,652 (+1,182; +251.5% displayed at one decimal). The prior client deck rounded impressions growth to +251%; this tool retains a consistent one-decimal display. Bars start at zero and show only the two known periods, with no invented daily series. Sandbox inputs have an explicit illustrative label. Zero baselines show an undefined percentage rather than Infinity. Interpretation distinguishes observed activity from causal attribution and downstream booking outcomes.

Architecture is a demonstrator of methods already represented in the existing portfolio: Dignity Health's location system, Conditions & Treatments/AEM content fragments, and the ClarityPulse reporting prototype. Sample outputs are illustrative. No production CMS access or invented time-savings claim is implied. The first two cases are established work; ClarityPulse remains labeled a prototype.

No private dashboard screenshots, client emails, recipient addresses, private report links, client account data or client source files were added. No external network request is made by an experiment. The website's existing approved presentation of the work and the task's supplied SFC snapshot are the evidence boundaries.

## Files owned by this work

- `src/pages/lab.tsx`
- `src/components/lab/models.ts`
- `src/components/lab/destination-intent.tsx`
- `src/components/lab/growth-readout.tsx`
- `src/components/lab/content-architecture.tsx`
- `src/components/lab/lab.css`
- `public/artifacts/destination-intent-explorer.html`
- This record.

## Verification

`npm run typecheck` passed after root's concurrent contact edit completed.

A focused Node verification checked all 12 query/origin combinations, explicit destination invariance across origins, proximity behavior, the SFC calculations, zero/equal/decreasing counts, populated layers in all three architecture presets, and standalone parity with the React data model across all 12 cases. The standalone reset and brief download were executed against a minimal DOM harness, including download filename, Blob type and object-URL cleanup. The standalone has no external script or stylesheet dependencies.

Final browser verification belongs to root, including desktop/mobile presentation, deep-link activation, controls, shared-field propagation, native downloads and interactions with the integrated site layout. The agent did not open browser tabs, start a server, deploy or commit changes.

Exact next step: integrate and review the lab with the root site's visual/functional QA, then include these files in the feature-branch save.
