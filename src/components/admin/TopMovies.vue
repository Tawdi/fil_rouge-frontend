<template>
  <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
    <h2 class="text-xl font-semibold text-white mb-4">Top Movies</h2>
    <div v-for="(movie, index) in movies" :key="movie.id" class="flex items-center justify-between py-2">
      <div class="flex items-center space-x-3">
        <span class="text-[#999999] w-6">{{ index + 1 }}.</span>
        <img :src="movie.poster" alt="poster" class="w-10 h-14 object-cover rounded-md mr-3" />
        <span class="text-white">{{ movie.titre }}</span>
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