<script setup lang="ts">
import { computed, watch, ref } from "vue";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  type SidebarProps,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import NavUser from "@/components/nav/NavUser.vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useOrganization, useUsers } from "@/composables";
import { type Organization, type User } from "@/types/entities";

const props = defineProps<SidebarProps>();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { getUserById } = useUsers();

const accessLevel = computed(() => authStore.accessLevel ?? 0);

const routes = router.getRoutes();
const navItems = routes.filter(
  (route) =>
    route.meta.isInNavbar &&
    (route.meta.requiredAccessLevel === undefined ||
      (route.meta.requiredAccessLevel as number) <= accessLevel.value),
);

const isActive = (itemUrl: string) => route.path.startsWith(itemUrl);
const organiation = ref<Organization | null>(null);
const user = ref<User | null>(null);
const userId = computed(() => authStore.userId);
const userForTemplate = computed(() => {
  return {
    name: `${user.value?.first_name} ${user.value?.last_name}`,
    email: user.value?.email ?? "",
  };
});

watch(
  userId,
  async () => {
    if (userId.value) {
      const fetchedUser = await getUserById(userId.value);
      if (fetchedUser) {
        user.value = fetchedUser;
        const { organization, refresh } = await useOrganization(fetchedUser.organization_id);
        await refresh();
        organiation.value = organization.value;
      }
    }
  },
  { immediate: true },
);

const handleLogout = async () => {
  await authStore.logout();
  router.push("/auth/login");
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader> {{ organiation?.name }} </SidebarHeader>
    <Separator />
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in navItems" :key="item.path">
          <SidebarMenuButton :is-active="isActive(item.path)">
            <component :is="item.meta.icon" v-if="item.meta.icon" />
            <RouterLink :to="item.path">{{ item.meta.title }}</RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <NavUser v-if="userForTemplate" :user="userForTemplate" @logout-clicked="handleLogout" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
