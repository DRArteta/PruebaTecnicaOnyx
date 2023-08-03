import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  searchTerm: string = '';
  selectedGenre: string = '';
  genres: string[] = ['Novela', 'Ciencia Ficción', 'Drama', 'Romance', 'Fantasía'];
  books: any[] = [];
  userId: number; // Supongamos que aquí tienes el ID del usuario después de iniciar sesión

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getCurrentUserId();
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<any[]>('http://localhost:3000/books?userId=' + this.userId).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error al cargar los libros', error);
      }
    );
  }

  get filteredBooks() {
    return this.books.filter(book =>
      (book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       book.author.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedGenre === '' || book.genre === this.selectedGenre)
    );
  }
}
