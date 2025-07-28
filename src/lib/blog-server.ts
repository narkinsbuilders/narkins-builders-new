// src/lib/blog-server.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from './blog'

const postsDirectory = path.join(process.cwd(), 'content/blogs')

export function getAllPostsServer(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map((fileName): BlogPost => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      // Handle both editing modes
      let content: string;
      if (matterResult.data.editingMode === 'raw') {
        // For raw mode, prefer rawContent from frontmatter, otherwise use body content
        content = matterResult.data.rawContent || matterResult.content;
      } else {
        // For visual mode, use the main content (which should be empty for visual-only posts)
        content = matterResult.content;
      }

      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
        image: matterResult.data.image || '/images/default-blog.jpg',
        content: content,
        readTime: matterResult.data.readTime || '5 min read',
      }
    })

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostBySlugServer(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, slug + '.mdx')

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  // Handle both editing modes
  let content: string;
  if (matterResult.data.editingMode === 'raw') {
    // For raw mode, prefer rawContent from frontmatter, otherwise use body content
    content = matterResult.data.rawContent || matterResult.content;
  } else {
    // For visual mode, use the main content (which should be empty for visual-only posts)
    content = matterResult.content;
  }

  return {
    slug,
    title: matterResult.data.title || 'Untitled',
    excerpt: matterResult.data.excerpt || '',
    date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
    image: matterResult.data.image || '/images/default-blog.jpg',
    content: content,
    readTime: matterResult.data.readTime || '5 min read',
  }
}
