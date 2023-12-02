import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReportService } from '../../services/report.service';

import { PromptCardComponent } from '@common/components/prompt-card/prompt-card.component';
import { CountdownComponent } from '@common/components/countdown/countdown.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PromptCardComponent,
    CountdownComponent,
    TranslateModule,
  ],
  template: `
    <div class="content-container">
      <div class="inner">
        <lastmile-prompt-card
          text="{{ 'report.error.received' | translate: { name: name} }}"
          imageUrl="assets/images/svgs/error.svg"
        ></lastmile-prompt-card>
        <div class="countdown-container">
          <lastmile-countdown
            [seconds]="5"
            (completed)="onCompleted()"
          ></lastmile-countdown>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedComponent implements OnInit {
  name!: string;

  constructor(private router: Router, private reportService: ReportService) {}

  ngOnInit(): void {
    this.name = this.reportService.getReportData()?.['name'];
  }

  onCompleted() {
    this.router.navigateByUrl('/');
  }
}
