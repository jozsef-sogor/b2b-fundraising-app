<script setup lang="ts">
import OrganizationForm from "@/components/organizations/OrganizationsForm.vue";
import { useOrganizations } from "@/composables";
import { useRouter } from "vue-router";
import { type OrganizationInsert } from "@/types/entities";

const { addOrganization } = useOrganizations();
const router = useRouter();

const handleSubmit = async (values: OrganizationInsert) => {
  const result = await addOrganization(values);
  if (result) {
    router.push("/organizations");
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto p-6">
    <OrganizationForm :onSubmit="handleSubmit" :submitLabel="'Create'" :isLoading="false" />
  </div>
</template>
