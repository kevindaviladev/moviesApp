import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera.interface';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { CreditResponse, Cast } from '../interfaces/credits.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient) { }

  get params(){
    return {
      api_key: '65dfee8427fcdf570794b285dc64c467',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

   getCartelera(): Observable<Movie[]>{
    // console.log('Llamando API');
    if(this.cargando){
      return of([]); //Regresa un arreglo vacío en forma de Observable, para que no explote la consola
    }
    this.cargando = true;
    return  this.http.get<CarteleraResponse>(`${this.baseURL}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map( (resp) =>  resp.results),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(query:string):Observable<Movie[]>{
    const params = { ...this.params, page:'1', query };

    return this.http.get<CarteleraResponse>(`${this.baseURL}/search/movie`,{
      params
    }).pipe(
      map( resp => resp.results)
    )
  }

  resetCarteleraPage():void{
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id:string):Observable<MovieDetails>{
    return this.http.get<MovieDetails>(`${this.baseURL}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getCast(id:string): Observable<Cast[]>{
    return this.http.get<CreditResponse>(`${this.baseURL}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of(null))
    )
  }
}
