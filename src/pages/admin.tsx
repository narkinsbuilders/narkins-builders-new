import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'
import Navigation from '@/components/layout/navigation/navigation'
import Footer from '@/components/layout/footer/footer'

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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [tinaUrl, setTinaUrl] = useState('')

  useEffect(() => {
    setIsClient(true)
    // Set the correct TinaCMS URL based on environment
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
        <div className="text-center">
          <div className="animate-pulse">
            <Image
              src="/images/narkins-builders-logo.webp"
              alt="Narkin's Builders"
              width={150}
              height={60}
              className="mx-auto mb-4"
            />
          </div>
          <p className="text-gray-600">Loading admin interface...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Blog Admin | Narkin's Builders</title>
        <meta name="description" content="Content management system for Narkin's Builders blog" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Navigation />
      
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-black to-neutral-800 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Blog Management
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Professional content management system for Narkin's Builders
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* TinaCMS Access Card */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-8 mb-12 shadow-lg">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Visual Content Editor</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Access the professional TinaCMS visual editor to create and manage blog content with ease.
                </p>
                <div className="space-y-4">
                  {tinaUrl && (
                    <a 
                      href={tinaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-black to-neutral-800 text-white font-semibold rounded-lg hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open TinaCMS Editor
                    </a>
                  )}
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Direct Access:</span>
                    </p>
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                      {tinaUrl}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-neutral-800 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Blog Posts ({posts.length})
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {posts.map((post) => (
                      <button
                        key={post.slug}
                        onClick={() => setSelectedPost(post)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${
                          selectedPost?.slug === post.slug
                            ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 truncate mb-1">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Preview Area */}
            <div className="lg:col-span-2">
              {selectedPost ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-black to-neutral-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Post Preview
                    </h2>
                  </div>
                  <div className="p-8">
                    <div className="prose max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedPost.title}</h3>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{selectedPost.excerpt}</p>
                      
                      <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          </svg>
                          Published: {new Date(selectedPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {selectedPost.slug}.mdx
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-neutral-50 to-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">File Location</h4>
                            <p className="text-gray-600 text-sm mb-3">
                              This blog post is stored at: <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">content/blogs/{selectedPost.slug}.mdx</code>
                            </p>
                            <p className="text-gray-600 text-sm">
                              Use the TinaCMS Visual Editor above for the best editing experience, or modify the MDX file directly for advanced customization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Select a Blog Post</h3>
                    <p className="text-gray-600">
                      Choose a blog post from the list to view its details and preview content.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
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