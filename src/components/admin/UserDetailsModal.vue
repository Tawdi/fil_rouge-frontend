<template>
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-[#1a1a1a] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#333333]">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">User Details</h3>
            <button 
              @click="$emit('close')"
              class="p-1 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <!-- User Profile Header -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div class="w-24 h-24 rounded-full bg-[#333333] flex items-center justify-center overflow-hidden">
              <img v-if="user.profile_image" :src="user.profile_image" :alt="user.name" class="w-full h-full object-cover" />
              <span v-else class="text-2xl">{{ getUserInitials(user.name) }}</span>
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <h4 class="text-xl font-bold">{{ user.name }}</h4>
              <p class="text-[#999999]">{{ user.email }}</p>
              
              <div class="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <span 
                  :class="[
                    'px-2 py-1 text-xs rounded-md',
                    user.role === 'super_admin' ? 'bg-purple-900/30 text-purple-500' :
                    user.role === 'cinema_admin' ? 'bg-blue-900/30 text-blue-500' :
                    'bg-gray-900/30 text-gray-500'
                  ]"
                >
                  {{  user.role === 'super_admin' ? 'Admin' : user.role === 'cinema_admin' ? 'Cinema admin' : 'Customer'}}
                </span>
                
                <span 
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    user.status === 'active' ? 'bg-green-900/30 text-green-500' :
                    user.status === 'suspended' ? 'bg-yellow-900/30 text-yellow-500' :
                    'bg-red-900/30 text-red-500'
                  ]"
                >
                  {{ user.status }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- User Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 class="font-medium mb-3 text-[#999999]">Account Information</h5>
              <div class="space-y-3 bg-[#262626] p-4 rounded-lg">
                <div>
                  <div class="text-xs text-[#999999]">User ID</div>
                  <div>{{ user.id }}</div>
                </div>
                <div>
                  <div class="text-xs text-[#999999]">Joined</div>
                  <div>{{ formatDate(user.created_at, true) }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-wrap justify-end gap-3 mt-8">
            <button 
              @click="$emit('edit', user)"
              class="px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil mr-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Edit User
            </button>
            
            <button 
              v-if="user.status !== 'suspended'"
              @click="$emit('suspend', user)"
              class="px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ban mr-2"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
              Suspend User
            </button>
            
            <button 
              v-else
              @click="$emit('activate', user)"
              class="px-4 py-2 border border-[#333333] rounded-md text-white hover:bg-[#262626] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              Activate User
            </button>
            
            <button 
              @click="$emit('delete', user)"
              class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 mr-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineEmits(['close', 'edit', 'suspend', 'activate', 'delete']);
  
  defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return date.toLocaleDateString(undefined, options);
  };
  
  const getUserInitials = (name) => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };
  </script>