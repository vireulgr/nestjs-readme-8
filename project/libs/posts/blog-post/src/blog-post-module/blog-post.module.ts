import { Module } from '@nestjs/common';

@Module({
  providers: [ BlogPostService ],
  controllers: [ BlogPostController ]
})
export class BlogPostModule {}
