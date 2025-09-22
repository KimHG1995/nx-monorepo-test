// Common types and interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common utility functions
export const createApiResponse = <T>(
  data: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (error: string): ApiResponse => ({
  success: false,
  error,
});

// Health check types
export interface HealthCheckResult {
  status: 'up' | 'down';
  error?: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  info: Record<string, HealthCheckResult>;
  error?: Record<string, HealthCheckResult>;
  details: Record<string, HealthCheckResult>;
}
