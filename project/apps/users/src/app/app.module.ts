import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { UserConfigModule } from '@project/user-config';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    UserConfigModule,
  ],
})
export class AppModule {}
