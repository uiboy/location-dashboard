import ModelData from '@/types/models/ModelData';

export interface TemperatureData extends ModelData {
  Minimum: IMinimumTemperatureData;
  Maximum: IMaxmimumTemperatureData
}

export interface IMinimumTemperatureData {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface IMaxmimumTemperatureData {
  Value: number;
  Unit: string;
  UnitType: number;
}
