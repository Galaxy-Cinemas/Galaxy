import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateMovieComponent } from './update-movie.component';



const routes: Routes = [{ path: '', component: UpdateMovieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateMovieRoutingModule { }


//-------------------------------------------------------------------------------------

