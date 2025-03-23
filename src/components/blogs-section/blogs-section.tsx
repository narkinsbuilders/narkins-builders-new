import Link from 'next/link';
import React from 'react';

interface Author {
  name: string;
  role?: string;
  imageUrl?: string;
}

interface Post {
  id: number;
  title: string;
  link: string;
  date: string;
  datetime: string;
  description: string;
  category: string;
  author: Author;
}

interface BlogsSectionProps {
  posts: Post[];
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ posts }) => {
  return (
    <div className="bg-white py-24 sm:py-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            From our blog
          </h2>
          <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">
            Checkout what we're publishing on our blog
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="bg-neutral-50 border p-4 rounded flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <Link href="#" className="relative z-10 rounded-full bg-white px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category || "Uncategorized"}
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link href={post.link}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" dangerouslySetInnerHTML={{ __html: post.description }}></p>
              </div>
              {post.author.name && (
                <div className="relative mt-8 flex items-center gap-x-4">
                  {post.author.imageUrl && (
                    <img src={post.author.imageUrl} alt={post.author.name} className="h-10 w-10 rounded-full bg-gray-50" />
                  )}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    {post.author.role && <p className="text-gray-600">{post.author.role}</p>}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
