<template>
  <div class="flex h-screen bg-[#141414] text-white">
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Main Seance Manager Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold">Seance Manager ahmed</h1>
            <p class="text-[#999999]">Schedule and manage movie showtimes</p>
          </div>
          
          <div class="flex items-center gap-2">
            <button 
              v-if="!showCreateSeance"
              @click="openCreateSeance"
              class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create New Seance
            </button>
          </div>
        </div>

        <!-- Filters Component -->
        <SeanceFilters 
          v-model:filters="filters"
          :movies="movies"
          :rooms="rooms"
          v-model:viewType="viewType"
          @filter-change="loadSeances"
          class="mb-6"
        />

        <!-- Loading State -->
        <div v-if="loading" class="bg-[#1a1a1a] rounded-lg p-6 flex justify-center items-center h-64">
          <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-[#e50000] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-[#999999]">Loading seances...</p>
          </div>
        </div>


        <!-- Create/Edit -->
        <SeanceForm
          v-if="showCreateSeance && !loading"
          v-model:seance="currentSeance"
          :movies="movies"
          :rooms="rooms"
          :editMode="editMode"
          :conflicts="conflicts"
          :hasConflict="hasConflict"
          @save="saveSeance"
          @cancel="cancelCreateSeance"
          @check-conflicts="checkConflicts"
          class="mb-6"
        />


        <!-- List View Component -->
        <SeanceList
          v-if="viewType === 'list' && !loading && !showCreateSeance"
          :seances="seances"
          :movies="movies"
          :rooms="rooms"
          @edit-seance="editSeance"
          @delete-seance="confirmDeleteSeance"
          @duplicate-seance="duplicateSeance"
          @create-seance="openCreateSeance"
        />


        <!-- Error State -->
        <div v-if="error && !loading && !showCreateSeance" class="bg-[#1a1a1a] rounded-lg p-6">
          <div class="flex items-start gap-3 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle mt-1"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <div>
              <h3 class="text-lg font-medium mb-2">Error Loading Data</h3>
              <p>{{ error }}</p>
              <button 
                @click="loadSeances"
                class="mt-4 px-4 py-2 bg-[#333333] hover:bg-[#444444] text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>

        <!-- Confirmation Modal -->
        <ConfirmationModal
          v-if="showDeleteModal"
          title="Delete Seance"
          :message="`Are you sure you want to delete this seance for '${getMovieTitle(seanceToDelete?.movie_id)}' on ${formatDateTime(seanceToDelete?.start_time)}? This action cannot be undone.`"
          confirm-text="Delete"
          confirm-class="bg-red-600 hover:bg-red-700"
          @confirm="deleteSeance"
          @cancel="showDeleteModal = false"
        />


      </main>
    </div>
  </div>
</template>

<script setup>
import { ref , computed, onMounted, watch } from 'vue';
import movieService from "@/services/movieService";
import roomService from "@/services/roomService";
import seanceService from "@/services/seanceService";


import ConfirmationModal from '@/components/admin/ConfirmationModal.vue';
import SeanceFilters from '@/components/cinemaAdmin/seanceManager/SeanceFilters.vue';
import SeanceForm from '@/components/cinemaAdmin/seanceManager/SeanceForm.vue';
import { formatDateTime, parseDateTime, getStartOfWeek, addDays } from '@/utils/dateTime';

const viewType = ref('calendar');
const showCreateSeance = ref(false);
const editMode = ref(false);
const seanceToDelete = ref(null);
const showDeleteModal = ref(false);
const loading = ref(true);
const error = ref(null);


const seances = ref([]);
const movies = ref([]);
const rooms = ref([]);
const conflicts = ref([]);


const currentWeekStart = ref(getStartOfWeek(new Date()));
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


// Filters
const filters = ref({
  start_date: new Date().toISOString().split('T')[0],
  end_date: addDays(new Date(), 7).toISOString().split('T')[0],
  movie_id: '',
  room_id: '',
});

const currentSeance = ref({
  movie_id: '',
  room_id: '',
  start_time: new Date().toISOString().slice(0, 16).replace('T', ' '),
  end_time: new Date().toISOString().slice(0, 16).replace('T', ' '),
  pricing: {
    Standard: 10.99,
    VIP: 15.99,
    Accessible: 10.99,
    
  }
});

const hasConflict = computed(() => {
  return conflicts.value.length > 0;
});


// Methods
const loadSeances = async () => {
  loading.value = true;
  error.value = null;
  
  try {

    const [seancesResponse, moviesResponse, roomsResponse ] = await Promise.all([
      seanceService.getSeances({
        start_date: filters.value.start_date,
        end_date: filters.value.end_date
      }),
      movieService.getMovies(),
      roomService.getRooms(),
    ]);
    
    seances.value = seancesResponse.data;
    movies.value = moviesResponse.data.data;
    rooms.value = roomsResponse.data.data;
  } catch (err) {
    console.error('Error loading data:', err);
    error.value = err.response?.data?.message || 'Failed to load data. Please try again.';
  } finally {
    loading.value = false;
  }
};

const openCreateSeance = () => {
  editMode.value = false;
  
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0); 
  
  const endTime = new Date(now);
  endTime.setHours(endTime.getHours() + 2);
  
  currentSeance.value = {
    movie_id: '',
    room_id: '',
    start_time: now.toISOString().slice(0, 16).replace('T', ' '),
    end_time: endTime.toISOString().slice(0, 16).replace('T', ' '),
    pricing: {
      Standard: 10.99, VIP: 15.99, Accessible: 10.99 
    }
  };
  
  conflicts.value = [];
  showCreateSeance.value = true;
};

const cancelCreateSeance = () => {
  showCreateSeance.value = false;
  editMode.value = false;
  conflicts.value = [];
};

const saveSeance = async () => {
  if (hasConflict.value) {
    return;
  }
  
  loading.value = true;
  
  try {
    if (editMode.value) {
      currentSeance.value.pricing = JSON.stringify(currentSeance.value.pricing);
      await seanceService.updateSeance(currentSeance.value.id, currentSeance.value);
    } else {

      currentSeance.value.pricing = JSON.stringify(currentSeance.value.pricing);
      await seanceService.createSeance(currentSeance.value);
    }

    await loadSeances();

    showCreateSeance.value = false;
    editMode.value = false;
  } catch (err) {
    console.error('Error saving seance:', err);
    error.value = err.response?.data?.message || 'Failed to save seance. Please try again.';
  } finally {
    loading.value = false;
  }
};

const editSeance = async (seance) => {
  editMode.value = true;
  
  try {

    const response = await seanceService.getSeance(seance.id);
    currentSeance.value = response.data.data;
    
    if (typeof currentSeance.value.pricing === 'string') {
      currentSeance.value.pricing = JSON.parse(currentSeance.value.pricing);
    }
    
    conflicts.value = [];
    showCreateSeance.value = true;
  } catch (err) {
    console.error('Error loading seance details:', err);
    error.value = err.response?.data?.message || 'Failed to load seance details. Please try again.';
  }
};

const confirmDeleteSeance = (seance) => {
  seanceToDelete.value = seance;
  showDeleteModal.value = true;
};

const deleteSeance = async () => {
  if (!seanceToDelete.value) return;
  
  loading.value = true;
  
  try {
    await seanceService.deleteSeance(seanceToDelete.value.id);
    
    await loadSeances();
    
    showDeleteModal.value = false;
    seanceToDelete.value = null;
  } catch (err) {
    console.error('Error deleting seance:', err);
    error.value = err.response?.data?.message || 'Failed to delete seance. Please try again.';
  } finally {
    loading.value = false;
  }
};

const getMovieTitle = (movieId) => {
  const movie = movies.value.find(m => m.id === movieId);
  return movie ? movie.titre : 'Unknown Movie';
};
onMounted(() => {
  loadSeances();
});
</script>