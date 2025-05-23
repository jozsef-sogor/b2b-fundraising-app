<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCampaigns, useDonations, useUsers, type CampaignWithTotal } from "@/composables";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";
import { type DonationInsert } from "@/types/entities";

import { BaseButton } from "@/components/base";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CampaignHero from "@/components/campaigns/CampaignHero.vue";
import CampaignProgress from "@/components/campaigns/CampaignProgress.vue";
import DonationForm from "@/components/donations/DonationForm.vue";
import { toast } from "vue-sonner";

const authStore = useAuthStore();
const route = useRoute();
const {
  getCampaignById,
  isLoading: isCampaignLoading,
  error: campaignLoadingError,
} = useCampaigns();

const isDonationSuccess = ref(false);
const campaign = ref<CampaignWithTotal | null>(null);
const isLoading = ref(isCampaignLoading.value);

const campaignId = computed(() => route.params.id as string);
const userId = computed(() => authStore.userId);
const isOwnCampaign = computed(
  () => campaign.value && authStore.userId && campaign.value.id === userId.value,
);
const canEdit = computed(() => isOwnCampaign.value || authStore.isAdmin || authStore.isSuperAdmin);
const placeholderImage = computed(
  () => `https://placehold.co/600x400?text=${campaign.value?.name}`,
);

const getCampaign = async () => {
  const fetchedCampaign = await getCampaignById(campaignId.value);
  campaign.value = fetchedCampaign ?? null;
};

onMounted(async () => {
  getCampaign();
});

const { addDonation, isLoading: isDonationSubmitting } = useDonations();
const { getUserById } = useUsers();

const handleDonate = async (amount: number) => {
  if (!userId.value) {
    toast.error("You need to be logged in to donate");
    return;
  }

  const user = await getUserById(userId.value);
  const organizationId = user?.organization_id;

  const donation: DonationInsert = {
    campaign_id: campaignId.value,
    organization_id: organizationId,
    user_id: userId.value,
    amount: amount,
  };

  const result = await addDonation(donation);

  if (result) {
    isDonationSuccess.value = true;
    // Do not show loading while updating
    isLoading.value = false;
    getCampaign();
    return;
  }
};
</script>

<template>
  <section v-if="isLoading">Loading</section>
  <section
    v-if="campaign"
    class="p-6 mx-auto w-full max-w-6xl space-y-8 lg:space-y-0 lg:flex lg:gap-8"
  >
    <div class="flex-1 space-y-8">
      <CampaignHero :src="placeholderImage" />
      <Card>
        <CardHeader>
          <div class="flex justify-between items-start">
            <h1 class="text-3xl font-semibold">{{ campaign.name }}</h1>
            <BaseButton v-if="canEdit" :to="`/campaigns/${campaignId}/edit`" variant="secondary">
              Edit
            </BaseButton>
          </div>
        </CardHeader>
        <CardContent class="p-6 space-y-6">
          <CampaignProgress
            label="Fundraising progress"
            :collected="campaign.totalDonations"
            :goal="campaign.goal_amount"
          />
          <p class="text-muted-foreground mt-2">{{ campaign.description }}</p>
        </CardContent>
      </Card>
    </div>

    <aside class="lg:w-[250px] xl:w-[300px] w-full">
      <DonationForm
        :disabled="authStore.isSuperAdmin"
        :isSubmitting="isDonationSubmitting"
        :isSuccess="isDonationSuccess"
        @donate="handleDonate"
      />
    </aside>
  </section>
  <section v-if="campaignLoadingError">Couldn't load campaign</section>
</template>
