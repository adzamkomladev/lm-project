import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { IDevice } from '../models/device';

@Injectable({ providedIn: 'root' })
export class DeviceParamsService {

  deviceDataCache$: Observable<IDevice> | null = null;

  constructor(private readonly http: HttpClient) { }

  loadDeviceData(): Observable<IDevice> {
    if(this.deviceDataCache$! != null) {
      return this.deviceDataCache$;
    } else {
      this.deviceDataCache$ = of({address: 'יבנה, נחל שניר 4', bottomImage1: 'assets/images/svgs/abrami_logo.svg', bottomImage2: 'assets/images/svgs/barlogosmall.svg'});      
      return this.deviceDataCache$; 
    }
  }

}
