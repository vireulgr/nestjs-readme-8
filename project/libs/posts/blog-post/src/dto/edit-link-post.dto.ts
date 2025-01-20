import { EditPostBaseDto } from './edit-post-base.dto';

export class EditTextPostDto extends EditPostBaseDto {
  public linkUrl: string;
  public description: string;
}
