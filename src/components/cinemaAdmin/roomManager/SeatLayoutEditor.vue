<template>
  <div class="bg-[#1a1a1a] rounded-lg p-6">
    <h2 class="text-xl font-bold mb-6">Seat Layout Editor</h2>
    
    <div class="bg-[#262626] rounded-lg p-4  flex flex-col">
      <div class="relative w-full mb-6">
        <div 
          class="w-full h-8 bg-[#333333] rounded-md flex items-center justify-center text-sm"
        >
          SCREEN
        </div>
      </div>
            <!-- Column Labels -->
            <div class="mb-2 flex justify-center">
        <div class="w-8"></div>
        <div class="flex">
          <div 
            v-for="(seat, index) in roomData.layout[0]" 
            :key="`col-label-${index}`"
            class="w-10 text-center text-xs text-[#999999] cursor-pointer hover:text-white"
            @click="$emit('select-column', index)"
          >
            {{ getSeatLabel(index + 1) }} 
          </div>
        </div>
        <div class="w-8"></div>
      </div>
      <div class="flex-1 overflow-auto ">
        <div class="flex flex-col items-center ">
          <div 
            v-for="(row, rowIndex) in roomData.layout" 
            :key="`editor-row-${rowIndex}`"
            class="flex items-center mb-2"
          >
            <div 
              class="w-8 text-center text-sm text-[#999999] cursor-pointer hover:text-white"
              @click="$emit('select-row', rowIndex)"
            >
              {{ getRowLabel(rowIndex) }}
            </div>
            <div class="flex">
              <div 
                v-for="(seat, seatIndex) in row" 
                :key="`editor-seat-${rowIndex}-${seatIndex}`"
                class="flex items-center justify-center"
              >
                <div 
                  :class="[
                    'w-8 h-8 mx-1 rounded flex items-center justify-center text-xs cursor-pointer transition-all',
                    seat.type === 'Standard' ? 'bg-blue-500/20 text-blue-300 border border-blue-500' :
                    seat.type === 'VIP' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
                    seat.type === 'Accessible' ? 'bg-green-500/20 text-green-300 border border-green-500' :
                    seat.type === 'None' ? 'bg-[#333333] text-[#666666]' : '',
                    isSelected(rowIndex, seatIndex) ? 'border-2 border-yellow-500 shadow-lg' : ''
                  ]"
                  @click="$emit('toggle-seat', rowIndex, seatIndex)"
                  @mouseenter="$emit('mouse-enter', rowIndex, seatIndex)"
                >
                  {{ seat.type !== 'None' ? getSeatLabel(seatIndex + 1) : '' }}
                </div>
              </div>
            </div>
            <div 
              class="w-8 text-center text-sm text-[#999999] cursor-pointer hover:text-white"
              @click="$emit('select-row', rowIndex)"
            >
              {{ getRowLabel(rowIndex) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Column Labels -->
      <div class="mt-2 flex justify-center">
        <div class="w-8"></div>
        <div class="flex">
          <div 
          v-for="(seat, index) in roomData.layout[0]" 
            :key="`col-label-${index}`"
            class="w-10 text-center text-xs text-[#999999] cursor-pointer hover:text-white"
            @click="$emit('select-column', index)"
          >
            {{ getSeatLabel(index + 1) }}
          </div>
        </div>
        <div class="w-8"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  roomData: {
    type: Object,
    required: true
  },
  selectionMode: {
    type: String,
    required: true
  },
  selectedSeats: {
    type: Array,
    required: true
  },
  isDragging: {
    type: Boolean,
    required: true
  }
});

defineEmits(['toggle-seat', 'select-row', 'select-column', 'mouse-enter']);

const getRowLabel = (index) => {
  if (props.roomData.row_naming === 'letters') {
    // Convert to letter (A, B, C, ...)
    let label = '';
    index++; 
    while (index > 0) {
      let remainder = (index - 1) % 26;
      label = String.fromCharCode(65 + remainder) + label;
      index = Math.floor((index - 1) / 26);
    }
    return label;
  } else {
    // Use numbers
    return (index + 1).toString();
  }
};

const getSeatLabel = (index) => {
  return index.toString();
};

const isSelected = (rowIndex, seatIndex) => {
  return props.selectedSeats.includes(`${rowIndex}-${seatIndex}`);
};
</script>