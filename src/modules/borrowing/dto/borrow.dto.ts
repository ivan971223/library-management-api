import { IsInt, IsPositive } from 'class-validator';

export class BorrowDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  bookId: number;
}
