import { ConfigType, registerAs } from '@nestjs/config';
import { MongoConfiguration } from './mongodb/mongo.env';
import { plainToClass } from 'class-transformer';

const DEFAULT_MONGO_PORT = 27017;

async function getConfig(): Promise<MongoConfiguration> {
  const mongoConfig = plainToClass(MongoConfiguration, {
    host:     process.env.MONGO_HOST,
    port:     parseInt(process.env.MONGO_PORT || `${DEFAULT_MONGO_PORT}`, 10),
    user:     process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    name:     process.env.MONGO_DB_NAME,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await mongoConfig.validate();
  return mongoConfig;
}

export default registerAs('mongo', async (): Promise<ConfigType<typeof getConfig>> => { return getConfig(); });
