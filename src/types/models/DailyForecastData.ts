import ModelData from '@/types/models/ModelData';
import { TemperatureData } from '@/types/models/TemperatureData';

export interface DailyForecastData extends ModelData {
  Date: Date;
  Temperature: TemperatureData
}
