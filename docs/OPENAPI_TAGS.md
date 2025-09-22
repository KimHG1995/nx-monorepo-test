# OpenAPI 태그 가이드

## OpenAPI 태그 표준

### 기본 태그 구조

```typescript
@ApiTags('Users')
@Controller('users')
export class UsersController {}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {}

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {}
```

## 표준 태그 목록

### 핵심 도메인 태그

- **Users**: 사용자 관리
- **Authentication**: 인증 및 권한
- **Orders**: 주문 관리
- **Products**: 상품 관리
- **Payments**: 결제 처리

### 시스템 태그

- **Health**: 헬스체크 및 모니터링
- **Admin**: 관리자 기능
- **System**: 시스템 설정

## 태그 사용 가이드

### 컨트롤러별 태그 적용

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '@nx-monorepo-test/common';

// 사용자 관련 컨트롤러
@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiEndpoint({
    summary: 'Get all users',
    responses: [{ status: 200, description: 'List of users' }],
  })
  async findAll() {}

  @Get(':id')
  @ApiEndpoint({
    summary: 'Get user by ID',
    responses: [{ status: 200, description: 'User details' }],
    params: [{ name: 'id', description: 'User ID' }],
  })
  async findOne(@Param('id') id: string) {}

  @Post()
  @ApiEndpoint({
    summary: 'Create a new user',
    responses: [{ status: 201, description: 'User created successfully' }],
    body: { description: 'User creation data' },
  })
  async create(@Body() createUserDto: CreateUserDto) {}

  @Put(':id')
  @ApiEndpoint({
    summary: 'Update user',
    responses: [{ status: 200, description: 'User updated successfully' }],
    params: [{ name: 'id', description: 'User ID' }],
    body: { description: 'User update data' },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  @ApiEndpoint({
    summary: 'Delete user',
    responses: [{ status: 200, description: 'User deleted successfully' }],
    params: [{ name: 'id', description: 'User ID' }],
  })
  async remove(@Param('id') id: string) {}
}

// 인증 관련 컨트롤러
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiEndpoint({
    summary: 'User login',
    responses: [{ status: 200, description: 'Login successful' }],
    body: { description: 'Login credentials' },
  })
  async login(@Body() loginDto: LoginDto) {}

  @Post('logout')
  @ApiEndpoint({
    summary: 'User logout',
    responses: [{ status: 200, description: 'Logout successful' }],
  })
  async logout() {}

  @Post('refresh')
  @ApiEndpoint({
    summary: 'Refresh access token',
    responses: [{ status: 200, description: 'Token refreshed successfully' }],
    body: { description: 'Refresh token data' },
  })
  async refresh(@Body() refreshDto: RefreshTokenDto) {}

  @Post('forgot-password')
  @ApiEndpoint({
    summary: 'Request password reset',
    responses: [{ status: 200, description: 'Password reset email sent' }],
    body: { description: 'Email address' },
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {}
}

// 헬스체크 컨트롤러
@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiEndpoint({
    summary: 'Health check endpoint',
    responses: [{ status: 200, description: 'Health status' }],
    auth: false,
  })
  async check() {}

  @Get('detailed')
  @ApiEndpoint({
    summary: 'Detailed health check',
    responses: [{ status: 200, description: 'Detailed health information' }],
    auth: false,
  })
  async detailedCheck() {}
}
```

## API 문서화 표준

### Swagger 설정

```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('NX Monorepo API')
  .setDescription('NX Monorepo를 사용한 NestJS API 서버')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

## 태그 그룹화 전략

### 도메인별 그룹화

- **사용자 관리**: Users, Authentication
- **비즈니스 로직**: Orders, Products, Payments
- **시스템 관리**: Health, Admin, System

### 우선순위별 그룹화

1. **핵심 기능**: Users, Authentication
2. **비즈니스 기능**: Orders, Products, Payments
3. **시스템 기능**: Health, Admin, System

## 태그 네이밍 규칙

### 기본 규칙

- **단수형 사용**: Users, Orders, Products
- **PascalCase**: Authentication, HealthCheck
- **명확한 의미**: Admin, System, Health

### 금지 사항

- **복수형**: User, Order, Product
- **약어**: Auth, Hlth, Adm
- **모호한 표현**: Misc, Other, General

## 체크리스트

### 태그 적용 체크리스트

- [ ] 모든 컨트롤러에 적절한 태그 적용
- [ ] 일관된 태그 네이밍 사용
- [ ] 도메인별 태그 그룹화
- [ ] 커스텀 데코레이터 사용
- [ ] Swagger 문서 자동 생성
- [ ] 태그 우선순위 설정
