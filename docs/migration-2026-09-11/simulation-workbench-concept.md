# Build your own simulated population

Mitch's proposed flagship for the data-science lab · September 11, 2026

## Product intent

A guided interactive workbench helps someone turn a question into an inspectable population model and scenario experiment. It demonstrates the combination of data science, creativity, UX, engineering and practical business judgment that Mitch wants his portfolio to express. This is a concept captured during migration planning, not an implemented or validated prediction product.

## Proposed journey

1. **Define the decision.** Choose a purpose, such as exploring a product launch, policy change, service offering or customer-segment hypothesis. Define the outcome and comparison before choosing a model.
2. **Find suitable data.** Recommend relevant publicly available sources with descriptions, coverage, dates, licensing, download links and examples of useful questions. A later private workflow can accept authorized CRM/customer data.
3. **Prepare the inputs.** Offer guided column mapping, data-quality checks, and reproducible SQL or other preparation steps where useful. Keep technical tools optional for users who want the guided interface. Record sampling, missingness and source transformations.
4. **Construct a population.** Choose the population and important attributes, inspect distributions and relationships, and see where assumptions substitute for missing evidence. The interface should help users recognize whose behavior their data represents.
5. **Compare scenarios.** Change a proposed intervention and view differences against a baseline, with sensitivity to assumptions and understandable uncertainty. Synthetic responses are model outputs; validation against observed data or real experiments is a separate step.
6. **Retain the experiment.** Export a dated interactive report with its inputs, sources, assumptions, model/version, scenario settings and reproducible results. This can later connect naturally to the private client deliverable library.

## Smallest useful first version

Choose one bounded question and one well-documented public dataset, define a simple defensible population model, and build a transparent baseline/scenario comparison. Use the existing UBI calculator as a candidate reference after locating and reviewing its actual source. Avoid building a universal importer, autonomous research agent or generic predictive persona engine before that first demonstration works.

Public source data does not automatically establish causal behavior, and simulated personas should not be presented as surveyed people. A useful tool makes its assumptions inspectable, tests sensitivity, and describes what evidence would improve its answer. The goal is informed exploration and experiment design, with predictive claims earned through validation.

## Later capabilities to evaluate

- Purpose-based discovery of datasets and documented preparation recipes.
- Authorized CRM imports in a protected environment, with data minimization and explicit handling/retention rules.
- More sophisticated population construction, model calibration and comparison with held-out observations.
- Saved experiments and shareable interactive packages; collaboration only if needed.
- Links from relevant case studies explaining real applications, inputs, decisions and limitations.

The portfolio can present this as a concept or work in progress until a functioning example exists. Do not imply CRM integrations, customer adoption, model accuracy or commercial results that have not been established. The retailer example in discussion was hypothetical.

## Relationship to the migration

The initial site release provides the statically rendered lab/project pages and a reusable home for interactive demonstrations. Building this new simulation product is a separate discovery and implementation workstream; it does not block complete HTML, crawlability, corrected SEO, current resumes or inbound positioning.

Next step for this concept: locate the UBI work, gather existing relevant project records, and choose one population/question/data combination for a bounded prototype. No dataset was imported, client data requested or simulation run during roadmap preparation.
