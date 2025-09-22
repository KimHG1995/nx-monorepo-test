// RFC 7807 Problem Details for HTTP APIs
export interface ProblemDetail {
  type: string; // A URI reference that identifies the problem type
  title: string; // A short, human-readable summary of the problem type
  status: number; // The HTTP status code
  detail?: string; // A human-readable explanation specific to this occurrence
  instance?: string; // A URI reference that identifies the specific occurrence
  [key: string]: any; // Additional properties
}

// Standard problem types
export const PROBLEM_TYPES = {
  VALIDATION_ERROR: 'https://example.com/problems/validation-error',
  BUSINESS_ERROR: 'https://example.com/problems/business-error',
  DATABASE_ERROR: 'https://example.com/problems/database-error',
  AUTHENTICATION_ERROR: 'https://example.com/problems/authentication-error',
  AUTHORIZATION_ERROR: 'https://example.com/problems/authorization-error',
  NOT_FOUND_ERROR: 'https://example.com/problems/not-found-error',
  INTERNAL_SERVER_ERROR: 'https://example.com/problems/internal-server-error',
} as const;

// Common API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  problem?: ProblemDetail;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Health check types
export interface HealthCheckResult {
  status: 'up' | 'down';
  error?: string;
  details?: Record<string, any>;
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  info: Record<string, HealthCheckResult>;
  error?: Record<string, HealthCheckResult>;
  details: Record<string, HealthCheckResult>;
}

// Utility functions
export const createApiResponse = <T>(
  data: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (problem: ProblemDetail): ApiResponse => ({
  success: false,
  problem,
});

export const createProblemDetail = (
  type: string,
  title: string,
  status: number,
  detail?: string,
  instance?: string,
  additionalProperties?: Record<string, any>
): ProblemDetail => ({
  type,
  title,
  status,
  detail,
  instance,
  ...additionalProperties,
});
