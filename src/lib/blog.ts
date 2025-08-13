// src/lib/blog.ts - Client-safe version
export interface BlogPost {
 slug: string
 title: string
 excerpt: string
 date: string
 image: string
 content: string
 readTime: string
 lastModified?: string
 keywords?: string
}

// This will be populated by getStaticProps
export const blogPosts: BlogPost[] = []

// Utility functions that work on both client and server
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
 return posts.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
 })
}

export function getPostBySlugFromArray(posts: BlogPost[], slug: string): BlogPost | null {
 return posts.find(post => post.slug === slug) || null
}
