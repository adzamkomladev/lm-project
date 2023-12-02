import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ReportType } from '../../enums/report-type.enum';

import { ReportService } from '../../services/report.service';
import { MailsService } from '../../../@common/services/mails.service';
import { KeyboardService } from '@common/services/keyboard.service';

import { LabelInputComponent } from '@common/components/label-input/label-input.component';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, LabelInputComponent, TranslateModule],
  template: `
    <div class="content-container">
      <div class="card">
        <h4>
          {{ 'general.details.apartment' | translate }}
          <br />
          {{ 'general.details.code' | translate }}
        </h4>
        <lastmile-input
          type="text"
          [formControl]="apartmentNumberInput"
          placeholder="{{
            'general.details.placeholder.apartment' | translate
          }}"
          [hasError]="showErrorMessage"
          [id]="apartmentNumberId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>
        <lastmile-input
          type="text"
          [formControl]="companyCodeInput"
          placeholder="{{ 'general.details.placeholder.code' | translate }}"
          [hasError]="showErrorMessage"
          [id]="companyCodeId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>

        <p class="error-message" *ngIf="showErrorMessage">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          class="app-button"
          [disabled]="apartmentNumberInput.invalid || companyCodeInput.invalid"
          (click)="onClick()"
        >
          {{ 'general.ok' | translate }}
        </button>
        <div class="alternative">
          <p class="scan-info">{{ 'general.scan.qr' | translate }}</p>
          <img class="scan-img" src="assets/images/svgs/scan.svg" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  apartmentNumberId = 'report-apartment-number';
  companyCodeId = 'report-company-code';
  showErrorMessage = false;
  currentTextSubscription!: Subscription;

  apartmentNumberInput = new FormControl<string>('', [Validators.required]);
  companyCodeInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailsService: MailsService,
    private keyboardService: KeyboardService,
    private reportService: ReportService
  ) {}

  ngOnDestroy(): void {
    this.currentTextSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.currentTextSubscription = this.keyboardService.currentText$.subscribe(
      (text) => {
        if (this.keyboardService.currentId === this.apartmentNumberId) {
          this.apartmentNumberInput.setValue(text);
        }

        if (this.keyboardService.currentId === this.companyCodeId) {
          this.companyCodeInput.setValue(text);
        }
      }
    );
  }

  async onClick() {
    this.showErrorMessage = false;

    // Confirm that type in queryParameter is valid
    const reportType = this.route.snapshot.queryParamMap.get('type');
    if (
      !(
        reportType &&
        Object.values(ReportType).includes(+reportType as ReportType)
      )
    ) {
      return;
    }
    const enumValue: ReportType = +reportType;

    // Store report data for later use
    this.reportService.setReportType(enumValue);
    this.reportService.setCodeAndApartmentData(
      this.companyCodeInput.getRawValue(),
      this.apartmentNumberInput.getRawValue()
    );

    // Verify apartmentNumber and companyCode
    // This also initializes the jwt token to be used later
    const verifyRes = await this.mailsService.verifyResidentMailCode(
      this.companyCodeInput.getRawValue(),
      this.apartmentNumberInput.getRawValue()
    );

    if (!verifyRes) {
      this.showErrorMessage = true;
      return;
    }

    this.reportService.setReportUser(verifyRes.id, verifyRes.name);

    // Navigate to the next page if report type is Other Problem
    if (enumValue === ReportType.OP) {
      return await this.router.navigate(['/report/error/problem']);
    }

    // Confirm apartment number is not null (else typescript will complain)
    const apartmentNumber = this.apartmentNumberInput.getRawValue();
    if (!apartmentNumber) {
      this.showErrorMessage = true;
      return;
    }

    // Create report
    const createReportRes = await this.reportService.createReport({
      type: enumValue,
      userId: verifyRes?.id,
      apartmentNumber: +apartmentNumber,
    });

    if (!createReportRes) {
      this.showErrorMessage = true;
      return;
    }

    return await this.router.navigate(['/report/error/complete']);
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.id === this.apartmentNumberId && data.show)
      this.keyboardService.showKeyboard(
        data.id,
        this.apartmentNumberInput.value
      );
    if (data.id === this.companyCodeId && data.show)
      this.keyboardService.showKeyboard(data.id, this.companyCodeInput.value);

    this.keyboardService.switchToNumeric();
  }
}
