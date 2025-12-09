// AICODE-NOTE: IMPL-007 - useRegister hook with state machine
// Coverage: RegistrationState from data-model.md (idle, validating, submitting, error, success)

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser, RegisterRequest, RegistrationError } from '../services/auth.api';

/**
 * Registration state enum per data-model.md
 */
export type RegistrationState = 'idle' | 'validating' | 'submitting' | 'error' | 'success';

/**
 * Registration error with field-specific errors
 */
export interface RegistrationFormError {
  code: string;
  message: string;
  fields?: Record<string, string>;
}

/**
 * Hook return type
 */
export interface UseRegisterReturn {
  state: RegistrationState;
  error: RegistrationFormError | null;
  register: (data: RegisterRequest) => void;
  reset: () => void;
}

/**
 * Custom hook for user registration
 *
 * State machine transitions:
 * - idle -> submitting (on form submit)
 * - submitting -> success (on API 201)
 * - submitting -> error (on API error)
 * - error -> idle (on reset)
 */
export function useRegister(): UseRegisterReturn {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Navigate to dashboard on successful registration
      navigate('/dashboard');
    },
  });

  // Map mutation state to RegistrationState
  const getState = (): RegistrationState => {
    if (mutation.isPending) return 'submitting';
    if (mutation.isError) return 'error';
    if (mutation.isSuccess) return 'success';
    return 'idle';
  };

  // Extract error details
  const getError = (): RegistrationFormError | null => {
    if (!mutation.error) return null;

    if (mutation.error instanceof RegistrationError) {
      return {
        code: mutation.error.code,
        message: mutation.error.message,
        fields: mutation.error.fields,
      };
    }

    // Network or unknown error
    return {
      code: 'network_error',
      message: 'Connection failed. Please check your internet and try again.',
    };
  };

  return {
    state: getState(),
    error: getError(),
    register: mutation.mutate,
    reset: mutation.reset,
  };
}
