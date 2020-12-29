import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie, CarteleraResponse } from 'src/app/interfaces/cartelera.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  @HostListener('window:scroll',['$event'])
  onScroll(){
    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(posicion>max){
      // Llamar el servicio para listar
      if(this.peliculasService.cargando){
        return; 
      }
      this.peliculasService.getCartelera().subscribe( (movies) => {
        this.movies.push(...movies);
      })
    }
     
  }

  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];

  constructor(private peliculasService: PeliculasService){ }

  ngOnInit() {
    this.peliculasService.getCartelera().subscribe( movies => {
      this.movies = movies;
      this.moviesSlideShow = movies;

    })
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

}
