import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from '@app/shared/interfaces/movie';
import { MoviesService } from '@app/shared/services/movies.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent {

  formMovie: FormGroup;
  movieId:any;
  movie!:Movie;

  constructor
  (
    private apiservices:MoviesService,
    private ActRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router2: Router 
  ) {
    this.formMovie = formBuilder.group({
      title:['', Validators.required],
      description:['', Validators.required],
      author:['', Validators.required],
      genre:['', Validators.required],
      cast:['', Validators.required],
      posterImage:['', Validators.required],
    });
  }
  ngOnInit(){
    this.loadMovie();
    console.log(this.movieId)
  }

  updateMovieId()
  {
    alert("Se ha agregado una nueva pelicula");
    const updateMovie: Movie =
    {
      MovieId: this.movieId,
      title: this.formMovie.value.title,
      description: this.formMovie.value.description,
      author: this.formMovie.value.author,
      genre: this.formMovie.value.genre,
      cast: this.formMovie.value.cast,
      posterImage: this.formMovie.value.posterImage
    };
    console.log(updateMovie);

    this.apiservices.updateMovie(this.movieId, updateMovie).subscribe( movie => {console.log(movie); this.router2.navigate(['/'])});
    // this.reloadCurrentRoute();
  }


  private loadMovie(){
    this.ActRouter.params.pipe(take(1)).subscribe((params)=>{
      this.movieId = params['id'];
      this.MovieById(params['id']);
    })
  }
 public async MovieById(movieId: number){
    this.apiservices.getMovieById(movieId)
     .pipe(take(1))
     .subscribe(async (res: any) =>{
      this.movie = res;
      this.formMovie = this.formBuilder.group({
        title:[this.movie.title, Validators.required],
        description:[this.movie.description, Validators.required],
        author:[this.movie.author, Validators.required],
        genre:[this.movie.genre, Validators.required],
        cast:[this.movie.cast, Validators.required],
        posterImage:[this.movie.posterImage, Validators.required],
      });
     });

     
  }


  

}
