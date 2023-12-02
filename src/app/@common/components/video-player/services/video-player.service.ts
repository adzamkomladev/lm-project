import { Injectable } from '@angular/core';

import { Video } from '../../../models/videos/video.model';

@Injectable()
export class VideoPlayerService {
  private url!: string;
  player: any;
  private config!: Video;
  targetId!: string;

  setConfig(config: Video) {
    this.config = config;

    this.url = this.config.url1;
  }

  public getVideoSources() {
    return this.config.videos?.map((x, i) => {
      const file = this.getDisplayVideo(x);
      const val = {
        name: x.id,
        src: this.url + file,
        type: VideoPlayerService.getExtensionFileName(file),
      };
      return val;
    });
  }

  private getDisplayVideo(source: { file: string; stream: string }): string {
    return source.file ?? source.stream;
  }

  private static getExtensionFileName(file: string) {
    const extension = file.split('.').pop();
    switch (extension) {
      case 'm3u8':
        return 'application/x-mpegURL';
      case 'mp4':
        return 'video/mp4';
      default:
        return 'video/mp4';
    }
  }
}
