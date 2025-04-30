<template>
  <div class="mb-6">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <p class="text-[#999999]">{{ subtitle }}</p>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  subtitle: {
    type: String,
    default: `Welcome back, Here's what's happening today.`
  }

});
</script>