import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isNewBook: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
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
      userId: [1] // Supongamos que aquí tienes el ID del usuario después de iniciar sesión
    });
  }

  ngOnInit() {
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
          console.error('Error al cargar el libro', error);
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
          },
          (error) => {
            console.error('Error al agregar el libro', error);
          }
        );
      } else {
        const bookId: number = this.route.snapshot.paramMap.get('id')
          ? Number(this.route.snapshot.paramMap.get('id'))
          : 0;

        if (bookId) {
          this.bookService
            .updateBook(userId, bookId, this.bookForm.value)
            .subscribe(
              () => {
                // Redirigir al dashboard o a otra página
                this.router.navigate(['/user-dashboard']);
              },
              (error) => {
                console.error('Error al actualizar el libro', error);
              }
            );
        }
      }
    }
  }
}
