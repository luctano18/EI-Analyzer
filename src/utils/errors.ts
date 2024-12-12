import { ErrorResponse } from '../types';
import toast from 'react-hot-toast';

export function handleError(error: unknown): ErrorResponse {
  console.error('Error:', error);

  if (error instanceof Error) {
    toast.error(error.message);
    return { message: error.message };
  }

  const message = 'An unexpected error occurred';
  toast.error(message);
  return { message };
}

export function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'message' in response;
}