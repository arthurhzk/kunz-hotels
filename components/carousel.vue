<script setup lang="ts">
const props = defineProps({
  image: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="props.image"
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
    indicators
    class="rounded-lg overflow-hidden mb-4"
  >
    <img :src="item" class="w-full" draggable="false" />
  </UCarousel>
</template>
