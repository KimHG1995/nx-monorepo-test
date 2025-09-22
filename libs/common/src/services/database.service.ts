import { Injectable, Logger } from '@nestjs/common';
import { createConnection, Database } from '@nx-monorepo-test/database';
import {
  DatabaseConnectionException,
  DatabaseQueryException,
  DatabaseTransactionException,
} from '../exceptions/database.exception';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private connection: Database | null = null;

  async getConnection(): Promise<Database> {
    try {
      if (!this.connection) {
        this.connection = await createConnection();
        this.logger.log('Database connection established');
      }
      return this.connection;
    } catch (error) {
      this.logger.error('Failed to establish database connection', error);
      throw new DatabaseConnectionException();
    }
  }

  async executeQuery<T>(
    queryFn: (db: Database) => Promise<T>,
    operation: string = 'query'
  ): Promise<T> {
    try {
      const db = await this.getConnection();
      return await queryFn(db);
    } catch (error) {
      this.logger.error(`Database ${operation} failed`, error);
      throw new DatabaseQueryException(operation, error.message);
    }
  }

  async executeTransaction<T>(
    transactionFn: (db: Database) => Promise<T>,
    operation: string = 'transaction'
  ): Promise<T> {
    try {
      const db = await this.getConnection();
      return await db.transaction(async tx => {
        return await transactionFn(tx);
      });
    } catch (error) {
      this.logger.error(`Database ${operation} failed`, error);
      throw new DatabaseTransactionException(operation, error.message);
    }
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      try {
        // Note: drizzle-orm doesn't have explicit close method
        // Connection will be closed when process exits
        this.connection = null;
        this.logger.log('Database connection closed');
      } catch (error) {
        this.logger.error('Error closing database connection', error);
      }
    }
  }
}
