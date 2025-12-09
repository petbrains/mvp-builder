// AICODE-NOTE: TEST-008 through TEST-013 - Tests for SignUpForm and useRegister hook
// Coverage: RegistrationState from data-model.md (idle, validating, submitting, error, success)
// Coverage: UX-001, UX-004, UX-005 from spec.md

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { SignUpForm } from '../src/components/SignUpForm';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Create fresh QueryClient for each test
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

// Wrapper component with providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  describe('Registration State Machine (TDD Cycle 3)', () => {
    // TEST-008: Test state transition idle -> submitting on form submit
    it('should transition from idle to submitting state on form submit', async () => {
      const user = userEvent.setup();

      // Mock pending API call (never resolves during this test)
      mockFetch.mockImplementation(() => new Promise(() => {}));

      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      // Fill in valid form data
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword123');

      // Submit form
      await user.click(screen.getByRole('button', { name: /sign up/i }));

      // Should show loading state (submitting) - button text changes to "Creating account..."
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
      });
    });

    // TEST-009: Test state transition submitting -> success on API 201
    it('should transition from submitting to success state on API 201 response', async () => {
      const user = userEvent.setup();

      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          user: {
            id: '123',
            email: 'test@example.com',
            created_at: new Date().toISOString(),
          },
        }),
      });

      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      // Fill and submit form
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword123');
      await user.click(screen.getByRole('button', { name: /sign up/i }));

      // Wait for success state
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    // TEST-010: Test state transition submitting -> error on API error
    it('should transition from submitting to error state on API error', async () => {
      const user = userEvent.setup();

      // Mock API error response (409 - email taken)
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({
          error: 'email_taken',
          message: 'This email is already registered.',
        }),
      });

      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      // Fill and submit form
      await user.type(screen.getByLabelText(/email/i), 'existing@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword123');
      await user.click(screen.getByRole('button', { name: /sign up/i }));

      // Wait for error state
      await waitFor(() => {
        expect(screen.getByText(/already registered/i)).toBeInTheDocument();
      });

      // Form should be re-enabled after error
      expect(screen.getByRole('button', { name: /sign up/i })).not.toBeDisabled();
    });
  });

  describe('SignUp Form UI (TDD Cycle 4)', () => {
    // TEST-011: Test form autofocuses email field on mount
    it('should autofocus email field on mount', () => {
      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveFocus();
    });

    // TEST-012: Test form submits on Enter key
    it('should submit form when Enter key is pressed in password field', async () => {
      const user = userEvent.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          user: { id: '123', email: 'test@example.com', created_at: new Date().toISOString() },
        }),
      });

      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword123');

      // Press Enter to submit
      await user.keyboard('{Enter}');

      // Should have called the API
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });

    // TEST-013: Test successful registration redirects to dashboard
    it('should redirect to dashboard on successful registration', async () => {
      const user = userEvent.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          user: { id: '123', email: 'test@example.com', created_at: new Date().toISOString() },
        }),
      });

      render(
        <TestWrapper>
          <SignUpForm />
        </TestWrapper>
      );

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword123');
      await user.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });
  });
});
