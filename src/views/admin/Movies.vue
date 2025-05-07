<template>
  <!-- Main Content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 overflow-y-auto p-6">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Movies</h1>
          <p class="text-[#999999]">Manage your movie catalog</p>
        </div>
        <button
          @click="showAddMovieModal = true"
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
          Add Movie
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
              placeholder="Search movies..."
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

      <!-- Movies Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @edit="editMovie(movie)"
          @delete="confirmDeleteMovie(movie)"
        />
      </div>
      <Pagination
        v-if="movies.length > 0 && totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange" />
    </main>
  </div>
  <!-- Add/Edit Movie Modal -->
  <MovieFormModal
    v-if="showAddMovieModal || showEditMovieModal"
    :movie="currentMovie"
    :is-edit="showEditMovieModal"
    @close="closeModals"
    @save="saveMovie"
  />
  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-if="showDeleteModal"
    :title="`Delete ${currentMovie?.title}`"
    :message="`Are you sure you want to delete ' ${currentMovie?.title} ' ? This action cannot be undone.`"
    @confirm="deleteMovie"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import MovieCard from "@/components/admin/MovieCard.vue";
import MovieFormModal from "@/components/admin/MovieFormModal.vue";
import ConfirmationModal from "@/components/admin/ConfirmationModal.vue";
import Pagination from '@/components/Pagination.vue';

import { useNotificationStore } from "@/stores/notificationStore";
import movieService from "@/services/movieService";
const notificationStore = useNotificationStore();

const movies = ref([]);
const searchQuery = ref("");
const showAddMovieModal = ref(false);
const showEditMovieModal = ref(false);
const showDeleteModal = ref(false);
const currentMovie = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const fetchMovies = async () => {
  try {
    const response = await movieService.getMovies({ 
      page: currentPage.value ,
      search: searchQuery.value.trim(),
    });
    movies.value = response.data.data;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } catch (error) {
    console.error("Error fetching movies:", error);
    notificationStore.pushNotification({
      message: "Error loading movies.",
      type: "error",
    });
  }
};
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchMovies();
};
// const filteredMovies = computed(() => {
//     if (!searchQuery.value) return movies.value;
    
//     const query = searchQuery.value.toLowerCase();
//     return movies.value.filter(movie => 
//     movie.titre.toLowerCase().includes(query) || movie.description.toLowerCase().includes(query)
//     );
//  });
watch(searchQuery, (newQuery) => {
  currentPage.value = 1;
  fetchMovies();
});
onMounted(fetchMovies);

const saveMovie = async (movieData) => {
  try {
    if (showEditMovieModal.value) {
      await movieService.updateMovie(movieData.id, movieData);
      notificationStore.pushNotification({
        message: `Movie "${movieData.titre}" updated successfully.`,
        type: "success",
      });
    } else {
      await movieService.createMovie(movieData);
      notificationStore.pushNotification({
        message: `Movie "${movieData.titre}" added successfully.`,
        type: "success",
      });
    }
    await fetchMovies();
    closeModals();
  } catch (error) {
    console.error("Error saving movie:", error);
    notificationStore.pushNotification({
      message: "Failed to save movie",
      type: "error",
    });
  }
};

const closeModals = () => {
  showAddMovieModal.value = false;
  showEditMovieModal.value = false;
  currentMovie.value = null;
};

const confirmDeleteMovie = (movie) => {
  currentMovie.value = movie;
  showDeleteModal.value = true;
};

const editMovie = (movie) => {
  currentMovie.value = { ...movie };
  showEditMovieModal.value = true;
};

const deleteMovie = async () => {
  if (!currentMovie.value) return;
  try {
    await movieService.deleteMovie(currentMovie.value.id);
    notificationStore.pushNotification({
      message: `Movie "${currentMovie.value.titre}" deleted successfully.`,
      type: "success",
    });

    await fetchMovies();
    showDeleteModal.value = false;
    currentMovie.value = null;
  } catch (error) {
    console.error("Error deleting movie:", error);
    notificationStore.pushNotification({
      message: "Failed to delete movie",
      type: "error",
    });
  }
};
</script>
