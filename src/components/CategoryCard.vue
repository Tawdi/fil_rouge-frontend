<template>
  <div class="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#262626] transition-colors">
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div
        v-for="(_, index) in 4"
        :key="`${name}-${index}`"
        class="aspect-[3/4] relative rounded-md overflow-hidden"
      >
        <img
          :src="posters[index] || '/images/halflogo.png'"
          :alt="`${name} movie`"
          class="w-full  object-cover cursor-pointer"
          @error="handleError(index)"
        />
      </div>
    </div>
    <div class="flex justify-between items-center">
      <h3 class="font-medium">{{ name }}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  name: String,
  posters: Array
});
const handleError = (index) => {
  props.posters[index] = '/images/halflogo.png'; 
};
</script>
