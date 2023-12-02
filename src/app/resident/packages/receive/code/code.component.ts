import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { LabelInputComponent } from '@common/components/label-input/label-input.component';
import { PackagesService } from '@common/services/packages.service';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardService } from '../../../../@common/services/keyboard.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, LabelInputComponent, TranslateModule],
  template: `
    <div class="content-container">
      <div class="card">
        <h4>{{ 'resident.index.package.code' | translate }}</h4>
        <lastmile-input
          type="text"
          [formControl]="packageCodeInput"
          placeholder="{{ 'general.details.placeholder.code' | translate }}"
          [hasError]="showErrorMessage()"
          [id]="packageCodeId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>

        <p class="error-message" *ngIf="showErrorMessage()">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          class="app-button"
          [disabled]="packageCodeInput.invalid"
          (click)="onClick()"
        >
          {{ 'general.ok' | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit, OnDestroy {
  currentTextSubscription!: Subscription;

  packageCodeId = 'new-package-code';
  showErrorMessage = signal<boolean>(false);

  packageCodeInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private router: Router,
    private keyboardService: KeyboardService,
    private packagesService: PackagesService
  ) {}

  ngOnDestroy(): void {
    this.currentTextSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.currentTextSubscription = this.keyboardService.currentText$.subscribe(
      (text) => {
        if (this.keyboardService.currentId === this.packageCodeId) {
          this.packageCodeInput.setValue(text);
        }
      }
    );
  }

  async onClick() {
    this.showErrorMessage.update((_) => false);

    const data = await this.packagesService.verifyResidentPackageCode(
      this.packageCodeInput.getRawValue()
    );

    if (!data) {
      this.showErrorMessage.update((_) => true);
      return;
    }

    if (data) {
      await this.router.navigate(['/resident/packages/receive/completed']);
    }
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.show) {
      this.keyboardService.showKeyboard(data.id, this.packageCodeInput.value);
      this.keyboardService.switchToNumeric();
    }
  }
}
