import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';

const OpenAPIDescriptions = {
  UserCreated: 'User successfully created',
  ShowUser: '[DEV] get user data from auth service',
  ShowUserNotFound: '[DEV] user not found',
} as const;

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: OpenAPIDescriptions.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already existing',
  })
  @ApiBody({
    type: CreateUserDto
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '',
  })
  @ApiBody({
    type: LoginUserDto
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: OpenAPIDescriptions.ShowUser,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: OpenAPIDescriptions.ShowUserNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.toPOJO();
  }
}
