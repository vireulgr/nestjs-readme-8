import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EditPostBaseDto } from '../dto/edit-post-base.dto';
import { BlogPostService } from './blog-post.service';
import { ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { EditPostBaseRdo } from '../rdo/edit-post-base.rdo';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {

  constructor(public readonly blogPostService: BlogPostService) {}

  // `GET posts/list?sort=&<[-]time|likes|comments|popular>&page=<number>`
  @Get('list')
  public listPosts(@Query('sort') sortingOptions: string, @Query('page') page: number) {
  }

  @Get('search')
  @ApiFoundResponse({
    type: [EditPostBaseRdo]
  })
  @ApiNotFoundResponse()
  public searchPosts(@Query('q') searchQuery: string) {
  }

  @Get(':id')
  public getPost(@Param('id') id: string) {
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

  @Patch('edit')
  public edit(dto: EditPostBaseDto) {
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
  }
}
