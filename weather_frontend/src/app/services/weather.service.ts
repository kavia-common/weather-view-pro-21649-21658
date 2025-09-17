import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface WeatherResult {
  city: string;
  description: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
}

@Injectable()
export class WeatherService {
  // PUBLIC_INTERFACE
  async searchCity(city: string): Promise<WeatherResult | null> {
    /**
     * This method queries the backend weather API for a given city and maps the result
     * to the WeatherResult interface. It returns null if no result is found.
     */
    const params = new HttpParams().set('q', city);
    const url = '/api/weather';
    const res: any = await firstValueFrom(this.http.get(url, { params }));

    // Map response to WeatherResult interface (adjust to backend contract)
    if (!res) return null;
    return {
      city: res.city || res.name || city,
      description: res.description || res.weather?.[0]?.description || 'N/A',
      temp: Math.round(res.temp ?? res.main?.temp ?? 0),
      feels_like: Math.round(res.feels_like ?? res.main?.feels_like ?? 0),
      humidity: Math.round(res.humidity ?? res.main?.humidity ?? 0),
      wind: Math.round(res.wind ?? res.wind?.speed ?? 0)
    };
  }

  constructor(private http: HttpClient) {}
}
