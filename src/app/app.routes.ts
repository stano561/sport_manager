import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app.component').then((component) => component.AppComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (component) => component.HomePageComponent
      ),
  },
  {
    path: 'add-team',
    loadComponent: () =>
      import('./components/team-form/team-form.component').then(
        (component) => component.TeamFormComponent
      ),
  },
  {
    path: 'team/:id',
    loadComponent: () =>
      import('./components/team-detail/team-detail.component').then(
        (component) => component.TeamDetailComponent
      ),
  },
  {
    path: 'edit-team/:id',
    loadComponent: () =>
      import('./components/team-form/team-form.component').then(
        (component) => component.TeamFormComponent
      ),
  },
  {
    path: 'assign-member/:teamId',
    loadComponent: () =>
      import('./components/roster/roster.component').then(
        (component) => component.RosterComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import(
        './components/member-team-search/member-team-search.component'
      ).then((component) => component.MemberTeamSearchComponent),
  },
];
