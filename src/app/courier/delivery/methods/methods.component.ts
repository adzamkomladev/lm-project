import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DeliverySetupService } from '../services/delivery-setup.service';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  template: `
    <div class="content-container">
      <lastmile-link-button
        [route]="residentMethodRoute"
        text="{{ 'courier.delivery.methods.choose' | translate}}"
        description="{{ 'courier.delivery.methods.shipping' | translate}}"
        imageUrl="assets/images/svgs/resident_list.svg"
      ></lastmile-link-button>
      <lastmile-link-button
        route="/courier/delivery/methods/barcode/code/package"
        text="{{ 'courier.delivery.methods.scan' | translate}}"
        description="{{ 'courier.delivery.methods.delivery' | translate}}"
        imageUrl="assets/images/svgs/resident.svg"
      ></lastmile-link-button>
    </div>
  `,
  styleUrls: ['./methods.component.scss'],
  imports: [CommonModule, LinkButtonComponent, TranslateModule],
})
export class MethodsComponent implements OnInit {
  residentMethodRoute!: string;

  constructor(
    private route: ActivatedRoute,
    private deliverySetupService: DeliverySetupService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((q) => {
      const size = q.get('size');
      if (size) this.deliverySetupService.setSize(size);
    });

    const deliveryData = this.deliverySetupService.getDeliveryData();

    this.residentMethodRoute = !!deliveryData?.['packageSenderId']
      ? '/courier/delivery/methods/residents/select'
      : '/courier/delivery/methods/residents/code/company';
  }
}
