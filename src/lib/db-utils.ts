import { DatabaseError, ConnectionStats } from './db-types';

// Utility function to format database errors
export function formatDatabaseError(error: DatabaseError): string {
  return `Error Code: ${error.code}\nMessage: ${error.message}`;
}

// Get connection pool statistics
export async function getConnectionStats(): Promise<ConnectionStats> {
  return {
    total: 0,
    active: 0,
    idle: 0,
    waiting: 0
  };
}

// Validate database connection string
export function validateConnectionString(connectionString: string): boolean {
  try {
    const url = new URL(connectionString);
    return !!url.hostname && !!url.pathname.slice(1);
  } catch {
    return false;
  }
}