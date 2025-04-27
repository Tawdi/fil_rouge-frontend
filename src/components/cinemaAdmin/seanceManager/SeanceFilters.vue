<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Date Filter -->
        <div>
          <label class="block text-sm font-medium text-[#999999] mb-1">Date Range</label>
          <div class="flex items-center gap-2">
            <input 
              v-model="localFilters.start_date"
              type="date" 
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
              @change="updateFilters"
            />
            <span class="text-[#999999]">to</span>
            <input 
              v-model="localFilters.end_date"
              type="date" 
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
              @change="updateFilters"
            />
          </div>
        </div>

        <!-- Movie Filter -->
        <div>
          <label class="block text-sm font-medium text-[#999999] mb-1">Movie</label>
          <select 
            v-model="localFilters.movie_id"
            class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            @change="updateFilters"
          >
            <option value="">All Movies</option>
            <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.titre }}</option>
          </select>
        </div>
        
        <!-- Room Filter -->
        <div>
          <label class="block text-sm font-medium text-[#999999] mb-1">Room</label>
          <select 
            v-model="localFilters.room_id"
            class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            @change="updateFilters"
          >
            <option value="">All Rooms</option>
            <option 
              v-for="room in filteredRooms" 
              :key="room.id" 
              :value="room.id"
            >
              {{ room.name }}
            </option>
          </select>
        </div>
        
        <!-- View Type -->
        <div>
          <label class="block text-sm font-medium text-[#999999] mb-1">View</label>
          <div class="flex bg-[#262626] rounded-md p-1">
            <button 
              @click="updateViewType('calendar')"
              :class="[
                'flex-1 py-1.5 px-3 rounded-md text-sm flex items-center justify-center',
                localViewType === 'calendar' ? 'bg-[#e50000] text-white' : 'text-[#999999] hover:text-white'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days mr-1"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Calendar
            </button>
            <button 
              @click="updateViewType('list')"
              :class="[
                'flex-1 py-1.5 px-3 rounded-md text-sm flex items-center justify-center',
                localViewType === 'list' ? 'bg-[#e50000] text-white' : 'text-[#999999] hover:text-white'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list mr-1"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              List
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  movies: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  },
  viewType: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:filters', 'update:viewType', 'filter-change']);

const localFilters = ref({ ...props.filters });
const localViewType = ref(props.viewType);

const filteredRooms = computed(() => {
  if (!props.rooms) return [];
  
  if (localFilters.value.cinema_id) {
    return props.rooms.filter(room => room.cinema_id === parseInt(localFilters.value.cinema_id));
  }
  
  return props.rooms;
});

const updateFilters = () => {
  emit('update:filters', { ...localFilters.value });
  emit('filter-change');
};

const updateViewType = (type) => {
  localViewType.value = type;
  emit('update:viewType', type);
};


watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters };
}, { deep: true });

watch(() => props.viewType, (newViewType) => {
  localViewType.value = newViewType;
});
</script>