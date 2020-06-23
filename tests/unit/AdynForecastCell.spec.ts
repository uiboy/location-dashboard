import { shallowMount } from '@vue/test-utils';
import dailyForecastFactory from '@/models/DailyForecast/DailyForecastFactory';
// @ts-ignore
import AdynForecastCell from '@/components/location-dashboard/AdynForecastCell.vue';

describe('AdynForecastCell.vue', () => {
  let dailyForecastMockData = [];
  let expectedMaxTemperature = 22.5;
  let expectedMinTemperature = 15.9;
  let expectedMinTemperatureText = '15.9 °C';
  let expectedMaxTemperatureText = '22.5 °C';

  let initializeMockData = () => {
    const data = [
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

    dailyForecastMockData = data.map(forecastData =>
      dailyForecastFactory.make(forecastData)
    );
  };

  initializeMockData();

  it('AdynForecastCell initialises with correct properties', () => {
    const wrapper = shallowMount(AdynForecastCell, {
      propsData: {
        dailyForecast: dailyForecastMockData[0] //forecast cell expects single days forecast
      }
    });
    expect((wrapper.vm as any).dailyForecast.temperature.maximum.Value).toBe(expectedMaxTemperature);
    expect((wrapper.vm as any).dailyForecast.temperature.minimum.Value).toBe(expectedMinTemperature);
  });

  it('AdynForecastCell returns correct temperature text', () => {
    const wrapper = shallowMount(AdynForecastCell, {
      propsData: {
        dailyForecast: dailyForecastMockData[0] //forecast cell expects single days forecast
      }
    });
    let forecastComponent = (wrapper.vm as any);
    expect(forecastComponent.getMinimumTemperatureText(forecastComponent.dailyForecast.temperature.minimum)).toBe(expectedMinTemperatureText);
    expect(forecastComponent.getMaximumTemperatureText(forecastComponent.dailyForecast.temperature.maximum)).toBe(expectedMaxTemperatureText);
  });
});
