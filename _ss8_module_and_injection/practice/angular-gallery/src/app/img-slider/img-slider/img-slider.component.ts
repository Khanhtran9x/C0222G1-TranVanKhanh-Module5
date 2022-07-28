import {Component, OnInit, QueryList, AfterContentInit, ContentChildren} from '@angular/core';
import {ImgSlideComponent} from '../img-slide/img-slide.component';


@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit, AfterContentInit {
  @ContentChildren(ImgSlideComponent) slides: QueryList<ImgSlideComponent>;
  component;
  index = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.component = this.slides.first;
  }

  previous() {
    if (this.index > 0) {
      this.index = this.index - 1;
    }
    this.component = this.slides.toArray()[this.index];
  }

  next() {
    if (this.index < this.slides.length - 1) {
      this.index = this.index + 1;
    }
    this.component = this.slides.toArray()[this.index];
  }
}
