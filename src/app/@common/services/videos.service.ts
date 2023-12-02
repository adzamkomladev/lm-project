import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Video } from '../models/videos/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private readonly mediaUrl = `${environment.urbanUrl}/api/Cabinet/media`;

  constructor(private http: HttpClient) {}

  findVideo() {
    return this.http.get<Video>(this.mediaUrl).pipe(
      catchError((e) => {
        console.error('Error loading video', e);
        return of(null);
      }),
      map((x) => ({ volume: 50, ...x,} as Video))
    );
  }
}
