import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Book } from '../modules/books/entities/book.entity';
import { User } from '../modules/users/entities/user.entity';
import { Borrowing } from '../modules/borrowing/entities/borrowing.entity';

dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: (process.env.DB_TYPE as any) ?? 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, Borrowing, User],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_table',
  synchronize: false,
};

const dataSource = new DataSource(dbConfig);
export default dataSource;
