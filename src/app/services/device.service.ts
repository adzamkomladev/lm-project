import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBoxStatus } from '../models/box-stauts';
import { IDevice } from '../models/device';
import { IBoxes, ILetterBox, IPackageBox } from '../models/mile';
import { DeviceParamsService } from './device-params.service';

const localhost = `http://localhost:${environment.devicePort}/`;

@Injectable({ providedIn: 'root' })
export class DeviceService {

  deviceData: IDevice | null = null;

  constructor(private readonly http: HttpClient, private deviceParamsService: DeviceParamsService) { }

  getStatus(box: string): Observable<IBoxStatus> {
    return this.http.get<IBoxStatus>(`${localhost}status/${box}`);
  }

  getAllStatuses(): Observable<IBoxStatus[]> {
    return this.http.get<IBoxStatus[]>(`${localhost}status/all`).pipe(
      map(boxes => boxes.map((box, index) => ({
        ...box,
        number: index + 1
      }))
    ));
  }

  openDoor(box: number): Observable<any> {
    console.trace('OPEN', `${localhost}open/${box}`);
    return this.http.post(`${localhost}open/${box}`, null);
  }

  loadDeviceData(): void {
    this.deviceParamsService.loadDeviceData()
      .pipe(take(1))
      .subscribe((device) => this.deviceData = device);
  }

}
