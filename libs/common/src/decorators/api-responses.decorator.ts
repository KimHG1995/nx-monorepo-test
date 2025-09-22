import { ApiResponse } from '@nestjs/swagger';

/**
 * 성공 응답을 위한 커스텀 데코레이터
 *
 * @param status - HTTP 상태 코드
 * @param description - 응답 설명
 * @param schema - 응답 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiSuccessResponse(200, 'Successfully retrieved users', { type: [User] })
 * async findAll() {}
 * ```
 */
export function ApiSuccessResponse(
  status: number,
  description: string,
  schema?: any
) {
  return ApiResponse({
    status,
    description,
    schema,
  });
}

/**
 * 에러 응답을 위한 커스텀 데코레이터
 *
 * @param status - HTTP 상태 코드
 * @param description - 에러 설명
 * @param schema - 에러 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiErrorResponse(400, 'Bad request - invalid input data')
 * async create(@Body() dto: CreateUserDto) {}
 * ```
 */
export function ApiErrorResponse(
  status: number,
  description: string,
  schema?: any
) {
  return ApiResponse({
    status,
    description,
    schema,
  });
}

/**
 * 페이지네이션 응답을 위한 커스텀 데코레이터
 *
 * @param description - 응답 설명
 * @param itemSchema - 아이템 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiPaginatedResponse('List of users', { $ref: '#/components/schemas/User' })
 * async findAll(@Query() query: UserQueryDto) {}
 * ```
 */
export function ApiPaginatedResponse(description: string, itemSchema: any) {
  return ApiResponse({
    status: 200,
    description,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: itemSchema,
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 100 },
            totalPages: { type: 'number', example: 10 },
          },
          required: ['page', 'limit', 'total', 'totalPages'],
        },
      },
      required: ['data', 'pagination'],
    },
  });
}

/**
 * 생성 응답을 위한 커스텀 데코레이터
 *
 * @param description - 응답 설명
 * @param schema - 생성된 엔티티 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiCreatedResponse('User created successfully', { $ref: '#/components/schemas/User' })
 * async create(@Body() dto: CreateUserDto) {}
 * ```
 */
export function ApiCreatedResponse(description: string, schema: any) {
  return ApiResponse({
    status: 201,
    description,
    schema,
  });
}

/**
 * 업데이트 응답을 위한 커스텀 데코레이터
 *
 * @param description - 응답 설명
 * @param schema - 업데이트된 엔티티 스키마
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiUpdatedResponse('User updated successfully', { $ref: '#/components/schemas/User' })
 * async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {}
 * ```
 */
export function ApiUpdatedResponse(description: string, schema: any) {
  return ApiResponse({
    status: 200,
    description,
    schema,
  });
}

/**
 * 삭제 응답을 위한 커스텀 데코레이터
 *
 * @param description - 응답 설명
 * @returns 데코레이터 함수
 *
 * @example
 * ```typescript
 * @ApiDeletedResponse('User deleted successfully')
 * async remove(@Param('id') id: string) {}
 * ```
 */
export function ApiDeletedResponse(description: string) {
  return ApiResponse({
    status: 200,
    description,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  });
}
