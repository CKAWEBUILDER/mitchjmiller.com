#!/usr/bin/env python3
"""
Render Mitch's tailored resumes in the exact visual system of the approved
SEO Director PDF.

Source-of-truth formatting reference:
/Users/mitchellmiler/Documents/AA - Personal Admin/AA - Employment Docments/AA - Resumes 2026/CVSEODirectorMitchellMiller2026 (1).pdf

The layout is intentionally locked. Tailoring happens through one CSV row per
job/resume variant; fields hold JSON for sidebar sections, roles, and projects.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "resume-template"
DEFAULT_HEADSHOT = ASSET_DIR / "headshot_circle.png"
DEFAULT_OUT_DIR = ROOT / "output" / "tailored-resumes"

SOURCE_PDF = Path(
    "/Users/mitchellmiler/Documents/AA - Personal Admin/AA - Employment Docments/"
    "AA - Resumes 2026/CVSEODirectorMitchellMiller2026 (1).pdf"
)

PAGE_W, PAGE_H = letter

# Measured from the approved PDF.
RAIL_W = 165.6
MAIN_X = 187.2
MAIN_W = 396.0
HILITE_X = MAIN_X
HILITE_W = MAIN_W
SIDEBAR_X = 28.8
SIDEBAR_W = 111.0
PAGE1_TOP = 768.0
PAGE2_TOP = 770.0
BOTTOM_LIMIT = 24.0

NAVY = colors.HexColor("#1A2B47")
GOLD = colors.HexColor("#7A5A00")
RAIL = colors.HexColor("#F4F1E8")
HILITE = colors.HexColor("#E8F1FB")
TEXT = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#666666")
BLUE = colors.HexColor("#2E6FB5")
WHITE = colors.white

FONT_REG = "Carlito"
FONT_BOLD = "Carlito-Bold"
FONT_ITALIC = "Carlito-Italic"
FALLBACK = "Helvetica"
FALLBACK_BOLD = "Helvetica-Bold"
FALLBACK_ITALIC = "Helvetica-Oblique"

STALE_CONTENT_TERMS = [
    "Clarity Digital",
    "PropectaFit",
]

TRUE_PRIOR_EMPLOYERS = {
    "SFC Surf School",
    "Clarity AI",
    "Stanford Health Care",
    "Apple",
    "CommonSpirit",
    "CommonSpirit Health",
    "Wpromote",
    "DemandWave",
}

CURRENT_MOST_RECENT_EMPLOYER = "SFC Surf School"
APPROVED_INDEPENDENT_PROJECTS = {
    "Domain Signal",
    "Clear Kayak Adventures",
    "Vet Advocates",
}

PLACEHOLDER_MARKERS = [
    "{{",
    "}}",
    "[[",
    "]]",
    "TBD",
    "TODO",
    "PLACEHOLDER",
]


def register_fonts() -> None:
    font_root = Path(
        "/Users/mitchellmiler/.cache/codex-runtimes/codex-primary-runtime/"
        "dependencies/native/libreoffice-headless/libreoffice/"
        "LibreOfficeDev.app/Contents/Resources/fonts/truetype"
    )
    fonts = {
        FONT_REG: font_root / "Carlito-Regular.ttf",
        FONT_BOLD: font_root / "Carlito-Bold.ttf",
        FONT_ITALIC: font_root / "Carlito-Italic.ttf",
    }
    for name, path in fonts.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))


def font(name: str) -> str:
    if name in pdfmetrics.getRegisteredFontNames():
        return name
    if name == FONT_BOLD:
        return FALLBACK_BOLD
    if name == FONT_ITALIC:
        return FALLBACK_ITALIC
    return FALLBACK


def sw(text: str, font_name: str, size: float) -> float:
    return pdfmetrics.stringWidth(text, font(font_name), size)


def wrap(text: str, font_name: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        test = word if not line else f"{line} {word}"
        if sw(test, font_name, size) <= width:
            line = test
            continue
        if line:
            lines.append(line)
        line = word
    if line:
        lines.append(line)
    return lines


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    font_name: str = FONT_REG,
    size: float = 9.0,
    leading: float = 10.4,
    color=TEXT,
) -> float:
    c.setFillColor(color)
    c.setFont(font(font_name), size)
    for line in wrap(text, font_name, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_rule(c: canvas.Canvas, x: float, y: float, w: float, h: float = 1.2) -> None:
    c.setFillColor(GOLD)
    c.rect(x, y, w, h, stroke=0, fill=1)


def draw_rail(c: canvas.Canvas) -> None:
    c.setFillColor(RAIL)
    c.rect(0, 0, RAIL_W, PAGE_H, stroke=0, fill=1)


def draw_sidebar_section(
    c: canvas.Canvas,
    title: str,
    lines: Iterable[str],
    y: float,
    x: float = SIDEBAR_X,
    width: float = SIDEBAR_W,
) -> float:
    c.setFillColor(NAVY)
    c.setFont(font(FONT_BOLD), 8.3)
    c.drawString(x, y, title.upper())
    y -= 4.2
    draw_rule(c, x, y, width, 0.6)
    y -= 8.0
    for line in lines:
        y = draw_wrapped(c, line, x, y, width, FONT_REG, 8.25, 10.1, TEXT)
        y -= 1.5
    return y - 7.0


def draw_sidebar(c: canvas.Canvas, sections: list[dict], y: float) -> float:
    for section in sections:
        y = draw_sidebar_section(c, section["title"], section["lines"], y)
    return y


def ensure_on_page(label: str, y: float, bottom_limit: float = BOTTOM_LIMIT) -> None:
    if y < bottom_limit:
        raise ValueError(
            f"{label} overflowed the locked resume layout by {bottom_limit - y:.1f} pt. "
            "Shorten mutable text; do not change the formatting."
        )


def draw_main_section(c: canvas.Canvas, title: str, y: float) -> float:
    c.setFillColor(NAVY)
    c.setFont(font(FONT_REG), 12.4)
    c.drawString(MAIN_X, y, title.upper())
    y -= 4.0
    draw_rule(c, MAIN_X, y, MAIN_W, 1.4)
    # Preserve a visible section-to-content break. The old 9 pt return put the
    # first role almost directly against the section rule.
    return y - 16.0


def draw_impact(c: canvas.Canvas, text: str, y: float) -> float:
    font_name = font(FONT_REG)
    font_size = 9.0
    leading = 10.4
    pad_x = 6.0
    pad_y = 5.0
    text_x = HILITE_X + pad_x
    lines = wrap(text, FONT_REG, font_size, HILITE_W - (2 * pad_x))
    ascent, descent = pdfmetrics.getAscentDescent(font_name, font_size)
    content_h = (ascent - descent) + leading * (len(lines) - 1)
    box_h = content_h + (2 * pad_y)
    c.setFillColor(HILITE)
    c.rect(HILITE_X, y - box_h, HILITE_W, box_h, stroke=0, fill=1)
    c.setFillColor(TEXT)
    c.setFont(font_name, font_size)
    ty = y - pad_y - ascent
    for line in lines:
        c.drawString(text_x, ty, line)
        ty -= leading
    return y - box_h - 3.5


def draw_bullet(c: canvas.Canvas, text: str, y: float) -> float:
    c.setFillColor(NAVY)
    c.rect(MAIN_X, y + 2.2, 3.0, 3.0, stroke=0, fill=1)
    return draw_wrapped(c, text, MAIN_X + 9.0, y, MAIN_W - 9.0, FONT_REG, 9.0, 11.2, TEXT) - 3.0


def draw_role(c: canvas.Canvas, role: dict, y: float) -> float:
    c.setFillColor(NAVY)
    c.setFont(font(FONT_REG), 11.8)
    for line in wrap(role["heading"], FONT_REG, 11.8, MAIN_W):
        c.drawString(MAIN_X, y, line)
        y -= 12.0
    # Give the role title breathing room before the impact strip.
    y -= 5.0
    # Blue strips are reserved for verified, quantified achievements. Roles
    # without a documented metric intentionally omit the strip.
    if role.get("impact", "").strip():
        y = draw_impact(c, role["impact"], y)
    c.setFillColor(MUTED)
    c.setFont(font(FONT_REG), 8.6)
    c.drawString(MAIN_X, y, role["meta"])
    y -= 14.0
    for bullet in role["bullets"]:
        y = draw_bullet(c, bullet, y)
    return y - 12.0


def draw_project(c: canvas.Canvas, project: dict, y: float) -> float:
    c.setFillColor(NAVY)
    c.setFont(font(FONT_REG), 10.6)
    c.drawString(MAIN_X, y, project["heading"])
    y -= 12.0
    c.setFillColor(MUTED)
    c.setFont(font(FONT_REG), 8.3)
    c.drawString(MAIN_X, y, project["meta"])
    y -= 11.0
    y = draw_wrapped(c, project["body"], MAIN_X, y, MAIN_W, FONT_REG, 8.8, 10.0, TEXT)
    return y - 9.0


def parse_json_field(row: dict, field: str) -> list[dict]:
    raw = row.get(field, "").strip()
    if not raw:
        return []
    value = json.loads(raw)
    if not isinstance(value, list):
        raise ValueError(f"{field} must decode to a JSON list")
    return value


@dataclass
class ResumeDoc:
    job_id: str
    company: str
    output_slug: str
    title_line: str
    contact_line: str
    summary: str
    sidebar_page1: list[dict]
    sidebar_page2: list[dict]
    roles_page1: list[dict]
    roles_page2: list[dict]
    projects: list[dict]

    @classmethod
    def from_row(cls, row: dict) -> "ResumeDoc":
        return cls(
            job_id=row["job_id"],
            company=row.get("company", ""),
            output_slug=row["output_slug"],
            title_line=row["title_line"],
            contact_line=row["contact_line"],
            summary=row["summary"],
            sidebar_page1=parse_json_field(row, "sidebar_page1_json"),
            sidebar_page2=parse_json_field(row, "sidebar_page2_json"),
            roles_page1=parse_json_field(row, "roles_page1_json"),
            roles_page2=parse_json_field(row, "roles_page2_json"),
            projects=parse_json_field(row, "projects_json"),
        )


def draw_page_one(c: canvas.Canvas, doc: ResumeDoc, headshot: Path) -> None:
    draw_rail(c)
    if headshot.exists():
        c.drawImage(str(headshot), 32.8, 664.8, width=102.8, height=102.8, mask="auto")

    sidebar_y = draw_sidebar(c, doc.sidebar_page1, 654.0)
    ensure_on_page("Page 1 sidebar", sidebar_y)

    c.setFillColor(NAVY)
    c.setFont(font(FONT_REG), 22.0)
    c.drawString(MAIN_X, 748.0, "MITCHELL MILLER")
    draw_rule(c, MAIN_X, 740.2, sw("MITCH", FONT_REG, 22.0), 2.2)

    c.setFillColor(NAVY)
    c.setFont(font(FONT_REG), 9.8)
    c.drawString(MAIN_X, 731.4, doc.title_line)
    c.setFillColor(MUTED)
    c.setFont(font(FONT_REG), 8.5)
    c.drawString(MAIN_X, 718.7, doc.contact_line)

    y = draw_wrapped(c, doc.summary, MAIN_X, 704.5, MAIN_W, FONT_REG, 9.4, 11.2, TEXT)
    y -= 12.5
    y = draw_main_section(c, "Experience", y)
    for role in doc.roles_page1:
        y = draw_role(c, role, y)
    ensure_on_page("Page 1 main column", y)


def draw_page_two(c: canvas.Canvas, doc: ResumeDoc) -> None:
    draw_rail(c)
    c.setFillColor(NAVY)
    c.rect(0, 751.6, 147.6, 26.0, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.setFont(font(FONT_BOLD), 9.4)
    c.drawString(28.8, 761.0, "MITCHELL MILLER - pg 2")

    sidebar_y = draw_sidebar(c, doc.sidebar_page2, 730.0)
    ensure_on_page("Page 2 sidebar", sidebar_y)

    y = draw_main_section(c, "Experience (Continued)", 764.5)
    for role in doc.roles_page2:
        y = draw_role(c, role, y)
    y = draw_main_section(c, "Independent Projects", y + 1.5)
    for project in doc.projects:
        y = draw_project(c, project, y)
    ensure_on_page("Page 2 main column", y)


def build_pdf(doc: ResumeDoc, out_pdf: Path, headshot: Path = DEFAULT_HEADSHOT) -> None:
    register_fonts()
    out_pdf.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(out_pdf), pagesize=letter)
    c.setTitle(f"Mitchell Miller - {doc.job_id}")
    c.setAuthor("Mitchell Miller")
    draw_page_one(c, doc, headshot)
    c.showPage()
    draw_page_two(c, doc)
    c.save()


def _pdf_text(pdf_path: Path) -> str:
    try:
        import pdfplumber  # type: ignore[import-not-found]
    except Exception as exc:
        raise RuntimeError(f"pdfplumber is required for content QA: {exc}") from exc

    text_parts: list[str] = []
    try:
        with pdfplumber.open(str(pdf_path)) as pdf:
            for page in pdf.pages:
                text_parts.append(page.extract_text() or "")
    except Exception as exc:
        raise RuntimeError(f"Could not extract PDF text for QA: {pdf_path}: {exc}") from exc
    return "\n".join(text_parts)


def _normalise_for_qa(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def _contains_term(text: str, term: str) -> bool:
    return _normalise_for_qa(term) in _normalise_for_qa(text)


def _target_company_is_true_prior_employer(target_company: str) -> bool:
    if not target_company.strip():
        return False
    target_norm = _normalise_for_qa(target_company)
    return any(target_norm == _normalise_for_qa(employer) for employer in TRUE_PRIOR_EMPLOYERS)


def _common_pdf_content_problems(pdf_path: Path, text: str) -> list[str]:
    problems: list[str] = []
    text_upper = text.upper()
    name_upper = pdf_path.name.upper()
    for term in STALE_CONTENT_TERMS:
        if _contains_term(text, term) or _contains_term(pdf_path.name, term):
            problems.append(f"Stale or fabricated content term found: {term}")
    for marker in PLACEHOLDER_MARKERS:
        if marker.upper() in text_upper or marker.upper() in name_upper:
            problems.append(f"Placeholder marker found: {marker}")
    return problems


def validate_resume_pdf_content(pdf_path: Path, doc: ResumeDoc) -> list[str]:
    text = _pdf_text(pdf_path)
    problems = _common_pdf_content_problems(pdf_path, text)
    target_company = doc.company.strip()
    if target_company and not _target_company_is_true_prior_employer(target_company):
        if _contains_term(pdf_path.name, target_company):
            problems.append(f"Target company appears in resume filename: {target_company}")
        if _contains_term(text, target_company):
            problems.append(f"Target company appears in resume body: {target_company}")
    return problems


def validate_cover_letter_pdf_content(pdf_path: Path) -> list[str]:
    text = _pdf_text(pdf_path)
    return _common_pdf_content_problems(pdf_path, text)


def render_pngs(pdf_path: Path, out_dir: Path) -> list[Path]:
    pdftoppm = shutil.which("pdftoppm") or (
        "/Users/mitchellmiler/.cache/codex-runtimes/codex-primary-runtime/"
        "dependencies/bin/pdftoppm"
    )
    if not Path(pdftoppm).exists():
        raise RuntimeError("pdftoppm was not found; cannot render PNG QA files")
    out_dir.mkdir(parents=True, exist_ok=True)
    prefix = out_dir / pdf_path.stem
    subprocess.run(
        [pdftoppm, "-png", "-r", "144", str(pdf_path), str(prefix)],
        check=True,
    )
    return sorted(out_dir.glob(f"{pdf_path.stem}-*.png"))


def render_source_pngs(out_dir: Path) -> list[Path]:
    if not SOURCE_PDF.exists():
        raise RuntimeError(f"Source PDF not found: {SOURCE_PDF}")
    return render_pngs(SOURCE_PDF, out_dir)


def read_row(csv_path: Path, job_id: str | None) -> dict:
    with csv_path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        raise ValueError(f"No rows found in {csv_path}")
    if job_id is None:
        return rows[0]
    for row in rows:
        if row["job_id"] == job_id:
            return row
    raise ValueError(f"job_id {job_id!r} not found in {csv_path}")


FIELDNAMES = [
    "job_id",
    "company",
    "role_title",
    "job_url",
    "output_slug",
    "title_line",
    "contact_line",
    "summary",
    "sidebar_page1_json",
    "sidebar_page2_json",
    "roles_page1_json",
    "roles_page2_json",
    "projects_json",
    "keyword_notes",
    "qa_status",
]


BASELINE_ROW = {
    "job_id": "baseline_seo_director",
    "company": "Baseline",
    "role_title": "Director of SEO and Search",
    "job_url": "",
    "output_slug": "CVSEODirectorMitchellMiller2026-baseline-rebuild",
    "title_line": "Director of SEO & Search · Technical SEO · AEO & GEO · Global & Multi-Market at Scale",
    "contact_line": "Honolulu, HI / San Jose, CA · (626) 316-8682 · mitchelljmillerjr26@gmail.com",
    "summary": (
        "Senior search leader with a decade owning organic at global scale and leading cross-functional "
        "teams against revenue KPIs - $15.21M attributable revenue in a single fiscal year as PM for a "
        "1,000+ location healthcare network, multi-billion-dollar global revenue surface at Apple across "
        "38+ country sites, full-funnel ownership at Stanford Health Care. Built one of the largest "
        "healthcare entity databases in the U.S.; operating at the leading edge of AEO/GEO measurement "
        "and AI-search adaptation."
    ),
    "sidebar_page1_json": json.dumps(
        [
            {
                "title": "Leadership & Stakeholder",
                "lines": [
                    "Team & priority-setting",
                    "KPI / P&L ownership",
                    "Senior exec influence",
                    "Cross-functional roadmap delivery",
                ],
            },
            {
                "title": "AEO / GEO & AI Search",
                "lines": [
                    "AEO measurement (Profound)",
                    "Citation velocity",
                    "AI share-of-voice: ChatGPT, Perplexity, Google AI Overviews",
                    "Generative-search adaptation",
                ],
            },
            {
                "title": "Knowledge Architecture",
                "lines": [
                    "Entity SEO · Knowledge Graph",
                    "Wikidata · Schema · Structured data",
                    "Site architecture at scale · Yext",
                    "Internal linking · Citation networks",
                ],
            },
            {
                "title": "Technical SEO",
                "lines": [
                    "Server-level audits (Apache, IIS, PHP)",
                    "Core Web Vitals · Crawl / render",
                    "JS indexation · Migrations",
                    "Multi-CMS implementation",
                ],
            },
            {
                "title": "Global & Multi-Market",
                "lines": [
                    "International SEO architecture",
                    "Hreflang / canonical / locale targeting",
                    "38+ country sites at Apple scale",
                    "20+ regional healthcare markets",
                ],
            },
            {
                "title": "Performance & Dashboarding",
                "lines": [
                    "GA4 · Adobe Analytics",
                    "Attribution modeling",
                    "Executive reporting / dashboards",
                    "CRO · A/B testing · Conversion engineering",
                ],
            },
            {
                "title": "AI & Modern Tooling",
                "lines": [
                    "Claude API · OpenAI",
                    "Custom GPTs · Agent workflows",
                    "Python · SQL · BigQuery",
                    "Cursor · Zapier",
                ],
            },
            {
                "title": "Tools & Platforms",
                "lines": [
                    "Semrush · Ahrefs · SEO Clarity · Screaming Frog · Surfer · Clearscope · Profound · GSC · Google Ads · Bing Ads · Asana · JIRA",
                ],
            },
            {
                "title": "Education",
                "lines": [
                    "Michigan State University",
                    "BA, Business Administration · Eli Broad College · 2004-2008",
                ],
            },
            {
                "title": "Key Certifications",
                "lines": [
                    "Google Ads · GA4 · Google AI Essentials · AI for Marketing (HubSpot) · CRO & Experimentation (CXL) · Content Marketing · PSM I · CAPM",
                ],
            },
        ],
        ensure_ascii=False,
    ),
    "sidebar_page2_json": json.dumps(
        [
            {
                "title": "Interests",
                "lines": [
                    "Christian faith · Meditation · Surfing · BJJ & Muay Thai · Rock climbing · Drone piloting · Astronomy · Music curation",
                ],
            },
            {
                "title": "College Highlights",
                "lines": [
                    "Michigan State · Varsity Wrestling · Rugby · Lacrosse · Asst. Director, Int'l Center Student Affairs · Phi Kappa Phi Honor Society",
                ],
            },
        ],
        ensure_ascii=False,
    ),
    "roles_page1_json": json.dumps(
        [
            {
                "heading": "Clarity AI - Senior AI Search Strategist / AI Systems Consultant",
                "impact": "Lead AEO/GEO strategy and measurement across an enterprise client portfolio; influence agency exec direction on AI-search positioning",
                "meta": "Nov 2023 - Present · Remote · Advisory + execution model",
                "bullets": [
                    "Designed and deployed AEO measurement infrastructure (Profound) tracking citation velocity and AI share-of-voice across ChatGPT, Perplexity, and Google AI Overviews - operationalized closed-loop AI-search measurement most competitors have yet to build.",
                    "Own technical SEO, AEO, and GEO audit strategy across enterprise accounts; set delivery priorities, translate AI-visibility opportunities into client-ready roadmaps, and brief senior client stakeholders before handoff to delivery teams.",
                    "Shipped ClarityPulse end-to-end - internal AI reporting and executive-dashboard product converting GA4, GSC, ads, and SEO data into board-ready performance insights, risk flags, and prioritized next steps. SearchForge (content intelligence) and ActionThread (call-to-execution) in active development.",
                    "Engineered entity-first content systems for Knowledge Graph and AI-retrieval inclusion - structured data, Wikidata validation, citation networks, topical authority frameworks.",
                ],
            },
            {
                "heading": "Stanford Health Care - Independent SEO/SEM & AI Search Consultant",
                "impact": "Full-funnel paid + organic + AI-search ownership across 40+ clinical service lines; senior stakeholder partnership in regulated healthcare",
                "meta": "Mar 2024 - Present · Palo Alto, CA / Remote",
                "bullets": [
                    "Brought in to own full-funnel paid and organic search KPIs against patient-acquisition targets during a leave; retained for ongoing 2-5 week consulting sprints partnering directly with senior clinical and marketing leadership.",
                    "Restructured technical SEO and semantic schema across 40+ clinical service lines for AI-driven search and LLM retrieval - +42% generative-search visibility within 90 days; +135% YoY organic from underserved demographics via multilingual hreflang and accessibility framework.",
                    "Engineered keyword and landing-page blueprint for national Second Opinion and Virtual Visit programs - $4.8M attributable patient lifetime value over a 3-month engagement.",
                ],
            },
            {
                "heading": "Apple - Program Manager, SEO - Americas Region (AMR)",
                "impact": "Global SEO program ownership across a multi-billion-dollar revenue surface - 38+ country sites, 138 hreflang locale variants",
                "meta": "Aug 2022 - Jan 2024 · Cupertino, CA",
                "bullets": [
                    "Owned international SEO architecture across 38+ country sites and 138 hreflang locale variants - canonicalization, alternate URL signaling, and locale-targeting integrity across one of the most localized commerce surfaces on the web (primary surface: apple.com/store).",
                    "Built data-driven business cases with revenue modeling and competitive analysis that secured engineering roadmap prioritization at Apple.com scale - presented to 60+ stakeholder audiences spanning product, engineering, design, and marketing leadership.",
                    "Integrated early AEO and generative-search signals into long-term organic strategy across the Americas (US, Canada, Mexico, Brazil) ahead of mainstream LLM-search adoption.",
                    "Identified and resolved mass JavaScript rendering and indexation gaps in Apple's proprietary JS framework; partnered with engineering, design, and accessibility teams on remediation aligning WCAG and search-visibility mandates.",
                ],
            },
        ],
        ensure_ascii=False,
    ),
    "roles_page2_json": json.dumps(
        [
            {
                "heading": "CommonSpirit Health - SEO & Web Analytics Product Manager",
                "impact": "$15.21M attributable revenue · 88K appointments · 1,000+ Yext entity pages · 20+ markets · +85% organic growth across tenure",
                "meta": "Sept 2018 - Aug 2022 · Remote · 1,000+ location healthcare network",
                "bullets": [
                    "Owned organic-search P&L and KPI accountability across a 1,000+ location, 20+ market network - FY22 delivered $15.21M attributable revenue, 88K appointments booked, and 175K calls/directions, all driven through organic.",
                    "Constructed 1,000+ Yext entity pages with parent/child architecture and dynamic CMS templates standardizing page production across 20+ regional markets - structured-data syndication across Google, Apple Maps, Siri, and Alexa simultaneously; one of the largest healthcare entity databases in the U.S.",
                    "Converted a top-down AEM migration mandate into bottoms-up executive adoption by demonstrating dynamic regional metadata syndication via content fragmentation - secured buy-in from regional brand executives across Texas, California, and other mature CMS/CRM markets.",
                    "Drove organic traffic 2.65M to 4.9M+ sessions across tenure (FY19 +40% YoY, FY20 +32% YoY); led 20+ enterprise migrations with stakeholder coordination and post-launch audits; partnered with Data Science teams on attribution modeling and executive reporting across Adobe Analytics and GA.",
                ],
            },
            {
                "heading": "Wpromote (DemandWave) - SEO Campaign Manager",
                "impact": "Directed full-lifecycle SEO across enterprise portfolio including Unilever, BeyondTrust, Dynapar, Whoop",
                "meta": "Apr 2015 - Aug 2018 · San Francisco, CA",
                "bullets": [
                    "Managed eight-figure aggregate digital spend across mid-market and enterprise clients spanning B2B SaaS, fintech, cybersecurity, e-commerce, CPG, industrial manufacturing, and trucking automation.",
                    "Built and led internal SEO training curriculum scaling technical methodology across the agency - mentored junior strategists and set delivery standards firm-wide.",
                    "Server-level technical audits across Apache, IIS, HTTP Headers, and PHP; multi-CMS implementation across Shopify, Magento, WordPress, Drupal, and Joomla.",
                ],
            },
        ],
        ensure_ascii=False,
    ),
    "projects_json": json.dumps(
        [
            {
                "heading": "Domain Signal · Founder, Solo Build",
                "meta": "domainsignals.live · AI-driven domain intelligence engine · 2024 - Present",
                "body": "Statistical models correlating domain registrations, congressional trades, SEC filings, and government contracts.",
            },
            {
                "heading": "Clear Kayak Adventures · Founder & Operator",
                "meta": "clearkayakadventureshawaii.com · Oahu, HI · 2024 - Present",
                "body": "Built website, OTA listings, merchant processing, SOPs, and CRM. Revenue $500-$1,000/day per location prior to permit moratorium.",
            },
            {
                "heading": "Vet Advocates · Growth Systems Advisor (pro-bono)",
                "meta": "Veterans-services nonprofit · 2024 - Present",
                "body": "10x'd monthly signups (2-3 to 25-50); test month $1,197 spend to 57K impressions, 57 leads at $21 CPL.",
            },
        ],
        ensure_ascii=False,
    ),
    "keyword_notes": "Baseline source row. Use as the conservative source before tailoring.",
    "qa_status": "baseline",
}


def write_baseline_csv(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerow(BASELINE_ROW)


def validate_doc(doc: ResumeDoc) -> list[str]:
    problems: list[str] = []
    if "{{" in json.dumps(doc.__dict__, ensure_ascii=False):
        problems.append("Unresolved placeholder token found.")
    if len(doc.roles_page1) == 0 or len(doc.roles_page2) == 0:
        problems.append("Missing page role data.")
    if len(doc.projects) == 0:
        problems.append("Missing project data.")
    roles = doc.roles_page1 + doc.roles_page2
    if roles and CURRENT_MOST_RECENT_EMPLOYER not in roles[0].get("heading", ""):
        problems.append(
            "The first experience entry must be SFC Surf School, Mitchell's current and most recent position."
        )
    for project in doc.projects:
        heading = project.get("heading", "")
        project_name = re.split(r"\s*[·-]\s*", heading, maxsplit=1)[0].strip()
        if project_name not in APPROVED_INDEPENDENT_PROJECTS:
            problems.append(
                f"Unapproved independent project: {project_name or heading}. "
                "Allowed: Domain Signal, Clear Kayak Adventures, Vet Advocates."
            )
    if not DEFAULT_HEADSHOT.exists():
        problems.append(f"Missing headshot asset: {DEFAULT_HEADSHOT}")
    return problems


def main() -> None:
    parser = argparse.ArgumentParser(description="Build exact-format tailored resume PDFs.")
    parser.add_argument("--csv", type=Path, help="CSV containing one row per resume variant.")
    parser.add_argument("--job-id", help="job_id to render. Defaults to the first CSV row.")
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT_DIR)
    parser.add_argument("--write-baseline-csv", type=Path, help="Write the baseline CSV row and exit.")
    parser.add_argument("--render-png", action="store_true", help="Render generated PDF pages to PNG for QA.")
    parser.add_argument("--render-source", action="store_true", help="Also render the approved source PDF for side-by-side QA.")
    args = parser.parse_args()

    if args.write_baseline_csv:
        write_baseline_csv(args.write_baseline_csv)
        print(f"Wrote baseline CSV: {args.write_baseline_csv}")
        return

    if not args.csv:
        raise SystemExit("Pass --csv or --write-baseline-csv.")

    row = read_row(args.csv, args.job_id)
    doc = ResumeDoc.from_row(row)
    problems = validate_doc(doc)
    if problems:
        raise SystemExit("\n".join(problems))

    dated_dir = args.out_dir / date.today().isoformat()
    pdf_path = dated_dir / f"{doc.output_slug}.pdf"
    build_pdf(doc, pdf_path)
    qa_problems = validate_resume_pdf_content(pdf_path, doc)
    if qa_problems:
        pdf_path.unlink(missing_ok=True)
        raise SystemExit("PDF content QA failed:\n" + "\n".join(qa_problems))
    print(f"Wrote PDF: {pdf_path}")

    csv_copy = dated_dir / f"{doc.output_slug}.csv"
    with csv_copy.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerow(row)
    print(f"Wrote CSV row copy: {csv_copy}")

    if args.render_png:
        pngs = render_pngs(pdf_path, dated_dir / "rendered")
        for png in pngs:
            print(f"Wrote PNG: {png}")

    if args.render_source:
        pngs = render_source_pngs(dated_dir / "source-rendered")
        for png in pngs:
            print(f"Wrote source PNG: {png}")


if __name__ == "__main__":
    main()
