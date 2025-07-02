import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import BlogLayout from '@/components/blog/blog-layout'
import { mdxComponents } from '@/components/blog/mdx-components'
import { getAllPosts, getPostBySlug, type BlogPost } from '@/lib/blog'

interface BlogPostProps {
  post: BlogPost
  mdxSource: MDXRemoteSerializeResult
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <BlogLayout
      title={post.title}
      date={post.date}
      category={post.category}
      readTime={post.readTime}
      featuredImage={post.featuredImage}
    >
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true
    }
  }

  const post = getPostBySlug(params.slug as string)
  
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
    }
  }
}
