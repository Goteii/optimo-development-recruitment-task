import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT } from '../endpoints';
import { Observable } from 'rxjs';
import { OpenWeatherCurrentWeather } from 'src/shared/models/open-weather-current-weather/current-weather.model';

@Injectable({ providedIn: 'root' })
export class OpenWeatherApiService {
  readonly #http = inject(HttpClient);

  getData(): Observable<OpenWeatherCurrentWeather> {
    return this.#http.get<OpenWeatherCurrentWeather>(
      ENDPOINT.openWeatherCurrentWeather
    );
  }
}
