import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";

import {IDevice} from "../../../../models/device";

import {DeviceService} from "../../../../services/device.service";

@Component({
  selector: 'lastmile-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
    
      <div class="logo_container">
        <img id="footer_logo" alt="Angular Logo" [src]="device?.bottomImage2"/>
        <img alt="Angular Logo" [src]="device?.bottomImage1"/>
      </div>

      <div class="action-button">
        <a routerLink="/">
          <img class="btn" src="assets/images/svgs/home.svg"/>
        </a>
        <a routerLink="/language">
          <img class="btn" src="assets/images/svgs/settings.svg"/>
        </a>
        <a routerLink="/report">
          <img class="btn" src="assets/images/svgs/info.svg"/>
        </a>
      </div>
    </footer>`,
  styles: [`
    footer {
      background-color: #EEEEEE;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap-reverse;
      gap: 10px;
      padding: var(--box-spacing);
      direction: ltr;
    }
    .action-button {
      display: flex;
      gap: var(--title);
      flex-flow: row-reverse wrap;

      a {
        border-radius: var(--sub-title);
        background: #FFF;
        box-shadow: 0px 4px 56px 0px rgba(0, 0, 0, 0.05);
        padding: calc(var(--sub-title) * 0.7) var(--base-size);

        img {
          width: var(--title);
          aspect-ratio: 1;
        }
      }
    }

    .logo_container {
      display: flex;
      gap: var(--title);
      flex-wrap: wrap;

      img {
        max-width: 100%;
        min-width: var(--image-width);
      }
    }
  `]
})
export class FooterComponent {
  device: IDevice | null;

  constructor(private readonly deviceService: DeviceService) {
    this.device = deviceService.deviceData;
  }
}
