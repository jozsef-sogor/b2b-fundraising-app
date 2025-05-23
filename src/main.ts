import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/authStore";

import "./index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());

const authStore = useAuthStore();
await authStore.getSession();
await authStore.handleOnSessionChange();

app.use(router);

app.mount("#app");
