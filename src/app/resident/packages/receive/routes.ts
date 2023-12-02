import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'code', pathMatch: 'full' },
  {
    path: 'code',
    loadComponent: () =>
      import('./code/code.component').then((m) => m.CodeComponent),
  },
  {
    path: 'completed',
    loadComponent: () =>
      import('./completed/completed.component').then((m) => m.CompletedComponent),
  },
] as Route[];
