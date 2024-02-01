// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  devtools: { enabled: true },
  supabase: {
    redirect: false,
    url: "https://nsccvdjgainhdemxgpeg.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2N2ZGpnYWluaGRlbXhncGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyOTg0NzEsImV4cCI6MjAxOTg3NDQ3MX0.xjaHV1UVeepU2uGNgCn-9T8xfJG7KBqk2LY9nvraWU4",
  },
});
