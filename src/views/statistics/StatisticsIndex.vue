<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Total Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-semibold">12</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Total Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-semibold">€85,000</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Active Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-semibold">7</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-semibold">3</p>
      </CardContent>
    </Card>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <Card>
      <CardHeader>
        <CardTitle>Fundraising Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress :model-value="85" />
        <div class="flex justify-between">
          <p class="text-sm mt-1">30 000</p>
          <p class="text-sm text-muted-foreground mt-1">60 000</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Monthly Donations (Chart Placeholder)</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          class="h-40 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground"
        ></div>
      </CardContent>
    </Card>
  </div>
</template>
