import { ref, computed, onMounted } from "vue";
import { organizationService } from "@/services/organizationService";
import { userService } from "@/services/userService";
import { campaignService } from "@/services/campaignService";
import { donationService } from "@/services/donationService";
import { type Organization, type Campaign, type User, type Donation } from "@/types/entities";
import { toast } from "vue-sonner";

export function useOrganization(organizationId: string) {
  const organization = ref<Organization | null>(null);
  const campaigns = ref<Campaign[]>([]);
  const employees = ref<User[]>([]);
  const donations = ref<Donation[]>([]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const totalRaised = computed(() => donations.value.reduce((sum, d) => sum + (d.amount ?? 0), 0));

  const campaignCount = computed(() => campaigns.value.length);
  const employeeCount = computed(() => employees.value.length);

  async function fetchAll() {
    isLoading.value = true;
    error.value = null;

    try {
      const [org, camps, users] = await Promise.all([
        organizationService.findById(organizationId),
        campaignService.filter({ organization_id: organizationId }),
        userService.filter({ organization_id: organizationId }),
      ]);

      organization.value = org;
      campaigns.value = camps ?? [];
      employees.value = users ?? [];

      const campaignIds = campaigns.value.map((c) => c.id);
      const allDonations = await donationService.filter({ campaign_id: campaignIds });
      donations.value = allDonations ?? [];
    } catch (err) {
      console.error(err);
      error.value = "Error while collecting organization data";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetchAll);

  return {
    organization,
    campaigns,
    employees,
    donations,
    totalRaised,
    campaignCount,
    employeeCount,
    isLoading,
    error,
    refresh: fetchAll,
  };
}
