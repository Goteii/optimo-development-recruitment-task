import { inject, Injectable, signal } from '@angular/core';
import { CITIES } from './const/cities.const';
import { OpenWeatherApiService } from 'src/api/open-weather/open-weather.service';
import { City } from './models/city.model';
import { CITY_COUNT } from './const/city-count.const';
import { OpenWeatherCurrentWeather } from 'src/shared/models/open-weather-current-weather/current-weather.model';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  readonly #api = inject(OpenWeatherApiService);

  readonly #cities = CITIES;
  readonly #cityCount = CITY_COUNT;

  readonly currentCityGroup = signal<string>('');
  readonly widgetData = signal<OpenWeatherCurrentWeather[]>([]);

  getWidgetRandomCitiesData(): void {
    const selectedCitiesIds = this.getRandomCitiesGroup(this.#cities);
    this.setCurrentCityGroup(selectedCitiesIds);

    this.getWidgetData(selectedCitiesIds);
  }

  getWidgetRefreshedData(): void {
    const ids = this.currentCityGroup();
    this.getWidgetData(ids);
  }

  private getRandomCitiesGroup(arr: City[]): string {
    if (!arr.length) {
      throw new Error('Provided array in getRandomCitiesGroup is empty');
    }
    const randomIndexes = this.getRandomCitiesIndexes(
      this.#cityCount,
      arr.length
    );

    return Array.from(randomIndexes)
      .map((idx) => arr[idx].id)
      .join(',');
  }

  private getRandomCitiesIndexes(count: number, arrLen: number): Set<number> {
    const randomIndexes: Set<number> = new Set();

    while (randomIndexes.size < count) {
      const randomIdx = this.getRandomIdx(arrLen);
      randomIndexes.add(randomIdx);
    }

    return randomIndexes;
  }

  private getRandomIdx(arrLen: number): number {
    return Math.floor(Math.random() * arrLen);
  }

  private getWidgetData(ids: string): void {
    this.#api.getData(ids).subscribe((data) => {
      this.setWidgetData(data.list);
    });
  }

  private setCurrentCityGroup(val: string): void {
    this.currentCityGroup.set(val);
  }

  private setWidgetData(data: OpenWeatherCurrentWeather[]): void {
    this.widgetData.set(data);
  }
}
