// AICODE-NOTE: Application entry point
// Loads environment variables and starts Express server

import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

// Validate required environment variables on startup (fail fast)
const requiredEnvVars = ['DATABASE_URL', 'SESSION_SECRET'];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`[Fatal] Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please check your .env file or environment configuration.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`[Server] SpendNote API running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
});
