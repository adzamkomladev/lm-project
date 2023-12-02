import { Route } from '@angular/router';

export default [
  {
    path: 'receive',
    loadChildren: () => import('./receive/routes'),
    data: { title: 'heading.resident.package' }
  },

] as Route[];
