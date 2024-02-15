<template>
  <section>
    <h1
      class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
    >
      Dashboard
    </h1>

    <USelect
      class="mx-auto mb-4 md:w-1/2"
      :options="transactionViewOptions"
      v-model="selectedView"
    />
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
    <div>
      <GuestsTable />
    </div>
  </section>
</template>

<script setup>
import useFetchCabins from "~/composables/useFetchCabins";
import { ref, computed, reactive, onMounted, watch } from "vue";
import useFetchBookings from "~/composables/useFetchBookings";

const { fetchCabins } = useFetchCabins();

const { fetchBookings, bookings } = useFetchBookings();
const bookingsLength = computed(() => bookings.value.length);
const numGuests = computed(() =>
  bookings.value.reduce((acc, booking) => acc + booking.numGuests, 0)
);
const totalPrice = computed(() =>
  bookings.value.reduce((acc, booking) => acc + booking.totalPrice, 0)
);
const cardInfo = reactive([
  {
    title: "Agendamentos",
    icon: "i-heroicons-chart-bar",
    amount: bookingsLength,
    color: "bg-blue-500",
  },
  {
    title: "Hóspedes",
    icon: "i-heroicons-command-line",
    amount: numGuests,
    color: "bg-yellow-500",
  },
  {
    title: "Valor total",
    icon: "i-heroicons-command-line",
    amount: totalPrice,
    color: "bg-red-500",
  },
]);

const transactionViewOptions = ["Anual", "Mensal", "Diário"];
const selectedView = ref(transactionViewOptions[1]);
const dateBounds = computed(() => {
  switch (selectedView.value) {
    case "Anual":
      return {
        start: new Date(new Date().getFullYear(), 0, 1),
        end: new Date(new Date().getFullYear(), 11, 31),
      };
    case "Mensal":
      return {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      };
    case "Diário":
      return {
        start: new Date(),
        end: new Date(),
      };
  }
});

onMounted(() => {
  fetchBookings(dateBounds.value.start, dateBounds.value.end);
  fetchCabins();
});

watch(
  () => {
    selectedView.value;
  },
  (newVal) => {
    fetchBookings(dateBounds.value.start, dateBounds.value.end);
  },
  {
    deep: true,
  }
);
</script>
