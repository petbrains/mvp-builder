// AICODE-NOTE: TEST-001, TEST-002, TEST-003 - Tests for AuthService password hashing
// Coverage: FR-002, FR-003 from spec.md
// Constants: PASSWORD_MIN_LENGTH=8 from data-model.md

import { describe, it, expect } from '@jest/globals';

// Import will fail until implementation exists - this is expected in RED phase
import { AuthService } from '../src/services/auth.service';
import { PASSWORD_MIN_LENGTH } from '../src/schemas/auth.schema';

describe('AuthService', () => {
  describe('Password Hashing (FR-003)', () => {
    // TEST-001: Test password hashing with argon2 produces valid hash
    it('should hash password with argon2 and produce valid hash', async () => {
      const authService = new AuthService();
      const password = 'securePassword123';

      const hash = await authService.hashPassword(password);

      // Argon2 hashes start with $argon2 prefix
      expect(hash).toMatch(/^\$argon2/);
      // Hash should be different from original password
      expect(hash).not.toBe(password);
      // Hash should be reasonably long (argon2 hashes are ~90+ chars)
      expect(hash.length).toBeGreaterThan(50);
    });

    it('should produce different hashes for same password (salt)', async () => {
      const authService = new AuthService();
      const password = 'securePassword123';

      const hash1 = await authService.hashPassword(password);
      const hash2 = await authService.hashPassword(password);

      // Each hash should be unique due to random salt
      expect(hash1).not.toBe(hash2);
    });

    it('should verify correct password against hash', async () => {
      const authService = new AuthService();
      const password = 'securePassword123';

      const hash = await authService.hashPassword(password);
      const isValid = await authService.verifyPassword(password, hash);

      expect(isValid).toBe(true);
    });

    it('should reject incorrect password against hash', async () => {
      const authService = new AuthService();
      const password = 'securePassword123';
      const wrongPassword = 'wrongPassword456';

      const hash = await authService.hashPassword(password);
      const isValid = await authService.verifyPassword(wrongPassword, hash);

      expect(isValid).toBe(false);
    });
  });

  describe('Password Validation (FR-002)', () => {
    // TEST-002: Test password validation rejects < 8 characters
    it('should reject password shorter than minimum length', () => {
      const authService = new AuthService();

      // 7 characters - should fail
      const result = authService.validatePassword('1234567');

      expect(result.valid).toBe(false);
      expect(result.error).toContain(`${PASSWORD_MIN_LENGTH}`);
    });

    it('should reject empty password', () => {
      const authService = new AuthService();

      const result = authService.validatePassword('');

      expect(result.valid).toBe(false);
    });

    // TEST-003: Test password validation accepts exactly 8 characters (boundary)
    it('should accept password with exactly minimum length (boundary test)', () => {
      const authService = new AuthService();

      // Exactly 8 characters - should pass (boundary from data-model.md)
      const result = authService.validatePassword('12345678');

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept password longer than minimum length', () => {
      const authService = new AuthService();

      // 20 characters - should pass
      const result = authService.validatePassword('securePasswordHere12');

      expect(result.valid).toBe(true);
    });

    it('should accept very long passphrase (no maximum per data-model.md)', () => {
      const authService = new AuthService();

      // Very long passphrase - should pass (no max length per data-model.md)
      const longPassword = 'a'.repeat(200);
      const result = authService.validatePassword(longPassword);

      expect(result.valid).toBe(true);
    });
  });
});
