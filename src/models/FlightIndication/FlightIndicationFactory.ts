import { IModelFactory } from '@/models/IModelFactory';
import { IFlightIndication } from '@/models/FlightIndication/IFlightIndication';
import FlightIndicationData from '@/types/models/FlightIndicationData';
import FlightIndication from '@/models/FlightIndication/FlightIndication';

class FlightIndicationFactory extends IModelFactory<IFlightIndication> {
  make(data: FlightIndicationData): IFlightIndication {
    return new FlightIndication(data);
  }
}
const flightIndicationFactory = new FlightIndicationFactory();

export default flightIndicationFactory;
