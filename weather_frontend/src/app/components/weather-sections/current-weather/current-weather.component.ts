import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResult } from '../../../services/weather.service';
import { WeatherIconComponent } from '../../weather-icon/weather-icon.component';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() data!: WeatherResult;
}
