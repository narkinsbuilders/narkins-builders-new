'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';
import { Heart, Clock, ThumbsUp, MoreHorizontal } from 'lucide-react';
import { Comment } from '@/lib/database';
import { motion } from 'framer-motion';

interface EnhancedCommentItemProps {
  comment: Comment;
  onLike?: (commentId: number, liked: boolean, likeCount: number) => void;
  className?: string;
  index?: number;
}

export function EnhancedCommentItem({ comment, onLike, className, index = 0 }: EnhancedCommentItemProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await fetch(`/api/comments/${comment.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
        
        if (onLike) {
          onLike(comment.id, data.liked, data.likeCount);
        }
      }
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-red-500 to-red-600'
    ];
    
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'p-6 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]',
        className
      )}
      style={{backgroundColor: '#FAFAFA'}}
    >
      <div className="flex items-start gap-4">
        {/* Enhanced Avatar */}
        <div className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full text-white text-sm font-semibold shadow-sm',
          'bg-gradient-to-br',
          getAvatarColor(comment.author_name)
        )}>
          {getInitials(comment.author_name)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h4 className="font-semibold text-gray-900 text-base">
                {comment.author_name}
              </h4>
              {comment.auto_approved && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDate(comment.created_at)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap text-sm">
            {comment.content}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={cn(
                  'h-8 px-3 rounded-full transition-all duration-200',
                  'hover:bg-red-50 hover:text-red-600',
                  liked 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-500 hover:text-red-600'
                )}
              >
                <Heart className={cn('h-4 w-4 mr-1.5', liked && 'fill-current')} />
                <span className="text-sm font-medium">{likeCount}</span>
              </Button>

              {/* Reply button - placeholder for future functionality */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                disabled
              >
                <span className="text-sm">Reply</span>
              </Button>
            </div>

            {/* More options - placeholder */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}