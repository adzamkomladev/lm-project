import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, take, map, tap, timer } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lastmile-countdown',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div *ngIf="countdown$ | async as count" class="return-home">
      <div class="base-timer">
        <svg class="parent" height="120" width="120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke-linecap="round"
            stroke="#163C44"
            stroke-width="6"
            fill="none"
            [style.animation-duration]="getAnimationStyle()"
          ></circle>
          <image
            xlink:href="assets/images/svgs/home.svg"
            x="36"
            y="36"
            width="48"
            height="48"
            fill="none"
          ></image>
        </svg>
      </div>
      <p>{{ 'general.countdown.message' | translate : { count: count } }}</p>
    </div>
  `,
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent implements OnInit {
  countdown$!: Observable<number>;

  @Input({ required: true }) seconds: number = 5;

  @Output() completed = new EventEmitter<boolean>();

  ngOnInit() {
    this.countdown$ = timer(0, 1000).pipe(
      take(this.seconds + 1),
      map((x) => this.seconds - x),
      tap((count) => {
        if (count < 4) {
        }
        if (count === 0) {
          this.completed.emit(true);
        }
      })
    );
  }

  getAnimationStyle(): string {
    return `${this.seconds + 12}s`;
  }
}
