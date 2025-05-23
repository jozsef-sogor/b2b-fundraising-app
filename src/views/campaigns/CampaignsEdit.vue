<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import CampaignForm from "@/components/campaigns/CampaignForm.vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCampaigns } from "@/composables";
import { type CampaignUpdate, type Campaign } from "@/types/entities";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { getCampaignById, updateCampaign, isLoading } = useCampaigns();

const campaignId = computed(() => route.params.id);
const currentCampaign = ref<Campaign | null>(null);

onMounted(async () => {
  const fetchedCampaign = await getCampaignById(campaignId.value as string);
  currentCampaign.value = fetchedCampaign ?? null;
});

const onSubmit = async (formValues) => {
  const campaign: CampaignUpdate = {
    ...formValues,
    is_approved: false,
    organization_id: authStore.isSuperAdmin
      ? (formValues.organization_id ?? null)
      : authStore.organizationId,
  };

  await updateCampaign(campaign);
  if (!isLoading.value) {
    router.push(`/campaigns/${campaignId.value}`);
  }
};
</script>

<template>
  <CampaignForm
    :isLoading="isLoading"
    :onSubmit="onSubmit"
    submitLabel="Save Campaign"
    :initialValues="currentCampaign"
  />
</template>
