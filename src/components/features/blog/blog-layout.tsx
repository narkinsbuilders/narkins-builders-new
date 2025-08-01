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
          <div className="prose prose-base sm:prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
            prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mt-8 sm:prose-h1:mt-12 prose-h1:mb-6 sm:prose-h1:mb-8
            prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-10 prose-h2:mb-4 sm:prose-h2:mb-6
            prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 sm:prose-h3:mb-4
            prose-p:text-base sm:prose-p:text-lg prose-p:text-gray-700 prose-p:leading-7 sm:prose-p:leading-8 prose-p:mb-4 sm:prose-p:mb-6
            prose-ul:space-y-2 sm:prose-ul:space-y-3 prose-ul:mb-6 sm:prose-ul:mb-8 prose-li:leading-7 sm:prose-li:leading-8
            prose-ol:space-y-2 sm:prose-ol:space-y-3 prose-ol:mb-6 sm:prose-ol:mb-8
            prose-a:text-blue-600 prose-a:hover:text-blue-800
            prose-img:rounded-lg prose-img:my-6 sm:prose-img:my-8 prose-img:cursor-zoom-in"
          >
            {children}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-12">
          <BlogNavigation previousPost={previousPost} nextPost={nextPost} />
        </div>

        {/* Comments Section */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-12">
          <EnhancedCommentsSection blogSlug={post.slug} />
        </div>

        {/* Call to Action */}
<div className="mx-auto max-w-4xl px-6 lg:px-8 mb-12">
  <div className="p-6 lg:p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]" style={{backgroundColor: '#FAFAFA'}}>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Ready to Invest in Bahria Town?
    </h3>
    <p className="text-gray-700 mb-4">
      Contact Narkin's Builders for expert guidance on your real estate investment.
    </p>
    <a
      href="https://api.whatsapp.com/send?phone=923203243970&text=Hi!%20I%20have%20a%20question%20about%20your%20blog%20post."
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
      </svg>
      WhatsApp Us
    </a>
  </div>
</div>
        
      </article>
      
      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
    </>
  )
}