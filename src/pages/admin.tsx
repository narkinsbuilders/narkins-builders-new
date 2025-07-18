import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  content: string
}

interface AdminPageProps {
  posts: BlogPost[]
}

export default function AdminPage({ posts }: AdminPageProps) {
  const [isClient, setIsClient] = useState(false)
  const [tinaUrl, setTinaUrl] = useState('')

  useEffect(() => {
    setIsClient(true)
    const isProduction = window.location.hostname !== 'localhost'
    if (isProduction) {
      setTinaUrl(`${window.location.origin}/admin/index.html`)
    } else {
      setTinaUrl('http://localhost:4001/admin/index.html')
    }
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin | Narkin's Builders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-neutral-50">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center border border-gray-200">
              <div className="mb-6">
                <Image
                  src="/images/narkins-builders-logo.webp"
                  alt="Narkin's Builders"
                  width={200}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome to Narkin's Content Management System
                </h1>
                <p className="text-lg text-gray-600">
                  Manage your real estate blog content and publish articles about properties in Bahria Town Karachi.
                </p>
              </div>
            </div>

            {/* Login Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Access Content Editor</h2>
              <p className="text-gray-600 mb-8">
                Click below to access the content management interface where you can create and edit blog posts.
              </p>

              {tinaUrl && (
                <a 
                  href={tinaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Content Editor
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/blogs')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date ? new Date(data.date).toISOString() : '',
        content: content.slice(0, 200) + '...' // Truncate for preview
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      posts
    }
  }
}