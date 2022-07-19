import {Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import { IRatingUnit } from '../irating-unit';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit, OnChanges {
  @Input() max = 10;
  @Input() ratingValue = 5;
  @Input() showRatingValue = true;

  @Output() rateChange = new EventEmitter();
  ratingUnits: Array<IRatingUnit> = [
    {value: 1, active: true},
    {value: 2, active: true},
    {value: 3, active: true},
    {value: 4, active: true},
    {value: 5, active: true},
    {value: 6, active: false},
    {value: 7, active: false},
    {value: 8, active: false},
    {value: 9, active: false},
    {value: 10, active: false},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

  calculate(max, ratingValue) {
    this.ratingUnits = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }

  select(index) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }
  enter(index) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }
  reset() {
    this.ratingUnits.forEach((item, index) => item.active = index <  this.ratingValue);
  }
}
