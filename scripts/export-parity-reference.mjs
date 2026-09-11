import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { writeFileSync } from 'node:fs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const normalizePath = value => value === '/' ? '/' : `/${value.replace(/^\/+|\/+$/g, '')}/`;

/** Read the archived production data directly; never import the review redesign. */
export async function exportParityReference() {
  const bundled = await build({
    stdin: {
      contents: `export { caseStudies, blogPosts } from './baseline/src/lib/data.ts'; export { studyNotes } from './baseline/src/lib/study-notes.ts';`,
      resolveDir: root, sourcefile: 'production-parity-reference.ts', loader: 'ts',
    },
    bundle: true, write: false, platform: 'node', format: 'esm',
    define: { 'import.meta.env.BASE_URL': '"/"' }, logLevel: 'silent',
  });
  const { caseStudies, blogPosts, studyNotes } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
  const uniquePosts = blogPosts.filter((post, index, posts) => posts.findIndex(candidate => candidate.slug === post.slug) === index);
  const general = ['/', '/about/', '/contact/', '/collab-ideas/', '/resume/', '/systems/', '/work/', '/selected-builds/', '/blog/', '/case-studies/', '/aeo-geo/'];
  return {
    source: '2745c7e',
    duplicateSlugs: [...new Set(blogPosts.filter((post, index, posts) => posts.findIndex(candidate => candidate.slug === post.slug) !== index).map(post => post.slug))],
    routes: [
      ...general.map(path => ({ path, kind: 'general' })),
      ...caseStudies.map(study => ({
        path: normalizePath(`/case-studies/${study.slug}`), kind: 'case',
        standalone: Boolean(study.external), title: study.title,
        fields: Object.fromEntries(['title', 'thesis', 'role', 'context', 'problem', 'system', 'partners', 'tools', 'proof', 'showsHiringManagers'].map(key => [key, study[key]])),
      })),
      ...uniquePosts.map(post => ({
        path: normalizePath(`/blog/${post.slug}`), kind: post.status === 'draft' ? 'placeholder' : 'article',
        title: post.title, status: post.status, teaser: post.teaser,
        // Preserve the production markdown renderer exactly for the one older
        // article. The check compares the entire resulting text, not excerpts.
        bodyHtml: post.contentHtml || post.content?.replace(/\n\n/g, '</p><p>').replace(/### (.*?)\n/g, '<h3 class="text-2xl font-bold text-primary mt-12 mb-4">$1</h3>').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-primary">$1</strong>') || '',
      })),
      ...studyNotes.map(note => ({
        path: normalizePath(`/blog/studying/${note.slug}`), kind: 'note',
        title: note.title, bodyHtml: note.contentHtml,
      })),
    ],
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = `${JSON.stringify(await exportParityReference(), null, 2)}\n`;
  if (process.argv[2]) writeFileSync(resolve(process.argv[2]), output);
  else process.stdout.write(output);
}
