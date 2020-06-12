import IDataModel from '@/models/IDataModel';
import { IMaxmimumTemperatureData, IMinimumTemperatureData } from '@/types/models/TemperatureData';

export default interface ITemperature extends IDataModel {
  minimum: IMinimumTemperatureData;
  maximum: IMaxmimumTemperatureData;
}
