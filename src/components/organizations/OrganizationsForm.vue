<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BaseFormField } from "@/components/base";

const props = defineProps<{
  initialValues?: { name?: string };
  onSubmit: (values: { name: string }) => void | Promise<void>;
  submitLabel: string;
  isLoading: boolean;
}>();

const name = ref(props.initialValues?.name ?? "");

const handleSubmit = () => {
  props.onSubmit({ name: name.value });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseFormField label="Name" name="name" v-slot="field">
      <Input id="name" v-model="name" required v-bind="field" />
    </BaseFormField>
    <Button type="submit" :disabled="isLoading">{{ submitLabel }}</Button>
  </form>
</template>
