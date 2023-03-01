import { Resolver } from '@nestjs/graphql';
import { Blog } from './entities/blog.entity';
import { BlogService } from './blog.service';
import { BlogInput } from './dto/create-blog.input';
import { Args, Mutation, Query, Subscription  } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

// for realtime notification
const pubSub = new PubSub();

@Resolver((of) => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query((type) => [Blog], { name: 'blogs' })
  async findAll() {
    return this.blogService.findAll();
  }

  @Mutation((returns) => Blog)
  createBlog(@Args('blogInput') blogInput: BlogInput): Promise<Blog> {
    pubSub.publish('blogPostAdded', { blogPostAdded: blogInput });
    return this.blogService.createBlog(blogInput);
  }

  @Subscription(()=> Blog) 
  blogPostAdded() {
    return pubSub.asyncIterator('blogPostAdded');
  }
}
