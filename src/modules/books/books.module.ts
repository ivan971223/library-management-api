import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BorrowingService } from '../borrowing/borrowing.service';
import { BorrowingModule } from '../borrowing/borrowing.module';
import { Borrowing } from '../borrowing/entities/borrowing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrowing]), BorrowingModule],
  controllers: [BooksController],
  providers: [BooksService, BorrowingService],
})
export class BooksModule {}
