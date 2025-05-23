<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

defineProps<{
  name: string;
  label: string;
  description?: string;
}>();
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>
        {{ label }}
      </FormLabel>
      <FormControl>
        <slot v-bind="componentField" />
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage :name="name" />
    </FormItem>
  </FormField>
</template>
