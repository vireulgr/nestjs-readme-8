import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/helpers';


export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('mongo.user'),
          password: config.get<string>('mongo.password'),
          host: config.get<string>('mongo.host'),
          port: config.get<string>('mongo.port'),
          databaseName: config.get<string>('mongo.name'),
          authDatabase: config.get<string>('mongo.authBase'),
        }),
      };
    },
    inject: [ConfigService]
  };
}
