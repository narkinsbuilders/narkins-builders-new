'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { cn } from '@/lib/utils';
import { Loader2, Send, User, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedCommentFormProps {
  blogSlug: string;
  onCommentSubmitted?: (comment: { id: number; pending: boolean }) => void;
  className?: string;
}

interface CommentFormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

export function EnhancedCommentForm({ blogSlug, onCommentSubmitted, className }: EnhancedCommentFormProps) {
  const [formData, setFormData] = useState<CommentFormData>({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  // Load ReCAPTCHA on component mount
  React.useEffect(() => {
    const loadRecaptcha = async () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    setShowDetailsForm(true);
  };

  const handleBackToComment = () => {
    setShowDetailsForm(false);
  };

  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error('ReCAPTCHA not loaded'));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'comment' })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Execute ReCAPTCHA
      const token = await executeRecaptcha();
      
      const response = await fetch(`/api/comments/by-slug/${blogSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: 'Comment posted successfully! 🎉'
        });
        
        // Reset form
        setFormData({
          authorName: '',
          authorEmail: '',
          content: ''
        });
        setShowDetailsForm(false);

        // Notify parent component
        if (onCommentSubmitted && data.comment) {
          onCommentSubmitted(data.comment);
        }
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to post comment'
        });
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('p-6 rounded-2xl shadow-xl ring-1 ring-gray-900/10 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01]', className)}
      style={className?.includes('bg-transparent') ? {} : {backgroundColor: '#FAFAFA'}}
    >

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'mb-3 p-3 rounded-lg text-sm font-medium',
              {
                'bg-red-50 text-red-700 border border-red-200': message.type === 'error',
                'bg-green-50 text-green-700 border border-green-200': message.type === 'success'
              }
            )}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {!showDetailsForm ? (
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              id="content"
              name="content"
              required
              rows={3}
              value={formData.content}
              onChange={handleInputChange}
              placeholder="What are your thoughts?"
              disabled={isSubmitting}
              className={cn(
                'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm',
                'placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10',
                'disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all',
                'min-h-[80px]'
              )}
              style={{backgroundColor: '#FAFAFA'}}
              maxLength={2000}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {formData.content.length}/2000
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-xs text-gray-500">
            </div>
            
            <Button 
              type="submit" 
              disabled={!formData.content.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 h-9 rounded-lg font-medium transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div className="relative">
            <div className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg border">
              <strong>Your comment:</strong> "{formData.content.substring(0, 100)}{formData.content.length > 100 ? '...' : ''}"
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="authorName"
                name="authorName"
                type="text"
                required
                value={formData.authorName}
                onChange={handleInputChange}
                placeholder="Your name"
                disabled={isSubmitting}
                className="pl-10 h-10 border-gray-200 focus:border-primary transition-colors"
                style={{backgroundColor: '#FAFAFA'}}
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="authorEmail"
                name="authorEmail"
                type="email"
                value={formData.authorEmail}
                onChange={handleInputChange}
                placeholder="your@email.com (optional)"
                disabled={isSubmitting}
                className="pl-10 h-10 border-gray-200 focus:border-primary transition-colors"
                style={{backgroundColor: '#FAFAFA'}}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <Button 
                type="button"
                onClick={handleBackToComment}
                variant="outline"
                disabled={isSubmitting}
                className="px-3 py-2 h-9 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="text-xs text-gray-500">
                Comments are moderated and will appear after review.
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.authorName.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 h-9 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </form>
      )}

    </motion.div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}