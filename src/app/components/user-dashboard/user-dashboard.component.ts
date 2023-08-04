import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { InfoComponent } from '../dialogs/info/info.component';

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

  displayedColumns: string[] = ['title', 'author', 'actions'];

  // Define la columna de acciones con el matColumnDef "actions"
  actionsColumn: string[] = ['actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private authService: AuthService, private bookService: BookService, private dialog: MatDialog, private router: Router) {
    this.userId = this.authService.getCurrentUserId();
    this.dataSource = new MatTableDataSource<any>(this.books); // Instanciar el dataSource con el arreglo books vacío al inicio
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<any[]>('http://localhost:3000/books?userId=' + this.userId).subscribe(
      (data) => {
        this.books = data;
        this.dataSource = new MatTableDataSource(this.books);

        // Configurar el paginador
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al cargar los libros', error);
      }
    );
  }

  viewBookInfo(book: Book){
    const userId = this.authService.getCurrentUserId();
    this.bookService.getBookByUser(userId, book.id).subscribe(
      (book) => {
        const dialogRef = this.dialog.open(InfoComponent, {
          width: '400px',
          data: { book: book }
        });
      },
      (error) => {
        console.error('Error al obtener la información del libro', error);
      }
    );
  }

  editBook(book: Book){
    const bookId = book.id;
    this.router.navigate(['/book-form', bookId]);
  }

  openDeleteDialog(book: Book) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { book: book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(book);
      }
    });
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(this.authService.getCurrentUserId(), book.id).subscribe(
      (data) => {
        this.loadBooks();
      },
      (error) => {
        console.error('Error al eliminar el libro', error);
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
