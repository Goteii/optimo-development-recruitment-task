import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT } from '../endpoints';
import { OpenWeatherCurrentWeather } from 'src/shared/models/open-weather-current-weather/current-weather.model';
import { Observable } from 'rxjs/internal/Observable';
import { Group } from 'src/shared/models/group/group.model';

@Injectable({ providedIn: 'root' })
export class OpenWeatherApiService {
  readonly #http = inject(HttpClient);

  getData(
    selectedCities: string
  ): Observable<Group<OpenWeatherCurrentWeather>> {
    const options = {
      params: new HttpParams().set('id', selectedCities).set('units', 'metric'),
    };
    return this.#http.get<Group<OpenWeatherCurrentWeather>>(
      ENDPOINT.openWeatherCurrentWeather,
      options
    );
  }
}
