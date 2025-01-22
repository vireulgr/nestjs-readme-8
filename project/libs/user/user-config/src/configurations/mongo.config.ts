import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

interface MongoConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  authBase: string;
}

const configValidationSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});


function validateConfig(config: MongoConfig): void {
  const { error } = configValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Mongo configuration validation]: ${error.message}`);
  }
}

function getConfig(): MongoConfig {
  const mongoConfig = {
    host:     process.env.MONGO_HOST,
    port:     parseInt(process.env.MONGO_PORT || `${DEFAULT_MONGO_PORT}`, 10),
    user:     process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    name:     process.env.MONGO_DB_NAME,
    authBase: process.env.MONGO_AUTH_BASE,
  }

  validateConfig(mongoConfig);
  return mongoConfig;
}

export default registerAs('mongo', getConfig);
