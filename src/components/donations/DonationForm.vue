<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "vue-sonner";

const props = defineProps<{
  isSubmitting: boolean;
  isSuccess: boolean;
}>();

const emit = defineEmits<{
  (e: "donate", amount: number): void;
}>();

const amount = ref<number>(0);

const submitDonation = () => {
  if (!amount.value || amount.value <= 0) {
    toast.error("Please enter a valid amount.");
    return;
  }

  emit("donate", amount.value);
};
</script>

<template>
  <Card v-if="!isSuccess" class="w-full mx-auto">
    <CardHeader>
      <h3 class="text-xl font-semibold">Contribute</h3>
    </CardHeader>
    <CardContent>
      <Label for="donation-amount">Donation amount</Label>
      <Input
        id="donation-amount"
        type="number"
        min="1"
        step="50"
        placeholder="e.g. 50"
        v-model="amount"
      />
    </CardContent>
    <CardFooter>
      <Button
        :loading="props.isSubmitting"
        :disabled="props.isSubmitting"
        @click="submitDonation"
        class="w-full mt-2"
      >
        Donate
      </Button>
    </CardFooter>
  </Card>
  <Alert v-else>
    <AlertTitle> Thank you! </AlertTitle>
    <AlertDescription> Your contribution is greatly appreciated </AlertDescription>
  </Alert>
</template>
