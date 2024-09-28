import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./shared/components/team-form/team-form.component').then(
        (m) => m.TeamFormComponent
      ),
  },
];
