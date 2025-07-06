// src/pages/blog/[slug].tsx - FINAL FIXED VERSION with table processing

import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getAllPostsServer, getPostBySlugServer } from '../../lib/blog-server'
import { BlogPost } from '../../lib/blog'
import BlogLayout from '../../components/blog/blog-layout'

// Add remark plugins for better markdown processing
import remarkGfm from 'remark-gfm'

interface BlogPostProps {
  post: BlogPost
  mdxSource: MDXRemoteSerializeResult
}

// ✅ COMPLETE MDX components with full table support
const components = {
  // ===== BASIC HTML ELEMENTS =====
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="text-gray-700 leading-relaxed" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600 bg-blue-50 py-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8" {...props} />
  ),

  // ===== ENHANCED TABLE COMPONENTS =====
  table: (props: any) => (
    <div className="overflow-x-auto my-8 shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg bg-white" {...props} />
    </div>
  ),
  
  thead: (props: any) => (
    <thead className="bg-gradient-to-r from-blue-50 to-blue-100" {...props} />
  ),
  
  tbody: (props: any) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),
  
  tr: (props: any) => (
    <tr className="hover:bg-gray-50 transition-colors" {...props} />
  ),
  
  th: (props: any) => (
    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider border-b-2 border-blue-200" {...props} />
  ),
  
  td: (props: any) => (
    <td className="px-6 py-4 text-sm text-gray-900 font-medium" {...props} />
  ),

  // ===== CUSTOM COMPONENTS =====
  
  // CallToAction component (Enhanced with contact)
  CallToAction: ({ title, description, buttonText, buttonLink }: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }) => (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-8 my-8 shadow-lg">
      <h3 className="text-2xl font-semibold text-blue-900 mb-3">{title}</h3>
      <p className="text-blue-700 mb-6 text-lg">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={buttonLink}
          className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          {buttonText}
        </a>
        <a
          href="tel:+923203243970"
          className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
        >
          📞 Call: +92-320-324-3970
        </a>
        <a
          href="https://wa.me/923203243970"
          className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-lg"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  ),
  
  // Market comparison table
  PriceComparisonTable: () => (
    <div className="overflow-x-auto my-8 shadow-lg rounded-lg">
      <h4 className="text-xl font-semibold mb-4 text-gray-900">2025 Price Comparison - Bahria Town Karachi</h4>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg bg-white">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Property Type</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Size Range</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Price Range</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">ROI Potential</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2 Bedroom Standard</td>
            <td className="px-6 py-4 text-sm text-gray-700">1,100-1,300 sq ft</td>
            <td className="px-6 py-4 text-sm text-blue-600 font-semibold">PKR 1.2-1.8 Crore</td>
            <td className="px-6 py-4 text-sm text-green-600 font-bold">6-8% Annual</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2 Bedroom Premium</td>
            <td className="px-6 py-4 text-sm text-gray-700">1,300-1,500 sq ft</td>
            <td className="px-6 py-4 text-sm text-blue-600 font-semibold">PKR 1.8-2.5 Crore</td>
            <td className="px-6 py-4 text-sm text-green-600 font-bold">7-9% Annual</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">3 Bedroom Standard</td>
            <td className="px-6 py-4 text-sm text-gray-700">1,500-1,800 sq ft</td>
            <td className="px-6 py-4 text-sm text-blue-600 font-semibold">PKR 2.0-3.0 Crore</td>
            <td className="px-6 py-4 text-sm text-green-600 font-bold">8-10% Annual</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">3 Bedroom Luxury</td>
            <td className="px-6 py-4 text-sm text-gray-700">1,800-2,200 sq ft</td>
            <td className="px-6 py-4 text-sm text-blue-600 font-semibold">PKR 3.0-4.5 Crore</td>
            <td className="px-6 py-4 text-sm text-green-600 font-bold">10-12% Annual</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  // Investment analysis table
  InvestmentAnalysisTable: () => (
    <div className="overflow-x-auto my-8 shadow-lg rounded-lg">
      <h4 className="text-xl font-semibold mb-4 text-gray-900">Investment Performance Analysis (2020-2024)</h4>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg bg-white">
        <thead className="bg-gradient-to-r from-green-50 to-green-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">Year</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">Appreciation Rate</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">Rental Yield</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">Market Activity</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2020</td>
            <td className="px-6 py-4 text-sm text-orange-600 font-semibold">8%</td>
            <td className="px-6 py-4 text-sm text-blue-600">6-8%</td>
            <td className="px-6 py-4 text-sm text-gray-700">Pandemic Impact</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2021</td>
            <td className="px-6 py-4 text-sm text-green-600 font-semibold">16%</td>
            <td className="px-6 py-4 text-sm text-blue-600">7-9%</td>
            <td className="px-6 py-4 text-sm text-gray-700">Market Recovery</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2022</td>
            <td className="px-6 py-4 text-sm text-green-600 font-semibold">22%</td>
            <td className="px-6 py-4 text-sm text-blue-600">8-10%</td>
            <td className="px-6 py-4 text-sm text-gray-700">Strong Demand</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2023</td>
            <td className="px-6 py-4 text-sm text-green-600 font-semibold">18%</td>
            <td className="px-6 py-4 text-sm text-blue-600">9-11%</td>
            <td className="px-6 py-4 text-sm text-gray-700">Sustained Growth</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">2024</td>
            <td className="px-6 py-4 text-sm text-green-600 font-semibold">20%</td>
            <td className="px-6 py-4 text-sm text-blue-600">10-12%</td>
            <td className="px-6 py-4 text-sm text-gray-700">Continued Appreciation</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  // PropertyCard component (Enhanced)
  PropertyCard: ({ 
    title, 
    price, 
    size, 
    features, 
    image, 
    link 
  }: {
    title: string
    price: string
    size?: string
    features?: string[]
    image?: string
    link?: string
  }) => (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden my-8">
      {image && (
        <div className="aspect-[16/9] relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">{price}</span>
          {size && <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded">{size}</span>}
        </div>
        {features && features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
            <ul className="grid grid-cols-1 gap-1 text-gray-600">
              {features.map((feature, index) => (
                <li key={index} className="text-sm flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          {link && (
            <a
              href={link}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View Details
            </a>
          )}
          <a
            href="tel:+923203243970"
            className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
  return (
    <BlogLayout post={post}>
      <div className="prose prose-lg max-w-none mx-auto">
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostsServer()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlugServer(slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  // ✅ ENHANCED: MDX serialization with table processing plugins
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm // Enables GitHub Flavored Markdown including tables
      ],
      rehypePlugins: [],
      development: process.env.NODE_ENV === 'development',
    },
  })

  return {
    props: {
      post,
      mdxSource
    },
    revalidate: 60
  }
}
