import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WeatherGridComponent } from './components/weather-grid/weather-grid.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherService } from './services/weather.service';
import { LocationsService } from './services/locations.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, WeatherDisplayComponent, WeatherGridComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService, LocationsService, AuthService]
})
export class AppComponent {
  title = 'Weather View Pro';

  // Selected city for search results
  selectedCity = signal<string>('');

  onSearch(city: string) {
    this.selectedCity.set(city);
  }
}
