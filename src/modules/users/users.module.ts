import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Borrowing } from '../borrowing/entities/borrowing.entity';
import { BorrowingModule } from '../borrowing/borrowing.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Borrowing]), BorrowingModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
