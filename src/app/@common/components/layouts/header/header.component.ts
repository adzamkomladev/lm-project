import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {interval, map, Observable} from "rxjs";

import {IDevice} from "../../../../models/device";

import {DeviceService} from "../../../../services/device.service";

@Component({
  selector: 'lastmile-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <header class="header">
      <div class="logo-container">
        <img
          alt="LastMile Logo"
          src="assets/images/svgs/logo.svg"
        />
        <p> {{ device?.address }} </p>
      </div>
        <p class="date"> {{ currentDate | async | date:'dd.MM.yy | HH:mm' }}</p>
    </header>
  `,
  styles: [
    `
      header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #378092;
          padding: var(--base-size);
          font-size: var(--sub-title);

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;

          img {
            border-inline-end: 0.1px solid #fff;
            padding-inline-end: 20px;
            height: var(--title);
          }
        }

        p {
          color: var(--main-white);
          font-family: 'Noto Sans Hebrew', sans-serif;
        }

      }
    `
  ]
})
export class HeaderComponent {
  device: IDevice | null;

  currentDate: Observable<Date>;

  constructor(private readonly deviceService: DeviceService) {
    this.device = deviceService.deviceData;
    this.currentDate = interval(1000).pipe(map(() => new Date()));
  }
}
