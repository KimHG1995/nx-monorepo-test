import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import { PROBLEM_TYPES } from '../types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let problem: any;
    let status: HttpStatus;

    if (exception instanceof BaseException) {
      // Our custom exceptions with RFC 7807 Problem Details
      problem = exception.problem;
      status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      // Standard NestJS HTTP exceptions
      const exceptionResponse = exception.getResponse();
      status = exception.getStatus();

      problem = {
        type: this.getProblemType(status),
        title: exception.message || 'HTTP Exception',
        status,
        detail:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any)?.message || exception.message,
        instance: request.url,
      };
    } else {
      // Unknown exceptions
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      problem = {
        type: PROBLEM_TYPES.INTERNAL_SERVER_ERROR,
        title: 'Internal Server Error',
        status,
        detail: 'An unexpected error occurred',
        instance: request.url,
      };
    }

    // Add request context
    problem.instance = request.url;
    problem.timestamp = new Date().toISOString();
    problem.path = request.path;
    problem.method = request.method;

    // Log the exception
    this.logger.error(
      `Exception caught: ${problem.title} - ${problem.detail}`,
      exception instanceof Error ? exception.stack : exception
    );

    // Send RFC 7807 compliant response
    response.status(status).json(problem);
  }

  private getProblemType(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return PROBLEM_TYPES.VALIDATION_ERROR;
      case HttpStatus.UNAUTHORIZED:
        return PROBLEM_TYPES.AUTHENTICATION_ERROR;
      case HttpStatus.FORBIDDEN:
        return PROBLEM_TYPES.AUTHORIZATION_ERROR;
      case HttpStatus.NOT_FOUND:
        return PROBLEM_TYPES.NOT_FOUND_ERROR;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return PROBLEM_TYPES.BUSINESS_ERROR;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return PROBLEM_TYPES.INTERNAL_SERVER_ERROR;
      default:
        return PROBLEM_TYPES.INTERNAL_SERVER_ERROR;
    }
  }
}
