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
        <div class="">
          <div class="bg-[#1a1a1a] rounded-lg border border-[#333333] mb-8">
            <div class="p-6 border-b border-[#333333]">
              <h2 class="text-xl font-bold">Personal Information</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="savePersonalInfo">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Full Name</label>
                    <input type="text" v-model="Profile.name"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Email Address</label>
                    <input type="email" v-model="Profile.email"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>

                </div>

                <div class="flex justify-end">
                  <button type="submit"
                    class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="bg-[#1a1a1a] rounded-lg border border-[#333333]">
            <div class="p-6 border-b border-[#333333]">
              <h2 class="text-xl font-bold">Password & Security</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="changePassword">
                <div class="space-y-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Current Password</label>
                    <input type="password" v-model="passwordInfo.current"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">New Password</label>
                    <input type="password" v-model="passwordInfo.new"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Confirm New Password</label>
                    <input type="password" v-model="passwordInfo.confirm"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                </div>
                <div class="flex justify-end">
                  <button type="submit"
                    class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
const passwordInfo = ref({
  current: '',
  new: '',
  confirm: ''
});
</script>