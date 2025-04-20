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
import { ref, computed, onMounted } from "vue";
import MovieCard from "@/components/admin/MovieCard.vue";
import MovieFormModal from "@/components/admin/MovieFormModal.vue";
import ConfirmationModal from "@/components/admin/ConfirmationModal.vue";

const movies = ref([]);
const searchQuery = ref("");
const showAddMovieModal = ref(false);
const showEditMovieModal = ref(false);
const showDeleteModal = ref(false);
const currentMovie = ref(null);

onMounted(() => {
  movies.value = [];
});

const saveMovie = (movie) => {
  closeModals();
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
const deleteMovie = () => {
  showDeleteModal.value = false;
  currentMovie.value = null;
};
</script>
