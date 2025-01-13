import { Body, Controller, Delete, Get, Logger, Param, Patch } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { EditBlogUserDto } from '../dto/edit-blog-user.dto';

@Controller('user')
export class BlogUserController {
  constructor(private blogUserService: BlogUserService) {}

  // TODO
  @Get(':id')
  public getUser(@Param('id') id: string) {
    Logger.log(`get blog user id: ${id}`)
    this.blogUserService.getUser(id);
  }

  @Patch(':id')
  public editUser(@Body() dto: EditBlogUserDto) {
    Logger.log(`edit blog user id: ${dto.id}`)
    this.blogUserService.edit(dto);
  }

  @Delete(':id')
  public deleteUser(@Param() id: string) {
    Logger.log(`delete blog user id: ${id}`)
    this.blogUserService.delete(id);
  }
}
