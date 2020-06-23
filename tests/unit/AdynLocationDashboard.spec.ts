import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
// @ts-ignore
import AdynLocationDashboard from '@/components/AdynLocationDashboard.vue';
import WeatherService from '@/services/weather/WeatherService';
import FlightService from '@/services/flights/FlightService';
import DailyForecast from '@/models/DailyForecast/DailyForecast';
import FlightIndicationType from '@/models/FlightIndication/FlightIndicationType';
import Buefy from 'buefy';

const localVue = createLocalVue();
Vue.use(Buefy);

jest.mock('@/services/weather/WeatherService');
jest.mock('@/services/flights/FlightService');

describe('AdynLocationDashboard.vue', () => {

  it('Component initialises with correct default useMetricSystem property', () => {
    const wrapper = shallowMount(AdynLocationDashboard);
    expect((wrapper.vm as any).useMetricSystem).toBeTruthy();
  });

  it('Fetches async flight and forecast data with correct types', async (done) => {
    const wrapper = shallowMount(AdynLocationDashboard, {
      data() {
        return {
          weatherService: new WeatherService(),
          flightService: new FlightService(),
          useMetricSystem: true
        }
      }
    });

    setTimeout(() => {
      expect((wrapper.vm as any).citiesData[0].forecastData[0] instanceof DailyForecast).toBeTruthy();
      expect((wrapper.vm as any).citiesData[0].flightCostIndication instanceof FlightIndicationType).toBeTruthy();
      done();
    }, 0);
  });

  it('Fetches async flight and forecast data and sets the correct merged cities data', async (done) => {
    const wrapper = shallowMount(AdynLocationDashboard, {
      data() {
        return {
          weatherService: new WeatherService(),
          flightService: new FlightService()
        }
      }
    });
    const mockFlightService = new FlightService();
    const mockWeatherService = new WeatherService();
    const citiesData = await mockFlightService.getAverageFlightIndicationsForUser();
    let forecastDataPromises = [];
    citiesData.forEach(city => {
      forecastDataPromises.push(mockWeatherService.getFiveDayForecastForCity(city.cityCode, true));
    });
    const allCitiesForecastDataArrays = await Promise.all(forecastDataPromises);
    citiesData.forEach((city, index) => (city.forecastData = allCitiesForecastDataArrays[index]));

    setTimeout(() => {
      expect((wrapper.vm as any).citiesData[0].forecastData.toString()).toMatch(citiesData[0].forecastData.toString());
      expect((wrapper.vm as any).citiesData[0].cityCode).toBe(citiesData[0].cityCode);
      expect((wrapper.vm as any).citiesData[0].cityName).toMatch(citiesData[0].cityName);
      expect((wrapper.vm as any).citiesData[0].cityImageUrl).toMatch(citiesData[0].cityImageUrl);
      expect((wrapper.vm as any).citiesData[0].flightCostIndication.toString()).toMatch(citiesData[0].flightCostIndication.toString());
      expect((wrapper.vm as any).citiesData[0].flightCostIndicationText).toMatch(citiesData[0].flightCostIndicationText);
      done();
    }, 0);
  });
});
