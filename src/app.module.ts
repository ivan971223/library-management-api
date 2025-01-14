import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, BooksModule, BorrowingModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
