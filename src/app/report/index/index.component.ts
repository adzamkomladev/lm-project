import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ReportError } from '../models/report-error.model';

import { ErrorsService } from '../services/errors.service';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, LinkButtonComponent],
  template: `
    <div class="content-container">
      <lastmile-link-button
        *ngFor="let error of errors"
        [route]="error.route"
        [queryParams]="{ type: error.type }"
        text="{{ error.translationKey | translate }}"
        [imageUrl]="error.image"
        additionalClass="report-card"
      ></lastmile-link-button>
    </div>
  `,
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  errors!: ReportError[];

  constructor(private errorsService: ErrorsService) {}

  ngOnInit(): void {
    this.errors = this.errorsService.getAllErrors();
  }
}
