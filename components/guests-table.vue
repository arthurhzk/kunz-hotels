<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
    >
      <div class="relative">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <UInput v-model="modifiedInput" />
      </div>
    </div>

    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr v-for="column in columns">
          <th scope="col" class="p-4"></th>
          <th scope="col" class="p-4"></th>
          <th :key="column.id" scope="col" class="px-6 py-3">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td class="w-4 p-4"></td>
          <td class="px-6 py-4" colspan="4">
            <Spinner />
          </td>
        </tr>
      </tbody>
      <tbody v-else v-for="guest in searchGuestByName">
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
          <td class="px-6 py-4">
            <div class="flex items-center">{{ guest.email }}</div>
          </td>
          <td class="px-6 py-4">{{ guest.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useFetchGuests from "~/composables/useFetchGuests";

const { guests, fetchGuests, isLoading } = useFetchGuests();

onMounted(() => {
  fetchGuests();
  console.log(guests);
});

const columns = [
  { id: "cabinId", name: "Bandeira" },
  { id: "capacity", name: "País" },
  { id: "discount", name: "Email" },
  { id: "value", name: "ID do cliente" },
];

const searchGuest = ref("");

const modifiedInput = computed({
  get: () => searchGuest.value,
  set: (value: string) => {
    const newValue = value.trim();
    searchGuest.value = newValue;
  },
});

const searchGuestByName = computed(() => {
  if (modifiedInput.value.length < 3) {
    return guests.value;
  } else {
    return guests.value.filter((guest: { fullName: string }) => {
      return guest.fullName
        .toLowerCase()
        .includes(searchGuest.value.toLowerCase());
    });
  }
});
</script>
