import { IModelFactory } from '@/models/IModelFactory';
import { DailyForecastData } from '@/types/models/DailyForecastData';
import IDailyForecast from '@/models/DailyForecast/IDailyForecast';
import DailyForecast from '@/models/DailyForecast/DailyForecast';

class DailyForecastFactory extends IModelFactory<IDailyForecast> {
  make(data: DailyForecastData): IDailyForecast {
    return new DailyForecast(data);
  }
}
const dailyForecastFactory = new DailyForecastFactory();

export default dailyForecastFactory;
