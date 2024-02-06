<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton
      color="white"
      label="Opções"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
  <div>
    <UModal v-model="isOpenDelete">
      <div class="p-4">
        <div class="h-48">
          <h1 class="text-2xl font-bold">Remover</h1>
          <p class="text-gray-500">Tem certeza que deseja remover este item?</p>
        </div>
        <div class="flex justify-end mt-4">
          <UButton
            color="white"
            label="Cancelar"
            class="mr-2"
            @click="isOpenDelete = false"
          />
          <UButton @click="confirmDeleteCabin" color="red" label="Remover" />
        </div>
      </div>
    </UModal>
    <UModal v-model="isOpenUpdate">
      <div class="p-4">
        <div class="h-64">
          <h1 class="text-2xl font-bold">Editar</h1>

          <UInput
            v-model="store.state.maxCapacity"
            type="number"
            placeholder="Capacidade"
            class="mt-4"
          />
          <UInput
            v-model="store.state.discount"
            type="number"
            placeholder="Desconto"
            class="mt-4"
          />
          <UInput
            v-model="store.state.regularPrice"
            type="number"
            placeholder="Valor da Diária"
            class="mt-4"
          />
        </div>
        <div class="flex justify-end mt-4">
          <UButton
            color="white"
            label="Cancelar"
            class="mr-2"
            @click="isOpenUpdate = false"
          />
          <UButton @click="confirmUpdateCabin" label="Editar" />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpenDelete = ref(false);
const isOpenUpdate = ref(false);
const emit = defineEmits(["delete", "update"]);
const { state } = useCabinStore();
import { useCabinStore } from "~/store/cabins";
const store = useCabinStore();
const supabase = useSupabaseClient();
const items = [
  [
    {
      label: "Editar",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        isOpenUpdate.value = true;
      },
    },
    {
      label: "Remover",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["D"],
      click: () => {
        isOpenDelete.value = true;
      },
    },
  ],
];

const confirmDeleteCabin = () => {
  emit("delete");
  isOpenDelete.value = false;
};

const confirmUpdateCabin = async () => {
  emit("update");
  isOpenUpdate.value = false;
};
</script>
