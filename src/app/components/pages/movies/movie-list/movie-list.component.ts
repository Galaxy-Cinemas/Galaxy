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
  moviesLocal?:Observable<any>;

  constructor(private apiservices:MoviesService, private router: ActivatedRoute) { }

  ngOnInit(): void{
  this.loadMovieListMarvel();
  this.loadMovieList();
  }

  loadMovieListMarvel(){
    this.router.params.subscribe( params =>{
      this.query = params['query'];
      this.getAllMoviesMarvel();
    })
  }

  loadMovieList(){
    this.router.params.subscribe( params =>{
      this.getAllMovies();
    })
  }

  // public config: PaginationInstance = {
  //   itemsPerPage: 10,
  //   currentPage: 1
  // };

  getAllMovies(){
    this.moviesLocal = this.apiservices.searchMovies();
  }

  getAllMoviesMarvel(){
    this.movies = this.apiservices.searchCharactersMarvel(this.query);
  }
}
