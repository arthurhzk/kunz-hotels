<template>
  <UCard>
    <div class="h-32 dark:bg-gray-800 bg-slate-50 flex rounded-md">
      <div class="flex items-center gap-4 p-10">
        <span
          :class="props.color"
          class="w-14 h-14 rounded-full flex items-center justify-center"
        >
          <UIcon class="w-10 h-10" :name="props.icon" />
        </span>
        <div>
          <p class="text-gray-500">{{ props.title }}</p>
          <p class="text-gray-500">{{ props.amount }}</p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon: string;
  amount: number;
  color: string;
}>();
</script>
