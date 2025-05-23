<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useCampaigns } from "@/composables/useCampaigns";
import { type Campaign } from "@/types/entities";
import CampaignCard from "@/components/campaigns/CampaignCard.vue";
import CampaignBanner from "@/components/campaigns/CampaignBanner.vue";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue-sonner";

const { getAllCampaigns, approveCampaign, isLoading } = useCampaigns();
const campaigns = ref<Campaign[]>([]);

const authStore = useAuthStore();
const hasAccess = computed(() => authStore.isAdmin || authStore.isSuperAdmin);

const getCampaigns = async () => {
  const fetchedCampaigns = await getAllCampaigns();
  campaigns.value = fetchedCampaigns ?? [];
};

const handleApprove = async (id: string) => {
  await approveCampaign(id);
  toast("Approved succesfully");
  await getCampaigns();
};

onMounted(async () => {
  await getCampaigns();
});
</script>

<template>
  <section v-if="isLoading">Loading</section>
  <section v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <CampaignBanner />
    <p v-if="!campaigns.length" class="p-4">No campaigns</p>
    <CampaignCard
      v-else
      v-for="campaign in campaigns"
      :key="campaign.id"
      :campaign="campaign"
      :canAction="hasAccess"
      @approve="handleApprove"
    />
  </section>
</template>
