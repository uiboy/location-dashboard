import { injectable } from 'inversify';
import IFlightService from '@/services/flights/IFlightService';
import flightIndicationFactory from '@/models/FlightIndication/FlightIndicationFactory';

@injectable()
export default class FlightService implements IFlightService {
  constructor() {}

  async getAverageFlightIndicationsForUser() {
    const response = {
      data: [{
        "cityName": "Amsterdam",
        "cityCode": 249758,
        "cityImageUrl": "amsterdam.png",
        "flightCostIndication": "MODERATE",
        "flightCostIndicationText": "Moderate (€120-€250)"
      }]
    };
    const indications = response.data.map(indicationData => flightIndicationFactory.make(indicationData));
    return indications;
  }
}
