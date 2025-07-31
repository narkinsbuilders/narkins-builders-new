'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { Avatar } from '@/components/common/ui/avatar';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Clock, User } from 'lucide-react';
import { Comment } from '@/lib/database';

interface CommentItemProps {
  comment: Comment;
  onLike?: (commentId: number, liked: boolean, likeCount: number) => void;
  className?: string;
}

export function CommentItem({ comment, onLike, className }: CommentItemProps) {
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
      } else {
        console.error('Like failed:', data.message);
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
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500'
    ];
    
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className={cn('bg-card p-4 rounded-lg border', className)}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-medium',
          getAvatarColor(comment.author_name)
        )}>
          {getInitials(comment.author_name)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-sm">{comment.author_name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDate(comment.created_at)}</span>
            </div>
            {comment.auto_approved && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                Verified
              </span>
            )}
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap leading-relaxed">
            {comment.content}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={cn(
                'h-auto p-1 text-xs hover:bg-transparent',
                liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              )}
            >
              <Heart className={cn('h-4 w-4 mr-1', liked && 'fill-current')} />
              <span>{likeCount}</span>
            </Button>

            {/* Moderation score indicator (only visible in dev mode) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-muted-foreground">
                Score: {comment.moderation_score.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}