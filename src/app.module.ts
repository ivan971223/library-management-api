import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { UsersModule } from './modules/users/users.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, BooksModule, BorrowingModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
