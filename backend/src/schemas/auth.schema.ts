// AICODE-NOTE: Zod validation schemas for authentication
// Constants from data-model.md: PASSWORD_MIN_LENGTH=8, EMAIL_MAX_LENGTH=255
// Shared validation logic between client and server per plan.md

import { z } from 'zod';

// Constants from data-model.md
export const PASSWORD_MIN_LENGTH = 8;
export const EMAIL_MAX_LENGTH = 255;

/**
 * Email validation schema
 * - Must be valid email format (RFC 5322 simplified)
 * - Trimmed before validation (FR-001)
 * - Max 255 characters
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`)
  .email('Please enter a valid email address')
  .transform((email) => email.toLowerCase());

/**
 * Password validation schema
 * - Minimum 8 characters (FR-002)
 * - Boundary: exactly 8 characters must be accepted
 * - No maximum length (allow passphrase)
 */
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);

/**
 * Registration request schema
 * Matches POST /auth/register request body from openapi.yaml
 */
export const registerRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

/**
 * Login request schema (for future use)
 */
export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
