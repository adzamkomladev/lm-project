import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { CreatedPackage } from '../../../@common/models/delivery/created-package.model';

@Injectable({
  providedIn: 'root',
})
export class DeliverySetupService {
  private deliveryData: Record<string, any> = {};
  private packageCreationUrl = `${environment.urbanUrl}/api/Packs/CreatePack`;
  private packageCancellationUrl = `${environment.urbanUrl}/api/Packs/cancelPack`;

  constructor(private http: HttpClient) {}

  setPackageCode(code: string | null) {
    this.deliveryData['packageCode'] = code;
  }

  setCompanyCode(code: string | null) {
    console.log(this.deliveryData, 'DATA SO FAR');
    this.deliveryData['companyCode'] = code;
  }

  setPackageSenderId(packageSenderId: number | null) {
    console.log(this.deliveryData, 'DATA SO FAR');
    this.deliveryData['packageSenderId'] = packageSenderId;
  }

  setResident(
    apartmentNumber: string,
    residentId: number,
    residentName: string
  ) {
    this.deliveryData['apartmentNumber'] = apartmentNumber;
    this.deliveryData['residentId'] = residentId;
    this.deliveryData['residentName'] = residentName;
    console.log(this.deliveryData, 'DATA SO FAR RESIDENT');
  }

  async setCabinetBoxStatus(status: string) {
    this.deliveryData['cabinetBoxStatus'] = status;

    if (status === 'closed') {
      this.clearDeliveryData();
      return;
    }

    return await lastValueFrom(
      this.http
        .post<CreatedPackage>(this.packageCreationUrl, {
          receiverId: this.deliveryData['residentId'],
          boxSize: this.deliveryData['size'],
          packageSenderId: this.deliveryData['packageSenderId'],
        })
        .pipe(
          catchError((e) => {
            console.error('Failed to open box and save package', e);
            return of(null);
          }),
          tap((res) => {
            if (res) {
              this.setPackageDetails(res.packageId, res.cell, res.code);
            }
          })
        )
    );
  }

  async cancel() {
    return await lastValueFrom(
      this.http
        .get(`${this.packageCancellationUrl}/${this.deliveryData['packageId']}`)
        .pipe(tap((res) => this.clearDeliveryData()))
    );
  }

  clearDeliveryData() {
    this.deliveryData = {};
  }

  setPackageDetails(packageId: number, cell: number, code: number) {
    this.deliveryData['packageId'] = packageId;
    this.deliveryData['cell'] = cell;
    this.deliveryData['packageCode'] = code;
  }

  setSize(size: string) {
    this.deliveryData['size'] = size;
  }

  getDeliveryData() {
    return this.deliveryData;
  }
}
