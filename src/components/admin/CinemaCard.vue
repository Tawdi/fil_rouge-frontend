<template>
  <div class="bg-[#1a1a1a] rounded-lg border border-[#333333] overflow-hidden flex flex-col">
    <!-- Cinema Image -->
    <div class="relative">
      <img 
        :src="storageUrl+cinema.image" 
        :alt="cinema.name" 
        class="w-full h-48 object-cover"
      />
      <div 
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
      >
        <h3 class="font-bold text-lg truncate">{{ cinema.name }}</h3>
        <p class="text-xs text-[#999999]">{{ cinema.address }}</p>
      </div>
    </div>

      <div class="mt-auto flex justify-end p-4">
        
        <div class="flex space-x-2 ">
          <button 
            @click="$emit('edit', cinema)"
            class="p-1.5 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button 
            @click="$emit('delete', cinema)"
            class="p-1.5 rounded-md text-[#999999] hover:bg-[#262626] hover:text-red-500"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
        </div>
      </div>
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const storageUrl = import.meta.env.VITE_STORAGE_URL;
defineEmits(['edit', 'delete']);

defineProps({
  cinema: {
    type: Object,
    required: true
  }
});
</script>