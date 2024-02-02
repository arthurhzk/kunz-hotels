<template>
  <section>
    <h1
      class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
    >
      Sumário
    </h1>

    <carousel :image="transformIntoArray" />

    <cabins-table />
  </section>
</template>

<script setup lang="ts">
import useFetchCabins from "~/composables/useFetchCabins";
const { cabins, fetchCabins } = useFetchCabins();

const transformIntoArray = computed(() => {
  const images = cabins.value.map((cabin) => cabin.image);
  return images;
});

onMounted(() => {
  fetchCabins();
});
</script>
