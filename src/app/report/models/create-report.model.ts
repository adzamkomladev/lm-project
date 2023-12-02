import { ReportType } from '../enums/report-type.enum';

export interface CreateReport {
  type: ReportType;
  userId: number;
  apartmentNumber: number;
  comment?: string | null;
}
