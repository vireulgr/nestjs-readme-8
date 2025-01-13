import { UserRole } from '@project/core';

export class EditBlogUserDto {
  public id: string;

  public email: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public role: UserRole;
  public passwordHash: string;
}
