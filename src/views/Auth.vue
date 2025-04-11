<template>
  <div class="container mx-auto px-4 flex-1 flex items-center justify-center">
    <div class="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
      <div class="flex border-b border-[#333]">
        <button 
          class="flex-1 py-4 text-center font-medium transition-colors"
          :class="activeTab === 'login' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
          @click="activeTab = 'login'"
        >
          Login
        </button>
        <button 
          class="flex-1 py-4 text-center font-medium transition-colors"
          :class="activeTab === 'register' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
          @click="activeTab = 'register'"
        >
          Register
        </button>
      </div>

       <!-- Login Form -->
      <div v-if="activeTab === 'login'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      </div>
       <!-- Register Form -->
      <div v-if="activeTab === 'register'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('login')
</script>

  <style>
  </style>