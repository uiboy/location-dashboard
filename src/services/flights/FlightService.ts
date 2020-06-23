import { inject, injectable } from 'inversify';
import IHttpService from '@/services/http/IHttpService';
import { TYPES } from '@/types/Inversify';
import IFlightService from '@/services/flights/IFlightService';
import flightIndicationFactory from '@/models/FlightIndication/FlightIndicationFactory';

@injectable()
export default class FlightService implements IFlightService {
  private FLIGHT_INDICATIONS_API_URL = '/flights/v1/indications';

  constructor(@inject(TYPES.HttpService) private httpService?: IHttpService) {}

  async getAverageFlightIndicationsForUser() {
    const response = await this.httpService.get(this.FLIGHT_INDICATIONS_API_URL);
    const indications = response.data.map(indicationData => flightIndicationFactory.make(indicationData));
    return indications;
  }
}
