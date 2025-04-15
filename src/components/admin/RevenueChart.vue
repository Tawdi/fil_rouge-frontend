<template>
  <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333] lg:col-span-2">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-bold">Revenue Overview</h3>
    </div>
    <div class="h-64 flex items-end justify-between px-2">
      <div v-for="(day, index) in revenueData" :key="index" class="flex flex-col items-center w-full">
        <div class="w-full max-w-[30px] bg-[#e50000] rounded-t-sm transition-all duration-500"
          :style="{ height: `${day.value}%` }"></div>
        <p class="text-xs text-[#999999] mt-2">{{ day.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  revenueData: {
    type: Array,
    required: true
  }
});
</script>