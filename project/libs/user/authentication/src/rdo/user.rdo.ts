import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public avatar: string;

  @Expose()
  @ApiProperty()
  public dateOfBirth: string;

  @Expose()
  @ApiProperty()
  public email: string;

  @Expose()
  @ApiProperty()
  public firstName: string;

  @Expose()
  @ApiProperty()
  public lastName: string;
}
