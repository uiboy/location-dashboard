import IWeatherService from '@/services/weather/IWeatherService';
import { injectable } from 'inversify';
import DailyForecast from '@/models/DailyForecast/DailyForecast';
import dailyForecastFactory from '@/models/DailyForecast/DailyForecastFactory';

@injectable()
export default class WeatherService implements IWeatherService {

  constructor() {}

  async getFiveDayForecastForCity(cityCode: number, useMetricSystem: boolean) {
    const response = {
      data: {
        "DailyForecasts": [
          {
            "Date": "2020-06-18T07:00:00+02:00",
            "EpochDate": 1592456400,
            "Temperature": {
              "Minimum": {
                "Value": 15.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Maximum": {
                "Value": 22.5,
                "Unit": "C",
                "UnitType": 17
              }
            },
          }
        ]
      }
    };
    const forecasts: DailyForecast[] = response.data['DailyForecasts'].map(dailyForecast =>
      dailyForecastFactory.make(dailyForecast)
    );
    return forecasts;
  }
}
