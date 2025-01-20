import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@project/core';

export class EditBlogUserDto {
  @ApiProperty({required: false})
  public id: string;

  @ApiProperty()
  public email: string;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public dateOfBirth: Date;
  @ApiProperty({type: String})
  public role: UserRole;
  @ApiProperty()
  public passwordHash: string;
}
