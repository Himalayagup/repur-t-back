import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DoesUserExist } from './guards/doesUserExist.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(DoesUserExist)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context,
    ): Promise<Partial<User>> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  }

  @Mutation(() => User)
  async logout(@Context() context) {
    context.req.session.destroy((err) => {
      if (err) {
        throw new Error('Something went wrong while logging out.');
      }
    });
    return true;
  }
}