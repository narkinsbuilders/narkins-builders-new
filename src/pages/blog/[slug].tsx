import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostsServer, getPostBySlugServer } from '../../lib/blog-server'
import { BlogPost } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import BlogLayout from '../../components/blog/blog-layout'

interface BlogPostProps {
  post: BlogPost
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  PropertyCard: ({ title, price, location, bedrooms, bathrooms, area, image }: {
    title: string
    price: string
    location: string
    bedrooms: number
    bathrooms: number
    area: string
    image: string
  }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-6">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">{price}</p>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{bedrooms} Bedrooms</span>
          <span>{bathrooms} Bathrooms</span>
          <span>{area}</span>
        </div>
      </div>
    </div>
  ),
  
  MarketTable: ({ data }: { data: Array<{area: string, avgPrice: string, growth: string}> }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YoY Growth</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.area}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.avgPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{row.growth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  
  CallToAction: ({ title, description, buttonText, buttonLink }: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700 mb-4">{description}</p>
      <a
        href={buttonLink}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {buttonText}
      </a>
    </div>
  )
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
  return (
    <BlogLayout post={post}>
      <MDXRemote {...mdxSource} components={components} />
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

  const mdxSource = await serialize(post.content)

  return {
    props: {
      post,
      mdxSource
    },
    revalidate: 60
  }
}