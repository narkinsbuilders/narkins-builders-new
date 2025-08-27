'use client';

import React, { useState } from 'react';
import { GoogleReviewData } from '@/lib/google-reviews-adapter';
import { Star, ThumbsUp, MoreHorizontal, Shield, Verified } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserAvatar } from './user-avatar';

interface GoogleReviewItemProps {
  review: GoogleReviewData;
  onHelpfulVote: (reviewId: string, currentlyVoted: boolean) => void;
  onLike: (reviewId: string) => void;
  index?: number;
}

export function GoogleReviewItem({ 
  review, 
  onHelpfulVote, 
  onLike, 
  index = 0 
}: GoogleReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVotingHelpful, setIsVotingHelpful] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const shouldTruncate = review.text.length > 200;
  const displayText = shouldTruncate && !isExpanded 
    ? `${review.text.substring(0, 200)}...` 
    : review.text;

  const handleHelpfulClick = async () => {
    if (isVotingHelpful) return;
    
    setIsVotingHelpful(true);
    try {
      await onHelpfulVote(review.reviewId, hasVotedHelpful);
      setHasVotedHelpful(!hasVotedHelpful);
    } catch (error) {
      console.error('Error voting helpful:', error);
    } finally {
      setIsVotingHelpful(false);
    }
  };

  const handleLikeClick = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await onLike(review.reviewId);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error('Error liking review:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < rating 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10">
            {review.author.profilePhotoUrl && !imageError ? (
              <Image
                src={review.author.profilePhotoUrl}
                alt={review.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <UserAvatar name={review.author.name} size={40} />
            )}
            {review.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Verified className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 text-sm">
                  {review.author.name}
                </h4>
                {review.author.isLocalGuide && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-full">
                    <Shield className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">Local Guide</span>
                  </div>
                )}
              </div>
              
              {/* Rating and Date */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {review.relativePublishTimeDescription}
                </span>
              </div>
            </div>
            
            {/* More options */}
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Review Content */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
              {displayText}
            </p>
            
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Helpful Button */}
              <button
                onClick={handleHelpfulClick}
                disabled={isVotingHelpful}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  hasVotedHelpful
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 border border-gray-300',
                  isVotingHelpful && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ThumbsUp className={cn(
                  'h-3.5 w-3.5',
                  hasVotedHelpful && 'fill-current'
                )} />
                <span>Helpful</span>
                {(review.helpfulCount || 0) > 0 && (
                  <span className="ml-1">({review.helpfulCount})</span>
                )}
              </button>

              {/* Like Button */}
              <button
                onClick={handleLikeClick}
                disabled={isLiking}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  hasLiked
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-50 border border-gray-300',
                  isLiking && 'opacity-50 cursor-not-allowed'
                )}
              >
                <svg className={cn('h-3.5 w-3.5', hasLiked && 'fill-current')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {(review.likeCount || 0) > 0 && (
                  <span>{review.likeCount}</span>
                )}
              </button>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-gray-700">{review.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GoogleReviewItem;