<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
      <h2 class="text-xl font-semibold text-white mb-4">Current Movies Playing</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="movie in movies" :key="movie.id" class="flex items-center space-x-4">
          <img :src="movie.poster" class="w-16 h-24 object-cover rounded" alt="Movie poster" />
          <div>
            <h3 class="text-white font-medium">{{ movie.titre }}</h3>
            <p class="text-[#999999] text-sm">{{ movie.genre.name }} • {{ formatDuration(movie.duration) }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
  movies: Array
})

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
</script>
  