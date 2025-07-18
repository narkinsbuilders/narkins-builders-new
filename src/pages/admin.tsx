import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
    return <div>Loading admin interface...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Admin</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-2">TinaCMS Access</h2>
          <p className="text-green-800 mb-4">
            Your TinaCMS credentials are configured! Access the visual editor here:
          </p>
          <div className="space-y-2">
            {tinaUrl && (
              <a 
                href={tinaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Open TinaCMS Editor
              </a>
            )}
            <p className="text-sm text-green-700">
              Direct link: <a href={tinaUrl} target="_blank" className="underline">{tinaUrl}</a>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
              <div className="space-y-2">
                {posts.map((post) => (
                  <button
                    key={post.slug}
                    onClick={() => setSelectedPost(post)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPost?.slug === post.slug
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {selectedPost ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Post Details</h2>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2">{selectedPost.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedPost.excerpt}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    Published: {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>File:</strong> content/blogs/{selectedPost.slug}.mdx
                    </p>
                    <p className="text-sm text-gray-600">
                      Edit this post by modifying the MDX file directly, or set up TinaCMS credentials for visual editing.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Select a blog post to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
        date: data.date || '',
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