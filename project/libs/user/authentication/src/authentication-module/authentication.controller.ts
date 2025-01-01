import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthUser } from '@project/core';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto): AuthUser {
    const newUser = await this.authService.register(dto);

    return newUser.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto): AuthUser {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  public async show(@Param('id') id: string): AuthUser {
    const existingUser = await this.authService.getUser(id);
    return existingUser.toPOJO();
  }
}
