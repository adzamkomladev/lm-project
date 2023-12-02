import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesService } from '../../../../../@common/services/packages.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { DeliverySetupService } from '../../../services/delivery-setup.service';
import { LabelInputComponent } from '@common/components/label-input/label-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardService } from '@app/@common/services/keyboard.service';

@Component({
  standalone: true,
  imports: [CommonModule, LabelInputComponent, TranslateModule],
  template: `
    <div class="content-container">
      <div class="card">
        <div class="alternative">
          <p class="scan-info">
            {{ 'courier.delivery.methods.package.scan' | translate }}
          </p>
          <img class="scan-img" src="assets/images/svgs/scan.svg" />
        </div>
        <h4>{{ 'courier.delivery.methods.package.code' | translate }}</h4>
        <lastmile-input
          type="text"
          placeholder="{{ 'general.details.placeholder.code' | translate }}"
          [formControl]="packageCodeInput"
          [hasError]="showErrorMessage"
          [id]="packageCodeId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>
        <p class="error-message" *ngIf="showErrorMessage">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          class="app-button"
          (click)="onClick()"
          [disabled]="packageCodeInput.invalid"
        >
          {{ 'general.ok' | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./package-code.component.scss'],
})
export class PackageCodeComponent {
  packageCodeId = 'delivery-package-code-id';
  showErrorMessage = false;

  // TODO: Add extra validation
  packageCodeInput = new FormControl<string>('', [Validators.required]);

  constructor(
    private router: Router,
    private packagesService: PackagesService,
    private keyboardService: KeyboardService,
    private deliverySetupService: DeliverySetupService
  ) { }

  ngOnInit(): void {
    this.keyboardService.currentText$.subscribe((text) => {
      if (this.keyboardService.currentId === this.packageCodeId) {
        this.packageCodeInput.setValue(text);
      }
    });
  }

  async onClick() {
    this.showErrorMessage = false;
    const canContinue = await this.packagesService.verifyPackageCode(
      this.packageCodeInput.getRawValue()
    );

    if (!canContinue) {
      console.log('Invalid package code');
      this.showErrorMessage = true;
      return;
    }

    // TODO: Save progress somewhere
    this.deliverySetupService.setPackageCode(
      this.packageCodeInput.getRawValue()
    );

    await this.router.navigate(['/courier/delivery/pending']);
  }

  enableButton(): boolean {
    return this.packageCodeInput.value
      ? this.packageCodeInput.value.length < 4
      : true;
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.show)
      this.keyboardService.showKeyboard(data.id, this.packageCodeInput.value);
  }
}
