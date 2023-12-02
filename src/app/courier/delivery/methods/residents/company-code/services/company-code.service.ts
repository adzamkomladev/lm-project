import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, lastValueFrom, catchError, of, tap } from 'rxjs';

import { environment } from '../../../../../../../environments/environment';

import { DeliverySetupService } from '../../../../services/delivery-setup.service';
import { AuthService } from '../../../../../../@common/services/auth.service';

@Injectable()
export class CompanyCodeService {
  private readonly companyCodeUrl = `${environment.urbanUrl}/api/Packs/verify/Company`;

  constructor(
    private http: HttpClient,
    private deliverySetupService: DeliverySetupService,
    private auth: AuthService
  ) {}

  async verifyCompanyCode(companyCode: string | null) {
    return await lastValueFrom(
      this.http
        .get<{ id: number; token: string }>(
          `${this.companyCodeUrl}/${companyCode}`
        )
        .pipe(
          catchError((_) => of(null)),
          tap((res) => {
            if (res) {
              this.deliverySetupService.setPackageSenderId(res.id);
              this.auth.storeJwtToken(res.token);
            }
          }),
          map((res) => !!res)
        )
    );
  }
}
