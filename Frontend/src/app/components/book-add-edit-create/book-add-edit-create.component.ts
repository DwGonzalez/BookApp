import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-add-edit-create',
  templateUrl: './book-add-edit-create.component.html',
  styleUrls: ['./book-add-edit-create.component.css']
})
export class BookAddEditCreateComponent implements OnInit {

  public formBook = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pageCount: new FormControl('', Validators.required),
    excerpt: new FormControl('', Validators.required),
    publishDate: new FormControl('', Validators.required),
  });

  bookDetails!: Book[];
  idParam!: string;

  constructor(private _bookService: BookService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  addBook() {
    this._bookService.addBook(this.formBook.value).subscribe(b => {
      if (b.success == true) {
        Swal.fire(
          'Saved!',
          b.message,
          'success'
        )
        this.router.navigate(['books'], { replaceUrl: true });
      }
    })
  }

}
