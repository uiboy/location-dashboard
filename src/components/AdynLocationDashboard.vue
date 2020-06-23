<template>
  <div>
    <h1>Welcome {{ employeeName }} 👋</h1>
    <h3>Where would you like to work next?</h3>
    <div class="cities-container" v-if="!isRequestInProgress">
      <div v-if="errorMessage" class="error-message-container">
        <h3>Oops 😬 There was an error fetching data. Please try again later.</h3>
      </div>
      <div v-else>
        <b-collapse v-for="city in citiesData" :key="city.cityCode" :open="false" aria-id="city.cityCode">
          <div class="city-container" slot="trigger" :aria-controls="city.cityCode">
            <adyn-image class="city-container__thumbnail" :alt="city.cityName" :src="city.cityImageUrl"></adyn-image>
            <h1 class="city-container__name">{{ city.cityName }}</h1>
          </div>
          <div class="notification">
            <div class="content">
              <h3>
                Forecast for the next 5 days
              </h3>
              <div class="forecast-container">
                <adyn-forecast-cell
                  v-for="(dailyForecast, index) in city.forecastData"
                  :key="index"
                  :daily-forecast="dailyForecast"
                ></adyn-forecast-cell>
              </div>
              <adyn-flight-indication :city="city"></adyn-flight-indication>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
    <b-loading
      v-if="isRequestInProgress"
      :is-full-page="true"
      :active.sync="isRequestInProgress"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IWeatherService from '@/services/weather/IWeatherService';
import { TYPES } from '@/types/Inversify';
import { appContainer } from '@/InversifyContainer';
import DailyForecast from '@/models/DailyForecast/DailyForecast';
import AdynForecastCell from '@/components/location-dashboard/AdynForecastCell.vue';
import IFlightService from '@/services/flights/IFlightService';
import CityData from '@/components/location-dashboard/types/CityData';
import AdynFlightIndication from '@/components/location-dashboard/AdynFlightIndication.vue';
import AdynImage from '@/components/global/AdynImage.vue';

@Component({
  components: { AdynImage, AdynFlightIndication, AdynForecastCell }
})
export default class AdynLocationDashboard extends Vue {
  private weatherService: IWeatherService = appContainer.get<IWeatherService>(TYPES.WeatherService);
  private flightService: IFlightService = appContainer.get<IFlightService>(TYPES.FlightService);
  private employeeName = 'Jamie';
  private isRequestInProgress = false;
  private errorMessage = '';
  private useMetricSystem = true;
  private citiesData: CityData[] = [];

  mounted() {
    this.initialiseData();
  }

  async fetchAndPopulateForecastData(forecastDataPromises: Promise<DailyForecast[]>[]) {
    const allCitiesForecastDataArrays = await Promise.all(forecastDataPromises);
    this.citiesData.forEach((city, index) => (city.forecastData = allCitiesForecastDataArrays[index]));
  }

  async initialiseData() {
    const forecastDataPromises = [];
    this.isRequestInProgress = true;
    try {
      this.citiesData = await this.flightService.getAverageFlightIndicationsForUser();
      this.citiesData.forEach(city => {
        forecastDataPromises.push(this.weatherService.getFiveDayForecastForCity(city.cityCode, this.useMetricSystem));
      });
      await this.fetchAndPopulateForecastData(forecastDataPromises);
    } catch (error) {
      this.errorMessage = 'There was an error fetching data';
    } finally {
      this.isRequestInProgress = false;
    }
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
    text-align: center;
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
    .content {
      color: $primary-text-color;
      h3 {
        color: $primary-text-color;
      }
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
}

.error-message-container {
  h3 {
    color: $red;
  }
}
</style>
