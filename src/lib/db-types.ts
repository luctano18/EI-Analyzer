export interface DatabaseError extends Error {
  code: string;
  message: string;
}

export interface ConnectionStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
}