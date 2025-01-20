import { EditPostBaseDto } from './edit-post-base.dto';

export class EditCitePostDto extends EditPostBaseDto {
  public text: string;
  public author: string;
}
