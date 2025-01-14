import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BorrowingService } from '../borrowing/borrowing.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly borrowingService: BorrowingService,
  ) {}

  @Get('/:userId')
  async getUserBorrowRecords(@Param('userId') userId: number) {
    const records = await this.borrowingService.findByUserId(userId);
    if (!records.length) {
      throw new NotFoundException('No borrow records found for this user');
    }

    return records;
  }
}
