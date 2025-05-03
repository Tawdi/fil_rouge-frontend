<template>
    <header  class="fixed top-0 z-[100] w-full bg-[#0f0f0f]/50 backdrop-blur-sm py-4">
        <div class=" navbar mx-auto flex items-center justify-between py-4">
          <!-- <div class="flex items-center gap-12"> -->
            <a href="/" class="flex items-center gap-2 ">
              <img src="/images/ms-logo.png" alt="" class="h-10 lg:h-14">
              <span class="sr-only">MovieSeat</span>
            </a>
            <!-- Mobile Menu Button -->
            <button
              class="lg:hidden text-white"
              @click="toggleMobileMenu"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div class="hidden lg:block">
            <nav class="border-4 border-[#1a1a1a] bg-black rounded-[12px] p-2 ">
              <ul class="flex items-center gap-6 ">
                  <li :class="['py-2 px-4 transition-colors', isActive('/') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']"><router-link to="/" class="    text-white ">Home</router-link></li>
                  <li :class="['py-2 px-4 transition-colors', isActive('/movies') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']"><router-link to="/movies" class="">Movies</router-link></li>
                  <li :class="['py-2 px-4 transition-colors', isActive('/cinemas') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']"><router-link to="/cinemas" class="">Cinemas</router-link></li>
                  <li :class="['py-2 px-4 transition-colors', isActive('/support') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']"><router-link to="/support" class="">Support</router-link></li>
                  <li :class="['py-2 px-4 transition-colors', isActive('/about') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']"><router-link to="/about" class="">About</router-link></li>
              </ul>

            </nav>
            </div>
          <!-- </div> -->
          <div class=" items-center gap-4  hidden lg:flex">
            <button class="text-[#999999] hover:text-white p-2" @click="toggleSearchModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
             <!-- If authenticated -->
            <div v-if="auth.isAuthenticated"  class="relative" @click="toggleDropdown">
            <button class="text-[#999999] hover:text-white p-2 flex items-center gap-1">
              <img :src="storageUrl+auth.user?.profile_image" alt="Avatar" class="w-6 h-6 rounded-full object-cover" v-if="auth.user?.profile_image" />
              <span class="text-xs">{{ auth.user?.name }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg border border-gray-700 z-50">
              <ul class="py-2 text-sm text-white">
                <li v-if="auth.user.role == 'user'" ><router-link to="/profile" class="block px-4 py-2 hover:bg-[#333]">My Profile</router-link></li>
                <li v-else-if="auth.user.role == 'cinema_admin'" ><router-link to="/cinema-admin/dashboard" class="block px-4 py-2 hover:bg-[#333]">My Dashboard</router-link></li>
                <li v-else-if="auth.user.role == 'super_admin'" ><router-link to="/admin/dashboard" class="block px-4 py-2 hover:bg-[#333]">My Dashboard</router-link></li>
                <li><button @click="auth.logout" class="block w-full text-left px-4 py-2 hover:bg-[#333]">Logout</button></li>
              </ul>
            </div>
          </div>
          <!-- If NOT authenticated -->
          <div v-else class="flex gap-2">
            <router-link to="/connecte" class="text-white hover:underline">Connection</router-link>
          </div>
          </div>
        </div>
        <!-- mobile menu -->
        <div
          v-if="mobileMenuOpen"
          class="absolute top-16 left-0 right-0 bg-[#111] shadow-md lg:hidden"
        >
          <nav class="flex flex-col space-y-4 p-4">
              <ul>
                <li :class="['py-2 px-4 transition-colors', isActive('/') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']">
                  <router-link to="/" class="" @click="closeMobileMenu">Home</router-link>
                </li>
                <li :class="['py-2 px-4 transition-colors', isActive('/movies') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']">
                  <router-link to="/movies" class="" @click="closeMobileMenu">Movies</router-link>
                </li>
                <li :class="['py-2 px-4 transition-colors', isActive('/cinemas') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']">
                  <router-link to="/cinemas" class="" @click="closeMobileMenu">Cinemas</router-link>
                </li>
                <li :class="['py-2 px-4 transition-colors', isActive('/support') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']">
                  <router-link to="/support" class="" @click="closeMobileMenu">Support</router-link>
                </li>
                <li :class="['py-2 px-4 transition-colors', isActive('/about') ? 'bg-[#1a1a1a] rounded-md' : 'text-[#999999] hover:text-white']">
                  <router-link to="/about" class="" @click="closeMobileMenu">About</router-link>
                </li>
              </ul>
          </nav>
          <div class=" items-center gap-4 flex justify-center">
            <button class="text-[#999999] hover:text-white p-2"  @click="toggleSearchModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

             <!-- If authenticated -->
             <div v-if="auth.isAuthenticated"  class="relative" @click="toggleDropdown">
            <button class="text-[#999999] hover:text-white p-2 flex items-center gap-1">
              <img :src="storageUrl+auth.user?.profile_image" alt="Avatar" class="w-6 h-6 rounded-full object-cover" v-if="auth.user?.profile_image" />
              <span class="text-xs">{{ auth.user?.name }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg border border-gray-700 z-50">
              <ul class="py-2 text-sm text-white">
                <li v-if="auth.user.role == 'user'" ><router-link to="/profile" class="block px-4 py-2 hover:bg-[#333]">My Profile</router-link></li>
                <li v-else-if="auth.user.role == 'cinema_admin'" ><router-link to="/cinema-admin/dashboard" class="block px-4 py-2 hover:bg-[#333]">My Dashboard</router-link></li>
                <li v-else-if="auth.user.role == 'super_admin'" ><router-link to="/admin/dashboard" class="block px-4 py-2 hover:bg-[#333]">My Dashboard</router-link></li>
                <li><button @click="auth.logout" class="block w-full text-left px-4 py-2 hover:bg-[#333]">Logout</button></li>
              </ul>
            </div>
          </div>
          <!-- If NOT authenticated -->
          <div v-else class="flex gap-2">
            <router-link to="/connecte" class="text-white hover:underline">Connection</router-link>
          </div>
          </div>
          
        </div>

      </header>
      <transition name="fade">
        <div
          v-if="showSearchModal"
          class="fixed inset-0 z-[200] bg-black bg-opacity-70 flex items-center justify-center px-4"
        >
          <div class="bg-[#1a1a1a] text-white w-full max-w-lg rounded-xl p-6 relative">
            <!-- Close Button -->
            <button @click="toggleSearchModal" class="absolute top-3 right-3 text-white hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-xl font-bold mb-4">Search Movies</h2>
            <input
              type="text"
              placeholder="Search for a movie..."
              class="w-full px-4 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </transition>

</template>
<script setup>
import { ref  } from 'vue';
import { useRoute } from 'vue-router';

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const storageUrl = import.meta.env.VITE_STORAGE_URL;
let mobileMenuOpen = ref(false);
const toggleMobileMenu = ()=>{
    mobileMenuOpen.value = !mobileMenuOpen.value;
};
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const showSearchModal = ref(false);

const toggleSearchModal = () => {
  showSearchModal.value = !showSearchModal.value;
};
</script>


<style scoped>
.slide-cart-enter-active, .slide-cart-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-cart-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-cart-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-cart-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-cart-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
