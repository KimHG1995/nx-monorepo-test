# nx-monorepo-test

NX를 사용한 모노레포 테스트 레포지토리입니다.

## 기술 스택

- **Framework**: NestJS
- **ORM**: Drizzle ORM
- **Database**: MySQL
- **Validation**: Zod v3
- **API Documentation**: Swagger/OpenAPI
- **Monorepo**: NX
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## 프로젝트 구조

```
nx-monorepo-test/
├── apps/
│   └── boilerplate/          # NestJS 애플리케이션 (비즈니스 로직)
│       ├── src/
│       │   ├── health/       # 헬스체크
│       │   ├── users/        # 사용자 모듈
│       │   └── main.ts       # 애플리케이션 진입점
│       └── project.json
├── libs/
│   ├── database/             # 데이터베이스 라이브러리
│   │   ├── src/
│   │   │   ├── schema.ts     # Drizzle 스키마
│   │   │   ├── database.ts   # DB 연결
│   │   │   └── index.ts
│   │   └── project.json
│   ├── validation/           # 검증 라이브러리
│   │   ├── src/
│   │   │   ├── schemas.ts    # Zod 스키마
│   │   │   ├── pipes/        # Validation 파이프
│   │   │   └── index.ts
│   │   └── project.json
│   ├── shared/              # 공통 유틸리티
│   │   ├── src/
│   │   │   ├── types.ts      # 공통 타입
│   │   │   └── index.ts
│   │   └── project.json
│   └── common/              # 공통 모듈 (예외 처리, 인터셉터, 가드, 데코레이터)
│       ├── src/
│       │   ├── exceptions/   # 예외 클래스
│       │   ├── filters/      # 예외 필터
│       │   ├── interceptors/ # 응답 인터셉터
│       │   ├── guards/       # 가드
│       │   ├── decorators/   # 커스텀 API 데코레이터
│       │   ├── services/     # 서비스
│       │   ├── utils/        # 유틸리티
│       │   └── index.ts
│       └── project.json
├── .github/workflows/        # GitHub Actions
├── .vscode/                  # VSCode 설정
├── docker-compose.yml        # Docker Compose
├── Dockerfile               # Docker 설정
└── drizzle.config.ts        # Drizzle 설정
```

## VSCode/Cursor NX Console 연동

이 프로젝트는 VSCode/Cursor의 NX Console 확장과 완전히 연동되어 있습니다.

### 필수 확장 프로그램

다음 확장 프로그램들을 설치하세요:

1. **NX Console** (`nrwl.angular-console`) - NX 명령어 GUI
2. **Prettier** (`esbenp.prettier-vscode`) - 코드 포맷팅
3. **ESLint** (`dbaeumer.vscode-eslint`) - 코드 린팅
4. **TypeScript** (`ms-vscode.vscode-typescript-next`) - TypeScript 지원

### NX Console 사용법

#### 1. 프로젝트 그래프 보기

- `Ctrl+Shift+P` → "NX: Show Project Graph" 실행
- 또는 사이드바의 NX 아이콘 클릭

#### 2. 태스크 실행

- `Ctrl+Shift+P` → "NX: Run Task" 실행
- 프로젝트와 태스크를 선택하여 실행

#### 3. 생성기 사용

- `Ctrl+Shift+P` → "NX: Generate" 실행
- 라이브러리, 컴포넌트 등을 GUI로 생성

#### 4. 영향받은 프로젝트 확인

- `Ctrl+Shift+P` → "NX: Show Affected Projects" 실행
- 변경사항이 영향을 미치는 프로젝트 확인

### 사용 가능한 태스크

VSCode 태스크 러너(`Ctrl+Shift+P` → "Tasks: Run Task")에서 다음 태스크들을 실행할 수 있습니다:

- **nx: serve boilerplate** - 개발 서버 실행
- **nx: build boilerplate** - 프로덕션 빌드
- **nx: test boilerplate** - 테스트 실행
- **nx: lint boilerplate** - 린팅 실행
- **nx: build all** - 모든 프로젝트 빌드
- **nx: test all** - 모든 프로젝트 테스트
- **nx: lint all** - 모든 프로젝트 린팅
- **nx: affected build** - 영향받은 프로젝트만 빌드
- **nx: affected test** - 영향받은 프로젝트만 테스트
- **nx: affected lint** - 영향받은 프로젝트만 린팅
- **nx: graph** - 프로젝트 그래프 열기
- **db: generate** - Drizzle 마이그레이션 생성
- **db: migrate** - 데이터베이스 마이그레이션
- **db: studio** - Drizzle Studio 실행

### 워크스페이스 설정

프로젝트는 다음과 같이 구성되어 있습니다:

- **워크스페이스 파일**: `nx-monorepo-test.code-workspace`
- **VSCode 설정**: `.vscode/settings.json`
- **확장 프로그램**: `.vscode/extensions.json`
- **태스크**: `.vscode/tasks.json`
- **디버그 설정**: `.vscode/launch.json`

### 프로젝트 구조 시각화

NX Console에서 프로젝트 간 의존성을 시각적으로 확인할 수 있습니다:

```
boilerplate (app)
├── database (lib) - 데이터베이스 스키마 및 연결
├── validation (lib) - Zod 스키마 및 검증
├── shared (lib) - 공통 타입 및 유틸리티
└── common (lib) - 예외 처리, 인터셉터, 가드
```

### 개발 팁

1. **자동 임포트**: TypeScript가 라이브러리 경로를 자동으로 인식합니다
2. **실시간 린팅**: 파일 저장 시 자동으로 ESLint 실행
3. **코드 포맷팅**: 파일 저장 시 자동으로 Prettier 실행
4. **디버깅**: F5로 NestJS 애플리케이션 디버깅 시작
5. **태스크 실행**: `Ctrl+Shift+P`로 모든 NX 명령어 실행 가능

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp env.example .env
```

`.env` 파일을 편집하여 데이터베이스 설정을 수정하세요.

### 3. 데이터베이스 설정

#### Docker Compose 사용 (권장)

```bash
# MySQL 컨테이너 시작
docker-compose up -d mysql

# 데이터베이스 마이그레이션
npm run db:generate
npm run db:migrate
```

#### 로컬 MySQL 사용

로컬에 MySQL이 설치되어 있다면 `.env` 파일에서 데이터베이스 연결 정보를 수정하세요.

### 4. 애플리케이션 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

## 사용 가능한 스크립트

### 애플리케이션

- `npm run start:dev` - 개발 모드로 실행
- `npm run build` - 프로덕션 빌드
- `npm run start:prod` - 프로덕션 모드로 실행

### 데이터베이스

- `npm run db:generate` - Drizzle 마이그레이션 파일 생성
- `npm run db:migrate` - 데이터베이스 마이그레이션 실행
- `npm run db:studio` - Drizzle Studio 실행

### 개발 도구

- `npm run lint` - ESLint 실행
- `npm run test` - 테스트 실행

## API 엔드포인트

애플리케이션이 실행되면 다음 엔드포인트를 사용할 수 있습니다:

- **애플리케이션**: `http://localhost:3000/api`
- **Swagger 문서**: `http://localhost:3000/api/docs`
- **헬스체크**: `http://localhost:3000/api/health`
- **사용자 API**: `http://localhost:3000/api/users`

## Docker 사용

### 전체 스택 실행

```bash
docker-compose up -d
```

### 개별 서비스 실행

```bash
# MySQL만 실행
docker-compose up -d mysql

# 애플리케이션만 실행
docker-compose up -d app
```

## VSCode 디버깅

VSCode에서 F5를 누르거나 "Debug NestJS" 구성을 선택하여 디버깅을 시작할 수 있습니다.

## 주요 기능

### 1. 커스텀 API 데코레이터

OpenAPI 표준을 준수하는 커스텀 데코레이터를 제공하여 API 문서화를 간소화합니다.

```typescript
import { ApiEndpoint } from '@nx-monorepo-test/common';

@Get()
@ApiEndpoint({
  summary: 'Get all users',
  description: 'Retrieve a paginated list of all users',
})
async findAll(@Query() query: UserQueryDto) {}
```

**주요 특징:**

- **RFC 7807 Problem Details** 표준 준수
- **자동 에러 응답**: 기본 에러 응답이 자동으로 적용
- **기본 인증**: 인증이 기본적으로 활성화
- **코드 간소화**: 핵심 정보만 설정하면 됨
- **일관성 보장**: 모든 에러 응답이 동일한 형식
- **타입 안전성**: TypeScript 지원

**사용 가능한 데코레이터:**

- `@ApiEndpoint`: 통합 API 엔드포인트 설정 (기본 인증 및 에러 응답 자동 적용)
- `@ApiSuccessResponse`, `@ApiCreatedResponse`: 성공 응답
- `@ApiPaginatedResponse`: 페이지네이션 응답
- `@ApiAuthErrorResponse`, `@ApiForbiddenResponse`: 개별 에러 응답 (선택적 사용)

### 2. Zod 기반 Validation

모든 API 요청은 Zod 스키마를 사용하여 검증됩니다.

```typescript
// 사용자 생성 스키마
const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
});
```

### 3. Drizzle ORM

타입 안전한 데이터베이스 쿼리를 위한 Drizzle ORM을 사용합니다.

```typescript
// 스키마 정의
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
```

### 4. Swagger/OpenAPI

자동으로 생성되는 API 문서를 통해 API를 탐색하고 테스트할 수 있습니다.

### 5. 헬스체크

애플리케이션과 데이터베이스의 상태를 확인할 수 있는 헬스체크 엔드포인트가 제공됩니다.

## 개발 가이드

### 새로운 모듈 추가

1. `apps/boilerplate/src/` 하위에 모듈 디렉토리 생성
2. 컨트롤러, 서비스, 모듈 파일 생성
3. Zod 스키마 정의
4. 커스텀 API 데코레이터 사용
5. `app.module.ts`에 모듈 추가

**예시:**

```typescript
@Controller('products')
export class ProductsController {
  @Get()
  @ApiEndpoint({
    summary: 'Get all products',
  })
  async findAll() {}
}
```

### 데이터베이스 스키마 변경

1. `libs/database/src/schema.ts` 수정
2. `npm run db:generate` 실행
3. `npm run db:migrate` 실행

### API 문서화

커스텀 데코레이터를 사용하여 일관된 API 문서화를 유지하세요:

```typescript
// 좋은 예
@ApiEndpoint({
  summary: 'Create product',
})

// 나쁜 예
@ApiOperation({ summary: 'Create product' })
@ApiResponse({ status: 201, description: 'Created' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
```

## 문제 해결

### 데이터베이스 연결 오류

1. MySQL 서비스가 실행 중인지 확인
2. `.env` 파일의 데이터베이스 설정 확인
3. 방화벽 설정 확인

### 포트 충돌

기본 포트 3000이 사용 중인 경우 `.env` 파일에서 `PORT` 값을 변경하세요.

## 문서

프로젝트의 상세한 가이드와 컨벤션은 `docs/` 디렉토리에서 확인할 수 있습니다:

- [API 엔드포인트 가이드](docs/API_ENDPOINTS.md) - RESTful API 설계 원칙
- [OpenAPI 태그 가이드](docs/OPENAPI_TAGS.md) - API 태그 사용법
- [문서화 가이드](docs/DOCUMENTATION.md) - 프로젝트 문서화 표준

## 라이선스

MIT
