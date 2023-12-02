import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { LabelInputComponent } from '@common/components/label-input/label-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardService } from '@common/services/keyboard.service';

@Component({
  standalone: true,
  imports: [CommonModule, LabelInputComponent, TranslateModule],
  template: `
    <div class="content-container">
      <div class="card">
        <h4 class="title">{{ 'report.technician.login' | translate }}</h4>
        <lastmile-input
          type="text"
          [formControl]="userNameInput"
          placeholder="{{ 'report.technician.username' | translate }}"
          [hasError]="showErrorMessage"
          [id]="userNameId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>
        <lastmile-input
          type="password"
          [formControl]="userPasswordInput"
          placeholder="{{ 'report.technician.password' | translate }}"
          [hasError]="showErrorMessage"
          [id]="passwordId"
          (toggleKeyboard)="onToggleKeyboard($event)"
        ></lastmile-input>

        <p class="error-message" *ngIf="showErrorMessage">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          [disabled]="userPasswordInput.invalid || userPasswordInput.invalid"
          class="app-button"
          (click)="onClick()"
        >
          {{ 'general.ok' | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianComponent {
  passwordId = "technician-password";
  userNameId = "technician-username";

  showErrorMessage = false;

  userNameInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  userPasswordInput = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(private router: Router, private keyboardService: KeyboardService,) { }

  ngOnInit(): void {
    this.keyboardService.currentText$.subscribe((text) => {
      if (this.keyboardService.currentId === this.userNameId) {
        this.userNameInput.setValue(text);
      }

      if (this.keyboardService.currentId === this.passwordId) {
        this.userPasswordInput.setValue(text);
      }
    });
  }

  async onClick() { }

  onToggleKeyboard(data: { id: string; show: boolean }) {

    if (data.id === this.userNameId && data.show)
      this.keyboardService.showKeyboard(data.id, this.userNameInput.value);
    if (data.id === this.passwordId && data.show)
      this.keyboardService.showKeyboard(data.id, this.userPasswordInput.value);

  }
}
