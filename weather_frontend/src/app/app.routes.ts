import { Routes } from '@angular/router';
import { WeatherGridComponent } from './components/weather-grid/weather-grid.component';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';

export const appRoutes: Routes = [
  { path: '', component: WeatherGridComponent, title: 'Weather' },
  { path: 'profile', component: ProfilePageComponent, title: 'Profile' },
  { path: '**', component: NotFoundPageComponent, title: 'Not Found' }
];
