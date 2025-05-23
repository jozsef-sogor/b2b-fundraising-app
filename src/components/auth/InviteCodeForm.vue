<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { PinInput, PinInputGroup, PinInputSlot } from "@/components/ui/pin-input";
import { toast } from "vue-sonner";
import FormHeader from "@/components/auth/FormHeader.vue";

const emit = defineEmits(["verified"]);

const authStore = useAuthStore();
const inviteCode = ref<string[]>([]);

const handleComplete = async (value: string[]) => {
  const parsedCode = value.join("");
  const isValidCode = await authStore.isInviteCodeValid(parsedCode);

  if (isValidCode) emit("verified");
  if (!isValidCode) toast.error("Invalid invite code");
};
</script>

<template>
  <section class="flex flex-col gap-6">
    <FormHeader>
      <template #title>Enter your invite code</template>
      <template #subtitle>The invitation code is provided by your organization</template>
    </FormHeader>
    <div class="flex justify-center">
      <PinInput id="pin-input" v-model="inviteCode" placeholder="○" @complete="handleComplete">
        <PinInputGroup class="gap-1">
          <PinInputSlot
            v-for="(id, index) in 5"
            :key="id"
            class="rounded-md border"
            :index="index"
          />
        </PinInputGroup>
      </PinInput>
    </div>
  </section>
</template>
