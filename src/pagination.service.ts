import { Injectable } from '@nestjs/common'
import { Book } from './interface'

@Injectable()
export class PaginationService {
  
  getBookPagination(books: Book[], nbrResultPerPage: number, page: number): Book[] {
    if (nbrResultPerPage && page) {
      return books.slice(nbrResultPerPage*(page-1),nbrResultPerPage*page)
    }
    return books
  }

}
