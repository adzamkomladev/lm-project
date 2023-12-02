import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then((m) => m.IndexComponent),
    data: {
      title: 'heading.report.title',
      subTitle: 'heading.report.subtitle',
    },
  },
  {
    path: 'error',
    loadChildren: () => import('./error/routes'),
    data: { title: 'heading.report.title' },
  },
  {
    path: 'technician',
    loadComponent: () =>
      import('./technician/technician.component').then(
        (m) => m.TechnicianComponent
      ),
    data: { title: 'heading.report.technician' },
  },
] as Route[];
