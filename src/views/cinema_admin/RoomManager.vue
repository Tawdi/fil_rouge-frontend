<template>
  <div class="flex h-screen bg-[#141414] text-white">
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto p-6">
        <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold">Room Manager</h1>
            <p class="text-[#999999]">Create and customize cinema room layouts</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              v-if="currentStep > 1 && !isEditMode"
              @click="currentStep--"
              class="px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back
            </button>
            
            <button 
              v-if="!isEditMode && !showRoomList"
              @click="cancelRoomCreation"
              class="px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x mr-2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              Cancel
            </button>
            
            <button 
              v-if="showRoomList"
              @click="startNewRoom"
              class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create New Room
            </button>
          </div>
        </div>

        <!-- Step Indicator -->
        <div v-if="!showRoomList" class="mb-6">
          <div class="flex items-center">
            <div 
              class="flex items-center justify-center w-8 h-8 rounded-full bg-[#e50000] text-white font-bold"
            >
              {{ currentStep }}
            </div>
            <div class="ml-3">
              <h2 class="text-lg font-medium">
                {{ currentStep === 1 ? 'Room Initialization' : currentStep === 2 ? 'Seat Customization' : 'Final Review' }}
              </h2>
              <p class="text-sm text-[#999999]">
                {{ 
                  currentStep === 1 ? 'Set up basic room parameters' : 
                  currentStep === 2 ? 'Customize seat types and layout' : 
                  'Review and save your room configuration' 
                }}
              </p>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="mt-4 relative h-2 bg-[#333333] rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-[#e50000] transition-all duration-300 ease-in-out"
              :style="{ width: `${(currentStep / 3) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Room List (Initial View) -->
        <RoomList 
          v-if="showRoomList" 
          :rooms="rooms"
          :current-page="currentPage"
          :total-pages="totalPages"
          @create-room="startNewRoom"
          @edit-room="editRoom"
          @delete-room="confirmDeleteRoom"
          @page-change="handlePageChange"
        />

        <!-- Step 1: Room Initialization -->
        <RoomFormStepOne
          v-if="currentStep === 1 && !showRoomList"
          v-model:room-data="roomData"
          @continue="goToStep2"
        />

        <!-- Step 2: Seat Customization -->
        <RoomFormStepTwo
          v-if="currentStep === 2 && !showRoomList"
          v-model:room-data="roomData"
          @continue="goToStep3"
        />

        <!-- Step 3: Final Review -->
        <RoomPreview
          v-if="currentStep === 3 && !showRoomList"
          :room-data="roomData"
          @save="saveRoom"
          @continue-editing="currentStep = 2"
        />

        <!-- Confirmation Modal -->
        <ConfirmationModal
          v-if="showDeleteModal"
          title="Delete Room"
          :message="`Are you sure you want to delete ${roomToDelete?.name}? This action cannot be undone.`"
          confirm-text="Delete"
          confirm-class="bg-red-600 hover:bg-red-700"
          @confirm="deleteRoom"
          @cancel="showDeleteModal = false"
        />

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ConfirmationModal from '@/components/admin/ConfirmationModal.vue';
import RoomList from '@/components/cinemaAdmin/roomManager/RoomList.vue';
import RoomFormStepOne from '@/components/cinemaAdmin/roomManager/RoomFormStepOne.vue';
import RoomFormStepTwo from '@/components/cinemaAdmin/roomManager/RoomFormStepTwo.vue';
import RoomPreview from '@/components/cinemaAdmin/roomManager/RoomPreview.vue';

import roomService from "@/services/roomService";
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();

const showRoomList = ref(true);
const currentStep = ref(1);
const isEditMode = ref(false);
const rooms = ref([]);
const showDeleteModal = ref(false);
const roomToDelete = ref(null);
// Room Creator State
const roomData = ref({
  id: null,
  name: '',
  rows: 10,
  seats_per_row: 15,
  defaultSeatType: 'Standard',
  row_naming: 'letters',
  layout: []
});

const currentPage = ref(1);
const totalPages = ref(1);

const startNewRoom = () => {
  roomData.value = {
    id: null,
    name: '',
    rows: 10,
    seats_per_row: 15,
    defaultSeatType: 'Standard',
    row_naming: 'letters',
    layout: []
  };
  
  currentStep.value = 1;
  showRoomList.value = false;
  isEditMode.value = false;
};

const cancelRoomCreation = () => {
  showRoomList.value = true;
  currentStep.value = 1;
};

const editRoom = (room) => {
  roomData.value = JSON.parse(JSON.stringify(room));
  isEditMode.value = true;
  currentStep.value = 2;
  showRoomList.value = false;
};

const confirmDeleteRoom = (room) => {
  roomToDelete.value = room;
  showDeleteModal.value = true;
};

const deleteRoom = async () => {
  try {
    await roomService.deleteRoom(roomToDelete.value.id);

    notificationStore.pushNotification({
      message: `Room "${roomToDelete.value.name}" deleted successfully.`,
      type: "success",
    });

    await fetchRooms();
  } catch (error) {
    console.error("Failed to delete room:", error);
    notificationStore.pushNotification({
      message: "Failed to delete the room.",
      type: "error",
    });
  } finally {
    showDeleteModal.value = false;
    roomToDelete.value = null;
  }
};


const initializeRoomLayout = () => {
  const layout = [];
  
  for (let i = 0; i < roomData.value.rows; i++) {
    const row = [];
    
    for (let j = 0; j < roomData.value.seats_per_row; j++) {
      row.push({
        type: roomData.value.defaultSeatType,
        row: i,
        column: j
      });
    }
    
    layout.push(row);
  }
  
  roomData.value.layout = layout;
};

const goToStep2 = () => {
  // Initialize the room layout
  initializeRoomLayout();
  currentStep.value = 2;
};

const goToStep3 = () => {
  currentStep.value = 3;
};

const saveRoom = async () => {
  try {
    const payload = {
      name: roomData.value.name,
      rows: roomData.value.rows,
      row_naming: roomData.value.row_naming,
      seats_per_row: roomData.value.seats_per_row,
      layout: JSON.stringify(roomData.value.layout),
    };

    if (isEditMode.value) {
      await roomService.updateRoom(roomData.value.id, payload);
      notificationStore.pushNotification({
        message: `Room "${roomData.value.name}" updated successfully.`,
        type: "success",
      });
    } else {
      await roomService.createRoom(payload);
      notificationStore.pushNotification({
        message: `Room "${roomData.value.name}" created successfully.`,
        type: "success",
      });
    }

    await fetchRooms();
    showRoomList.value = true;
    currentStep.value = 1;
  } catch (error) {
    console.error("Error saving room:", error);
    notificationStore.pushNotification({
      message: "Failed to save change.",
      type: "error",
    });
  }
};


const fetchRooms = async () => {
  try {
    const response = await roomService.getRooms({ page: currentPage.value });
    rooms.value = response.data.data;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
    rooms.value.forEach( (rm)=>{
      if (typeof rm.layout === "string") {
    try {
      rm.layout = JSON.parse(rm.layout);
    } catch (e) {
      console.error("Invalid JSON layout:", rm.layout, e);
      rm.layout = []; 
    }
  }
    } )
  } catch (error) {
    console.error("Error loading rooms:", error);
    notificationStore.pushNotification({
      message: "An error occurred while loading rooms.",
      type: "error",
    });
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchRooms();
};
onMounted(fetchRooms);
</script>