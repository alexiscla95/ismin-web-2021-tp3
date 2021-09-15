import { Controller, Get, Post, Body, Param, Query, Delete } from '@nestjs/common';
import { BookService } from './book.service'
import { PaginationService } from './pagination.service'
import { Book, listQueryBook } from './interface'


@Controller('/books')
export class BookController {
  constructor(
    private readonly bookService: BookService, 
    private readonly paginationService: PaginationService
  ) {}

  @Get()
  getBooks(@Query() query: listQueryBook): Book[] {
    if(query.author) {
      return this.paginationService.getBookPagination(this.bookService.getBooksOf(query.author), parseInt(query.nbrResultPerPage), parseInt(query.page))
    } else {
      return this.paginationService.getBookPagination(this.bookService.getAllBooks(), parseInt(query.nbrResultPerPage), parseInt(query.page))
    }
  }



  @Post()
  addBook(@Body() body: Book): Book {
    this.bookService.addBook(body)
    return body
  }

  @Get(':title')
  getBook(@Param('title') title: string ): Book {
    return this.bookService.getBook(title)
  }

  @Delete(':title')
  deleteBook(@Param('title') title: string): void {
    this.bookService.deleteBook(title)
  }

  @Post('search')
  search(@Body('term') term: string): Book[] {
    return this.bookService.search(term)
  }

}
