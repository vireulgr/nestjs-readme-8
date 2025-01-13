import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';

@Module({
  providers: [ BlogPostService, BlogPostRepository, BlogPostFactory ],
  controllers: [ BlogPostController ],
  //exports: [ BlogPostRepository, BlogPostService ]
})
export class BlogPostModule {}
