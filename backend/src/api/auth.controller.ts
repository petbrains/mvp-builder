// AICODE-NOTE: IMPL-003 - AuthController for registration endpoint
// Implements POST /auth/register per openapi.yaml
// Coverage: FR-001, FR-004, FR-005, FR-007 from spec.md

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { registerRequestSchema } from '../schemas/auth.schema';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

// Session TTL from environment (default 7 days)
const SESSION_TTL_MS = parseInt(process.env.SESSION_TTL_MS || '604800000', 10);

/**
 * AuthController handles authentication-related HTTP endpoints
 */
export class AuthController {
  private authService: AuthService;
  private userRepository: UserRepository;

  constructor(prisma: PrismaClient) {
    this.authService = new AuthService();
    this.userRepository = new UserRepository(prisma);
  }

  /**
   * POST /auth/register
   * Creates new user account with default categories and session
   *
   * Response codes per openapi.yaml:
   * - 201: User created successfully
   * - 400: Validation error
   * - 409: Email already registered
   */
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body with Zod (FR-001 email validation, FR-002 password validation)
      const validatedData = registerRequestSchema.parse(req.body);

      // Check for duplicate email (FR-004)
      const existingUser = await this.userRepository.findByEmail(validatedData.email);
      if (existingUser) {
        res.status(409).json({
          error: 'email_taken',
          message: 'This email is already registered. Try logging in instead.',
        });
        return;
      }

      // Hash password (FR-003)
      const passwordHash = await this.authService.hashPassword(validatedData.password);

      // Create user with default categories in transaction (FR-005)
      const { user } = await this.userRepository.createWithDefaultCategories({
        email: validatedData.email,
        password_hash: passwordHash,
      });

      // Create session (FR-007)
      const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
      const session = await this.userRepository.createSession(user.id, expiresAt);

      // Set HttpOnly session cookie
      res.cookie('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
      });

      // Return success response per openapi.yaml RegisterResponse
      res.status(201).json({
        user: this.userRepository.toPublic(user),
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert Zod errors to ValidationError format per openapi.yaml
        const fields: Record<string, string> = {};
        for (const issue of error.issues) {
          const fieldName = issue.path.join('.');
          fields[fieldName] = issue.message;
        }
        res.status(400).json({
          error: 'validation_error',
          fields,
        });
        return;
      }

      // Pass other errors to error handler middleware
      next(error);
    }
  };
}
