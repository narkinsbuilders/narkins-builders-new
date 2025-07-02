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
      </Head>

      <Navigation />

      <div className="bg-white min-h-screen">
        {/* Hero Section - matching your site style */}
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="cursor-pointer">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found.</p>
              <p className="text-gray-400 text-sm mt-2">Create MDX files in content/blogs/ to get started.</p>
            </div>
          )}
        </div>
      </div>

      <Footer map="" />
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
