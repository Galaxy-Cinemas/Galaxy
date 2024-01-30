import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formLogin: FormGroup;
  subRef$! : Subscription;

  constructor(private apiservices:MoviesService, private router: ActivatedRoute,private formBuilder: FormBuilder,
    private http: HttpClient,
    private router2: Router, ) 
    {
      this.formLogin = formBuilder.group({
        email:['', Validators.required],
        password: ['', Validators.required]
      });

     }


  movie:any;
  function:any;

  functionList?:Observable<any>;
  id:any;

  ngOnInit(){
    this.loadMovie();
    this.loadFunctionById();
  }

  private loadMovie(){
    this.router.params.pipe(take(1)).subscribe((params)=>{
      this.id = params['id'];
      console.log(this.id);
      this.modalMovie(params['id']);
    })
  }

 public async modalMovie(movieId: number){
    this.apiservices.getMovieById(movieId)
     .pipe(take(1))
     .subscribe(async (res: any) =>{
      this.movie = res;
      console.log(this.movie);
     });
  }

  private loadFunctionById(){
    this.router.params.subscribe((params)=>{
      this.id = params['id'];
      this.functionByMovieId(params['id']);
    })
  }

  functionByMovieId(movieId: number){
    this.functionList = this.apiservices.getFunctionById(movieId);
  }

//   Login(){

//     const usuarioLogin:  Ticket = {
//       functionId: this.formLogin.value.email,
//       numSeats: this.formLogin.value.password
//     };


// const url2= 'https://apim-galaxi.azure-api.net/Identity/v1/identity/authentication';

//     const url = environment.api + 'v1/identity/authentication';
//     this.subRef$ =  this.http.post<responseAuth>(url, usuarioLogin, {observe: 'response'})
//              .subscribe(res => {
//               const token = res.body?.response;
//               sessionStorage.setItem('token', token!);
//               this.router.navigate(['/'])
//              });

//   }

  
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
