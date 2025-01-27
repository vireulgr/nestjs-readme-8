import dayjs from 'dayjs';
import { ConflictException, Inject, Injectable, Logger, NotFoundException/*, UnauthorizedException*/ } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRole } from '@project/core';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { mongoConfig } from '@project/user-config';
import { ConfigType } from '@nestjs/config';

const MSG_AUTH_USER_EXISTS = 'User with this email exists';
const MSG_AUTH_USER_NOT_FOUND = 'User not found';
// const MSG_AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

@Injectable()
export class AuthenticationService {
  logger: Logger;
  constructor(
    private readonly repository: BlogUserRepository,
    @Inject(mongoConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof mongoConfig>,
  ) {
    this.logger = new Logger(this.constructor.name);
//    console.log(this.databaseConfig.host);
//    console.log(this.databaseConfig.user);
  }

  public async register(dto: CreateUserDto) {

    const blogUser = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: UserRole.User,
      avatar: '',
      dateOfBirth: dayjs(dto.dateOfBirth).toDate(),
      passwordHash: '',
    };

    //this.logger.log(`got user email ${dto.email}`);

    const existingUser = await this.repository.findByEmail(dto.email);
    //this.logger.log('user from register:');
    //this.logger.log(existingUser);
    if (existingUser) {
      throw new ConflictException(MSG_AUTH_USER_EXISTS);
    }

    const newUser = new BlogUserEntity(blogUser);
    await newUser.setPassword(dto.password);

    this.repository.save(newUser);

    return newUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const existingUser = await this.repository.findByEmail(dto.email);
    if (!existingUser) {
      throw new NotFoundException(MSG_AUTH_USER_NOT_FOUND);
    }

    if (!await existingUser.comparePassword(dto.password)) {
      //throw new UnauthorizedException(MSG_AUTH_USER_PASSWORD_WRONG);
      throw new NotFoundException(MSG_AUTH_USER_NOT_FOUND); // это более секурно
    }

    return existingUser;
  }

  public async getUser(id: string): Promise<BlogUserEntity | null> {
    return this.repository.findById(id);
  }
}
