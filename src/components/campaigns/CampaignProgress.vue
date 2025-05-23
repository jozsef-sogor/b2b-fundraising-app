<script setup lang="ts">
import { computed } from "vue";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const props = defineProps<{
  label: string;
  collected: number;
  goal: number;
}>();

const donationProgress = computed(() => Math.min((props.collected / props.goal) * 100));
</script>

<template>
  <section>
    <Label for="progress">{{ props.label }}</Label>
    <Progress id="progress" :model-value="donationProgress" />
    <div class="flex justify-between">
      <p class="text-sm mt-1">
        {{ props.collected.toLocaleString() }}
      </p>
      <p class="text-sm text-muted-foreground mt-1">
        {{ props.goal.toLocaleString() }}
      </p>
    </div>
  </section>
</template>
