<script setup lang="ts">
import { ref } from "vue";
import InviteCodeForm from "@/components/auth/InviteCodeForm.vue";
import SignupForm from "@/components/auth/SignupForm.vue";

const inviteVerified = ref(false);

function handleInviteVerified() {
  inviteVerified.value = true;
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <InviteCodeForm v-if="!inviteVerified" @verified="handleInviteVerified" />
    <SignupForm v-else />
  </div>
</template>
