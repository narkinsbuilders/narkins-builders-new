import Navigation from '@/components/navigation/navigation'
import Footer from '@/components/footer/footer'
import Head from 'next/head'
import Image from 'next/image'
import { BlogPost } from '../../lib/blog'

interface BlogLayoutProps {
  post: BlogPost
  children: React.ReactNode
}

export default function BlogLayout({ post, children }: BlogLayoutProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Narkin's Builders Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Head>
      
      <Navigation />
      
      <article className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-neutral-50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              {/* Meta Info */}
              <div className="flex items-center justify-center gap-x-4 text-sm mb-6">
                <span className="bg-black text-white px-3 py-1 rounded-full font-medium">
                  Real Estate
                </span>
                <time className="text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    timeZone: 'UTC'
                  })}
                </time>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">{post.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-24">
          <div className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:hover:text-blue-800
            prose-img:rounded-lg prose-img:my-8"
          >
            {children}
          </div>
        </div>
      </article>
      
      <Footer map="" />
    </>
  )
}
