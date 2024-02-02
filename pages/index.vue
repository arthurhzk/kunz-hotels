<template>
  <section>
    <h1
      class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
    >
      Dashboard
    </h1>
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-center gap-4"
    >
      <div v-for="card in cardInfo">
        <Card
          :title="card.title"
          :icon="card.icon"
          :color="card.color"
          :amount="card.amount || 0"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useFetchCabins from "~/composables/useFetchCabins";
const { cabins, fetchCabins } = useFetchCabins();

const numberOfCabins = computed(() => cabins.value?.length);

onMounted(() => {
  fetchCabins();
});

const cardInfo = reactive([
  {
    title: "Agendamentos",
    icon: "i-heroicons-chart-bar",
    amount: 10,
    color: "bg-blue-500",
  },
  {
    title: "Cabanas",
    icon: "i-heroicons-command-line",
    amount: numberOfCabins,
    color: "bg-green-500",
  },
  {
    title: "Hóspedes",
    icon: "i-heroicons-command-line",
    amount: 20,
    color: "bg-yellow-500",
  },
  {
    title: "Configurações",
    icon: "i-heroicons-command-line",
    amount: 30,
    color: "bg-red-500",
  },
]);
</script>
