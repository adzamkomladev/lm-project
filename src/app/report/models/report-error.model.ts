import { ReportType } from '../enums/report-type.enum';

export interface ReportError {
  route: string;
  type: ReportType;
  image: string;
  translationKey: string;
}
