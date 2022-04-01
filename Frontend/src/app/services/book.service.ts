import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperationResponse } from '../models/OperationResponse';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = environment.APIUrl + '/Books';

  constructor(private _http: HttpClient) { }

  getBooks() {
    return this._http.get<OperationResponse>(this.apiUrl);
  }

  getBook(id: number) {
    return this._http.get<OperationResponse>(this.apiUrl + `/${id}`);
  }

  addBook(book: Book) {
    return this._http.post<OperationResponse>(this.apiUrl, book);
  }

  deleteBook(id: number) {
    return this._http.delete<OperationResponse>(this.apiUrl + `/${id}`);
  }

  updateBook(id: number, book: Book) {
    return this._http.put<OperationResponse>(this.apiUrl + `/${id}`, book);
  }
}
