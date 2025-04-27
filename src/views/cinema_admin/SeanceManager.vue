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


      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SeanceFilters from '@/components/cinemaAdmin/seanceManager/SeanceFilters.vue';

const viewType = ref('calendar');
const showCreateSeance = ref(false);


const seances = ref([]);
const movies = ref([]);
const rooms = ref([]);

// Filters
const filters = ref({
  start_date: new Date().toISOString().split('T')[0],
  end_date: addDays(new Date(), 7).toISOString().split('T')[0],
  movie_id: '',
  room_id: '',
});




// Methods
const loadSeances = async () => {}

</script>