import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Observable, map } from 'rxjs';
import { ResponseObject } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  

  constructor(private http: HttpClient) { }

  searchMovies(){
    let urlBase = `${environment.apim}`;
    let Endpoint = `Movie/v1/Movie/GetAll`;

    return this.sendQuery(urlBase + Endpoint);
  }

  getMovieById(id:number):Observable<ResponseObject>{
    let urlBase = `${environment.apiMovie}`;
    let search = `v1/Movie/GetById/${id}`;
    return this.sendQuery(urlBase + search);
  }

  getAllFunctions(){
    let urlBase = `${environment.apiFunction}`;
    let search = `v1/Function/GetAll`;
    return this.sendQuery(urlBase + search);
  }

  getFunctionById(id:number):Observable<ResponseObject>{
    let urlBase = `${environment.apim}`;
    let Endpoint = `Function/v1/GetByMovieId/${id}`;
    return this.sendQuery(urlBase + Endpoint);
  }
  
  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }
}
