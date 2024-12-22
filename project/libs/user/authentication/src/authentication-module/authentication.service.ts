import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from '../../../blog-user/src/blog-user-module/blog-user.repository';

@Injectable()
export class AuthenticationService {
  constructor(private readonly repository: BlogUserRepository) {}
}
