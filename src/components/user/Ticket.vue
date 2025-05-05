<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  movieTitle: {
    type: String,
    required: true
  },
  movieImage: {
    type: String,
    required: true
  },
  cinemaName: {
    type: String,
    required: true
  },
  cinemaAddress: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  seat: {
    type: Object,
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
})

const formattedPrice = computed(() => {
  return `$${props.price.toFixed(2)}`
})

const getSeatLabel = ( row , col ,rowNaming = 'letters' ) => {
     row++; col++;
    if (rowNaming === 'letters') {
      let label = '';
    while (row > 0) {
      let remainder = (row - 1) % 26;
      label = String.fromCharCode(65 + remainder) + label;
      row = Math.floor((row - 1) / 26);
    }
    return label+'-'+col.toString();
    } else {
      return `${row}-${col}`;
    }
  };
</script>

<template>
  <div class="ticket-container max-w-sm mx-auto">
    <div 
      class="ticket bg-[#1a1a1a] border border-[#333333] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#444444] hover:transform hover:-translate-y-1"
    >
      <div class="ticket-header relative h-48 overflow-hidden">
        <img 
          :src="movieImage" 
          :alt="movieTitle" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-4 w-full">
          <h2 class="text-white text-xl font-bold truncate">{{ movieTitle }}</h2>
        </div>
      </div>
      <div class="ticket-content p-4">
        <div class="mb-4">
          <h3 class="text-white font-medium">{{ cinemaName }}</h3>
          <p class="text-[#999999] text-sm">{{ cinemaAddress }}</p>
          <p v-if="roomName" class="text-[#999999] text-sm">Room: {{ roomName }}</p>
        </div>
        
        <div class="relative py-2 flex items-center">
          <div class="flex-grow border-t border-dashed border-[#333333]"></div>
          <div class="mx-2 text-[#999999]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              <path d="M13 5v2"/>
              <path d="M13 17v2"/>
              <path d="M13 11v2"/>
            </svg>
          </div>
          <div class="flex-grow border-t border-dashed border-[#333333]"></div>
        </div>
        
        <div class="grid grid-cols-3 gap-2 mb-4">
          <div class="text-center">
            <p class="text-[#999999] text-xs">Date</p>
            <p class="text-white">{{ date }}</p>
          </div>
          <div class="text-center">
            <p class="text-[#999999] text-xs">Time</p>
            <p class="text-white">{{ time }}</p>
          </div>
          <div class="text-center">
            <p class="text-[#999999] text-xs">Seat</p>
            <p class="text-white font-bold">{{ getSeatLabel(seat.row,seat.col) }}</p>
          </div>
        </div>
        
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-[#999999] text-xs">Price</p>
            <p class="text-white text-lg font-bold">{{ formattedPrice }}</p>
          </div>
          <div>
            <p class="text-[#999999] text-xs">Type</p>
            <p class="text-white text-lg font-bold">{{ seat.type }}</p>
          </div>
        </div>
        
        <!-- Barcode -->
        <div class="barcode-container py-2 flex justify-center">
          <div class="barcode h-12 w-full flex items-center justify-center">
            <svg class="w-full h-full" viewBox="0 0 100 30">
              <rect v-for="(_, i) in 30" :key="i" 
                :x="i * 3" 
                y="0" 
                :width="Math.random() * 2 + 0.5" 
                height="30" 
                fill="#666666" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.ticket:hover .barcode {
  opacity: 0.9;
}
</style>
