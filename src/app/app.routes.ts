import { Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
];
