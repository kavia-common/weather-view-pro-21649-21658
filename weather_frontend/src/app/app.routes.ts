import { Routes } from '@angular/router';
import { WeatherGridComponent } from './components/weather-grid/weather-grid.component';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

export const appRoutes: Routes = [
  { path: '', component: WeatherDisplayComponent, title: 'Weather' },
  { path: 'grid', component: WeatherGridComponent, title: 'Weather Grid' },
  { path: 'profile', component: ProfilePageComponent, title: 'Profile' },
  { path: '**', component: NotFoundPageComponent, title: 'Not Found' }
];
