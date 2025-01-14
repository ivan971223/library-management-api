import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrowing } from './entities/borrowing.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepository: Repository<Borrowing>,
  ) {}

  async create(data: { userId: number; bookId: number }): Promise<Borrowing> {
    const borrowing = this.borrowingRepository.create({
      user: { id: data.userId },
      book: { id: data.bookId },
    });
    return this.borrowingRepository.save(borrowing);
  }

  async findOne(id: number): Promise<Borrowing> {
    return this.borrowingRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
  }

  async findByUserId(userId: number): Promise<Borrowing[]> {
    return this.borrowingRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });
  }

  async updateReturnDate(id: number): Promise<void> {
    await this.borrowingRepository.update(id, { return_date: new Date() });
  }
}
