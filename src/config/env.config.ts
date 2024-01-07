import * as dotenv from 'dotenv';
import { join } from 'path';

export const configFilePath = join(
  __dirname,
  '../../environments/',
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env.development',
);

dotenv.config({ path: configFilePath });
