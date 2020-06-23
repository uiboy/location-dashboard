<template>
  <h3>
    Flight costs to this city from your location :
    <span v-if="city.flightCostIndication == flightIndicationEconomical" class="flight-cost-economical">
      {{ city.flightCostIndicationText }}
    </span>
    <span v-if="city.flightCostIndication == flightIndicationModerate" class="flight-cost-moderate">
      {{ city.flightCostIndicationText }}
    </span>
    <span v-if="city.flightCostIndication == flightIndicationExpensive" class="flight-cost-expensive">
      {{ city.flightCostIndicationText }}
    </span>
  </h3>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CityData from './types/CityData';
import FlightCostIndicationType from '@/models/FlightIndication/FlightIndicationType';

@Component({})
export default class AdynFlightIndication extends Vue {
  private readonly flightIndicationEconomical = FlightCostIndicationType.economical;
  private readonly flightIndicationModerate = FlightCostIndicationType.moderate;
  private readonly flightIndicationExpensive = FlightCostIndicationType.expensive;
  @Prop({
    required: true
  })
  city: CityData;
}
</script>
<style scoped lang="scss">
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
