import IWeatherService from '@/services/weather/IWeatherService';
import { inject, injectable } from 'inversify';
import IHttpService from '@/services/http/IHttpService';
import { TYPES } from '@/types/Inversify';
import DailyForecast from '@/models/DailyForecast/DailyForecast';
import dailyForecastFactory from '@/models/DailyForecast/DailyForecastFactory';
import IEnvironmentService from '@/services/environment/IEnvironmentService';

@injectable()
export default class WeatherService implements IWeatherService {
  private WEATHER_FORECAST_API_URL = '/forecasts/v1/daily/5day';

  constructor(
    @inject(TYPES.HttpService) private httpService?: IHttpService,
    @inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService
  ) {}

  async getFiveDayForecastForCity(cityCode: number, useMetricSystem: boolean) {
    const finalUrl = `${this.WEATHER_FORECAST_API_URL}/${cityCode}`;
    const queryParams = {
      metric: useMetricSystem,
      apikey: this.environmentService.weatherApiKey
    };
    const response = await this.httpService.get(finalUrl, {
      params: queryParams
    });
    const forecasts: DailyForecast[] = response.data['DailyForecasts'].map(dailyForecast =>
      dailyForecastFactory.make(dailyForecast)
    );
    return forecasts;
  }
}
