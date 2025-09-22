import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, createApiResponse } from '../types';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data is already wrapped in ApiResponse, return as is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Otherwise, wrap in standard ApiResponse
        return createApiResponse(data);
      })
    );
  }
}

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<T[], ApiResponse<T[]>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T[]>> {
    return next.handle().pipe(
      map((data) => {
        // This interceptor expects data to be in format: { items: T[], total: number, page: number, limit: number }
        if (data && typeof data === 'object' && 'items' in data) {
          const { items, total, page, limit } = data as any;
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

        return createApiResponse(data);
      })
    );
  }
}
