import { DataModel } from '@/models/DataModel';
import { IFlightIndication } from '@/models/FlightIndication/IFlightIndication';
import FlightIndicationData from '@/types/models/FlightIndicationData';
import FlightCostIndicationType from '@/models/FlightIndication/FlightIndicationType';

export default class FlightIndication extends DataModel implements IFlightIndication {
  cityName: string;
  cityCode: number;
  cityImageUrl: string;
  flightCostIndication: FlightCostIndicationType;
  flightCostIndicationText: string;

  constructor(data: FlightIndicationData) {
    super(data);
    this.cityName = data.cityName;
    this.cityCode = data.cityCode;
    this.cityImageUrl = data.cityImageUrl;
    this.flightCostIndication = FlightCostIndicationType.parse(data.flightCostIndication);
    this.flightCostIndicationText = data.flightCostIndicationText;
  }
}
