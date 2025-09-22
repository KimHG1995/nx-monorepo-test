import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

export const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'nx_monorepo_test',
  });

  return drizzle(connection, { schema });
};

export type Database = ReturnType<typeof drizzle<typeof schema>>;

// Re-export schema for convenience
export * from './schema';
