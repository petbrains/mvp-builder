// AICODE-NOTE: IMPL-001, IMPL-002 - AuthService for password hashing and validation
// Implements FR-002 (password validation), FR-003 (argon2 hashing) from spec.md
// Constants from data-model.md: PASSWORD_MIN_LENGTH=8

import * as argon2 from 'argon2';
import { PASSWORD_MIN_LENGTH } from '../schemas/auth.schema';

/**
 * Validation result for password checks
 */
export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * AuthService handles authentication-related operations
 * - Password hashing with argon2 (FR-003)
 * - Password validation (FR-002)
 */
export class AuthService {
  /**
   * Hash a password using argon2id algorithm
   * argon2id is recommended for password hashing (combines argon2i and argon2d benefits)
   *
   * @param password - Plain text password to hash
   * @returns Promise<string> - Argon2 hash string
   */
  async hashPassword(password: string): Promise<string> {
    // AICODE-NOTE: Using argon2id (default) which is recommended for password hashing
    // Salt is automatically generated and embedded in the hash
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MiB
      timeCost: 3,       // 3 iterations
      parallelism: 4,    // 4 parallel threads
    });
  }

  /**
   * Verify a password against a stored hash
   *
   * @param password - Plain text password to verify
   * @param hash - Stored argon2 hash
   * @returns Promise<boolean> - True if password matches
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch {
      // Invalid hash format or verification error
      return false;
    }
  }

  /**
   * Validate password meets requirements
   * - Minimum 8 characters (FR-002, PASSWORD_MIN_LENGTH from data-model.md)
   * - No maximum length (allow passphrase per data-model.md)
   *
   * @param password - Password to validate
   * @returns PasswordValidationResult with valid flag and optional error message
   */
  validatePassword(password: string): PasswordValidationResult {
    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      return {
        valid: false,
        error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
      };
    }

    return { valid: true };
  }
}
