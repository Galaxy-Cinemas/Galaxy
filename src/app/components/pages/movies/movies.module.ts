import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';

const myComponents=[MovieListComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[...myComponents]

})
export class MoviesModule { }
