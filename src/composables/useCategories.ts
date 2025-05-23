import { ref } from "vue";
import { categoryService } from "@/services";
import { toast } from "vue-sonner";
import type { CategoryInsert } from "@/types/entities";

export function useCategories() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getAllCategories = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const categories = await categoryService.getAll();
      return categories;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't load categories";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const addCategory = async (category: CategoryInsert) => {
    isLoading.value = false;
    error.value = null;

    try {
      const result = await categoryService.create(category);
      return result
    } catch (err) {
      console.error(err);
      error.value = "Couldn't add category, is the category name unique?";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    error,
    isLoading,
    addCategory,
    getAllCategories,
  };
}
