import { ApiResponse, PaginatedResponse, PaginationParams } from '../types';

export class PaginationUtil {
  static createPaginatedResponse<T>(
    items: T[],
    total: number,
    pagination: PaginationParams
  ): PaginatedResponse<T> {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static getOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static validatePaginationParams(params: PaginationParams): PaginationParams {
    return {
      page: Math.max(1, params.page || 1),
      limit: Math.min(Math.max(1, params.limit || 10), 100),
      sortBy: params.sortBy || 'id',
      sortOrder: params.sortOrder === 'desc' ? 'desc' : 'asc',
    };
  }
}

export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }
}

export class ResponseUtil {
  static createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  static createErrorResponse(
    message: string,
    statusCode: number = 400
  ): ApiResponse {
    return {
      success: false,
      problem: {
        type: 'https://example.com/problems/error',
        title: 'Error',
        status: statusCode,
        detail: message,
      },
    };
  }
}

export class StringUtil {
  static generateRandomString(length: number = 8): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static truncate(text: string, length: number = 100): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }
}
