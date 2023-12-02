import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { lastValueFrom, catchError, of, tap, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ReportType } from '../enums/report-type.enum';

import { CreateReport } from '../models/create-report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly reportUrl = `${environment.urbanUrl}/api/Reports`;

  private reportData: Record<string, any> = {};

  constructor(private http: HttpClient) {}

  async createReport(body: CreateReport) {
    return await lastValueFrom(
      this.http.post(this.reportUrl, body).pipe(
        catchError((e) => {
          console.log('error', e);
          return of('error');
        }),
        map((res) => !res)
      )
    );
  }

  setReportType(reportType: ReportType) {
    this.reportData['reportType'] = reportType;
  }

  setReportUser(userId: number, name: string) {
    this.reportData['userId'] = userId;
    this.reportData['name'] = name;
  }

  setCodeAndApartmentData(code: string | null, apartmentNumber: string | null) {
    this.reportData['code'] = code;
    this.reportData['apartmentNumber'] = apartmentNumber;
  }

  getReportData() {
    return this.reportData;
  }
}
