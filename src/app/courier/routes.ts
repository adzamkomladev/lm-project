import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then((m) => m.IndexComponent),
    data: { title: 'heading.courier.title' }
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/routes'),
    data: { title: 'heading.courier.delivery' }
  },
  {
    path: 'residents',
    loadComponent: () =>
      import('./residents/residents.component').then(
        (m) => m.ResidentsComponent
      ),
    data: { title: 'heading.courier.residents' }
  },
] as Route[];
