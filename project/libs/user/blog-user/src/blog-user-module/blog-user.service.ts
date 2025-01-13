import dayjs from 'dayjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@project/core';
import { BlogUserRepository } from './blog-user.repository';
import { EditBlogUserDto } from '../dto/edit-blog-user.dto';
import { BlogUserEntity } from './blog-user.entity';

const MSG_BLOG_USER_NOT_FOUND_BY_ID = 'Cannot edit user; ID not found!';

@Injectable()
export class BlogUserService {

  constructor(private readonly repository: BlogUserRepository) {}

  public async delete(id: string): Promise<void> {
    return this.repository.deleteById(id);
  }

  public async edit(dto: EditBlogUserDto) {

    const blogUser = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: UserRole.User,
      avatar: '',
      dateOfBirth: dayjs(dto.dateOfBirth).toDate(),
      passwordHash: '',
    };

    const existingUser = await this.repository.findById(dto.id);
    if (existingUser) {
      throw new NotFoundException(MSG_BLOG_USER_NOT_FOUND_BY_ID);
    }

    const newUser = new BlogUserEntity(blogUser);
    // Edit password?

    this.repository.save(newUser);

    return newUser;
  }

  public async getUser(id: string): Promise<BlogUserEntity | null> {
    return this.repository.findById(id);
  }
}
