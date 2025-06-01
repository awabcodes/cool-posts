import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () => import('./features/posts/posts.component').then((m) => m.PostsComponent),
  },
];
