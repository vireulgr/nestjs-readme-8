import { Entity, StorableEntity } from '@project/core';
import { BlogPost, Tag, PostType } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {

  postAuthor: string; // user uuid
  publicationDate: string;
  createDate: string;
  isRepost: boolean;
  isPublished: boolean; // опубликована или черновик
  tags: Tag[];
  postType: PostType;

  constructor(post?: BlogPost) {
    super();
    this.populate(post);
  }

  public populate(post?: BlogPost): void {
    if (!post) {
      return;
    }

    this.id = this.id ?? '';
    this.postAuthor = post.postAuthor;
    this.publicationDate = post.publicationDate;
    this.createDate = post.createDate;
    this.isRepost = post.isRepost;
    this.isPublished = post.isPublished;
    this.tags = post.tags;
    this.postType = post.postType;
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      postAuthor: this.postAuthor,
      publicationDate: this.publicationDate,
      createDate: this.createDate,
      isRepost: this.isRepost,
      isPublished: this.isPublished,
      tags: this.tags,
      postType: this.postType,
    };
  }

  public async setAuthor(author: string): Promise<void> {
    this.postAuthor = author;
  }
}
