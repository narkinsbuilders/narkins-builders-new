'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
}

interface BlogNavigationProps {
  previousPost?: BlogPost;
  nextPost?: BlogPost;
  className?: string;
}

export function BlogNavigation({ previousPost, nextPost, className = '' }: BlogNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <div className={`p-6 lg:p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] ${className}`} style={{backgroundColor: '#FAFAFA'}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        {previousPost ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/blog/${previousPost.slug}`} className="group block">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white bg-opacity-50 hover:bg-opacity-80 transition-all duration-300">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Previous Article</p>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {previousPost.title}
                  </h3>
                  {previousPost.excerpt && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {previousPost.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div></div>
        )}

        {/* Next Post */}
        {nextPost ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:text-right"
          >
            <Link href={`/blog/${nextPost.slug}`} className="group block">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white bg-opacity-50 hover:bg-opacity-80 transition-all duration-300 md:flex-row-reverse md:text-right">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Next Article</p>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {nextPost.title}
                  </h3>
                  {nextPost.excerpt && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {nextPost.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default BlogNavigation;