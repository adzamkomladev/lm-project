import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Size } from '../models/cabinets/size.model';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  private readonly sizes = [
    {
      name: 'Very Small',
      count: 0,
      size: 'xs',
      disabled: true,
    },
    {
      name: ' Small',
      count: 0,
      size: 's',
      disabled: true,
    },
    {
      name: 'Medium',
      count: 0,
      size: 'm',
      disabled: true,
    },
    {
      name: 'Large',
      count: 0,
      size: 'l',
      disabled: true,
    },
    {
      name: 'Very Large',
      count: 0,
      size: 'xl',
      disabled: true,
    },
    {
      name: 'Fantastic big',
      count: 0,
      size: 'xxl',
      disabled: true,
    },
  ];

  private readonly sizesUrl = `${environment.urbanUrl}/api/Cabinet/PackageSizes`;

  constructor(private http: HttpClient) {}

  findAllSizes() {
    return this.http.get<Size[]>(this.sizesUrl).pipe(
      map((sizes) => {
        return this.sizes.map((s) => {
          const selectedSize = sizes.find((sz) => sz.size === s.size);
          return {
            ...s,
            count: selectedSize?.count || s.count,
            disabled: !selectedSize,
          };
        });
      })
    );
  }
}
