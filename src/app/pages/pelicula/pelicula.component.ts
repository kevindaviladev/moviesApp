import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MovieDetails } from 'src/app/interfaces/movie-details.interface';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits.interface';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetails;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasServices: PeliculasService,
    private location: Location,
    private router: Router ) { }

  ngOnInit() {
    const id =this.activatedRoute.snapshot.params.id;

    this.peliculasServices.getPeliculaDetalle(id).subscribe( movie => {
      if(!movie ){
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
    })

    this.peliculasServices.getCast(id).subscribe( cast => {
      this.cast = cast.filter( actor => actor.profile_path); //Sólo lista actores que tengan profile picture
    })


  }

  regresar(){
    this.location.back();
  }

}
