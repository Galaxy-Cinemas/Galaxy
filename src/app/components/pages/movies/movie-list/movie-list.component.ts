import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '@app/shared/interfaces/movie';
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

  formMovie: FormGroup;

  constructor(private apiservices:MoviesService, private router: ActivatedRoute, private formBuilder: FormBuilder,
    private http: HttpClient,
    private router2: Router ) 
  { 

    this.formMovie = formBuilder.group({
      title:['', Validators.required],
      description:['', Validators.required],
      author:['', Validators.required],
      genre:['', Validators.required],
      cast:['', Validators.required],
      posterImage:['', Validators.required],
    });
  }

  ngOnInit(): void{
  this.loadMovieList();
  
  }

  loadMovieList(){
    this.router.params.subscribe( params =>{
      this.getAllMovies();
    })
  }

  getAllMovies(){
    this.moviesLocal = this.apiservices.searchMovies();
  }

  addMovieId()
  {
    alert("Se ha agregado una nueva pelicula");
    const newMovie: Movie =
    {
      title: this.formMovie.value.title,
      description: this.formMovie.value.description,
      author: this.formMovie.value.author,
      genre: this.formMovie.value.genre,
      cast: this.formMovie.value.cast,
      posterImage: this.formMovie.value.posterImage
    };
    console.log(newMovie);

    this.apiservices.NewMovie(newMovie).subscribe( movie => {console.log(movie); this.router2.navigate(['/'])});
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    this.router2.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router2.navigate([this.router.url]);
    });
  }
}
