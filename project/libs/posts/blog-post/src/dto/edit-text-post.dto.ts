import { EditPostBaseDto } from './edit-post-base.dto';

export class EditTextPostDto extends EditPostBaseDto {
  public title: string;
  public announcement: string;
  public text: string;
}
