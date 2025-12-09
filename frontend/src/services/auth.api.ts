// AICODE-NOTE: IMPL-008 - Auth API service for registration
// Implements React Query mutation for POST /auth/register

// API base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Registration request data
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Public user data from API response
 */
export interface UserPublic {
  id: string;
  email: string;
  created_at: string;
}

/**
 * Registration response from API
 */
export interface RegisterResponse {
  user: UserPublic;
}

/**
 * API error response
 */
export interface ApiError {
  error: string;
  message?: string;
  fields?: Record<string, string>;
}

/**
 * Custom error class for API errors
 */
export class RegistrationError extends Error {
  public readonly code: string;
  public readonly fields?: Record<string, string>;

  constructor(code: string, message: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'RegistrationError';
    this.code = code;
    this.fields = fields;
  }
}

/**
 * Register a new user account
 * POST /auth/register
 *
 * @param data - Email and password
 * @returns Promise<RegisterResponse> - Created user data
 * @throws RegistrationError on validation or conflict errors
 */
export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for session
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();

    // Map API error codes to user-friendly messages
    switch (response.status) {
      case 400:
        throw new RegistrationError(
          'validation_error',
          'Please check your input and try again.',
          errorData.fields
        );
      case 409:
        throw new RegistrationError(
          'email_taken',
          'This email is already registered. Try logging in instead.'
        );
      case 429:
        throw new RegistrationError(
          'rate_limit',
          'Too many attempts. Please wait a moment and try again.'
        );
      default:
        throw new RegistrationError(
          'server_error',
          'Something went wrong. Please try again later.'
        );
    }
  }

  return response.json();
}
