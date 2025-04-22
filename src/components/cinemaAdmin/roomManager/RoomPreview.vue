<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Room Summary -->
      <div class="lg:col-span-1 bg-[#1a1a1a] rounded-lg p-6">
        <h2 class="text-xl font-bold mb-6">Room Summary</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium">{{ roomData.name }}</h3>
            <p class="text-[#999999]">{{ roomData.rows }} rows × {{ roomData.seatsPerRow }} columns</p>
          </div>
          
          <div class="bg-[#262626] rounded-lg p-4">
            <h4 class="font-medium mb-3">Seat Count</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-[#999999]">Total Seats:</span>
                <span class="font-medium">{{ countSeats(roomData.layout) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#999999]">Standard Seats:</span>
                <span class="font-medium">{{ countSeatsByType(roomData.layout, 'Standard') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#999999]">VIP Seats:</span>
                <span class="font-medium">{{ countSeatsByType(roomData.layout, 'VIP') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#999999]">Accessible Seats:</span>
                <span class="font-medium">{{ countSeatsByType(roomData.layout, 'Accessible') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#999999]">Removed/Aisles:</span>
                <span class="font-medium">{{ countSeatsByType(roomData.layout, 'None') }}</span>
              </div>
            </div>
          </div>
          
          <div class="pt-4 space-y-3">
            <button 
              @click="$emit('save')"
              class="w-full px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Room
            </button>
            
            <button 
              @click="$emit('continue-editing')"
              class="w-full px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil mr-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Continue Editing
            </button>
          </div>
        </div>
      </div>
      
      <!-- Room Layout Preview -->
      <div class="lg:col-span-2 bg-[#1a1a1a] rounded-lg p-6">
        <h2 class="text-xl font-bold mb-6">Room Layout Preview</h2>
        
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
                    <div 
                      v-if="seat.type !== 'None'"
                      :class="[
                        'w-8 h-8 mx-1 rounded flex items-center justify-center text-xs',
                        seat.type === 'Standard' ? 'bg-blue-500/20 text-blue-300 border border-blue-500' :
                        seat.type === 'VIP' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
                        'bg-green-500/20 text-green-300 border border-green-500'
                      ]"
                    >
                      {{ getSeatLabel(seatIndex + 1) }}
                    </div>
                    <div 
                      v-else
                      class="w-8 h-8 mx-1"
                    ></div>
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
              <span class="ml-2 text-xs">Standard ({{ countSeatsByType(roomData.layout, 'Standard') }})</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-purple-500/20 border border-purple-500"></div>
              <span class="ml-2 text-xs">VIP ({{ countSeatsByType(roomData.layout, 'VIP') }})</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded bg-green-500/20 border border-green-500"></div>
              <span class="ml-2 text-xs">Accessible ({{ countSeatsByType(roomData.layout, 'Accessible') }})</span>
            </div>
          </div>
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
    }
  });
  
  defineEmits(['save', 'continue-editing']);
  
  const getRowLabel = (index) => {
    if (props.roomData.rowNaming === 'letters') {
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
  
  const countSeats = (layout) => {
    let count = 0;
    
    layout.forEach(row => {
      row.forEach(seat => {
        if (seat.type !== 'None') {
          count++;
        }
      });
    });
    
    return count;
  };
  
  const countSeatsByType = (layout, type) => {
    let count = 0;
    
    layout.forEach(row => {
      row.forEach(seat => {
        if (seat.type === type) {
          count++;
        }
      });
    });
    
    return count;
  };
  </script>