import ModelData from '@/types/models/ModelData';

export default interface FlightIndicationData extends ModelData {
  cityName: string;
  cityCode: number;
  cityImageUrl: string;
  flightCostIndication: string;
  flightCostIndicationText: string;
}
