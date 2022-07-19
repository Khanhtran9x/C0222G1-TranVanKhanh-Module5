import {Component, EventEmitter, OnChanges, OnDestroy, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() seconds = 10;
  @Output() finish = new EventEmitter();
  remainingTime: number;
  intervalId = 0;
  message = '';
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 10 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }
  }
  ngOnInit(): void {
    this.reset();
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  ngOnDestroy() {
    this.clearTimer();
  }
  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }
  private countDown() {
    this.intervalId = setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        this.message = 'Blast off!';
        this.clearTimer();
        this.finish.emit(true);
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
  }

  private reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click start button to start the Countdown`;
  }
}
