<script setup lang="ts">
import CampaignForm from "@/components/campaigns/CampaignForm.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCampaigns } from "@/composables";
import { type CampaignInsert } from "@/types/entities";

const router = useRouter();
const authStore = useAuthStore();
const { addCampaign, isLoading } = useCampaigns();

const onSubmit = async (formValues: CampaignInsert) => {
  const campaign: CampaignInsert = {
    ...formValues,
    is_approved: false,
    organization_id: authStore.isSuperAdmin
      ? (formValues.organization_id ?? null)
      : authStore.organizationId,
  };

  await addCampaign(campaign);
  if (!isLoading.value) {
    router.push("/campaigns");
  }
};
</script>

<template>
  <CampaignForm :isLoading="isLoading" :onSubmit="onSubmit" submitLabel="Save Campaign" />
</template>
