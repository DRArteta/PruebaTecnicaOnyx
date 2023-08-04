import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  book: Book;
  constructor(@Inject(MAT_DIALOG_DATA) public bookIn: Book) {
    this.book = bookIn;
  }
  ngOnInit(): void {
    this.book = this.bookIn;
    console.log(this.book);
  }
}
