<template>
  <header class="flex flex-col items-center gap-2 text-center">
    <h1 class="text-2xl font-bold" v-if="$slots.title">
      <slot name="title"></slot>
    </h1>
    <p class="text-balance text-sm text-muted-foreground" v-if="$slots.subtitle">
      <slot name="subtitle"></slot>
    </p>
  </header>
</template>
