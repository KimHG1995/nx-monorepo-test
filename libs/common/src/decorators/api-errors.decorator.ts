import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * 인증 관련 응답을 위한 커스텀 데코레이터
 *
 * @param description - 응답 설명
 * @param schema - 응답 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiAuthResponse('Login successful', { $ref: '#/components/schemas/AuthResponse' })
 * async login(@Body() dto: LoginDto) {}
 * ```
 */
export function ApiAuthResponse(description: string, schema?: any) {
  return ApiResponse({
    status: 200,
    description,
    schema: schema || {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        user: { $ref: '#/components/schemas/User' },
      },
    },
  });
}

/**
 * 인증 실패 응답을 위한 커스텀 데코레이터
 *
 * @param description - 에러 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiAuthErrorResponse('Invalid credentials')
 * async login(@Body() dto: LoginDto) {}
 * ```
 */
export function ApiAuthErrorResponse(description: string) {
  return ApiResponse({
    status: 401,
    description,
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'https://example.com/problems/unauthorized',
        },
        title: { type: 'string', example: 'Unauthorized' },
        status: { type: 'number', example: 401 },
        detail: { type: 'string', example: description },
        instance: { type: 'string', example: '/api/auth/login' },
      },
      required: ['type', 'title', 'status', 'detail'],
    },
  });
}

/**
 * 권한 부족 응답을 위한 커스텀 데코레이터
 *
 * @param description - 에러 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiForbiddenResponse('Insufficient permissions')
 * async adminOnly() {}
 * ```
 */
export function ApiForbiddenResponse(description: string) {
  return ApiResponse({
    status: 403,
    description,
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'https://example.com/problems/forbidden',
        },
        title: { type: 'string', example: 'Forbidden' },
        status: { type: 'number', example: 403 },
        detail: { type: 'string', example: description },
        instance: { type: 'string', example: '/api/admin/users' },
      },
      required: ['type', 'title', 'status', 'detail'],
    },
  });
}

/**
 * 리소스 없음 응답을 위한 커스텀 데코레이터
 *
 * @param description - 에러 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiNotFoundResponse('User not found')
 * async findOne(@Param('id') id: string) {}
 * ```
 */
export function ApiNotFoundResponse(description: string) {
  return ApiResponse({
    status: 404,
    description,
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'https://example.com/problems/not-found',
        },
        title: { type: 'string', example: 'Not Found' },
        status: { type: 'number', example: 404 },
        detail: { type: 'string', example: description },
        instance: { type: 'string', example: '/api/users/999' },
      },
      required: ['type', 'title', 'status', 'detail'],
    },
  });
}

/**
 * 검증 실패 응답을 위한 커스텀 데코레이터
 *
 * @param description - 에러 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiValidationErrorResponse('Invalid input data')
 * async create(@Body() dto: CreateUserDto) {}
 * ```
 */
export function ApiValidationErrorResponse(description: string) {
  return ApiResponse({
    status: 400,
    description,
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'https://example.com/problems/validation-failed',
        },
        title: { type: 'string', example: 'Validation Failed' },
        status: { type: 'number', example: 400 },
        detail: { type: 'string', example: description },
        instance: { type: 'string', example: '/api/users' },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['field', 'message'],
          },
        },
      },
      required: ['type', 'title', 'status', 'detail'],
    },
  });
}

/**
 * 서버 에러 응답을 위한 커스텀 데코레이터
 *
 * @param description - 에러 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiServerErrorResponse('Internal server error')
 * async someMethod() {}
 * ```
 */
export function ApiServerErrorResponse(description: string) {
  return ApiResponse({
    status: 500,
    description,
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          example: 'https://example.com/problems/internal-server-error',
        },
        title: { type: 'string', example: 'Internal Server Error' },
        status: { type: 'number', example: 500 },
        detail: { type: 'string', example: description },
        instance: { type: 'string', example: '/api/users' },
      },
      required: ['type', 'title', 'status', 'detail'],
    },
  });
}

/**
 * 공통 에러 응답들을 한번에 적용하는 데코레이터
 *
 * @param options - 에러 응답 옵션
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiCommonErrorResponses({
 *   validation: 'Invalid input data',
 *   unauthorized: 'Authentication required',
 *   forbidden: 'Insufficient permissions',
 *   notFound: 'Resource not found',
 *   serverError: 'Internal server error'
 * })
 * async someMethod() {}
 * ```
 */
export function ApiCommonErrorResponses(options: {
  validation?: string;
  unauthorized?: string;
  forbidden?: string;
  notFound?: string;
  serverError?: string;
}) {
  const decorators: any[] = [];

  if (options.validation) {
    decorators.push(ApiValidationErrorResponse(options.validation));
  }

  if (options.unauthorized) {
    decorators.push(ApiAuthErrorResponse(options.unauthorized));
  }

  if (options.forbidden) {
    decorators.push(ApiForbiddenResponse(options.forbidden));
  }

  if (options.notFound) {
    decorators.push(ApiNotFoundResponse(options.notFound));
  }

  if (options.serverError) {
    decorators.push(ApiServerErrorResponse(options.serverError));
  }

  return applyDecorators(...decorators);
}
