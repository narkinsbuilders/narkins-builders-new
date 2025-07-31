'use client';

import React, { useState, useEffect } from 'react';
import { CommentItem } from './comment-item';
import { cn } from '@/lib/utils';
import { MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Comment } from '@/lib/database';
import { Button } from '@/components/common/ui/button';

interface CommentListProps {
  blogSlug: string;
  initialComments?: Comment[];
  refreshTrigger?: number; // Trigger refresh when this changes
  className?: string;
}

export function CommentList({ blogSlug, initialComments = [], refreshTrigger, className }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalComments: 0,
    totalLikes: 0
  });

  // Load comments and stats
  const loadComments = async (showLoader = true) => {
    if (showLoader) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      // Load comments and stats in parallel
      const [commentsResponse, statsResponse] = await Promise.all([
        fetch(`/api/comments/by-slug/${blogSlug}`),
        fetch(`/api/comments/stats/${blogSlug}`)
      ]);

      const commentsData = await commentsResponse.json();
      const statsData = await statsResponse.json();

      if (commentsData.success) {
        setComments(commentsData.comments);
      } else {
        setError('Failed to load comments');
      }

      if (statsData.success) {
        setStats({
          totalComments: statsData.stats.totalComments,
          totalLikes: statsData.stats.totalLikes
        });
      }

    } catch (error) {
      console.error('Load comments error:', error);
      setError('Failed to load comments. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load comments on mount
  useEffect(() => {
    if (initialComments.length === 0) {
      loadComments();
    } else {
      // Load stats if we have initial comments
      loadStats();
    }
  }, [blogSlug]);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      loadComments(false);
    }
  }, [refreshTrigger]);

  const loadStats = async () => {
    try {
      const response = await fetch(`/api/comments/stats/${blogSlug}`);
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalComments: data.stats.totalComments,
          totalLikes: data.stats.totalLikes
        });
      }
    } catch (error) {
      console.error('Load stats error:', error);
    }
  };

  const handleCommentLike = (commentId: number, liked: boolean, likeCount: number) => {
    // Update the comment in the list
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: likeCount }
        : comment
    ));

    // Update total likes
    setStats(prev => ({
      ...prev,
      totalLikes: prev.totalLikes + (liked ? 1 : -1)
    }));
  };

  const handleRefresh = () => {
    loadComments(false);
  };

  if (isLoading) {
    return (
      <div className={cn('bg-card p-6 rounded-lg border', className)}>
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading comments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('bg-card p-6 rounded-lg border', className)}>
        <div className="flex items-center justify-center py-8">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <span className="ml-2 text-sm text-destructive">{error}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="ml-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-card rounded-lg border', className)}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">
              Comments ({stats.totalComments})
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            {stats.totalLikes > 0 && (
              <span className="text-sm text-muted-foreground">
                {stats.totalLikes} likes
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="p-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No comments yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={handleCommentLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}