import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { CompanyCodeService } from './services/company-code.service';
import { DeliverySetupService } from '@app/courier/delivery/services/delivery-setup.service';
import { KeyboardService } from '@common/services/keyboard.service';

import { LabelInputComponent } from '@common/components/label-input/label-input.component';

@Component({
  standalone: true,
  imports: [CommonModule, LabelInputComponent, TranslateModule],
  providers: [CompanyCodeService],
  template: `
    <div class="content-container">
      <div class="card">
        <h4>{{ 'courier.delivery.company.code.title' | translate }}</h4>
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
          (click)="onClick()"
          [disabled]="companyCodeInput.invalid"
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
  styleUrls: ['./company-code.component.scss'],
})
export class CompanyCodeComponent implements OnInit, OnDestroy {
  currentTextSubscription!: Subscription;
  companyCodeId = 'resident-company-code-id';
  showErrorMessage = false;

  // TODO: Add validation
  companyCodeInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private router: Router,
    private companyCodeService: CompanyCodeService,
    private keyboardService: KeyboardService,
    private deliverySetupService: DeliverySetupService
  ) {}

  ngOnDestroy(): void {
    this.currentTextSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.currentTextSubscription = this.keyboardService.currentText$.subscribe(
      (text) => {
        if (this.keyboardService.currentId === this.companyCodeId) {
          this.companyCodeInput.setValue(text);
        }
      }
    );
  }

  async onClick() {
    this.showErrorMessage = false;
    const canContinue = await this.companyCodeService.verifyCompanyCode(
      this.companyCodeInput.getRawValue()
    );

    if (!canContinue) {
      console.log('Invalid company code');
      this.showErrorMessage = true;
      return;
    }

    // TODO: Save progress somewhere
    this.deliverySetupService.setCompanyCode(
      this.companyCodeInput.getRawValue()
    );

    await this.router.navigate(['/courier/delivery/methods/residents/select']);
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.show)
      this.keyboardService.showKeyboard(data.id, this.companyCodeInput.value);

    this.keyboardService.switchToNumeric();
  }
}
