<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { Toaster } from "@/components/ui/sonner";

onMounted(() => {
  const authStore = useAuthStore();
  authStore.handleOnSessionChange();
});
</script>

<template>
  <RouterView></RouterView>
  <Toaster />
</template>
