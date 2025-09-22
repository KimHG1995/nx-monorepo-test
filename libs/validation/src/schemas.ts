import { z } from 'zod';

// Environment schema
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().min(1, 'Database URL is required'),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.string().default('3306'),
  DATABASE_NAME: z.string().min(1, 'Database name is required'),
  DATABASE_USER: z.string().min(1, 'Database user is required'),
  DATABASE_PASSWORD: z.string().min(1, 'Database password is required'),
});

export type Env = z.infer<typeof envSchema>;

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
});

export const updateUserSchema = createUserSchema.partial();

export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Post schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().optional(),
  authorId: z.number().int().positive('Author ID must be positive'),
});

export const updatePostSchema = createPostSchema.partial();

export const postResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserResponseDto = z.infer<typeof userResponseSchema>;
export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
export type PostResponseDto = z.infer<typeof postResponseSchema>;
