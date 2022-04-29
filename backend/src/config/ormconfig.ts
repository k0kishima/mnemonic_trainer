import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import TypeOrmNamingStrategy from './TypeOrmNamingStrategy';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'host.docker.internal',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 33306,
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_DATABASE ?? 'mnemonic_trainer',
  synchronize: true,
  entities: ['dist/entity/*.js'],
  namingStrategy: new TypeOrmNamingStrategy(),
};
