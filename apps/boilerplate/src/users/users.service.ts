import { Injectable } from '@nestjs/common';
import { DatabaseService, NotFoundException } from '@nx-monorepo-test/common';
import { NewUser, User, users } from '@nx-monorepo-test/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: NewUser): Promise<User> {
    return this.databaseService.executeQuery(async (db) => {
      const [user] = await db.insert(users).values(createUserDto).returning();
      return user;
    }, 'create user');
  }

  async findAll(): Promise<User[]> {
    return this.databaseService.executeQuery(async (db) => {
      return await db.select().from(users);
    }, 'find all users');
  }

  async findOne(id: number): Promise<User> {
    return this.databaseService.executeQuery(async (db) => {
      const [user] = await db.select().from(users).where(eq(users.id, id));

      if (!user) {
        throw new NotFoundException('User', id);
      }

      return user;
    }, 'find user by id');
  }

  async update(id: number, updateUserDto: Partial<NewUser>): Promise<User> {
    return this.databaseService.executeQuery(async (db) => {
      const [user] = await db
        .update(users)
        .set(updateUserDto)
        .where(eq(users.id, id))
        .returning();

      if (!user) {
        throw new NotFoundException('User', id);
      }

      return user;
    }, 'update user');
  }

  async remove(id: number): Promise<void> {
    return this.databaseService.executeQuery(async (db) => {
      const result = await db.delete(users).where(eq(users.id, id));

      if (result.affectedRows === 0) {
        throw new NotFoundException('User', id);
      }
    }, 'delete user');
  }
}
