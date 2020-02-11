import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  private intervalId: any;

  message = '';

  remainingTime: number;

  @Input() seconds = 10;

  ngOnChanges(changes: SimpleChanges) {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 10 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 10 : vFixed;
    }
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }


  constructor() { }

  ngOnInit(): void {
    this.start();
    this.reset();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  start() {
    this.countdown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click the start button to start countdown`;
  }

  private countdown() {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.message = 'Blast off';
        this.clearTimer();
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
  }

}
