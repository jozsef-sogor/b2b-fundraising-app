import { ref } from "vue";
import { type Campaign, type CampaignInsert, type CampaignUpdate } from "@/types/entities";
import { campaignService, donationService } from "@/services";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/stores/authStore";

export type CampaignWithTotal = Campaign & { totalDonations: number };

export function useCampaigns() {
  const campaigns = ref<CampaignWithTotal[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const authStore = useAuthStore();

  // Normally this would be done in BE and not merged in FE
  // I went witht this solution to more closely simulate REST calls
  // instead of relying on supabase joins
  const getAllCampaigns = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const campaignList = await campaignService.getAll();
      if (!campaignList) {
        campaigns.value = [];
        return [];
      }

      const campaignIds = campaignList.map((campaign: Campaign) => campaign.id);
      const donations = await donationService.filter({
        campaign_id: campaignIds,
      });

      // If no donation just add 0
      if (!donations)
        return campaignList.map(
          (campaign) => ({ ...campaign, totalDonations: 0 }) as CampaignWithTotal,
        );

      const totals = donations.reduce<Record<string, number>>((acc, donation) => {
        if (!donation.campaign_id) return acc;
        acc[donation.campaign_id] = (acc[donation.campaign_id] || 0) + donation.amount;
        return acc;
      }, {});

      const campaignListWithTotal = campaignList.map((campaign) => ({
        ...campaign,
        totalDonations: totals[campaign.id] || 0,
      }));

      campaigns.value = campaignListWithTotal;
      return campaignListWithTotal;
    } catch (err) {
      console.error(err);
      error.value = "Couldn't load campaigns";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const getCampaignById = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const campaign = await campaignService.findById(id);
      if (!campaign) return null;

      const donations = await donationService.filter({ campaign_id: [id] });

      const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0;

      return {
        ...campaign,
        totalDonations,
      } as CampaignWithTotal;
    } catch(err) {
      console.error(err);
      error.value = "Couldn't find campaign";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const addCampaign = async (campaign: CampaignInsert) => {
    isLoading.value = true;
    error.value = null;

    try {
      await campaignService.create(campaign);
    } catch (err) {
      console.error(err);
      error.value = "Couldn't create new campaign";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const approveCampaign = async (campaignId: string) => {
    // Only admins can approve campaign
    if (!authStore.isAdmin && !authStore.isSuperAdmin) {
      error.value = "You're not authorized to approve campaigns";
      toast.error(error.value);
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      await campaignService.update(campaignId, {is_approved: true});
    } catch(err) {
      console.error(err);
      error.value = "Couldn't approve campaign";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const updateCampaign = async (campaign: CampaignUpdate) => {
    isLoading.value = true;
    error.value = null;

    try {
      await campaignService.update(campaign.id as string, campaign)
    } catch(err) {
      console.error(err);
      error.value = "Couldn't update campaign";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    getAllCampaigns,
    getCampaignById,
    approveCampaign,
    updateCampaign,
    addCampaign,
  };
}
