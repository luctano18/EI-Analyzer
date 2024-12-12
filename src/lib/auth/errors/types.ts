export interface AuthErrorDetails {
  code: string;
  status: number;
  message: string;
}

export class AuthenticationError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class ServerError extends AuthenticationError {
  constructor(message = 'An unexpected server error occurred. Please try again later.') {
    super(message, 'server_error', 500);
  }
}

export class NetworkError extends AuthenticationError {
  constructor(message = 'Unable to connect to the server. Please check your internet connection.') {
    super(message, 'network_error', 0);
  }
}