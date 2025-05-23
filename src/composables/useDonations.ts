import { ref } from "vue";
import { donationService } from "@/services";
import type { DonationInsert } from "@/types/entities";
import { toast } from "vue-sonner";

export function useDonations() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const addDonation = async (donation: DonationInsert) => {
    isLoading.value = true;
    error.value = null;

    try {
      return await donationService.create(donation);
    } catch (err) {
      console.error(err);
      error.value = "Couldn't add donation";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const getAllDonations = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const donations = await donationService.getAll();
      return donations;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't load donations";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    addDonation,
    getAllDonations,
    isLoading,
    error,
  };
}
