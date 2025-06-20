<template>
  <div>
    <strong>{{ title }}</strong>
    <p class="text-sm opacity-80">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
</script>
