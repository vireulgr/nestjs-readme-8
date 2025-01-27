import { Injectable, Logger } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {

  logger: Logger;

  constructor(public readonly factory: BlogUserFactory) {
    super(factory);
    this.logger = new Logger(this.constructor.name);
  }

  // в курсе этот метод не async
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.data.values());
    const pojo = entities.find((entity) => entity.email === email);

    //this.logger.log(`blog user repo ${pojo ? pojo.email : 'pojo is undefined!'}`);

    if (!pojo) {
      return null;
    }
    return this.factory.create(pojo);
  }
}
