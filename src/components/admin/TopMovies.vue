<template>
  <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
    <h3 class="font-bold mb-6">Top Movies</h3>
    <div class="space-y-4">
      <div v-for="(movie, index) in movies" :key="index" class="flex items-center">
        <img :src="movie.poster" :alt="movie.title" class="w-10 h-14 object-cover rounded-md mr-3" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium truncate">{{ movie.title }}</h4>
          <p class="text-xs text-[#999999]">{{ movie.bookings }} bookings</p>
        </div>
        <div class="w-16 h-2 bg-[#262626] rounded-full overflow-hidden" :title="`${movie.occupancy}% occupancy`">
          <div class="h-full bg-[#e50000]" :style="{ width: `${movie.occupancy}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  movies: {
    type: Array,
    required: true
  }
});
</script>