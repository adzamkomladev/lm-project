import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Resident } from '@common/models/residents/resident.model';

import { SearchComponent } from '@common/components/residents/search/search.component';

@Component({
  standalone: true,
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SearchComponent],
})
export class ResidentsComponent {
  onSearch(resident: Resident) {
    console.log(resident);
  }
}
