import { WEATHER_ICON_URL } from '../const/weather-icon-url';

export const getWeatherIcon = (iconCode: string): string => {
  return WEATHER_ICON_URL + iconCode + '.png';
};
