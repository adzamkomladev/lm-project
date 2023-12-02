import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { DeliverySetupService } from '../services/delivery-setup.service';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { PromptCardComponent } from '@common/components/prompt-card/prompt-card.component';
import { CountdownComponent } from '../../../@common/components/countdown/countdown.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PromptCardComponent,
    LinkButtonComponent,
    CountdownComponent,
  ],
  template: `
    <div class="content-container">
      <div class="inner">
        <lastmile-prompt-card
          text="{{
            'courier.delivery.completed.code' | translate: {code: packageCode}
          }}"
          imageUrl="assets/images/svgs/package_success.svg"
        ></lastmile-prompt-card>
        <lastmile-link-button
          route="/courier/delivery/sizes"
          text="{{ 'courier.delivery.completed.more' | translate }}"
          imageUrl="assets/images/svgs/cell_fit.svg"
        ></lastmile-link-button>
        <lastmile-countdown
          [seconds]="5"
          (completed)="onCompleted()"
        ></lastmile-countdown>
      </div>
    </div>
  `,
  styleUrls: ['./completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedComponent implements OnInit {
  packageCode!: number;

  constructor(
    private router: Router,
    private deliverySetupService: DeliverySetupService
  ) {}

  ngOnInit(): void {
    const { packageCode } = this.deliverySetupService.getDeliveryData();
    this.packageCode = packageCode;
  }

  onCompleted() {
    this.router.navigateByUrl('/');
  }
}
