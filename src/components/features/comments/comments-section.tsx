'use client';

import React, { useState } from 'react';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';
import { cn } from '@/lib/utils';
import { Comment } from '@/lib/database';

interface CommentsSectionProps {
  blogSlug: string;
  initialComments?: Comment[];
  className?: string;
}

export function CommentsSection({ blogSlug, initialComments = [], className }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentSubmitted = (comment: { id: number; pending: boolean }) => {
    // Trigger refresh of comment list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Comment Form */}
      <CommentForm 
        blogSlug={blogSlug} 
        onCommentSubmitted={handleCommentSubmitted}
      />
      
      {/* Comments List */}
      <CommentList 
        blogSlug={blogSlug}
        initialComments={initialComments}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default CommentsSection;