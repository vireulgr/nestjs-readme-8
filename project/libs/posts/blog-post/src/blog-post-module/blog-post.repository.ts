import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {

  constructor(public readonly factory: BlogPostFactory) {
    super(factory);
  }

  public async find(query: string): Promise<BlogPostEntity[] | null> {
    const result = [];

    for (const value of this.data.values()) {

      if (value.id.indexOf(query) === -1) {
        continue;
      }
      if (value.tags.some((tag: string) => tag.indexOf(query))) {
        continue
      }

      result.push(value);

    }

    return result;
  }
}
