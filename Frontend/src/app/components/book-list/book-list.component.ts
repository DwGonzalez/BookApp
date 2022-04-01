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
  loading!: true;

  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBoks();
  }

  getAllBoks() {
    this._bookService.getBooks().subscribe(d => { console.log(d) },
      (error) => { alert(error.message); })
  }

}
