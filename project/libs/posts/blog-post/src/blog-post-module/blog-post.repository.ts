import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {

  constructor(public readonly factory: BlogPostFactory) {
    super(factory);
  }
}
