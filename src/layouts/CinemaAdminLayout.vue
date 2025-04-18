<template>
  <div class="flex min-h-screen bg-[#141414] text-white">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Backdrop for mobile -->
    <div v-if="isSidebarOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="isSidebarOpen = false"></div>

    <!-- Main content -->
    <div class="flex-1 transition-all duration-300">
      <button class="hidden md:block p-2 mt-2 ml-2 text-white bg-[#262626] rounded hover:bg-[#333]"
        @click="toggleSidebar">
        <svg v-if="isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-panel-left-close">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M9 3v18" />
          <path d="m16 15-3-3 3-3" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-panel-left-open">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M9 3v18" />
          <path d="m14 9 3 3-3 3" />
        </svg>
      </button>

      <button class="md:hidden p-4" @click="toggleSidebar">
        <!-- Burger icon -->
        <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-menu">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/cinemaAdmin/Sidebar.vue'

const isSidebarOpen = ref(true)
const isMobile = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}
onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
</script>
