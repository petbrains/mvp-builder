// AICODE-NOTE: TEST-004 through TEST-015 - Integration tests for /auth/register endpoint
// Coverage: FR-001, FR-004, FR-005, FR-007 from spec.md
// Contracts: POST /auth/register from openapi.yaml

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Default categories that should be provisioned per FR-005
const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Other',
];

describe('POST /auth/register', () => {
  beforeAll(async () => {
    // Ensure database connection is ready
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await prisma.category.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('Successful Registration (US1)', () => {
    // TEST-004: Test POST /auth/register returns 201 with valid user data
    it('should return 201 with user data for valid registration', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'securePassword123',
        })
        .expect(201);

      // Response should match RegisterResponse from openapi.yaml
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('created_at');
      // Should NOT expose password_hash
      expect(response.body.user).not.toHaveProperty('password_hash');
    });

    // TEST-005: Test registration creates session cookie (HttpOnly)
    it('should set HttpOnly session cookie on successful registration', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'securePassword123',
        })
        .expect(201);

      // Check for Set-Cookie header
      const cookieHeader = response.headers['set-cookie'];
      expect(cookieHeader).toBeDefined();

      // Handle both string and array formats
      const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
      expect(cookies.length).toBeGreaterThan(0);

      // Find session cookie
      const sessionCookie = cookies.find((c: string) => c.includes('session='));
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie).toContain('HttpOnly');
    });

    // TEST-006: Test registration provisions 6 default categories
    it('should provision 6 default categories on successful registration', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'securePassword123',
        })
        .expect(201);

      const userId = response.body.user.id;

      // Query database for user's categories
      const categories = await prisma.category.findMany({
        where: { user_id: userId },
        orderBy: { name: 'asc' },
      });

      expect(categories).toHaveLength(6);

      // Verify all default categories exist
      const categoryNames = categories.map((c) => c.name).sort();
      expect(categoryNames).toEqual([...DEFAULT_CATEGORIES].sort());

      // All should be marked as default
      expect(categories.every((c) => c.is_default === true)).toBe(true);
    });

    // TEST-007: Test email is trimmed before validation
    it('should trim whitespace from email before validation', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: '  test@example.com  ',
          password: 'securePassword123',
        })
        .expect(201);

      // Email should be trimmed and lowercased
      expect(response.body.user.email).toBe('test@example.com');

      // Verify in database
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });
      expect(user).not.toBeNull();
    });
  });

  describe('Validation Errors (US1)', () => {
    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'not-an-email',
          password: 'securePassword123',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'validation_error');
      expect(response.body).toHaveProperty('fields');
      expect(response.body.fields).toHaveProperty('email');
    });

    it('should return 400 for password shorter than 8 characters', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'validation_error');
      expect(response.body).toHaveProperty('fields');
      expect(response.body.fields).toHaveProperty('password');
    });

    it('should return 400 for missing email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          password: 'securePassword123',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'validation_error');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'validation_error');
    });
  });

  describe('Duplicate Email Error (US2)', () => {
    // TEST-014: Test POST /auth/register returns 409 for duplicate email
    it('should return 409 when email is already registered', async () => {
      // First registration should succeed
      await request(app)
        .post('/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'securePassword123',
        })
        .expect(201);

      // Second registration with same email should fail
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'differentPassword456',
        })
        .expect(409);

      // TEST-015: Test 409 response includes error type email_taken
      expect(response.body).toHaveProperty('error', 'email_taken');
      expect(response.body).toHaveProperty('message');
    });

    it('should detect duplicate email case-insensitively', async () => {
      // First registration
      await request(app)
        .post('/auth/register')
        .send({
          email: 'Test@Example.com',
          password: 'securePassword123',
        })
        .expect(201);

      // Second registration with different case should fail
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'differentPassword456',
        })
        .expect(409);

      expect(response.body).toHaveProperty('error', 'email_taken');
    });
  });
});
