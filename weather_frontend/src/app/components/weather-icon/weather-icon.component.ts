import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent {
  @Input() name: string | undefined;
  @Input() size = 48;

  // Decide a simple icon keyword from the name/description
  kind = computed(() => {
    const n = (this.name || '').toLowerCase();
    if (n.includes('rain') || n.includes('shower')) return 'rain';
    if (n.includes('cloud')) return 'cloud';
    if (n.includes('snow')) return 'snow';
    if (n.includes('storm') || n.includes('thunder')) return 'storm';
    if (n.includes('mist') || n.includes('fog')) return 'mist';
    return 'sun';
  });
}
