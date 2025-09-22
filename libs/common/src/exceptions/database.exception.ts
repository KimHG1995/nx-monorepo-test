import { DatabaseException } from './base.exception';

export class DatabaseConnectionException extends DatabaseException {
  constructor(instance?: string) {
    super('Failed to establish database connection', instance, {
      errorCode: 'DB_CONNECTION_FAILED',
    });
  }
}

export class DatabaseQueryException extends DatabaseException {
  constructor(query: string, error: string, instance?: string) {
    super(`Database query failed: ${error}`, instance, {
      errorCode: 'DB_QUERY_FAILED',
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      originalError: error,
    });
  }
}

export class DatabaseTransactionException extends DatabaseException {
  constructor(operation: string, error: string, instance?: string) {
    super(
      `Database transaction failed during ${operation}: ${error}`,
      instance,
      {
        errorCode: 'DB_TRANSACTION_FAILED',
        operation,
        originalError: error,
      }
    );
  }
}

export class DatabaseConstraintException extends DatabaseException {
  constructor(constraint: string, table: string, instance?: string) {
    super(
      `Database constraint violation: ${constraint} on table ${table}`,
      instance,
      {
        errorCode: 'DB_CONSTRAINT_VIOLATION',
        constraint,
        table,
      }
    );
  }
}

export class DatabaseTimeoutException extends DatabaseException {
  constructor(operation: string, timeout: number, instance?: string) {
    super(
      `Database operation '${operation}' timed out after ${timeout}ms`,
      instance,
      {
        errorCode: 'DB_TIMEOUT',
        operation,
        timeout,
      }
    );
  }
}
