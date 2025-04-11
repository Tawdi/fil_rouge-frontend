<template>
  <div class="group relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform hover:-translate-y-1"

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
      <div class="flex items-center gap-2 text-[#999999] text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>{{ duration }}</span>
      </div>
      <div class="flex items-center gap-1">
        <div v-for="i in 5" :key="i" class="h-2 w-2 rounded-full" :class="i <= rating ? 'bg-[#e50000]' : 'bg-[#333333]'"></div>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-[#999999] capitalize">{{ genre }}</span>
        <span class="text-[#999999]">{{ releaseDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  id: Number,
  title: String,
  image: String,
  duration: String,
  rating: Number,
  genre: String,
  releaseDate: String
});


</script>