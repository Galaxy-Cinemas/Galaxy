import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

private urlApi = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get<any>(this.urlApi)
  }

  searchCharactersMarvel(query='', orderBy=''){
    let urlBase = `${environment.urlAPI}?`;
    let search = `ts=1&apikey=${environment.apiKey}&hash=${environment.hash}&limit=${100}&offset=${0}`;
  
    urlBase += query != ''? `nameStartsWith=${query}&`:'';
    urlBase += orderBy != ''? `orderBy=${orderBy}&`:'';
  
    return this.sendQuery(urlBase + search);
  }

  searchMovies(){
    let urlBase = `${environment.apiMovieLocal}`;
    let search = `v1/Movie/GetAll`;
  
    return this.sendQueryLocal(urlBase + search);
  }

  sendQueryLocal(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data));
  }

  sendQuery(query=''){
    return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data.results));
  }
}
