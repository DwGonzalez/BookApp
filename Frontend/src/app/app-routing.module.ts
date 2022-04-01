import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddEditCreateComponent } from './components/book-add-edit-create/book-add-edit-create.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListComponent } from './components/book-list/book-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: 'books/add',
    component: BookAddEditCreateComponent
  },
  {
    path: 'books/:id/:action',
    component: BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
