<script setup lang="ts">
import { Button, type Props as ButtonProps } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import { computed } from "vue";

const props = defineProps<ButtonProps & { to?: string; wrapperClass?: string }>();

const isLink = computed(() => !!props.to);
</script>

<template>
  <RouterLink
    :class="props.wrapperClass"
    v-if="isLink"
    :to="props.to as string"
    custom
    v-slot="{ navigate, href }"
  >
    <Button :href="href" @click="navigate" v-bind="props">
      <slot />
    </Button>
  </RouterLink>

  <Button v-else v-bind="props">
    <slot />
  </Button>
</template>
