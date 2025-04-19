<template>
    <header  class="fixed top-0 z-[100] w-full bg-[#0f0f0f]/50 backdrop-blur-sm py-4">
        <div class=" navbar mx-auto flex items-center justify-between py-4">
          <!-- <div class="flex items-center gap-12"> -->
            <a href="/" class="flex items-center gap-2">
              <div class="relative h-8 w-8 rounded-full bg-[#e50000] flex items-center justify-center">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
              </div>
              <span class="text-xl font-bold">MovieSeat</span>
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
            <button class="text-[#999999] hover:text-white p-2 relative" 
            @click="toggleShoppingCart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#e50000] text-[10px] flex items-center justify-center">2</span>
            </button>
             <!-- If authenticated -->
            <div v-if="auth.isAuthenticated"  class="relative" @click="toggleDropdown">
            <button class="text-[#999999] hover:text-white p-2 flex items-center gap-1">
              <img :src="auth.user?.profile_image" alt="Avatar" class="w-6 h-6 rounded-full object-cover" v-if="auth.user?.profile_image" />
              <span class="text-xs">{{ auth.user?.name }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg border border-gray-700 z-50">
              <ul class="py-2 text-sm text-white">
                <li><router-link to="/profile" class="block px-4 py-2 hover:bg-[#333]">My Profile</router-link></li>
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

            <button class="text-[#999999] hover:text-white p-2 relative" @click="toggleShoppingCart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#e50000] text-[10px] flex items-center justify-center">2</span>
            </button>
            <div  class="relative" @click="toggleDropdown">
            <button class="text-[#999999] hover:text-white p-2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg border border-gray-700 z-50">
              <ul class="py-2 text-sm text-white">
                <li><router-link to="/profile" class="block px-4 py-2 hover:bg-[#333]">My Profile</router-link></li>
                <li><button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-[#333]">Logout</button></li>
              </ul>
            </div>
          </div>
          </div>
          
        </div>
        <!-- shopping cart -->
        <transition name="slide-cart">
          <div v-show="showShoppingCart" class="h-screen w-full lg:w-8/12 bg-[#1A1A1A] ml-auto relative">
            <span @click="toggleShoppingCart" class="absolute top-2 right-4 text-white font-bold rounded-full bg-red-700 opacity-70 size-9 flex items-center justify-center hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
        </transition>

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

const showShoppingCart  = ref(false)

const toggleShoppingCart = ()=>{
  showShoppingCart.value = !showShoppingCart.value
}


const cartItems = ref([]);

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
