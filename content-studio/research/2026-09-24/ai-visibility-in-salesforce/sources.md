# Sources — ai-visibility-in-salesforce (working slug)

## Supplied by Mitch (2026-09-24), not yet read
- https://achieva.ai/blogs/salesforce-lightning-migration-benefits-and-best-practices/ — vendor blog, Classic → Lightning migration
- https://www.minusculetechnologies.com/blogs/salesforce-classic-to-lightning-migration-guide — vendor blog, Classic → Lightning migration

Likely use: Lightning Experience as the prerequisite for LWC components on record pages. Cite the Salesforce primary doc for that point; these two are background.

## First-pass flags from source.md (unverified; verdicts go in claims.md)
Highest risk, verify before any use:
- "AIforce", "Headless Toolkit", "Agentforce Coworker", "Buildox": product names with no primary source yet.
- "Vercel & Lovable highlighted by Salesforce as key ecosystem partners": partnership claim.
- "Artificial Engine Optimization": AEO is Answer Engine Optimization; wrong expansion.
- "Our prospect frequently researches … on ChatGPT": per-prospect AI prompt visibility; check whether any AEO tool offers this.
- "competitor is cited 40% more", "400M+ real user prompts", "days, not weeks": numbers with no source.
- "pull API webhooks from Profound or Semrush": webhooks push, they aren't pulled; check what each API actually exposes.
- Profound MCP server, TypeScript and Python SDKs; Semrush AI Visibility Score; AirOps free tier: check vendor docs.
- "Cursor … most popular", "without hallucinating field names": superlative and overclaim.
Lower risk, standard Salesforce capabilities to confirm in developer docs: Apex callouts, External Services (OpenAPI), Salesforce Connect (OData), Platform Events, CDC, Pub/Sub API (gRPC), Named Credentials, Bulk API 2.0, OAuth 2.0 JWT bearer and web server flows, CTI screen pops (Open CTI / Service Cloud Voice), Einstein Conversation Insights.
