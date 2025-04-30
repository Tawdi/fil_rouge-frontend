<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div v-for="(stat, index) in stats" :key="index" class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-[#999999] text-sm mb-1">{{ stat.name }}</p>
          <h3 class="text-2xl font-bold">{{ stat.value }}</h3>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';
defineProps({
  stats: {
    type: Array,
    required: true
  }
});

</script>