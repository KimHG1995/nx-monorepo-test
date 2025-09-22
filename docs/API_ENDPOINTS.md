# API 엔드포인트 가이드

## RESTful API 설계 원칙

### 기본 URL 구조

```
https://api.example.com/v1/
├── users/              # 사용자 관리
├── auth/               # 인증
├── orders/             # 주문 관리
├── products/           # 상품 관리
├── health/             # 헬스체크
└── admin/              # 관리자 기능
```

### HTTP 메서드 사용

```typescript
// GET - 데이터 조회
GET /api/users                    # 모든 사용자 조회
GET /api/users/123                # 특정 사용자 조회

// POST - 데이터 생성
POST /api/users                   # 새 사용자 생성
POST /api/auth/login              # 로그인

// PUT - 전체 업데이트
PUT /api/users/123                # 사용자 전체 정보 업데이트

// PATCH - 부분 업데이트
PATCH /api/users/123              # 사용자 일부 정보 업데이트

// DELETE - 데이터 삭제
DELETE /api/users/123             # 사용자 삭제
```

## 엔드포인트 네이밍 규칙

### 리소스 네이밍

```typescript
// 단수형 사용 (일관성)
/users          ✅
/user           ❌

/orders         ✅
/order          ❌
```

### 동사 사용 금지

```typescript
// 리소스 중심
GET /users/123          ✅
GET /getUser/123        ❌

POST /users             ✅
POST /createUser        ❌
```

### 중첩 리소스

```typescript
// 2단계까지만 중첩
GET /users/123/orders           ✅
GET /users/123/orders/456       ❌ (너무 깊음)

// 대신 쿼리 파라미터 사용
GET /orders?userId=123          ✅
```

## 컨트롤러 구조

### 기본 구조

```typescript
import { ApiEndpoint } from '@nx-monorepo-test/common';

@Controller('users')
export class UsersController {
  @Get()
  @ApiEndpoint({
    summary: 'Get all users',
  })
  async findAll() {}

  @Get(':id')
  @ApiEndpoint({
    summary: 'Get user by ID',
    params: [{ name: 'id', description: 'User ID' }],
  })
  async findOne(@Param('id') id: string) {}

  @Post()
  @ApiEndpoint({
    summary: 'Create user',
    body: { description: 'User data' },
  })
  async create(@Body() createUserDto: CreateUserDto) {}

  @Put(':id')
  @ApiEndpoint({
    summary: 'Update user',
    params: [{ name: 'id', description: 'User ID' }],
    body: { description: 'User data' },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  @ApiEndpoint({
    summary: 'Delete user',
    params: [{ name: 'id', description: 'User ID' }],
  })
  async remove(@Param('id') id: string) {}
}
```

## 인증 및 권한

### JWT 기반 인증

```typescript
// 인증이 필요한 엔드포인트 (기본값)
@ApiEndpoint({
  summary: 'Get user profile',
})
async getProfile() {}

// 인증이 불필요한 엔드포인트
@ApiEndpoint({
  summary: 'Health check',
  auth: false,
})
async healthCheck() {}
```

## 쿼리 파라미터 및 필터링

### 페이지네이션

```typescript
@Get()
@ApiEndpoint({
  summary: 'Get users with pagination',
  queries: [
    { name: 'page', type: Number, description: 'Page number', example: 1 },
    { name: 'limit', type: Number, description: 'Items per page', example: 10 },
  ],
})
async findAll(@Query() query: UserQueryDto) {}
```

### 필터링

```typescript
@Get()
@ApiEndpoint({
  summary: 'Get users with filters',
  queries: [
    { name: 'status', type: String, description: 'User status' },
    { name: 'role', type: String, description: 'User role' },
    { name: 'search', type: String, description: 'Search term' },
  ],
})
async findAll(@Query() query: UserQueryDto) {}
```

## 에러 응답

커스텀 데코레이터가 자동으로 다음 에러 응답을 적용합니다:

- **400**: 요청 본문이 있는 경우 (Validation Error)
- **401**: 인증이 필요한 경우 (Unauthorized)
- **403**: 인증이 필요한 경우 (Forbidden)
- **404**: 경로 파라미터가 있는 경우 (Not Found)
- **500**: 모든 경우 (Server Error)

## API 버전 관리

### URL 버전 관리

```typescript
// v1 API
@Controller('v1/users')
export class UsersV1Controller {}

// v2 API
@Controller('v2/users')
export class UsersV2Controller {}
```

### 헤더 버전 관리

```typescript
// Accept 헤더 사용
Accept: application / vnd.api + json;
version = 1;
Accept: application / vnd.api + json;
version = 2;
```

## 체크리스트

### API 설계 체크리스트

- [ ] RESTful 원칙 준수
- [ ] 일관된 네이밍 규칙 사용
- [ ] 적절한 HTTP 메서드 사용
- [ ] 커스텀 데코레이터 사용
- [ ] 에러 응답 자동 적용
- [ ] 인증/권한 설정
- [ ] 페이지네이션 지원
- [ ] 필터링 지원
