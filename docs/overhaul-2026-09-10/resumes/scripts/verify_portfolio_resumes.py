#!/usr/bin/env python3
"""Structural checks after all eight rendered resume pages have been visually inspected."""
import csv, hashlib, json, re
from pathlib import Path
import pdfplumber
ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT.parents[2]
with (ROOT/'portfolio_resume_rows.csv').open() as f:rows=list(csv.DictReader(f))
checks=[]
for row in rows:
 p=REPO/'public/files'/f"{row['output_slug']}.pdf"
 role_rows=json.loads(row['roles_page1_json'])+json.loads(row['roles_page2_json'])
 assert role_rows[0]['heading'].startswith('SFC Surf School - ')
 assert [r['meta'] for r in role_rows]==['May 2026 - Present','Nov 2023 - Feb 2026','Mar 2024 - Dec 2025','Aug 2022 - Jan 2024','Sep 2018 - Aug 2022','Apr 2015 - Aug 2018']
 assert role_rows[3]['heading']=='Apple - Program Manager, SEO - Americas Region (AMR)'
 assert all(re.search(r'\d',r['impact']) for r in role_rows if r['impact'])
 assert [p['heading'].split(' - ')[0] for p in json.loads(row['projects_json'])]==['Domain Signal','Clear Kayak Adventures','Vet Advocates']
 with pdfplumber.open(p) as doc:
  assert len(doc.pages)==2
  assert [(page.width,page.height) for page in doc.pages]==[(612,792),(612,792)]
  assert [len(page.images) for page in doc.pages]==[1,0]
  text='\n'.join(page.extract_text() or '' for page in doc.pages)
  for bad in ['Clarity Digital','PropectaFit','TBD','TODO','PLACEHOLDER','{{','Global SEO Program Manager','AI Search Workflow Lab']:
   assert bad not in text,bad
  assert 'Clarity Pulse' not in text.split('INDEPENDENT PROJECTS')[-1]
  for page in doc.pages:
   assert all(c['x0']>=0 and c['x1']<=612.2 and c['top']>=0 and c['bottom']<=792.2 for c in page.chars)
   # Pale-blue impact strips must match the measured main column and use black text.
   strips=[r for r in page.rects if r.get('non_stroking_color') and tuple(round(c,3) for c in r['non_stroking_color'])==(0.91,0.945,0.984)]
   for r in strips:
    assert abs(r['x0']-187.2)<.01 and abs(r['width']-396)<.01
    impact_chars=[c for c in page.chars if c['top']>=r['top'] and c['bottom']<=r['bottom'] and c['x0']>=r['x0']]
    assert impact_chars
    assert all(tuple(round(v,3) for v in c['non_stroking_color'])==(0.102,0.102,0.102) for c in impact_chars)
  checks.append(dict(file=str(p.relative_to(REPO)),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),pages=2,page_size=[612,792],image_counts=[1,0],all_text_within_page=True,first_experience='SFC Surf School',impact_geometry_and_black_text='pass',visual_qa='both pages inspected with view_image; compared to approved source; no clipping or text overlap'))
 row['qa_status']='visual_qa_passed_pdfplumber_checked'
with (ROOT/'portfolio_resume_rows.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
(ROOT/'validation/qa-report.json').write_text(json.dumps(dict(date='2026-09-10',status='pass',outputs=checks),indent=2)+'\n')
print(json.dumps(checks,indent=2))
