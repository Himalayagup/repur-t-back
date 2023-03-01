import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BlogInput } from './dto/create-blog.input'

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>,) {}
    async findAll(): Promise<Blog[]> {
        return await this.blogRepository.find();
    }
    async createBlog(blogInput: BlogInput): Promise<Blog> {
        const newBlog = this.blogRepository.create(blogInput);
        return this.blogRepository.save(newBlog);
    }
}
