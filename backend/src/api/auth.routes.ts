// AICODE-NOTE: IMPL-006 - Auth routes for registration endpoint
// Mounts POST /auth/register per openapi.yaml

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './auth.controller';

/**
 * Create auth routes with injected Prisma client
 */
export function createAuthRoutes(prisma: PrismaClient): Router {
  const router = Router();
  const authController = new AuthController(prisma);

  // POST /auth/register - Create new user account
  // Returns: 201 Created, 400 Validation Error, 409 Conflict (duplicate email)
  router.post('/register', authController.register);

  return router;
}
