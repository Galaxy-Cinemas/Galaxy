import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  constructor(private apiservices:MoviesService, private router: ActivatedRoute ) { }

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
