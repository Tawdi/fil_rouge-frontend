<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-[#333333]">
              <th class="py-3 px-4 text-left text-sm font-medium text-[#999999]">Movie</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-[#999999]">Room</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-[#999999]">Date & Time</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-[#999999]">Duration</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-[#999999]">Pricing</th>
              <th class="py-3 px-4 text-right text-sm font-medium text-[#999999]">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="seance in seances" 
              :key="seance.id"
              class="border-b border-[#333333] hover:bg-[#262626]"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-12 bg-[#333333] rounded overflow-hidden">
                    <img 
                      v-if="getMovie(seance.movie_id)?.poster" 
                      :src="getMovie(seance.movie_id)?.poster" 
                      :alt="getMovie(seance.movie_id)?.titre" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div class="font-medium">{{ getMovie(seance.movie_id)?.titre || 'Unknown Movie' }}</div>
                    <div class="text-xs text-[#999999]">{{ getMovie(seance.movie_id)?.duration || 0 }} min</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <div>
                  <div class="font-medium">{{ getRoom(seance.room_id)?.name || 'Unknown Room' }}</div>
                </div>
              </td>
              <td class="py-3 px-4">
                <div>
                  <div>{{ formatDate(seance.start_time) }}</div>
                  <div class="text-xs text-[#999999]">{{ formatTime(seance.start_time) }} - {{ formatTime(seance.end_time) }}</div>
                </div>
              </td>
              <td class="py-3 px-4">
                {{ getDuration(seance.start_time, seance.end_time) }} min
              </td>
              <td class="py-3 px-4">
                <div>
                  <div>${{ getPricing(seance, 'Standard').toFixed(2) }} <span class="text-xs text-[#999999]">Standard</span></div>
                  <div>${{ getPricing(seance, 'VIP').toFixed(2) }} <span class="text-xs text-[#999999]">VIP</span></div>
                  <div>${{ getPricing(seance, 'Accessible').toFixed(2) }} <span class="text-xs text-[#999999]">Accessible</span></div>
                </div>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="flex justify-end gap-2">
                  <button 
                    @click="$emit('edit-seance', seance)"
                    class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-white"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </button>
                  <button 
                    @click="$emit('delete-seance', seance)"
                    class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-[#e50000]"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                  <button 
                    @click="$emit('duplicate-seance', seance)"
                    class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-white"
                    title="Duplicate"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="seances.length === 0">
              <td colspan="7" class="py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-x mx-auto mb-4 text-[#666666]"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>
                <h3 class="text-lg font-medium mb-2">No seances found</h3>
                <p class="text-[#999999] mb-4">Try adjusting your filters or create a new seance</p>
                <button 
                  @click="$emit('create-seance')"
                  class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Create New Seance
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate, formatTime } from '@/utils/dateTime';

const props = defineProps({
  seances: {
    type: Array,
    required: true
  },
  movies: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit-seance', 'delete-seance', 'duplicate-seance', 'create-seance']);

const getMovie = (movieId) => {
  return props.movies.find(movie => movie.id === movieId);
};

const getRoom = (roomId) => {
  return props.rooms.find(room => room.id === roomId);
};

const getDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return Math.round((end - start) / 60000);
};

const getPricing = (seance, type) => {
  if (!seance.pricing) return 0;

  let pricing = seance.pricing;
  if (typeof pricing === 'string') {
    try {
      pricing = JSON.parse(pricing);
    } catch (e) {
      return 0;
    }
  }
  
  return pricing[type] || 0;
};

</script>