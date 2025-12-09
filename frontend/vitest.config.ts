// AICODE-NOTE: Vitest configuration for frontend testing
// Environment: jsdom for React component testing
// Setup file for Testing Library matchers

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test file patterns
    include: ['tests/**/*.{test,spec}.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],

    // Environment: jsdom for React components
    environment: 'jsdom',

    // Inject test APIs globally (describe, it, expect)
    globals: true,

    // Setup file for Testing Library matchers
    setupFiles: ['./tests/setup.ts'],

    // Pass even when no tests are found (like jest --passWithNoTests)
    passWithNoTests: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/index.ts'],
    },

    // Clear mocks between tests
    clearMocks: true,
    restoreMocks: true,
  },
});
