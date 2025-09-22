import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiAuthErrorResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiServerErrorResponse,
  ApiValidationErrorResponse,
} from './api-errors.decorator';

export interface ApiEndpointOptions {
  summary: string;
  description?: string;
  tags?: string[];
  responses?: {
    status: number;
    description: string;
    schema?: any;
  }[];
  queries?: {
    name: string;
    required?: boolean;
    type?: any;
    description?: string;
    example?: any;
  }[];
  params?: {
    name: string;
    description?: string;
    example?: any;
  }[];
  body?: {
    description?: string;
    schema?: any;
  };
  auth?: boolean;
  customErrors?: {
    validation?: string;
    unauthorized?: string;
    forbidden?: string;
    notFound?: string;
    serverError?: string;
  };
}

export function ApiEndpoint(options: ApiEndpointOptions) {
  const decorators: any[] = [];
  const auth = options.auth !== false;

  if (options.tags && options.tags.length > 0) {
    decorators.push(ApiTags(...options.tags));
  }

  decorators.push(
    ApiOperation({ summary: options.summary, description: options.description })
  );

  if (auth) {
    decorators.push(ApiBearerAuth());
  }

  if (options.responses) {
    options.responses.forEach(response => {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
          schema: response.schema,
        })
      );
    });
  }

  if (options.queries) {
    options.queries.forEach(query => {
      decorators.push(
        ApiQuery({
          name: query.name,
          required: query.required || false,
          type: query.type,
          description: query.description,
          example: query.example,
        })
      );
    });
  }

  if (options.params) {
    options.params.forEach(param => {
      decorators.push(
        ApiParam({
          name: param.name,
          description: param.description,
          example: param.example,
        })
      );
    });
  }

  if (options.body) {
    decorators.push(
      ApiBody({
        description: options.body.description,
        schema: options.body.schema,
      })
    );
  }

  const defaultErrors = {
    validation: 'Invalid input data',
    unauthorized: 'Authentication required',
    forbidden: 'Insufficient permissions',
    notFound: 'Resource not found',
    serverError: 'Internal server error',
  };

  const errorMessages = { ...defaultErrors, ...options.customErrors };

  if (auth) {
    decorators.push(ApiAuthErrorResponse(errorMessages.unauthorized));
    decorators.push(ApiForbiddenResponse(errorMessages.forbidden));
  }

  if (options.body) {
    decorators.push(ApiValidationErrorResponse(errorMessages.validation));
  }

  if (options.params && options.params.length > 0) {
    decorators.push(ApiNotFoundResponse(errorMessages.notFound));
  }

  decorators.push(ApiServerErrorResponse(errorMessages.serverError));

  return applyDecorators(...decorators);
}
