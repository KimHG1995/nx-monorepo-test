import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Get current user from request
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

// Get request ID for tracing
export const RequestId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-request-id'] || request.id;
  }
);

// Get client IP address
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip || request.connection.remoteAddress;
  }
);

// Get user agent
export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['user-agent'];
  }
);

// Pagination decorator
export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    return {
      page: parseInt(query.page) || 1,
      limit: Math.min(parseInt(query.limit) || 10, 100), // Max 100 items per page
      sortBy: query.sortBy || 'id',
      sortOrder: query.sortOrder === 'desc' ? 'desc' : 'asc',
    };
  }
);
