// AICODE-NOTE: Zod validation schemas for authentication (frontend)
// Constants from data-model.md: PASSWORD_MIN_LENGTH=8, EMAIL_MAX_LENGTH=255
// Mirrors backend validation for client-side validation per FR-001

import { z } from 'zod';

// Constants from data-model.md
export const PASSWORD_MIN_LENGTH = 8;
export const EMAIL_MAX_LENGTH = 255;

/**
 * Email validation schema
 * - Must be valid email format
 * - Trimmed before validation (FR-001)
 * - Max 255 characters
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`)
  .email('Please enter a valid email address');

/**
 * Password validation schema
 * - Minimum 8 characters (FR-002)
 */
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);

/**
 * Registration form schema
 */
export const registerFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
