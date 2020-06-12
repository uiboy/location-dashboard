import DailyForecast from '@/models/DailyForecast/DailyForecast';

export default interface IWeatherService {
  getFiveDayForecastForCity(cityCode: number, useMetricSystem: boolean): Promise<DailyForecast[]>
}
