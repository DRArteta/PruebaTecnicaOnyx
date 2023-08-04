export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  editorial?: string;
  year?: number;
  synopsis?: string;
  pages?: number;
  language?: string;
  availability?: boolean;
  keywords?: string[];
  url?: string;
}
