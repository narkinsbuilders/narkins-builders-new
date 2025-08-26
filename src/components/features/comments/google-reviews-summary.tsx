'use client';

import React from 'react';
import { GoogleReviewsSummary } from '@/lib/google-reviews-adapter';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GoogleReviewsSummaryCardProps {
  summary: GoogleReviewsSummary;
  onRatingFilter?: (rating: number | null) => void;
  activeFilter?: number | null;
  className?: string;
}

export function GoogleReviewsSummaryCard({ 
  summary, 
  onRatingFilter,
  activeFilter,
  className 
}: GoogleReviewsSummaryCardProps) {
  
  const renderOverallStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />;
      } else if (i === fullStars && hasHalfStar) {
        return (
          <div key={i} className="relative">
            <Star className="h-5 w-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      } else {
        return <Star key={i} className="h-5 w-5 text-gray-300" />;
      }
    });
  };

  const getProgressWidth = (count: number) => {
    return summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
  };

  const handleRatingClick = (rating: number) => {
    if (onRatingFilter) {
      onRatingFilter(activeFilter === rating ? null : rating);
    }
  };

  if (summary.totalReviews === 0) {
    return (
      <div className={cn('bg-white border border-gray-200 rounded-xl p-6', className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to review this article!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('bg-white border border-gray-200 rounded-xl p-6', className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {summary.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-2">
              {renderOverallStars(summary.averageRating)}
            </div>
            <p className="text-sm text-gray-600">
              Based on {summary.totalReviews} review{summary.totalReviews !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = summary.ratingBreakdown[rating as keyof typeof summary.ratingBreakdown];
            const percentage = getProgressWidth(count);
            const isActive = activeFilter === rating;
            
            return (
              <motion.button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={cn(
                  'w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group',
                  isActive 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50',
                  onRatingFilter ? 'cursor-pointer' : 'cursor-default'
                )}
                whileHover={onRatingFilter ? { scale: 1.02 } : {}}
                whileTap={onRatingFilter ? { scale: 0.98 } : {}}
                disabled={!onRatingFilter}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                </div>
                
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={cn(
                        'h-2 rounded-full transition-colors duration-200',
                        isActive ? 'bg-blue-500' : 'bg-amber-400'
                      )}
                      style={{ width: `${percentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: rating * 0.1 }}
                    />
                  </div>
                </div>
                
                <div className="min-w-0 flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {count}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Active Filter Indicator */}
      {activeFilter && onRatingFilter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Showing {activeFilter}-star reviews only</span>
            </div>
            <button
              onClick={() => onRatingFilter(null)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filter
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default GoogleReviewsSummaryCard;