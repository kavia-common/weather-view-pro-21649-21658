import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherResult } from '../../services/weather.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule, WeatherCardComponent],
  templateUrl: './weather-grid.component.html'
  // Removed missing SCSS file reference to fix build error.
})
export class WeatherGridComponent implements OnChanges {
  @Input() city: string | null = null;

  loading = signal(false);
  error = signal<string | null>(null);
  results = signal<WeatherResult[]>([]);

  constructor(private weather: WeatherService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city && this.city.trim().length) {
      this.fetch(this.city.trim());
    }
  }

  async fetch(q: string) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await this.weather.searchCity(q);
      this.results.set(res ? [res] : []);
    } catch (e: any) {
      this.error.set(e?.message || 'Failed to fetch weather');
    } finally {
      this.loading.set(false);
    }
  }
}
