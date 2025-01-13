import { Injectable } from '@nestjs/common';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPost } from '@project/core';

@Injectable()
export class BlogPostFactory {
  public create(simpleData: BlogPost) {
    return new BlogPostEntity(simpleData);
  }
}
