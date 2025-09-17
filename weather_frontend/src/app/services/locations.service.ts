import { Injectable, signal } from '@angular/core';

@Injectable()
export class LocationsService {
  private _locations = signal<string[]>(['San Francisco', 'New York', 'London']);

  // PUBLIC_INTERFACE
  locations() {
    /** Returns the list of saved locations in memory. */
    return this._locations();
  }

  // PUBLIC_INTERFACE
  addLocation(city: string) {
    /** Add a location to saved list (deduplicated). */
    const set = new Set(this._locations());
    set.add(city);
    this._locations.set(Array.from(set));
  }

  // PUBLIC_INTERFACE
  removeLocation(city: string) {
    /** Remove a location from saved list. */
    this._locations.set(this._locations().filter(c => c !== city));
  }
}
