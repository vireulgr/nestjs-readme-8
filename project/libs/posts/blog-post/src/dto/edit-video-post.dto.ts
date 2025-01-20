import { EditPostBaseDto } from './edit-post-base.dto';

export class EditVideoPostDto extends EditPostBaseDto {
  public title: string;
  public videoUrl: string;
}
