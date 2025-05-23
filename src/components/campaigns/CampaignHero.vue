<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <img
      :src="props.src"
      alt="Campaign"
      class="rounded-2xl shadow-md w-full max-h-[300px] object-cover"
    />
  </div>
</template>
