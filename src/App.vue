<template>
  <div id="app" class="app">
    <adyn-location-dashboard class="app-content"></adyn-location-dashboard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdynLocationDashboard from '@/components/AdynLocationDashboard.vue';

@Component({
  components: {
    AdynLocationDashboard
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import 'assets/styles/index';
</style>
