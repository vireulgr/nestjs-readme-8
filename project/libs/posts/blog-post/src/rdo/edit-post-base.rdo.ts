import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EditPostBaseRdo {
  @ApiProperty()
  @Expose()
  id: string;
}
