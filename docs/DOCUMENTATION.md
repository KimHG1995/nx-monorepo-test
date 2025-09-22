# 문서화 가이드

## 문서화 전략

### 문서화 계층 구조

```
docs/
├── README.md                    # 프로젝트 개요
├── API_ENDPOINTS.md            # API 엔드포인트 가이드
├── OPENAPI_TAGS.md             # OpenAPI 태그 가이드
└── DOCUMENTATION.md            # 문서화 가이드 (현재 파일)
```

## API 문서화

### 커스텀 데코레이터 사용

기존 `@ApiOperation`, `@ApiResponse` 대신 `@ApiEndpoint` 커스텀 데코레이터를 사용합니다.

```typescript
import { ApiEndpoint } from '@nx-monorepo-test/common';

@Controller('users')
export class UsersController {
  @Get()
  @ApiEndpoint({
    summary: 'Get all users',
    description: 'Retrieve a paginated list of all users',
  })
  async findAll(@Query() query: UserQueryDto) {}
}
```

### DTO 문서화

Zod 스키마 기반으로 DTO를 정의하고, 필요시 `@ApiProperty`를 사용합니다.

```typescript
export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;
}
```

## JSDoc 문서화

### JSDoc Document This 확장 사용

VSCode/Cursor의 JSDoc Document This 확장을 사용하여 자동으로 JSDoc 주석을 생성합니다.

```typescript
/**
 * 사용자 목록을 조회합니다.
 * @param query - 조회 조건
 * @returns 사용자 목록
 */
async findAll(query: UserQueryDto): Promise<User[]> {
  // 구현...
}
```

### 클래스 주석

```typescript
/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Injectable()
export class UserService {
  // 구현...
}
```

## README 문서화

### 프로젝트 README 구조

README.md는 프로젝트의 핵심 정보를 포함해야 합니다:

- 프로젝트 개요
- 기술 스택
- 프로젝트 구조
- 시작하기
- API 문서
- 개발 가이드

## 문서화 체크리스트

### API 문서화 체크리스트

- [ ] 모든 엔드포인트에 `@ApiEndpoint` 적용
- [ ] 모든 DTO에 `@ApiProperty` 적용 (필요시)
- [ ] 예시 값이 적절히 설정됨
- [ ] 에러 응답이 자동으로 적용됨 (커스텀 데코레이터 사용)

### 코드 문서화 체크리스트

- [ ] JSDoc Document This 확장으로 자동 생성된 주석 활용
- [ ] 복잡한 로직에 인라인 주석 추가
- [ ] 매개변수와 반환값이 명확히 설명됨
- [ ] 예외 상황이 문서화됨

### README 체크리스트

- [ ] 프로젝트 개요가 명확함
- [ ] 설치 및 실행 방법이 상세함
- [ ] API 사용 예시가 포함됨
- [ ] 기여 가이드가 명시됨
- [ ] 라이선스 정보가 포함됨

## 문서화 도구

### 1. JSDoc Document This

VSCode/Cursor 확장으로 함수, 클래스, 인터페이스에 대한 JSDoc 주석을 자동 생성합니다.

### 2. Swagger/OpenAPI

커스텀 데코레이터를 사용하여 자동으로 API 문서를 생성합니다.

### 3. TypeScript

타입 정보를 활용하여 자동 완성과 문서화를 지원합니다.

## 문서화 규칙

### 1. 일관성

- 모든 API 엔드포인트는 `@ApiEndpoint` 사용
- 모든 함수는 JSDoc 주석 포함
- 모든 클래스는 설명 주석 포함

### 2. 간결성

- 불필요한 예시 제거
- 핵심 정보만 포함
- 자동 생성 도구 활용

### 3. 정확성

- 실제 코드와 일치하는 문서
- 최신 상태 유지
- 검증된 정보만 포함
