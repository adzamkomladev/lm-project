import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DeviceService } from './device.service';
import { ServerApiService } from './server-api.service';
import { IPackageBox } from '../models/mile';
import { BoxStatusContent } from '../models/box-stauts';

@Injectable({ providedIn: 'root' })
export class PackBoxesService {

  constructor(
    private readonly deviceService: DeviceService,
    private readonly serverApiService: ServerApiService
  ){
  }

  getAvailableBoxes(){
    const PackSizes = [
      { name: 'small', size: 1, imageName: 'package_s.svg' },
      { name: 'medium', size: 2, imageName: 'package_m.svg' },
      { name: 'big', size: 3, imageName: 'package_l.svg' }
    ];

    return  forkJoin([this.deviceService.getAllStatuses(), this.serverApiService.getBoxes()])
    .pipe(
      map(([statues, boxes]) => PackSizes.map<IPackSize>(ps => ({
        ...ps,
        availableBox: boxes.packageBoxes.find(pb => pb.size == ps.size && statues.find(s => s.number == pb.localIndex)?.content == BoxStatusContent.EMPTY)
      }))));
  }
}

export interface IPackSize {
  imageName: string,
  name: string,
  availableBox: IPackageBox | undefined,
  size: number,
}
