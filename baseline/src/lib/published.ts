import { blogPosts as archivedBlogPosts } from "./data";
import { studyNotes as archivedStudyNotes } from "./study-notes";
import { blogPosts as currentBlogPosts } from "../../../src/lib/data";
import { studyNotes as currentStudyNotes } from "../../../src/lib/study-notes";

// The archive (production snapshot 2745c7e) is never edited; scripts/export-parity-reference.mjs
// still reads it directly for the 57-route parity check. Posts and study notes published after
// the snapshot exist only in src/lib/, so they are prepended here (newest first) and never
// replace an archived slug. Each one must be declared in
// docs/implementation-2026-09-11/route-manifest.json as kind "added" (enforced by
// scripts/verify-agency.mjs and scripts/qa/crawl.mjs).
const archivedPostSlugs = new Set(archivedBlogPosts.map(post => post.slug));
const addedBlogPosts = currentBlogPosts.filter(post => post.status === "published" && !archivedPostSlugs.has(post.slug));
const blogPosts = [...addedBlogPosts, ...archivedBlogPosts];
const archivedNoteSlugs = new Set(archivedStudyNotes.map(note => note.slug));
const addedStudyNotes = currentStudyNotes.filter(note => !archivedNoteSlugs.has(note.slug));
export const studyNotes = [...addedStudyNotes, ...archivedStudyNotes];

export const publishedBlogPosts = blogPosts.filter((post, index, posts) =>
  post.status === "published" && posts.findIndex(candidate => candidate.slug === post.slug) === index
);
export const visibleBlogPosts = blogPosts.filter((post, index, posts) =>
  posts.findIndex(candidate => candidate.slug === post.slug) === index
);
export const excludedDraftSlugs = blogPosts.filter(post => post.status === "draft").map(post => post.slug);
export const duplicateBlogSlugs = [...new Set(blogPosts.filter((post, index, posts) =>
  posts.findIndex(candidate => candidate.slug === post.slug) !== index
).map(post => post.slug))];
