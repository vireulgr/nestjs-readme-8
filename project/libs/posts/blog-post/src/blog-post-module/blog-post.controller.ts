import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { EditPostBaseDto } from '../dto/edit-post-base.dto';
import { EditPostBaseRdo } from '../rdo/edit-post-base.rdo';
import { BlogPostService } from './blog-post.service';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {

  constructor(public readonly blogPostService: BlogPostService) {}

  // пример запроса:`GET posts/list?sort=<[-]time|likes|comments|popular>&page=<number>`
  @Get('list')
  public listPosts(@Query('sort') sortingOptions: string, @Query('page') page: number) {
    return this.blogPostService.listPosts(sortingOptions, page);
  }

  @Get('search')
  @ApiFoundResponse({
    type: [EditPostBaseRdo]
  })
  @ApiNotFoundResponse()
  public searchPosts(@Query('q') searchQuery: string) {
    return this.blogPostService.search(searchQuery);
  }

  @Get(':id')
  public async getPost(@Param('id') id: string) {
    const result = await this.blogPostService.getPost(id);
    return result.toPOJO();
  }

  @ApiBody({type: EditPostBaseDto})
  @ApiCreatedResponse({
    description: 'Successfully created post',
    type: EditPostBaseRdo,
  })
  @Post('create')
  public create(@Body() dto: EditPostBaseDto) {
    return this.blogPostService.create(dto);
  }

  @ApiBody({type: EditPostBaseDto})
  @Patch('edit')
  public edit(dto: EditPostBaseDto) {
    return this.blogPostService.edit(dto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.blogPostService.delete(id);
  }
}
