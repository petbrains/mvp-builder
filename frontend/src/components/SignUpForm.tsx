// AICODE-NOTE: IMPL-009 - SignUpForm component with email/password fields
// Coverage: UX-001 (autofocus), UX-004 (submit always visible), UX-005 (single column)
// Constants: FORM_FIELD_MIN_HEIGHT=44 from data-model.md

import { useRef, useEffect, FormEvent } from 'react';
import { useRegister } from '../hooks/useRegister';

// Constant from data-model.md
const FORM_FIELD_MIN_HEIGHT = 44;

/**
 * Sign up form component
 * - Autofocuses email field on mount (UX-001)
 * - Single column layout on mobile (UX-005)
 * - Submit button always visible (UX-004)
 */
export function SignUpForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { state, error, register, reset } = useRegister();

  // Autofocus email field on mount (UX-001)
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    register({ email, password });
  };

  const isSubmitting = state === 'submitting';
  const hasError = state === 'error' && error;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
      noValidate
    >
      {/* Email field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          aria-invalid={hasError && error?.code === 'email_taken' ? true : undefined}
          aria-describedby={hasError && error?.code === 'email_taken' ? 'email-error' : undefined}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          style={{ minHeight: FORM_FIELD_MIN_HEIGHT }}
          placeholder="you@example.com"
        />
        {/* Inline error for email field */}
        {hasError && error?.code === 'email_taken' && (
          <p
            id="email-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {error.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          disabled={isSubmitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          style={{ minHeight: FORM_FIELD_MIN_HEIGHT }}
          placeholder="At least 8 characters"
        />
      </div>

      {/* General error message */}
      {hasError && error?.code !== 'email_taken' && (
        <div
          className="rounded-md bg-red-50 p-4"
          role="alert"
        >
          <p className="text-sm text-red-700">{error.message}</p>
        </div>
      )}

      {/* Submit button - always visible (UX-004) */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        style={{ minHeight: FORM_FIELD_MIN_HEIGHT }}
      >
        {isSubmitting ? (
          <>
            <span
              data-testid="loading-indicator"
              className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            />
            Creating account...
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
