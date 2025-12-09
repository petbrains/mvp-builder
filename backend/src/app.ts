// AICODE-NOTE: Express app configuration per plan.md
// Middleware: JSON body parser, cookie-parser for session handling
// Error handling middleware at the end of chain

import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { createAuthRoutes } from './api/auth.routes';

const app: Express = express();

// Initialize Prisma client
const prisma = new PrismaClient();

// Built-in middleware for parsing JSON requests
app.use(express.json({ limit: '10mb' }));

// URL-encoded body parser for form submissions
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser for session management (HTTP-only cookies per PRD)
app.use(cookieParser(process.env.SESSION_SECRET));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/auth', createAuthRoutes(prisma));

// 404 handler for unmatched routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'not_found', message: 'Endpoint not found' });
});

// Error handling middleware (must have 4 parameters)
// AICODE-NOTE: Error handler catches all errors passed via next(err)
app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err.message);

  const status = err.status || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  res.status(status).json({
    error: 'server_error',
    message
  });
});

export default app;
