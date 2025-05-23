import { ref } from "vue";
import { organizationService } from "@/services"
import { useAuthStore } from "@/stores/authStore"
import { toast } from "vue-sonner";
import type { OrganizationInsert } from "@/types/entities";

export function useOrganizations() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const authStore = useAuthStore();

  const getAllOrganizations = async () => {
    isLoading.value = true;
    error.value = null;

    if (!authStore.isSuperAdmin) {
      isLoading.value = false;
      error.value = "You don't have permission";
      toast.error(error.value);
    }

    try {
      const organizations = await organizationService.getAll();
      return organizations;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't load organizations";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  const addOrganization = async (organization: OrganizationInsert) => {
    isLoading.value = true;
    error.value = null;

    if (!authStore.isSuperAdmin) {
      isLoading.value = false;
      error.value = "You don't have permission";
      toast.error(error.value);
    }

    try {
      const result = await organizationService.create(organization);
      return result;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't create organization";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    error,
    isLoading,
    addOrganization,
    getAllOrganizations,
  }
}
