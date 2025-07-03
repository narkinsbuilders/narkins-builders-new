import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getAllPostsServer, getPostBySlugServer } from '../../lib/blog-server'
import { BlogPost } from '../../lib/blog'
import BlogLayout from '../../components/blog/blog-layout'

interface BlogPostProps {
  post: BlogPost
  mdxSource: MDXRemoteSerializeResult
}

// ✅ FIXED: Enhanced MDX components for better content rendering
const components = {
  // Custom heading components
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props} />
  ),
  
  // Custom paragraph with better spacing
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-6" {...props} />
  ),
  
  // Custom list components
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="text-gray-700 leading-relaxed" {...props} />
  ),
  
  // Custom link styling
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" {...props} />
  ),
  
  // Custom blockquote
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600 bg-blue-50 py-4" {...props} />
  ),
  
  // Custom code blocks
  code: (props: any) => (
    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  
  // Custom pre blocks for code
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8" {...props} />
  ),
  
  // Custom table styling
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />
  ),
  
  // Custom CTA component for within blog posts
  CallToAction: ({ 
    title, 
    description, 
    buttonText, 
    buttonLink 
  }: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700 mb-4">{description}</p>
      <a
        href={buttonLink}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {buttonText}
      </a>
    </div>
  ),
  
  // Custom contact CTA
  ContactCTA: () => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
      <h3 className="text-xl font-semibold text-green-900 mb-2">
        Ready to Invest in Bahria Town?
      </h3>
      <p className="text-green-700 mb-4">
        Contact Narkin's Builders for expert guidance on your real estate investment.
      </p>
      <a
        href="tel:+923203243970"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mr-4"
      >
        Call Now: +92-320-324-3970
      </a>
      <a
        href="https://wa.me/923203243970"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        WhatsApp Us
      </a>
    </div>
  ),
  
  // Market Table component
  MarketTable: ({ data }: { data?: any[] }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Average Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ROI
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              2 Bedroom Apartment
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              PKR 1.2 - 1.8 Crore
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              900-1200 sq ft
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
              8-12%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              3 Bedroom Apartment
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              PKR 1.8 - 2.5 Crore
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              1200-1500 sq ft
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
              10-15%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Luxury Apartment
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              PKR 2.5 - 4 Crore
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              1500+ sq ft
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
              12-18%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  
  // Property Card component
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
    size: string
    features: string[]
    image?: string
    link?: string
  }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden my-6">
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">{price}</span>
          <span className="text-gray-500">{size}</span>
        </div>
        {features && features.length > 0 && (
          <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">{feature}</li>
            ))}
          </ul>
        )}
        {link && (
          <a
            href={link}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </a>
        )}
      </div>
    </div>
  )
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
  return (
    <BlogLayout post={post}>
      {/* ✅ FIXED: Proper MDX content container with enhanced typography */}
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
    fallback: false
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

  // ✅ FIXED: Enhanced MDX serialization with better options
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [],
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