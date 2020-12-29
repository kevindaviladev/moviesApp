import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SwiperModule } from 'swiper/angular';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';

@NgModule({
  declarations: [NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent, CastSlideshowComponent],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    RatingModule,
    PipesModule
  ],
  exports: [
    SlideshowComponent, 
    NavbarComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent
  ]
})

export class ComponentsModule { }