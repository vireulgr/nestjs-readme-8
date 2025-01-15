import { ApiProperty } from '@nestjs/swagger';

export class EditPostBaseDto {
  @ApiProperty({required: false})
  public id?: string;
  @ApiProperty()
  public postAuthor: string; // user uuid
  @ApiProperty()
  public publicationDate: string;
  @ApiProperty()
  public createDate: string;
  @ApiProperty()
  public isRepost: boolean;
  @ApiProperty()
  public isPublished: boolean; // опубликована или черновик
  @ApiProperty({type: [String]})
  public tags: string[];
  @ApiProperty()
  public postType: string;
}
