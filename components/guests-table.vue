<template>
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

      <tbody v-for="guest in guests">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useFetchGuests from "~/composables/useFetchGuests";
import useFetchBookings from "~/composables/useFetchBookings";
const { guests, fetchGuests } = useFetchGuests();
const { bookings, fetchBookings } = useFetchBookings();
onMounted(() => {
  fetchGuests();
});

const columns = [
  { id: "cabinId", name: "Nome Completo" },
  { id: "capacity", name: "País" },
  { id: "", name: "" },
  { id: "discount", name: "Email" },
];
</script>
