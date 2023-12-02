import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IBoxes } from '../models/mile';
import { ILetterBoxInfo } from '../models/requests';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  readonly controllerPath: string;

  constructor(
    private http: HttpClient,
    @Inject("URBAN_URL") private readonly urbanUrl: string
  ) {
    this.controllerPath = urbanUrl + '/api/device/';
  }

  getBoxes(): Observable<IBoxes> {
    return this.http.get<IBoxes>(this.urbanUrl + '/api/device/boxes').pipe(
      map(boxes => {
        /* to correctly translate, check is name are arrays */
        boxes.letterBoxes.forEach(box => {
          box.line1 = Array.isArray(box.line1) ? box.line1 : [{ language: 'en', name: box.line1 }];
          box.line2 = Array.isArray(box.line2) ? box.line2 : [{ language: 'en', name: box.line2 }]
        })

        return boxes
      })
    );
  };

  canDeliver(code: string) {
    return this.http.get(this.urbanUrl + `/api/device/candeliver/${code}`, { observe: 'response' });
  }

  authenticate(data: ILetterBoxInfo) {
    return this.http.post<({ id: number })>(this.urbanUrl + `/api/Device/Authenticate?boxNumber=${data.boxNumber}&password=${data.password}`, null);
  }

  canPull(code: string) {
    return this.http.get<({ id: number })>(this.urbanUrl + `/api/device/canpullpack/${code}`);
  }

  createPackage(receiverId: number, boxId: number) {
    return this.http.post(this.controllerPath + 'CreatePack', { receiverId, boxId });
  }

  updateDeliverPack(code: string, boxId: number) {
    return this.http.post(this.controllerPath + 'deliverpack', { code, boxId });
  }

  updatePackPulled(code: string) {
    return this.http.post(this.controllerPath + 'pullpack', { code });
  }

  isSenderCodeValide(code: string): Observable<boolean> {
    return of(code.startsWith("1"));
  }
}
