import { Injectable, OnModuleInit, ParseBoolPipe } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Book, bookApi } from './interface'
import { readFile } from 'fs/promises'

@Injectable()
export class BookService implements OnModuleInit {
  private bookStore: Book[] = []

  constructor(private httpService: HttpService) {}

  async onModuleInit(): Promise<void> {
    try {
      const promise = readFile('src/dataset.json', 'utf8')
      await promise
      await this.addFile(promise)
      const netBooks = await this.httpService.get('https://api.npoint.io/40518b0773c787f94072').toPromise()
      await this.addJson(netBooks.data)
    } catch (err) {
      console.log(err)
    }
  }

  addBook(book: Book): void {
    if (!this.bookStore.find(e => e === book)) {
      this.bookStore.push(book)
    }
  }

  getBook(name: string): Book | undefined {
    return this.bookStore.find(e => e.title === name)
  }

  getBooksOf(author: string): Book[] {
    return this.bookStore.filter(e => e.author === author)
  }

  getAllBooks(): Book[] {
    return this.bookStore.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
  }

  getTotalNumberOfBooks(): number {
    return this.bookStore.length
  }

  deleteBook(title: string): void {
    this.bookStore = this.bookStore.filter(e => e.title !== title)
  }

  search(term: string): Book[] {
    return this.bookStore.filter(e => (e.title.includes(term) || e.author.includes(term)))
  }

  async addFile(promise: Promise<string>): Promise<void> {
    const newBookStore = JSON.parse(await promise)
    newBookStore.forEach((e: Book) => {
      this.addBook(e)
    });
  }

  addJson(data: any[]): void {
    data.forEach(e => {
      this.addBook(this.bookParse(e))
    });
  }

  bookParse(book: bookApi): Book {
    const parsedBook: Book = {
      title: book.title,
      author: book.authors,
      date: book.publication_date
    }
    return parsedBook
  }
}
