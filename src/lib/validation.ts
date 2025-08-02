// Input validation schemas for comment system

import { z } from 'zod';

// Comment creation schema
export const createCommentSchema = z.object({
  blogSlug: z.string().min(1).max(255),
  authorName: z.string().min(1).max(100).trim(),
  authorEmail: z.string().email().max(255).optional().or(z.literal('')),
  content: z.string().min(1).max(2000).trim(),
  recaptchaToken: z.string().min(1)
});

// Admin login schema
export const adminLoginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(1)
});

// Comment moderation schema
export const moderateCommentSchema = z.object({
  approved: z.boolean(),
  reason: z.string().optional()
});

// Like comment schema
export const likeCommentSchema = z.object({
  commentId: z.number().int().positive()
});

// Types derived from schemas
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type ModerateCommentInput = z.infer<typeof moderateCommentSchema>;
export type LikeCommentInput = z.infer<typeof likeCommentSchema>;

// Validation helper
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    const validData = schema.parse(data);
    return { success: true as const, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { 
        success: false as const, 
        error: `${firstError.path.join('.')}: ${firstError.message}` 
      };
    }
    return { success: false as const, error: 'Invalid input' };
  }
}