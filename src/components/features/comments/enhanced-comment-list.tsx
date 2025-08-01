'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedCommentItem } from './enhanced-comment-item';
import { cn } from '@/lib/utils';
import { MessageSquare, RefreshCw, AlertCircle, Users, TrendingUp } from 'lucide-react';
import { Comment } from '@/lib/database';
import { Button } from '@/components/common/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedCommentListProps {
  blogSlug: string;
  initialComments?: Comment[];
  refreshTrigger?: number;
  className?: string;
}

export function EnhancedCommentList({ 
  blogSlug, 
  initialComments = [], 
  refreshTrigger, 
  className 
}: EnhancedCommentListProps) {
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
      <div className={cn('', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-gray-600">Loading comments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-3xl shadow-2xl ring-1 ring-gray-900/10 overflow-hidden', className)} style={className?.includes('bg-transparent') ? {} : {backgroundColor: '#FAFAFA'}}>
      {/* Stats and Refresh Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {stats.totalComments} comment{stats.totalComments !== 1 ? 's' : ''}
          </div>
          {stats.totalLikes > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>{stats.totalLikes} likes</span>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
        </Button>
      </div>

      {/* Comments */}
      <div>
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
              <p className="text-gray-500 max-w-sm mx-auto">
                Be the first to share your thoughts on this article!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <EnhancedCommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={handleCommentLike}
                  index={index}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}