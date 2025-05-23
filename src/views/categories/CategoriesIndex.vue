<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type Category } from "@/types/entities";
import { useCategories } from "@/composables";

import { Badge } from "@/components/ui/badge";
import { BaseButton } from "@/components/base";

const { getAllCategories } = useCategories();
const categories = ref<Category[]>([]);

const getCategories = async () => {
  const fetchedCategories = await getAllCategories();
  categories.value = fetchedCategories ?? [];
};

onMounted(async () => {
  await getCategories();
});
</script>

<template>
  <p v-if="!categories.length">No categories</p>
  <div v-else clas="grid gap-4">
    <Badge variant="secondary" v-for="category in categories" :key="category.id">
      {{ category.name }}
    </Badge>
  </div>
  <BaseButton class="mt-4" to="/categories/create">Add category</BaseButton>
</template>
