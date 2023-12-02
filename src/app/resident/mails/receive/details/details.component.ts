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

import { MailsService } from '@common/services/mails.service';
import { KeyboardService } from '@common/services/keyboard.service';

import { LabelInputComponent } from '@common/components/label-input/label-input.component';

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
          [formControl]="codeInput"
          placeholder="{{ 'general.details.placeholder.code' | translate }}"
          [hasError]="showErrorMessage"
          [id]="codeId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>

        <p class="error-message" *ngIf="showErrorMessage">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          class="app-button"
          [disabled]="apartmentNumberInput.invalid || codeInput.invalid"
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
})
export class DetailsComponent implements OnInit, OnDestroy {
  currentTextSubscription!: Subscription;

  apartmentNumberId = 'new-mail-apartment-number';
  codeId = 'new-mail-code';

  showErrorMessage = false;

  apartmentNumberInput = new FormControl<string>('', [Validators.required]);
  codeInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private router: Router,
    private keyboardService: KeyboardService,
    private mailsService: MailsService
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

        if (this.keyboardService.currentId === this.codeId) {
          this.codeInput.setValue(text);
        }
      }
    );
  }

  async onClick() {
    this.showErrorMessage = false;

    const data = await this.mailsService.verifyResidentMailCode(
      this.codeInput.getRawValue(),
      this.apartmentNumberInput.getRawValue()
    );

    if (!data) {
      this.showErrorMessage = true;
      console.log('error');
      return;
    }

    await this.router.navigate(['/resident/mails/receive/completed']);
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.id === this.apartmentNumberId && data.show)
      this.keyboardService.showKeyboard(
        data.id,
        this.apartmentNumberInput.value
      );
    if (data.id === this.codeId && data.show)
      this.keyboardService.showKeyboard(data.id, this.codeInput.value);

    this.keyboardService.switchToNumeric();
  }
}
