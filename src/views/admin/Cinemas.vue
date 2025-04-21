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
        />
      </div>
    </main>
  </div>
  <!-- Add/Edit Cinema Modal -->
  <CinemaFormModal
    v-if="showAddCinemaModal || showEditCinemaModal"
    :cinema="currentCinema"
    :is-edit="showEditCinemaModal"
    @close="closeModals"
    @save="saveCinema"
  />
  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-if="showDeleteModal"
    :title="`Delete ${currentCinema?.name}`"
    :message="`Are you sure you want to delete ' ${currentCinema?.name} ' ? This action cannot be undone.`"
    @confirm="deleteCinema"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import CinemaCard from "@/components/admin/CinemaCard.vue";
import CinemaFormModal from "@/components/admin/CinemaFormModal.vue";
import ConfirmationModal from "@/components/admin/ConfirmationModal.vue";

import { useNotificationStore } from "@/stores/notificationStore";
import cinemaService from "@/services/cinemaService";

const notificationStore = useNotificationStore();


const cinemas = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const showAddCinemaModal = ref(false);
const showEditCinemaModal = ref(false);
const showDeleteModal = ref(false);
const currentCinema = ref(null);

const fetchCinemas = async () => {
  loading.value = true;
  try {
    const response = await cinemaService.getCinemas();
    cinemas.value = response.data.data;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    notificationStore.pushNotification({
      message: "Erreur lors du chargement des cinémas.",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCinemas);

const editCinema = (cinema) => {
  currentCinema.value = { ...cinema };
  showEditCinemaModal.value = true;
};

const confirmDeleteCinema = (cinema) => {
  currentCinema.value = cinema;
  showDeleteModal.value = true;
};

const closeModals = () => {
  showAddCinemaModal.value = false;
  showEditCinemaModal.value = false;
  currentCinema.value = null;
};

const saveCinema = async (cinemaData) => {
  try {
    if (showEditCinemaModal.value) {
      await cinemaService.updateCinema(cinemaData.id, cinemaData);
      notificationStore.pushNotification({
        message: `Cinéma "${cinemaData.name}" mis à jour.`,
        type: "success",
      });
    } else {
      await cinemaService.createCinema(cinemaData);
      notificationStore.pushNotification({
        message: `Cinéma "${cinemaData.name}" ajouté.`,
        type: "success",
      });
    }

    await fetchCinemas();
    closeModals();
  } catch (error) {
    console.error("Error saving cinema:", error);
    notificationStore.pushNotification({
      message: "Échec de l'enregistrement du cinéma.",
      type: "error",
    });
  }
};

const deleteCinema = async () => {
  if (!currentCinema.value) return;

  try {
    await cinemaService.deleteCinema(currentCinema.value.id);
    notificationStore.pushNotification({
      message: `Cinéma "${currentCinema.value.name}" supprimé.`,
      type: "success",
    });

    await fetchCinemas();
    showDeleteModal.value = false;
    currentCinema.value = null;
  } catch (error) {
    console.error("Error deleting cinema:", error);
    notificationStore.pushNotification({
      message: "Échec de la suppression du cinéma.",
      type: "error",
    });
  }
};
</script>
