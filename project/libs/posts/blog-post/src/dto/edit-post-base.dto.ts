
export class EditPostBaseDto {
  public id?: string;
  public postAuthor: string; // user uuid
  public publicationDate: string;
  public createDate: string;
  public isRepost: boolean;
  public isPublished: boolean; // опубликована или черновик
  public tags: string[];
  public postType: string;
}
