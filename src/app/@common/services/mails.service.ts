import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom, catchError, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Receiver } from '../models/packages/receiver.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MailsService {
  private readonly residentsMailUrl = `${environment.urbanUrl}/api/Resident/mail/verify`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  async verifyResidentMailCode(
    code: string | null,
    apartmentNumber: string | null
  ) {
    return await lastValueFrom(
      this.http
        .post<Receiver>(this.residentsMailUrl, { code, apartmentNumber })
        .pipe(
          catchError((e) => {
            console.log('error', e);
            return of(null);
          }),
          tap((res) => {
            if (res?.token) {
              this.auth.storeJwtToken(res.token);
            }
          })
        )
    );
  }
}
