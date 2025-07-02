import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogLayout from '@/components/blog/blog-layout'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getPostBySlug } from '@/lib/blog'
import { mdxComponents } from '@/components/blog/mdx-components'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [mdxSource, setMdxSource] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return

    async function loadPost() {
      try {
        const postData = getPostBySlug(slug)
        if (postData) {
          const mdxSource = await serialize(postData.content)
          setPost(postData)
          setMdxSource(mdxSource)
        }
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!post || !mdxSource) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>
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
