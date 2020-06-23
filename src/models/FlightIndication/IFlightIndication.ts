import IDataModel from '@/models/IDataModel';
import FlightCostIndicationType from '@/models/FlightIndication/FlightIndicationType';

export interface IFlightIndication extends IDataModel {
  cityName: string;
  cityCode: number;
  cityImageUrl: string;
  flightCostIndication: FlightCostIndicationType;
  flightCostIndicationText: string;
}
