import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '@app/shared/interfaces/Ticket';
import { MoviesService } from '@app/shared/services/movies.service';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  formTicket: FormGroup;
  formFunction: FormGroup;

  movie:any;
  function:any;
  ticket: Ticket[] = [];

  functionId!: number;
  test:string = "";

  functionList?:Observable<any>;
  movieId:any;

  constructor(private apiservices:MoviesService, 
    private ActRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ) 
    {
      this.formTicket = formBuilder.group({
        numSets:[1, [Validators.required, this.minimumValueValidator(1)]]
      });

      this.formFunction = formBuilder.group({
        movieId:[0, Validators.required],
        price:[5000, Validators.required],
        functionDate:[, Validators.required],
        Teather:[1, Validators.required],
        numberOfSeats:[15, Validators.required],
      });
     }

  ngOnInit(){
    this.loadMovie();
    this.loadFunctionByMovieId();
  }

  /* ---------------------------------------------------------------------- GET MOVIE BY ID ---------------------------------------------------------------------- */
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
      // console.log(this.movie);
     });
  }

  /* ---------------------------------------------------------------------- DELETE MOVIE BY ID ---------------------------------------------------------------------- */

  public async deleteMovie(){
    let deleteMovie = confirm("Desea eliminar la Pelicula?")
    if(deleteMovie){

      this.deleteMovieId()
      
      // this.router.navigate(['/'])
      // console.log("Eliminada")
    }
    
  }
  public async deleteMovieId(){
    this.apiservices.deleteMovieById(this.movieId).subscribe((res) => 
    {
      this.loadMovie();
      console.log(res);
      this.router.navigate(['/']);
    });
  }

  /* ----------------------------------------------------------------------  GET FUNCTION BY MOVIE ID   ------------------------------------------------------- */
  private loadFunctionByMovieId(){
    this.ActRouter.params.subscribe((params)=>{
      this.movieId = params['id'];
      this.functionByMovieId(params['id']);
    })
  }

  public async functionByMovieId(movieId: number){
    this.functionList = this.apiservices.getFunctionByMovieId(movieId);
  }

/* ----------------------------------------------------------------------  GET FUNCTION BY ID ----------------------------------------------------------------------  */
  private loadFunctionById(){
    this.ActRouter.params.subscribe((params)=>{
      this.functionById(this.functionId);
    })
  }

  functionById(movieId: number){
    this.functionList = this.apiservices.getFunctionById(movieId);
  }
  
  saveFunctionId(functionId:number){
    this.functionId = functionId;
  }

  /* ----------------------------------------------------------------------  CREATE TICKET ----------------------------------------------------------------------  */

  get numSetsNoValid(){
    return this.formTicket.get('numSets')?.invalid 
  }

  minimumValueValidator(minimumValue: number) {
    return (control :AbstractControl) => {
      const value = control.value;
      if (value < minimumValue) {
        // console.log({ minValue: { requiredValue: minimumValue, actualValue: value } });
        return { minValue: { requiredValue: minimumValue, actualValue: value } };
      }
      return null;
    };
  }

  createTicket(){

    const newTicket = 
      {
        functionId:this.functionId, 
        userName:"",
        numSeats: this.formTicket.value.numSets
      };
    this.apiservices.BuyTicket(newTicket).subscribe( () => alert("Ticked Creado"));
  }


  /* ---------------------------------------------------------------------- Add Function  ---------------------------------------------------------------------- */
  addFunctionId(){
      const newFunction = 
      {
        movieId: this.movieId,
        price: this.formFunction.value.price,
        functionDate: "2024-01-18T01:14:14.788Z",
        Teather: this.formFunction.value.Teather,
        numberOfSeats: this.formFunction.value.numberOfSeats
      }
      console.log(newFunction);
      this.apiservices.NewFunction(newFunction).subscribe();
        this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.ActRouter.url]);
    });
  }
  
  // public async functionById(movieId: number){
  //   this.apiservices.getFunctionById(movieId)
  //    .subscribe(async (res: any) =>{
  //     this.functionList = res;
  //     console.log(this.function);
  //    });
  // }

  // loadFunctions(){
  //   this.router.params.subscribe( params =>{
  //     this.getAllFunctions();
  //   })
  // }

  // getAllFunctions(){
  //   this.functionList = this.apiservices.getAllFunctions();
  // }

}
