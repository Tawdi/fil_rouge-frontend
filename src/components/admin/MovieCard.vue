<template>
    <div class="bg-[#1a1a1a] rounded-lg border border-[#333333] overflow-hidden flex flex-col">
      <!-- Movie Poster -->
      <div class="relative">
        <img 
          :src="movie.poster" 
          :alt="movie.title" 
          class="w-full h-64 object-cover"
        />
        <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          {{ movie.duration }} min
        </div>
        <div 
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
        >
          <h3 class="font-bold text-lg truncate">{{ movie.title }}</h3>
          <p class="text-xs text-[#999999]">{{ movie.release_date }}</p>
          <p class="text-xs text-[#999999]">by {{ movie.director }}</p>
        </div>
      </div>
      
      <!-- Movie Details -->
      <div class="p-4 flex-1 flex flex-col">
        <div class="flex items-center gap-4 mb-2">
          <div class="flex items-center bg-[#262626]  px-2 py-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#e5b000" stroke="#e5b000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="text-xs font-medium">{{ movie.rating.toFixed(1) }}</span>
          </div>
          <span 
            class="px-2 py-1 text-xs bg-[#262626] rounded-md"
          >
            {{  movie.genre.name }}
          </span>
        </div>
        <p class="text-xs text-[#999999] mb-4 line-clamp-3 flex-1">
          {{ movie.description }}
        </p>
        
        <div class="flex justify-between mt-auto">
          <div class="flex space-x-2">
            <button 
              @click="$emit('edit', movie)"
              class="p-1.5 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </button>
            <button 
              @click="$emit('delete', movie)"
              class="p-1.5 rounded-md text-[#999999] hover:bg-[#262626] hover:text-red-500"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineEmits(['edit', 'delete']);
  
  defineProps({
    movie: {
      type: Object,
      required: true
    }
  });

  </script>