import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { DeliverySetupService } from '../services/delivery-setup.service';
import { DeviceService } from '../../../@common/services/device.service';

import { LinkButtonComponent } from '../../../@common/components/link-button/link-button.component';
import { PromptCardComponent } from '../../../@common/components/prompt-card/prompt-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PromptCardComponent,
    LinkButtonComponent,
  ],
  template: `
    <div class="content-container">
      <lastmile-prompt-card
        text="{{
          'courier.delivery.pending.choose' | translate : { cell: cell }
        }}"
        imageUrl="assets/images/svgs/calender.svg"
      ></lastmile-prompt-card>
      <lastmile-link-button
        text="{{ 'courier.delivery.pending.noFit' | translate }}"
        (clicked)="onClicked()"
        [emitClick]="true"
        imageUrl="assets/images/svgs/cell_fit.svg"
      ></lastmile-link-button>
    </div>
  `,
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit, OnDestroy {
  cell!: number;
  boxStatusSubscription!: Subscription;

  constructor(
    private router: Router,
    private deliverySetupService: DeliverySetupService,
    private deviceService: DeviceService
  ) {
    const deliveryData = this.deliverySetupService.getDeliveryData();
    this.cell = deliveryData['cell'];
  }

  ngOnInit(): void {
    this.boxStatusSubscription = this.deviceService
      .currentBoxStatus()
      .subscribe(async (boxStatus) => {
        if (boxStatus === 'closed') {
          await this.deliverySetupService.setCabinetBoxStatus('closed');
          await this.router.navigate(['/courier/delivery/completed']);
        }
      });
  }

  ngOnDestroy(): void {
    this.boxStatusSubscription.unsubscribe();
  }

  async onClicked() {
    await this.deliverySetupService.cancel();
    await this.router.navigate(['/']);
  }
}
