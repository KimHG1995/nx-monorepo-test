import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatedResponse,
  ApiDeletedResponse,
  ApiEndpoint,
  ApiPaginatedResponse,
  ApiSuccessResponse,
  ApiUpdatedResponse,
} from '@nx-monorepo-test/common';

// 예시 DTO들
class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

class UpdateUserDto {
  name?: string;
  email?: string;
}

class UserQueryDto {
  page?: number;
  limit?: number;
  search?: string;
}

class User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiEndpoint({
    summary: 'Get all users',
    description: 'Retrieve a paginated list of all users in the system',
    responses: [{ status: 200, description: 'Successfully retrieved users' }],
    queries: [
      { name: 'page', type: Number, description: 'Page number', example: 1 },
      {
        name: 'limit',
        type: Number,
        description: 'Items per page',
        example: 10,
      },
      { name: 'search', type: String, description: 'Search term' },
    ],
  })
  @ApiPaginatedResponse('List of users', { $ref: '#/components/schemas/User' })
  async findAll(@Query() query: UserQueryDto): Promise<User[]> {
    return [];
  }

  @Get(':id')
  @ApiEndpoint({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their ID',
    responses: [{ status: 200, description: 'User found' }],
    params: [{ name: 'id', description: 'User ID', example: 1 }],
  })
  @ApiSuccessResponse(200, 'User details', {
    $ref: '#/components/schemas/User',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return {} as User;
  }

  @Post()
  @ApiEndpoint({
    summary: 'Create a new user',
    description: 'Create a new user account',
    responses: [{ status: 201, description: 'User created successfully' }],
    body: {
      description: 'User creation data',
      schema: { $ref: '#/components/schemas/CreateUserDto' },
    },
  })
  @ApiCreatedResponse('User created successfully', {
    $ref: '#/components/schemas/User',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return {} as User;
  }

  @Put(':id')
  @ApiEndpoint({
    summary: 'Update user',
    description: 'Update an existing user',
    responses: [{ status: 200, description: 'User updated successfully' }],
    params: [{ name: 'id', description: 'User ID', example: 1 }],
    body: {
      description: 'User update data',
      schema: { $ref: '#/components/schemas/UpdateUserDto' },
    },
  })
  @ApiUpdatedResponse('User updated successfully', {
    $ref: '#/components/schemas/User',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return {} as User;
  }

  @Delete(':id')
  @ApiEndpoint({
    summary: 'Delete user',
    description: 'Delete a user account',
    responses: [{ status: 200, description: 'User deleted successfully' }],
    params: [{ name: 'id', description: 'User ID', example: 1 }],
  })
  @ApiDeletedResponse('User deleted successfully')
  async remove(@Param('id') id: string): Promise<void> {}
}
