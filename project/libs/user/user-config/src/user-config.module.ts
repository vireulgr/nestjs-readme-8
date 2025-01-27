import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/app.config';
import mongoConfig from './configurations/mongo.config';

const ENV_FILE_PATH = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO передать список конфигураций для загрузки
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: []
})
export class UserConfigModule {}
