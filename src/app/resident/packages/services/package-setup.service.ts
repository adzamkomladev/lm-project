import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageSetupService {
  private packageData: Record<string, any> = {};

  constructor() {}

  setReceiverDetails(name: string, phone: string, id: number) {
    this.packageData['receiverName'] = name;
    this.packageData['receiverPhone'] = phone;
    this.packageData['receiverId'] = id;
    console.log(this.packageData, 'DATA SO FAR RECEIVER DETAILS');
  }

  getPackageData() {
    return this.packageData;
  }
}
