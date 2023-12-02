import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { CABINET_ID } from '../constants/storage.constant';

import { Cabinet } from '../models/cabinets/cabinet.model';
import { Size } from '../models/cabinets/size.model';

@Injectable({
  providedIn: 'root',
})
export class CabinetService {
  public getCabinetId() {
    return localStorage.getItem(CABINET_ID) ?? '';
  }

  public setCabinetId(cabinetId: string) {
    localStorage.setItem(CABINET_ID, cabinetId);
  }
}
