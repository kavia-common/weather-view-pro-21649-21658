import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsService } from '../../services/locations.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  locations = signal<string[]>([]);
  newLocation = '';

  constructor(private locationsService: LocationsService) {
    effect(() => {
      this.locations.set(this.locationsService.locations());
    });
  }

  add() {
    if (this.newLocation.trim()) {
      this.locationsService.addLocation(this.newLocation.trim());
      this.newLocation = '';
    }
  }

  remove(city: string) {
    this.locationsService.removeLocation(city);
  }
}
