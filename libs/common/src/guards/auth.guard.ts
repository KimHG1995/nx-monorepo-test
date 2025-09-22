import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Simple example - in real app, validate JWT token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    // In real implementation, validate JWT token here
    // For now, just check if token exists
    return true;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userRoles = user.roles || [];
    const hasRequiredRole = this.requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${this.requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}

// Decorator for role-based access control
export const Roles = (...roles: string[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // This would be used with a custom decorator in real implementation
    Reflect.defineMetadata('roles', roles, target, propertyKey);
  };
};
