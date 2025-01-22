import { Injectable, NotFoundException } from '@nestjs/common';
import { PostType } from '@project/core';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { EditPostBaseDto } from '../dto/edit-post-base.dto';
import { EditPostBaseRdo } from '../rdo/edit-post-base.rdo';

const MSG_BLOG_POST_NOT_FOUND_BY_ID = 'Cannot edit post; ID not found!';

@Injectable()
export class BlogPostService {

  constructor(private readonly repository: BlogPostRepository) {}

  public async delete(id: string): Promise<void> {
    return this.repository.deleteById(id);
  }

  public async edit(dto: EditPostBaseDto) {

    const blogPost = {
      postAuthor: dto.postAuthor, //: string; // user uuid
      publicationDate: dto.publicationDate, //: string;
      createDate: dto.createDate, //: string;
      isRepost: dto.isRepost, //: boolean;
      isPublished: dto.isPublished, //: boolean; // опубликована или черновик
      tags: dto.tags, //: string[];
      postType: dto.postType as PostType, //: string;
    };

    const existingPost = await this.repository.findById(dto.id);
    if (existingPost) {
      throw new NotFoundException(MSG_BLOG_POST_NOT_FOUND_BY_ID);
    }

    const newPost = new BlogPostEntity(blogPost);

    this.repository.save(newPost);

    return newPost;
  }

  public async getPost(id: string): Promise<BlogPostEntity | null> {
    return this.repository.findById(id);
  }

  public async search(query: string): Promise<BlogPostEntity[] | null> {
    return this.repository.search(query);
  }

  public async create(dto: EditPostBaseDto): Promise<EditPostBaseRdo | null> {
    const post = {
      ...dto,
      postType: dto.postType as PostType,
    };
    const newPost = new BlogPostEntity(post);

    this.repository.save(newPost);

    return newPost;
  }
}
