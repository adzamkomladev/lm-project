import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { PackagesService } from '../../../../@common/services/packages.service';

import { PromptCardComponent } from '@common/components/prompt-card/prompt-card.component';
import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { CountdownComponent } from '@common/components/countdown/countdown.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PromptCardComponent,
    LinkButtonComponent,
    CountdownComponent,
    TranslateModule,
  ],
  template: `
    <div class="content-container">
      <div class="inner">
        <lastmile-prompt-card
          text="{{ 'general.completed.close.door' | translate }}"
          imageUrl="assets/images/svgs/mail.svg"
        ></lastmile-prompt-card>
        <lastmile-link-button
          *ngIf="hasPackages$ | async"
          route="/resident/packages/receive/code"
          text="{{ 'resident.index.package.waiting' | translate }}"
          imageUrl="assets/images/svgs/package.svg"
        ></lastmile-link-button>
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
  hasPackages$!: Observable<boolean>;

  constructor(
    private router: Router,
    private packagesService: PackagesService
  ) {}

  ngOnInit() {
    this.hasPackages$ = this.packagesService.verifyHasPackages();
  }

  onCompleted() {
    this.router.navigateByUrl('/');
  }
}
