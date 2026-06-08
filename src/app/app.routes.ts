import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./components/experience/experience.component').then(
        (m) => m.ExperienceComponent
      ),
    data: { animation: 'ExperiencePage' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
