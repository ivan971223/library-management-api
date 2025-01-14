import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
})
export class DatabaseModule {}
