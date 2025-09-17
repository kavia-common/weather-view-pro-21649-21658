import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResult } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() data!: WeatherResult;
}
