import { Movie } from "./movie.interface";

export interface ResponseObject{
    data:Result;
}

export interface Result{
    results:Movie
}