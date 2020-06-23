<template>
  <div class="forecast-cell">
    <p>
      <span>High </span
      ><span class="forecast-cell__temperature">{{ getMaximumTemperatureText(dailyForecast.temperature.maximum) }}</span>
    </p>
    <p>
      <span>Low </span
      ><span class="forecast-cell__temperature">{{ getMinimumTemperatureText(dailyForecast.temperature.minimum) }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMaxmimumTemperatureData, IMinimumTemperatureData } from '@/types/models/TemperatureData';
import DailyForecast from '@/models/DailyForecast/DailyForecast';

@Component({})
export default class AdynForecastCell extends Vue {
  @Prop({
    type: DailyForecast,
    required: true
  })
  dailyForecast: DailyForecast;
  getMinimumTemperatureText(minTemperature: IMinimumTemperatureData) {
    if (minTemperature.Unit == 'C') {
      return `${minTemperature.Value} °C`;
    } else {
      return `${minTemperature.Value} °F`;
    }
  }

  getMaximumTemperatureText(maxTemperature: IMaxmimumTemperatureData) {
    if (maxTemperature.Unit == 'C') {
      return `${maxTemperature.Value} °C`;
    } else {
      return `${maxTemperature.Value} °F`;
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/styles/_mixins';
.forecast-cell {
  padding: 10px;

  &__temperature {
    font-size: 30px;
    @include for-size(phone-only) {
      font-size: 20px;
    }
  }
}
</style>
