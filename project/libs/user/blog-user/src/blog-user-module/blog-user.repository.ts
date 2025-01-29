import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserModel } from './blog-user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {

  logger: Logger;

  constructor(
    public readonly factory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(factory, blogUserModel);
    this.logger = new Logger(this.constructor.name);
  }

  // в курсе этот метод не async
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const aDocument = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(aDocument);
  }
}
