import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (!req.headers.authorization) {
      return false;
    }

    const token = req.headers.authorization.split(' ')[1];
    const user = await this.usersService.validateToken(token);
    if (!user) {
      return false;
    }

    req.user = user;
    return true;
  }
}
