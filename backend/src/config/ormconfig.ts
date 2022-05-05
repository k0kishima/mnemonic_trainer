import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import TypeOrmNamingStrategy from './TypeOrmNamingStrategy';

const database = process.env.DB_DATABASE ?? 'mnemonic_trainer';
const databaseForTest = `${database}_test`;

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'host.docker.internal',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 33306,
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.NODE_ENV === 'test' ? databaseForTest : database,
  synchronize: process.env.NODE_ENV === 'test' ? true : false,
  dropSchema: process.env.NODE_ENV === 'test' ? true : false,
  migrationsRun: false,
  entities:
    process.env.NODE_ENV === 'test'
      ? ['src/**/*.entity.ts']
      : ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: process.env.NODE_ENV === 'production' ? false : true,
};
