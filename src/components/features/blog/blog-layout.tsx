import Navigation from '@/components/layout/navigation/navigation'
import Footer from '@/components/layout/footer/footer'
import Head from 'next/head'
import Image from 'next/image'
import { BlogPost } from '@/lib/blog'
import { BlogPostSchema } from '@/components/common/schema/BlogPostSchema'
import { EnhancedCommentsSection } from '@/components/features/comments/enhanced-comments-section'
import { ReadingProgressBar } from '@/components/features/blog/reading-progress-bar';
import { BlogNavigation } from '@/components/features/blog/blog-navigation';

interface BlogLayoutProps {
  post: BlogPost
  children: React.ReactNode
  previousPost?: { slug: string; title: string; excerpt?: string } | null
  nextPost?: { slug: string; title: string; excerpt?: string } | null
}

export default function BlogLayout({ post, children, previousPost, nextPost }: BlogLayoutProps) {
  return (
    <>
      <Head>
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

      <ReadingProgressBar />
      <Navigation />
      
      <article className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-neutral-50 to-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-16">
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
        <div className="mx-auto max-w-5xl px-6 lg:px-8 pb-16">
          <div className="prose-blog max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
            prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:transition-colors prose-a:duration-200
            prose-img:rounded-xl prose-img:shadow-lg prose-img:cursor-zoom-in prose-img:transition-transform prose-img:duration-300 prose-img:hover:scale-[1.02]
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-em:text-gray-700 prose-em:italic"
          >
            {children}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-16">
          <BlogNavigation previousPost={previousPost} nextPost={nextPost} />
        </div>

        {/* Comments Section */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-16">
          <EnhancedCommentsSection blogSlug={post.slug} />
        </div>

        {/* Call to Action */}
<div className="mx-auto max-w-5xl px-6 lg:px-8 mb-16">
  <div className="relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
    {/* Glass effect overlay */}
    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
    
    <div className="relative z-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Ready to Invest in Bahria Town?
      </h3>
      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
        Contact Narkin's Builders for expert guidance on your real estate investment.
      </p>
      <a
        href="https://api.whatsapp.com/send?phone=923203243970&text=Hi!%20I%20have%20a%20question%20about%20your%20blog%20post."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px]"
      >
        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
        </svg>
        WhatsApp Us
      </a>
    </div>
  </div>
</div>
        
      </article>
      
      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
    </>
  )
}