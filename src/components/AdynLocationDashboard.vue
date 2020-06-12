<template>
  <div>
    <h1>Welcome {{ employeeName }}!</h1>
    <h3>Where would you like to work next?</h3>
    <div class="cities-container">
      <b-collapse v-for="city in citiesData" :key="city.cityCode" :open="false" aria-id="city.cityCode">
        <div class="city-container" slot="trigger" :aria-controls="city.cityCode">
          <img class="city-container__thumbnail" :alt="city.cityName" :src="getImgUrl(city.cityImageUrl)" />
          <h1 class="city-container__name">{{ city.cityName }}</h1>
        </div>
        <div class="notification">
          <div class="content">
            <h3>
              Forecast for the next 5 days
            </h3>
            <div class="forecast-container">
              <div class="forecast-cell" v-for="day in city.forecastData" :key="day.temperature.maximum.Value">
                <p>
                  <span>High </span
                  ><span class="forecast-cell__temperature">{{ getMaximumTemperature(day.temperature.maximum) }}</span>
                </p>
                <p>
                  <span>Low </span
                  ><span class="forecast-cell__temperature">{{ getMinimumTemperature(day.temperature.minimum) }}</span>
                </p>
              </div>
            </div>
            <h3>
              Flight costs to this city from your location :
              <span v-if="city.flightCostIndication == 'ECONOMICAL'" class="flight-cost-economical">
                {{ city.flightCostIndicationText }}
              </span>
              <span v-if="city.flightCostIndication == 'MODERATE'" class="flight-cost-moderate">
                {{ city.flightCostIndicationText }}
              </span>
              <span v-if="city.flightCostIndication == 'EXPENSIVE'" class="flight-cost-expensive">
                {{ city.flightCostIndicationText }}
              </span>
            </h3>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IWeatherService from '@/services/weather/IWeatherService';
import { TYPES } from '@/types/Inversify';
import { appContainer } from '@/InversifyContainer';
import DailyForecast from '@/models/DailyForecast/DailyForecast';
import { IMaxmimumTemperatureData, IMinimumTemperatureData } from '@/types/models/TemperatureData';

@Component({})
export default class AdynLocationDashboard extends Vue {
  private weatherService: IWeatherService = appContainer.get<IWeatherService>(TYPES.WeatherService);
  private employeeName = 'Jamie';
  private isRequestInProgress = false;
  private errorMessage = '';
  private useMetricSystem = true;
  private citiesData = [
    {
      cityName: 'Amsterdam',
      cityCode: 249758,
      cityImageUrl: 'amsterdam.png',
      flightCostIndication: 'MODERATE',
      flightCostIndicationText: 'Moderate (€120-€250)',
      forecastData: []
    },
    {
      cityName: 'Madrid',
      cityCode: 308526,
      cityImageUrl: 'madrid.png',
      flightCostIndication: 'EXPENSIVE',
      flightCostIndicationText: 'Expensive (€250-€500)',
      forecastData: []
    },
    {
      cityName: 'Budapest',
      cityCode: 187423,
      cityImageUrl: 'budapest.png',
      flightCostIndication: 'ECONOMICAL',
      flightCostIndicationText: 'Economical (€80-€120)',
      forecastData: []
    }
  ];

  mounted() {
    this.initialiseData();
  }

  getImgUrl(imageUrl) {
    return require('@/assets/' + imageUrl);
  }

  getMinimumTemperature(temperature: IMinimumTemperatureData) {
    if (temperature.Unit == 'C') {
      return `${temperature.Value} °C`;
    } else {
      return `${temperature.Value} °F`;
    }
  }

  getMaximumTemperature(temperature: IMaxmimumTemperatureData) {
    if (temperature.Unit == 'C') {
      return `${temperature.Value} °C`;
    } else {
      return `${temperature.Value} °F`;
    }
  }

  async fetchAndPopulateForecastData(forecastDataPromises: Promise<DailyForecast[]>[]) {
    this.isRequestInProgress = true;
    try {
      const allCitiesForecastDataArrays = await Promise.all(forecastDataPromises);
      this.citiesData.forEach((city, index) => (city.forecastData = allCitiesForecastDataArrays[index]));
    } catch (error) {
      this.errorMessage = 'There was an error getting forecast data';
    } finally {
      this.isRequestInProgress = false;
    }
  }

  async initialiseData() {
    const forecastDataPromises = [];
    this.citiesData.forEach(city => {
      forecastDataPromises.push(this.weatherService.getFiveDayForecastForCity(city.cityCode, this.useMetricSystem));
    });
    this.fetchAndPopulateForecastData(forecastDataPromises);
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/styles/_mixins';

h1 {
  font-size: 48px;
  @include for-size(phone-only) {
    font-size: 30px;
    align-self: center;
  }
}

h3 {
  font-size: 30px;
  @include for-size(phone-only) {
    font-size: 20px;
    align-self: center;
  }
}
h1,
h3 {
  color: $primary-color;
  font-weight: bold;
}

.cities-container {
  box-sizing: border-box;
  margin-top: 5%;
}

.collapse {
  box-sizing: border-box;
  border: 2px solid $primary-background-color;

  &:hover {
    border: 2px solid $primary-text-color;
    border-radius: 10px;

    @include for-size(phone-only) {
      border: 2px solid $primary-background-color;
      border-radius: 0;
    }
  }

  .notification {
    border-radius: 10px;
    @include for-size(phone-only) {
      border-radius: 0;
    }
  }
}

.city-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2% 0;
  margin: 1% 0;
  box-sizing: border-box;

  &__name {
    color: $primary-text-color;
  }

  &__thumbnail {
    height: 100px;
    width: 100px;
    margin: 0 5% 0 1%;
  }
}
.forecast-container {
  display: flex;

  .forecast-cell {
    padding: 10px;

    &__temperature {
      font-size: 30px;
      @include for-size(phone-only) {
        font-size: 20px;
      }
    }
  }
}

.flight-cost-economical {
  color: $green;
}
.flight-cost-moderate {
  color: $yellow;
}
.flight-cost-expensive {
  color: $red;
}
</style>
