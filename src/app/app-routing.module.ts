import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full'},
 { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
 { path: 'movie-list', loadChildren: () => import('./components/pages/movies/movie-list/movie-list.module').then(m => m.MovieListModule) },
//  {path: 'character-details/:id', loadChildren: () => import('./components/pages/characters/character-details/character-details.module').then((m) => m.CharacterDetailsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
