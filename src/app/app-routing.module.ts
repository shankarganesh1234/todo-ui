import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KeyComponent} from './key/key.component';
import {TodoComponent} from './todo/todo.component';


const routes: Routes = [
  {path: '', component: KeyComponent},
  {path: 'todo/:key', component: TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
