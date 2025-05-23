import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import { Building2, BanknoteArrowUp, Tag, ChartLine } from "lucide-vue-next";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/campaigns",
      },
      {
        path: "campaigns",
        name: "campaigns-index",
        meta: {
          title: "Campaigns",
          icon: BanknoteArrowUp,
          isInNavbar: true,
        },
        component: () => import("@/views/campaigns/CampaignsIndex.vue"),
      },
      {
        path: "campaigns/:id",
        name: "campaign-show",
        meta: {
          title: "Campaigns",
        },
        component: () => import("@/views/campaigns/CampaignShow.vue"),
      },
      {
        path: "campaigns/:id/edit",
        name: "campaign-edit",
        meta: {
          title: "Edit campaign",
        },
        component: () => import("@/views/campaigns/CampaignsEdit.vue"),
      },
      {
        path: "campaigns/create",
        name: "campaigns-create",
        meta: {
          title: "New campaign",
        },
        component: () => import("@/views/campaigns/CampaignsCreate.vue"),
      },
      {
        path: "categories",
        name: "categories-index",
        meta: {
          title: "Categories",
          icon: Tag,
          isInNavbar: true,
        },
        component: () => import("@/views/categories/CategoriesIndex.vue"),
      },
      {
        path: "categories/create",
        name: "categories-create",
        meta: {
          title: "New Category",
          requiredAccessLevel: 200,
        },
        component: () => import("@/views/categories/CategoriesCreate.vue"),
      },
      {
        path: "organizations",
        name: "organizations-index",
        meta: {
          title: "Organizations",
          icon: Building2,
          isInNavbar: true,
          requiredAccessLevel: 300,
        },
        component: () => import("@/views/organizations/OrganizationsIndex.vue"),
      },
      {
        path: "organizations/:id",
        name: "organizations-show",
        meta: {
          title: "Organizations",
        },
        component: () => import("@/views/organizations/OrganizationsShow.vue"),
      },
      {
        path: "organizations/create",
        name: "organizations-create",
        meta: {
          requiredAccessLevel: 300
        },
        component: () => import("@/views/organizations/OrganizationsCreate.vue"),
      },
      {
        path: "statistics",
        name: "statistics-index",
        meta: {
          title: "Statistics (Dummy data)",
          icon: ChartLine,
          isInNavbar: true,
          requiredAccessLevel: 200,
        },
        component: () => import("@/views/statistics/StatisticsIndex.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => AuthLayout,
    children: [
      {
        path: "",
        redirect: "/auth/login",
      },
      {
        path: "login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "signup",
        name: "signup",
        component: () => import("@/views/auth/SignupPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.session) {
    await authStore.getSession();
  }

  const isLoggedIn = !!authStore.session?.user;

  if (to.path.startsWith("/auth")) {
    if (isLoggedIn) return next("/");
    return next();
  }

  if (!isLoggedIn) {
    return next("/auth/login");
  }

  const requiredLevel = (to.meta.requiredAccessLevel ?? 0) as number;

  if ((authStore.accessLevel ?? 0) < requiredLevel) {
    return next("/");
  }

  next();
});

export default router;
