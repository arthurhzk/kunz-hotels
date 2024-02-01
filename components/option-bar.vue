<template>
  <section class="w-1/2 ml-10 mt-10">
    <UVerticalNavigation :links="links" />
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
interface Link {
  label: string;
  icon?: string;
  to?: string;
  avatar?: {
    src: string;
  };
}
const links: Link[] = [
  {
    label: "Profile",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/739984?v=4",
    },
  },
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/getting-started/installation",
  },
  {
    label: "Agendamentos",
    icon: "i-heroicons-chart-bar",
    to: `${
      route.path.startsWith("/dev") ? "/dev" : ""
    }/components/vertical-navigation`,
  },
  {
    label: "Cabanas",
    icon: "i-heroicons-command-line",
    to: "/components/command-palette",
  },
  {
    label: "Hóspedes",
    icon: "i-heroicons-command-line",
  },

  {
    label: "Configurações",
    icon: "i-heroicons-command-line",
  },
];
</script>
