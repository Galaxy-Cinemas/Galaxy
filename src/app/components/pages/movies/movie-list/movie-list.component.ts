import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movieList: any= [];
  private query : string = '';
  movies?:Observable<any>;

  constructor(private apiservices:MoviesService, private router: ActivatedRoute) { }

  ngOnInit(): void{
  this.loadMovieList();
  }

  loadMovieList(){
    this.router.params.subscribe( params =>{
      this.query = params['query'];
      this.getAllMovies();
      console.log(this.query);
    })
  }

  getAllMovies(){
    this.movies = this.apiservices.searchCharacters(this.query);
    console.log(this.movies);
  }
}
