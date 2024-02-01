<template>
  <section>
    <h1 class="text-center text-2xl my-8">Dashboard</h1>
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-center gap-4"
    >
      <div v-for="card in cardInfo">
        <Card
          :title="card.title"
          :icon="card.icon"
          :color="card.color"
          :amount="card.amount"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
    amount: 5,
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
