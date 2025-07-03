import { GetStaticProps } from 'next'
import { getAllPostsServer } from '../../lib/blog-server'
import { BlogPost } from '../../lib/blog'
import Navigation from '@/components/navigation/navigation'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

interface BlogIndexProps {
  posts: BlogPost[]
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Real Estate Blog | Narkin's Builders</title>
        <meta name="description" content="Latest insights on real estate investment in Bahria Town Karachi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-neutral-50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                Narkin's Builders Blog
              </h1>
              <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                Latest insights on real estate investment in Bahria Town Karachi
              </p>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          {posts.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="cursor-pointer">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                            Real Estate
                          </span>
                          <span className="text-gray-500 text-sm">{post.readTime}</span>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <time dateTime={post.date}>
                            {(() => {
                              try {
                                return new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                });
                              } catch (error) {
                                return 'Date unavailable';
                              }
                            })()}
                          </time>
                          <span className="text-blue-600 font-medium">Read more →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                <p className="text-gray-500 text-sm">
                  Create MDX files in content/blogs/ to get started with your blog.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPostsServer()
  
  return {
    props: {
      posts
    },
    revalidate: 60
  }
}