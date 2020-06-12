import { DataModel } from '@/models/DataModel';
import ITemperature from '@/models/Temperature/ITemperature';
import { IMaxmimumTemperatureData, IMinimumTemperatureData, TemperatureData } from '@/types/models/TemperatureData';

export default class Temperature extends DataModel implements ITemperature {
  maximum: IMaxmimumTemperatureData;
  minimum: IMinimumTemperatureData;

  constructor(data: TemperatureData) {
    super(data);
    if (!data.Minimum) throw new Error('Minimum attribute is required');
    if (!data.Maximum) throw new Error('Maximum attribute is required');
    this.maximum = data.Maximum;
    this.minimum = data.Minimum;
  }
}
