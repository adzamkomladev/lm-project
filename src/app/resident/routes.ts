import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then((m) => m.IndexComponent),
    data: { title: 'general.resident' },
  },
  {
    path: 'mails',
    loadChildren: () => import('./mails/routes'),
  },
  {
    path: 'packages',
    loadChildren: () => import('./packages/routes'),
  },
] as Route[];
