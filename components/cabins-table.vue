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

        <USelect v-model="searchValue" :options="searchBy" />
      </div>
    </div>

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
      <tbody v-if="isLoading">
        <tr>
          <td class="w-4 p-4"></td>
          <td class="px-6 py-4" colspan="4">
            <Spinner />
          </td>
        </tr>
      </tbody>
      <tbody v-else v-for="cabin in searchByValue">
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
              :src="cabin.image"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">{{ cabin.name }}</div>
            </div>
          </th>
          <td class="px-6 py-4">
            Capacidade para até {{ cabin.maxCapacity }} pessoas
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                class="h-2.5 w-2.5 rounded-full me-2"
                :class="{
                  'bg-green-500': cabin.discount > 0,
                  'bg-red-500': cabin.discount <= 0,
                }"
              ></div>
              {{ cabin.discount }}%
            </div>
          </td>
          <td class="px-6 py-4">R$ {{ cabin.regularPrice.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useFetchCabins from "~/composables/useFetchCabins";

const { cabins, fetchCabins, isLoading } = useFetchCabins();

onMounted(() => {
  fetchCabins();
});

const columns = [
  { id: "cabinId", name: "ID da cabana" },
  { id: "capacity", name: "Capacidade" },
  { id: "discount", name: "Desconto" },
  { id: "value", name: "Valor" },
];

const searchBy = [
  "Maior preço",
  "Menor preço",
  "Maior desconto",
  "Maior capacidade",
  "Menor capacidade",
];

const searchValue = ref(searchBy[0]);

const searchByValue = computed(() => {
  switch (searchValue.value) {
    case "Maior preço":
      return cabins.value.sort((a, b) => b.regularPrice - a.regularPrice);
    case "Menor preço":
      return cabins.value.sort((a, b) => a.regularPrice - b.regularPrice);
    case "Maior desconto":
      return cabins.value.sort((a, b) => b.discount - a.discount);
    case "Maior capacidade":
      return cabins.value.sort((a, b) => b.maxCapacity - a.maxCapacity);
    case "Menor capacidade":
      return cabins.value.sort((a, b) => a.maxCapacity - b.maxCapacity);
  }
});
</script>
