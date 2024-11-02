import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { WidgetService } from './widget.service';
import { OpenWeatherCurrentWeather } from 'src/shared/models/open-weather-current-weather/current-weather.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent implements OnInit {
  readonly #widget = inject(WidgetService);
  readonly data = this.#widget.widgetData;

  readonly widgetData = input.required<OpenWeatherCurrentWeather>();

  ngOnInit(): void {
    this.#widget.getWidgetRandomCitiesDataOnInit();
    this.#widget.getWidgetDataInSequence();
  }
}
