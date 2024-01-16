import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { movieListRoutingModule } from './movie-list-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    movieListRoutingModule
  ]
})
export class MovieListModule { }
