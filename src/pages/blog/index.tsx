import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/navigation/navigation'
import Footer from '@/components/footer/footer'
import { Card } from '@/components/ui/card'
import { getAllPosts, type BlogPost } from '@/lib/blog'

interface BlogIndexProps {
  posts: BlogPost[]
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <Navigation />
      
      <div className="bg-white min-h-screen py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Narkin's Builders Blog
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Real estate insights, market analysis, and property guides
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    <time className="text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        timeZone: 'UTC'
                      })}
                    </time>
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {post.category}
                    </span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-gray-600">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm leading-6 text-gray-600 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer map="" />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()
  
  return {
    props: {
      posts
    }
  }
}
