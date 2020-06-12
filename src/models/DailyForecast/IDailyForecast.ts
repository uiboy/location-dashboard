import IDataModel from '@/models/IDataModel';
import ITemperature from '@/models/Temperature/ITemperature';

export default interface IDailyForecast extends IDataModel {
  date: Date;
  temperature: ITemperature
}
