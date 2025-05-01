<template>
    <div class="bg-[#1a1a1a] rounded-xl border border-[#333333] overflow-hidden flex flex-col shadow-md transition hover:shadow-lg">
  <div class="p-5 flex-1 flex flex-col space-y-4">
    <!-- Genre Tag -->
    <span class="px-3 py-1  font-semibold text-white rounded-full w-fit">
      {{ genre.name }}
    </span>

    <!-- Actions -->
    <div class="flex justify-between items-end mt-auto">
      <div class="flex space-x-3">
        <!-- Edit Button -->
        <button 
          @click="$emit('edit', genre)"
          class="p-2 rounded-lg text-[#999999] hover:bg-[#262626] hover:text-white transition-colors duration-200"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </button>

        <!-- Delete Button -->
        <button 
          @click="$emit('delete', genre)"
          class="p-2 rounded-lg text-[#999999] hover:bg-[#262626] hover:text-red-500 transition-colors duration-200"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" x2="10" y1="11" y2="17"/>
            <line x1="14" x2="14" y1="11" y2="17"/>
          </svg>
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
    genre: {
      type: Object,
      required: true
    }
  });

  </script>