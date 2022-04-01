import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperationResponse } from '../models/OperationResponse';

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
    return this._http.get<OperationResponse>(this.apiUrl + id);
  }
}
