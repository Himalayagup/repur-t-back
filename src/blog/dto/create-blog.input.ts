import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BlogInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  author: string;

  @Field()
  date: string;
}