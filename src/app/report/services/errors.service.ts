import { Injectable } from '@angular/core';
import { ReportType } from '../enums/report-type.enum';
import { ReportError } from '../models/report-error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  private readonly errors: ReportError[] = [
    {
      route: '/report/error/details',
      type: ReportType.DWO,
      image: 'assets/images/svgs/lock.svg',
      translationKey: 'report.index.open',
    },
    {
      route: '/report/error/details',
      type: ReportType.DWL,
      image: 'assets/images/svgs/open.svg',
      translationKey: 'report.index.lock',
    },
    {
      route: '/report/error/details',
      type: ReportType.MBDB,
      image: 'assets/images/svgs/mailbox.svg',
      translationKey: 'report.index.mailbox',
    },
    {
      route: '/report/error/details',
      type: ReportType.MDB,
      image: 'assets/images/svgs/main.svg',
      translationKey: 'report.index.main',
    },
    {
      route: '/report/error/details',
      type: ReportType.NSR,
      image: 'assets/images/svgs/signal.svg',
      translationKey: 'report.index.signal',
    },
    {
      route: '/report/error/details',
      type: ReportType.BRB,
      image: 'assets/images/svgs/barcode.svg',
      translationKey: 'report.index.barcode',
    },
    {
      route: '/report/error/details',
      type: ReportType.OC,
      image: 'assets/images/svgs/connection.svg',
      translationKey: 'report.index.connection',
    },
    {
      route: '/report/error/details',
      type: ReportType.OP,
      image: 'assets/images/svgs/other.svg',
      translationKey: 'report.index.other',
    },
    {
      route: '/report/technician',
      type: ReportType.TEC,
      image: 'assets/images/svgs/technician.svg',
      translationKey: 'report.index.technician',
    },
  ];

  constructor() {}

  getAllErrors(): ReportError[] {
    return this.errors;
  }
}
