import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@/common/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      // No roles defined, access is granted by default
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      // No user is authenticated, access denied
      return false;
    }
    const userRole = user.role;
    return roles.includes(userRole);
  }
}
