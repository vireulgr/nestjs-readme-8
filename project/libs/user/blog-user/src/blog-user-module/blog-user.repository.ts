import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {

  constructor(public readonly factory: BlogUserFactory) {
    super(factory);
  }

  // в курсе этот метод не async
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.data.values());
    const pojo = entities.find((entity) => entity.email === email);
    return this.factory.create(pojo);
  }
}
