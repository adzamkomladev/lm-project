import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Resident } from '@common/models/residents/resident.model';

import { DeliverySetupService } from '../../../services/delivery-setup.service';

import { SearchComponent } from '@common/components/residents/search/search.component';

@Component({
  standalone: true,
  templateUrl: './select-resident.component.html',
  styleUrls: ['./select-resident.component.scss'],
  imports: [CommonModule, SearchComponent],
})
export class SelectResidentComponent {
  constructor(
    private router: Router,
    private deliverySetupService: DeliverySetupService
  ) {}

  onSearch(resident: Resident) {
    this.deliverySetupService.setResident(
      resident.flatNumber,
      resident.id,
      resident.fullName
    );

    this.router.navigate(['/courier/delivery/methods/residents/confirm']);
  }
}
