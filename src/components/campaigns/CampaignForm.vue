<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/authStore";
import { useCategories, useOrganizations } from "@/composables";
import { type CampaignInsert, type Organization, type Category } from "@/types/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseFormField } from "@/components/base";

const props = defineProps<{
  initialValues?: Partial<CampaignInsert>;
  onSubmit: (values: CampaignInsert) => Promise<void>;
  submitLabel: string;
  isLoading: boolean;
}>();

const authStore = useAuthStore();
const { getAllCategories } = useCategories();
const { getAllOrganizations } = useOrganizations();

const categories = ref<Category[]>([]);
const organizations = ref<Organization[]>([]);

onMounted(async () => {
  const fetchedCategories = await getAllCategories();
  categories.value = fetchedCategories ?? [];

  if (authStore.isSuperAdmin) {
    const fetchedOrganizations = await getAllOrganizations();
    organizations.value = fetchedOrganizations ?? [];
  }
});

const formSchema = toTypedSchema(
  z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Enter a campaign name"),
    description: z.string().min(1, "Enter a description"),
    goal_amount: z.number().positive("Goal must be positive"),
    category_id: z.string().optional().nullable(),
    organization_id: z.string().nullable(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    description: "",
    goal_amount: 1000,
    category_id: null,
    organization_id: authStore.isSuperAdmin ? null : authStore.organizationId,
    ...props.initialValues,
  },
});

const submit = form.handleSubmit(async (values) => {
  await props.onSubmit({ ...values });
});

watch(
  () => props.initialValues,
  (newValues) => {
    if (newValues) {
      form.setValues(newValues, true);
      if (newValues.id) {
        form.setFieldValue("id", newValues.id);
      }
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <form id="create-campaign-form" class="flex flex-col gap-6" @submit="submit">
    <BaseFormField label="Campaign Name" name="name" v-slot="field">
      <Input id="name" v-bind="field" required />
    </BaseFormField>

    <BaseFormField label="Description" name="description" v-slot="field">
      <Textarea id="description" v-bind="field" required />
    </BaseFormField>

    <BaseFormField label="Goal Amount" name="goal_amount" v-slot="field">
      <Input id="goal_amount" type="number" step="any" v-bind="field" required />
    </BaseFormField>

    <BaseFormField label="Category" name="category_id" v-slot="field">
      <Select v-bind="field">
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </BaseFormField>

    <BaseFormField
      v-if="authStore.isSuperAdmin"
      label="Organization"
      name="organization_id"
      v-slot="field"
    >
      <Select v-bind="field">
        <SelectTrigger>
          <SelectValue placeholder="Select an organization" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="org in organizations" :key="org.id" :value="org.id">
            {{ org.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </BaseFormField>

    <Button type="submit" :loading="isLoading" :disabled="isLoading" class="w-full">{{
      props.submitLabel
    }}</Button>
  </form>
</template>
