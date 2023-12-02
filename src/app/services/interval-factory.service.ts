import { Injectable, ApplicationRef, EventEmitter, NgZone } from '@angular/core';
import { first, switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { interval, Subscription, timer, Observable, Observer } from 'rxjs';

export class ResetableInterval extends EventEmitter<any>{

  private _interval!: Subscription;

  constructor(private seconds?: number) {
    super();
    this.reset(seconds);
  }

  reset(timer?: number) {
    if (timer != null) this.seconds = timer

    if (this._interval) {
      this._interval.unsubscribe();
    }

    this._interval = interval(this.seconds! * 1000).subscribe(x => this.emit(null));
  }

  stop() {
    if (this._interval) {
      this._interval.unsubscribe();
    }
  }
}
