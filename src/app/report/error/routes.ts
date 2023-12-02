import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  {
    path: 'details',
    loadComponent: () =>
      import('./details/details.component').then((m) => m.DetailsComponent),
  },
  {
    path: 'problem',
    loadComponent: () =>
      import('./problem/problem.component').then((m) => m.ProblemComponent),
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./completed/completed.component').then((m) => m.CompletedComponent),
  },
] as Route[];