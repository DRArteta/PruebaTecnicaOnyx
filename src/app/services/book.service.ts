import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; // URL del endpoint para libros

  constructor(private http: HttpClient) {}

  // Función para obtener todos los libros de un usuario específico
  getBooksByUser(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Función para obtener un libro específico de un usuario
  getBookByUser(userId: number, bookId: number) {
    return this.http.get<any>(`${this.apiUrl}/${bookId}?userId=${userId}`);
  }

  // Función para agregar un nuevo libro a un usuario
  addBook(userId: number, book: any) {
    book.userId = userId;
    return this.http.post(this.apiUrl, book);
  }

  // Función para actualizar un libro específico de un usuario
  updateBook(userId: number, bookId: number, book: any) {
    return this.http.put(`${this.apiUrl}/${bookId}?userId=${userId}`, book);
  }

  // Función para actualizar parcialmente un libro específico de un usuario
  updateBookPartial(userId: number, bookId: number, book: any) {
    return this.http.patch(`${this.apiUrl}/${bookId}?userId=${userId}`, book);
  }

  // Función para eliminar un libro específico de un usuario
  deleteBook(userId: number, bookId: number) {
    return this.http.delete(`${this.apiUrl}/${bookId}?userId=${userId}`);
  }
}
