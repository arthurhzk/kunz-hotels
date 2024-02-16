<template>
  <div>
    <UButton
      label="Fazer check-in"
      @click="isOpen = true"
      color="gray"
      icon="i-heroicons-pencil-square"
    />

    <UModal v-model="isOpen">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col w-1/2 p-8">
          <UFormGroup label="Nome Completo" name="name">
            <UInput v-model="state.name" type="password" />
          </UFormGroup>
          <UFormGroup label="Número de hóspedes" name="guests">
            <UInput type="number" v-model="state.guests" />
          </UFormGroup>
          <UFormGroup label="Número de noites" name="nights">
            <UInput v-model="state.nights" type="number" />
          </UFormGroup>
        </div>

        <div class="flex flex-col items-center space-y-4">
          <UFormGroup label="Selecione a data inicial">
            <VDatePicker v-model="state.startDate" :attributes="attrs" />
          </UFormGroup>
          <UFormGroup label="Selecione a data de término">
            <VDatePicker v-model="state.endDate" :attributes="attrs" />
          </UFormGroup>
        </div>
        <div class="flex gap-4">
          <UButton @click="isOpen = false" color="red" type="submit">
            Cancelar</UButton
          >

          <UButton color="gray" type="submit"> Check in </UButton>
        </div>
      </UForm>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { ref } from "#imports";
import type { FormSubmitEvent } from "#ui/types";
const supabase = useSupabaseClient();

const schema = z.object({
  name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  night: z.number().min(2, "No mínimo duas noites"),
  guests: z.number().min(1, "No mínimo um hóspede"),
});
const isOpen = ref(false);
type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  password: undefined,
  email: undefined,
  guests: undefined,
  nights: undefined,
  startDate: new Date(),
  endDate: new Date(),
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);

  isOpen.value = false;
}

const attrs = ref([
  {
    dates: new Date().toISOString(),
  },
]);

watchEffect(() => {
  console.log("Data de início: " + state.startDate);
  console.log("Data de término: " + state.endDate);
});
</script>
