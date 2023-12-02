import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courier', loadChildren: () => import('./courier/routes') },
  { path: 'resident', loadChildren: () => import('./resident/routes') },
  { path: 'report', loadChildren: () => import('./report/routes') },
  { path: 'language', component: LanguageComponent },
];
