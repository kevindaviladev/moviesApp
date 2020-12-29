import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('PeliculasPosterGrid ',this.movies);
  }

  ngAfterViewInit(){

  }

  onMovieClick(movie:Movie){
    console.log(movie);
    this.router.navigate(['/pelicula',movie.id]);
  }

}
