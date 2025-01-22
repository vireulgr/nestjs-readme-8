import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO передать список конфигураций для загрузки
      load: [],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: []
})
export class UserConfigModule {}
