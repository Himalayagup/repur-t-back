import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from "@nestjs/graphql";
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';
import { join } from 'path'
import { BlogModule } from './blog/blog.module';
import { BlogResolver } from './blog/blog.resolver';
import { BlogService } from './blog/blog.service';
import { Blog } from './blog/entities/blog.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'user@postgres',
      database: 'rep_test2',
      entities: [User,Blog],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Blog, User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    JwtModule.register({
      secret: 'jwtSecret',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule, BlogModule],
  controllers: [AppController],
  providers: [AppService, UsersService, UsersResolver, BlogService, BlogResolver],
})
export class AppModule {}
