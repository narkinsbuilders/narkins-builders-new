// src/pages/blog/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getPostBySlugServer } from '../../lib/blog-server'
import type { BlogPost } from '../../lib/blog'
import BlogLayout from '@/components/features/blog/blog-layout'
import components from '@/components/features/blog/mdx-components'
import remarkGfm from 'remark-gfm'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { 
  firstTimeBuyerFAQs,
  investmentGuideFAQs,
  twoBedroomFAQs,
  luxuryApartmentsFAQs,
  generalRealEstateFAQs,
  hillCrestFAQs,
  boutiqueResidencyFAQs,
  apartmentSaleFAQs
} from '@/data/faq-data'

interface BlogPostProps {
  post: BlogPost
  mdxSource: MDXRemoteSerializeResult
}

const createBlogSchema = (post: BlogPost, canonicalUrl: string, imageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
  "headline": post.title,
  "description": post.excerpt,
  "image": { "@type": "ImageObject", "url": imageUrl, "width": 1200, "height": 630 },
  "author": { "@type": "Organization", "name": "Narkin's Builders and Developers", "url": "https://narkinsbuilders.com" },
  "publisher": {
    "@type": "Organization",
    "name": "Narkin's Builders and Developers",
    "logo": { "@type": "ImageObject", "url": "https://narkinsbuilders.com/images/narkins-builders-logo-30-years-experience.webp", "width": 400, "height": 400 }
  },
  "datePublished": post.date,
  "dateModified": post.lastModified || post.date,
  "wordCount": post.content?.split(' ').length || 0,
  "timeRequired": post.readTime || "5 minutes",
  "articleSection": "Real Estate",
  "keywords": ["Bahria Town Karachi", "Real Estate", "Property Investment", "Luxury Apartments", "Narkins Builders"],
  "inLanguage": "en-US",
  "isPartOf": { "@type": "Blog", "@id": "https://narkinsbuilders.com/blog" }
})

const createBreadcrumbSchema = (post: BlogPost, canonicalUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://narkinsbuilders.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://narkinsbuilders.com/blog" },
    { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
  ]
})

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-600">Loading blog post...</p>
  </div>
)

const NotFoundState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
    <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
  </div>
)

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
  const router = useRouter()

  if (router.isFallback) return <LoadingState />
  if (!post?.title) return <NotFoundState />
  
  const canonicalUrl = `https://narkinsbuilders.com/blog/${post.slug}`
  const imageUrl = post.image.startsWith('http') ? post.image : `https://narkinsbuilders.com${post.image}`
  const description = post.excerpt || `Expert real estate insights from Narkin's Builders - ${post.title}`

  const blogSchema = createBlogSchema(post, canonicalUrl, imageUrl)
  const breadcrumbSchema = createBreadcrumbSchema(post, canonicalUrl)

  return (
    <>
      <Head>
        <title>{post.title} | Narkin's Builders Real Estate Blog</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Narkin's Builders and Developers" />
        <meta name="copyright" content="Narkin's Builders and Developers" />
        <meta name="generator" content="Next.js" />
        <meta name="keywords" content="Bahria Town Karachi, luxury apartments, real estate investment, property development, Narkin's Builders" />
        
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" type="application/rss+xml" title="Narkin's Builders Blog RSS Feed" href="https://narkinsbuilders.com/rss.xml" />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:site_name" content="Narkin's Builders" />
        
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.lastModified || post.date} />
        <meta property="article:author" content="Narkin's Builders and Developers" />
        <meta property="article:section" content="Real Estate" />
        <meta property="article:tag" content="Bahria Town Karachi" />
        <meta property="article:tag" content="Real Estate Investment" />
        <meta property="article:tag" content="Property Development" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      
      <BlogLayout post={post}>
        <div className="prose prose-lg max-w-none mx-auto">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </BlogLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const topSlugs = [
    'buying-apartment-bahria-town-first-time-buyer-guide',
    'bahria-town-karachi-property-investment-guide', 
    '2-bedroom-apartments-bahria-town-karachi-guide',
    'luxury-apartments-bahria-town-investment-guide',
    'apartments-for-sale-bahria-town-karachi-2025',
  ]

  return {
    paths: topSlugs.map(slug => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  
  if (!slug) return { notFound: true }
  
  const post = getPostBySlugServer(slug)
  if (!post) return { notFound: true }

  try {
    const mdxSource = await serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        development: process.env.NODE_ENV === 'development',
      },
      scope: {
        firstTimeBuyerFAQs,
        investmentGuideFAQs,
        twoBedroomFAQs,
        luxuryApartmentsFAQs,
        generalRealEstateFAQs,
        hillCrestFAQs,
        boutiqueResidencyFAQs,
        apartmentSaleFAQs
      }
    })

    return {
      props: { post, mdxSource },
      revalidate: 86400,
    }
  } catch (error) {
    console.error('Error serializing MDX:', error)
    return { notFound: true }
  }
}