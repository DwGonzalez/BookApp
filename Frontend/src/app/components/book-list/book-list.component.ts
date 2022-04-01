import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { OperationResponse } from 'src/app/models/OperationResponse';
import { BookService } from 'src/app/services/book.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  actualPage: number = 1;
  bookList: Book[] = [];
  loading: boolean = false;
  bookFilter: any = { id: '' };

  constructor(private _bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.loading = true;
    this._bookService.getBooks().subscribe(d => {
      //console.log(d)
      if (d.success == false) {
        Swal.fire(
          'There has been an error!',
          d.message,
          'error'
        )
      }
      this.bookList = d.data!;
      this.loading = false;
    }, err => {
      Swal.fire(
        'There has been an error!',
        err.message,
        'error'
      )
    })
  }

  deleteBook(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._bookService.deleteBook(id).subscribe(b => {
          Swal.fire(
            'Deleted!',
            b.message,
            'success'
          )
          this.getAllBooks();
        }, err => {
          Swal.fire(
            'There has been an error!',
            err.message,
            'error'
          )
        })
      }
    })


  }


}