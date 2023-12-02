import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lastmile-confirm-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: ` <div class="card">
    <div class="card-content">
      <ng-content></ng-content>
    </div>
    <button class="app-button" (click)="onConfirm()">
      {{ 'general.confirm' | translate }}
    </button>
  </div>`,
  styleUrls: ['./confirm-card.component.scss'],
})
export class ConfirmCardComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmed.emit(true);
  }
}
