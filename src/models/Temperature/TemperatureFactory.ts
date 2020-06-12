import { IModelFactory } from '@/models/IModelFactory';
import { TemperatureData } from '@/types/models/TemperatureData';
import ITemperature from '@/models/Temperature/ITemperature';
import Temperature from '@/models/Temperature/Temperature';

class TemperatureFactory extends IModelFactory<ITemperature> {
  make(data: TemperatureData): ITemperature {
    return new Temperature(data);
  }
}
const temperatureFactory = new TemperatureFactory();

export default temperatureFactory;
