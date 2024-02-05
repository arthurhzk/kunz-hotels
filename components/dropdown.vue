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
  </div>
</template>

<script setup lang="ts">
const isOpenDelete = ref(false);
const emit = defineEmits(["delete"]);

const items = [
  [
    {
      label: "Editar",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        console.log("Edit");
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
</script>
