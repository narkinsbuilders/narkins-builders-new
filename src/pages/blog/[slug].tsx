
// bun add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
// 
import { GetStaticPaths, GetStaticProps } from 'next'
// Might not work, as i requires server components not sure though
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc' 
import { getAllPostsServer, getPostBySlugServer } from '../../lib/blog-server'
import { BlogPost } from '../../lib/blog'
import BlogLayout from '../../components/blog/blog-layout'

interface BlogPostProps {
  post: BlogPost,
  // Content is not nessesary in rendering UI, and increases page size. 
  // mdxSource: MDXRemoteSerializeResult
}

const components = {
  // Custom heading components
  h1: (props: any) => (
    <h1 className="blog-h1" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="blog-h2" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="blog-h3" {...props} />
  ),

  // Custom paragraph with better spacing
  p: (props: any) => (
    <p className="blog-content blog-p" {...props} /> // Apply base content style + specific paragraph spacing
  ),

  // Custom list components
  ul: (props: any) => (
    <ul className="blog-content blog-ul" {...props} />
  ),
  ol: (props: any) => (
    <ol className="blog-content blog-ol" {...props} />
  ),
  li: (props: any) => (
    <li className="blog-content blog-li" {...props} />
  ),

  // Custom link styling
  a: (props: any) => (
    <a className="blog-a" {...props} />
  ),

  // Custom blockquote
  blockquote: (props: any) => (
    <blockquote className="blog-blockquote" {...props} />
  ),

  // Custom code blocks
  code: (props: any) => (
    <code className="blog-code" {...props} />
  ),

  // Custom pre blocks for code
  pre: (props: any) => (
    <pre className="blog-pre" {...props} />
  ),

  // Custom table styling
  table: (props: any) => (
    <div className="blog-table-container">
      <table className="blog-table" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="blog-th" {...props} />
  ),
  td: (props: any) => (
    <td className="blog-td" {...props} />
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
    <div className="blog-cta-base blog-cta-blue">
      <h3 className="blog-cta-title text-blue-900">{title}</h3>
      <p className="blog-cta-desc text-blue-700">{description}</p>
      <a
        href={buttonLink}
        className="blog-cta-button blog-cta-button-blue"
      >
        {buttonText}
      </a>
    </div>
  ),

  // Custom contact CTA
  ContactCTA: () => (
    <div className="blog-cta-base blog-cta-green">
      <h3 className="blog-cta-title text-green-900">
        Ready to Invest in Bahria Town?
      </h3>
      <p className="blog-cta-desc text-green-700">
        Contact Narkin's Builders for expert guidance on your real estate investment.
      </p>
      <a
        href="tel:+923203243970"
        className="blog-cta-button blog-cta-button-green mr-4"
      >
        Call Now: +92-320-324-3970
      </a>
      <a
        href="https://wa.me/923203243970"
        className="blog-cta-button blog-cta-button-green"
      >
        WhatsApp Us
      </a>
    </div>
  ),

  // Market Table component
  MarketTable: ({ data }: { data?: any[] }) => (
    <div className="blog-table-container">
      <table className="blog-table">
        <thead className="bg-gray-50">
          <tr>
            <th className="blog-th">
              Property Type
            </th>
            <th className="blog-th">
              Average Price
            </th>
            <th className="blog-th">
              Size
            </th>
            <th className="blog-th">
              ROI
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="blog-td font-medium text-gray-900">
              2 Bedroom Apartment
            </td>
            <td className="blog-td text-gray-900">
              PKR 1.2 - 1.8 Crore
            </td>
            <td className="blog-td text-gray-900">
              900-1200 sq ft
            </td>
            <td className="blog-td text-green-600 font-medium">
              8-12%
            </td>
          </tr>
          <tr>
            <td className="blog-td font-medium text-gray-900">
              3 Bedroom Apartment
            </td>
            <td className="blog-td text-gray-900">
              PKR 1.8 - 2.5 Crore
            </td>
            <td className="blog-td text-gray-900">
              1200-1500 sq ft
            </td>
            <td className="blog-td text-green-600 font-medium">
              10-15%
            </td>
          </tr>
          <tr>
            <td className="blog-td font-medium text-gray-900">
              Luxury Apartment
            </td>
            <td className="blog-td text-gray-900">
              PKR 2.5 - 4 Crore
            </td>
            <td className="blog-td text-gray-900">
              1500+ sq ft
            </td>
            <td className="blog-td text-green-600 font-medium">
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
    <div className="blog-property-card">
      {image && (
        <div className="blog-property-image-wrapper">
          <img
            src={image}
            alt={title}
            className="blog-property-image"
          />
        </div>
      )}
      <div className="blog-property-content">
        <h3 className="blog-property-title">{title}</h3>
        <div className="blog-property-price-size">
          <span className="blog-property-price">{price}</span>
          <span className="blog-property-size">{size}</span>
        </div>
        {features && features.length > 0 && (
          <ul className="blog-property-features-list">
            {features.map((feature, index) => (
              <li key={index} className="blog-property-feature-item">{feature}</li>
            ))}
          </ul>
        )}
        {link && (
          <a
            href={link}
            className="blog-property-button"
          >
            View Details
          </a>
        )}
      </div>
    </div>
  )
}

export default function BlogPost({ post: {content, ...post} }: BlogPostProps) {
  return (
    <BlogLayout post={post}>
      <div className="prose prose-lg max-w-none mx-auto">
        <MDXRemote source={content} components={components} lazy={true} />
      </div>
      <style>{`
/* Base styles for the blog content */
.blog-content {
  @apply text-gray-700 leading-relaxed;
}

/* Headings */
.blog-h1 {
  @apply text-4xl font-bold text-gray-900 mt-8 mb-6;
}
.blog-h2 {
  @apply text-3xl font-bold text-gray-900 mt-12 mb-6;
}
.blog-h3 {
  @apply text-2xl font-semibold text-gray-900 mt-8 mb-4;
}

/* Paragraph */
.blog-p {
  @apply mb-6; /* Inherits text-gray-700 leading-relaxed from blog-content */
}

/* Lists */
.blog-ul {
  @apply list-disc list-inside mb-6 space-y-2; /* Inherits text-gray-700 from blog-content */
}
.blog-ol {
  @apply list-decimal list-inside mb-6 space-y-2; /* Inherits text-gray-700 from blog-content */
}
.blog-li {
  /* Inherits text-gray-700 leading-relaxed from blog-content */
}

/* Links */
.blog-a {
  @apply text-blue-600 hover:text-blue-800 hover:underline font-medium;
}

/* Blockquote */
.blog-blockquote {
  @apply border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600 bg-blue-50 py-4;
}

/* Inline Code */
.blog-code {
  @apply bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono;
}

/* Preformatted Code Blocks */
.blog-pre {
  @apply bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8;
}

/* Table */
.blog-table-container {
  @apply overflow-x-auto my-8;
}
.blog-table {
  @apply min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg;
}
.blog-th {
  @apply px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}
.blog-td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}


/* CTAs */
.blog-cta-base {
  @apply rounded-lg p-6 my-8;
}

.blog-cta-blue {
  @apply bg-blue-50 border border-blue-200;
}

.blog-cta-green {
  @apply bg-green-50 border border-green-200;
}

.blog-cta-title {
  @apply text-xl font-semibold mb-2;
}

.blog-cta-desc {
  @apply mb-4;
}

.blog-cta-button {
  @apply inline-block px-6 py-3 rounded-lg hover:transition-colors font-medium;
}

.blog-cta-button-blue {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.blog-cta-button-green {
  @apply bg-green-600 text-white hover:bg-green-700;
}


/* Property Card */
.blog-property-card {
  @apply bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden my-6;
}

.blog-property-image-wrapper {
  @apply aspect-[16/9] relative;
}

.blog-property-image {
  @apply w-full h-full object-cover;
}

.blog-property-content {
  @apply p-6;
}

.blog-property-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.blog-property-price-size {
  @apply flex items-center justify-between mb-4;
}

.blog-property-price {
  @apply text-2xl font-bold text-blue-600;
}

.blog-property-size {
  @apply text-gray-500;
}

.blog-property-features-list {
  @apply list-disc list-inside space-y-1 mb-4 text-gray-700;
}

.blog-property-feature-item {
  @apply text-sm;
}

.blog-property-button {
  @apply inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium;
}`}</style>
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

  // ✅ FIXED: Enhanced MDX serialization with better options
  // const mdxSource = await serialize(post.content, {
  //   mdxOptions: {
  //     remarkPlugins: [],
  //     rehypePlugins: [],
  //     development: process.env.NODE_ENV === 'development',
  //   },
  // })

  return {
    props: {
      post,
      // mdxSource
    },
    revalidate: 60
  }
}
