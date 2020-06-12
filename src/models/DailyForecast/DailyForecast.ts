import { DataModel } from '@/models/DataModel';
import IDailyForecast from '@/models/DailyForecast/IDailyForecast';
import { DailyForecastData } from '@/types/models/DailyForecastData';
import temperatureFactory from '@/models/Temperature/TemperatureFactory';
import ITemperature from '@/models/Temperature/ITemperature';

/***
 * DailyForecast class represents each forecast day as returned by the AccuWeather Forecast API in
 * We extend from a generic DataModel class to allow for adding methods
 * common to all models.
 */
export default class DailyForecast extends DataModel implements IDailyForecast {
  temperature: ITemperature;
  date!: Date;

  constructor(data: DailyForecastData) {
    super(data);
    if (!data.Temperature) throw new Error('Temperature attribute is required');
    if (!data.Date) throw new Error('Date attribute is required');
    this.temperature = temperatureFactory.make(data.Temperature);
    this.date = new Date(data.Date);
  }
}
