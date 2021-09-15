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