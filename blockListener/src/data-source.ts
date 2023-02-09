import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from './entities/Users';
import { Transactions } from './entities/Transactions';
import { Swaps } from './entities/Swaps';
import getEnv from './utils/getEnv';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: getEnv('DB_HOST'),
  port: 3306,
  username: getEnv('DB_USERNAME'),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_SCHEMA'),
  synchronize: true,
  logging: false,
  entities: [Users, Transactions, Swaps],
  migrations: [],
  subscribers: [],
});
