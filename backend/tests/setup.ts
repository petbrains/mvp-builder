// AICODE-NOTE: Jest test setup file
// Sets up test environment variables before Prisma client initializes
// Uses SQLite for isolated test database

import { config } from 'dotenv';

// Load .env.test if it exists, otherwise use defaults
config({ path: '.env.test' });

// Set test environment variables if not already set
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./test.db';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'test-secret-key-for-testing';
process.env.SESSION_TTL_MS = process.env.SESSION_TTL_MS || '604800000';
process.env.NODE_ENV = 'test';
