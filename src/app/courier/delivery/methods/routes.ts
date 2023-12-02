import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./methods.component').then((m) => m.MethodsComponent),
  },
  {
    path: 'barcode/code/package',
    loadComponent: () =>
      import('./barcode/package-code/package-code.component').then((m) => m.PackageCodeComponent),
  },
  {
    path: 'residents/code/company',
    loadComponent: () =>
      import('./residents/company-code/company-code.component').then((m) => m.CompanyCodeComponent),
  },
  {
    path: 'residents/select',
    loadComponent: () =>
      import('./residents/select-resident/select-resident.component').then((m) => m.SelectResidentComponent),
  },
  {
    path: 'residents/confirm',
    loadComponent: () =>
      import('./residents/confirm/confirm.component').then((m) => m.ConfirmComponent),
  }
] as Route[];
