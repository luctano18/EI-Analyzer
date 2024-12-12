export * from './database';
export * from './auth';
export * from './forms';
export * from './ui';

export type ErrorResponse = {
  message: string;
  code?: string;
  details?: unknown;
};

export type SuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;