import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@app/shared/services/movies.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  constructor(private apiservices:MoviesService, private router: ActivatedRoute ) { }

  movie:any;
  id:any;

  ngOnInit(){
    this.loadMovie();
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
    
    //  .pipe(take(1));
  }


  // this.subRef$ =  this.http.post<responseAuth>(url, usuarioLogin, {observe: 'response'})
  // .subscribe(res => {
  //  const token = res.body?.response;
  //  // console.log('token', token);
  //  sessionStorage.setItem('token', token!);
  //  this.router.navigate(['/'])
  // });

}
