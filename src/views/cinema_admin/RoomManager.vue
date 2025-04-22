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
          @create-room="startNewRoom"
          @edit-room="editRoom"
          @delete-room="confirmDeleteRoom"
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

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RoomList from '@/components/cinemaAdmin/roomManager/RoomList.vue';
import RoomFormStepOne from '@/components/cinemaAdmin/roomManager/RoomFormStepOne.vue';
import RoomFormStepTwo from '@/components/cinemaAdmin/roomManager/RoomFormStepTwo.vue';

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
  seatsPerRow: 15,
  defaultSeatType: 'Standard',
  rowNaming: 'letters',
  layout: []
});

const startNewRoom = () => {
  roomData.value = {
    id: null,
    name: '',
    rows: 10,
    seatsPerRow: 15,
    defaultSeatType: 'Standard',
    rowNaming: 'letters',
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


const initializeRoomLayout = () => {
  const layout = [];
  
  for (let i = 0; i < roomData.value.rows; i++) {
    const row = [];
    
    for (let j = 0; j < roomData.value.seatsPerRow; j++) {
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

const saveRoom = () => {
  if (isEditMode.value) {
    // Update existing room
    const index = rooms.value.findIndex(r => r.id === roomData.value.id);
    if (index !== -1) {
      rooms.value[index] = JSON.parse(JSON.stringify(roomData.value));
    }
  } else {
    // Add new room
    const maxId = Math.max(0, ...rooms.value.map(r => r.id));
    roomData.value.id = maxId + 1;
    rooms.value.push(JSON.parse(JSON.stringify(roomData.value)));
  }
  
  showRoomList.value = true;
  currentStep.value = 1;
};
</script>