import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Observable, map } from 'rxjs';
import { ResponseObject } from '../interfaces/response.interface';
import { Ticket } from '../interfaces/Ticket';
import { AddFunction } from '../interfaces/add-function';
import { AddMovie } from '../interfaces/add-movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  urlBase = `${environment.apim}`;

  constructor(private http: HttpClient) { }


  //-------------------------------------------------  MOVIES -------------------------------------------------------------------------------------------------------
  NewMovie(movie: AddMovie):Observable<AddMovie>{
    let Endpoint = `Movie/v1/Movie/Create`;
    let query = this.urlBase + Endpoint;
    console.log(query)
    return this.http.post<AddMovie>(`${query}`, movie);
  }
  
  searchMovies(){
    let urlBase = `${environment.apim}`;
    let Endpoint = `Movie/v1/Movie/GetAll`;

    return this.sendQuery(urlBase + Endpoint);
  }

  getMovieById(id:number):Observable<ResponseObject>{
    
    let search = `Movie/v1/Movie/GetById/${id}`;
    return this.sendQuery(this.urlBase + search);
  }

  updateMovie(movie: AddMovie):Observable<AddMovie>{
    let Endpoint = `Movie/v1/Movie/Create`;
    let query = this.urlBase + Endpoint;
    console.log(query)
    return this.http.post<AddMovie>(`${query}`, movie);
  }

  deleteMovieById(id:number):Observable<number>{
    let Endpoint = `Movie/v1/Movie/Delete/${id}`;
    let query = this.urlBase + Endpoint;
    return this.http.delete<number>(`${query}`);
  }
  //-------------------------------------------------  FUNCTIONS -------------------------------------------------------------------------------------------------------

  getAllFunctions(){
    let urlBase = `${environment.apim}`;
    let search = `v1/Function/GetAll`;
    return this.sendQuery(urlBase + search);
  }

  getFunctionByMovieId(movieId:number):Observable<ResponseObject>{
    let Endpoint = `Function/v1/GetByMovieId/${movieId}`;
    return this.sendQuery(this.urlBase + Endpoint);
  }
  getFunctionById(movieId:number):Observable<ResponseObject>{
    let Endpoint = `Function/v1/GetByMovieId/${movieId}`;
    return this.sendQuery(this.urlBase + Endpoint);
  }

  NewFunction(func: AddFunction):Observable<AddFunction>{
    let Endpoint = `Function/v1/Create`;
    let query = this.urlBase + Endpoint;
    console.log(query)
    return this.http.post<AddFunction>(`${query}`, func);
  }

  //-------------------------------------------------  TICKET -------------------------------------------------------------------------------------------------------

  BuyTicket(ticket: Ticket):Observable<Ticket>{
    let Endpoint = `Ticket/v1/Ticket/Create`;
    let query = this.urlBase + Endpoint;
    console.log(query)
    return this.http.post<Ticket>(`${query}`, ticket);
  }


  
//-------------------------------------------------  QUERY -------------------------------------------------------------------------------------------------------
  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }


}
