import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { CreateUserInput } from '../dto/create-user.input';
@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const input: CreateUserInput = ctx.getArgs().createUserInput;
    const { email } = input; // Assuming the email is passed as an argument in the mutation
    return this.validateRequest(email);
  }

  async validateRequest(email) {
    const userExist = await this.userService.findByEmail(email);
    if (userExist) {
      throw new ForbiddenException('Bad... This email already exist! Use different email');
    }
    return true;
  }
}