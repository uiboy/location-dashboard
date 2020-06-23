<template>
  <img :alt="alt" :src="getImageUrl(src)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AdynImage extends Vue {
  @Prop({
    required: true
  })
  alt: string;
  @Prop({
    required: true
  })
  src: string;

  getImageUrl(imageUrl: string) {
    return require('@/assets/' + imageUrl);
  }
}
</script>
