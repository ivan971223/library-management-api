import { Controller } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}
}
