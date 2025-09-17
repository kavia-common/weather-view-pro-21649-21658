import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface WeatherResult {
  city: string;
  description: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
  icon?: string;
}

export interface ForecastDay {
  day: string;
  min: number;
  max: number;
  description: string;
  humidity: number;
  wind: number;
  icon?: string;
}

@Injectable()
export class WeatherService {
  /**
   * Try to map common backend responses (like OpenWeather) to our unified shape.
   */
  private mapCurrent(res: any, fallbackCity?: string): WeatherResult {
    return {
      city: res?.city || res?.name || fallbackCity || 'Unknown',
      description: res?.description || res?.weather?.[0]?.description || 'N/A',
      temp: Math.round(res?.temp ?? res?.main?.temp ?? 0),
      feels_like: Math.round(res?.feels_like ?? res?.main?.feels_like ?? 0),
      humidity: Math.round(res?.humidity ?? res?.main?.humidity ?? 0),
      wind: Math.round(res?.wind ?? res?.wind?.speed ?? 0),
      icon: res?.icon || res?.weather?.[0]?.main || undefined
    };
  }

  private mapForecast(res: any): ForecastDay[] {
    // Accepts either a 'daily' array or a generic 'list' with dt, main, weather
    const days: ForecastDay[] = [];
    const source = Array.isArray(res?.daily) ? res.daily : Array.isArray(res?.list) ? res.list : [];
    for (const item of source.slice(0, 7)) {
      const date = new Date((item.dt || item.dt_txt || Date.now()) * (item.dt ? 1000 : 1));
      const day = date.toLocaleDateString(undefined, { weekday: 'short' });
      const min = Math.round(item?.temp?.min ?? item?.main?.temp_min ?? item?.temp_min ?? 0);
      const max = Math.round(item?.temp?.max ?? item?.main?.temp_max ?? item?.temp_max ?? 0);
      const description = item?.weather?.[0]?.description || 'N/A';
      const humidity = Math.round(item?.humidity ?? item?.main?.humidity ?? 0);
      const wind = Math.round(item?.wind_speed ?? item?.wind?.speed ?? 0);
      const icon = item?.weather?.[0]?.main || undefined;
      days.push({ day, min, max, description, humidity, wind, icon });
    }
    return days;
  }

  // PUBLIC_INTERFACE
  async searchCity(city: string): Promise<WeatherResult | null> {
    /**
     * Query backend for current weather by city. Falls back to mock if backend not available.
     */
    try {
      const params = new HttpParams().set('q', city);
      const url = '/api/weather';
      const res: any = await firstValueFrom(this.http.get(url, { params }));
      if (!res) return null;
      return this.mapCurrent(res, city);
    } catch {
      // Mock fallback for dev/demo
      return {
        city,
        description: 'clear sky',
        temp: 22,
        feels_like: 21,
        humidity: 55,
        wind: 3,
        icon: 'sun'
      };
    }
  }

  // PUBLIC_INTERFACE
  async getForecastByCity(city: string): Promise<ForecastDay[]> {
    /** Get forecast by city, return 5-7 day forecast. Uses mock on failure. */
    try {
      const params = new HttpParams().set('q', city);
      const url = '/api/weather/forecast';
      const res: any = await firstValueFrom(this.http.get(url, { params }));
      return this.mapForecast(res);
    } catch {
      // Mock forecast
      return this.mockForecast();
    }
  }

  // PUBLIC_INTERFACE
  async getCurrentByCoords(lat: number, lon: number): Promise<WeatherResult> {
    /** Get current weather by coordinates. */
    try {
      const params = new HttpParams().set('lat', lat).set('lon', lon);
      const url = '/api/weather/current';
      const res: any = await firstValueFrom(this.http.get(url, { params }));
      return this.mapCurrent(res, res?.name);
    } catch {
      return {
        city: 'My Location',
        description: 'partly cloudy',
        temp: 20,
        feels_like: 20,
        humidity: 60,
        wind: 2,
        icon: 'cloud'
      };
    }
  }

  // PUBLIC_INTERFACE
  async getForecastByCoords(lat: number, lon: number): Promise<ForecastDay[]> {
    /** Get forecast by coordinates. */
    try {
      const params = new HttpParams().set('lat', lat).set('lon', lon);
      const url = '/api/weather/forecast';
      const res: any = await firstValueFrom(this.http.get(url, { params }));
      return this.mapForecast(res);
    } catch {
      return this.mockForecast();
    }
  }

  private mockForecast(): ForecastDay[] {
    const base = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    return Array.from({ length: 5 }).map((_, i) => {
      const day = base[(today + i + 1) % 7];
      const max = 22 + (i % 3);
      const min = max - 6;
      const icon = i % 3 === 0 ? 'sun' : i % 3 === 1 ? 'cloud' : 'rain';
      const description = icon === 'sun' ? 'clear sky' : icon === 'cloud' ? 'cloudy' : 'light rain';
      return { day, min, max, description, humidity: 55 + i, wind: 2 + i, icon };
    });
  }

  constructor(private http: HttpClient) {}
}
