import { Component, Input, OnChanges, SimpleChanges, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherResult, ForecastDay } from '../../services/weather.service';
import { CurrentWeatherComponent } from '../weather-sections/current-weather/current-weather.component';
import { ForecastListComponent } from '../weather-sections/forecast-list/forecast-list.component';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, CurrentWeatherComponent, ForecastListComponent],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnChanges {
  /**
   * Input city to query. When changed, triggers fetch.
   * If empty and geolocation is supported, user can click "Use my location".
   */
  @Input() city: string | null = null;

  loading = signal(false);
  error = signal<string | null>(null);
  current = signal<WeatherResult | null>(null);
  forecast = signal<ForecastDay[]>([]);

  constructor(private weather: WeatherService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('city' in changes) {
      const c = (this.city || '').trim();
      if (c.length) {
        this.fetchByCity(c);
      }
    }
  }

  // PUBLIC_INTERFACE
  async useGeolocation() {
    /** Attempt to fetch weather using browser geolocation. */
    if (!('geolocation' in navigator)) {
      this.error.set('Geolocation is not supported by your browser.');
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
      });
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const [cur, fc] = await Promise.all([
        this.weather.getCurrentByCoords(lat, lon),
        this.weather.getForecastByCoords(lat, lon)
      ]);
      this.current.set(cur);
      this.forecast.set(fc);
    } catch (e: any) {
      this.error.set(e?.message || 'Unable to fetch geolocation weather.');
    } finally {
      this.loading.set(false);
    }
  }

  private async fetchByCity(q: string) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [cur, fc] = await Promise.all([
        this.weather.searchCity(q),
        this.weather.getForecastByCity(q)
      ]);
      this.current.set(cur);
      this.forecast.set(fc);
    } catch (e: any) {
      this.error.set(e?.message || 'Failed to fetch weather');
      this.current.set(null);
      this.forecast.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
