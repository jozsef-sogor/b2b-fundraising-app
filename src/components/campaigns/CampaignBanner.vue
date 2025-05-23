<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BaseButton } from "@/components/base/";
</script>

<template>
  <Card
    class="w-full h-full max-w-md shadow-md pt-0 rounded-xl overflow-hidden border-dashed border-2 border-muted"
  >
    <CardHeader class="p-6 text-center">
      <CardTitle class="text-xl font-semibold"> Start your own campaign </CardTitle>
    </CardHeader>

    <CardContent class="text-center text-muted-foreground px-6 pb-0">
      <p>Raise funds for a cause you care about. It's quick and easy to get started.</p>
    </CardContent>

    <CardFooter class="px-6 pt-4 mt-auto">
      <BaseButton to="/campaigns/create" class="w-full" wrapperClass="w-full" variant="default">
        Create a Campaign
      </BaseButton>
    </CardFooter>
  </Card>
</template>
