import Navigation from '@/components/navigation/navigation'
import Footer from '@/components/footer/footer'
import Head from 'next/head'
import Image from 'next/image'
import { BlogPost } from '../../lib/blog'
import { BlogPostSchema } from '@/components/schema/BlogPostSchema';

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Narkin's Builders" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Head>
           
      { /* ADD THIS SCHEMA COMPONENT  */ }
      <BlogPostSchema 
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        image={post.image}
        url={`https://narkinsbuilders.com/blog/${post.slug}`}
      />

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
                  {(() => {
                    try {
                      return new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        timeZone: 'UTC'
                      });
                    } catch (error) {
                      return 'Date unavailable';
                    }
                  })()}
                </time>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">{post.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>
              )}
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
        <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-12">
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

        {/* Call to Action */}
<div className="mx-auto max-w-4xl px-6 lg:px-8 mb-12">
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Ready to Invest in Bahria Town?
    </h3>
    <p className="text-gray-700 mb-4">
      Contact Narkin's Builders for expert guidance on your real estate investment.
    </p>
    <a
      href="tel:+923203243970"
      className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
    >
      Call Now: +92-320-324-3970
    </a>
  </div>
</div>
        
      </article>
      
      <Footer map="" />
    </>
  )
}