kw: census microdata tool
kw_secondary: ACS PUMS California, synthetic persona generator, UBI policy simulator, weighted survey data tool
kw_note: Editorial pick, NOT Semrush-verified — the Semrush MCP returned "insufficient API units" this session (2026-09-12). Re-run keyword_research/get_report_schema/execute_report before publish per CLAUDE.md house rule #3.
insight: Most "population simulation" tools blur observed data, modeled projections, and typed-in guesses into one confident-looking number. This one refuses to — every output carries a provenance label (observed/calculated/simulated/assumed/estimate), which is the actual discipline synthetic population data requires and the thing most tools in this category skip.
cta: Share this with anyone who filters audience or population data for a living and has been burned by a tool that wouldn't say where its numbers came from.
title: Build Your Own Simulated Population: How to Read Its Numbers Honestly
meta_description: A free tool that filters real 2019 Census microdata for California and labels every output observed, calculated, simulated, or assumed — no forecasts.
slug: population-workbench
suggested_url: https://mitchjmiller.com/blog/population-workbench/

---

# Build Your Own Simulated Population: How to Read Its Numbers Honestly

*By Mitchell Miller · ~5 min read · free tools / AEO / applied data*

I shipped a new lab tool tonight: [**Build your own simulated population**](https://mitchjmiller.com/lab/population-workbench/). It runs in your browser against a real Census microdata sample — no login, no upload, free.

## What it does

The workbench loads 12,000 person records from the U.S. Census Bureau's 2019 American Community Survey (1-Year PUMS), California — public-domain, disclosure-protected microdata, weighted so the sample reproduces the state's actual population of roughly 39.5 million people. Each record carries six attributes: age, personal income, sex, race, education, and employment status.

From there, five steps: define a question, filter the population, compare two scenarios, generate synthetic personas, and export. Filtering is instant and weighted — checking "employed" or setting an income range recomputes every count, share, and distribution live. The two scenarios are a **UBI policy model** (a real simulator, carried over unchanged, that computes program cost, tax revenue, and net gainers/payers for a universal-basic-income design) and a **reach-and-adoption estimator** (five plain multiplications turning your own assumptions about eligibility, awareness, and adoption into a rough revenue or cost figure). Personas are labeled synthetic composites drawn from the filtered records — attributes only, no names, photos, or invented quotes.

## How to read its outputs honestly

This is the part most population-simulation tools skip, and it's the actual point of this one. Every number on the page is labeled by where it came from:

| Label | What it means | Example on this page |
|---|---|---|
| **Observed** | Read directly off a Census record | An individual's age, income band, education |
| **Calculated** | Weighted arithmetic on observed records — no model | Weighted population count, median income, category shares |
| **Simulated** | Output of the UBI model applied record-by-record | Program cost, tax revenue, net gainers/payers |
| **Assumed** | A number you typed in | Eligible share, awareness rate, adoption rate |
| **Estimate** | Arithmetic on assumed numbers | Adopters, estimated revenue — explicitly *not* a forecast |

Treat that ladder as a trust gradient. Observed and calculated figures are as reliable as the underlying Census sample. Simulated figures depend on the UBI model's assumptions, which are disclosed, not hidden. Assumed and estimate figures are exactly as good as the numbers you typed — the tool runs zero validation against reality, and says so on every screen.

## A worked example

Say the question is: *what does the employed, mid-career, mid-income woman in California actually look like?* Filter to women, employed, ages 25–44, income $50K–$100K. That's **calculated**: 1,205,123 people — about 3% of the state — with a weighted mean income of $69,335, pulled from 366 underlying records.

Now run Scenario A statewide at its default settings ($1,000/month to adults 18+, a 30% flat tax). That's **simulated**: program cost $367.7B, tax revenue $460.6B, 18.34 million net gainers, 12.55 million net payers, and an illustrative poverty-proxy shift from 45.8% to 32.9%. That default run is statewide, not restricted to the filtered group above — Scenario A runs on whatever selection is currently active.

Now switch to Scenario B and type in assumptions: 50% of a filtered group of 1,000,000 people is eligible, 20% of those become aware, 5% of the aware adopt, and each adopter is worth $120. That chain is **assumed → estimate**: 500,000 eligible, 100,000 aware, 5,000 adopters, $600,000 in estimated value — labeled, on the page and in the export, "assumption-driven estimate, not a forecast." Change any input and the number moves; nothing here was validated against a real program.

## Limitations

This is a v1, and it's honest about what it isn't. It covers **California only**, on the **2019** ACS one-year file — not multi-year, not other states. It runs on a **12,000-record sample**, not the full 380,091-record release; the sampling script itself wasn't re-verifiable on this machine, so the methodology page instead publishes a sample-versus-full-file benchmark table — the largest gap against published Census totals is 0.6 percentage points. There's **no geography below the state level** — no county, no metro, no PUMA. The poverty figure is a personal-income proxy, not the official household-based measure. And the reach-and-adoption scenario has **no behavioral model, no calibration, and no uncertainty range** — it is not a substitute for real program piloting.

## The paid path

Free, forever, on this public dataset — that's the point of building it on Census data first. If you want the same filtering, weighting, and honest labeling run against **your own customer or CRM data**, calibrated and validated rather than assumption-driven, that's a paid engagement. [Start a conversation](https://mitchjmiller.com/contact/?topic=population-simulation).

## FAQ

**Is the data in the population workbench real, or simulated?**
The underlying population records are real: public-domain Census microdata (2019 ACS PUMS, California). Only the UBI and reach/adoption outputs are simulated or assumption-driven — and each is labeled as such.

**Can I run the population workbench on my own company's data?**
Not directly in the free tool — it ships with the public Census sample only. Calibrating the same filtering and scenario methodology on your own customer or CRM data is a paid engagement. [Start here](https://mitchjmiller.com/contact/?topic=population-simulation).

**Does the workbench predict the future?**
No. It has no forecasting model. "Simulated" outputs apply a disclosed policy model to real records; "estimate" outputs are arithmetic on numbers you typed. Every output is labeled to say which one it is, on-screen and in every export.

<!--CTA-->
Share this with anyone who filters audience or population data for a living and has been burned by a tool that wouldn't say where its numbers came from.

## Sources

- [Population workbench — the tool](https://mitchjmiller.com/lab/population-workbench/)
- [Population workbench — methodology and limitations](https://mitchjmiller.com/lab/population-workbench/methodology/)
- U.S. Census Bureau, 2019 American Community Survey, 1-Year PUMS, California (public domain)

---

### FAQ structured data (paste into the page `<head>` or a schema slot when this ships)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the data in the population workbench real, or simulated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The underlying population records are real: public-domain Census microdata (2019 ACS PUMS, California). Only the UBI and reach/adoption outputs are simulated or assumption-driven, and each is labeled as such on every screen and export."
      }
    },
    {
      "@type": "Question",
      "name": "Can I run the population workbench on my own company's data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not directly in the free tool, which ships with the public Census sample only. Calibrating the same filtering and scenario methodology on your own customer or CRM data is a paid engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Does the population workbench predict the future?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It has no forecasting model. Simulated outputs apply a disclosed policy model to real Census records; estimate outputs are arithmetic on user-typed assumptions. Every output is labeled to show which one it is."
      }
    }
  ]
}
</script>
```

---

**Draft notes (not part of the published post):**
- Body word count (title/FAQ-schema/front-matter excluded): ~875 words — within the 700–1,000 target.
- Meta description: 150 characters — under the 155 limit.
- No hero infographic built yet — per `AGENTS.md` quality gate ("every post ships with a shareworthy data-viz"), the label-taxonomy table above is the natural candidate for the hero SVG once this is queued for publish. A second visual candidate: the sample-vs-full-file benchmark table already computed on the live methodology page.
- All figures ($367.7B, $460.6B, 18.34M, 12.55M, 45.8%→32.9%, 1,205,123 / 366 records / $69,335, the 50/20/5/$120 reach chain, the 0.6-point benchmark gap) are pulled verbatim from `docs/lab/population-workbench.md` verification evidence and the live methodology page — not recomputed or estimated by this draft.
- Publish mechanics per `PIPELINE-2026-09.md`: this post becomes a `blogPosts` entry in `src/lib/data.ts` with `contentHtml`; route would be `/blog/population-workbench/`. Not done here — drafting only, nothing written outside `content-studio/drafts/`.
