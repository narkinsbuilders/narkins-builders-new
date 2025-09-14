import { GetStaticProps } from 'next'
import { getAllPostsServer } from '../../lib/blog-server-precompiled'
import { BlogPost, generateBlogUrl } from '../../lib/blog'
import Navigation from '@/components/layout/navigation/navigation'
import Footer from '@/components/layout/footer/footer'
import BlogFilter, { BlogFilters } from '@/components/features/blog-filter/blog-filter'
import { filterAndSortPosts } from '../../lib/blog-filter'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface BlogIndexProps {
 posts: BlogPost[]
}

export default function BlogIndex({ posts }: BlogIndexProps) {
 // Filter state
 const [filters, setFilters] = useState<BlogFilters>({
  contentType: 'all',
  sortOrder: 'newest',
  readTime: 'all',
 });

 // Filter and sort posts
 const filteredPosts = filterAndSortPosts(posts, filters);

 // Define the newest blogs that have image loading issues
 const newestBlogImages = [
  '/images/blog-images/gated-community-karachi.webp',
  '/images/blog-images/karachi-brt-development.webp', 
  '/images/blog-images/karachi-skyline-2025.webp',
  '/images/blog-images/luxury-apartments-bahria-town-night-view.webp',
  '/images/blog-images/karachi-high-rise-skyline.webp',
  '/images/blog-images/bahria-town-karachi-investment-opportunity.webp'
 ];

 // Check if this is a problematic new blog image
 const isNewBlogImage = (imagePath: string) => newestBlogImages.includes(imagePath);

 // Add cache busting for blog images (updates daily)
 const addCacheBuster = (imagePath: string) => {
  if (imagePath.includes('/images/blog-images/')) {
   // Special one-time cache buster for recently updated image
   if (imagePath.includes('bahria-town-karachi-investment-opportunity.webp')) {
    return `${imagePath}?v=2025-07-29-update`;
   }
   const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
   return `${imagePath}?v=${today}`;
  }
  return imagePath;
 };

 // Preload new blog images to warm up the cache
 useEffect(() => {
  newestBlogImages.forEach(imagePath => {
   const link = document.createElement('link');
   link.rel = 'preload';
   link.as = 'image';
   link.href = imagePath;
   document.head.appendChild(link);
  });
 }, []);

 return (
  <>
   <Head>
    <title>Real Estate Blog | Narkin's Builders</title>
    <meta name="description" content="Latest insights on real estate investment in Bahria Town Karachi" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <link rel="canonical" href="https://narkinsbuilders.com/blog" />
    
    {/* Preload new blog images to fix loading issues */}
    {newestBlogImages.map((imagePath, index) => (
     <link key={index} rel="preload" as="image" href={imagePath} />
    ))}
   </Head>

   <Navigation />

   <div className="bg-white min-h-screen">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-neutral-50 to-white py-20 sm:py-28 lg:py-32">
     <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center">
       <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl mb-4">
        Narkin's Builders Blog
       </h1>
       <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
        Latest insights on real estate investment in Bahria Town Karachi
       </p>
      </div>
     </div>
    </div>

    {/* Blog Filter */}
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 pb-8">
     <BlogFilter 
      filters={filters} 
      onFiltersChange={setFilters}
      totalPosts={posts.length}
      filteredCount={filteredPosts.length}
      posts={posts}
     />
    </div>

    {/* Blog Posts Grid */}
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
     {filteredPosts.length > 0 ? (
       <div className="grid gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
        <article key={post.slug} 
         className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 group">
         <Link href={generateBlogUrl(post)}>
          <div className="cursor-pointer">
           <div className="aspect-[16/9] relative">
            <Image
             src={addCacheBuster(post.image)}
             alt={post.title}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-500"
             priority={posts.indexOf(post) < 6}
             onError={(e) => {
              console.error('Failed to load image:', post.image);
              // Fallback to default image
              const target = e.target as HTMLImageElement;
              target.src = '/images/narkins-builders-logo.webp';
             }}
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             unoptimized={isNewBlogImage(post.image)}
            />
           </div>
           <div className="p-8">
            <div className="flex items-center gap-2 mb-3">
             <span className="bg-black text-white px-2 py-1 rounded text-xs ">
              Real Estate
             </span>
             <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>
            
            <h2 className="text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
             {post.title}
            </h2>
            
            <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed">
             {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 min-h-[44px]">
             <time dateTime={post.date}>
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
             <span className="text-blue-600 ">Read more →</span>
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
        <h3 className="text-lg text-gray-900 mb-2">No articles match your filters</h3>
        <p className="text-gray-500 text-sm">
         Try adjusting your filter criteria to see more results.
        </p>
       </div>
      </div>
     )}
    </div>
   </div>

   <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
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