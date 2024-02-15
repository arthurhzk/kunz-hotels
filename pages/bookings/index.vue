<template>
  <div class="flex flex-col gap-2 mb-4 md:w-1/4">
    <USelect :options="transactionViewOptions" v-model="selectedView" />
    <UInput v-model="q" placeholder="Filtrar transações..." />
  </div>

  <UTable :rows="filteredRows"> </UTable>

  <div
    class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="bookings.length"
    >
    </UPagination>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useFetchBookings from "~/composables/useFetchBookings";

const { fetchBookings, bookings } = useFetchBookings();
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

const q = ref("");

const page = ref(1);
const pageCount = 5;
const rows = computed(() => {
  const start = (page.value - 1) * pageCount;
  const end = page.value * pageCount;
  return bookings.value.slice(start, end);
});

const filteredRows = computed(() => {
  if (!q.value) {
    return rows.value;
  }

  return bookings.value.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>
