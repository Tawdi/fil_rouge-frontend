<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ editMode ? 'Edit Seance' : 'Create New Seance' }}</h2>
        <button 
          @click="$emit('cancel')"
          class="p-1 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Step 1: Movie & Room Selection -->
        <div>
          <h3 class="text-lg font-medium mb-4">Movie & Room Selection</h3>
          
          <div class="space-y-4">
            <!-- Movie Selection -->
            <div>
              <label class="block text-sm font-medium text-[#999999] mb-1">Select Movie</label>
              <div class="relative">
                <select 
                  v-model="localSeance.movie_id"
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                  required
                  @change="updateSeance"
                >
                  <option value="" disabled>Select a movie</option>
                  <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.titre }}</option>
                </select>
              </div>
            </div>
            
            <!-- Selected Movie Details -->
            <div v-if="selectedMovie" class="bg-[#262626] p-4 rounded-md">
              <div class="flex items-start gap-3">
                <div class="w-16 h-24 bg-[#333333] rounded overflow-hidden">
                  <img 
                    v-if="selectedMovie.poster" 
                    :src="selectedMovie.poster" 
                    :alt="selectedMovie.titre" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium">{{ selectedMovie.titre }}</h4>
                  <div class="text-sm text-[#999999] mt-1">{{ selectedMovie.director }}</div>
                  <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span class="text-xs">{{ selectedMovie.duration }} min</span>
                    </div>
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span class="text-xs">{{ selectedMovie.rating }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
            <!-- Room Selection -->
            <div>
              <label class="block text-sm font-medium text-[#999999] mb-1">Select Room</label>
              <select 
                v-model="localSeance.room_id"
                class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                required
                @change="updateSeance"
              >
                <option value="">Select a room </option>
                <option 
                  v-for="room in rooms" 
                  :key="room.id" 
                  :value="room.id"
                >
                  {{ room.name }}
                </option>
              </select>
            </div>
            
            <!-- Selected Room Details -->
            <div v-if="selectedRoom" class="bg-[#262626] p-4 rounded-md">
              <h4 class="font-medium">{{ selectedRoom.name }}</h4>
              <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span class="text-[#999999]">Rows:</span>
                  <span class="ml-1">{{ selectedRoom.rows }}</span>
                </div>
                <div>
                  <span class="text-[#999999]">Seats per row:</span>
                  <span class="ml-1">{{ selectedRoom.seats_per_row }}</span>
                </div>
                <div>
                  <span class="text-[#999999]">Total capacity:</span>
                  <span class="ml-1">{{ selectedRoom.rows * selectedRoom.seats_per_row }} seats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 2: Seance Scheduling -->
        <div>
          <h3 class="text-lg font-medium mb-4">Seance Scheduling</h3>
          
          <div class="space-y-4">
            <!-- Date and Time Selection -->
            <div>
              <label class="block text-sm font-medium text-[#999999] mb-1">Start Date & Time</label>
              <input 
                v-model="localSeance.start_time"
                type="datetime-local" 
                required
                class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                @change="updateEndTime"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#999999] mb-1">End Date & Time</label>
              <input 
                v-model="localSeance.end_time"
                type="datetime-local" 
                required
                class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                @change="updateSeance"
              />
            </div>
            
            <!-- Pricing Settings -->
            <div>
              <label class="block text-sm font-medium text-[#999999] mb-1">Pricing</label>
              <div class="bg-[#262626] p-4 rounded-md space-y-3">
                <div>
                  <label class="block text-sm text-[#999999] mb-1">Standard Price</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999999]">$</span>
                    <input 
                      v-model.number="localSeance.pricing.Standard"
                      type="number" 
                      min="0" 
                      step="0.01"
                      required
                      class="bg-[#333333] border border-[#444444] rounded-md py-2 pl-8 pr-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                      @change="updateSeance"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm text-[#999999] mb-1">VIP Price</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999999]">$</span>
                    <input 
                      v-model.number="localSeance.pricing.VIP"
                      type="number" 
                      min="0" 
                      step="0.01"
                      required
                      class="bg-[#333333] border border-[#444444] rounded-md py-2 pl-8 pr-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                      @change="updateSeance"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-[#999999] mb-1">Accessible Price</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999999]">$</span>
                    <input 
                      v-model.number="localSeance.pricing.Accessible"
                      type="number" 
                      min="0" 
                      step="0.01"
                      required
                      class="bg-[#333333] border border-[#444444] rounded-md py-2 pl-8 pr-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                      @change="updateSeance"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Conflict Warning -->
            <div v-if="hasConflict" class="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded-md">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                <div>
                  <h5 class="font-medium">Time Conflict Detected</h5>
                  <p class="text-sm mt-1">This seance overlaps with existing showtimes in the same room:</p>
                  <ul class="text-sm mt-1 ml-4 list-disc">
                    <li v-for="conflict in conflicts" :key="conflict.id">
                      {{ getMovieTitle(conflict.movie_id) }} ({{ formatDateTime(conflict.start_time) }} - {{ formatDateTime(conflict.end_time) }})
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Submit Buttons -->
            <div class="flex justify-end gap-3 pt-4">
              <button 
                @click="$emit('cancel')"
                class="px-4 py-2 border border-[#333333] rounded-md text-[#999999] hover:bg-[#262626]"
              >
                Cancel
              </button>
              <button 
                @click="$emit('save')"
                class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md"
                :disabled="!isFormValid || hasConflict"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || hasConflict }"
              >
                {{ editMode ? 'Update Seance' : 'Create Seance' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { formatDateTime } from '@/utils/dateTime';

const props = defineProps({
  seance: {
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
  editMode: {
    type: Boolean,
    default: false
  },
  conflicts: {
    type: Array,
    required: true
  },
  hasConflict: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:seance', 'save', 'cancel', 'check-conflicts']);

// Local state
const localSeance = ref({
  ...props.seance,
  pricing: props.seance.pricing || { Standard: 10.99, VIP: 15.99, Accessible: 10.99 }
});


if (localSeance.value.start_time) {
  localSeance.value.start_time = localSeance.value.start_time.replace(' ', 'T');
}
if (localSeance.value.end_time) {
  localSeance.value.end_time = localSeance.value.end_time.replace(' ', 'T');
}


watch(() => props.seance, (newValue) => {
  localSeance.value = { ...newValue };
  
  if (!localSeance.value.pricing) {
    localSeance.value.pricing = { Standard: 10.99, VIP: 15.99, Accessible: 10.99  };
  } else if (typeof localSeance.value.pricing === 'string') {
    localSeance.value.pricing = JSON.parse(localSeance.value.pricing);
  }

  if (localSeance.value.start_time) {
    localSeance.value.start_time = localSeance.value.start_time.replace(' ', 'T');
  }
  if (localSeance.value.end_time) {
    localSeance.value.end_time = localSeance.value.end_time.replace(' ', 'T');
  }

}, { deep: true });

// Computed 
const selectedMovie = computed(() => {
  if (!localSeance.value.movie_id) return null;
  return props.movies.find(movie => movie.id === parseInt(localSeance.value.movie_id));
});

const selectedRoom = computed(() => {
  if (!localSeance.value.room_id) return null;
  return props.rooms.find(room => room.id === parseInt(localSeance.value.room_id));
});

const isFormValid = computed(() => {
  return (
    localSeance.value.movie_id &&
    localSeance.value.room_id &&
    localSeance.value.start_time &&
    localSeance.value.end_time &&
    localSeance.value.pricing &&
    localSeance.value.pricing.Standard > 0
  );
});

// Methods
const updateSeance = () => {

  const seanceData = { ...localSeance.value };
  if (seanceData.start_time) {
    seanceData.start_time = seanceData.start_time.replace('T', ' ');
  }
  if (seanceData.end_time) {
    seanceData.end_time = seanceData.end_time.replace('T', ' ');
  }
  
  emit('update:seance', seanceData);
  emit('check-conflicts');
};

const updateEndTime = () => {
  if (!localSeance.value.start_time || !selectedMovie.value) return;
  

  const startDateTime = new Date(localSeance.value.start_time);
  const endDateTime = new Date(startDateTime.getTime() + selectedMovie.value.duration * 60000);

  localSeance.value.end_time = endDateTime.toISOString().slice(0, 16);
  
  updateSeance();
};

const getMovieTitle = (movieId) => {
  const movie = props.movies.find(m => m.id === movieId);
  return movie ? movie.titre : 'Unknown Movie';
};
</script>