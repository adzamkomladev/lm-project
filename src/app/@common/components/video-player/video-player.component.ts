import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { Video } from '../../models/videos/video.model';

import { VideoPlayerService } from './services/video-player.service';

@Component({
  selector: 'lastmile-video-player',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [VideoPlayerService],
  template: `
    <div class="video-player-wrapper">
      <vg-player (onPlayerReady)="videoPlayerInit($event)">
        <!-- <vg-overlay-play></vg-overlay-play> -->
        <vg-buffering></vg-buffering>
        <!-- <vg-scrub-bar>
          <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
          <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>
        <vg-controls>
          <vg-play-pause></vg-play-pause>
          <vg-playback-button></vg-playback-button>
          <vg-time-display
            vgProperty="current"
            vgFormat="mm:ss"
          ></vg-time-display>
          <vg-time-display
            vgProperty="total"
            vgFormat="mm:ss"
          ></vg-time-display>
          <vg-mute></vg-mute>
          <vg-volume></vg-volume>
          <vg-fullscreen></vg-fullscreen>
        </vg-controls> -->
        <video
          #media
          [vgMedia]="$any(media)"
          [src]="currentVideo.src"
          id="singleVideo"
          preload="auto"
          crossorigin
        ></video>
      </vg-player>
      <!-- <ul class="player-list">
        <li
          *ngFor="let vdo of videoItems; let $index = index"
          (click)="startPlaylistVdo(vdo, $index)"
          [class.selected]="vdo === currentVideo"
        >
          {{ vdo.name }}
        </li>
      </ul> -->
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
      }
      .player-list {
        margin: 0;
        padding: 0;
      }
      .player-list li {
        list-style: none;
        padding: 15px 35px;
        display: block;
        background: #cccc;
        cursor: pointer;
        text-align: left;
        margin-bottom: 1px;
      }
      li.selected {
        background: #03a9f4 !important;
      }
    `,
  ],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() video!: Video;

  videoItems: { name: string; src: string; type: string }[] = [];
  activeIndex = 0;
  currentVideo!: { name: string; src: string; type: string };
  data: any;
  startVideoSubscription!: Subscription;
  nextVideoSubscription!: Subscription;

  constructor(private videoPlayerService: VideoPlayerService) {}

  ngOnInit(): void {
    this.videoPlayerService.setConfig(this.video);
    this.videoItems = this.videoPlayerService.getVideoSources();
    this.currentVideo = this.videoItems[this.activeIndex];
  }

  ngOnDestroy(): void {
    this.startVideoSubscription?.unsubscribe();
    this.nextVideoSubscription?.unsubscribe();
  }

  videoPlayerInit(data: any) {
    this.data = data;
    this.startVideoSubscription = this.data
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.nextVideoSubscription = this.data
      .getDefaultMedia()
      .subscriptions.ended.subscribe(this.nextVideo.bind(this));
    this.data.volume = this.getVolume(this.video);
    this.data.play();
  }

  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
    this.initVdo();
  }

  initVdo() {
    this.data.play();
  }

  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  getVolume(video: Video) {
    return video.muted ? 0 : (video.volume || 0) / 100;
  }
}
