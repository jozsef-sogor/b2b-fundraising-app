import { ref } from "vue";
import { invitationService } from "@/services";
import { toast } from "vue-sonner";

export function useInvites() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const organizationId = ref<string | null>(null);

  const verifyInviteCode = async (code: string) => {
    loading.value = true;
    error.value = null;
    organizationId.value = null;

    try {
      const result = await invitationService.findByValue("invite_code", parseFloat(code));
      if (!result) return { valid: false, organizationId: null };

      organizationId.value = result.organization_id;

      return { valid: true, organizationId: result.organization_id };
    } catch (err) {
      console.error(err);
      error.value = "Error while validation invites";
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    organizationId,
    verifyInviteCode,
  };
}
