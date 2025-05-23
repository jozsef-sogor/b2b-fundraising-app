import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/authStore";

import "./index.css";

import App from "./App.vue";
import router from "./router";

// Avoid issues when deployed to Netlify
(async () => {
  const app = createApp(App);

  app.use(createPinia());

  const authStore = useAuthStore();
  await authStore.getSession();

  app.use(router);
  app.mount("#app");
})();
