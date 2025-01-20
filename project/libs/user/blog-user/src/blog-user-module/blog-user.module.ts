import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';

@Module({
  providers: [ BlogUserFactory, BlogUserRepository, BlogUserService ],
  controllers: [ BlogUserController ],
  exports: [ BlogUserRepository ],
})
export class BlogUserModule {}
