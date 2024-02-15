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
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div
        class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
      ></div>

      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4"></th>
            <th
              v-for="column in columns"
              :key="column.id"
              scope="col"
              class="px-6 py-3"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody v-for="guest in filterFetchById">
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4"></td>
            <th
              scope="row"
              class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                class="w-10 h-10 rounded-full"
                :src="guest.countryFlag"
                alt="Jese image"
              />
              <div class="ps-3">
                <div class="text-base font-semibold">{{ guest.fullName }}</div>
              </div>
            </th>
            <td class="px-6 py-4">
              {{ guest.nationality }}
            </td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4">{{ guest.email }}</td>
            <td v-if="guest.numNights > 1" class="px-6 py-4">
              {{ guest.numGuests }} pessoas
            </td>
            <td v-else class="px-6 py-4">{{ guest.numGuests }} pessoa</td>
            <td v-if="guest.numNights > 1" class="px-6 py-4">
              {{ guest.numNights }} pessoas
            </td>
            <td v-else class="px-6 py-4">{{ guest.numNights }} pessoa</td>
            <td class="px-6 py-4">{{ guest.startDate }}</td>
            <td class="px-6 py-4">{{ guest.endDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import useFetchCabins from "~/composables/useFetchCabins";
import { ref, computed, reactive, onMounted, watch } from "vue";
import useFetchBookings from "~/composables/useFetchBookings";
import useFetchGuests from "~/composables/useFetchGuests";
const { fetchCabins } = useFetchCabins();
const { fetchGuests, guests } = useFetchGuests();
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
    icon: "i-heroicons-book-open",
    amount: bookingsLength,
    color: "bg-blue-500",
  },
  {
    title: "Hóspedes",
    icon: "i-heroicons-user",
    amount: numGuests,
    color: "bg-yellow-500",
  },
  {
    title: "Valor total",
    icon: "i-heroicons-currency-dollar",
    amount: totalPrice,
    color: "bg-green-500",
  },
]);

const transactionViewOptions = [
  "Anual",
  "Mensal",
  "Diário",
  "Próximos 7 dias",
  "Próximos 90 dias",
];
const columns = [
  { id: "cabinId", name: "Nome Completo" },
  { id: "capacity", name: "País" },
  { id: "", name: "" },
  { id: "discount", name: "Email" },
  { id: "numGuests", name: "Número de Hóspedes" },
  { id: "numNights", name: "Número de noites" },
  { id: "checkIn", name: "Check in" },
  { id: "checkOut", name: "Check out" },
];
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
    case "Próximos 7 dias":
      return {
        start: new Date(),
        end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      };
    case "Próximos 90 dias":
      return {
        start: new Date(),
        end: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
      };
  }
});

const filterFetchById = computed(() => {
  const bookingsId = bookings.value.map((booking) => booking.guestId);
  const guestsId = guests.value.filter((guest) =>
    bookingsId.includes(guest.id)
  );

  const glue = bookings.value.map((booking) => {
    const guest = guestsId.find((guest) => guest.id === booking.guestId);
    return {
      ...booking,
      ...guest,
    };
  });

  return glue;
});
onMounted(() => {
  fetchBookings(dateBounds.value.start, dateBounds.value.end);
  fetchCabins();
  fetchGuests();
});

watch(
  () => selectedView.value,
  (newVal, oldVal) => {
    fetchBookings(dateBounds.value.start, dateBounds.value.end);
  },
  {
    deep: true,
  }
);
watch(
  () => filterFetchById.value,
  (newVal, oldVal) => {}
);
</script>
