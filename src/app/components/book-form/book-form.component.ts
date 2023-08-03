import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  isNewBook: boolean = true;
  book: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // Obtener el ID del libro de los parámetros de la URL
    this.route.params.subscribe(params => {
      const bookId = params['id'];

      if (bookId) {
        // Si hay un ID, es una edición de libro existente
        this.isNewBook = false;
        this.loadBook(bookId);
      }
    });
  }

  loadBook(bookId: number) {
    // Cargar el libro existente para editar
    //const userId = this.getCurrentUserId(); // Implementa esta función para obtener el ID del usuario actual
    this.bookService.getBookByUser(1, bookId).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.error('Error al cargar el libro', error);
      }
    );
  }

  onSubmit() {
    //const userId = this.getCurrentUserId(); // Implementa esta función para obtener el ID del usuario actual

    if (this.isNewBook) {
      // Es un nuevo libro, guardar
      this.bookService.addBook(1, this.book).subscribe(
        () => {
          console.log('Libro agregado exitosamente');
          this.router.navigate(['/user-dashboard']);
        },
        (error) => {
          console.error('Error al agregar el libro', error);
        }
      );
    } else {
      // Es una edición, actualizar
      const bookId = this.book.id; // Suponemos que el ID del libro ya está en el objeto this.book
      this.bookService.updateBook(1, bookId, this.book).subscribe(
        () => {
          console.log('Libro actualizado exitosamente');
          this.router.navigate(['/user-dashboard']);
        },
        (error) => {
          console.error('Error al actualizar el libro', error);
        }
      );
    }
  }
}
