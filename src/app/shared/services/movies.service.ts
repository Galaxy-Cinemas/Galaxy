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

  searchCharactersMarvel(query='', orderBy=''){
    let urlBase = `${environment.urlAPI}?`;
    let search = `ts=1&apikey=${environment.apiKey}&hash=${environment.hash}&limit=${100}&offset=${0}`;
  
    urlBase += query != ''? `nameStartsWith=${query}&`:'';
    urlBase += orderBy != ''? `orderBy=${orderBy}&`:'';
  
    return this.sendQuery(urlBase + search);
  }

  searchMovies(){
    let urlBase = `${environment.apiMovie}`;
    let search = `v1/Movie/GetAll`;

    let urltestAPIM= "https://apim-galaxi.azure-api.net/Movie/v1/Movie/GetAll";
let urlApiCloud = "https://galaxi-movie-api.azurewebsites.net/v1/Movie/GetAll";
  let urlTestLocal= "http://localhost:37061/v1/Movie/GetAll";
    return this.sendQueryLocal(urltestAPIM);
    // return this.sendQueryLocal(urlBase + search);
  }

  sendQueryLocal(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }

  getMovieById(id:number):Observable<ResponseObject>{
    let urlBase = `${environment.apiMovie}`;
    let search = `v1/Movie/GetById/${id}`;
    return this.sendQueryLocal(urlBase + search);
  }

  getAllFunctions(){
    let urlBase = `${environment.apiFunction}`;
    let search = `v1/Function/GetAll`;
    return this.sendQueryLocal(urlBase + search);
  }

  getFunctionById(id:number):Observable<ResponseObject>{
    let urlBase = `${environment.apim}`;
    let search = `Function/v1/GetByMovieId/${id}`;
    return this.sendQueryLocal(urlBase + search);
  }



  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data.results));
  }
}
