<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Room Settings Form -->
      <div class="lg:col-span-1 bg-[#1a1a1a] rounded-lg p-6">
        <h2 class="text-xl font-bold mb-6">Room Settings</h2>
        
        <form @submit.prevent="$emit('continue')" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#999999] mb-1">Room Name</label>
            <input 
              v-model="localRoomData.name"
              type="text" 
              required
              placeholder="e.g. Screen 1, IMAX Theater"
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#999999] mb-1">Number of Rows</label>
            <input 
              v-model.number="localRoomData.rows"
              type="number" 
              min="1"
              max="90"
              required
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#999999] mb-1">Seats per Row</label>
            <input 
              v-model.number="localRoomData.seatsPerRow"
              type="number" 
              min="1"
              max="40"
              required
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#999999] mb-1">Default Seat Type</label>
            <select 
              v-model="localRoomData.defaultSeatType"
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
              <option value="Accessible">Accessible</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#999999] mb-1">Row Naming</label>
            <select 
              v-model="localRoomData.rowNaming"
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            >
              <option value="letters">Letters (A, B, C...)</option>
              <option value="numbers">Numbers (1, 2, 3...)</option>
            </select>
          </div>
          
          <div class="pt-4">
            <button 
              type="submit"
              class="w-full px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md"
            >
              Continue to Seat Customization
            </button>
          </div>
        </form>
      </div>
      
      <!-- Live Preview -->
      <div class="lg:col-span-2 bg-[#1a1a1a] rounded-lg p-6">
        <h2 class="text-xl font-bold mb-6">Live Preview</h2>
        
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
                v-for="row in previewRows" 
                :key="`preview-row-${row.index}`"
                class="flex items-center mb-2"
              >
                <div class="w-8 text-center text-sm text-[#999999]">
                  {{ row.label }}
                </div>
                <div class="flex">
                  <div 
                    v-for="seat in row.seats" 
                    :key="`preview-seat-${row.index}-${seat.index}`"
                    class="flex items-center justify-center"
                  >
                    <div 
                      :class="[
                        'w-8 h-8 mx-1 rounded flex items-center justify-center text-xs cursor-default',
                        localRoomData.defaultSeatType === 'Standard' ? 'bg-blue-500/20 text-blue-300 border border-blue-500' :
                        localRoomData.defaultSeatType === 'VIP' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
                        'bg-green-500/20 text-green-300 border border-green-500'
                      ]"
                    >
                      {{ seat.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Legend -->
          <SeatLegend />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import SeatLegend from '@/components/cinemaAdmin/roomManager/SeatLegend.vue';
  
  const props = defineProps({
    roomData: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update:room-data', 'continue']);
  
  // Create a local copy of the roomData to avoid direct mutation
  const localRoomData = ref({ ...props.roomData });

  watch(localRoomData, (newValue) => {
    emit('update:room-data', newValue);
  }, { deep: true });

  watch(() => props.roomData, (newValue) => {
    localRoomData.value = { ...newValue };
  }, { deep: true });
  
  const previewRows = computed(() => {
    const result = [];
    
    for (let i = 0; i < localRoomData.value.rows; i++) {
      const row = {
        index: i,
        label: getRowLabel(i),
        seats: []
      };
      
      for (let j = 0; j < localRoomData.value.seatsPerRow; j++) {
        row.seats.push({
          index: j,
          label: getSeatLabel(j + 1)
        });
      }
      
      result.push(row);
    }
    
    return result;
  });
  
  const getRowLabel = (index) => {
    if (localRoomData.value.rowNaming === 'letters') {
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
  </script>