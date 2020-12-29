import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.interface';
import Swiper from 'swiper';



@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  swiper:Swiper;

  constructor() { }

  ngOnInit() {
    // console.log(this.movies);
  }

  ngAfterViewInit(): void{
    this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    })
  }

  onSlidePrev(){
    this.swiper.slidePrev()
  }

  onSlideNext(){
    this.swiper.slideNext()
  }

}
