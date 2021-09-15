export interface Book {
  title: string
  author: string
  date: string
}

export interface listQueryBook {
  author?: string,
  nbrResultPerPage?: string,
  page?: string,
}

export interface bookApi {
  title: string,
  authors: string,
  num_pages: string,
  publisher: string,
  language_code: string,
  publication_date: string
}