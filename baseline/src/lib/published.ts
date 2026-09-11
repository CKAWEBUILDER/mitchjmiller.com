import { blogPosts } from "./data";

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
