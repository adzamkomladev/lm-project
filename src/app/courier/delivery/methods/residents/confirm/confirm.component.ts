import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmCardComponent } from '@common/components/confirm-card/confirm-card.component';
import { DeliverySetupService } from '@app/courier/delivery/services/delivery-setup.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  template: `
    <div class="content-container">
      <lastmile-confirm-card (confirmed)="onConfirmed($event)">
        <div>
          <p class="apartment-code">{{ 'resident.search.apartment' | translate }} {{ apartmentCode }}</p>
          <p class="user-name">{{ name }}</p>
        </div>
      </lastmile-confirm-card>
    </div>
  `,
  styleUrls: ['./confirm.component.scss'],
  imports: [CommonModule, ConfirmCardComponent, TranslateModule],
})
export class ConfirmComponent {
  apartmentCode = '1233';
  name = 'John Doe';

  constructor(
    private router: Router,
    private deliverySetupService: DeliverySetupService
  ) {
    const deliveryData = this.deliverySetupService.getDeliveryData();

    this.apartmentCode = deliveryData['apartmentNumber'];
    this.name = deliveryData['residentName'];
  }

  async onConfirmed(event: boolean) {
    const data = await this.deliverySetupService.setCabinetBoxStatus('open');

    if (data) {
      await this.router.navigate(['/courier/delivery/completed']);
    }
  }
}
