<template>
  <div :class="[
    'bg-[#1a1a1a] h-screen z-40 transition-all duration-300',
    isOpen ? 'w-64' : 'w-0 md:w-0',
    'fixed top-0 left-0 md:sticky md:top-0 md:block'
  ]">
    <!-- Sidebar content -->
    <div class="h-full overflow-hidden" v-if="isOpen || isMobile">
      <!-- Header -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-[#333333]">
        <span class="ml-2 font-bold text-lg">MovieSeat</span>
        <button @click="$emit('toggle-sidebar')" class="p-1 rounded-md hover:bg-[#333333] md:hidden">
          <!-- Close icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="py-4">
        <ul>
          <li v-for="item in navItems" :key="item.name">
            <RouterLink :to="item.route" :class="[
              'flex items-center px-4 py-3 text-sm transition-colors',
              isActive(item.route)
                ? 'bg-[#e50000] text-white'
                : 'text-[#999999] hover:bg-[#262626] hover:text-white'
            ]">
              <span class="ml-3">{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({ isOpen: Boolean })
defineEmits(['toggle-sidebar'])

const route = useRoute()
const isActive = (path) => route.path === path

const isMobile = computed(() => window.innerWidth < 768)

const navItems = [
  { route: '/admin/dashboard', name: 'Dashboard' },
  { route: '/admin/movies', name: 'Movies' },
  { route: '/admin/cinemas', name: 'Cinemas' },
  { route: '/admin/bookings', name: 'Bookings' },
  { route: '/admin/users', name: 'Users' },
]
</script>
