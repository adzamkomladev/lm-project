import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'sizes', pathMatch: 'full' },
  {
    path: 'sizes',
    loadComponent: () =>
      import('./sizes/sizes.component').then((m) => m.SizesComponent),
    data: { subTitle: 'heading.courier.subtitle' },
  },
  {
    path: 'pending',
    loadComponent: () =>
      import('./pending/pending.component').then((m) => m.PendingComponent),
  },
  {
    path: 'completed',
    loadComponent: () =>
      import('./completed/completed.component').then(
        (m) => m.CompletedComponent
      ),
  },
  {
    path: 'methods',
    loadChildren: () => import('./methods/routes'),
  },
] as Route[];
