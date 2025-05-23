<script setup lang="ts">
import AppSidebar from "@/components/global/AppSidebar.vue";
import { BasePageWrapper } from "@/components/base";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = computed(() => route.meta.title);
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <h1>{{ title }}</h1>
      </header>
      <BasePageWrapper>
        <RouterView></RouterView>
      </BasePageWrapper>
    </SidebarInset>
  </SidebarProvider>
</template>
