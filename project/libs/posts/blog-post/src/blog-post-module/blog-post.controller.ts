import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EditPostBaseDto } from '../dto/edit-post-base.dto';
import { BlogPostService } from './blog-post.service';

@Controller('posts')
export class BlogPostController {

  constructor(public readonly blogPostService: BlogPostService) {}

  // `GET posts/list?sort=&<[-]time|likes|comments|popular>&page=<number>`
  @Get('list')
  public listPosts(@Query('sort') sortingOptions: string, @Query('page') page: number) {
  }

  @Get('search')
  public searchPosts(@Query('q') searchQuery: string) {
  }

  @Get(':id')
  public getPost(@Param('id') id: string) {
  }

  @Post('create')
  public create(dto: EditPostBaseDto) {
    return this.blogPostService.create(dto);
  }

  @Patch('edit')
  public edit(dto: EditPostBaseDto) {
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
  }
}
