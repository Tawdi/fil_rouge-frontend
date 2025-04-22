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

        <!-- Room List (Initial View) -->
        <RoomList 
          v-if="showRoomList" 
          :rooms="rooms"
          @create-room="startNewRoom"
          @edit-room="editRoom"
          @delete-room="confirmDeleteRoom"
        />

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RoomList from '@/components/cinemaAdmin/roomManager/RoomList.vue';

const showRoomList = ref(true);
const rooms = ref([]);
</script>