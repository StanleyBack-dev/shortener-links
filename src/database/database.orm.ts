import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Users } from 'src/modules/users/entities/users.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Links } from 'src/modules/shortener/entities/links.entity';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`🧠 ENV DATABASE: ${process.env.NODE_ENV}`, '\n');

const isProduction = process.env.NODE_ENV === 'production';

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Auth, Links],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
};

export default typeOrmConfig;