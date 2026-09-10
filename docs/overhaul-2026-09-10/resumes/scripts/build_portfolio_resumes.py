#!/usr/bin/env python3
"""Build four portfolio resumes with the unchanged approved ReportLab renderer."""
import csv, hashlib, importlib.util, json, os, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[2]
font_cache = Path(tempfile.gettempdir()) / 'portfolio-resume-font-cache'
font_cache.mkdir(exist_ok=True)
font_config = font_cache / 'fonts.conf'
font_config.write_text(f'<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>/System/Library/Fonts</dir><dir>/Library/Fonts</dir><cachedir>{font_cache}</cachedir></fontconfig>')
os.environ['FONTCONFIG_FILE'] = str(font_config)
spec = importlib.util.spec_from_file_location('exact_resume', ROOT/'scripts/build_exact_resume.py')
renderer = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = renderer
spec.loader.exec_module(renderer)

roles = [
 dict(heading='SFC Surf School - Growth Operations Engineer (Consulting / Implementation)', impact='Organic clicks: 5 to 54 (+980%); impressions: 470 to 1,652 (+251%)', meta='May 2026 - Present', bullets=[
  'Own website, local search, content, booking paths and growth operations for a surf school; translate business priorities into shipped improvements and repeatable workflows.',
  'Built an interactive South Shore surf guide and 10 supporting break articles, with location-specific media, internal links and a 63-page public sitemap.',
  'Verified Aug 12-Sep 8 search gains against the prior 28 days; produced executive reporting and a 30-post Google Business Profile campaign.']),
 dict(heading='Clarity AI - Senior AI Search Strategist / AI Systems Consultant', impact='', meta='Nov 2023 - Feb 2026', bullets=[
  'Championed Profound adoption and built AEO/GEO workflows for prompt clusters, citation visibility, recommendation rate and competitive gaps across AI answer engines.',
  'Built and shipped Clarity Pulse, an internal reporting workflow connecting GA4, GSC and Profound data for faster search, content and AI-visibility insights.',
  'Led client audits, onboarding, team training and roadmap handoffs; translated technical findings into practical recommendations for account teams.']),
 dict(heading='Stanford Health Care - Independent SEO/SEM & AI Search Consultant', impact='SEO/SEM and patient-acquisition recommendations across 40+ clinical service lines', meta='Mar 2024 - Dec 2025', bullets=[
  'Aligned keywords, landing pages, semantic schema, internal links and content with patient-acquisition goals across complex healthcare topics.',
  'Analyzed paid/organic overlap, local intent and landing-page performance; turned findings into action plans for clinical, marketing and analytics stakeholders.']),
 dict(heading='Apple - Program Manager, SEO - Americas Region (AMR)', impact='Search architecture spanning 38+ country sites and 138 hreflang locale variants', meta='Aug 2022 - Jan 2024', bullets=[
  'Owned Americas SEO strategy and campaign discoverability for apple.com/store; aligned requirements across product, marketing, design, localization and engineering.',
  'Diagnosed JavaScript rendering and indexation gaps; built business cases, secured roadmap priority and partnered on remediation and release QA.']),
 dict(heading='CommonSpirit Health - SEO & Web Analytics Product Manager', impact='$15.21M attributable FY22 revenue; 88K appointments; 175K calls/directions', meta='Sep 2018 - Aug 2022', bullets=[
  'Owned organic-search KPIs across 1,000+ locations and 20+ markets, connecting search performance to appointments, revenue and executive reporting.',
  'Defined requirements for 1,000+ Yext entity pages, parent/child architecture and dynamic CMS templates; improved local data and structured-data governance.',
  'Led 20+ enterprise migrations with technical QA, vendor coordination, attribution modeling, recovery plans and performance monitoring.']),
 dict(heading='Wpromote (DemandWave) - SEO Campaign Manager', impact='', meta='Apr 2015 - Aug 2018', bullets=[
  'Directed enterprise and mid-market SEO programs; translated technical and competitive audits into content, authority, internal-linking and CRO workstreams.',
  'Built keyword research, content briefs, reporting narratives and prioritized roadmaps; trained teams in technical analysis and repeatable delivery.']),
]
projects = [
 dict(heading='Domain Signal - Founder, Solo Build',meta='2024 - Present',body='Built a market-intelligence concept combining domain-registration signals, public data, scoring logic and AI-assisted analysis.'),
 dict(heading='Clear Kayak Adventures - Founder & Operator',meta='2024 - Present',body='Built the website, OTA listings, merchant processing, CRM, operating procedures and acquisition systems for an Oahu service business.'),
 dict(heading='Vet Advocates - Growth Systems Advisor (Pro Bono)',meta='2024 - Present',body='Built repeatable nonprofit acquisition workflows across Meta, Instagram and TikTok, with campaign operations and performance reporting.'),
]
common_sidebar = [
 dict(title='Enterprise Search',lines=['Technical SEO','Site architecture','Crawl and indexation','Multi-market delivery']),
 dict(title='AI Search / AEO',lines=['Profound','Citation measurement','Prompt-set research','Structured data']),
 dict(title='Measurement',lines=['GA4 - GSC - GTM','Adobe Analytics','Attribution modeling','Executive reporting']),
 dict(title='Build & Automate',lines=['Python - SQL','OpenAI - Claude','Cursor - Codex','Agent workflows']),
 dict(title='Local Discovery',lines=['Google Business Profile','Yext / entity systems','Location-intent content','Booking-path QA']),
 dict(title='Toolbox',lines=['Semrush - Ahrefs','Screaming Frog','Jira - Asana','CMS implementation']),
]
sidebar2 = [
 dict(title='Business Outcomes',lines=['Revenue-linked search','Conversion engineering','Multi-location growth','Operational handoffs']),
 dict(title='Collaboration',lines=['Product and engineering','Marketing and analytics','Executive stakeholders','Client enablement']),
 dict(title='Independent Builds',lines=['Domain Signal','Clear Kayak Adventures','Vet Advocates']),
 dict(title='Education',lines=['Michigan State University','BA, Business Administration','Eli Broad College']),
 dict(title='Portfolio',lines=['mitchjmiller.com','Case studies and','interactive work samples']),
]
variants = [
 dict(id='search_direction', slug='Mitchell-Miller-Search-Systems-Background-2026', title='Search Leadership - Enterprise SEO - AEO / GEO', summary='Search leader with 10+ years connecting technical SEO, content, analytics and cross-functional execution to business outcomes. Experience spans Apple, CommonSpirit Health, Stanford Health Care and Clarity AI. Now applying that enterprise discipline to hands-on growth operations at SFC Surf School, with shipped web experiences, local discovery and measured search gains.', focus=dict(title='Search Leadership',lines=['Strategy and prioritization','Engineering roadmaps','Revenue-linked KPIs','Team enablement'])),
 dict(id='ai_search_engineering', slug='Mitchell-Miller-AI-Search-Systems-Background-2026', title='AI Search Systems - AEO / GEO - Technical SEO', summary='Hands-on search and AI systems practitioner with 10+ years across enterprise SEO, structured data and measurement. Built AI-visibility workflows and internal reporting at Clarity AI, with Apple-scale technical delivery behind it. Current SFC work combines agent-assisted research, interactive web experiences, analytics QA and repeatable local-service growth operations.', focus=dict(title='AI Search Systems',lines=['AEO / GEO measurement','Prompt clusters','Citation visibility','Reporting workflows'])),
 dict(id='growth_product_systems', slug='Mitchell-Miller-Product-Systems-Background-2026', title='Growth & Product Systems - Search - Analytics - Delivery', summary='Growth and web product practitioner who turns business goals into requirements, shipped systems and measurable outcomes. Brings product-management experience at Apple and CommonSpirit Health, AI reporting workflows at Clarity AI, and current growth operations for SFC Surf School. Combines roadmap prioritization, technical implementation, conversion paths and stakeholder-ready reporting.', focus=dict(title='Product & Delivery',lines=['Roadmap prioritization','Requirements and QA','Stakeholder alignment','Workflow design'])),
 dict(id='organic_systems_architecture', slug='Mitchell-Miller-Organic-Systems-Background-2026', title='Organic Growth Systems - Entity Architecture - Local Search', summary='Organic growth systems leader with 10+ years building technical SEO, entity architecture and measurable acquisition programs. Managed search across a 1,000+ location healthcare network and Apple-scale web properties. Current SFC Surf School work brings those systems into local discovery through useful content, an interactive surf guide, booking paths and repeatable reporting.', focus=dict(title='Organic Architecture',lines=['Entity and local search','Programmatic templates','Content ecosystems','Migration governance'])),
]
rows=[]
for v in variants:
 current=json.loads(json.dumps(roles))
 if v['id']=='ai_search_engineering':current[1]['bullets']=[current[1]['bullets'][1],current[1]['bullets'][0],current[1]['bullets'][2]]
 if v['id']=='growth_product_systems':current[4]['bullets']=[current[4]['bullets'][1],current[4]['bullets'][0],current[4]['bullets'][2]]
 row=dict(job_id='portfolio_'+v['id']+'_20260910',company='',role_title=v['title'],job_url='https://mitchjmiller.com/resume',output_slug=v['slug'],title_line=v['title'],contact_line='(626) 316-8682 - mitchelljmillerjr26@gmail.com - mitchjmiller.com',summary=v['summary'],sidebar_page1_json=json.dumps([v['focus']]+common_sidebar),sidebar_page2_json=json.dumps(sidebar2),roles_page1_json=json.dumps(current[:3]),roles_page2_json=json.dumps(current[3:]),projects_json=json.dumps(projects),keyword_notes='Portfolio variant; evidence and chronological corrections in README.md. Original latest source row: pyramid_marketing_manager_ii_local_seo_syndication_geo_2026. SFC metrics: Aug 12-Sep 8 vs Jul 15-Aug 11, 2026; guide shipped Sep 10 is not credited with the prior-period gains.',qa_status='rendered_pending_visual_qa')
 rows.append(row)
 doc=renderer.ResumeDoc.from_row(row)
 problems=renderer.validate_doc(doc)
 if problems:raise ValueError(problems)
 target=REPO/'public/files'/f"{v['slug']}.pdf"
 renderer.build_pdf(doc,target)
 problems=renderer.validate_resume_pdf_content(target,doc)
 if problems:raise ValueError(problems)
 renderer.render_pngs(target,ROOT/'validation/rendered')
 print(target)
with (ROOT/'portfolio_resume_rows.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=renderer.FIELDNAMES);w.writeheader();w.writerows(rows)
renderer.render_source_pngs(ROOT/'validation/source-rendered')
