import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMovie } from '@app/shared/interfaces/add-movie';
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
  this.isAdmin();
  }

  isAdmin(): boolean {
    // Decodificar el token JWT y obtener los roles
    const token = sessionStorage.getItem('token'); // Obtener el token JWT de alguna manera
    // const decodedToken = jwt_decode(token);
    console.log("Token: ",token);
    // const roles = decodedToken.;
  
    // Verificar si el rol de "administrador" está presente en los roles
    // return roles.includes('administrador');
    return true;
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
    const newMovie: AddMovie =
    {
      title: this.formMovie.value.title,
      description: this.formMovie.value.description,
      author: this.formMovie.value.author,
      genre: this.formMovie.value.genre,
      cast: this.formMovie.value.cast,
      posterImage: this.formMovie.value.posterImage
    };
    console.log(newMovie);

    // this.apiservices.NewMovie(newMovie).subscribe( movie => {console.log(movie); this.router2.navigate(['/'])});
    // window.location.reload();
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    this.router2.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router2.navigate([this.router.url]);
    });
  }
  // public config: PaginationInstance = {
  //   itemsPerPage: 10,
  //   currentPage: 1
  // };
}
function jwt_decode(token: any) {
  throw new Error('Function not implemented.');
}

