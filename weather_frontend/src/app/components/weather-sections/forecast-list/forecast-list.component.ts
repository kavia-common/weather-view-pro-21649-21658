import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDay } from '../../../services/weather.service';
import { WeatherIconComponent } from '../../weather-icon/weather-icon.component';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent {
  @Input() days: ForecastDay[] = [];
}
