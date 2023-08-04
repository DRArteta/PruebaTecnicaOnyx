import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number;
  isNewBook: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    this.bookId = 0;
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      editorial: [''],
      year: ['', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      synopsis: [''],
      pages: ['', [Validators.required, Validators.min(1)]],
      language: ['', Validators.required],
      availability: [''],
      keywords: [''],
      url: ['', Validators.pattern('https?://.+')],
      userId: [this.authService.getCurrentUserId()] // Supongamos que aquí tienes el ID del usuario después de iniciar sesión
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
      if (this.bookId !== 0) {
        this.bookService.getBookByUser(this.authService.getCurrentUserId(), this.bookId).subscribe((result)=>{
          this.bookForm.setValue({
            title: result.title,
            author: result.author,
            genre: result.genre,
            editorial: result.editorial,
            year: result.year,
            synopsis: result.synopsis,
            pages: result.pages,
            language: result.language,
            availability: result.availability,
            keywords: result.keywords, // Convertimos el array de palabras clave en una cadena separada por comas
            url: result.url,
            userId: this.authService.getCurrentUserId() // Supongamos que aquí tienes el ID del usuario después de iniciar sesión
          });
        },
        (error) => {
          this.snackbarService.showSnackbar("Error en la carga del libro: ", error);
        });
        this.isNewBook = false; // Es una edición
      } else {
        this.isNewBook = true; // Es un nuevo libro
      }
    });
    const bookId: number | null = this.route.snapshot.paramMap.get('id')
      ? Number(this.route.snapshot.paramMap.get('id'))
      : null;

    if (bookId) {
      this.isNewBook = false;
      this.bookService.getBookByUser(1, bookId).subscribe(
        (book) => {
          this.bookForm.setValue({
            title: book.title,
            author: book.author,
            genre: book.genre,
            editorial: book.editorial,
            year: book.year,
            synopsis: book.synopsis,
            pages: book.pages,
            language: book.language,
            availability: book.availability,
            keywords: book.keywords.join(', '), // Convertimos el array de palabras clave en una cadena separada por comas
            url: book.url,
            userId: 1 // Supongamos que aquí tienes el ID del usuario después de iniciar sesión
          });
        },
        (error) => {
          this.snackbarService.showSnackbar('Error al cargar el libro', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const userId = 1; // Supongamos que aquí tienes el ID del usuario después de iniciar sesión
      if (this.isNewBook) {
        this.bookService.addBook(userId, this.bookForm.value).subscribe(
          () => {
            // Redirigir al dashboard o a otra página
            this.router.navigate(['/user-dashboard']);
            this.snackbarService.showSnackbar('Libro agregado correctamente');
          },
          (error) => {
            this.snackbarService.showSnackbar('Error al agregar el libro', error);
          }
        );
      } else {
        const bookId: number = this.route.snapshot.paramMap.get('id')
          ? Number(this.route.snapshot.paramMap.get('id'))
          : 0;

        if (this.bookId !== 0) {
          this.bookService
            .updateBook(this.authService.getCurrentUserId(), this.bookId, this.bookForm.value)
            .subscribe(
              () => {
                // Redirigir al dashboard o a otra página
                this.router.navigate(['/user-dashboard']);
                this.snackbarService.showSnackbar('Libro actualizado correctamente');
              },
              (error) => {
                this.snackbarService.showSnackbar('Error al actualizar el libro', error);
              }
            );
        }
      }
    }
  }
}
