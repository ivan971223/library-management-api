import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<void> {
    await this.bookRepository.update(id, { is_available: isAvailable });
  }

  async search(query: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { author: Like(`%${query}%`) },
        { genre: Like(`%${query}%`) },
      ],
    });
  }
}
