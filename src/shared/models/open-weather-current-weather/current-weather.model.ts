import { Cloud } from './cloud.model';
import { Coord } from './coord.model';
import { Main } from './main.model';
import { Rain } from './rain.model';
import { Sys } from './sys.model';
import { Weather } from './weather.model';
import { Wind } from './wind.model';

export interface OpenWeatherCurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Cloud;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
