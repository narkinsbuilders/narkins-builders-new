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
  const [stats, setStats] = useState({
    totalPosts: 0,
    recentPosts: 0,
    publishedThisMonth: 0
  })

  useEffect(() => {
    setIsClient(true)
    // Set the correct TinaCMS URL based on environment
    const isProduction = window.location.hostname !== 'localhost'
    if (isProduction) {
      setTinaUrl(`${window.location.origin}/admin/index.html`)
    } else {
      setTinaUrl('http://localhost:4001/admin/index.html')
    }

    // Calculate stats
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    setStats({
      totalPosts: posts.length,
      recentPosts: posts.filter(post => new Date(post.date) >= thirtyDaysAgo).length,
      publishedThisMonth: posts.filter(post => new Date(post.date) >= thisMonth).length
    })
  }, [posts])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
              <Image
                src="/images/narkins-builders-logo.webp"
                alt="Narkin's Builders"
                width={120}
                height={48}
                className="mx-auto"
              />
            </div>
          </div>
          <p className="text-slate-300 mt-6 text-lg font-medium">Initializing admin interface...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Content Management | Narkin's Builders</title>
        <meta name="description" content="Professional content management system for Narkin's Builders" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative">
          {/* Header */}
          <div className="pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl shadow-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v9m0 0h-2m2 0h2M9 7h6" />
                  </svg>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  Content Hub
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Professional content management for <span className="text-amber-400 font-semibold">Narkin's Builders</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm font-medium">Total Posts</p>
                    <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm font-medium">Recent Posts</p>
                    <p className="text-3xl font-bold text-white">{stats.recentPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm font-medium">This Month</p>
                    <p className="text-3xl font-bold text-white">{stats.publishedThisMonth}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA Section */}
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-2xl mb-6">
                  <svg className="w-12 h-12 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Visual Content Editor
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Create, edit, and manage your blog content with our powerful visual editor. 
                  Professional tools for professional content.
                </p>
              </div>

              {tinaUrl && (
                <div className="space-y-6">
                  <a 
                    href={tinaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-bold text-lg rounded-2xl hover:from-amber-300 hover:to-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-amber-400/25 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Launch TinaCMS Editor
                  </a>
                  
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">Direct Access URL:</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(tinaUrl)}
                        className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy URL
                      </button>
                    </div>
                    <code className="text-slate-300 text-sm font-mono break-all mt-2 block">
                      {tinaUrl}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Content Guidelines</h3>
                    <p className="text-slate-300 text-sm">
                      Best practices for creating engaging real estate content that converts visitors into leads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
                    <p className="text-slate-300 text-sm">
                      Track content performance, engagement metrics, and lead generation from your blog posts.
                    </p>
                  </div>
                </div>
              </div>
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