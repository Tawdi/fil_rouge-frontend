<template>
  <!-- Main Content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 overflow-y-auto p-6">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Genres</h1>
          <p class="text-[#999999]">Manage your genre catalog</p>
        </div>
        <button
          @click="showAddGenreModal = true"
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
          Add Genre
        </button>
      </div>

      <!-- Filters and Search -->
      <div
        class="bg-[#1a1a1a] rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="relative w-full md:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Genres..."
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

      <!-- Genres Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <GenreCard
          v-for="genre in filteredGenres"
          :key="genre.id"
          :genre="genre"
          @edit="editGenre(genre)"
          @delete="confirmDeleteGenre(genre)"
        />
      </div>
    </main>
  </div>
  <!-- Add/Edit Genre Modal -->
  <GenreFormModal
    v-if="showAddGenreModal || showEditGenreModal"
    :genre="currentGenre"
    :is-edit="showEditGenreModal"
    @close="closeModals"
    @save="saveGenre"
  />
  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-if="showDeleteModal"
    :title="`Delete ${currentGenre?.name}`"
    :message="`Are you sure you want to delete ' ${currentGenre?.name} ' ? This action cannot be undone.`"
    @confirm="deleteGenre"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import GenreCard from "@/components/admin/GenreCard.vue";
import GenreFormModal from "@/components/admin/GenreFormModal.vue";
import ConfirmationModal from "@/components/admin/ConfirmationModal.vue";

import { useNotificationStore } from "@/stores/notificationStore";
import genreService from "@/services/genreService";
const notificationStore = useNotificationStore();

const genres = ref([]);
const searchQuery = ref("");
const showAddGenreModal = ref(false);
const showEditGenreModal = ref(false);
const showDeleteModal = ref(false);
const showAddCategoryModal = ref(false);
const showEditCategoryModal = ref(false);
const currentGenre = ref(null);

const fetchGenres = async () => {
  try {
    const response = await genreService.getGenres();
    genres.value = response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    notificationStore.pushNotification({
      message: "Error loading genres.",
      type: "error",
    });
  }
};

const filteredGenres = computed(() => {
    if (!searchQuery.value) return genres.value;
    
    const query = searchQuery.value.toLowerCase();
    return genres.value.filter(genre => 
    genre.name.toLowerCase().includes(query)
    );
});

onMounted(fetchGenres);

const saveGenre = async (genreData) => {
  try {
    if (showEditGenreModal.value) {
      await genreService.updateGenre(genreData.id, genreData);
      notificationStore.pushNotification({
        message: `Genre "${genreData.name}" updated successfully.`,
        type: "success",
      });
    } else {
      await genreService.createGenre(genreData);
      notificationStore.pushNotification({
        message: `Genre "${genreData.name}" added successfully.`,
        type: "success",
      });
    }
    await fetchGenres();
    closeModals();
  } catch (error) {
    console.error("Error saving genre:", error);
    notificationStore.pushNotification({
      message: "Failed to save genre.",
      type: "error",
    });
  }
};

const closeModals = () => {
  showAddGenreModal.value = false;
  showEditGenreModal.value = false;
  currentGenre.value = null;
};

const confirmDeleteGenre = (genre) => {
  currentGenre.value = genre;
  showDeleteModal.value = true;
};

const editGenre = (genre) => {
  currentGenre.value = { ...genre };
  showEditGenreModal.value = true;
};

const deleteGenre = async () => {
  if (!currentGenre.value) return;
  try {
    await genreService.deleteGenre(currentGenre.value.id);
    notificationStore.pushNotification({
      message: `Genre "${currentGenre.value.name}" deleted successfully.`,
      type: "success",
    });

    await fetchGenres();
    showDeleteModal.value = false;
    currentGenre.value = null;
  } catch (error) {
    console.error("Error deleting genre:", error);
    notificationStore.pushNotification({
      message: "Failed to delete genre.",
      type: "error",
    });
  }
};
</script>
