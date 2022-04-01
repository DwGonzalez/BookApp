import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public formBook = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pageCount: new FormControl('', [Validators.required, Validators.min(1)]),
    excerpt: new FormControl('', Validators.required),
    publishDate: new FormControl('', [Validators.required]),
  });
  isEditing: boolean = false;
  bookDetails!: Book;
  idParam!: string;

  constructor(private _bookService: BookService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isEditing = (params['action'] == 'edit');
      this.idParam = params['id'];
      if (!!this.idParam) {
        this.getBookDetails(params['id'])
        if (!this.isEditing) {
          this.formBook.disable();
        }
      } else {
        //console.log('test');
      }
    });
  }

  getBookDetails(id: number) {
    this._bookService.getBook(id).subscribe(b => {
      this.bookDetails = b.data! as Book;
      var formatedDate = formatDate(this.bookDetails.publishDate, 'yyyy-MM-dd', 'en');
      this.bookDetails.publishDate = new Date(formatedDate);
      this.formBook.setValue(this.bookDetails);
    }, err => {
      console.log(err.message);
    })
  }

  updateBook() {
    this._bookService.updateBook(this.bookDetails.id, this.bookDetails).subscribe(b => {
      Swal.fire(
        '',
        b.message,
        'success'
      )
      this.router.navigate(['books'], { replaceUrl: true });
    }, err => {
      Swal.fire(
        'There has been an error!',
        err.message,
        'error'
      )
      //console.log(err.message);
    })
  }

}
