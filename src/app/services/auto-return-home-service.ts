import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ResetableInterval } from './interval-factory.service';

@Injectable({
  providedIn: 'root',
})
export class AutoReturnHomeService {
  private resetViewInterval!: ResetableInterval;

  public onReturnHome: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {}

  startInterval(seconds = 1000) {
    this.resetViewInterval = new ResetableInterval(seconds);

    this.resetViewInterval.subscribe(() => {
      this.onReturnHome.emit();
    });

    this.onReturnHome.subscribe(() => this.returnHome());
  }

  reset(timerInSec = 60) {
    if (this.resetViewInterval) {
      this.resetViewInterval.reset(timerInSec);
    }
  }

  returnHome(path: string = '/home') {
    if (this.router.url === '/home') return;

    if (this.route.snapshot.queryParamMap.get('returnHome') != 'false') {
      this.router.navigate([path]);
    }
  }
}
