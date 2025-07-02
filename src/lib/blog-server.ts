// src/lib/blog-server.ts - SERVER-SIDE ONLY
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from './blog'

const postsDirectory = path.join(process.cwd(), 'content/blogs')

export function getAllPostsServer(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Blog directory does not exist:', postsDirectory)
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

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          excerpt: matterResult.data.excerpt || '',
          date: matterResult.data.date || new Date().toISOString(),
          image: matterResult.data.image || '/images/default-blog.jpg',
          content: matterResult.content,
          readTime: matterResult.data.readTime || '5 min read'
        }
      })

    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlugServer(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, slug + '.mdx')
    if (!fs.existsSync(fullPath)) {
      console.warn('Blog post not found:', fullPath)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || new Date().toISOString(),
      image: matterResult.data.image || '/images/default-blog.jpg',
      content: matterResult.content,
      readTime: matterResult.data.readTime || '5 min read'
    }
  } catch (error) {
    console.error('Error reading post ' + slug + ':', error)
    return null
  }
}
