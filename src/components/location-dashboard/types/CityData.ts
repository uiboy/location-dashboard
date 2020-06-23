import FlightIndicationType from '@/models/FlightIndication/FlightIndicationType';
import DailyForecast from '@/models/DailyForecast/DailyForecast';

export default interface CityData {
  cityName: string;
  cityCode: number;
  cityImageUrl: string;
  flightCostIndication: FlightIndicationType,
  flightCostIndicationText: string,
  forecastData: Array<DailyForecast>
}
