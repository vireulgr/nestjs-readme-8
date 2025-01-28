import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  providers: [ BlogUserFactory, BlogUserRepository, BlogUserService ],
  controllers: [ BlogUserController ],
  exports: [ BlogUserRepository ],
})
export class BlogUserModule {}
