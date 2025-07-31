'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { cn } from '@/lib/utils';
import { Loader2, MessageCircle, Send } from 'lucide-react';

interface CommentFormProps {
  blogSlug: string;
  onCommentSubmitted?: (comment: { id: number; pending: boolean }) => void;
  className?: string;
}

interface CommentFormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

export function CommentForm({ blogSlug, onCommentSubmitted, className }: CommentFormProps) {
  const [formData, setFormData] = useState<CommentFormData>({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

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

      script.onload = () => {
        window.grecaptcha?.ready(() => {
          console.log('ReCAPTCHA loaded');
        });
      };
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

  const handleSubmit = async (e: React.FormEvent) => {
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
          text: data.message
        });
        
        // Reset form
        setFormData({
          authorName: '',
          authorEmail: '',
          content: ''
        });

        // Notify parent component
        if (onCommentSubmitted && data.comment) {
          onCommentSubmitted(data.comment);
        }
      } else {
        setMessage({
          type: 'error',
          text: data.message
        });
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to submit comment. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('bg-card p-6 rounded-lg border', className)}>
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Leave a Comment</h3>
      </div>

      {message && (
        <div className={cn(
          'mb-4 p-3 rounded-md text-sm',
          {
            'bg-destructive/10 text-destructive border border-destructive/20': message.type === 'error',
            'bg-green-50 text-green-700 border border-green-200': message.type === 'success',
            'bg-blue-50 text-blue-700 border border-blue-200': message.type === 'info'
          }
        )}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <Input
              id="authorName"
              name="authorName"
              type="text"
              required
              value={formData.authorName}
              onChange={handleInputChange}
              placeholder="Your name"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <Input
              id="authorEmail"
              name="authorEmail"
              type="email"
              required
              value={formData.authorEmail}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={4}
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
            className={cn(
              'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
              'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50 resize-vertical min-h-[100px]'
            )}
            maxLength={2000}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {formData.content.length}/2000 characters
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Your email will not be published. All comments are moderated.
          </p>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Comment
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-xs text-muted-foreground">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
          Terms of Service
        </a>{' '}
        apply.
      </div>
    </div>
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