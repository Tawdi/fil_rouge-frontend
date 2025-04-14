<template>
  <div class="pt-16 ">
    <!-- Profile Header -->
    <section class="bg-gradient-to-b from-[#1a1a1a] to-[#141414] py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="relative">
            <img :src="Profile.image" :alt="Profile.name" class="w-32 h-32 rounded-full border-4 border-[#e50000]" />
            <button
              class="absolute bottom-0 right-0 bg-[#262626] p-2 rounded-full border-2 border-[#141414] hover:bg-[#333333] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-camera">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold mb-2"></h1>
            <p class="text-[#999999] mb-4">{{ Profile.email }}</p>
            <p class="text-[#999999] mb-4">Member since {{ Profile.created_at }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-8">
      <!-- Tabs -->
      <div class="border-b border-[#333333] mb-8">
        <div class="flex overflow-x-auto scrollbar-hide">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'px-6 py-4 font-medium whitespace-nowrap transition-colors',
            activeTab === tab.id
              ? 'text-[#e50000] border-b-2 border-[#e50000]'
              : 'text-[#999999] hover:text-white'
          ]">
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Personal Information Tab -->
      <div v-if="activeTab === 'personal'" class=" gap-8">

      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'" class="space-y-8">

      </div>

    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('personal');
const tabs = [
  { id: 'personal', name: 'Personal Information' },
  { id: 'bookings', name: 'My Bookings' },
];
const Profile = ref({
  'name': "ahmed ahmed",
  'email': "ahmed.ahmed@gmail.com",
  'image': "/images/support.webp",
  'created_at': "April 2024"
});
</script>