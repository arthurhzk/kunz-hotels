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
          <UFormGroup label="Número do Check-in" name="check">
            <UInput v-model="state.id" type="number" />
          </UFormGroup>
          <UFormGroup label="Nome Completo" name="name">
            <UInput v-model="state.fullName" type="text" />
          </UFormGroup>
          <UFormGroup label="Número de hóspedes" name="guests">
            <UInput type="number" v-model="state.guests" />
          </UFormGroup>
          <UFormGroup label="Número de noites" name="nights">
            <UInput v-model="state.numNights" type="number" />
          </UFormGroup>
          <UFormGroup label="Nacionalidade" name="nationality">
            <UInput v-model="state.nationality" type="text" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" type="text" />
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

          <UButton @click="checkIn" color="gray" type="submit">
            Check in
          </UButton>
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
  fullName: undefined,
  password: undefined,
  email: undefined,
  guests: undefined,
  numNights: undefined,
  startDate: new Date(),
  nationality: undefined,
  endDate: new Date(),
  id: undefined,
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

const addCheck = async () => {
  const response = await supabase.from("bookings").insert({
    numGuests: state.guests,
    numNights: state.numNights,
    startDate: state.startDate,
    endDate: state.endDate,
    guestId: state.id,
  });
  console.log(response.data);
};

const addGuests = async () => {
  const otherResponse = await supabase.from("guests").insert({
    fullName: state.fullName,
    email: state.email,
    nationality: state.nationality,
    id: state.id,
  });
  console.log(otherResponse.data);
};

const checkIn = async () => {
  await addGuests();
  await addCheck();
};
</script>
