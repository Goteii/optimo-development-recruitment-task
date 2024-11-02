import { inject, Injectable, signal } from '@angular/core';
import { CITIES } from './const/cities.const';
import { OpenWeatherApiService } from 'src/api/open-weather/open-weather.service';
import { City } from './models/city.model';
import { CITY_COUNT } from './const/city-count.const';
import { OpenWeatherCurrentWeather } from 'src/shared/models/open-weather-current-weather/current-weather.model';
import {
  concat,
  concatMap,
  delay,
  interval,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { Group } from 'src/shared/models/group/group.model';
import { INTERVAL } from './const/interval.const';
import { RETRY_COUNT_BEFORE_REFRESH } from './const/retry-count-before-new-data';
import { URL_ON_CLICK } from './const/url-on-click';
import { getWeatherIcon } from './utils/get-weather-icon';
import { WidgetData } from './models/widget-data.model';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  readonly #api = inject(OpenWeatherApiService);

  readonly currentCityGroup = signal<string>('');
  readonly widgetData = signal<WidgetData[]>([]);

  readonly #cities = CITIES;
  readonly #cityCount = CITY_COUNT;
  readonly #interval = INTERVAL;
  readonly #retryCount = RETRY_COUNT_BEFORE_REFRESH;
  readonly #urlOnClick = URL_ON_CLICK;

  subscription$!: Subscription;

  getWidgetDataInSequence(): void {
    this.subscription$ = this.startRequestSequence().subscribe({
      next: (response) => {
        console.log(response.list);
        this.setWidgetData(response.list);
      },
      error: (error) => {
        throw new Error(
          'Error occurred in getWidgetDataInSequence method:' + error.message
        );
      },
      complete: () => {
        this.getWidgetDataInSequence();
      },
    });
  }

  getWidgetRandomCitiesData(): Observable<Group<OpenWeatherCurrentWeather>> {
    const selectedCitiesIds = this.getRandomCitiesGroup(this.#cities);
    this.setCurrentCityGroup(selectedCitiesIds);

    return this.#api.getData(selectedCitiesIds);
  }

  getRequiredData(data: OpenWeatherCurrentWeather[]): WidgetData[] {
    return data.map((obj) => ({
      name: obj.name,
      urlOnClick: this.#urlOnClick + obj.id,
      country: obj.sys.country,
      weatherDescription: obj.weather[0].description,
      weatherIcon: getWeatherIcon(obj.weather[0].icon),
      temperature: Math.round(obj.main.temp),
    }));
  }

  private startRequestSequence(): Observable<Group<OpenWeatherCurrentWeather>> {
    return concat(
      interval(this.#interval).pipe(
        take(this.#retryCount),
        concatMap(() => this.getWidgetRefreshedData())
      ),
      of(null).pipe(
        switchMap(() => this.getWidgetRandomCitiesData()),
        delay(this.#interval)
      )
    );
  }

  private getWidgetRefreshedData(): Observable<
    Group<OpenWeatherCurrentWeather>
  > {
    const ids = this.currentCityGroup();
    return this.#api.getData(ids);
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

  private setCurrentCityGroup(val: string): void {
    this.currentCityGroup.set(val);
  }

  private setWidgetData(data: OpenWeatherCurrentWeather[]): void {
    const widgetData = this.getRequiredData(data);
    this.widgetData.set(widgetData);
  }
}
