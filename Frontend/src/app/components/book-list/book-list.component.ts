import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { OperationResponse } from 'src/app/models/OperationResponse';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: Book[] = [];
  loading: boolean = true;

  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this._bookService.getBooks().subscribe(d => {
      console.log(d)
      this.loading = false;
    }, err => {
      console.log(err.message);
    })
  }

  getBook(id: number) {
    this._bookService.getBook(id).subscribe(b => {
      console.log(b);
    }, err => {
      console.log(err.message);
    })
  }

  addBook(book: Book) {
    this._bookService.addBook(book).subscribe(b => {
      console.log(b);
    }, err => {
      console.log(err.message);
    })
  }

  deleteBook(id: number) {
    this._bookService.deleteBook(id).subscribe(b => {
      console.log(b);
    }, err => {
      console.log(err.message);
    })
  }

  updateBook(id: number, book: Book) {
    this._bookService.updateBook(id, book).subscribe(b => {
      console.log(`id: ${id}, book: ${book}`);
    }, err => {
      console.log(err.message);
    })
  }


}