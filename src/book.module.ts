import { HttpModule, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PaginationService } from './pagination.service';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService, PaginationService],
})
export class BookModule {}
