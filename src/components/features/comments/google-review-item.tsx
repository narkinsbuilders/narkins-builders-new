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
          'h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5',
          i < rating 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: Math.min(index * 0.05, 0.2),
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 will-change-transform hover:-translate-y-1 lg:hover:border-gray-300 lg:hover:scale-[1.02] w-full max-w-full overflow-hidden"
    >
      <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
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
              <UserAvatar 
                name={review.author.name} 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              />
            )}
            {review.isVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Verified className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-1.5 sm:mb-2 lg:mb-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 lg:mb-2 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                  {review.author.name}
                </h4>
                {review.author.isLocalGuide && (
                  <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-blue-50 rounded-full">
                    <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium hidden sm:inline">Local Guide</span>
                    <span className="text-xs text-blue-600 font-medium sm:hidden">Guide</span>
                  </div>
                )}
              </div>
              
              {/* Rating and Date */}
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 lg:mb-3">
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs sm:text-sm lg:text-base text-gray-500">
                  {review.relativePublishTimeDescription}
                </span>
              </div>
            </div>
            
            {/* More options */}
            <button 
              className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 lg:hover:bg-gray-50 transition-colors min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              title="More options"
            >
              <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>

          {/* Review Content */}
          <div className="mb-3 sm:mb-4 lg:mb-6 w-full max-w-full">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg lg:leading-7 break-all overflow-hidden"
               style={{
                 wordWrap: 'break-word',
                 overflowWrap: 'break-word',
                 wordBreak: 'break-word',
                 hyphens: 'auto',
                 maxWidth: '100%'
               }}>
              {displayText}
            </p>
            
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 lg:hover:text-blue-700 text-sm lg:text-base font-medium mt-1 min-h-[44px] flex items-center -ml-1 px-1 transition-all duration-200 hover:bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-2 border-t border-gray-100 sm:border-t-0 sm:pt-0 lg:pt-4 lg:border-t lg:border-gray-100">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Helpful Button */}
              <button
                onClick={handleHelpfulClick}
                disabled={isVotingHelpful}
                title={hasVotedHelpful ? 'Remove helpful vote' : 'Mark as helpful'}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-200 min-h-[44px] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                  hasVotedHelpful
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 lg:hover:bg-gray-100 border border-gray-300 hover:border-gray-400',
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
                title={hasLiked ? 'Unlike this review' : 'Like this review'}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-200 min-h-[44px] group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1',
                  hasLiked
                    ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    : 'text-gray-600 hover:bg-gray-50 lg:hover:bg-gray-100 border border-gray-300 hover:border-gray-400',
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
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full self-start sm:self-center">
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