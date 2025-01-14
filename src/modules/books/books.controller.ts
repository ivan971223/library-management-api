import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  Query,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BorrowingService } from '../borrowing/borrowing.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly borrowingService: BorrowingService,
  ) {}

  @Post('/borrow')
  async borrowBook(
    @Body() borrowDto: { userId: number; bookId: number },
  ): Promise<string> {
    const { userId, bookId } = borrowDto;

    // Check if the book is available
    const book = await this.booksService.findOne(bookId);
    if (!book || !book.is_available) {
      throw new BadRequestException('Book is not available');
    }

    // Create a borrowing record
    await this.borrowingService.create({ userId, bookId });

    // Mark the book as unavailable
    await this.booksService.updateAvailability(bookId, false);

    return 'Book borrowed successfully';
  }

  @Put('/return/:id')
  async returnBook(@Param('id') borrowingId: number): Promise<string> {
    // Fetch the borrowing record
    const borrowing = await this.borrowingService.findOne(borrowingId);
    if (!borrowing) {
      throw new NotFoundException('Borrowing record not found');
    }

    // Update the return date
    await this.borrowingService.updateReturnDate(borrowingId);

    // Mark the book as available
    await this.booksService.updateAvailability(borrowing.book.id, true);

    return 'Book returned successfully';
  }

  @Get('/search')
  async searchBooks(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException('Search query is required');
    }

    const books = await this.booksService.search(query);
    return books;
  }
}
