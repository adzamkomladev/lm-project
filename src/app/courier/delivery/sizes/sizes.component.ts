import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { Size } from '../../../@common/models/cabinets/size.model';

import { SizesService } from '@common/services/sizes.service';

import { LinkButtonComponent } from '@common/components/link-button/link-button.component';

@Component({
  standalone: true,
  template: `
    <div class="content-container">
      <div>
        <ng-container *ngIf="sizes$ | async as sizes">
          <lastmile-link-button
            *ngFor="let size of sizes"
            [route]="route"
            [queryParams]="{ size: size.size }"
            [text]="size.name"
            [cells]="size.count"
            additionalClass="small-container"
            [disabled]="!!size.disabled"
            [imageUrl]="'assets/images/svgs/' + size.size + '.svg'"
          ></lastmile-link-button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [``],
  imports: [CommonModule, LinkButtonComponent],
})
export class SizesComponent {
  route = '/courier/delivery/methods';

  sizes$: Observable<Size[]>;

  constructor(private sizesService: SizesService) {
    this.sizes$ = this.sizesService.findAllSizes();
  }

}
