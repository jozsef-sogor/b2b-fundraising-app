<script setup lang="ts">
import CategoriesForm from "@/components/categories/CategoriesForm.vue";
import { useCategories } from "@/composables";
import { useRouter } from "vue-router";
import { type CategoryInsert } from "@/types/entities";

const { addCategory, isLoading } = useCategories();
const router = useRouter();

const onSubmit = async (values: CategoryInsert) => {
  const result = await addCategory(values);
  if (result) router.push("/categories");
};
</script>

<template>
  <CategoriesForm :onSubmit="onSubmit" :submitLabel="'Create'" :isLoading="isLoading" />
</template>
