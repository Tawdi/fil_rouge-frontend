<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-xl font-bold">Cinema Rooms</h2>
        <div class="relative w-64">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search rooms..." 
            class="bg-[#262626] border border-[#333333] rounded-md py-2 px-4 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="room in filteredRooms" 
          :key="room.id"
          class="bg-[#262626] rounded-lg overflow-hidden border border-[#333333] hover:border-[#e50000] transition-colors duration-200"
        >
          <div class="p-4 border-b border-[#333333]">
            <h3 class="text-lg font-bold">{{ room.name }}</h3>
          </div>
          
          <div class="p-4">
            <div class="mb-4 aspect-video bg-[#1a1a1a] rounded-md overflow-hidden flex items-center justify-center">
              <!-- Room Layout Preview -->
              <div class="relative w-full max-w-[200px] transform scale-[0.6]">
                <div 
                  class="absolute top-0 left-0 w-full h-6 bg-[#333333] rounded-t-md flex items-center justify-center text-xs"
                >
                  SCREEN
                </div>
                <div class="pt-8 pb-2">
                  <div 
                    v-for="(row, rowIndex) in room.layout" 
                    :key="`preview-${room.id}-row-${rowIndex}`"
                    class="flex justify-center mb-1"
                  >
                    <div 
                      v-for="(seat, seatIndex) in row" 
                      :key="`preview-${room.id}-seat-${rowIndex}-${seatIndex}`"
                      v-show="seat.type !== 'None'"
                      :class="[
                        'w-4 h-4 mx-0.5 rounded-sm',
                        seat.type === 'Standard' ? 'bg-blue-500' :
                        seat.type === 'VIP' ? 'bg-purple-500' :
                        seat.type === 'Accessible' ? 'bg-green-500' :
                        'bg-[#333333]'
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <span class="text-[#999999]">Total Seats:</span>
                <span class="ml-1">{{ countSeats(room.layout) }}</span>
              </div>
              <div>
                <span class="text-[#999999]">Rows:</span>
                <span class="ml-1">{{ room.layout.length }}</span>
              </div>
              <div>
                <span class="text-[#999999]">Standard:</span>
                <span class="ml-1">{{ countSeatsByType(room.layout, 'Standard') }}</span>
              </div>
              <div>
                <span class="text-[#999999]">VIP:</span>
                <span class="ml-1">{{ countSeatsByType(room.layout, 'VIP') }}</span>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button 
                @click="$emit('edit-room', room)"
                class="px-3 py-1.5 border border-[#333333] rounded-md text-white hover:bg-[#333333] text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil mr-1"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                Edit
              </button>
              <button 
                @click="$emit('delete-room', room)"
                class="px-3 py-1.5 border border-[#333333] rounded-md text-[#e50000] hover:bg-[#333333] text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 mr-1"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredRooms.length === 0" class="col-span-full text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sofa mx-auto mb-4 text-[#666666]"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/></svg>
          <h3 class="text-lg font-medium mb-2">No rooms found</h3>
          <p class="text-[#999999] mb-4">Create your first cinema room to get started</p>
          <button 
            @click="$emit('create-room')"
            class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Create New Room
          </button>
        </div>
      </div>
      <!-- Pagination Component -->
      <Pagination
        v-if="filteredRooms.length > 0 && totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
import Pagination from '@/components/Pagination.vue';
  
  const props = defineProps({
    rooms: {
      type: Array,
      required: true
    },
    currentPage: Number,
    totalPages: Number,
  });

  const emit = defineEmits(['create-room', 'edit-room', 'delete-room','page-change']);

  const handlePageChange = (page) => {
  emit('page-change', page);
};
  const searchQuery = ref('');
  
  const filteredRooms = computed(() => {
    if (!searchQuery.value) return props.rooms;
    
    const query = searchQuery.value.toLowerCase();
    return props.rooms.filter(room => 
      room.name.toLowerCase().includes(query)
    );
  });
  
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