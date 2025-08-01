'use client';

import React, { useState } from 'react';
import { EnhancedCommentForm } from './enhanced-comment-form';
import { EnhancedCommentList } from './enhanced-comment-list';
import { cn } from '@/lib/utils';
import { Comment } from '@/lib/database';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface EnhancedCommentsSectionProps {
  blogSlug: string;
  initialComments?: Comment[];
  className?: string;
}

export function EnhancedCommentsSection({ 
  blogSlug, 
  initialComments = [], 
  className 
}: EnhancedCommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentSubmitted = (comment: { id: number; pending: boolean }) => {
    // Trigger refresh of comment list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('p-6 lg:p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]', className)}
      style={{backgroundColor: '#FAFAFA'}}
    >
      {/* Unified Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Comments & Discussion</h3>
          <p className="text-sm text-gray-600">Share your thoughts and join the conversation</p>
        </div>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <EnhancedCommentForm 
          blogSlug={blogSlug} 
          onCommentSubmitted={handleCommentSubmitted}
          className="!p-0 !rounded-none !shadow-none !ring-0 !transform-none !transition-none !hover:scale-100 !hover:shadow-none bg-transparent"
        />
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>
      
      {/* Comments List */}
      <EnhancedCommentList 
        blogSlug={blogSlug}
        initialComments={initialComments}
        refreshTrigger={refreshTrigger}
        className="!p-0 !rounded-none !shadow-none !ring-0 !overflow-visible bg-transparent"
      />
    </motion.div>
  );
}

export default EnhancedCommentsSection;