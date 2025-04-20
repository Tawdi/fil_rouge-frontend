<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div class="bg-[#1a1a1a] rounded-lg w-full max-w-md">
      <div class="p-6 border-b border-[#333333]">
        <h3 class="text-xl font-bold">{{ title }}</h3>
      </div>
      
      <div class="p-6">
        <p class="text-[#999999]">{{ message }}</p>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="$emit('cancel')"
            class="px-4 py-2 border border-[#333333] rounded-md text-[#999999] hover:bg-[#262626]"
          >
            Cancel
          </button>
          <button 
            @click="$emit('confirm')"
            class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineEmits(['confirm', 'cancel']);

defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
</script>