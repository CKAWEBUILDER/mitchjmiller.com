import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const expected=['index.html','themes/editorial/index.html','themes/atelier/index.html','proof/index.html','proof/case-studies/apple-seasonal-search/index.html','proof/case-studies/sfc-surf-school/index.html','proof/resume/index.html','404.html'];
for(const path of expected){const file=join('dist',path);if(!existsSync(file))throw Error(`Missing route ${path}`);const html=readFileSync(file,'utf8');if(!/<h1[\s>]/i.test(html))throw Error(`Missing content heading ${path}`);if(!/noindex/.test(html))throw Error(`Staging indexing policy missing ${path}`);if(/__HEADSHOT__|__SFC__|id=["']root["']/.test(html))throw Error(`Unresolved placeholder or app shell ${path}`);}
for(const slug of ['apple-seasonal-search','sfc-surf-school']){const html=readFileSync(`dist/proof/case-studies/${slug}/index.html`,'utf8');const paragraphs=(html.match(/<p(?:\s|>)/g)||[]).length;if(paragraphs<10)throw Error(`Incomplete case body ${slug}`);}
if(existsSync('dist/CNAME')||existsSync('dist/case-studies/sfc-surf-school/index.html'))throw Error('Production binding or legacy SFC route leaked into staging');
if(!readFileSync('dist/robots.txt','utf8').includes('Allow: /'))throw Error('Staging must support an authorized HTML crawl');
const resumes=readdirSync('dist/files').filter(x=>x.endsWith('.pdf'));if(resumes.length!==4)throw Error('Resume inventory mismatch');
console.log(`PASS: ${expected.length} representative HTML routes; full case bodies; staging metadata; four PDFs; no production bindings or legacy route.`);
