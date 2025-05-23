<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type CategoryInsert } from "@/types/entities";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { BaseFormField } from "@/components/base";

const props = defineProps<{
  onSubmit: (values: CategoryInsert) => Promise<void>;
  submitLabel: string;
  isLoading: boolean;
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Enter a category name"),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
  },
});

const submit = form.handleSubmit(async (formValues: CategoryInsert) => {
  await props.onSubmit({ ...formValues });
});
</script>

<template>
  <form @submit="submit" class="space-y-4">
    <BaseFormField label="Name" name="name" v-slot="field">
      <Input id="name" required v-bind="field" />
    </BaseFormField>
    <Button type="submit" :disabled="isLoading">{{ submitLabel }}</Button>
  </form>
</template>
