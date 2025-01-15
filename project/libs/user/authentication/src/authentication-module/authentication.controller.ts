import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @ApiBody({
    type: CreateUserDto
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return newUser.toPOJO();
  }

  @ApiBody({
    type: LoginUserDto
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.toPOJO();
  }
}
