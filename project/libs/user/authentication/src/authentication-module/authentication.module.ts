import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [ BlogUserModule ], // для blog user repository
  controllers: [ AuthenticationController ],
  providers: [ AuthenticationService ],
  exports: [ AuthenticationService ],
})
export class AuthenticationModule {}
