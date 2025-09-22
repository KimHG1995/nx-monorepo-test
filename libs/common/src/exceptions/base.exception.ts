import { HttpException, HttpStatus } from '@nestjs/common';
import { PROBLEM_TYPES, ProblemDetail } from '../types';

export abstract class BaseException extends HttpException {
  public readonly problem: ProblemDetail;

  constructor(
    problem: ProblemDetail,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(problem, httpStatus);
    this.problem = problem;
  }
}

export class ValidationException extends BaseException {
  constructor(
    detail: string,
    instance?: string,
    additionalProperties?: Record<string, any>
  ) {
    super(
      {
        type: PROBLEM_TYPES.VALIDATION_ERROR,
        title: 'Validation Error',
        status: HttpStatus.BAD_REQUEST,
        detail,
        instance,
        ...additionalProperties,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

export class BusinessException extends BaseException {
  constructor(
    detail: string,
    instance?: string,
    additionalProperties?: Record<string, any>
  ) {
    super(
      {
        type: PROBLEM_TYPES.BUSINESS_ERROR,
        title: 'Business Logic Error',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        detail,
        instance,
        ...additionalProperties,
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}

export class DatabaseException extends BaseException {
  constructor(
    detail: string,
    instance?: string,
    additionalProperties?: Record<string, any>
  ) {
    super(
      {
        type: PROBLEM_TYPES.DATABASE_ERROR,
        title: 'Database Error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        detail,
        instance,
        ...additionalProperties,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export class NotFoundException extends BaseException {
  constructor(
    resource: string,
    identifier: string | number,
    instance?: string
  ) {
    super(
      {
        type: PROBLEM_TYPES.NOT_FOUND_ERROR,
        title: 'Resource Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `${resource} with identifier '${identifier}' not found`,
        instance,
        resource,
        identifier,
      },
      HttpStatus.NOT_FOUND
    );
  }
}

export class AuthenticationException extends BaseException {
  constructor(detail: string = 'Authentication failed', instance?: string) {
    super(
      {
        type: PROBLEM_TYPES.AUTHENTICATION_ERROR,
        title: 'Authentication Error',
        status: HttpStatus.UNAUTHORIZED,
        detail,
        instance,
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}

export class AuthorizationException extends BaseException {
  constructor(detail: string = 'Insufficient permissions', instance?: string) {
    super(
      {
        type: PROBLEM_TYPES.AUTHORIZATION_ERROR,
        title: 'Authorization Error',
        status: HttpStatus.FORBIDDEN,
        detail,
        instance,
      },
      HttpStatus.FORBIDDEN
    );
  }
}
