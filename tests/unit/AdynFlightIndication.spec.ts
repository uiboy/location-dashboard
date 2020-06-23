import { shallowMount } from '@vue/test-utils';
import dailyForecastFactory from '@/models/DailyForecast/DailyForecastFactory';
// @ts-ignore
import AdynFlightIndication from '@/components/location-dashboard/AdynFlightIndication.vue';
import FlightIndicationType from '@/models/FlightIndication/FlightIndicationType';

describe('AdynFlightIndication.vue', () => {
  let dailyForecastMockData = [];
  let cityMockData = {};

  let initializeMockData = () => {
    const forecastData = [
      {
        "Date": "2020-06-18T07:00:00+02:00",
        "Temperature": {
          "Minimum": {
            "Value": 15.9,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 22.5,
            "Unit": "C",
            "UnitType": 17
          }
        }
      }
    ];

    dailyForecastMockData = forecastData.map(forecastData =>
      dailyForecastFactory.make(forecastData)
    );

    cityMockData = {
      cityName: 'Amsterdam',
      cityCode: 12345,
      cityImageUrl: 'mockimage.png',
      flightCostIndication: FlightIndicationType.moderate,
      flightCostIndicationText: 'Moderate (€150-250)',
      forecastData: dailyForecastMockData
    }
  };

  initializeMockData();

  it('AdynFlightIndication initialises with correct properties', () => {
    const wrapper = shallowMount(AdynFlightIndication, {
      propsData: {
        city: cityMockData
      }
    });
    expect((wrapper.vm as any).city.cityName).toBe('Amsterdam');
    expect((wrapper.vm as any).city.cityCode).toBe(12345);
    expect((wrapper.vm as any).city.cityImageUrl).toBe('mockimage.png');
    expect((wrapper.vm as any).city.flightCostIndication).toEqual(FlightIndicationType.moderate);
    expect((wrapper.vm as any).city.flightCostIndicationText).toBe('Moderate (€150-250)');
    expect((wrapper.vm as any).city.forecastData).toEqual(dailyForecastMockData);
  });
});
