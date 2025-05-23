<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BaseButton } from "@/components/base/";
import { type Campaign } from "@/types/entities";

const props = defineProps<{
  campaign: Campaign;
  canAction?: boolean;
}>();

const emit = defineEmits<{ (e: "approve", id: string): void }>();

const handleApproveClicked = () => {
  emit("approve", props.campaign.id);
};

const placeholderImage = `https://placehold.co/600x400?text=${props.campaign.name}`;
</script>

<template>
  <Card
    class="w-full max-w-md shadow-md pt-0 rounded-xl overflow-hidden transition-all duration-300"
    :class="{
      'opacity-40 grayscale': !props.campaign.is_approved,
      'pointer-events-none': !props.campaign.is_approved && !props.canAction,
    }"
  >
    <CardHeader class="p-0">
      <img :src="placeholderImage" alt="Campaign image" class="w-full h-48 object-cover" />
    </CardHeader>
    <CardContent>
      <CardTitle class="text-xl font-semibold truncate">
        {{ props.campaign.name }}
      </CardTitle>

      <p class="font-medium">Goal: {{ props.campaign.goal_amount.toLocaleString() }}</p>
    </CardContent>
    <CardFooter>
      <BaseButton
        v-if="canAction && !props.campaign.is_approved"
        class="w-full"
        wrapperClass="w-full"
        @click="handleApproveClicked"
      >
        Approve
      </BaseButton>
      <BaseButton
        v-if="props.campaign.is_approved || props.canAction"
        :to="`/campaigns/${props.campaign.id}`"
        class="w-full"
        wrapperClass="w-full"
        variant="secondary"
      >
        View Details
      </BaseButton>
    </CardFooter>
  </Card>
</template>
