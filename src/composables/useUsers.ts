import { ref } from "vue";
import { userService } from "@/services";
import { toast } from "vue-sonner";
import { type User } from "@/types/entities";

export function useUsers() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getUserById = async (id: string) => {
    error.value = null;
    isLoading.value = true;
    try {
      const user = await userService.findById(id);
      return user;
    } catch(err) {
      console.error(err)
      error.value = "Couldn't get the user";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  const getAccessLevelByUserId = async (id: string) => {
    error.value = null;
    isLoading.value = true;

    try {
      const user = await userService.findById(id);
      const accessLevel = user.access_level;

      return accessLevel;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't get user access level";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  const createUser = async (user: Partial<User>) => {
    error.value = null;
    isLoading.value = false;

    try {
      await userService.create(user);
    } catch(err) {
      console.error(err);
      error.value = "Couldn't create user";
      toast.error(error.value);
    }
  }

  return {
    createUser,
    getUserById,
    getAccessLevelByUserId,
  }
}
