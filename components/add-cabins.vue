<template>
  <UForm :state="state" v-bind:schema="schema">
    <div>
      <UButton label="Adicionar Cabana" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <h1 class="p-4">Adicionar uma Cabana</h1>
        <div class="p-4 flex flex-col items-center gap-4">
          <UInput v-model="state.name" type="text" placeholder="ID da Cabana" />
          <UInput
            v-model="state.maxCapacity"
            type="number"
            placeholder="Capacidade"
          />
          <UInput
            v-model="state.discount"
            type="number"
            placeholder="Desconto"
          />
          <UInput
            v-model="state.regularPrice"
            type="number"
            placeholder="Valor da Diária"
          />
          <UButton @click="addCabin" type="submit" label="Adicionar " />
        </div>
      </UModal>
    </div>
  </UForm>
</template>

<script setup>
import { z } from "zod";
const { toastError, toastSuccess } = useAppToast();
const supabase = useSupabaseClient();
const isOpen = ref(false);
const schema = z.object({
  name: z.string(),
  capacity: z.number().min(1).max(6, "A capacidade máxima é de 6 pessoas"),
  discount: z.number().min(0).max(100, "O desconto máximo é de 100%"),
  dailyValue: z.number().min(0, "O valor da diária não pode ser negativo"),
});

const initialState = {
  id: undefined,
  name: "",
  maxCapacity: undefined,
  discount: undefined,
  regularPrice: undefined,
  image: "",
};
const state = ref({ ...initialState });
const addCabin = async () => {
  try {
    await supabase.from("cabins").upsert({ ...state.value });
    toastSuccess({
      title: "Cabana adicionada com sucesso",
    });
    toastSuccess;
    isOpen.value = false;
  } catch (error) {
    console.error("Error adding cabin", error);
    toastError({
      title: "Erro ao adicionar cabana",
    });
    isOpen.value = false;
    toastError;
  }
};
</script>
