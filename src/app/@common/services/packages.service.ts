import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, lastValueFrom, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Receiver } from '../models/packages/receiver.model';

import { PackageSetupService } from '../../resident/packages/services/package-setup.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private readonly packageCodeUrl = `${environment.urbanUrl}/api/Packs/CanDeliver`;

  private readonly residentPackageCodeUrl = `${environment.urbanUrl}/api/Resident/pack/verify`;
  private readonly residentPackagesUrl = `${environment.urbanUrl}/api/resident/packs`;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private packageSetupService: PackageSetupService
  ) {}

  async verifyPackageCode(packageCode: string | null) {
    return await lastValueFrom(
      this.http.get(`${this.packageCodeUrl}/${packageCode}`).pipe(
        catchError((_) => of(false)),
        map((res) => !!res)
      )
    );
  }

  async verifyResidentPackageCode(packageCode: string | null) {
    return await lastValueFrom(
      this.http
        .get<Receiver>(`${this.residentPackageCodeUrl}/${packageCode}`)
        .pipe(
          catchError((e) => {
            console.log('error', e);
            return of(null);
          }),
          tap((res) => {
            if (res) {
              this.packageSetupService.setReceiverDetails(
                res.name,
                res.number,
                res.id
              );

              if (res?.token) {
                this.auth.storeJwtToken(res.token);
              }
            }
          })
        )
    );
  }

  verifyHasPackages() {
    const { receiverId } = this.packageSetupService.getPackageData();
    return this.http.get(`${this.residentPackagesUrl}/${receiverId}`).pipe(
      tap((res) => console.log('these are the user packages', res)),
      map((res: any) => res.length > 0)
    );
  }
}
