import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { KeyboardService } from '@common/services/keyboard.service';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="content-container">
      <div class="card">
        <h4>
          {{
            'report.error.problem.title' | translate : { name: 'Constantine' }
          }}
        </h4>
        <textarea
          [id]="id"
          [(ngModel)]="comment"
          rows="4"
          (input)="onInputChange($event)"
          (focus)="showKeyboard($event)"
          (blur)="hideKeyboard($event)"
        ></textarea>

        <p class="error-message" *ngIf="showErrorMessage">
          {{ 'error.data.incorrect' | translate }}
        </p>
        <button
          class="app-button"
          [disabled]="!comment.length"
          (click)="onClick()"
        >
          {{ 'general.send' | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit, OnDestroy {
  id = 'problem-input-id';
  showErrorMessage = false;

  comment = '';
  currentTextSubscription!: Subscription;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private keyboardService: KeyboardService
  ) {}

  ngOnDestroy(): void {
    this.currentTextSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.currentTextSubscription = this.keyboardService.currentText$.subscribe(
      (text) => {
        if (this.keyboardService.currentId === this.id) {
          this.comment = text;
        }
      }
    );
  }

  async onClick() {
    const { reportType, userId, apartmentNumber } =
      this.reportService.getReportData();

    // Create report
    const createReportRes = await this.reportService.createReport({
      type: reportType,
      userId,
      apartmentNumber,
      comment: this.comment,
    });

    if (!createReportRes) {
      this.showErrorMessage = true;
      return;
    }

    await this.router.navigate(['/report/error/complete']);
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.comment = inputValue;
  }

  hideKeyboard(event: FocusEvent): void {
    this.onToggleKeyboard({ id: this.id, show: false });
  }

  showKeyboard(event: FocusEvent): void {
    this.onToggleKeyboard({ id: this.id, show: true });
  }

  onToggleKeyboard(data: { id: string; show: boolean }) {
    if (data.show) this.keyboardService.showKeyboard(data.id, this.comment);

    this.keyboardService.switchToAlpha();
  }
}
