<template>
  <div class="group relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform hover:-translate-y-1"
   @click="goToMovieDetail"
  >
    <div class="relative aspect-[2/3] w-full overflow-hidden">
      <div 
        class="absolute inset-0 z-10 opacity-70" 
        :style="{ background: `linear-gradient(0deg, rgba(0,0,0,50) 0%, rgba(0,0,0,0) 50%)` }"
      ></div>
      <img 
        :src="image" 
        :alt="title"
        class="object-cover w-full h-full transition-transform group-hover:scale-105"
      />
      <div class="absolute bottom-0 left-0 z-20 p-4">
        <h3 class="text-xl font-bold">{{ title }}</h3>
      </div>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2 bg-[#141414] border-[#262626] border-2 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock text-gray-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span class="text-gray-400">{{ duration }}</span>
            </div>
            <div class="flex bg-[#141414] border-[#262626] border-2 px-2 py-1 rounded-full">
              <template v-for="n in 5" :key="n">
                <svg v-if="n <= rating" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF4D4D" stroke="#FF4D4D"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </template>
            </div>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-[#999999] capitalize bg-[#141414] border-[#262626] border-2 px-4 py-1 rounded-full">{{ genre }}</span>
        <span class="text-[#999999] bg-[#141414] border-[#262626] border-2 px-4 py-1 rounded-full">{{ releaseDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  id: Number,
  title: String,
  image: String,
  duration: String,
  rating: Number,
  genre: String,
  releaseDate: String
});
const router = useRouter();

const goToMovieDetail = () => {
  router.push(`/movie/${props.id}`);
};
</script>