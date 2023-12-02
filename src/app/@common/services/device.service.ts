import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  currentBoxStatus() {
    return timer(25000).pipe(map(() => 'closed'));
  }
}
