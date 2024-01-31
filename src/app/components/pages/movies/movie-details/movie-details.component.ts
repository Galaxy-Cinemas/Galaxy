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

  constructor(private apiservices:MoviesService, 
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router2: Router ) 
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


  movie:any;
  function:any;
  ticket: Ticket[] = [];

  functionId!: number;
  test:string = "";

  functionList?:Observable<any>;
  id:any;

  ngOnInit(){
    this.loadMovie();
    this.loadFunctionByMovieId();
  }

  /* GET MOVIE BY ID*/
  private loadMovie(){
    this.router.params.pipe(take(1)).subscribe((params)=>{
      this.id = params['id'];
      console.log(this.id);
      this.MovieById(params['id']);
    })
  }
 public async MovieById(movieId: number){
    this.apiservices.getMovieById(movieId)
     .pipe(take(1))
     .subscribe(async (res: any) =>{
      this.movie = res;
      console.log(this.movie);
     });
  }

  /* GET FUNCTION BY MOVIE ID*/
  private loadFunctionByMovieId(){
    this.router.params.subscribe((params)=>{
      this.id = params['id'];
      this.functionByMovieId(params['id']);
    })
  }

  public async functionByMovieId(movieId: number){
    this.functionList = this.apiservices.getFunctionByMovieId(movieId);
  }

/* GET FUNCTION BY ID*/
  private loadFunctionById(){
    this.router.params.subscribe((params)=>{
      this.functionById(this.functionId);
    })
  }

  functionById(movieId: number){
    this.functionList = this.apiservices.getFunctionById(movieId);
  }
  
  saveFunctionId(functionId:number){
    console.log(this.functionId);
    this.functionId = functionId;
    console.log(this.functionId);
  }

  /* CREATE TICKET*/

  get numSetsNoValid(){
    return this.formTicket.get('numSets')?.invalid 
  }

  minimumValueValidator(minimumValue: number) {
    return (control :AbstractControl) => {
      const value = control.value;
      if (value < minimumValue) {
        console.log({ minValue: { requiredValue: minimumValue, actualValue: value } });
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
        console.log(newTicket);
        console.log(this.id);
    // this.apiservices.BuyTicket(newTicket).subscribe( ticket => console.log(ticket));
  }


  /* Add Function  */
  addFunctionId(){
      const newFunction = 
      {
        movieId: this.id,
        price: this.formFunction.value.price,
        functionDate: "2024-01-18T01:14:14.788Z",
        Teather: this.formFunction.value.Teather,
        numberOfSeats: this.formFunction.value.numberOfSeats
      }
      console.log(newFunction);
      this.apiservices.NewFunction(newFunction).subscribe( functions => 
        {
          console.log(functions); 
          this.router2.navigate(['/'])
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
