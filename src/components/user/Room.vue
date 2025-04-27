<template>
        <div class="bg-[#262626] rounded-lg p-4 h-[calc(100%-4rem)] flex flex-col">
          <div class="relative w-full mb-6">
            <div 
              class="w-full h-8 bg-[#333333] rounded-md flex items-center justify-center text-sm"
            >
              SCREEN
            </div>
          </div>
          
          <div class="flex-1 overflow-auto">
            <div class="flex flex-col items-center">
              <div 
                v-for="(row, rowIndex) in roomData.layout" 
                :key="`final-row-${rowIndex}`"
                class="flex items-center mb-2"
              >
                <div class="w-8 text-center text-sm text-[#999999]">
                  {{ getRowLabel(rowIndex) }}
                </div>
                <div class="flex">
                  <div 
                    v-for="(seat, seatIndex) in row" 
                    :key="`final-seat-${rowIndex}-${seatIndex}`"
                    class="flex items-center justify-center"
                  >
                  <Seat 
                  :seat="seat"
                  :seatIndex="seatIndex"
                  :rowLabel="getRowLabel(rowIndex)"
                    @unselect="handleSeatUnselect(rowIndex, seatIndex)"
  @select="handleSeatSelect(rowIndex, seatIndex)"
                  />
                  </div>
                </div>
                <div class="w-8 text-center text-sm text-[#999999]">
                  {{ getRowLabel(rowIndex) }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="mt-4 pt-4 border-t border-[#333333] flex flex-wrap gap-4">
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-blue-500/20 border border-blue-500"></div>
              <span class="ml-2 text-xs">Standard</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-purple-500/20 border border-purple-500"></div>
              <span class="ml-2 text-xs">VIP</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-green-500/20 border border-green-500"></div>
              <span class="ml-2 text-xs">Accessible</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-gray-500/50 border border-gray-500"></div>
              <span class="ml-2 text-xs">Taken</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-yellow-500/50 border border-yellow-300"></div>
              <span class="ml-2 text-xs">your selection</span>
            </div>
            
          </div>
        </div>
</template>
<script setup>
import Seat from '@/components/user/Seat.vue'
import { defineProps } from 'vue';


const emit = defineEmits();

const props = defineProps({
  roomData: {
    type: Object,
    required: true
  }
});
const getRowLabel = (index) => {
  if (props.roomData.row_naming === 'letters') {
    let label = '';
    index++; 
    while (index > 0) {
    let remainder = (index - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    index = Math.floor((index - 1) / 26);
  }
  return label;
  } else {

    return (index + 1).toString();
  }
};

const handleSeatSelect = (rowIndex, seatIndex) => {
  emit('select', { row: rowIndex, col: seatIndex });
};

const handleSeatUnselect = (rowIndex, seatIndex) => {
  emit('unselect', { row: rowIndex, col: seatIndex });
};

const getSeatLabel = (index) => {
  return index.toString();
};

</script>