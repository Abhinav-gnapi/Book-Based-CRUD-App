export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  price: number;
  publicationYear: number;
  reviewCount: number;
}