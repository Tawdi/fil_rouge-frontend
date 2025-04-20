<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Main Cinemas Content -->
    <main class="flex-1 overflow-y-auto p-6">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Cinemas</h1>
          <p class="text-[#999999]">Manage your cinema locations</p>
        </div>
        <button
          @click="showAddCinemaModal = true"
          class="bg-[#e50000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus mr-2"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Cinema
        </button>
      </div>

      <!-- Search -->
      <div
        class="bg-[#1a1a1a] rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="relative w-full md:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search cinemas..."
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-4 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Cinemas Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CinemaCard
          v-for="cinema in cinemas"
          :key="cinema.id"
          :cinema="cinema"
          @edit="editCinema(cinema)"
          @delete="confirmDeleteCinema(cinema)"
          @view-screens="viewScreens(cinema)"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CinemaCard from "@/components/admin/CinemaCard.vue";

const cinemas = ref([]);

onMounted(() => {
  cinemas.value = [];
});
</script>
