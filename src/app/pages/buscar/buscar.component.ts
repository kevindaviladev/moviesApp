import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  
  movies: Movie[] = [];
  texto: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculaService: PeliculasService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      // console.log(params);  
      this.texto = params.texto;
      this.peliculaService.buscarPeliculas(this.texto).subscribe (movies => {
        this.movies = movies;
      })
    })
  }

}
