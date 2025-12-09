// AICODE-NOTE: IMPL-004 - UserRepository for database operations
// Implements user CRUD operations with Prisma
// Part of FR-004 (email uniqueness), FR-001 (email storage)

import { PrismaClient, User, Category, Session } from '@prisma/client';

// Default categories to provision per FR-005
const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Other',
];

/**
 * Public user data (excludes password_hash)
 * Matches UserPublic from openapi.yaml
 */
export interface UserPublic {
  id: string;
  email: string;
  created_at: Date;
}

/**
 * Data required to create a new user
 */
export interface CreateUserData {
  email: string;
  password_hash: string;
}

/**
 * Repository for user-related database operations
 */
export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Find user by email (case-insensitive)
   * Used for duplicate email detection per FR-004
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  /**
   * Create user with default categories in a single transaction
   * Implements FR-005 (default category provisioning)
   *
   * @param data - User creation data (email, password_hash)
   * @returns Created user and categories
   */
  async createWithDefaultCategories(
    data: CreateUserData
  ): Promise<{ user: User; categories: Category[] }> {
    // AICODE-NOTE: Transaction ensures atomicity - if category creation fails,
    // user creation is rolled back (FR-005 requirement)
    return this.prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: data.email.toLowerCase(),
          password_hash: data.password_hash,
        },
      });

      // Create default categories
      const categories = await Promise.all(
        DEFAULT_CATEGORIES.map((name) =>
          tx.category.create({
            data: {
              user_id: user.id,
              name,
              is_default: true,
            },
          })
        )
      );

      return { user, categories };
    });
  }

  /**
   * Create session for user
   * Implements FR-007 (session creation)
   *
   * @param userId - User ID to create session for
   * @param expiresAt - Session expiration timestamp
   * @param deviceId - Optional device identifier
   * @returns Created session
   */
  async createSession(
    userId: string,
    expiresAt: Date,
    deviceId?: string
  ): Promise<Session> {
    return this.prisma.session.create({
      data: {
        user_id: userId,
        expires_at: expiresAt,
        device_id: deviceId,
      },
    });
  }

  /**
   * Convert User to UserPublic (safe to expose in API response)
   */
  toPublic(user: User): UserPublic {
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
  }
}
