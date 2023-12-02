import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { Video } from '../@common/models/videos/video.model';

import { AuthService } from '../@common/services/auth.service';
import { DeliverySetupService } from '../courier/delivery/services/delivery-setup.service';
import { VideosService } from '../@common/services/videos.service';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { VideoPlayerComponent } from '../@common/components/video-player/video-player.component';

@Component({
  standalone: true,
  template: `
    <div>
      <div class="video-wrapper">
        <lastmile-video-player
          *ngIf="video$ | async as video"
          [video]="video"
        ></lastmile-video-player>
      </div>
      <div class="warning-banner">
        <marquee class="description">{{
          'home.notification' | translate
        }}</marquee>
      </div>
      <div class="options">
        <lastmile-link-button
          route="/resident"
          text="{{ 'general.resident' | translate }}"
          imageUrl="assets/images/svgs/resident.svg"
        ></lastmile-link-button>
        <lastmile-link-button
          route="/courier"
          text="{{ 'general.courier' | translate }}"
          imageUrl="assets/images/svgs/postman.svg"
        ></lastmile-link-button>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    LinkButtonComponent,
    VideoPlayerComponent,
  ],
})
export class HomeComponent implements OnInit {
  video$!: Observable<Video | null>;

  constructor(
    private deliverySetupService: DeliverySetupService,
    private auth: AuthService,
    private videosService: VideosService
  ) {
    this.deliverySetupService.clearDeliveryData();
    this.auth.clearJwtToken();
  }

  ngOnInit(): void {
    this.video$ = this.videosService.findVideo();
  }
}
