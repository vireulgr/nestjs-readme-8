import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '../../../../shared/data-access/src/index';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {

  constructor(factory: BlogUserFactory) {
    super(factory);
  }
}
